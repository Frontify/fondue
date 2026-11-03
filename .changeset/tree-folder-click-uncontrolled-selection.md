---
"@frontify/fondue-components": patch
"@frontify/fondue": patch
"@frontify/fondue-sdk": patch
---

fix(Tree): the first click on a single-select folder now fires `onExpandChange` instead of being swallowed when the folder has no `onSelectChange` or `onClick` and `Tree.Root` has no `onChange`, since such a folder can never become selected by a click.
