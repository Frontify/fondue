---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): read and write Markdown from the new `@frontify/fondue-rich-text-editor/codecs` entry (`@frontify/fondue/rich-text-editor/codecs`).

`parseMarkdown(markdown, { plugins })` returns a document for display. Use `parseMarkdownWithLosses(markdown, { plugins })` before editing stored Markdown. If it reports a loss, keep the original Markdown. `serializeToMarkdown(document, { plugins })` returns the Markdown and any document features that it could not keep.

Plugins declare a `markdown` form next to `toHtml` and `parse`. Hosts can replace a form through `overrides`. A mention writes its label as text. A host override can read and write its mention syntax.
