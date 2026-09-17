// Bakes the MapLibre style.json from protomaps-themes-base at build time —
// nothing is fetched at runtime, so this must be re-run (via `make map`)
// whenever tokyo.pmtiles or the theme choice changes.
import fs from "node:fs";
import * as pmtb from "protomaps-themes-base";

// layers() needs a full Theme object (colors), not a theme name — get it
// from namedTheme() first. It also needs regular/bold/italic font-stack
// names filled in; we only vendor one weight (see export_glyphs.mjs), so
// all three point at the same fontstack — no real bold/italic glyph data.
const theme = pmtb.namedTheme("light");
theme.regular = "Noto Sans Regular";
theme.bold = "Noto Sans Regular";
theme.italic = "Noto Sans Regular";
const layers = pmtb.layers("protomaps", theme, { lang: "ja" });

const style = {
  version: 8,
  glyphs: "./fonts/{fontstack}/{range}.pbf",
  sprite: "./sprites/light",
  sources: {
    protomaps: {
      type: "vector",
      url: "pmtiles://./tokyo.pmtiles",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    },
  },
  layers,
};

fs.writeFileSync(new URL("../map/style.json", import.meta.url), JSON.stringify(style));
console.log(`wrote map/style.json (${layers.length} layers)`);
