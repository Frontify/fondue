---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): block commands declare the block they make current as `active: { type, attributes }`, replacing `isActive`; inlines may declare `toText`; markup takes any HTML attribute and throws on event-handler names
