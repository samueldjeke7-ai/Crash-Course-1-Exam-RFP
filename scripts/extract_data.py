import csv
import re

def extract_education_gap_data(file_path, output_csv):
    """
    Reads the markdown file and extracts rows related to education gaps in Northern Côte d'Ivoire.
    Does not require external libraries like pandas.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the 'Real Numbers' table section
        # We'll use regex to find rows that look like | Indicator | Figure | Source |
        rows = []
        pattern = re.compile(r'\|(.*?)\|(.*?)\|(.*?)\|')
        matches = pattern.findall(content)
        
        keywords = ["enrolment rate", "North", "gap", "Northern"]
        
        for match in matches:
            indicator = match[0].strip()
            figure = match[1].strip()
            source = match[2].strip()
            
            # Skip header or empty matches
            if indicator.lower() == "indicator" or not indicator:
                continue
                
            # Check if any keyword is in the indicator
            if any(kw.lower() in indicator.lower() for kw in keywords):
                rows.append([indicator, figure.replace('**', ''), source])

        if rows:
            with open(output_csv, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(["Indicator", "Value", "Source"])
                writer.writerows(rows)
            print(f"Successfully extracted {len(rows)} rows to {output_csv}")
        else:
            print("No matching rows found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    extract_education_gap_data("ebi-angle-statement.md one.md", "northern_education_gaps.csv")
