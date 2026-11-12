---
"@frontify/fondue-rich-text-editor": minor
---

Bring in the rich text editor changes from main:

- feat(RichTextEditor): clean up pastes from Word, Outlook and Google Docs
- feat(RichTextEditor): add `[x] ` and `[~] ` (in progress) to-do shortcuts, autolink on Enter and Shift-Enter, and a drop cursor
- fix(RichTextEditor): open documents from a newer format version read-only
- fix(RichTextEditor): keep stored attributes no plugin declares
- fix(RichTextEditor): replace a font colour in one undo step
- fix(RichTextEditor): draw an unknown block among a list's items as an item of its own in the reader and export
- fix(RichTextEditor): keep an unknown block's stored data out of the selection snapshot
