---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): read and write GFM tables in Markdown. With the table plugin, `parseMarkdown` reads a GFM table as a table whose first row holds header cells, and `serializeToMarkdown` writes it back with each `|` in a cell escaped. What GFM cannot hold is listed in `losses`, never thrown. A break in a cell writes as a space, and a short row is padded. A row header, a body cell in the first row and a header cell below it are written as GFM header and body cells. A table or row with no cells writes nothing. A table with a merged cell, or with a cell that holds more than one paragraph, writes its cells as paragraphs.
