import json
import re
from datetime import datetime, timedelta
from collections import Counter


#  Parse query

def parse_query(text: str) -> dict:
    filters = {
        "role": None,
        "skills": [],
        "location": None,
        "minExp": None,
        "maxExp": None,
        "availabilityWindowDays": None
    }

    loc_match = re.search(r"in\s+([A-Za-z]+)", text)
    if loc_match:
        filters["location"] = loc_match.group(1)

    exp_match = re.search(r"(\d+)\s*[-–]\s*(\d+)\s*years", text)
    if exp_match:
        filters["minExp"] = int(exp_match.group(1))
        filters["maxExp"] = int(exp_match.group(2))

    role_match = re.search(r"(intern|developer|engineer)", text, re.IGNORECASE)
    if role_match:
        filters["role"] = role_match.group(1).capitalize()

    skills = re.findall(r"(React|Python|JS|SQL|HTML|CSS|Django|Git)", text, re.IGNORECASE)
    if skills:
        filters["skills"] = list(set([s.capitalize() for s in skills]))

    if "this month" in text.lower():
        filters["availabilityWindowDays"] = 30
    elif "next" in text.lower():
        filters["availabilityWindowDays"] = 45

    return filters

#  Load candidates

def load_candidates():
    with open("data/candidates.json", "r", encoding="utf-8") as f:
        return json.load(f)

#  Search candidates

def search_candidates(filters: dict, top_n: int = 5):
    candidates = load_candidates()
    results = []

    for idx, c in enumerate(candidates, start=1):
        score = 0
        reasons = []

        # Skills match
        if filters["skills"]:
            matched = set(filters["skills"]).intersection(set([s.capitalize() for s in c["skills"]]))
            if matched:
                score += 2 * len(matched)
                reasons.append(f"{'+'.join(matched)} match (+{2*len(matched)})")

        # Location
        if filters["location"] and filters["location"].lower() == c["location"].lower():
            score += 1
            reasons.append(f"{c['location']} (+1)")

        # Experience
        if filters["minExp"] is not None and filters["maxExp"] is not None:
            if filters["minExp"]-1 <= c["experienceYears"] <= filters["maxExp"]+1:
                score += 1
                reasons.append(f"{c['experienceYears']}y fits (±1) (+1)")

        # Availability
        if filters["availabilityWindowDays"]:
            avail_date = datetime.strptime(c["availabilityDate"], "%Y-%m-%d")
            if avail_date <= datetime.today() + timedelta(days=filters["availabilityWindowDays"]):
                score += 1
                reasons.append("Available soon (+1)")

        results.append({
            "index": idx,
            "candidate": c,
            "score": score,
            "reason": ", ".join(reasons)
        })

    results = sorted(results, key=lambda x: x["score"], reverse=True)
    return results[:top_n]


#  Save shortlist

def save_shortlist(name: str, candidate_indices: list):
    try:
        with open("data/shortlists.json", "r", encoding="utf-8") as f:
            shortlists = json.load(f)
    except FileNotFoundError:
        shortlists = {}

    shortlists[name] = candidate_indices

    with open("data/shortlists.json", "w", encoding="utf-8") as f:
        json.dump(shortlists, f, indent=2)

    return {"status": "ok", "saved": {name: candidate_indices}}

#  Draft email

def draft_email(recipients, job_title, tone="friendly"):
    first_names = [r["firstName"] for r in recipients]

    subject = f"Exciting {job_title} opportunity for you!"
    if tone == "friendly":
        greeting = "Hi"
        closing = "Looking forward to hearing from you!"
    else:
        greeting = "Dear"
        closing = "Best regards,"

    text = f"""{greeting} {', '.join(first_names)},

We came across your profile and were impressed by your skills.
We’re currently looking for a {job_title}, and we think you could be a great fit.

{closing}
Recruitment Team
"""

    return {
        "subject": subject,
        "text": text,
        "closing": closing
    }

# HTML template

