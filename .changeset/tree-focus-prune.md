---
"@frontify/fondue-components": patch
---

fix(Tree): when the focused row is removed, move the tab stop to its next visible row (else the previous); when a collapse hides it, move the tab stop to the collapsed folder. DOM focus follows when it was inside the tree, so the tree keeps one tabbable row
