---
"@frontify/fondue-components": patch
---

fix(Tree): the drag handle no longer shifts row content in reorderable trees. It sits in a 16px gutter before the rows (left in LTR), so reorderable and static roots align. Consumers need 16px of free space before a reorderable tree.
