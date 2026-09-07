---
"@frontify/fondue-components": patch
"@frontify/fondue-rte": patch
"@frontify/fondue": patch
---

fix(Dialog): stack portaled overlays above host page content

`Dialog` rendered its portal with no `z-index` of its own, so it landed at `auto` and
lost to any positioned sibling carrying even `z-index: 1` -- for example the
RichTextEditor's floating link modal, which left the internal LinkChooser rendering
behind the modal that opened it.

`Dialog` now sits at 20, and `Dropdown`, `Flyout`, `Select` and `Tooltip` at 30 so they
stay above a `Dialog` they are opened from. The scale lives in
`utilities/zIndex.module.scss`. Also drops the unused `floatingModal: 1000` entry from
the RichTextEditor's `zIndexLayers`, which would have re-broken this the moment it was
wired up.
