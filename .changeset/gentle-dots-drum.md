---
"@frontify/fondue": patch
---

fix(ActionMenu): Stop internal `onClick` prop of `AriaMenuItem` being overwritten by `ActionMenu` level onClick prop, even if this prop is not supplied. This fixes an issue where touch-to-click commands were not recognised by the `AriaMenuItem`.
