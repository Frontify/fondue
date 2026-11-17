---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): set the link look with `linkPlugin({ look })`. `textStylePlugin({ presets })` no longer takes `link`, so move `presets.link` to `linkPlugin({ look })`. In a list built on `defaultPlugins`, replace its `linkPlugin()` with `linkPlugin({ look })` rather than adding a second link plugin.
