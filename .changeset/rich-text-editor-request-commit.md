---
---

feat(RichTextEditor): add `requestCommit` checkpoints in managed sessions: the snapshot with the last keystroke is pinned and written in call order ahead of autosave, one write per stamp, composition wait or reject, and results for acknowledgment, conflict, rejection, timeout, transport, offline and dispose
