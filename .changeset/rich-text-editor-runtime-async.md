---
---

feat(RichTextEditor): add `getSnapshot` and `releaseTarget`, the async coordinator that checks each result and keeps the author's caret, and composition handling: host calls answer `composition-active`, and queued intents, async results, the `contenteditable` change and the snapshot wait until input has settled
