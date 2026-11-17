---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): core owns the selected node, the active block command, inline plain text and the attribute check.

Breaking changes:

- `RteBlockCommand.isActive` is removed. A command declares the block it makes current as `active: { type, attributes }`, and the editor picks the innermost block that matches. This matches one block by its type and attributes, so a command can no longer use a custom test. There is no replacement for one.
- A custom inline whose `toHtml` is a `<br>` or an `<img>` no longer reads as a line break or as its `alt` text in `toPlainText`. The inline must declare `toText`.
- The values of `attrs` in `HtmlSpec` can be a string, a boolean or a style map. Code that reads `attrs.href` as a string no longer typechecks.
- A markup attribute name that is not lowercase letters, digits and hyphens, or that starts with `on` (event handlers), throws a `TypeError`.

Other changes:

- Markup takes any HTML attribute. A value never throws. Null, undefined and false leave the attribute out, a number is written as a string, and any other value that is not a string, a boolean or a style map is left out with a warning in development.
- A `true` flag attribute is written as `name=""` in the editor, the HTML export and the read-only view.
- An inline may declare `toText` to set its plain text, instead of the fixed text its `toHtml` writes. The soft break uses it for its newline.
- The built-in Text command is the current one in "Turn into" only when no plugin command is.
