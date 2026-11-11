---
'@frontify/fondue-components': patch
---

fix(TextInput, Textarea): remove the browser's default border from the inner `<input>` and `<textarea>`. Hosts without a CSS reset showed a native border inside the component frame, for example in the ColorPicker hex and opacity fields.
