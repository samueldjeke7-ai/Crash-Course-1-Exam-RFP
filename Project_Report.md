# Final Submission: EBI Conflict & Education Risk Intelligence Dashboard
**Course:** ICT for Civic Data - Crash Course 2026
**Student:** [Your Name]
**Project Link:** [https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)

---

## 1. Project Overview
This project addresses the critical education gaps in Northern Côte d'Ivoire caused by legacy conflict and current displacement. We built an interactive intelligence dashboard that cross-references school geolocation with conflict data to prioritize humanitarian intervention.

## 2. Strategy Proposal
### The Challenge
Northern Côte d'Ivoire faces a critical education crisis. While the national average suggests progress, the northern regions (Bouaké, Korhogo, Man, Danané) suffer from an enrollment rate **below 40%**, which is **2x lower** than the south. Over **700,000 children** were displaced during peak conflict years, and infrastructure recovery has been uneven.

### Our Data Strategy
To address this, we proposed a three-pillar data approach:
1.  **Gap Mapping**: Using WorldPop population data against Enveritas school locations to calculate the "Children per School" ratio.
2.  **Conflict Overlay**: Integrating ACLED real-time conflict data to identify schools at high risk of closure or teacher abandonment.
3.  **Dynamic Prioritization**: An AI-assisted scoring system that flags departments where the gap between child population and school capacity is widest.

### Visual Rationale
For the interactive dashboard, we chose a **Slate & Charcoal theme** for high readability. The map uses **Marker Clustering** to manage thousands of schools, and color-coded "Risk Levels" (Orange/Green) to immediately distinguish between high-risk Northern sites and lower-risk Southern sites.

---

## 3. Extracted Education Gap Data
*Data extracted from original RFP document via Python script.*

| Indicator | Value | Source |
| :--- | :--- | :--- |
| Net enrolment rate in Korhogo / Odienné (north) | below 40% | World Bank / ACLED study |
| Net enrolment rate in southern CIV | close to 80% | World Bank / ACLED study |
| North–South enrolment gap | 2× lower in North | World Bank study |

---

## 4. Technical Implementation (Python Script)
This script was used to process the raw humanitarian data and prepare it for the dashboard.

```python
import csv
import re

def extract_education_gap_data(file_path, output_csv):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        rows = []
        pattern = re.compile(r'\|(.*?)\|(.*?)\|(.*?)\|')
        matches = pattern.findall(content)
        
        keywords = ["enrolment rate", "North", "gap", "Northern"]
        
        for match in matches:
            indicator = match[0].strip()
            figure = match[1].strip()
            source = match[2].strip()
            
            if indicator.lower() == "indicator" or not indicator:
                continue
                
            if any(kw.lower() in indicator.lower() for kw in keywords):
                rows.append([indicator, figure.replace('**', ''), source])

        if rows:
            with open(output_csv, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(["Indicator", "Value", "Source"])
                writer.writerows(rows)
            print(f"Successfully extracted {len(rows)} rows")
    except Exception as e:
        print(f"An error occurred: {e}")
```

---

## 6. Visual Evidence: Interactive Dashboard

*Note to Student: Before saving this document as a PDF, please take a screenshot of your live dashboard and insert it below.*

**How to include your screenshot:**
1. Open your dashboard: [https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/](https://samueldjeke7-ai.github.io/Crash-Course-1-Exam-RFP/)
2. Press `Win + Shift + S` (Windows) or `Cmd + Shift + 4` (Mac) to capture the screen.
3. Paste the image directly below this line if using a Markdown editor, or insert it into your final PDF/Word document.

> **[INSERT SCREENSHOT HERE]**

---
*Prepared as part of the ICT for Civic Data - Crash Course 2026.*
