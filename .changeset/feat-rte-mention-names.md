---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): resolve mention names when shown, with a `labels` option; a mention's name is now wrapped in `<bdi>` in exported HTML, which also carries `data-mention-name`; a malformed stored mention shows "Unknown person", "Unknown group" or "Unknown mention" for an empty username, has control characters stripped from what it shows, and writes no `data-mention-kind` for an unknown kind
