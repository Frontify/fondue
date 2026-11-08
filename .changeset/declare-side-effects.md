---
'@frontify/fondue-icons': patch
'@frontify/fondue-components': patch
---

fix: declare `sideEffects` in both packages so bundlers drop the icons and components you do not import.
