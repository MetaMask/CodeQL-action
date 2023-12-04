const config = {
  languages: [
    "javascript-typescript",
    "typescript",
    
  ],
  pathsIgnored: [
    "test"

  ],
  "queries": [
    { 
      name: "Security-extended queries for JavaScript", 
      uses: "./CodeQL-action/query-suites/base.qls"
    }
  ]
};
module.exports = config;