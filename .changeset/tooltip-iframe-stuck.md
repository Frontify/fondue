---
'@frontify/fondue-components': patch
---

fix(Tooltip): close when the pointer enters an iframe

The tooltip could get stuck open when moving the pointer from the trigger or
its content into an iframe (e.g. a platform app), because the parent document
stops receiving pointer events and Radix never fires the close. The tooltip now
closes when the pointer enters an iframe or when an iframe gains focus, working
around [radix-ui/primitives#3394](https://github.com/radix-ui/primitives/issues/3394).
