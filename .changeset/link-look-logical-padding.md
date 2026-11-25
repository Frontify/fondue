---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): `linkPlugin({ look })` takes `paddingInlineStart` and `paddingInlineEnd` for button links and for the text link box. They follow the text direction: the start is the left in left-to-right text and the right in right-to-left text. Text links take these instead of `paddingLeft` and `paddingRight`. On button links, `paddingLeft` and `paddingRight` still work and stay on their side, but are deprecated: use `paddingInlineStart` and `paddingInlineEnd` instead. Where a button sets both kinds for the same side, the start or end field wins, so a host can add the new fields before it removes the old ones. The side follows the `dir` attribute of the page or of an element around the editor.
