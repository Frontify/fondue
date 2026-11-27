---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): `mentionContent` and `mentionPlugin` take `unknownLabels`, the text a stored mention with no username shows for each kind, so a host can give it in the document's language. A kind left out keeps its English label. A blank label throws, since it would draw a mention with no text.
