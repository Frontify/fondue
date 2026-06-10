---
'@frontify/fondue-components': patch
'@frontify/fondue': patch
---

feat(Tree): anatomy-part composition, custom icons, and inline renaming

Changes to the unbreleased Tree component:

- The `label` prop on `Tree.Item` / `Tree.Folder` is removed. Row content is now declared with anatomy parts: `<Tree.Label>` (plain text, required), an optional `<Tree.Icon>`, and an optional `<Tree.Action>`. For items the parts are direct children; for folders they live inside the new `<Tree.FolderHeader>`, and every other folder child is a nested row.
- `Tree.ItemAction` is renamed to `Tree.Action` (`TreeItemActionProps` → `TreeActionProps`).
- Rows no longer render default document/folder icons — icons are opt-in via `<Tree.Icon>`.

New features:

- Custom per-row icons via `<Tree.Icon>`.
- Inline renaming: provide `onRename` and control the new `isRenaming` prop (e.g. from a `Tree.Action` overflow menu) to swap the row label for a text input. Enter or blur commits — firing the item's `onRename(newName)` and the root `onChange` with the updated `name` — Escape cancels, and `onRenamingChange(false)` signals the end of the rename session either way. Unchanged or empty names are no-ops. Dragging is suspended while renaming.
