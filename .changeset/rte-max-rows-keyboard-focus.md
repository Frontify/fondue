---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): add `maxRows` to cap the content at that many lines of body text, scrolling inside the editor with the toolbar staying in view, and set `data-keyboard-focus` on the editable's container while its text has keyboard focus (not a click), so a host box can draw Fondue's focus ring as Fondue's Textarea does
