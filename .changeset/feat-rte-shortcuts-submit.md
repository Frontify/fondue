---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): alignment, reset and submit shortcuts. `alignPlugin` and `resetFormattingPlugin` are now factories: call `alignPlugin()`. `EditorControlApi` gains required `isEmpty`, `group` and `announce`, which breaks code that implements the type. `blocks.setType` now lifts every list in the range, which Turn into inherits
