const config = {
  languages: ["javascript-typescript", "typescript", "go"],
  pathsIgnored: ["test"],
  rulesExcluded: ["js/log-injection"],
  queries: [
    {
      name: "queries for linea",
      uses: "./CodeQL-action/query-suites/linea-monorepo.qls",
    },
    {
      name: "MetaMask Application Security Custom Queries",
      uses: "./custom-queries/query-suites/custom-queries.qls",
    },
  ],
}
module.exports = config;