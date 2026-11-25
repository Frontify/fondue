---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): a Markdown mark form can read and write a suffix right after the mark, such as Pandoc's `[text](url){target="_blank"}`. A read rule's `suffix: { pattern, value }` matches at the start of the text that directly follows the mark and turns it into part of the mark's value; a write returns `suffix` next to `open` and `close`. A round trip that keeps the value reports no loss.
