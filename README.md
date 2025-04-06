#  Monday to Jira Sync Tool

This is a Node.js script that fetches issues (including comments and author details) from **Monday** and creates corresponding tasks in **Jira**, preserving description and comment history.

---

## Features

- Fetch issues with status "In Progress" from Monday (You can edit the status and move as you need)
- Create corresponding Jira issues with proper ADF formatting
- Error handling and debug-friendly logging

---

## Tech Stack

- Node.js
- Axios (for HTTP requests)
- Jira REST API v3
- Monday GraphQL API
---

## ⚙️ Setup Instructions

### 
1. Clone the repo

bash
git clone https://github.com/<your-username>/monday-jira.git
cd monday-jira

2. Install dependencies
npm install

3. Configure your credentials and API Keys

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

🔐 Optional: Move these to a .env file for better security.

✅ How to Run
node monday.js
	•	This will fetch issues from Monday and create them in Jira along with comments.

Security
	•	Tokens and secrets are not committed to GitHub.
	•	Add .env and update .gitignore if you prefer secure variable management.
✨ Example Output

Author

Swarnalatha Swaminathan
Engineering Manager | Backend | Node.js | Jira Integrations
GitHub • [LinkedIn](https://www.linkedin.com/in/swarnalathatech/)
