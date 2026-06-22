# Strategy Proposal: Strengthening Education Programming in Conflict-Affected Areas

**Submitted in response to:** Education Bridge Initiative (EBI) RFP
**Visual artifact (GitHub Pages):** [https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)
**Repository & data:** [https://github.com/samueldjeke7-ai/Crash-Course-1-Exam-RFP](https://github.com/samueldjeke7-ai/Crash-Course-1-Exam-RFP)

---

## 1. Context

EBI already knows where its education programming is most needed: northern Côte d'Ivoire, where the 2002–2011 conflict pushed over 700,000 children out of school and 60% of teachers from their posts, and where net enrolment still sits below 40% — roughly half the national average. EBI's own preliminary exercise has identified the underlying symptom: a mismatch between where schools exist and where school-age children actually live, now sharpened by displacement from Burkina Faso and Mali. What EBI lacks is not awareness of the problem but a systematic, repeatable way to locate that mismatch at community level, rank it, and keep the picture current as conflict and population data change. That gap — between informal field knowledge and a structured prioritisation tool — is what this proposal addresses.

## 2. Objectives

1. **Give EBI a defensible basis for prioritising where to act first.** Replace ad hoc, country-office-level intuition about which departments need schools most with a ranked, data-backed gap score.
2. **Make conflict risk visible alongside education gaps.** Let EBI see, in one view, where the school-to-population mismatch and active conflict risk overlap — the sites where intervention is both most needed and most urgent.
3. **Equip EBI to extend the same approach beyond Côte d'Ivoire.** Build the methodology on data sources (Enveritas, ACLED, WorldPop) that exist for all 12 of EBI's operating countries, so the same logic transfers without new data infrastructure.

## 3. Approach

Education access is a spatial problem, and EBI's own data already contains the answer if the right layers are combined. We propose cross-referencing three open datasets per department: Enveritas school geolocation, WorldPop school-age population, and ACLED conflict events. Overlaying these produces a "children per school" ratio and a conflict-exposure flag for every department — concretely, a map showing that a department with few schools, a high child population, and recent conflict events nearby is a department EBI should prioritise over one with the same school shortage but no active conflict risk. AI is used to make this workflow fast rather than novel: automated spatial joins between school and conflict locations, a scoring step that ranks departments by gap size, and a lightweight dashboard that recalculates as new conflict data is published — so the picture stays current without manual re-analysis each time.

## 4. Proposed Activities

1. **Validate the methodology with EBI field staff.** Walk country teams through the scoring logic and data sources, and incorporate what they know that the data doesn't capture — schools that exist but aren't yet mapped, or population estimates that lag recent displacement. The scoring logic is adjusted on this feedback before EBI relies on it.
2. **Agree the implementation country with EBI.** Côte d'Ivoire is used here as the worked example because its conflict and displacement data are well documented, but the choice of where to deploy first is EBI's, based on where the prioritisation gap is operationally most urgent across its 12 countries.
3. **Hand over the dashboard and underlying pipeline.** Deliver the scoring methodology, the data pipeline, and a dashboard configured for the agreed country, so EBI's own team can re-run the analysis as data updates — without depending on an external contractor.

## 5. Deliverables

| Deliverable | Description |
| :--- | :--- |
| Prioritisation scoring methodology | The cross-referencing logic (school location × child population × conflict events) that produces a ranked gap score per department, validated with EBI field staff. |
| Interactive dashboard (Côte d'Ivoire demonstration) | A working map and analytics view — built with Leaflet and Chart.js — showing the methodology applied to northern Côte d'Ivoire, with marker clustering and color-coded risk levels distinguishing high- and low-priority departments. |
| Underlying datasets | School geolocation, population, and conflict event data, cleaned and structured per department, included in the GitHub repository for inspection. |
| Configured pipeline for EBI's chosen country | The same scoring methodology re-run against the country agreed in Activity 2, ready for EBI's team to maintain independently. |

---
*Prepared as part of ICT for Civic Data — Crash Course 2026 (Turin University).*
*RFP: Strengthening Education Programming in Conflict-Affected Areas. Funder: Education Bridge Initiative (EBI).*
