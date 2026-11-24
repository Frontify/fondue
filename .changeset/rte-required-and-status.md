---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): add `required` and `status` (`'neutral' | 'error'`), set as `aria-required` and `aria-invalid` on the editable element, and `aria-errormessage`, applied while `status` is `'error'`. The editor draws no border; the host draws the field's error look.
