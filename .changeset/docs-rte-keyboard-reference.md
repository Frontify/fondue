---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): keyboard reference generated from the plugins. A hotkey is now `{ label, run }`. A hotkey or toolbar shortcut that names an unknown modifier throws when the editor mounts, and so do the shortcut helpers. Toolbar tooltips write the Apple modifiers in macOS order (⇧⌘X, not ⌘⇧X). Alt+F10 moves focus to the toolbar only as exactly Alt+F10, the WAI-ARIA toolbar key, so Shift+Alt+F10 and Ctrl+Alt+F10 no longer do. `alignPlugin` and `resetFormattingPlugin` take the words of their hotkey labels as options.
