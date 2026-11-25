---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): read and write GFM tables in Markdown. With the table plugin, `parseMarkdown` reads a GFM table as a table whose first row holds header cells, and `serializeToMarkdown` writes it back with each `|` in a cell escaped. A table GFM cannot hold exactly is still written and listed in `losses`, never thrown: a break in a cell writes as a space, a short row is padded, and a table with a merged cell or a cell holding more than one paragraph writes its cells as paragraphs.
