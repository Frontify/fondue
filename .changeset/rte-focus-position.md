---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): `autoFocus` puts the caret before the first text or after the last when the editor mounts. Plugins do the same with `api.focus('start' | 'end')`. After a crash, the editor puts the caret after the last text, never on a trailing void block.
