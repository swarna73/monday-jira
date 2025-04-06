const axios = require('axios');
require('dotenv').config();

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;


const STATUS_MAPPING = {
  'Done': 'Done',
  'In Progress': 'In Progress',
  'To Do': 'To Do'
};

 //Fetch Monday cases - make sure to update the Monday board id. 
 async function getMondayCases() {
  try {
    const query = `{
      boards(ids: <BOARD ID>) {
        items {
          id
          name
          column_values {
            id
            text
          }
        }
      }
    }`;
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
    const response = await axios.post(
      'https://api.monday.com/v2',
      { query },
      { headers: { Authorization: MONDAY_API_KEY,       
      'Content-Type': 'application/json'
      }
      }
    );

    return response.data.data.boards[0].items;
  } catch (error) {
    console.error('Error fetching Monday cases:', error);
    throw error;
  }
}

// Create a Jira issue
async function createJiraIssue(caseData) {
  try {
    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/issue`,
      {
        fields: {
          project: {
            key: JIRA_PROJECT_KEY
          },
          summary: caseData.name,
          description: `Migrated from Monday.com\n\n${caseData.column_values.map(cv => `${cv.id}: ${cv.text}`).join('\n')}`,
          issuetype: {
            name: 'Task' // Change to appropriate issue type
          }
        }
      },
      {
        auth: {
          username: JIRA_EMAIL,
          password: JIRA_API_TOKEN
        },
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating Jira issue:', error.response?.data || error.message);
    throw error;
  }
}

// Main migration function
async function migrateCases() {
  try {
    console.log('Fetching cases from Monday.com...');
    const cases = await getMondayCases();

    console.log(`Found ${cases.length} cases. Migrating to Jira...`);
    for (const caseData of cases) {
      console.log(`Migrating case: ${caseData.name}`);
      const jiraIssue = await createJiraIssue(caseData);
      console.log(`Created Jira issue: ${jiraIssue.key}`);
    }

    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

(async () => {
  try {
    console.log('Starting migration...');
    await migrateCases();
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
})();

