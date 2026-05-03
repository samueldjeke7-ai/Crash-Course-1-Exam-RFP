# EBI Intelligence Dashboard: Côte d'Ivoire Education Monitor

This repository contains a data-driven response to the **Education Bridge Initiative (EBI)** RFP, focusing on bridging the education gap in conflict-affected regions of Northern Côte d'Ivoire.

## 📊 Live Map & Dashboard
You can view the interactive data visualization directly here:
👉 **[https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)**

## 📂 Project Structure
The repository is organized as follows to ensure data integrity and ease of use:

- **`index.html`**: The core interactive dashboard. It uses Leaflet.js, Chart.js, and PapaParse to visualize school locations and education gap analytics.
- **`data/`**: Contains all foundational datasets and strategic documents.
  - `civ_schools.csv`: The full database of primary schools in Côte d'Ivoire (sourced from HDX/Enveritas).
  - `northern_education_gaps.csv`: Extracted data focusing specifically on the North-South enrollment disparity.
  - `strategy_proposal.md`: A detailed strategy document connecting the data work to EBI's funding goals.
  - `ebi-angle-statement.md one.md`: The original RFP response and data analysis plan.
- **`scripts/`**:
  - `extract_data.py`: A Python script used to filter and process the raw markdown data into structured CSV format.

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
