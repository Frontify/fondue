# Fondue Components — React Component Reference for AI

This document describes the React components exported by `@frontify/fondue-components`. All components are TypeScript-first, support ref forwarding, and are theme-aware via Fondue design tokens. Most interactive components are built on [Radix UI](https://www.radix-ui.com/) primitives for accessibility (keyboard navigation, ARIA attributes, focus management).

## Setup

```tsx
import { ThemeProvider, RouterProvider } from '@frontify/fondue/components';

function App() {
  return (
    <ThemeProvider theme="light" dir="ltr">
      <RouterProvider navigate={(path) => router.push(path)} useHref={(path) => path}>
        {/* your app */}
      </RouterProvider>
    </ThemeProvider>
  );
}
```

- **ThemeProvider** (required): wraps your app. Props: `theme` (`'light'` | `'dark'`), `dir` (`'ltr'` | `'rtl'`), `translations` (i18n object, defaults to English), `asChild` (boolean, default `false` — renders as `<div>` or passes through to child).
- **useFondueTheme**: hook to access theme context (`{ theme, dir, translations }`). Use when building custom theme-aware components.
- **RouterProvider** (required for `<Link>`): provides navigation. Props: `navigate` (function), `useHref` (function).
- **Icons**: import from `@frontify/fondue-icons` (e.g., `import { IconPlus } from '@frontify/fondue-icons'`).

---

## Component Selection Guide

| When you need... | Use |
|---|---|
| A clickable action button | `<Button>` |
| A button with primary + secondary action | `<SplitButton>` |
| A hyperlink / navigation | `<Link>` |
| A single-line text input | `<TextInput>` |
| A multi-line text input | `<Textarea>` |
| A dropdown select (no typing) | `<Select>` |
| A searchable/filterable select | `<Select.Combobox>` |
| A multi-select dropdown | `<Select.Multiple>` |
| A searchable multi-select | `<Select.Combobox.Multiple>` |
| A right-click or action menu | `<Dropdown>` |
| A checkbox | `<Checkbox>` |
| A boolean on/off toggle | `<Switch>` |
| Mutually exclusive radio options | `<RadioList>` |
| A compact toggle between 2–4 options | `<SegmentedControl>` |
| A numeric range input | `<Slider>` |
| A color picker | `<ColorPicker>` |
| Tab-based content switching | `<Tabs>` |
| Collapsible sections | `<Accordion>` |
| A page heading | `<Heading>` |
| Body/paragraph text | `<Text>` |
| A form field label | `<Label>` |
| An inline status pill | `<Badge>` |
| A removable keyword/chip | `<Tag>` |
| A feedback/alert banner | `<Notice>` |
| A hover explanation | `<Tooltip>` |
| A modal dialog | `<Dialog>` |
| A non-modal popover panel | `<Flyout>` |
| A data table | `<Table>` |
| A visual separator | `<Divider>` |
| A loading spinner | `<LoadingCircle>` |
| A progress bar | `<LoadingBar>` |
| A scrollable container | `<ScrollArea>` |
| Flex layout | `<Flex>` |
| Grid layout | `<Grid>` |
| A generic box with spacing props | `<Box>` |
| A semantic page section | `<Section>` |

---

## Layout

**Box, Flex, Grid, Section** all share responsive layout props: `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`, `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`, `overflow`, `position`. Spacing values are numbers (1 = 0.25rem). Values can be responsive objects: `{ base: 16, md: 24 }`.

| Component | Key props | Renders as |
|---|---|---|
| `Box` | `display`, `as` (`'div'`\|`'span'`) | Generic `<div>` |
| `Flex` | `direction`, `align`, `justify`, `gap`, `gapX`, `gapY`, `wrap` | Flexbox `<div>` |
| `Grid` | `columns`, `rows`, `flow`, `gap`, `gapX`, `gapY`, `align`, `justify` | CSS Grid `<div>` |
| `Section` | `display` | Semantic `<section>` |

**ScrollArea** — styled scrollable container. Built on `@radix-ui/react-scroll-area`.

| Prop | Values | Default |
|---|---|---|
| `type` | `'hover'`, `'auto'`, `'always'`, `'scroll'` | `'hover'` |
| `maxHeight` | CSS value | `'100%'` |
| `maxWidth` | CSS value | `'100%'` |
| `padding` | `'none'`\|`'tight'`\|`'compact'`\|`'comfortable'`\|`'spacious'` | `'compact'` |
| `scrollbarGutter` | `'auto'`\|`'stable'`\|`'stable-horizontal'`\|`'stable-vertical'` | `'auto'` |
| `showShadow` | boolean | — |

```tsx
<Flex direction="row" align="center" justify="space-between" gap={16}>
  <Text>Left</Text>
  <Button>Action</Button>
</Flex>
```

---

## Typography

| Component | Key props | Default |
|---|---|---|
| `Heading` | `as` (`'h1'`–`'h6'`, `'span'`, `'p'`), `size` (`'medium'`\|`'large'`\|`'x-large'`\|`'xx-large'`), `weight` (`'default'`\|`'strong'`), `color` | `as='span'`, `size='medium'` |
| `Text` | `as` (`'span'`, `'p'`, `'em'`, `'strong'`, `'a'`, `'abbr'`, `'address'`, `'label'`, `'li'`, `'time'`), `size` (`'x-small'`\|`'small'`\|`'medium'`\|`'large'`), `weight` (`'default'`\|`'strong'`\|`'x-strong'`), `color`, `boxColor` | `as='span'`, `size='medium'` |
| `Label` | `htmlFor` (required), `required`, `variant` (`'default'`\|`'strong'`) | — |

Color options for Heading/Text: `'default'`, `'weak'`, `'x-weak'`, `'disabled'`, `'negative'`, `'positive'`, `'warning'`, `'interactive'`.

Text `boxColor` options: `'neutral'`, `'selected'`, `'disabled'`, `'positive'`, `'negative'`, `'warning'`. Use for highlighted text backgrounds.

Label is built on `@radix-ui/react-label`. **Always pair Label with a form field using `htmlFor`.**

```tsx
<Label htmlFor="email" required>Email</Label>
<TextInput id="email" placeholder="you@example.com" />
```

---

## Actions

### Button

Pure HTML `<button>`. Uses `onPress` (not `onClick`).

| Prop | Values | Default | When to use |
|---|---|---|---|
| `variant` | `'default'`, `'positive'`, `'negative'`, `'danger'`, `'loud'` | `'default'` | `loud` = primary CTA, `positive` = confirm, `danger`/`negative` = destructive |
| `emphasis` | `'strong'`, `'default'`, `'weak'` | `'strong'` | `strong` = filled, `default` = outlined, `weak` = text-only |
| `size` | `'small'`, `'medium'`, `'large'` | `'medium'` | |
| `rounding` | `'medium'`, `'full'` | `'medium'` | `full` = pill-shaped |
| `aspect` | `'default'`, `'square'` | `'default'` | `square` for icon-only buttons |
| `hugWidth` | `boolean` | `true` | `false` to fill available width |

```tsx
import { IconPlus } from '@frontify/fondue-icons';

<Button variant="loud" onPress={() => handleCreate()}>
  <IconPlus size={16} /> Create New
</Button>
```

### SplitButton

Pure HTML. Composition: `SplitButton.Root > SplitButton.Content + SplitButton.Action > SplitButton.ActionButton`.

| Sub-component | Key props |
|---|---|
| `SplitButton.Root` | `emphasis`, `size`, `disabled` |
| `SplitButton.Content` | `onPress`, `type` |
| `SplitButton.Action` | `aria-label`, `rotateIcon` (default `true`) |
| `SplitButton.ActionButton` | `aria-label`, `type`, `disabled` |

### Link

Uses `RouterProvider` for client-side navigation.

| Prop | Values | Default |
|---|---|---|
| `href` | string (required) | — |
| `size` | `'xx-small'`\|`'x-small'`\|`'small'`\|`'medium'`\|`'large'`\|`'x-large'`\|`'xx-large'` | `'medium'` |
| `weight` | `'regular'`\|`'medium'`\|`'bold'` | `'regular'` |
| `color` | `'primary'`\|`'secondary'`\|`'error'`\|`'success'`\|`'warning'`\|`'highlight'` | `'primary'` |
| `underline` | `'auto'`\|`'always'`\|`'hover'`\|`'none'` | `'auto'` |
| `target` | string | `'_self'` |
| `disabled` | boolean | `false` |
| `truncate` | boolean | — |
| `wrap` | `'wrap'`\|`'nowrap'` | `'nowrap'` |
| `onContainer` | `'secondary'`\|`'disabled'`\|`'error'`\|`'success'`\|`'warning'`\|`'highlight'` | — |

---

## Form Controls

All form components support **controlled** (`value`) and **uncontrolled** (`defaultValue`) patterns.

### TextInput

Pure HTML `<input>`. Has `TextInput.Slot` for decorators. Also available as compound: `TextInput.Root > TextInput.Slot + input`.

| Prop | Values | Default |
|---|---|---|
| `type` | `'text'`, `'email'`, `'password'`, `'number'`, `'search'`, `'url'`, `'tel'`, `'date'`, `'time'`, `'hidden'` | `'text'` |
| `status` | `'neutral'`, `'success'`, `'error'`, `'loading'` | `'neutral'` |
| `required` | boolean | `false` |
| `readOnly` | boolean | `false` |
| `maxLength` | number | — |
| `autoComplete` | string | `'on'` |
| `spellCheck` | boolean | `true` |

```tsx
<TextInput placeholder="Search..." status="error">
  <TextInput.Slot name="left"><IconSearch size={16} /></TextInput.Slot>
</TextInput>
```

### Textarea

Pure HTML `<textarea>`. Has `Textarea.Slot` for decorators. Also available as compound: `Textarea.Root > Textarea.Slot + textarea`.

| Prop | Values | Default |
|---|---|---|
| `status` | `'default'`, `'loading'`, `'success'`, `'error'` | `'default'` |
| `autosize` | boolean | — |
| `clearable` | boolean | — |
| `minRows` | number | `1` |
| `maxRows` | number | — |
| `resizable` | boolean | — |
| `onEnterPressed` | callback | — |

### Checkbox

Built on `@radix-ui/react-checkbox`. Props: `value` (`boolean` | `'indeterminate'`), `size` (`'default'`\|`'large'`), `emphasis` (`'default'`\|`'weak'`), `status` (`'default'`\|`'error'`), `onChange`, `readOnly`, `required`.

### Switch

Built on `@radix-ui/react-switch`. Props: `value` (boolean), `defaultValue` (boolean), `onChange` (receives `boolean`), `size` (`'small'`\|`'medium'`\|`'large'`), `required`.

### Select

Built on Downshift + `@radix-ui/react-popover`. Four modes:
- `<Select>` — standard single dropdown (no typing)
- `<Select.Multiple>` — multi-select dropdown
- `<Select.Combobox>` — searchable/filterable single select
- `<Select.Combobox.Multiple>` — searchable/filterable multi-select

Sub-components: `Select.Item` (`value` required, `label` for display text), `Select.Group` (`heading`), `Select.Slot`.

| Prop | Values | Default |
|---|---|---|
| `status` | `'neutral'`, `'success'`, `'error'` | `'neutral'` |
| `placeholder` | string | `''` |
| `alignMenu` | `'start'`\|`'center'`\|`'end'` | `'start'` |
| `side` | `'left'`\|`'right'`\|`'bottom'`\|`'top'` | `'bottom'` |
| `showStringValue` | boolean | `true` |

For single selects: `value?: string | null`, `onSelect` receives a string. For multiple selects: `value?: string[] | null`, `onSelect` receives a string array. Combobox variants also accept `getAsyncItems` for async item fetching.

```tsx
<Select placeholder="Choose color..." onSelect={(val) => setColor(val)} aria-label="Color">
  <Select.Item value="red">Red</Select.Item>
  <Select.Item value="blue">Blue</Select.Item>
  <Select.Item value="green">Green</Select.Item>
</Select>
```

### Slider

Built on `@radix-ui/react-slider`. Props: `value` (number array — use `[n]` for single, `[min, max]` for range), `min`, `max`, `step`, `minStepsBetweenThumbs`, `onChange`, `onCommit`.

### RadioList

Built on `@radix-ui/react-radio-group`. Composition: `RadioList.Root > RadioList.RadioButton`. **Pair each RadioButton with a `<Label>`.**

| Prop (Root) | Values | Default |
|---|---|---|
| `emphasis` | `'default'`\|`'highlight'` | `'default'` |
| `orientation` | `'vertical'`\|`'horizontal'` | — |
| `readOnly` | boolean | — |
| `required` | boolean | — |

```tsx
<RadioList.Root value={selected} onValueChange={setSelected} orientation="vertical">
  <Flex align="center" gap={8}>
    <RadioList.RadioButton id="opt1" value="option1" />
    <Label htmlFor="opt1">Option 1</Label>
  </Flex>
  <Flex align="center" gap={8}>
    <RadioList.RadioButton id="opt2" value="option2" />
    <Label htmlFor="opt2">Option 2</Label>
  </Flex>
</RadioList.Root>
```

### ColorPicker

Composition: `ColorPicker.Root > ColorPicker.Gradient + ColorPicker.Values + ColorPicker.Input`. Props on Root: `currentColor` (RGBA object), `onColorChange`, `currentFormat`/`defaultFormat` (`'HEX'`\|`'RGB'`\|`'HSL'`).

---

## Navigation

### Tabs

Built on `@radix-ui/react-tabs`. Composition: `Tabs.Root > Tabs.Tab > [Tabs.Trigger + Tabs.Content]`.

| Prop (Root) | Values | Default |
|---|---|---|
| `defaultActiveTab` / `activeTab` | string | — |
| `size` | `'medium'`, `'large'` | `'medium'` |
| `variant` | `'default'`, `'pill'` | `'default'` |
| `padding` | `'none'`\|`'tight'`\|`'compact'`\|`'comfortable'`\|`'spacious'` | `'compact'` |
| `onActiveTabChange` | callback | — |

```tsx
<Tabs.Root defaultActiveTab="general" size="medium">
  <Tabs.Tab value="general">
    <Tabs.Trigger>General</Tabs.Trigger>
    <Tabs.Content>General settings here</Tabs.Content>
  </Tabs.Tab>
  <Tabs.Tab value="advanced">
    <Tabs.Trigger>Advanced</Tabs.Trigger>
    <Tabs.Content>Advanced settings here</Tabs.Content>
  </Tabs.Tab>
</Tabs.Root>
```

### SegmentedControl

Built on `@radix-ui/react-toggle-group`. For 2–4 mutually exclusive inline options. Composition: `SegmentedControl.Root > SegmentedControl.Item`.

Props on Root: `value`/`defaultValue`, `onValueChange`, `hugWidth` (default `true`), `disabled`.

### Accordion

Built on `@radix-ui/react-accordion` (always `type="multiple"` — multiple sections can be open). Composition: `Accordion.Root > Accordion.Item > [Accordion.Header + Accordion.Content]`. Optional: `Accordion.Slot` for action buttons in header.

| Prop (Root) | Values | Default |
|---|---|---|
| `value`/`defaultValue` | string arrays | — |
| `onValueChange` | callback | — |
| `border` | boolean | `true` |
| `padding` | `'none'`\|`'small'`\|`'medium'`\|`'large'` | `'large'` |
| `disabled` | boolean | `false` |

Content also accepts `padding` (`'none'`\|`'small'`\|`'medium'`\|`'large'`, default `'large'`) and `divider` (boolean).

---

## Feedback

### Notice

Alert banner. Props: `variant` (`'default'`\|`'highlight'`\|`'positive'`\|`'danger'`\|`'warning'`), `emphasis` (`'default'`\|`'strong'`\|`'weak'`), `size` (`'medium'`\|`'large'`), `icon` (ReactNode), `action` (ReactNode), `onDismiss`.

### Badge

Inline status pill. Props: `variant` (`'default'`\|`'positive'`\|`'highlight'`\|`'warning'`\|`'negative'`), `emphasis` (`'strong'`\|`'weak'`), `size` (`'default'`\|`'small'`), `status` (colored dot: `'positive'`\|`'warning'`\|`'negative'`\|etc.), `onClick`, `onDismiss`, `disabled`.

### Tag

Removable keyword/chip. Props: `variant` (`'default'`\|`'highlight'`), `emphasis` (`'strong'`\|`'weak'`), `size` (`'default'`\|`'small'`), `onClick`, `onDismiss`, `onAddClick`, `disabled`. Sub-components: `Tag.HoverContent`, `Tag.SecondaryContent`.

### LoadingCircle

Spinner. Props: `size` (`'xx-small'`–`'large'`), `variant` (`'progress'`\|`'success'`\|`'danger'`).

### LoadingBar

Built on `@radix-ui/react-progress`. Progress bar. Props: `value` (number or `null` for indeterminate), `max`, `variant` (`'default'`\|`'positive'`\|`'negative'`), `size` (`'small'`\|`'medium'`\|`'large'`\|`'x-large'`), `rounded` (default `true`). **Requires `aria-label` or `aria-labelledby`.**

### Tooltip

Built on `@radix-ui/react-tooltip`. Composition: `Tooltip.Root > [Tooltip.Trigger + Tooltip.Content]`.

```tsx
<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button aspect="square" emphasis="weak"><IconInfo size={16} /></Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="top">Helpful explanation</Tooltip.Content>
</Tooltip.Root>
```

Props on Root: `enterDelay` (ms, default 700). Props on Content: `side`, `padding` (`'spacious'`\|`'compact'`), `maxWidth`.

---

## Overlays

### Dialog

Built on `@radix-ui/react-dialog`. Composition:
```
Dialog.Root > [Dialog.Trigger + Dialog.Content > [Dialog.Header + Dialog.Body + Dialog.Footer]]
```
Additional: `Dialog.Title` (for accessible title), `Dialog.Description`, `Dialog.Close` (wraps a close button), `Dialog.SideContent`.

| Prop | On | Values | Default |
|---|---|---|---|
| `modal` | Root | boolean | `false` |
| `open` / `onOpenChange` | Root | — | — |
| `showUnderlay` | Content | boolean | `false` |
| `padding` | Content, Header, Body, Footer | `'none'`\|`'tight'`\|`'compact'`\|`'comfortable'`\|`'spacious'` | `'compact'` |
| `maxWidth` / `minWidth` | Content | CSS string | `'800px'` / `'400px'` |
| `minHeight` | Content | CSS string | `'200px'` |
| `verticalAlign` | Content | `'top'`\|`'center'` | `'center'` |
| `rounded` | Content | boolean | `true` |
| `showCloseButton` | Header | boolean | `true` |
| `showBorder` | Header, Footer | boolean | `true` |

```tsx
<Dialog.Root modal open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content showUnderlay>
    <Dialog.Header>
      <Dialog.Title><Heading size="medium">Confirm</Heading></Dialog.Title>
    </Dialog.Header>
    <Dialog.Body><Text>Are you sure?</Text></Dialog.Body>
    <Dialog.Footer>
      <Flex justify="flex-end" gap={8}>
        <Dialog.Close><Button emphasis="default">Cancel</Button></Dialog.Close>
        <Button variant="loud" onPress={handleConfirm}>Confirm</Button>
      </Flex>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

### Flyout

Built on `@radix-ui/react-popover`. Non-modal popover panel. Composition:
```
Flyout.Root > [Flyout.Trigger + Flyout.Content > [Flyout.Header + Flyout.Body + Flyout.Footer]]
```

| Prop | On | Values | Default |
|---|---|---|---|
| `side` | Content | `'top'`\|`'right'`\|`'bottom'`\|`'left'` | `'bottom'` |
| `align` | Content | `'start'`\|`'center'`\|`'end'` | `'start'` |
| `maxWidth` | Content | CSS string | `'360px'` |
| `width` | Content | CSS string | `'fit-content'` |
| `padding` | Content | `'none'`\|`'tight'`\|`'compact'`\|`'comfortable'`\|`'spacious'` | `'compact'` |
| `shadow` | Content | `'none'`\|`'medium'`\|`'large'` | `'medium'` |
| `rounded` | Content | `'none'`\|`'medium'`\|`'large'` | `'medium'` |
| `showCloseButton` | Header | boolean | `false` |
| `scrollable` | Body | boolean | `false` |

### Dropdown

Built on `@radix-ui/react-dropdown-menu`. Action menu. Composition:
```
Dropdown.Root > [Dropdown.Trigger + Dropdown.Content > Dropdown.Item]
```
Additional: `Dropdown.Group` (`heading`), `Dropdown.Slot` (`name='left'`\|`'right'`), `Dropdown.SubMenu` + `Dropdown.SubTrigger` + `Dropdown.SubContent` for nested menus.

Key props on Item: `onSelect`, `emphasis` (`'default'`\|`'danger'`), `disabled`.

---

## Data Display

### Table

Pure HTML `<table>`. Composition:
```
Table.Root > [Table.Header > Table.Row > Table.HeaderCell] + [Table.Body > Table.Row > Table.RowCell]
```
Optional: `Table.Caption`.

| Prop | On | Values | Default |
|---|---|---|---|
| `layout` | Root | `'auto'`\|`'fixed'` | `'auto'` |
| `fontSize` | Root | `'small'`\|`'medium'` | `'medium'` |
| `gutter` | Root | CSS length (e.g. `'16px'`) | `'0px'` |
| `noBorder` | Root | boolean | `false` |
| `sticky` | Header | boolean | `false` |
| `firstColumnSticky` / `lastColumnSticky` | Body | boolean | `false` |
| `sortDirection` | HeaderCell | `'ascending'`\|`'descending'`\|`undefined` | — |
| `onSortChange` | HeaderCell | callback | — |
| `align` | HeaderCell, RowCell | `'left'`\|`'center'`\|`'right'` | `'left'` |
| `truncate` | HeaderCell, RowCell | boolean | `false` |
| `selected` / `onClick` | Row | boolean / callback | — |
| `disabled` | Row | boolean | `false` |

### Divider

Built on `@radix-ui/react-separator`. Props: `variant` (`'solid'`\|`'dashed'`\|`'noline'`), `direction` (`'horizontal'`\|`'vertical'`), `color` (`'weak'`\|`'default'`\|`'strong'`), `padding` (`'none'`\|`'small'`\|`'medium'`\|`'large'`), `as` (`'div'`\|`'li'`).

---

## Common Patterns

### Form Field with Validation
```tsx
<Flex direction="column" gap={4}>
  <Label htmlFor="email" required>Email</Label>
  <TextInput
    id="email"
    status={error ? 'error' : 'neutral'}
    placeholder="you@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-describedby={error ? 'email-error' : undefined}
  />
  {error && <Text size="small" color="negative" id="email-error">{error}</Text>}
</Flex>
```

### Confirmation Dialog
```tsx
<Dialog.Root modal open={showConfirm} onOpenChange={setShowConfirm}>
  <Dialog.Content showUnderlay minWidth="400px" maxWidth="500px">
    <Dialog.Header>
      <Dialog.Title><Heading size="medium">Delete item?</Heading></Dialog.Title>
    </Dialog.Header>
    <Dialog.Body>
      <Text>This action cannot be undone.</Text>
    </Dialog.Body>
    <Dialog.Footer>
      <Flex justify="flex-end" gap={8}>
        <Dialog.Close><Button emphasis="default">Cancel</Button></Dialog.Close>
        <Button variant="danger" onPress={handleDelete}>Delete</Button>
      </Flex>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

### Action Menu
```tsx
<Dropdown.Root>
  <Dropdown.Trigger>
    <Button emphasis="default" aspect="square"><IconDotsHorizontal size={16} /></Button>
  </Dropdown.Trigger>
  <Dropdown.Content align="end">
    <Dropdown.Item onSelect={handleEdit}>
      <Dropdown.Slot name="left"><IconPen size={16} /></Dropdown.Slot>
      Edit
    </Dropdown.Item>
    <Dropdown.Item emphasis="danger" onSelect={handleDelete}>
      <Dropdown.Slot name="left"><IconTrash size={16} /></Dropdown.Slot>
      Delete
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
```
