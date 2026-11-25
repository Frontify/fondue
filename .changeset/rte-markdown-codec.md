---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): read and write Markdown from the new `@frontify/fondue-rich-text-editor/codecs` entry (`@frontify/fondue/rich-text-editor/codecs`). `parseMarkdown(markdown, { plugins })` returns a document, and `serializeToMarkdown(document, { plugins })` returns `{ markdown, losses }`. A node with no Markdown form is written as its text and listed in `losses`, never thrown. Plugins declare a `markdown` form next to `toHtml` and `parse`, and hosts replace one through `overrides`. A mention writes its label as text and is never read from Markdown unless the host overrides its form.
