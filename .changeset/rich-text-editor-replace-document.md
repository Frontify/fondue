---
---

feat(RichTextEditor): add `replaceDocument` with the guarded Replacement steps (echo no-op, model and decode checks, stamp checks, composition, unsaved policies `reject`, `save`, `checkpoint` and `discard`, unresolved writes, a fresh generation with empty history), a `transitioning` surface, and the `RecoveryService` store at a view fault
