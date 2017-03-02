## Git / github

### if you get stuck in vim

- ESC, :, q, ENTER

### no login from cli?

- [add ssh keys](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

## git stash

- keep changes in cubby for later
- get them back with `git stash pop`
- be careful!

### see changes in remote before pull

- `pull` = `fetch` + `merge`
- so in order to accomplish looking at changes without merging them, just `fetch` (then `git checkout origin/that-branch`)

### time travel

- two commands: `reset` and `revert`
- `reset` wipes out history, rips out pages / changes
- `revert` "undoes" them, but does not overwrite history
- SO PREFER REVERT
- give either a commit hash, and it'll zoom you back in time to that spot
- `git log` to see commits, find commit hashes (or go look at them in github)

### gitignores

- not adding particular files
- "hashed" lines are comments
- other lines are file / folder patterns to "ignore"
- generally, `.gitignore` files will be in the root folder of the project ("git repo")
- but they can go anywhere!

---

## Editors

### configuring linter properly

- try it out from Toolbox workshop and reach out if anything goes wrong!

---

## CLI / tools

### tab autocomplete

- you can find awesome autocomplete scripts out there (be careful downloading random scripts)

---

## Neural debugger

### general notes

- can't live without `debugger`
- there's no such thing as working code
- sometimes you do this even when your code is "working" and you don't know why

### thought process / best practices

*Something isn't working as expected, what next...*

- are there errors?
  - what are they? look them up
  - line number! stack trace!
  - go find that line of code AND THEN look at the error message again and figure out what it *means*
- isolate the bug
  - narrow down the exact problem area
  - comment things out if you want to
- break it worse!
- log stuff, deeply
- adding "breakpoints", `debugger`
  - investigate state of variables as program steps forward
  - add "watchers"
  - see callstack from here
- *be the machine*
- refactor code if you don't understand it in the first place
