---
"@frontify/fondue-components": patch
---

fix(Table): don't read DOM globals at module load, so importing the package in Node/SSR no longer throws
