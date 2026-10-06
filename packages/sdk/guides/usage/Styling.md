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

### Choosing colours

The colour roles are named after what they are used for, not after a brand colour. `primary` is the neutral high-contrast foreground (near-black in the `light` theme, near-white in the `dark` theme), and `secondary` is a muted neutral. Both flip between themes, so use these pairings instead of picking colours by hue:

| Use case                                                                              | Tailwind class                                                                             | CSS variable                                                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Page / card background                                                                | `tw-bg-surface`                                                                            | `--color-surface-default`                                                                    |
| Dimmed background (sidebars, wells)                                                   | `tw-bg-surface-dim`                                                                        | `--color-surface-dim`                                                                        |
| Default text and icons on a surface                                                   | `tw-text-primary`                                                                          | `--color-primary-default`                                                                    |
| Muted text on a surface (descriptions, placeholders)                                  | `tw-text-secondary`                                                                        | `--color-secondary-default`                                                                  |
| Decorative, low-emphasis graphics (e.g. empty-state icons); too low contrast for text | `tw-text-low-contrast`                                                                     | `--color-low-contrast-default`                                                               |
| Dividers and borders                                                                  | `tw-border-line-subtle`, `tw-border-line-mid`, `tw-border-line-strong`                     | `--color-line-subtle`, `--color-line-mid`, `--color-line-strong`                             |
| Filled, high-emphasis element (e.g. a button)                                         | `tw-bg-primary` + `tw-text-primary-on-primary`                                             | `--color-primary-default` + `--color-primary-on-primary`                                     |
| Tinted container (e.g. a selected row or a chip)                                      | `tw-bg-container-secondary` + `tw-text-container-secondary-on-secondary-container`         | `--color-container-secondary-default` + `--color-container-secondary-on-secondary-container` |
| Status (error, success, warning, highlight)                                           | `tw-text-error`, `tw-bg-container-error` + `tw-text-container-error-on-error-container`, … | `--color-error-default`, …                                                                   |

`on-*` colours are only meant for content placed **on top of** the matching fill. For example `tw-text-secondary-on-secondary` is white in the `light` theme and is invisible on `tw-bg-surface`; use `tw-text-secondary` for muted text on a surface.

```tsx
<div className="tw-bg-surface tw-text-primary">
    <h2 className="tw-heading-large">Title</h2>
    <p className="tw-body-medium tw-text-secondary">Supporting text</p>
    <hr className="tw-border-line-subtle" />
</div>
```

### Tailwind defaults

The preset replaces Tailwind's default theme for the properties that have Fondue tokens: colours, font sizes, font weights, font families, letter spacing, line heights, border radius, border width, box shadows, outlines and breakpoints. Default classes for these such as `tw-text-sm`, `tw-bg-white` or `tw-rounded-lg` are not generated. Use the Fondue equivalents (`tw-body-small`, `tw-bg-surface`, `tw-rounded-large`, …).

Spacing is the exception: the Fondue spacing tokens are added on top of Tailwind's default spacing scale. Both `tw-p-4` / `tw-gap-2` and `tw-p-medium` / `tw-gap-small` work; prefer the token-based classes.

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
