---
"@frontify/fondue-rte": minor
---

feat(*): add custom list styles

Adds support for configurable list styles in the `UnorderedListPlugin` and `OrderedListPlugin`.
The styles can be customized per nesting level.

```ts
new UnorderedListPlugin({
    listStyles: [
        { color: 'var(--f-theme-settings-list-bullet-1-color)', shape: 'var(--f-theme-settings-list-bullet-1-shape)', size: 'var(--f-theme-settings-list-bullet-1-size)' },
        { color: 'var(--f-theme-settings-list-bullet-2-color)', shape: 'var(--f-theme-settings-list-bullet-2-shape)', size: 'var(--f-theme-settings-list-bullet-2-size)' },
        { color: 'var(--f-theme-settings-list-bullet-3-color)', shape: 'var(--f-theme-settings-list-bullet-3-shape)', size: 'var(--f-theme-settings-list-bullet-3-size)' },
    ],
}),

new OrderedListPlugin({
    listStyles: [
        { counterType: 'var(--f-theme-settings-list-numbered-1-counterType)', color: 'var(--f-theme-settings-list-numbered-1-color)' },
        { counterType: 'var(--f-theme-settings-list-numbered-2-counterType)', color: 'var(--f-theme-settings-list-numbered-2-color)' },
        { counterType: 'var(--f-theme-settings-list-numbered-3-counterType)', color: 'var(--f-theme-settings-list-numbered-3-color)' },
    ],
}),
```
