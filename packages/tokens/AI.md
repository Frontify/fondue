# Fondue Design Tokens — Tailwind Class Reference for AI

This document describes the Fondue design system's Tailwind utility classes. All classes use the `tw-` prefix. Tokens are semantic and theme-aware (light/dark).

## Setup

```tsx
// Import base tokens (required)
import '@frontify/fondue-tokens/styles';

// Use as Tailwind preset
import tokensConfig from '@frontify/fondue-tokens/tailwind';

export default {
  presets: [tokensConfig],
  prefix: 'tw-',
};
```

---

## Typography

**Always prefer composite typography classes over individual font-size/weight/family utilities.** These classes set font-family, size, weight, line-height, letter-spacing, and text-transform together, ensuring typographic consistency.

### Body Text

Use for paragraph text, labels, descriptions, and general UI copy.

| Class | When to use |
|---|---|
| `tw-body-x-small` | Fine print, captions, metadata, timestamps |
| `tw-body-small` | Secondary text, helper text, table cells |
| `tw-body-medium` | Default body text, form labels, list items |
| `tw-body-large` | Emphasized body text, lead paragraphs, intro text |

Each body size has weight variants:
- **`-strong`** (medium weight) — Use for emphasis within body text, active states, or labels that need to stand out
- **`-x-strong`** (bold weight) — Use sparingly for strong emphasis, key values, or important inline data

Examples: `tw-body-medium-strong`, `tw-body-small-x-strong`

### Headings

Use for section titles, page headers, and content hierarchy.

| Class | When to use |
|---|---|
| `tw-heading-category` | Uppercase category labels, section eyebrows, overlines (xx-small, uppercase, wide letter-spacing) |
| `tw-heading-medium` | Subsection headings, card titles, dialog titles |
| `tw-heading-large` | Section headings, sidebar titles |
| `tw-heading-x-large` | Page titles, major section headers |
| `tw-heading-xx-large` | Hero headings, landing page titles |

Each heading has a **`-strong`** (bold) variant for extra emphasis. Example: `tw-heading-large-strong`

### Font Family (rarely needed directly)

| Class | When to use |
|---|---|
| `tw-font-primary` | Default — already set by body/heading classes |
| `tw-font-monospace` | Code snippets, technical values, monospaced data |

---

## Colors

Colors are **semantic** — they describe intent, not appearance. They automatically adapt to light/dark themes.

### Color Pairing Rule

When using a colored background, **always** use the matching `on-` color for text/icons on top of it:
- Background `tw-bg-primary` → text `tw-text-primary-on-primary`
- Background `tw-bg-error` → text `tw-text-error-on-error`
- Background `tw-bg-container-error` → text `tw-text-container-error-on-error-container`

### Interactive State Pattern

Most colors provide `hover` and `active` variants. Use with Tailwind state modifiers:
```html
<button class="tw-bg-primary hover:tw-bg-primary-hover active:tw-bg-primary-active tw-text-primary-on-primary">
```

### Primary Colors

For main actions, CTAs, links, and brand elements.

| Class pattern | Purpose |
|---|---|
| `tw-bg-primary` / `tw-text-primary` | Primary action backgrounds/text (buttons, links) |
| `tw-bg-primary-hover` | Primary hover state |
| `tw-bg-primary-active` | Primary active/pressed state |
| `tw-text-primary-on-primary` | Text/icons on primary backgrounds |
| `tw-text-primary-on-primary-variant` | Secondary text on primary backgrounds |

### Secondary Colors

For secondary actions, less prominent buttons, and supporting elements.

| Class pattern | Purpose |
|---|---|
| `tw-bg-secondary` / `tw-text-secondary` | Secondary actions |
| `tw-bg-secondary-hover`, `-active` | Interactive states |
| `tw-text-secondary-on-secondary` | Text on secondary backgrounds |

### Feedback Colors — Error, Success, Warning

Use for validation states, alerts, and status indicators.

