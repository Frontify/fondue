---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): the mention picker shows Searching while a search takes long and offers Retry when it fails, draws an avatar only from a safe image URL, and `@` in inline code starts no mention; a mention's name is now wrapped in `<bdi>` in exported HTML; a malformed stored mention shows "Unknown person", "Unknown group" or "Unknown mention" for an empty username, has control characters stripped from what it shows, and writes no `data-mention-kind` for an unknown kind
