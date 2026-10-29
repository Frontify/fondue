---
"@frontify/fondue-components": patch
---

fix(Tree): while the tree has no DOM focus, put the roving tab stop on the first visible selected row (in multi-select, the first checked row or fully checked folder). With no visible selection it stays on the row last clicked or arrowed to
