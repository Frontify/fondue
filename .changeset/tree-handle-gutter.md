---
"@frontify/fondue-components": patch
---

fix(Tree): the drag handle no longer shifts row content in reorderable trees. It sits in a 16px gutter left of the rows, so reorderable and static roots align. Consumers need 16px of free space to the left of a reorderable tree.