| Color | When to use |
|---|---|
| `error` | Form validation errors, destructive actions, error messages |
| `success` | Confirmation states, completed actions, positive feedback |
| `warning` | Caution states, non-blocking alerts, attention needed |

Each has: `default`, `hover`, `active`, and `on-{color}` variants.

Example: `tw-bg-error`, `tw-bg-error-hover`, `tw-text-error`, `tw-text-error-on-error`

### Container Colors

Lighter, muted background variants of feedback/status colors. Use for banners, badges, notification areas, and status sections — anywhere you need a tinted background that's less intense than the full color.

| Class pattern | Purpose |
|---|---|
| `tw-bg-container-error` | Error banner/notice backgrounds |
| `tw-bg-container-success` | Success banner/notice backgrounds |
| `tw-bg-container-warning` | Warning banner/notice backgrounds |
| `tw-bg-container-secondary` | Secondary/neutral tinted backgrounds |
| `tw-bg-container-highlight` | Highlighted/selected item backgrounds |
| `tw-bg-container-disabled` | Disabled element backgrounds |

Each container color has `hover`, `active`, and `on-{type}-container` variants.

Text on containers: `tw-text-container-error-on-error-container`, `tw-text-container-secondary-on-secondary-container`, etc.

### Surface Colors

The foundational layer colors for pages, cards, and panels.

| Class | When to use |
|---|---|
| `tw-bg-surface` | Default page/card/panel background |
| `tw-bg-surface-dim` | Recessed backgrounds, secondary panels, sidebar backgrounds |
| `tw-bg-surface-hover` | Hoverable surface elements (list rows, menu items) |
| `tw-bg-surface-active` | Active/selected surface elements |

### Line Colors

For borders, dividers, and separators.

| Class | When to use |
|---|---|
| `tw-border-line-strong` | High-contrast borders, active input borders |
| `tw-border-line-mid` | Standard borders, card outlines, dividers |
| `tw-border-line-subtle` | Subtle separators, deemphasized dividers |

### Other Colors

| Class | When to use |
|---|---|
| `tw-bg-overlay` | Modal/dialog backdrop scrim |
| `tw-text-disabled` | Disabled text color |
| `tw-bg-disabled` | Disabled element backgrounds |
| `tw-text-disabled-on-disabled` | Text on disabled backgrounds |
| `tw-text-low-contrast` | Deemphasized secondary text (placeholders, hints) |
| `tw-text-highlight` | Highlighted/selected text |
| `tw-bg-highlight` | Text highlight backgrounds |

### Chart Colors

**Only** for data visualization (charts, graphs, plots). Do not use for UI elements.

| Class | Purpose |
|---|---|
| `tw-*-charts-primary` | Primary data series |
| `tw-*-charts-secondary` | Second data series |
| `tw-*-charts-tertiary` | Third data series |
| `tw-*-charts-negative` | Negative values/loss |
| `tw-*-charts-dim` | Deemphasized/inactive data |
| `tw-*-charts-missing` | Missing/null data |

Each chart color has `hover` and `subtle` variants (except dim and missing).

---

## Spacing

Used with padding (`tw-p-`), margin (`tw-m-`), gap (`tw-gap-`), and any spacing utility.

| Token | Size | When to use |
|---|---|---|
| `xx-small` | 4px | Tight internal padding, icon-to-text gaps |
| `x-small` | 8px | Compact element spacing, small component padding |
| `small` | 12px | Standard internal padding, form field padding |
| `medium` | 16px | Default gaps between elements, card padding |
| `large` | 24px | Section spacing within a card/panel |
| `x-large` | 32px | Major section gaps, larger card padding |
| `xx-large` | 40px | Page-level section spacing |

Examples: `tw-p-medium`, `tw-m-x-small`, `tw-gap-large`, `tw-px-small`, `tw-mt-xx-large`

---

## Border Radius

| Token | When to use |
|---|---|
| `tw-rounded-small` | Subtle rounding, tags, small badges |
| `tw-rounded-medium` or `tw-rounded` | Default for cards, inputs, buttons (this is the default) |
| `tw-rounded-large` | Dialogs, modals, larger containers |
| `tw-rounded-x-large` | Prominent cards, hero sections |
| `tw-rounded-full` | Circular elements (avatars, round icon buttons) |

