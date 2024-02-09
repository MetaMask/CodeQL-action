const config = {
  languages: ["javascript-typescript", "typescript", "java"],
  pathsIgnored: ["test"],
  queries: [
    {
      name: "Security-extended queries for Java",
      uses: "./appsec-codeql/query-suites/appsec-prooving-grounds.qls",
    },
  ],
}
module.exports = config
