#!/usr/bin/env python3
"""Bakes vk_spots.yaml (curated visual-kei / J-music spots) into
map/data/vk_spots.geojson, geocoding anything without explicit lat/lon via
Nominatim (OpenStreetMap, free, no key).

No PyYAML here — this machine's Python is Homebrew-managed and blocks
`pip install` outside a venv, and the file's own format is deliberately a
flat, single-level list (no nesting, no multi-line values), so a ~20-line
hand-rolled parser is simpler and lighter than adding a dependency for it.
Keep vk_spots.yaml within that shape (see its own header comment).
"""
import json
import os
import time
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SPOTS_PATH = os.path.join(ROOT, "vk_spots.yaml")
OUT_PATH = os.path.join(ROOT, "map", "data", "vk_spots.geojson")

NOMINATIM = "https://nominatim.openstreetmap.org/search"
UA = "japan-trip-personal-itinerary/1.0 (one-time VK-spot geocode; contact: robertjohnathannelson@gmail.com)"


def parse_spots_yaml(text):
    """Parses the restricted flat-list subset of YAML used by vk_spots.yaml:
    each item starts with "- key: value" and continues with indented
    "  key: value" lines; blank lines and full-line "#" comments are
    ignored. No nesting, no quoting, no multi-line values."""
    spots = []
    current = None
    for raw in text.splitlines():
        line = raw.rstrip()
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.startswith("- "):
            current = {}
            spots.append(current)
            stripped = stripped[2:]
        elif current is None:
            continue  # stray line before the first "- "
        key, sep, value = stripped.partition(":")
        if not sep:
            continue
        current[key.strip()] = value.strip()
    return spots


def geocode(query):
    url = NOMINATIM + "?" + urllib.parse.urlencode(
        {"q": query, "format": "json", "limit": 1, "countrycodes": "jp"}
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        results = json.loads(resp.read().decode("utf-8"))
    if not results:
        return None, None
    return float(results[0]["lat"]), float(results[0]["lon"])


def apple_maps_link(name, lat, lon):
    return "https://maps.apple.com/?q=" + urllib.parse.quote(name) + f"&ll={lat},{lon}"


def main():
    spots = parse_spots_yaml(open(SPOTS_PATH, encoding="utf-8").read())

    feats = []
    unresolved = []
    for s in spots:
        name = s.get("name")
        if not name:
            continue
        lat, lon = s.get("lat"), s.get("lon")
        if lat is not None and lon is not None:
            lat, lon = float(lat), float(lon)
        else:
            queries = [s.get("address") or f"{name} {s.get('area', '')} Tokyo"]
            # Small local venues are often indexed under their Japanese name
            # only — try it as a second attempt when the romanized query
            # (or address) comes up empty, before giving up.
            if s.get("name_ja"):
                queries.append(s["name_ja"])
            for query in queries:
                try:
                    lat, lon = geocode(query)
                except Exception as e:
                    print(f"!! geocode error for {name!r} ({query!r}): {e}")
                    lat, lon = None, None
                time.sleep(1.1)  # Nominatim usage policy: max ~1 req/sec
                if lat is not None:
                    break
            if lat is None:
                unresolved.append(name)
                continue

        feats.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": {
                "name": name,
                "name_ja": s.get("name_ja") or None,
                "category": s.get("category", "vk"),
                "source": "vk",
                "note": s.get("note") or None,
                "area": s.get("area") or None,
                "apple": apple_maps_link(name, lat, lon),
            },
        })

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    json.dump({"type": "FeatureCollection", "features": feats}, open(OUT_PATH, "w", encoding="utf-8"), ensure_ascii=False)

    print(f"VK spots: {len(feats)} geocoded -> {OUT_PATH}")
    if unresolved:
        print(f"\n!! no geocode, add lat/lon manually in vk_spots.yaml for:")
        for name in unresolved:
            print(f"   - {name}")


if __name__ == "__main__":
    main()
