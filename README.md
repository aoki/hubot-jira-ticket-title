# hubot-jira-ticket-title

Hubot script that display title of JIRA ticket.

```
Hubot> https://example.com/jira/browse/EXAMPLE-123
Hubot> > EXAMPLE-123: Create example hubot script
```

## Configurations
- `HUBOT_JIRA_URL`: JIRA base URL(ex. `${HUBOT_JIRA_URL}/browse` and `${HUBOT_JIRA_URL}/rest/api/2/issue`)
- `HUBOT_JIRA_USER`: JIRA username
- `HUBOT_JIRA_PASSWORD`: JIRA password

## How to Install
1. `npm i hubot-jira-ticket-title`
2. Add `hubot-jira-ticket-title` to the `external-scripts.json`
