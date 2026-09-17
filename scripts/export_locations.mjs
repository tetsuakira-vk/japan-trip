// Derives map/data/trip.locations.json from data.js — the itinerary's
// per-stop coords are the single source of truth; this just re-shapes them
// for the map build (region extraction + POI-search anchor points).
// Re-run this (via `make map`) whenever data.js gains new days/stops.
import fs from "node:fs";
import vm from "node:vm";

const src = fs.readFileSync(new URL("../data.js", import.meta.url), "utf-8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
// data.js declares `const TRIP`, which (per Node's vm quirks) doesn't land
// on the sandbox object itself — re-evaluate the identifier in the same
// context to pull out the binding.
const TRIP = vm.runInContext("TRIP", sandbox);
if (!TRIP) throw new Error("Could not find TRIP in data.js");

const locations = {};
let n = 0;
for (const day of TRIP.days) {
  for (const stop of day.stops || []) {
    if (!stop.coords) continue;
    const id = `${day.date}__${n++}`;
    locations[id] = {
      name: stop.name,
      lat: stop.coords[0],
      lon: stop.coords[1],
      day: day.date,
      city: day.city,
      tags: stop.tags || [],
    };
  }
  // day-level coords (set for day-trips, used by the itinerary's weather
  // lookup) also count as an anchor even if no individual stop has one
  if (day.coords) {
    const id = `${day.date}__day`;
    locations[id] = { name: day.city, lat: day.coords[0], lon: day.coords[1], day: day.date, city: day.city, tags: [] };
  }
}

fs.mkdirSync(new URL("../map/data/", import.meta.url), { recursive: true });
fs.writeFileSync(
  new URL("../map/data/trip.locations.json", import.meta.url),
  JSON.stringify(locations, null, 2)
);
console.log(`Wrote ${Object.keys(locations).length} locations -> map/data/trip.locations.json`);
