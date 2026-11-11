---
'@frontify/fondue-components': patch
---

fix(Tabs): call `onActiveTabChange` once per tab change. `@radix-ui/react-tabs` 1.2.1 focuses the trigger on mouse down, which with automatic activation requested the tab twice, so controlled Tabs called the handler twice per click. See https://github.com/radix-ui/primitives/pull/4060 and https://github.com/Frontify/web-app/pull/18284.
