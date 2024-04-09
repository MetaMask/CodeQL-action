# Welcome to CodeQl-action


## development setup
add `ref:` to `checkout-codeql-action` step, this ensures that your selected branch will run on the code scanner
it should look like this:

```yaml
    - name: Check out Codeql-action Git repository
      id: checkout-codeql-action
      uses: actions/checkout@v4
      with:
        repository: ${{env.ACTION_REPO_OWNER}}/${{ env.ACTION_REPO_NAME }}
        path: ${{ env.ACTION_REPO_NAME }}
        ref: dev-branch
```
