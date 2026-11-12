---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): core owns the selected node, the active block command, inline plain text and the attribute check.

Breaking changes:

- `RteBlockCommand.isActive` is removed. A command declares the block it makes current as `active: { type, attributes }`, and the editor picks the innermost block that matches.
- Markup attributes now throw a `TypeError` when the name is not lowercase letters, digits and hyphens, when the name starts with `on` (event handlers), when `style` is not a map of CSS properties, or when a value is not a string or a boolean.

Other changes:

- Markup takes any HTML attribute. A `true` flag attribute renders as `name="name"` in the read-only view.
- An inline may declare `toText` to set its plain text, instead of the fixed text its `toHtml` writes. The soft break uses it for its newline.
