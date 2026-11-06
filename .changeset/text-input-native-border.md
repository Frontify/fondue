---
'@frontify/fondue-components': patch
---

fix(TextInput): remove the browser's default border from the inner `<input>`. Hosts without a CSS reset showed a dark 2px inset border inside the TextInput frame, for example in the ColorPicker hex and opacity fields.
