---
"@frontify/fondue-components": patch
---

feat(Tree): unify `isSelected` to drive both checkbox (multiSelect) and row highlight (single-select); remove `isActive`. Single-select state is now tracked internally — clicking a row selects it, the highlight follows, and `isSelected` is emitted via `onChange` without a parallel `selectedId`.
