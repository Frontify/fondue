---
"@frontify/fondue-components": patch
---

fix(Tree): keep focus where the user moved it when a rename input blurs

Blurring the rename input still commits the name, but it no longer moves focus back to a tree row afterwards. Before, opening another row's action menu while a row was renaming closed the menu right after it opened, because the deferred focus restore pulled focus out of it. Enter and Escape still return focus to the renamed row.
