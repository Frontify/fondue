---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): a Markdown mark override can read and write attributes written right after the mark, such as the `{:target="_blank"}` suffix on stored links. A read rule's `suffix: { pattern, value }` matches at the start of the text that directly follows the mark and turns it into part of the mark's value; a write returns `suffix` next to `open` and `close`. A round trip that keeps the value reports no loss. Text typed right after a mark that the mark's own suffix pattern would read is reported as a loss.
