# Fondue Design Tokens — Tailwind Class Reference for AI

This document describes the Fondue design system's Tailwind utility classes. Tokens are semantic and theme-aware (light/dark).

## Setup

```tsx
// Import base tokens (required)
import fondueTailwindConfig from '@frontify/fondue/tokens/tailwind';

export default {
  presets: [frontifyTailwindConfig],
};
```

> **Note:** Some projects configure a Tailwind `prefix` (e.g. `prefix: 'tw-'`). Check the project's `tailwind.config.ts` for a prefix — if one is set, prepend it to all class names in this document. For example, `bg-primary` becomes `tw-bg-primary`.

---

## Typography

**Always prefer composite typography classes over individual font-size/weight/family utilities.** These classes set font-family, size, weight, line-height, letter-spacing, and text-transform together, ensuring typographic consistency.

### Body Text

Use for paragraph text, labels, descriptions, and general UI copy.

| Class | When to use |
|---|---|
| `body-x-small` | Fine print, captions, metadata, timestamps |
| `body-small` | Secondary text, helper text, table cells |
| `body-medium` | Default body text, form labels, list items |
| `body-large` | Emphasized body text, lead paragraphs, intro text |

Each body size has weight variants:
- **`-strong`** (medium weight) — Use for emphasis within body text, active states, or labels that need to stand out
- **`-x-strong`** (bold weight) — Use sparingly for strong emphasis, key values, or important inline data

Examples: `body-medium-strong`, `body-small-x-strong`

### Headings

Use for section titles, page headers, and content hierarchy.

| Class | When to use |
|---|---|
| `heading-category` | Uppercase category labels, section eyebrows, overlines (xx-small, uppercase, wide letter-spacing) |
| `heading-medium` | Subsection headings, card titles, dialog titles |
| `heading-large` | Section headings, sidebar titles |
| `heading-x-large` | Page titles, major section headers |
| `heading-xx-large` | Hero headings, landing page titles |

Each heading has a **`-strong`** (bold) variant for extra emphasis. Example: `heading-large-strong`

### Font Family (rarely needed directly)

| Class | When to use |
|---|---|
| `font-primary` | Default — already set by body/heading classes |
| `font-monospace` | Code snippets, technical values, monospaced data |

---

## Colors

Colors are **semantic** — they describe intent, not appearance. They automatically adapt to light/dark themes.

### Color Pairing Rule

When using a colored background, **always** use the matching `on-` color for text/icons on top of it:
- Background `bg-primary` → text `text-primary-on-primary`
- Background `bg-error` → text `text-error-on-error`
- Background `bg-container-error` → text `text-container-error-on-error-container`

### Interactive State Pattern

Most colors provide `hover` and `active` variants. Use with Tailwind state modifiers:
```html
<button class="bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-on-primary">
```

### Primary Colors

For main actions, CTAs, links, and brand elements.

| Class pattern | Purpose |
|---|---|
| `bg-primary` / `text-primary` | Primary action backgrounds/text (buttons, links) |
| `bg-primary-hover` | Primary hover state |
| `bg-primary-active` | Primary active/pressed state |
| `text-primary-on-primary` | Text/icons on primary backgrounds |
| `text-primary-on-primary-variant` | Secondary text on primary backgrounds |

### Secondary Colors

For secondary actions, less prominent buttons, and supporting elements.

| Class pattern | Purpose |
|---|---|
| `bg-secondary` / `text-secondary` | Secondary actions |
| `bg-secondary-hover`, `-active` | Interactive states |
| `text-secondary-on-secondary` | Text on secondary backgrounds |

### Feedback Colors — Error, Success, Warning

Use for validation states, alerts, and status indicators.

| Color | When to use |
|---|---|
| `error` | Form validation errors, destructive actions, error messages |
| `success` | Confirmation states, completed actions, positive feedback |
| `warning` | Caution states, non-blocking alerts, attention needed |

Each has: `default`, `hover`, `active`, and `on-{color}` variants.

Example: `bg-error`, `bg-error-hover`, `text-error`, `text-error-on-error`

### Container Colors

Lighter, muted background variants of feedback/status colors. Use for banners, badges, notification areas, and status sections — anywhere you need a tinted background that's less intense than the full color.

| Class pattern | Purpose |
|---|---|
| `bg-container-error` | Error banner/notice backgrounds |
| `bg-container-success` | Success banner/notice backgrounds |
| `bg-container-warning` | Warning banner/notice backgrounds |
| `bg-container-secondary` | Secondary/neutral tinted backgrounds |
| `bg-container-highlight` | Highlighted/selected item backgrounds |
| `bg-container-disabled` | Disabled element backgrounds |

