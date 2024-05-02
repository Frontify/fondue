# Migration guide

This document describes the changes that you need to make to your code to migrate from the old components to the v12 components.

## Table of contents

-   [Migration guide](#migration-guide)
    -   [Table of contents](#table-of-contents)
    -   [Components](#components)
        -   [Segmented Control](#segmented-control)
            -   [Old](#old)
            -   [New](#new)

## Components

### Segmented Control

Changes:

-   The component has been renamed from `SegmentedControls` to its singular form `SegmentedControl`.
-   The `SegmentedControl` component now has a `Root` and `Item` component to separate the control from its items.
-   `items` array has been removed and replaced by `children` to follow the composition pattern.
    -   `children` can have any kind of content (icons, text, etc.) and will be rendered as the content of the item.
-   `activeItemId` has been replaced by `value`.
-   `onChange` has been replaced by `onValueChange`.
-   `disabled` has been removed from individual items and moved to the `Root` component.
    -   If you need to disable per item, you will need to conditionally render the item.

#### Old

```tsx
<SegmentedControls
    activeItemId={value}
    items={[
        { id: 'item-1', label: 'Item 1', disabled: isItem1Disabled },
        { id: 'item-2', label: 'Item 2', icon: <IconIcon /> },
        { id: 'item-3', icon: <IconIcon />, ariaLabel: 'Item 3' },
    ]}
    onChange={setValue}
    disabled={disabled}
/>
```

#### New

```tsx
<SegmentedControl.Root defaultValue="item-1" value={value} onValueChange={setValue} disabled={disabled}>
    {isItem1Disabled ? <SegmentedControl.Item value="item-1">Item 1</SegmentedControl.Item> : null}

    <SegmentedControl.Item value="item-2">
        {/* Already has a default flex and gap, no need to wrap with a `div` */}
        <IconIcon />
        Item 2
    </SegmentedControl.Item>

    <SegmentedControl.Item value="item-3" aria-label="Item 3">
        <IconIcon />
    </SegmentedControl.Item>
</SegmentedControl.Root>
```
