---
"@frontify/fondue": patch
---

feat(RichTextEditor): `FloatingModalWrapper` component has been created. Use this when a custom plugin requires a flyout. An example of it's usage be found in `src/components/RichTextEditor/Plugins/LinkPlugin/FloatingLink/InsertLinkModal/InsertModal.tsx`

fix(RichTextEditor): The `BlurObserver` element has been updated to close floating modals when the user clicks inside the richTextEditor content. In addition, it will only be activated once the user has focused the editor, reducing the number of event listeners active on the page.
