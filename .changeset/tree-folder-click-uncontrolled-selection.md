---
"@frontify/fondue-components": patch
"@frontify/fondue": patch
"@frontify/fondue-sdk": patch
---

fix(Tree): clicking a single-select folder now expands or collapses it at once when the folder has no `onSelectChange` or `onClick` and `Tree.Root` has no `onChange`, since such a folder can never become selected by a click.
