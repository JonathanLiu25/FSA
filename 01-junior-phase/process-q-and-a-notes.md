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

---

## Pair programming

---

## Editors

---

## CLI / tools

### tab autocomplete

---

## Key commands in sublime

### configuring linter properly

---

## Neural debugger

### thought process
### best practices
