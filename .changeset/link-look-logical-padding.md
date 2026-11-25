---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): `linkPlugin({ look })` takes `paddingInlineStart` and `paddingInlineEnd` for button links and for the text link box. They follow the text direction: the start is the left in left-to-right text and the right in right-to-left text. Text links take these instead of `paddingLeft` and `paddingRight`. On button links, `paddingLeft` and `paddingRight` still work and stay on their side, but are deprecated: in left-to-right text use `paddingInlineStart` for the left and `paddingInlineEnd` for the right, and in right-to-left text the other way round. Where a button sets both kinds for the same side, the start or end field wins, so a host can add the new fields before it removes the old ones. `paddingLeft` and `paddingRight` know the direction only from a `dir` attribute on the page or on an element around the editor: under a CSS `direction: rtl` alone they swap sides, so set `dir="rtl"` as HTML asks.
