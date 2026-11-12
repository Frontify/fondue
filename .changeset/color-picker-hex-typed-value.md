---
"@frontify/fondue-components": patch
"@frontify/fondue": patch
---

fix(ColorPicker): the HEX field of `ColorPicker.Values` reports each valid typed value through `onColorChange`, as the R, G, B and alpha fields already do, instead of only on blur
