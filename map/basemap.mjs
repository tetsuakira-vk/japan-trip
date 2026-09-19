// Shared offline-basemap loader for map.html and recorder/recorder.html —
// both need a MapLibre instance backed by the same tokyo.pmtiles/style.json,
// with the same two fixes applied: GitHub Pages doesn't reliably honour
// HTTP Range requests on the .pmtiles file (observed live: 200 with the
// full body instead of 206, which pmtiles.js treats as fatal), so we fetch
// it once as a plain GET and hand pmtiles.js an in-memory buffer to slice
// locally; and MapLibre v6 requires the style's `sprite` URL to be
// absolute, so we resolve it before handing the style to MapLibre.
//
// Paths are resolved relative to THIS module's own location (via
// import.meta.url), not the importing page's, so it works the same
// whether it's loaded from map/map.html or recorder/recorder.html.
import { Map as MLMap, NavigationControl, GeolocateControl, Popup, addProtocol } from './vendor/maplibre-gl.mjs';

export { NavigationControl, GeolocateControl, Popup };

const PMTILES_URL = new URL('./tokyo.pmtiles', import.meta.url).href;
const STYLE_URL = new URL('./style.json', import.meta.url).href;

class BufferSource {
  constructor(key, buf) { this.key = key; this.buf = buf; }
  getKey() { return this.key; }
  async getBytes(offset, length) { return { data: this.buf.slice(offset, offset + length) }; }
}

async function fetchWithProgress(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
  const total = Number(res.headers.get('content-length')) || 0;
  if (!res.body || !total) return res.arrayBuffer();
  const reader = res.body.getReader();
  let received = 0;
  const chunks = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    onProgress(received / total);
  }
  const buf = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) { buf.set(chunk, offset); offset += chunk.length; }
  return buf.buffer;
}

let protocolRegistered = false;

// options: { container, center, zoom, onProgress(frac), ...mapOptions }
// Note: this depends on ./pmtiles.js already being loaded as a classic
// script (for the `pmtiles` global) — see the <script src="./pmtiles.js">
// tag both pages include before importing this module.
export async function createOfflineMap({ container, center, zoom, onProgress, ...mapOptions }) {
  if (!protocolRegistered) {
    const protocol = new pmtiles.Protocol();
    addProtocol('pmtiles', protocol.tile);
    globalThis.__pmtilesProtocol = protocol;
    protocolRegistered = true;
  }
  const protocol = globalThis.__pmtilesProtocol;

  const [style, pmBuf] = await Promise.all([
    fetch(STYLE_URL).then((r) => r.json()),
    fetchWithProgress(PMTILES_URL, onProgress || (() => {})),
  ]);
  // Relative `sprite`/`glyphs` in style.json resolve against the PAGE's own
  // location when `style` is passed as an object (not a URL) — which only
  // happened to work when map.html loaded this itself, since it shares a
  // directory with style.json. Resolve both explicitly here so this also
  // works from recorder.html. `glyphs` contains a literal
  // "{fontstack}/{range}" template MapLibre string-replaces later, so only
  // the directory prefix (up to the first "{") goes through URL resolution
  // — `new URL()` would otherwise percent-encode the braces and break it.
  if (style.sprite) style.sprite = new URL(style.sprite, STYLE_URL).href;
  if (style.glyphs) {
    const i = style.glyphs.indexOf('{');
    style.glyphs = new URL(style.glyphs.slice(0, i), STYLE_URL).href + style.glyphs.slice(i);
  }
  // Key must exactly match style.json's pmtiles:// source URL so the
  // protocol handler resolves tile requests to this buffered instance.
  protocol.add(new pmtiles.PMTiles(new BufferSource('./tokyo.pmtiles', pmBuf)));

  return new MLMap({
    container,
    style,
    center,
    zoom,
    attributionControl: false,
    localIdeographFontFamily: "'Hiragino Sans','Hiragino Kaku Gothic ProN',sans-serif",
    ...mapOptions,
  });
}
