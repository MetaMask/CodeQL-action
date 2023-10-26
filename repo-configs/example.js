const config = {
  languages: [
    "javascript-typescript",
    "typescript",
    
  ],
  pathsIgnored: [
    "data",
    "test",
    "frontend/src/assets"

  ],
  "queries": [
    { 
      name: "Security-extended queries for JavaScript", 
      uses: "./appsec-codeql/query-suites/base.qls"
    }
  ]
};
module.exports = config;