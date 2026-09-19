#!/usr/bin/env python3
"""Bakes soundscape_targets.yaml (curated field-recording targets) into
recorder/data/soundscape_targets.geojson. See scripts/lib_curated_spots.py
for the shared YAML parser and Nominatim geocode helpers (also used by
bake_vk.py).
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib_curated_spots import apple_maps_link, geocode_spots, parse_spots_yaml

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SPOTS_PATH = os.path.join(ROOT, "soundscape_targets.yaml")
OUT_PATH = os.path.join(ROOT, "recorder", "data", "soundscape_targets.geojson")
UA = "japan-trip-personal-itinerary/1.0 (one-time soundscape-target geocode; contact: robertjohnathannelson@gmail.com)"


def main():
    spots = parse_spots_yaml(open(SPOTS_PATH, encoding="utf-8").read())

    feats = []
    unresolved = []
    for s, lat, lon in geocode_spots(spots, UA):
        if lat is None:
            unresolved.append(s["name"])
            continue
        feats.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": {
                "name": s["name"],
                "name_ja": s.get("name_ja") or None,
                "category": s.get("category", "soundscape"),
                "source": "soundscape",
                "note": s.get("note") or None,
                "area": s.get("area") or None,
                "apple": apple_maps_link(s["name"], lat, lon),
            },
        })

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    json.dump({"type": "FeatureCollection", "features": feats}, open(OUT_PATH, "w", encoding="utf-8"), ensure_ascii=False)

    print(f"Soundscape targets: {len(feats)} geocoded -> {OUT_PATH}")
    if unresolved:
        print(f"\n!! no geocode, add lat/lon manually in soundscape_targets.yaml for:")
        for name in unresolved:
            print(f"   - {name}")


if __name__ == "__main__":
    main()
