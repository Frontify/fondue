# Styling

## Style tokens

Explore the available tokens in [Storybook](https://fondue-components.frontify.com/?path=/story/tokens_tokens--colors)

### Using tailwind classes

When using tailwind, all tokens are available as classes.

```tsx
<div className="tw-bg-primary-default tw-text-primary-on-primary">...</div>
```

### Using CSS variables

All style tokens are available as css variables. When using the `ThemeProvider`, the tokens will be provided to the components based on the theme you provide.

```css
.my-element {
    background-color: var(--color-primary-default);
    color: var(--color-primary-on-primary);
}
```

## Utilities

Explore the available utilities in [Storybook](https://fondue-components.frontify.com/?path=/story/tokens_utilities--typography)

**When using tailwind**, we provide a set of utilities to help style your components.
Currently, we provide utilities for typography styles. Each utility combines definitions for `font-size`, `line-height`, `font-weight`, `letter-spacing` and `letter-casing`.

Use with caution, as these utilities are purely for styling purposes and do not affect the semantic meaning of the text.

```tsx
<span className="tw-body-large-strong">
    ...
</span>
<span className="tw-heading-xx-large-strong">
    ...
</span>
```
