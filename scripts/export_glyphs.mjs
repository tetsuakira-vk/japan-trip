// Vendors the "Noto Sans Regular" fallback glyph pack (smp-noto-glyphs,
// MIT) into map/fonts/. Covers Latin/Cyrillic/Greek/etc — CJK and Hangul are
// deliberately NOT bundled here (that pack doesn't include them either):
// MapLibre renders Japanese labels client-side via `localIdeographFontFamily`
// using the device's own installed fonts, which is both far smaller and
// actually necessary (a full CJK PBF glyph set is tens of thousands of
// codepoints — impractical to vendor for a personal offline map).
//
// The style's regular/bold/italic all point at this one fontstack name —
// there's no real bold/italic glyph data here, so everything renders at one
// visual weight. Acceptable trade-off for a personal offline map.
import fs from "node:fs";
import zlib from "node:zlib";

const FONTSTACK = "Noto Sans Regular";
const SRC_DIR = new URL("../node_modules/smp-noto-glyphs/fixtures/glyphs/", import.meta.url);
const OUT_DIR = new URL(`../map/fonts/${encodeURIComponent(FONTSTACK)}/`, import.meta.url);

fs.mkdirSync(OUT_DIR, { recursive: true });
const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".pbf.gz"));
let total = 0;
for (const f of files) {
  const gz = fs.readFileSync(new URL(f, SRC_DIR));
  const pbf = zlib.gunzipSync(gz);
  const range = f.replace(/\.pbf\.gz$/, ".pbf");
  fs.writeFileSync(new URL(range, OUT_DIR), pbf);
  total += pbf.length;
}
console.log(`Vendored ${files.length} glyph ranges (${(total / 1024).toFixed(0)} KB) -> map/fonts/${FONTSTACK}/`);
