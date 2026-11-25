---
"@frontify/fondue-components": patch
---

fix(Tree): rebuild the tree when reorderable or multiSelect changes after mount

The tree is rebuilt when either prop changes, so internal focus and rename drafts reset while selection and expansion stay as passed in.
