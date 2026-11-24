---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): store alignment as `start`, `center`, `end` and `justify`

The stored `align` attribute now holds the logical values `start` and `end` in place of `left` and `right`, and renders as `text-align: start` or `end`, so right-to-left text keeps the intended side. The toolbar labels and icons follow the editor's reading direction: in a right-to-left editor, `start` is offered as "Align right".

Pasted HTML with `text-align: left` reads as `start`, and `text-align: right` as `end`.

A stored document that still holds `left` or `right` keeps the value and writes it back unchanged, but the editor gives it no alignment. Map existing data before loading it: `left` → `start`, `right` → `end`.

Toolbar entries get a new `direction` prop (`'ltr'` or `'rtl'`), the reading direction of the editable text.
