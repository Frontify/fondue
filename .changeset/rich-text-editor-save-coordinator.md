---
---

feat(RichTextEditor): add the save coordinator behind `services.persistence`: debounced autosave with a longest wait, one write in flight, replay of unknown outcomes with backoff, offline hold, conflict and rejection pauses, `getSaveStatus` with `saveStatusChange`, `selectionChange` and `operationMetric` events, and the reference fake and `runPersistenceConformance` in `./testing`
