---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): plugins declare their toolbar group as `{ id, order }` (the built-in ones are exported as `TOOLBAR_GROUPS`), replacing the group name; the toolbar keeps the text selection for every control it draws
