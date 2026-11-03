---
"@frontify/fondue-components": patch
---

fix(Tree): the drag handle no longer shifts row content in single-select reorderable trees. It overlays the row's leading space, so reorderable and static roots align. Row content in every tree moves 2px toward the end to make room for it.
