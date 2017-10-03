//
// Description:
//   Display title of JIRA ticket.
//
// Dependencies:
//   Show `package.json`.
//
// Configuration:
//   `JIRA_URL`      : JIRA base URL(Befor `/browse` and `/rest/api/2/issue`).
//   `JIRA_USER`     : JIRA username.
//   `JIRA_PASSWORD` : JIRA password.
//
// Commands:
//   hubot (hear) - Give JIRA ticket URL then return ticket title.
//

const _isUndefined = require('lodash.isundefined');
const fetch = require('isomorphic-fetch');

const config = {
  JIRA_URL: process.env.JIRA_URL,
  JIRA_USER: process.env.JIRA_USER,
  JIRA_PASSWORD: process.env.JIRA_PASSWORD
};



function ConfigurationCheck(config) {
  const x = Object.keys(config).reduce( (acc, c) => {
    if (_isUndefined(config[c])) acc.push(`${c} is undefined`);
    return acc;
  }, []);
  if (x.length !== 0) x.console.error(x);
}
ConfigurationCheck(config);



const URLMATCH = new RegExp(`${config.JIRA_URL}/browse/(.+)-(\\d+)`, 'i');

module.exports = (robot) => {

  robot.hear( URLMATCH , async (msg) => {
    const project = msg.match[1];
    const number = msg.match[2];
    const issue = `${project.toUpperCase()}-${number}`;

    const auth = new Buffer(`${config.JIRA_USER}:${config.JIRA_PASSWORD}`).toString('base64');
    const res = await fetch(`${config.JIRA_URL}/rest/api/2/issue/${issue}`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    const body = await res.json();

    switch (res.status) {
      case 404:
        robot.logger.error(`statusCode:${res.status}\tstatusMessage:${res.statusText}\tmessages:${body.errorMessages.join(',')}`);
        break;
      case 200:
        msg.send(`> ${issue}: ${body.fields.summary}\n> ${config.JIRA_URL}/browse/${issue}`);
        break;
      default:
        robot.logger.error(`statusCode:${res.status}\tstatusMessage:${res.statusText}\tmessages:${body.errorMessages.join(',')}`);
        console.dir(body);
        break;
    }
  });

};
