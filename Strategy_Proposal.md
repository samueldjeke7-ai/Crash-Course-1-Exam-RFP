# Strategy Proposal: Strengthening Education Programming in Conflict-Affected Areas

**Submitted in response to:** Education Bridge Initiative (EBI) RFP
**Visual artifact (GitHub Pages):** [https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)
**Repository & data:** [https://github.com/samueldjeke7-ai/Crash-Course-1-Exam-RFP](https://github.com/samueldjeke7-ai/Crash-Course-1-Exam-RFP)

---

## 1. Context

EBI already knows where its education programming is most needed: northern Côte d'Ivoire, where the 2002–2011 conflict pushed over 700,000 children out of school and 60% of teachers from their posts, and where net enrolment still sits below 40% — roughly half the national average. EBI's own preliminary exercise has identified the underlying symptom: a mismatch between where schools exist and where school-age children actually live, now sharpened by displacement from Burkina Faso and Mali. What EBI lacks is not awareness of the problem but a systematic, repeatable way to locate that mismatch at community level, rank it, and keep the picture current as conflict and population data change. That gap — between informal field knowledge and a structured prioritisation tool — is what this proposal addresses.

## 2. Objectives

1. **Give EBI a defensible basis for prioritising where to act first.** Replace ad hoc, country-office-level intuition about which departments need schools most with a ranked, data-backed gap score.
2. **Make cross-border displacement pressure visible alongside the education gap.** Let EBI see, in one view, where the school-to-population mismatch and proximity to an active displacement corridor overlap — the sites where intervention is both most needed and most urgent.
3. **Equip EBI to extend the same approach beyond Côte d'Ivoire.** Build the methodology on data sources (school geolocation, subnational population, displacement/refugee statistics) that exist in comparable form for other EBI operating countries, so the same logic transfers without new data infrastructure.

## 3. Approach

Education access is a spatial problem, and the answer is already contained in open data if the right layers are combined and the gaps in that data are handled honestly. For every department in Côte d'Ivoire, we cross-reference real school geolocation data (Enveritas, 18,119 points) against real subnational population statistics (UNFPA, via HDX) to compute a children-per-school ratio, and combine it with each department's proximity to the Mali / Burkina Faso border — the documented source of the region's current displacement pressure (226,272 Burkinabé and 6,969 Malian refugees were hosted in Côte d'Ivoire in 2025, UNHCR). The two indicators are normalised and combined into a single composite score, then classified into three priority tiers.

Two decisions shaped this approach, and both are documented in full in `docs/data_decisions.md`: first, ACLED has no open, registration-free conflict layer for Côte d'Ivoire itself (only for neighbouring Burkina Faso and Mali), so real cross-border refugee data is used as the displacement indicator instead of fabricating conflict points. Second, the Abidjan district was excluded from the ranking after the data showed an implausible 717 children per mapped school there — a sign that the school geolocation dataset under-covers dense urban infrastructure, not a real access gap. AI is used to make this workflow fast and to catch issues like the Abidjan anomaly, not to replace the judgment calls above — those are reviewed and decided by us, and should be reviewed again with EBI field staff in Activity 1.

## 4. Proposed Activities

1. **Validate the methodology with EBI field staff.** Walk country teams through the scoring logic and data sources, and incorporate what they know that the data doesn't capture — schools that exist but aren't yet mapped, or population estimates that lag recent displacement. The scoring logic is adjusted on this feedback before EBI relies on it.
2. **Agree the implementation country with EBI.** Côte d'Ivoire is used here as the worked example because its conflict and displacement data are well documented, but the choice of where to deploy first is EBI's, based on where the prioritisation gap is operationally most urgent across its 12 countries.
3. **Hand over the dashboard and underlying pipeline.** Deliver the scoring methodology, the data pipeline, and a dashboard configured for the agreed country, so EBI's own team can re-run the analysis as data updates — without depending on an external contractor.

## 5. Deliverables

| Deliverable | Description |
| :--- | :--- |
| Prioritisation scoring methodology | The cross-referencing logic (school location × school-age population × border-displacement proximity) that produces a ranked composite score per department, including the documented decisions behind it, ready to be validated with EBI field staff. |
| Interactive dashboard (Côte d'Ivoire demonstration) | A choropleth of all 108 departments — built with Leaflet — color-coded by priority tier, with per-department popups showing the indicators behind each score. |
| Underlying datasets | School geolocation (Enveritas), subnational population (UNFPA), and refugee/displacement statistics (UNHCR), cleaned, joined per department, and included in the GitHub repository for inspection, alongside the data-quality decisions made along the way. |
| Configured pipeline for EBI's chosen country | The same scoring methodology re-run against the country agreed in Activity 2, ready for EBI's team to maintain independently. |

---
*Prepared as part of ICT for Civic Data — Crash Course 2026 (Turin University).*
*RFP: Strengthening Education Programming in Conflict-Affected Areas. Funder: Education Bridge Initiative (EBI).*