Each container color has `hover`, `active`, and `on-{type}-container` variants.

Text on containers: `text-container-error-on-error-container`, `text-container-secondary-on-secondary-container`, etc.

### Surface Colors

The foundational layer colors for pages, cards, and panels.

| Class | When to use |
|---|---|
| `bg-surface` | Default page/card/panel background |
| `bg-surface-dim` | Recessed backgrounds, secondary panels, sidebar backgrounds |
| `bg-surface-hover` | Hoverable surface elements (list rows, menu items) |
| `bg-surface-active` | Active/selected surface elements |

### Line Colors

For borders, dividers, and separators.

| Class | When to use |
|---|---|
| `border-line-strong` | High-contrast borders, active input borders |
| `border-line-mid` | Standard borders, card outlines, dividers |
| `border-line-subtle` | Subtle separators, deemphasized dividers |

### Other Colors

| Class | When to use |
|---|---|
| `bg-overlay` | Modal/dialog backdrop scrim |
| `text-disabled` | Disabled text color |
| `bg-disabled` | Disabled element backgrounds |
| `text-disabled-on-disabled` | Text on disabled backgrounds |
| `text-low-contrast` | Deemphasized secondary text (placeholders, hints) |
| `text-highlight` | Highlighted/selected text |
| `bg-highlight` | Text highlight backgrounds |

### Chart Colors

**Only** for data visualization (charts, graphs, plots). Do not use for UI elements.

| Class | Purpose |
|---|---|
| `*-charts-primary` | Primary data series |
| `*-charts-secondary` | Second data series |
| `*-charts-tertiary` | Third data series |
| `*-charts-negative` | Negative values/loss |
| `*-charts-dim` | Deemphasized/inactive data |
| `*-charts-missing` | Missing/null data |

Each chart color has `hover` and `subtle` variants (except dim and missing).

---

## Spacing

Used with padding (`p-`), margin (`m-`), gap (`gap-`), and any spacing utility.

| Token | Size | When to use |
|---|---|---|
| `xx-small` | 4px | Tight internal padding, icon-to-text gaps |
| `x-small` | 8px | Compact element spacing, small component padding |
| `small` | 12px | Standard internal padding, form field padding |
| `medium` | 16px | Default gaps between elements, card padding |
| `large` | 24px | Section spacing within a card/panel |
| `x-large` | 32px | Major section gaps, larger card padding |
| `xx-large` | 40px | Page-level section spacing |

Examples: `p-medium`, `m-x-small`, `gap-large`, `px-small`, `mt-xx-large`

---

## Border Radius

| Token | When to use |
|---|---|
| `rounded-small` | Subtle rounding, tags, small badges |
| `rounded-medium` or `rounded` | Default for cards, inputs, buttons (this is the default) |
| `rounded-large` | Dialogs, modals, larger containers |
| `rounded-x-large` | Prominent cards, hero sections |
| `rounded-full` | Circular elements (avatars, round icon buttons) |

---

## Border Width

| Token | When to use |
|---|---|
| `border` | Standard 1px border (default) |
| `border-large` | Emphasized 2px border (active states, selected items) |

---

## Shadows

| Token | When to use |
|---|---|
| `shadow` | Subtle depth — cards, raised surfaces |
| `shadow-mid` | Medium depth — dropdowns, popovers, floating elements |
| `shadow-big` | Strong depth — modals, dialogs, overlays |

---

## Focus Ring

```html
<button class="focus-visible:ring-focus">
```

`ring-focus` applies a double-ring focus indicator (2px surface + 6px focus color). Always use `focus-visible:` modifier so it only appears for keyboard navigation.

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
<div class="bg-surface rounded-large shadow p-large border border-line-subtle">
  <h3 class="heading-medium">Title</h3>
  <p class="body-medium text-low-contrast mt-small">Description text</p>
</div>
```

### Status Banner
```html
<div class="bg-container-warning text-container-warning-on-warning-container rounded-medium p-medium">
  <p class="body-medium-strong">Warning message here</p>
</div>
```

### Interactive List Item
```html
<div class="bg-surface hover:bg-surface-hover active:bg-surface-active p-medium border-b border-line-subtle cursor-pointer">
  <span class="body-medium">List item text</span>
</div>
```

### Section with Heading
```html
<section class="mt-xx-large">
  <span class="heading-category text-low-contrast">Category Label</span>
  <h2 class="heading-x-large mt-x-small">Section Title</h2>
  <p class="body-large text-low-contrast mt-small">Section description goes here.</p>
</section>
```

### Disabled State
```html
<div class="bg-container-disabled text-container-disabled-on-disabled-container rounded-medium p-medium cursor-not-allowed">
  Disabled content
</div>
```
