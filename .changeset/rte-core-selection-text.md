---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): core owns the selected node, the active block command and inline plain text.

Breaking changes:

- `RteBlockCommand.isActive` is removed. A command declares the block it makes current as `active: { type, attributes }`, and the editor picks the innermost block that matches. A command can no longer use a custom test.
- A custom inline whose `toHtml` is a `<br>` or an `<img>` no longer reads as a line break or as its `alt` text in `toPlainText`. The inline must declare `toText`.

Other changes:

- An inline may declare `toText` to set its plain text, instead of the fixed text its `toHtml` writes. The soft break uses it for its newline.
- The built-in Text command is the current one in "Turn into" only when no plugin command is.
