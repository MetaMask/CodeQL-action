const config = {
  languages: ["javascript-typescript", "typescript"],
  pathsIgnored: ["test"],
  rulesExcluded: ["js/log-injection"],
  queries: [
    {
      name: "Security-extended queries for JavaScript",
      uses: "./CodeQL-action/query-suites/base.qls",
    },
  ],
}
module.exports = config;