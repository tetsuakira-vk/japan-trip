"""Shared helpers for baking a curated "name + optional address/lat-lon" YAML
list into geocoded GeoJSON — used by bake_vk.py and bake_soundscape.py. Both
lists share the same restrictive flat-YAML shape and the same Nominatim
geocoding approach, so this factors out the parser and the geocode/link
helpers rather than duplicating them a second time.
"""
import json
import time
import urllib.parse
import urllib.request

NOMINATIM = "https://nominatim.openstreetmap.org/search"


def parse_spots_yaml(text):
    """Parses the restricted flat-list subset of YAML these files use: each
    item starts with "- key: value" and continues with indented
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


def geocode(query, user_agent):
    url = NOMINATIM + "?" + urllib.parse.urlencode(
        {"q": query, "format": "json", "limit": 1, "countrycodes": "jp"}
    )
    req = urllib.request.Request(url, headers={"User-Agent": user_agent})
    with urllib.request.urlopen(req, timeout=30) as resp:
        results = json.loads(resp.read().decode("utf-8"))
    if not results:
        return None, None
    return float(results[0]["lat"]), float(results[0]["lon"])


def apple_maps_link(name, lat, lon):
    return "https://maps.apple.com/?q=" + urllib.parse.quote(name) + f"&ll={lat},{lon}"


def geocode_spots(spots, user_agent, rate_limit_s=1.1):
    """Resolves lat/lon for each spot (explicit lat/lon wins; otherwise
    tries address, then name_ja, then name+area as query candidates).
    Yields (spot_dict, lat, lon) for resolved spots and collects unresolved
    names into the returned list's second element isn't returned — callers
    track that themselves via the generator's None results."""
    for s in spots:
        name = s.get("name")
        if not name:
            continue
        lat, lon = s.get("lat"), s.get("lon")
        if lat is not None and lon is not None:
            yield s, float(lat), float(lon)
            continue
        queries = [s.get("address") or f"{name} {s.get('area', '')} Tokyo"]
        if s.get("name_ja"):
            queries.append(s["name_ja"])
        resolved = None
        for query in queries:
            try:
                lat, lon = geocode(query, user_agent)
            except Exception as e:
                print(f"!! geocode error for {name!r} ({query!r}): {e}")
                lat, lon = None, None
            time.sleep(rate_limit_s)  # Nominatim usage policy: max ~1 req/sec
            if lat is not None:
                resolved = (lat, lon)
                break
        if resolved:
            yield s, resolved[0], resolved[1]
        else:
            yield s, None, None
