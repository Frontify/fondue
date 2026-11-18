---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): the toolbar uses plain Fondue components. Toolbar controls use the regular `Button` size, the text style picker is the regular `Select`, and a vertical `Divider` parts the groups. The editor no longer restyles any Fondue component, so the toolbar is taller, toggles no longer look different when on (they still set `aria-pressed`), and touch screens no longer get 44px targets.
