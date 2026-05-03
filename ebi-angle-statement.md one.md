# Angle Statement — EBI RFP Response
## Strengthening Education Programming in Conflict-Affected Areas Through Data-Driven Approaches

**Funder:** Education Bridge Initiative (EBI)
**Country:** Côte d'Ivoire (Ivory Coast)
**Region:** Northern Côte d'Ivoire — Bouaké, Korhogo, Man, Danané
**Education disruption type:** Legacy conflict damage + displacement pressure from Burkina Faso / Mali
**Infrastructure gap:** Mismatch between school locations and school-age population distribution

---

## Real Numbers (sourced from OCHA, USIP, World Bank)

| Indicator | Figure | Source |
|-----------|--------|--------|
| Children out of school at peak of crisis (2002–2004) | **700,000+** | USIP Education and Conflict in CIV |
| Net enrolment rate in Korhogo / Odienné (north) | **below 40%** | World Bank / ACLED study |
| Net enrolment rate in southern CIV | **close to 80%** | World Bank / ACLED study |
| Schools functioning in Man before the crisis | **913** | OCHA Situation Report No. 24 |
| Primary school students in Bouaké before crisis | **177,965** | OCHA Situation Report No. 24 |
| Teachers not in post at conflict peak | **60%** | UNICEF / ReliefWeb |
| North–South enrolment gap | **2× lower in North** | World Bank study |

---

## Angle Statement (with real numbers)

Côte d'Ivoire's civil conflict (2002–2011) displaced over **700,000 children** from school —
one of the largest education crises in West Africa's recent history. In the northern regions
— Bouaké, Korhogo, Man, and Danané — net enrolment rates fell **below 40%**, compared to
nearly 80% in the south: a gap of **2×**. An estimated **60% of teachers** abandoned their
posts at the conflict's peak. In Man alone, 913 schools had been functioning before the
crisis; the pace of reopening never fully caught up with demand.

Today, the north–south enrolment gap persists. Northern Côte d'Ivoire now also receives
**displaced populations fleeing ongoing instability in Burkina Faso and Mali**, adding new
concentrations of school-age children to areas whose infrastructure was never fully restored.
National-level statistics mask this: they show aggregate improvement, but cannot show where
the mismatch between school supply and child population is sharpest at community level —
exactly the gap EBI's own preliminary exercise identified.

This proposal uses three open data sources — the **Enveritas primary school geolocation
dataset** (satellite-detected and field-verified, available on HDX), **ACLED conflict event
data** for Côte d'Ivoire (2002–present), and **WorldPop school-age population estimates** —
to map, for each department in northern CIV, the ratio of available schools to school-age
children. The output is a prioritisation map that directly answers EBI's core planning
question: where is the gap between need and provision largest, and where should resources
go first?

AI is integrated at three concrete steps: automated cross-referencing of school locations
against conflict event zones, AI-assisted scoring of departments by population-to-school
ratio, and a lightweight monitoring dashboard that updates as new ACLED data is published —
giving EBI headquarters a live picture of emerging risk without waiting for field reports.
Every tool is open-source and outputs are readable by non-technical field staff.

Because every data source used exists for all of EBI's 12 operating countries, the same
pipeline applies to South Sudan, Myanmar, or Yemen with no new data infrastructure —
making adaptability a design principle of the approach, not a footnote.

---

## Python Analysis Script
*Run this once you have downloaded the four datasets to produce the prioritisation map*

