---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): plugins declare their toolbar group as `{ id, order }`, and the toolbar keeps the text selection for every control it draws. The built-in groups are exported as `TOOLBAR_GROUPS`. `RteToolbarGroup` and `ToolbarGroup` change from a string union to `{ id, order }`, so a plugin that gave a group name must give a group object instead. An invalid group (an empty `id`, an `order` that is not a number, or two orders for one `id`) throws when the editor mounts.
