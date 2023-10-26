// scripts/generate-config.js

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const template = fs.readFileSync('config/codeql-template.yml', 'utf8');

const inputs = {
  repo: process.env.REPO,
};

const loadConfig = (repo) => {
  const repoName = repo.split('/')[1];
  const config = require('../repo-configs/' + repoName);
  return config
};

const config = loadConfig(inputs.repo);

// set languages output
console.log(`::set-output name=languages::${config.languages}`);

const output = ejs.render(template, {
  pathsIgnored: config.pathsIgnored,
  queries: config.queries
});
console.log(output);
fs.writeFileSync('.github/codeql-config.yml', output);
fs.writeFileSync('codeql-config.yml', output);
