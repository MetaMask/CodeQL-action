# AppSec CodeQL GitHub Action

## Overview
The AppSec CodeQL GitHub Action is tailored for performing CodeQL scans on repositories with the capability of using custom rule sets and configurations. It supports flexible configurations for different repositories, stored in the `repo-configs` directory, and utilizes custom CodeQL query suites from the `query-suites` directory.

## Inputs
- **`repo`**: (Required) The full name of the repository to be scanned.
- **`repo-owner`**: The owner of the repository. If not specified, it defaults to the user or organization running the action.
- **`repo-name`**: The name of the repository. Defaults to the repository name where the action is being run.

## Usage
To integrate this action into your workflow, create a `.yml` file in the `.github/workflows` directory of your repository and follow the steps below:

1. **Workflow Setup**:
   Add the following content to your workflow file:

   ```yaml
   name: CodeQL Analysis

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     codeql-analysis:
       runs-on: ubuntu-latest

       steps:
       - name: Checkout Code
         uses: actions/checkout@v4
         with:
           repository: ${{ github.repository }}

       - name: Run AppSec CodeQL Analysis
         uses: <username>/Appsec-CodeQL@main
         with:
           repo: ${{ github.repository }}
           repo-owner: <optional-repo-owner>
           repo-name: <optional-repo-name>
   ```

   Replace `<username>` with the username or organization name hosting the action. Adjust `<optional-repo-owner>` and `<optional-repo-name>` as needed.

2. **Configurations**:
   Place your custom configurations for repositories in the `repo-configs` directory and your CodeQL query suites in the `query-suites` directory. These will be utilized by the action to tailor the scan according to your specific requirements.

## Features
- **Customized CodeQL Scans**: Ability to run scans with custom configurations and query suites.
- **Flexible Setup**: Supports multiple repositories with different configurations.
- **SARIF File Upload**: Automated process for uploading SARIF files for analysis reporting.

## Contributing
Contributions are welcome to enhance and expand the functionality of this action.

## License
Specify your license here. Typically, projects include a [MIT License](LICENSE).

---

This template is designed to be modified according to your specific requirements and project details. Make sure to replace placeholders with actual values and adjust the instructions based on how your action is set up and used.