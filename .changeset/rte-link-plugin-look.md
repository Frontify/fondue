---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor)!: set the link look with `linkPlugin({ look })`, and hand the renderer the same look with `linkContent({ look })`. `textStylePlugin({ look })` and `textStyleContent({ look })` no longer take `link`, so move `look.link` to the `look` of `linkPlugin` and `linkContent`. `linkContent` is now a function, so replace `linkContent` with `linkContent()`.

`defaultPlugins` already holds a `linkPlugin()`. Adding a second link plugin next to it throws `Duplicate edit view "link"` at mount, because each `linkPlugin()` call builds its own edit view. Replace the default one in place instead:

```ts
const plugins = defaultPlugins.map((plugin) => {
    if (plugin.id === 'link') {
        return linkPlugin({ look });
    }
    return plugin;
});
```
