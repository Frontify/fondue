# Saving and switching documents

The editor orders saves, and the host owns the transport and the server rules. Pass a `PersistenceService` as `services.persistence`, and the editor calls its `save` with the operation ID, the stamp, the base revision and the document. A save counts as done only when the service answers `saved` for that exact stamp.

## Switching to another document

- **Same definition:** call `replaceDocument` on the handle. Pass the stamp you read with `getSnapshot()` as `expected`, the next record as `next`, and what to do with unsaved changes as `unsaved`: `reject`, `save`, `checkpoint` with a receipt, or `discard` with `confirmed: true`. The editor keeps the document, history and selection when it refuses, and returns the reason. A `faulted` refusal is different: the next document could not be shown, so editing stops and the recovery shell shows the old document with its unsaved edits, with Retry and Copy content.
- **Another definition:** a definition cannot change after mount. Call `requestCommit` and wait until it settles, then mount the editor again with a new `key`. The old editor then has nothing unsaved to leave behind.

A host that echoes its own saved record back through `replaceDocument` gets the current session back, and nothing changes.

## Recovery checkpoints

Pass a `RecoveryService` as `services.recovery`, and the editor stores a `RecoveryCheckpoint` with it when the view fails with content the editor could not show. Call `store` yourself before a `replaceDocument` with the `checkpoint` policy, and pass the receipt it returns. The editor accepts only a receipt for the current stamp.

A host `RecoveryService` that keeps checkpoints in the browser MUST:

- namespace them by user, tenant and document, so no one reads another person's content;
- delete them after a retention period that the host states;
- delete them on logout and on account switch.

A host that may not keep content in the browser stores checkpoints on its server, or configures no recovery service. The recovery shell then offers reading, copying and Retry.