```python
"""
EBI RFP — Côte d'Ivoire Education Access Analysis
Requires: pandas, geopandas, matplotlib

Data to download first (all free):
  Schools   → https://data.humdata.org/dataset/cote-d-ivoire-primary-schools
  Boundaries→ https://data.humdata.org/dataset/cod-ab-civ
  Population→ https://hub.worldpop.org/geodata/listing?id=29
  Conflict  → https://acleddata.com/data-export-tool/
"""

import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
from pathlib import Path

# ── 1. Load data ──────────────────────────────────────────────────────────────
schools = pd.read_csv("data/civ_schools_enveritas.csv")
schools_gdf = gpd.GeoDataFrame(
    schools,
    geometry=gpd.points_from_xy(schools["longitude"], schools["latitude"]),
    crs="EPSG:4326"
)

admin = gpd.read_file("data/civ_admbnda_adm3.shp").to_crs("EPSG:4326")

# Pre-aggregated WorldPop per department (columns: dept_name, pop_5_14)
pop = pd.read_csv("data/civ_schoolage_pop_by_dept.csv")

acled = pd.read_csv("data/civ_acled_events.csv")
acled_gdf = gpd.GeoDataFrame(
    acled,
    geometry=gpd.points_from_xy(acled["longitude"], acled["latitude"]),
    crs="EPSG:4326"
)

# ── 2. Filter northern departments ───────────────────────────────────────────
NORTHERN_DEPTS = [
    "Bouaké", "Bouaké Rural", "Korhogo", "Man", "Danané",
    "Séguéla", "Odienné", "Bondoukou", "Touba", "Mankono"
]
north = admin[admin["ADM3_EN"].isin(NORTHERN_DEPTS)].copy()

# ── 3. Spatial joins ──────────────────────────────────────────────────────────
school_counts = (
    gpd.sjoin(schools_gdf, north[["ADM3_EN", "geometry"]], how="inner", predicate="within")
    .groupby("ADM3_EN").size().reset_index(name="school_count")
)
conflict_counts = (
    gpd.sjoin(acled_gdf, north[["ADM3_EN", "geometry"]], how="inner", predicate="within")
    .groupby("ADM3_EN").size().reset_index(name="conflict_events")
)

# ── 4. Merge and calculate gap score ─────────────────────────────────────────
north = (north
    .merge(school_counts, on="ADM3_EN", how="left")
    .merge(conflict_counts, on="ADM3_EN", how="left")
    .merge(pop, left_on="ADM3_EN", right_on="dept_name", how="left")
)
north["school_count"] = north["school_count"].fillna(0)
north["conflict_events"] = north["conflict_events"].fillna(0)
north["children_per_school"] = (
    north["pop_5_14"] / north["school_count"].replace(0, float("nan"))
)

# ── 5. Print priority table ───────────────────────────────────────────────────
summary = north[["ADM3_EN", "school_count", "pop_5_14",
                  "children_per_school", "conflict_events"]]
summary = summary.sort_values("children_per_school", ascending=False)
print("\n=== School Access Gap — Northern Côte d'Ivoire ===")
print(summary.to_string(index=False))

threshold = summary["children_per_school"].quantile(0.75)
priority = summary[summary["children_per_school"] >= threshold]
print(f"\n⚠  Priority departments ({len(priority)} with largest gaps):")
print(priority[["ADM3_EN", "children_per_school", "conflict_events"]].to_string(index=False))

# ── 6. Map ────────────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(10, 10))

north.plot(
    column="children_per_school", ax=ax,
    legend=True, cmap="YlOrRd", missing_kwds={"color": "lightgrey"},
    legend_kwds={"label": "Children per school (higher = more under-served)", "shrink": 0.6}
)

# Conflict events as sized bubbles on centroids
centroids = north.copy()
centroids["geometry"] = centroids.geometry.centroid
centroids.plot(ax=ax, markersize=centroids["conflict_events"] / 5,
               color="steelblue", alpha=0.5, label="Conflict events")

ax.set_title(
    "Northern Côte d'Ivoire\nSchool Access Gap vs. Conflict Density",
    fontsize=14, fontweight="bold"
)
ax.set_axis_off()
plt.legend(loc="lower right")
plt.tight_layout()

out = Path("outputs/civ_school_access_gap_map.png")
out.parent.mkdir(exist_ok=True)
plt.savefig(out, dpi=150, bbox_inches="tight")
print(f"\n✓ Map saved to {out}")
plt.show()
```

---

## Data Download Links

| Dataset | URL |
|---------|-----|
| Enveritas CIV primary schools (CSV + shapefile) | https://data.humdata.org/dataset/cote-d-ivoire-primary-schools |
| CIV admin boundaries Level 0–3 | https://data.humdata.org/dataset/cod-ab-civ |
| WorldPop school-age population (5–14) | https://hub.worldpop.org/geodata/listing?id=29 |
| ACLED conflict events for CIV | https://acleddata.com/data-export-tool/ |
| Education in Danger incidents | https://data.humdata.org/group/civ |

---

## Evaluation Criteria Mapping

| Criterion | How the angle addresses it |
|-----------|---------------------------|
| Relevance & innovation | Mirrors EBI's own framing — uses "discrepancy between schools and children" language, with real numbers: 700,000 out-of-school, 40% enrolment in north |
| Data-driven approach | Three named open sources: Enveritas + ACLED + WorldPop — all free, confirmed on HDX |
| Use of technology | AI in 3 specific steps: cross-referencing, scoring, live monitoring dashboard |
| Feasibility & impact | Output is a prioritisation map tied to a real EBI decision |
| Scalability & adaptability | All data sources cover EBI's 12 operating countries — same pipeline, no new infrastructure |

---

## Risks to Acknowledge

- Enveritas dataset last updated 2021 — cross-validate with OSM and Ministry of Education data
- ACLED records armed events, not all insecurity types (community violence, road closures)
- Displacement figures lag reality — supplement with IOM Displacement Tracking Matrix
- Rural school mapping in CIV interior less complete than urban areas

---

*Prepared as part of ICT for Civic Data — Crash Course 2026 (Turin University)*
*RFP: Strengthening Education Programming in Conflict-Affected Areas*
*Funder: Education Bridge Initiative (EBI)*
