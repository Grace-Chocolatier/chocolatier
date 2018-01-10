## Git/github things

- Getting co-dependent work for different branches...
  - Avoid it when possible: use dummy data, split up tasks differently
  - Otherwise: you can
    - `git checkout other-branch-i-need-stuff-from`
    - `git pull origin other-branch-i-need-stuff-from`
    - `git checkout my-work`
    - `git merge other-branch-i-need-stuff-from`
- Consider makign your README more specific to you, well documented
- Nice commit messages! Consider standarizing your format, e.g. [like this](https://seesparkbox.com/foundry/semantic_commit_messages)
- Reference trello issues in your PRs
- Recommendation: assign a reviewer per PR
