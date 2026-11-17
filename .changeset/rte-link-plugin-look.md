---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): set the link look with `linkPlugin({ look })`. `textStylePlugin({ presets })` no longer takes `link`, so move `presets.link` to `linkPlugin({ look })`.

`defaultPlugins` already holds a `linkPlugin()`. Adding a second link plugin next to it throws `Duplicate edit view "link"` at mount, because each `linkPlugin()` call builds its own edit view. Replace the default one in place instead:

```ts
const plugins = defaultPlugins.map((plugin) => {
    if (plugin.id === 'link') {
        return linkPlugin({ look });
    }
    return plugin;
});
```