def html_template(email: dict) -> str:
    return f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height:1.5; padding:20px; color:#333;">
        <h2 style="color:#004080;">{email['subject']}</h2>
        <p>{email['text'].replace('\n', '<br>')}</p>
      </body>
    </html>
    """


#  Analytics

def analytics_summary():
    candidates = load_candidates()

    # Count by stage
    countByStage = {}
    for c in candidates:
        stage = c.get("stage", "UNKNOWN")
        countByStage[stage] = countByStage.get(stage, 0) + 1

    # Top skills
    all_skills = []
    for c in candidates:
        all_skills.extend([s.capitalize() for s in c["skills"]])
    topSkills = Counter(all_skills).most_common(3)

    return {
        "countByStage": countByStage,
        "topSkills": topSkills
    }
#  CLI flow 

# if __name__ == "__main__":
#     print("💬 HR Agent CLI Demo")

if __name__ == "__main__":
    print("💬 HR Agent CLI - Type 'exit' to quit\n")

    shortlists = {}  # in-memory cache

    # load existing shortlists if exist
    try:
        with open("data/shortlists.json", "r", encoding="utf-8") as f:
            shortlists = json.load(f)
    except FileNotFoundError:
        pass

    current_email = None  # store last drafted email for edit

    while True:
        query = input("Enter command: ").strip()
        if query.lower() in ["exit", "quit"]:
            print("Bye 👋")
            break

        # Search candidates
        if query.lower().startswith("find"):
            filters = parse_query(query)
            top_candidates = search_candidates(filters)
            for idx, r in enumerate(top_candidates, 1):
                c = r["candidate"]
                print(f"#{idx} {c['firstName']} {c['lastName']} → Score {r['score']} ({r['reason']})")

        # Save shortlist
        elif query.lower().startswith("save"):
            m = re.findall(r"#(\d+)", query)
            indices = [int(i) for i in m]
            name_match = re.search(r'as\s+"?([\w-]+)"?', query, re.IGNORECASE)
            if name_match:
                name = name_match.group(1)
                candidates_data = load_candidates()
                valid_indices = [i for i in indices if 0 < i <= len(candidates_data)]
                save_shortlist(name, valid_indices)
                shortlists[name] = valid_indices
                print(f"✅ Saved shortlist '{name}' with candidates {valid_indices}")

        # Draft email
        elif query.lower().startswith("draft"):
            name_match = re.search(r'for\s+"?([\w-]+)"?', query, re.IGNORECASE)
            job_match = re.search(r'using job\s+"?([\w\s]+)"?', query, re.IGNORECASE)
            if name_match and job_match:
                s_name = name_match.group(1)
                job_title = job_match.group(1)
                if s_name in shortlists:
                    indices = shortlists[s_name]
                    candidates_data = load_candidates()
                    selected = [candidates_data[i-1] for i in indices]
                    current_email = draft_email(selected, job_title)
                    print("\n📧 Subject:", current_email["subject"])
                    print("📄 Text:\n", current_email["text"])
                    print("\n=== HTML Preview ===")
                    print(html_template(current_email))
                else:
                    print(f"❌ Shortlist '{s_name}' not found.")

        # Edit subject or closing line
        elif query.lower().startswith("edit subject") or query.lower().startswith("edit closing"):
            if current_email:
                if "subject" in query.lower():
                    new_subject = input("Enter new subject: ").strip()
                    current_email["subject"] = new_subject
                else:
                    new_closing = input("Enter new closing line: ").strip()
                    current_email["text"] = current_email["text"].rsplit("\n",1)[0] + "\n" + new_closing
                print("\n📧 Updated Subject:", current_email["subject"])
                print("📄 Updated Text:\n", current_email["text"])
                print("\n=== HTML Preview ===")
                print(html_template(current_email))
            else:
                print("❌ No email drafted yet. Draft an email first.")

        # Show analytics
        elif query.lower().startswith("show analytics"):
            stats = analytics_summary()
            print("\n📊 Analytics")
            print("Pipeline by stage:", stats["countByStage"])
            print("Top skills:", stats["topSkills"])

        else:
            print("❓ Command not recognized. Examples:\n- Find 5 React interns...\n- Save #1 #3 as 'FE-Intern-A'\n- Draft outreach email for 'FE-Intern-A' using job 'Frontend Intern'\n- Edit subject / Edit closing\n- Show analytics")
