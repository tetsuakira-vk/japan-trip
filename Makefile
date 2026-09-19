.PHONY: all map recorder serve clean

# Rebuilds both offline mini-PWAs (map/ and recorder/) end to end. Needs:
# `npm install` once (protomaps-themes-base, maplibre-gl, pmtiles,
# smp-noto-glyphs, @tmcw/togeojson, @xmldom/xmldom, jszip — see
# package.json), and the `pmtiles` CLI (go-pmtiles) on PATH.
PMTILES_BUILD_DATE = 20260917

all: map recorder
	python3 scripts/build_icons.py
	node scripts/build_sw.mjs

# Re-run whenever data.js, the POI categories, the JapanEats list, or
# vk_spots.yaml change.
map:
	node scripts/export_locations.mjs
	python3 scripts/bake_pois.py
	node scripts/bake_japaneat.mjs
	python3 scripts/bake_vk.py
	python3 scripts/bake_region.py
	rm -f map/tokyo.pmtiles
	pmtiles extract https://build.protomaps.com/$(PMTILES_BUILD_DATE).pmtiles map/tokyo.pmtiles \
		--region=map/region.geojson --maxzoom=15
	node scripts/build_style.mjs
	node scripts/export_glyphs.mjs
	@echo "--- map/tokyo.pmtiles size ---"
	@ls -lh map/tokyo.pmtiles

# Re-run whenever soundscape_targets.yaml changes.
recorder:
	python3 scripts/bake_soundscape.py

# Local-only: `python3 -m http.server` doesn't support HTTP Range requests,
# and map/basemap.mjs's own fetch needs a real server anyway — use `serve`
# for anything touching either mini-PWA.
serve:
	npx serve@latest -l 8901 .

clean:
	rm -rf map/tokyo.pmtiles map/style.json map/sw.js map/fonts map/data \
		map/region.geojson map/icon-192.png map/icon-512.png \
		recorder/data recorder/sw.js recorder/icon-192.png recorder/icon-512.png
