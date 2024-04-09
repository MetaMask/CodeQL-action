const fs = require("fs")
const path = require("path")
const ejs = require("ejs")
const { log, debug } = require("console")

const outputFile = process.env.GITHUB_OUTPUT
const template = fs.readFileSync("config/codeql-template.yml", "utf8")

const { REPO, PATHS_IGNORED, RULES_EXCLUDED } = process.env
const inputs = {
  repo: REPO,
  pathsIgnored: PATHS_IGNORED ? PATHS_IGNORED.split("\n").filter((line) => line.trim() !== "") : [],
  rulesExcluded: RULES_EXCLUDED ? RULES_EXCLUDED.split("\n").filter((line) => line.trim() !== "") : [],
}
console.log(`>>>>>inputs: `)
console.log(JSON.stringify(inputs, null, 2))

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

// set languages output
fs.appendFileSync(outputFile, `languages=${config.languages}\n`)

const output = ejs.render(template, {
  pathsIgnored: [...config.pathsIgnored, ...inputs.pathsIgnored],
  rulesExcluded: [...config.rulesExcluded, ...inputs.rulesExcluded],
  queries: config.queries,
})
console.log(output)
fs.writeFileSync("codeql-config-generated.yml", output)
