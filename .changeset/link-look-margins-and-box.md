---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): `linkPlugin({ look })` takes `marginTop` and `marginBottom` for button links, and a box for text links: `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `backgroundColor`, `borderColor`, `borderWidth`, `borderStyle` and `borderRadius`. A field left out keeps Fondue's look, so links look the same until a host sets one. A page stylesheet rule such as `.page a { padding: 4px }` no longer sets a text link's padding, background or border, or a button link's top and bottom margin: set them through the look, as for the font and colour.