---

## Border Width

| Token | When to use |
|---|---|
| `tw-border` | Standard 1px border (default) |
| `tw-border-large` | Emphasized 2px border (active states, selected items) |

---

## Shadows

| Token | When to use |
|---|---|
| `tw-shadow` | Subtle depth — cards, raised surfaces |
| `tw-shadow-mid` | Medium depth — dropdowns, popovers, floating elements |
| `tw-shadow-big` | Strong depth — modals, dialogs, overlays |

---

## Focus Ring

```html
<button class="focus-visible:tw-ring-focus">
```

`tw-ring-focus` applies a double-ring focus indicator (2px surface + 6px focus color). Always use `focus-visible:` modifier so it only appears for keyboard navigation.

---

## Prefer Fondue Components Over Raw Tailwind

When a Fondue component exists for a UI pattern, **always use the component** rather than building it from scratch with Tailwind classes. Components handle accessibility, states, and theming correctly.

| Instead of... | Use Fondue component |
|---|---|
| Styled `<button>` with Tailwind | `<Button>` |
| Styled status pill | `<Badge>` |
| Styled modal with overlay | `<Dialog>` |
| Styled `<input>` | `<TextInput>` |
| Styled `<textarea>` | `<Textarea>` |
| Styled `<select>` | `<Select>` or `<Dropdown>` |
| Styled checkbox | `<Checkbox>` |
| Styled toggle | `<Switch>` |
| Styled `<a>` tag | `<Link>` |
| Styled tab bar | `<Tabs>` |
| Styled tooltip wrapper | `<Tooltip>` |
| Styled `<table>` | `<Table>` |
| Styled horizontal rule | `<Divider>` |
| Styled loading spinner | `<LoadingCircle>` or `<LoadingBar>` |
| Styled accordion sections | `<Accordion>` |
| Styled notification | `<Notice>` |
| Styled flyout panel | `<Flyout>` |
| Styled slider input | `<Slider>` |
| Styled tag/chip | `<Tag>` |
| Styled radio buttons | `<RadioList>` |
| Layout with flexbox classes | `<Flex>` component for common flex patterns |
| Layout with grid classes | `<Grid>` component for common grid patterns |

Use Tailwind classes for:
- **Layout composition** — arranging Fondue components together (spacing, alignment, sizing)
- **Custom UI** — elements that don't map to any Fondue component
- **Minor adjustments** — adding margins or padding around components

---

## Common Patterns

### Card
```html
<div class="tw-bg-surface tw-rounded-large tw-shadow tw-p-large tw-border tw-border-line-subtle">
  <h3 class="tw-heading-medium">Title</h3>
  <p class="tw-body-medium tw-text-low-contrast tw-mt-small">Description text</p>
</div>
```

### Status Banner
```html
<div class="tw-bg-container-warning tw-text-container-warning-on-warning-container tw-rounded-medium tw-p-medium">
  <p class="tw-body-medium-strong">Warning message here</p>
</div>
```

### Interactive List Item
```html
<div class="tw-bg-surface hover:tw-bg-surface-hover active:tw-bg-surface-active tw-p-medium tw-border-b tw-border-line-subtle tw-cursor-pointer">
  <span class="tw-body-medium">List item text</span>
</div>
```

### Section with Heading
```html
<section class="tw-mt-xx-large">
  <span class="tw-heading-category tw-text-low-contrast">Category Label</span>
  <h2 class="tw-heading-x-large tw-mt-x-small">Section Title</h2>
  <p class="tw-body-large tw-text-low-contrast tw-mt-small">Section description goes here.</p>
</section>
```

### Disabled State
```html
<div class="tw-bg-container-disabled tw-text-container-disabled-on-disabled-container tw-rounded-medium tw-p-medium tw-cursor-not-allowed">
  Disabled content
</div>
```
