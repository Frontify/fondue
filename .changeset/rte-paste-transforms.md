---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): plugins declare `pasteTransforms` and parse rules a `precedence`; Word lists are rebuilt by the list plugins, and table and `pre` flattening moves to the new `pasteLinesPlugin` in `defaultPlugins`, so a host with its own plugin list adds `pasteLinesPlugin` to keep pasted table cells and preformatted lines apart
