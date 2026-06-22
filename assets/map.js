// School-access priority map, Côte d'Ivoire.
// Conclusion in the foreground, data in the background: high priority
// departments render in full saturation and sit on top; medium/low are
// desaturated so the eye lands on red first.

const COLORS = {
  high:    "#b42318",
  medium:  "#e8853b",
  low:     "#f3d77a",
  excluded: "#cfcac0",
};
const FILL_OPACITY = {
  high:    0.85,
  medium:  0.6,
  low:     0.55,
  excluded: 0.5,
};
const STROKE = {
  high:    { color: "#7a1410", weight: 0.9 },
  medium:  { color: "#a35820", weight: 0.5 },
  low:     { color: "#a08a3a", weight: 0.4 },
  excluded:{ color: "#9a948a", weight: 0.4 },
};
const CLASS_LABEL = {
  high: "High priority",
  medium: "Medium priority",
  low: "Lower priority",
  excluded: "Excluded from ranking",
};

const map = L.map("map", {
  zoomControl: true,
  scrollWheelZoom: false,
  attributionControl: true,
}).setView([7.9, -5.5], 7);

L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", {
  maxZoom: 11,
  minZoom: 6,
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
}).addTo(map);

function styleDept(feature) {
  const cls = feature.properties.priority_class || "low";
  return {
    color: STROKE[cls].color,
    weight: STROKE[cls].weight,
    fillColor: COLORS[cls],
    fillOpacity: FILL_OPACITY[cls],
  };
}

function fmt(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "n/a";
  if (typeof n === "number") return n.toLocaleString();
  return n;
}

function popupHtml(p) {
  const cls = p.priority_class || "low";
  const badgeCls = { high: "pop-hi", medium: "pop-med", low: "pop-lo", excluded: "pop-lo" }[cls];
  const excludedNote = cls === "excluded"
    ? `<p class="pop-foot" style="font-style:normal;">Excluded from ranking: urban school infrastructure is not reliably captured by the Enveritas rural school dataset. See docs/data_decisions.md.</p>`
    : "";
  return `
    <h3>${p.adm2_name} <span class="pop-state">(${p.adm1_name})</span></h3>
    <span class="pop-class ${badgeCls}">${CLASS_LABEL[cls]}</span>
    <table>
      <tr><td class="k">Schools mapped (Enveritas)</td><td class="v">${fmt(p.school_count)}</td></tr>
      <tr><td class="k">School-age children (5-14)</td><td class="v">${fmt(p.school_age_pop)}</td></tr>
      <tr><td class="k">Children per school</td><td class="v">${p.children_per_school === null ? "n/a" : fmt(Math.round(p.children_per_school))}</td></tr>
      <tr><td class="k">Borders Mali / Burkina Faso</td><td class="v">${p.is_border_region ? "Yes" : "No"}</td></tr>
      <tr><td class="k">Composite score</td><td class="v">${p.composite_score === null ? "n/a" : Number(p.composite_score).toFixed(2)}</td></tr>
    </table>
    ${excludedNote}
    <p class="pop-foot">Sources: Enveritas (HDX), UNFPA subnational population (HDX cod-ps-civ).</p>
  `;
}

function onEachFeature(feature, layer) {
  const cls = feature.properties.priority_class || "low";
  layer.bindPopup(popupHtml(feature.properties), { maxWidth: 320, autoPan: true });
  layer.on({
    mouseover: e => e.target.setStyle({ weight: 1.6, color: "#000" }),
    mouseout:  e => e.target.setStyle(STROKE[cls]),
  });
  if (cls === "high") setTimeout(() => layer.bringToFront(), 0);
}

function buildLegend() {
  const el = document.getElementById("legend");
  el.innerHTML = `
    <span class="title">Priority class (department)</span>
    <div><span class="swatch sw-hi"></span> High priority</div>
    <div><span class="swatch sw-med"></span> Medium</div>
    <div><span class="swatch sw-lo"></span> Lower</div>
    <div><span class="swatch sw-excluded"></span> Excluded (urban data gap)</div>
  `;
}

async function load() {
  const [depts, regions, insights] = await Promise.all([
    fetch("assets/depts.geojson").then(r => r.json()),
    fetch("assets/regions.geojson").then(r => r.json()),
    fetch("assets/insights.json").then(r => r.json()),
  ]);

  const deptLayer = L.geoJSON(depts, { style: styleDept, onEachFeature }).addTo(map);

  const regionCasing = L.geoJSON(regions, {
    style: { color: "#ffffff", weight: 5, fill: false, opacity: 0.9, lineJoin: "round", lineCap: "round" },
  }).addTo(map);
  const regionLine = L.geoJSON(regions, {
    style: { color: "#0d4f4f", weight: 1.8, fill: false, opacity: 0.9, lineJoin: "round", lineCap: "round" },
  }).addTo(map);
  setTimeout(() => { regionCasing.bringToFront(); regionLine.bringToFront(); }, 0);

  map.fitBounds(deptLayer.getBounds(), { padding: [12, 12] });

  buildLegend();
  renderFindings(insights);
}

function renderFindings(d) {
  const kpiEl = document.getElementById("kpi-high-num");
  if (kpiEl) kpiEl.textContent = d.priority_counts.high;

  const cellSchools = document.getElementById("cell-schools");
  if (cellSchools) cellSchools.textContent = fmt(d.total_schools_mapped);

  const cellRefugees = document.getElementById("cell-refugees");
  if (cellRefugees) cellRefugees.textContent = fmt(d.refugees_from_burkina_faso_2025 + d.refugees_from_mali_2025);

  const cellChildren = document.getElementById("cell-children");
  if (cellChildren) cellChildren.textContent = fmt(d.total_school_age_population_scored);
}

load().catch(err => {
  document.getElementById("map").textContent = "Failed to load map data: " + err.message;
});
