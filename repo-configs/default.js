const config = {
  // Languages will be detected dynamically from GitHub API
  // languages: [], // Not needed - will be determined by language detection
  
  pathsIgnored: ["test"],
  rulesExcluded: ["js/log-injection"],
  
  // Queries will be generated dynamically based on detected languages
  // queries: [], // Not needed - will be generated based on languages
}
module.exports = config;