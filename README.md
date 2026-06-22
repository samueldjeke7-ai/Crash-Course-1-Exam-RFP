# Strategy Proposal: Côte d'Ivoire Education Access — EBI RFP Response

This repository contains a data-driven proposal in response to the **Education Bridge Initiative (EBI)** RFP, *Strengthening Education Programming in Conflict-Affected Areas*. The strategy section is in [`Strategy_Proposal.md`](Strategy_Proposal.md); the dashboard below is a working demonstration of the methodology it describes, not the proposal itself.

## 📊 Visual artifact
👉 **[https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)**

A choropleth of all 108 Côte d'Ivoire departments, scored on a composite of school-access gap and proximity to the Mali/Burkina Faso border, with per-department popups and sourced KPIs.

## 📂 Repository contents

- **`Strategy_Proposal.md`**: The strategy section submitted for this RFP — context, objectives, approach, proposed activities, deliverables.
- **`index.html`**: The demonstration dashboard (Leaflet choropleth).
- **`assets/`**: Map code and generated geodata.
  - `map.js`, `style.css`: Dashboard rendering logic and styling.
  - `depts.geojson`: Department boundaries with composite priority scores.
  - `regions.geojson`: Region boundaries (overlay only).
  - `insights.json`: Aggregate KPI figures shown in the findings strip.
- **`data/`**: Source and derived datasets.
  - `civ_schools.csv`: Primary school geolocation data for Côte d'Ivoire (Enveritas, via HDX).
  - `civ_dept_composite_scores.csv`: The full per-department scoring table behind the dashboard — school counts, population, composite score, priority class.
  - `ebi-angle-statement.md one.md`: Background research and angle statement behind the proposal, including sourced figures and data download links.
- **`docs/data_decisions.md`**: The data-quality decisions behind the methodology — why ACLED isn't used directly, why Abidjan is excluded from the ranking, and what the border-proximity proxy actually measures.
- **`scripts/`**:
  - `extract_data.py`: Script used to filter and process the raw markdown data into structured CSV format.

## 🛠️ Methodology

Each department is scored on two real, sourced indicators — a school-age-population-to-mapped-school ratio (Enveritas + UNFPA) and a border-proximity proxy for cross-border displacement pressure (justified by 226,272 Burkinabé and 6,969 Malian refugees hosted in Côte d'Ivoire in 2025, UNHCR) — combined into a single composite score and classified into three priority tiers. Full reasoning, limitations, and exclusions are in [`docs/data_decisions.md`](docs/data_decisions.md).

## 🚀 How to Run Locally
1. Clone this repository.
2. Serve the directory with any static file server (e.g. `python3 -m http.server`) and open `index.html` — opening the file directly (`file://`) will block the `fetch()` calls to the GeoJSON/JSON assets.
3. Ensure you have an internet connection to load the map tiles and Leaflet library.

---
*Prepared as part of the ICT for Civic Data - Crash Course 2026.*
