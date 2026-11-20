---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): `autoFocus` puts the caret at the start or end of the text when the editor mounts, and plugins can do the same with `api.focus('start' | 'end')`; the caret now lands in the last text, never on a trailing void block, when the editor comes back after a crash
