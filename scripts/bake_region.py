#!/usr/bin/env python3
"""Build region.geojson: a small padded box around every point any map
layer plots — trip stops (map/data/trip.locations.json, from data.js via
export_locations.mjs) plus any curated layers baked before this runs, e.g.
map/data/vk_spots.geojson. Run those bakers first (see the Makefile `map`
target order) so their points are included in the extracted basemap.

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
# Curated-layer GeoJSON files (baked before this script runs) whose points
# should also get basemap coverage, even though they're not trip stops.
EXTRA_GEOJSON_PATHS = [os.path.join(ROOT, "map", "data", "vk_spots.geojson")]
OUT_PATH = os.path.join(ROOT, "map", "region.geojson")

PAD = 0.02  # ~2.2 km each way, plenty to cover walking around a stop cluster
CLUSTER_ROUND = 2  # round to ~1.1km grid to merge nearby stops into one box


def box(lat, lon, pad=PAD):
    return [[[lon - pad, lat - pad], [lon + pad, lat - pad],
             [lon + pad, lat + pad], [lon - pad, lat + pad],
             [lon - pad, lat - pad]]]


def all_points():
    locs = json.load(open(LOCATIONS_PATH, encoding="utf-8"))
    for loc in locs.values():
        yield loc["lat"], loc["lon"]
    for path in EXTRA_GEOJSON_PATHS:
        if not os.path.exists(path):
            continue
        fc = json.load(open(path, encoding="utf-8"))
        for feat in fc.get("features", []):
            lon, lat = feat["geometry"]["coordinates"][:2]
            yield lat, lon


def main():
    seen = set()
    feats = []
    n = 0
    for lat, lon in all_points():
        n += 1
        key = (round(lat, CLUSTER_ROUND), round(lon, CLUSTER_ROUND))
        if key in seen:
            continue
        seen.add(key)
        feats.append({
            "type": "Feature",
            "properties": {},
            "geometry": {"type": "Polygon", "coordinates": box(lat, lon)},
        })
    fc = {"type": "FeatureCollection", "features": feats}
    json.dump(fc, open(OUT_PATH, "w", encoding="utf-8"))
    print(f"{len(feats)} area boxes (from {n} points) -> {OUT_PATH}")


if __name__ == "__main__":
    main()
