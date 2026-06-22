# Strategy Proposal: Côte d'Ivoire Education Access — EBI RFP Response

This repository contains a data-driven proposal in response to the **Education Bridge Initiative (EBI)** RFP, *Strengthening Education Programming in Conflict-Affected Areas*. The strategy section is in [`Strategy_Proposal.md`](Strategy_Proposal.md); the dashboard below is a working demonstration of the methodology it describes, not the proposal itself.

## 📊 Visual artifact
👉 **[https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)**

## 📂 Repository contents

- **`Strategy_Proposal.md`**: The strategy section submitted for this RFP — context, objectives, approach, proposed activities, deliverables.
- **`index.html`**: The demonstration dashboard. Uses Leaflet.js, Chart.js, and PapaParse to visualize school locations and education gap analytics for Côte d'Ivoire.
- **`data/`**: Underlying datasets and background analysis.
  - `civ_schools.csv`: Primary school database for Côte d'Ivoire (sourced from HDX/Enveritas).
  - `northern_education_gaps.csv`: Extracted data on the North-South enrollment disparity.
  - `ebi-angle-statement.md one.md`: Background research and angle statement behind the proposal, including sourced figures and data download links.
- **`scripts/`**:
  - `extract_data.py`: Script used to filter and process the raw markdown data into structured CSV format.

## 🛠️ Key Features
- **Interactive Map**: High-resolution visualization of school clusters across Côte d'Ivoire.
- **Priority Zone Analysis**: Visual highlighting of the Northern region where enrollment is <40%.
- **Analytics Charts**: Dynamic charts showing enrollment gaps and data verification status.
- **Capacity Indicators**: Detailed popups showing estimated student capacity per school site.

## 🚀 How to Run Locally
1. Clone this repository.
2. Open `index.html` in any modern web browser.
3. Ensure you have an internet connection to load the map tiles and library dependencies (Leaflet, Chart.js).

---
*Prepared as part of the ICT for Civic Data - Crash Course 2026.*
