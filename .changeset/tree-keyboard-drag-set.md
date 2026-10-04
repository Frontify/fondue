---
"@frontify/fondue-components": patch
"@frontify/fondue": patch
---

fix(Tree): a keyboard move (Control+Shift+D) drags the same rows as a pointer drag: the selection if it holds the focused row, otherwise only the focused row. Turning reordering off after mount leaves the hotkey inert
