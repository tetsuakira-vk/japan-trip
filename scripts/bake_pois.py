#!/usr/bin/env python3
"""Fetch nearby practical POIs (convenience stores, ramen, onsen/sento,
vending machines, ATMs) around each trip area from OpenStreetMap via the
Overpass API — free, no key. Emits both a human-readable map/data/pois.json
and the map/data/pois.geojson the map page actually loads.

One combined query per area (all 5 categories unioned in a single Overpass
request) rather than one request per category — 38 requests total for the
whole trip, not 190, out of respect for the free public endpoint.

Run scripts/bake_region.py first (needs map/data/trip.locations.json, which
itself comes from scripts/export_locations.mjs — see Makefile `map` target
for the full order).
"""
import json
import os
import time
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
LOCATIONS_PATH = os.path.join(ROOT, "map", "data", "trip.locations.json")
OUT_JSON = os.path.join(ROOT, "map", "data", "pois.json")
OUT_GEOJSON = os.path.join(ROOT, "map", "data", "pois.geojson")

# Primary + fallback public Overpass mirrors — the primary instance rate-limits
# (429) or times out (504) fairly readily under normal free-tier load, so a
# failed area is retried with backoff before trying the next mirror.
OVERPASS_URLS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.ru/api/interpreter",
]
UA = "japan-trip-personal-itinerary/1.0 (one-time batch POI bake; contact: robertjohnathannelson@gmail.com)"
RADIUS_M = 1200          # konbini / ramen / onsen / atm search radius
VENDING_RADIUS_M = 500   # tighter radius — vending machines are everywhere in Japan
CLUSTER_ROUND = 2        # same clustering as bake_region.py, so one query per area
RETRY_BACKOFFS = [5, 15, 40]  # seconds, per mirror attempt

# Operators broadly known to accept foreign-issued cards at their ATMs.
FOREIGN_FRIENDLY_OPERATORS = [
    "seven bank", "7bank", "セブン銀行", "ゆうちょ", "japan post",
    "aeon", "イオン", "prestia", "citibank",
]


def overpass_query(lat, lon):
    r, vr = RADIUS_M, VENDING_RADIUS_M
    q = f"""
[out:json][timeout:25];
(
  node["shop"="convenience"](around:{r},{lat},{lon});
  node["amenity"="restaurant"]["cuisine"~"ramen|noodle"](around:{r},{lat},{lon});
  node["amenity"="fast_food"]["cuisine"~"ramen|noodle"](around:{r},{lat},{lon});
  node["amenity"="public_bath"](around:{r},{lat},{lon});
  node["amenity"="vending_machine"](around:{vr},{lat},{lon});
  node["amenity"="atm"](around:{r},{lat},{lon});
);
out body;
"""
    data = urllib.parse.urlencode({"data": q}).encode("utf-8")
    last_err = None
    for url in OVERPASS_URLS:
        for attempt, backoff in enumerate([0] + RETRY_BACKOFFS):
            if backoff:
                print(f"    retrying {url} in {backoff}s...")
                time.sleep(backoff)
            try:
                req = urllib.request.Request(url, data=data, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=60) as resp:
                    return json.loads(resp.read().decode("utf-8"))
            except Exception as e:
                last_err = e
    raise last_err


def category_for(tags):
    if tags.get("shop") == "convenience":
        return "konbini"
    if tags.get("cuisine", "").find("ramen") >= 0 or tags.get("cuisine", "").find("noodle") >= 0:
        return "ramen"
    if tags.get("amenity") == "public_bath":
        return "onsen"
    if tags.get("amenity") == "vending_machine":
        return "vending"
    if tags.get("amenity") == "atm":
        return "atm"
    return "other"


def is_foreign_friendly_atm(tags):
    op = (tags.get("operator") or "") + " " + (tags.get("brand") or "") + " " + (tags.get("name") or "")
    op = op.lower()
    return any(k in op for k in FOREIGN_FRIENDLY_OPERATORS)


def apple_maps_link(name, lat, lon):
    q = name if name else f"{lat},{lon}"
    return "https://maps.apple.com/?q=" + urllib.parse.quote(q) + f"&ll={lat},{lon}"


def main():
    locs = json.load(open(LOCATIONS_PATH, encoding="utf-8"))
    seen_areas = set()
    areas = []
    for loc in locs.values():
        key = (round(loc["lat"], CLUSTER_ROUND), round(loc["lon"], CLUSTER_ROUND))
        if key in seen_areas:
            continue
        seen_areas.add(key)
        areas.append((loc["lat"], loc["lon"], loc.get("city", "")))

    seen_ids = set()
    pois = []
    for i, (lat, lon, city) in enumerate(areas):
        print(f"[{i+1}/{len(areas)}] querying around {city or (lat, lon)}...")
        try:
            result = overpass_query(lat, lon)
        except Exception as e:
            print(f"  ! failed: {e}")
            time.sleep(2)
            continue
        for el in result.get("elements", []):
            if el.get("type") != "node" or el["id"] in seen_ids:
                continue
            seen_ids.add(el["id"])
            tags = el.get("tags", {})
            cat = category_for(tags)
            if cat == "other":
                continue
            name = tags.get("name") or tags.get("name:en") or {
                "konbini": "Convenience store", "ramen": "Ramen shop",
                "onsen": "Public bath", "vending": "Vending machine", "atm": "ATM",
            }[cat]
            poi = {
                "name": name,
                "name_ja": tags.get("name:ja") or (name if any(ord(c) > 127 for c in name) else None),
                "category": cat,
                "lat": el["lat"], "lon": el["lon"],
                "area": city,
                "apple": apple_maps_link(name, el["lat"], el["lon"]),
            }
            if cat == "atm":
                poi["foreign_atm"] = is_foreign_friendly_atm(tags)
            pois.append(poi)
        time.sleep(2.5)  # be polite to the free public Overpass instances

    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    json.dump(pois, open(OUT_JSON, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    feats = []
    for p in pois:
        feats.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [p["lon"], p["lat"]]},
            "properties": {
                "name": p["name"], "name_ja": p.get("name_ja"),
                "category": p["category"], "source": "mine", "area": p["area"],
                "apple": p["apple"], "foreign_atm": p.get("foreign_atm", False),
            },
        })
    json.dump({"type": "FeatureCollection", "features": feats}, open(OUT_GEOJSON, "w", encoding="utf-8"), ensure_ascii=False)

    by_cat = {}
    for p in pois:
        by_cat[p["category"]] = by_cat.get(p["category"], 0) + 1
    print(f"\n{len(pois)} POIs from {len(areas)} areas: {by_cat}")
    print(f"-> {OUT_JSON}\n-> {OUT_GEOJSON}")


if __name__ == "__main__":
    main()
