// Fetches a friend's "JapanEats" Google My Maps restaurant list (public KML
// export) and converts it to map/data/japaneat.geojson. Node, not Python,
// because the KML->GeoJSON conversion needs @tmcw/togeojson + @xmldom/xmldom
// (no ogr2ogr/GDAL available, and Python has no equivalent one-liner).
//
// Attribution matters here: this is someone else's curated list, not ours —
// the map page must credit "Japan Eat (japaneat.com)" wherever these pins
// show up (see map/map.html).
import fs from "node:fs";
import https from "node:https";
import { DOMParser } from "@xmldom/xmldom";
import { kml } from "@tmcw/togeojson";

const KML_URL = "https://www.google.com/maps/d/kml?mid=1WaXx9fIyGOt_YnikRB7Id8IpzVCqGzw&forcekml=1";
const OUT_PATH = new URL("../map/data/japaneat.geojson", import.meta.url);

function fetchText(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "japan-trip-personal-itinerary/1.0" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects > 0) {
        res.resume();
        resolve(fetchText(new URL(res.headers.location, url).toString(), redirects - 1));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
        return;
      }
      let data = "";
      res.setEncoding("utf-8");
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

// The list isn't scoped to this trip — it spans all of Japan. Only points
// inside the extracted basemap's coverage are useful here (pins outside it
// would render with no map underneath); bounds match `pmtiles show
// map/tokyo.pmtiles --metadata`.
const BOUNDS = { minLon: 139.15, maxLon: 140.2, minLat: 35.1, maxLat: 36.85 };

const xmlText = await fetchText(KML_URL);
const doc = new DOMParser().parseFromString(xmlText, "text/xml");
const converted = kml(doc);

function descriptionText(d) {
  if (!d) return null;
  const raw = typeof d === "string" ? d : d.value || "";
  const text = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text || null;
}

const features = [];
let skippedOutOfBounds = 0;
for (const f of converted.features) {
  if (!f.geometry || f.geometry.type !== "Point") continue; // skip any line/polygon folders
  const [lon, lat] = f.geometry.coordinates;
  if (lon < BOUNDS.minLon || lon > BOUNDS.maxLon || lat < BOUNDS.minLat || lat > BOUNDS.maxLat) {
    skippedOutOfBounds++;
    continue;
  }
  const props = f.properties || {};
  const name = props.name || "Unnamed";
  features.push({
    type: "Feature",
    geometry: { type: "Point", coordinates: [lon, lat] },
    properties: {
      name,
      name_ja: null,
      category: "japaneat",
      source: "japaneat",
      note: descriptionText(props.description),
      apple: `https://maps.apple.com/?q=${encodeURIComponent(name)}&ll=${lat},${lon}`,
    },
  });
}

fs.mkdirSync(new URL("../map/data/", import.meta.url), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify({ type: "FeatureCollection", features }));
console.log(`Wrote ${features.length} JapanEats picks in range -> map/data/japaneat.geojson (${skippedOutOfBounds} elsewhere in Japan, skipped)`);
