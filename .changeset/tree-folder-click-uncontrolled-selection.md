---
"@frontify/fondue-components": patch
"@frontify/fondue": patch
"@frontify/fondue-sdk": patch
---

feat(Tree): add `folderClick` to `Tree.Root`. The default `'select'` keeps the current single-select behavior (the first click on a folder only selects it). `'toggle'` expands or collapses a folder on every click, for trees whose folders are only containers.
