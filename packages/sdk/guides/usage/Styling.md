# Styling

## Style tokens

Explore the available tokens in [Storybook](https://fondue-components.frontify.com/?path=/story/tokens_tokens--colors)

### Using tailwind classes

When using tailwind with the Fondue preset, all tokens are available as classes. The examples below assume the `tw-` prefix set up in the Setup guide (`getting-started/Setup`); the preset itself does not set a prefix.

Colour tokens are named `<role>` or `<role>-<variant>`, and the `-default` suffix of the token id is dropped in the class name. Every colour can be used with any colour utility (`tw-bg-*`, `tw-text-*`, `tw-border-*`, `tw-fill-*`, …).

```tsx
<div className="tw-bg-primary tw-text-primary-on-primary hover:tw-bg-primary-hover">...</div>
```

### Using CSS variables

All style tokens are available as css variables. When using the `ThemeProvider`, the tokens will be provided to the components based on the theme you provide.

```css
.my-element {
    background-color: var(--color-primary-default);
    color: var(--color-primary-on-primary);
}
```

### Tailwind defaults

The preset replaces Tailwind's default theme for the properties that have Fondue tokens: colours, font sizes, font weights, font families, letter spacing, line heights, border radius, border width, box shadows, outlines and breakpoints. Default classes for these such as `tw-text-sm`, `tw-bg-white` or `tw-rounded-lg` are not generated. Use the Fondue equivalents (`tw-body-small`, `tw-bg-surface`, `tw-rounded-large`, …).

Spacing is the exception: the Fondue spacing tokens are added on top of Tailwind's default spacing scale. Both `tw-p-4` / `tw-gap-2` and `tw-p-medium` / `tw-gap-small` work; prefer the token-based classes.

> [!WARNING]
> Don't use `x-small` or `x-large` spacing with `gap`, `inset` or `border-spacing`. Tailwind also reads `tw-gap-x-small` as `gap-x` + `small`, so it generates both `gap: var(--spacing-x-small)` and `column-gap: var(--spacing-small)` and you end up with the wrong column gap — without any warning. The same applies to `tw-gap-x-large`, `tw-inset-x-small`, `tw-inset-x-large` and `tw-border-spacing-x-*`. Use an arbitrary value instead:
>
> | Intent                    | Use                                 |
> | ------------------------- | ----------------------------------- |
> | `gap` of `x-small`        | `tw-gap-[var(--spacing-x-small)]`   |
> | `column-gap` of `x-small` | `tw-gap-x-[var(--spacing-x-small)]` |
> | `inset` of `x-large`      | `tw-inset-[var(--spacing-x-large)]` |
>
> Padding and margin (`tw-p-x-small`, `tw-px-x-small`, `tw-m-x-large`, …) and `space-x`/`space-y` are not affected.

All other Tailwind defaults (layout, flexbox, grid, sizing, …) are unchanged.

## Utilities

Explore the available utilities in [Storybook](https://fondue-components.frontify.com/?path=/story/tokens_utilities--typography)

**When using tailwind**, we provide a set of utilities to help style your components.
Currently, we provide utilities for typography styles. Each utility combines definitions for `font-family`, `font-size`, `line-height`, `font-weight`, `letter-spacing` and `text-transform`.

Use with caution, as these utilities are purely for styling purposes and do not affect the semantic meaning of the text.

```tsx
<span className="tw-body-large-strong">
    ...
</span>
<span className="tw-heading-xx-large-strong">
    ...
</span>
```
