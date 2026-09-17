#!/usr/bin/env python3
"""Build region.geojson: a small padded box around each distinct trip area,
derived from map/data/trip.locations.json (itself derived from data.js by
export_locations.mjs — run that first).

Deliberately many SMALL boxes rather than one big bounding box: the trip
spans Shinjuku to Nikko/Tsukuba/Chiba/Kanagawa, and a single bbox covering
all of that would pull in huge swaths of empty countryside. `pmtiles extract`
accepts a MultiPolygon region, so we union small boxes per cluster instead.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
LOCATIONS_PATH = os.path.join(ROOT, "map", "data", "trip.locations.json")
OUT_PATH = os.path.join(ROOT, "map", "region.geojson")

PAD = 0.02  # ~2.2 km each way, plenty to cover walking around a stop cluster
CLUSTER_ROUND = 2  # round to ~1.1km grid to merge nearby stops into one box


def box(lat, lon, pad=PAD):
    return [[[lon - pad, lat - pad], [lon + pad, lat - pad],
             [lon + pad, lat + pad], [lon - pad, lat + pad],
             [lon - pad, lat - pad]]]


def main():
    locs = json.load(open(LOCATIONS_PATH, encoding="utf-8"))
    seen = set()
    feats = []
    for loc in locs.values():
        key = (round(loc["lat"], CLUSTER_ROUND), round(loc["lon"], CLUSTER_ROUND))
        if key in seen:
            continue
        seen.add(key)
        feats.append({
            "type": "Feature",
            "properties": {},
            "geometry": {"type": "Polygon", "coordinates": box(loc["lat"], loc["lon"])},
        })
    fc = {"type": "FeatureCollection", "features": feats}
    json.dump(fc, open(OUT_PATH, "w", encoding="utf-8"))
    print(f"{len(feats)} area boxes (from {len(locs)} locations) -> {OUT_PATH}")


if __name__ == "__main__":
    main()
