.PHONY: map serve clean-map

# Rebuilds the offline map page end to end. Needs: `npm install` once
# (protomaps-themes-base, maplibre-gl, pmtiles, smp-noto-glyphs,
# @tmcw/togeojson, @xmldom/xmldom — see package.json), and the `pmtiles`
# CLI (go-pmtiles) on PATH. Re-run whenever data.js, the POI categories, or
# the JapanEats list change.
PMTILES_BUILD_DATE = 20260917

map:
	node scripts/export_locations.mjs
	python3 scripts/bake_region.py
	python3 scripts/bake_pois.py
	node scripts/bake_japaneat.mjs
	pmtiles extract https://build.protomaps.com/$(PMTILES_BUILD_DATE).pmtiles map/tokyo.pmtiles \
		--region=map/region.geojson --maxzoom=15 --overwrite
	node scripts/build_style.mjs
	node scripts/export_glyphs.mjs
	python3 scripts/build_icons.py
	node scripts/build_sw.mjs
	@echo "--- map/tokyo.pmtiles size ---"
	@ls -lh map/tokyo.pmtiles

# Local-only: `python3 -m http.server` doesn't support HTTP Range requests,
# which pmtiles needs, so use `serve` for anything touching the .pmtiles.
serve:
	npx serve@latest -l 8901 .

clean-map:
	rm -rf map/tokyo.pmtiles map/style.json map/sw.js map/fonts map/data \
		map/region.geojson map/icon-192.png map/icon-512.png
