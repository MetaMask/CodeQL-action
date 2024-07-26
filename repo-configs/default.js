const config = {
  languages: ["javascript-typescript", "typescript"],
  pathsIgnored: ["test"],
  rulesExcluded: ["js/log-injection"],
  queries: [
    {
      name: "Security-extended queries for JavaScript",
      uses: "./CodeQL-action/query-suites/base.qls",
    },
    {
      name: "MetaMask Application Security Custom Queries",
      uses: "./CodeQL-action/custom-queries/query-suites/custom-queries.qls",
    },
  ],
}
module.exports = config;