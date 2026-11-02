---
"@frontify/fondue-components": patch
---

fix(Tree): derive the row geometry from shared custom properties and align the drag line in right-to-left trees

The indent, drag handle, drag line and loading row now derive their offsets from custom properties declared once on the tree root, and the indent step comes from the same constant headless-tree uses for drop hit-testing. At the default 16px root font size nothing moves; at other root font sizes each level now indents 16px (the step drop hit-testing already used) instead of `1rem`, and the drag line follows the chevron. The drag line uses logical properties, so in right-to-left trees it starts under the target folder's chevron instead of from the left edge.
