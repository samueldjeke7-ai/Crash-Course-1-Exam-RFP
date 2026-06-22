# Data decisions

This documents the choices made while building the department-level priority score, and why, so the methodology in `Strategy_Proposal.md` can be checked against what the data actually supports.

## 1. ACLED has no open Côte d'Ivoire layer — used real cross-border refugee data instead

The original plan was to overlay ACLED conflict events for Côte d'Ivoire itself. In practice, ACLED's free HDX mirrors exist for Burkina Faso, Mali, Nigeria, and other active-conflict countries, but **not for Côte d'Ivoire** — its own conflict is historical, not currently tracked at event level by ACLED's open distribution. Full event-level ACLED data requires registration (https://acleddata.com/register/), which this environment does not have.

Instead of fabricating conflict points (the previous version of this dashboard did this — see git history), the current version uses a real, open, current number: **226,272 Burkinabé and 6,969 Malian refugees and asylum seekers were hosted in Côte d'Ivoire in 2025** (UNHCR, via HDX HAPI, `hdx_hapi_refugees_civ.csv`). This is national-level only — UNHCR does not publish where in Côte d'Ivoire these refugees are settled — so it is used as supporting context (the "why this matters now" KPI), not as a per-department score input.

## 2. Border proximity as the cross-border exposure proxy

Because no subnational conflict or refugee-placement data exists for Côte d'Ivoire, the demonstration uses each department's latitude, normalised against the country's full range, as a proxy for proximity to the Mali / Burkina Faso border — the source of the current displacement pressure described in the angle statement. This was checked against the actual administrative geometry: the six regions that geometrically reach the country's northern boundary are Bagoue, Tchologo, Folon, Poro, Kabadougou, and Bounkani. These six contain 21 of the 36 high-priority departments the model finds — supporting the proxy, but it is a structural stand-in for conflict exposure, not a measured one. EBI field validation (Strategy_Proposal.md, Activity 1) should test this directly against what field staff know.

## 3. Abidjan excluded from the school-access ranking

The Enveritas primary school geolocation dataset (`data/civ_schools.csv`) returned 1,980 mapped schools for the Abidjan district against 1.42M school-age children — a ratio of ~717 children per school, nearly double the next-highest department nationally. Every other department in the top 10 by this ratio is rural with plausible small school counts (23–215 schools). Abidjan's outlier value is a coverage gap, not a real finding: satellite/field-verified rural school detection does not reliably capture dense, multi-building urban school infrastructure. Abidjan is shown on the map but excluded from the priority ranking and terciles, which are computed across the remaining 107 departments. Yamoussoukro (the other autonomous district) was checked and found in-range (225–435 children/school, consistent with rural departments), so it was kept in the ranking.

## 4. Sources

- School locations: Enveritas primary school geolocation dataset, via HDX (`data/civ_schools.csv`, 18,119 points, 18,105 matched to a department)
- School-age population (ages 5–14) by department: UNFPA-sourced subnational population statistics, via HDX `cod-ps-civ` (`civ_admpop_adm2_v2.csv`)
- Administrative boundaries: OCHA `cod-ab-civ` (HDX), department (admin2) and region (admin1) level
- Refugee/asylum-seeker counts: UNHCR, via HDX HAPI (`hdx_hapi_refugees_civ.csv`)
