const fs = require("fs")
const path = require("path")
const ejs = require("ejs")
const { log, debug } = require("console")

const outputFile = process.env.GITHUB_OUTPUT
const template = fs.readFileSync("config/codeql-template.yml", "utf8")

const { REPO, PATHS_IGNORED, RULES_EXCLUDED, LANGUAGES } = process.env
const inputs = {
  repo: REPO,
  pathsIgnored: PATHS_IGNORED ? PATHS_IGNORED.split("\n").filter((line) => line.trim() !== "") : [],
  rulesExcluded: RULES_EXCLUDED ? RULES_EXCLUDED.split("\n").filter((line) => line.trim() !== "") : [],
  languages: LANGUAGES ? LANGUAGES.split(",").map(lang => lang.trim()).filter(lang => lang !== "") : [],
}
console.log(`>>>>>inputs: `)
console.log(JSON.stringify(inputs, null, 2))

// GitHub language to CodeQL language mapping
const GITHUB_TO_CODEQL_MAP = {
  'JavaScript': 'javascript',
  'TypeScript': 'javascript', // CodeQL treats TypeScript as JavaScript
  'Python': 'python',
  'Java': 'java', 
  'C#': 'csharp',
  'C++': 'cpp',
  'C': 'cpp',
  'Go': 'go',
  'Ruby': 'ruby',
  'Swift': 'swift',
  'Kotlin': 'kotlin'
}

const mapLanguagesToCodeQL = (githubLanguages) => {
  const codeqlLanguages = githubLanguages
    .map(lang => GITHUB_TO_CODEQL_MAP[lang])
    .filter(lang => lang !== undefined)
  
  // Remove duplicates (e.g., JavaScript and TypeScript both map to 'javascript')
  return [...new Set(codeqlLanguages)]
}

const generateQueriesForLanguages = (codeqlLanguages) => {
  const queries = []
  
  // Add security queries for each detected language
  codeqlLanguages.forEach(lang => {
    queries.push({
      name: `Security queries for ${lang}`,
      uses: `codeql-suites/${lang}-security-extended.qls`
    })
  })
  
  // Always add custom MetaMask queries
  queries.push({
    name: "MetaMask Application Security Custom Queries",
    uses: "./custom-queries/query-suites/custom-queries.qls"
  })
  
  return queries
}

const loadConfig = (repo) => {
  console.log(`>>>>>repo ${repo}`)
  const repoName = repo.split("/")[1]
  const repoConfigPath = path.join("./repo-configs/" + repoName + ".js")
  if (!fs.existsSync(repoConfigPath)) {
    console.warn(`No config found for "${repo}", using default config`)
    return require("../repo-configs/default")
  }
  const config = require(path.join("..", repoConfigPath))
  return config
}

const debugConfig = (config) => {
  console.log(">>>>> config <<<<<")
  console.log(JSON.stringify(config, null, 2))
}

const config = loadConfig(inputs.repo)
debugConfig(config)

// Use detected languages from GitHub API, or fall back to repo config
const detectedCodeQLLanguages = inputs.languages.length > 0 
  ? mapLanguagesToCodeQL(inputs.languages)
  : config.languages || ['javascript'] // fallback to JavaScript if no languages detected

console.log(`>>>>>Detected CodeQL Languages: ${JSON.stringify(detectedCodeQLLanguages)}`)

// Generate queries based on detected languages, but allow repo config to override
const finalQueries = config.queries || generateQueriesForLanguages(detectedCodeQLLanguages)

// set languages output
fs.appendFileSync(outputFile, `languages=${detectedCodeQLLanguages.join(',')}\n`)

const output = ejs.render(template, {
  pathsIgnored: [...(config.pathsIgnored || []), ...inputs.pathsIgnored],
  rulesExcluded: [...(config.rulesExcluded || []), ...inputs.rulesExcluded],
  queries: finalQueries,
})
console.log(output)
fs.writeFileSync("codeql-config-generated.yml", output)
