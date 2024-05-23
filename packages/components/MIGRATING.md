# Migration guide

This document describes the changes that you need to make to your code to migrate from the old components to the v12 components.

## Table of contents

-   [Migration guide](#migration-guide)
    -   [Table of contents](#table-of-contents)
    -   [Components](#components)
        -   [Checkbox](#checkbox)
            -   [Old](#old)
            -   [New](#new)
        -   [Label (old `InputLabel`)](#label-old-inputlabel)
            -   [Old](#old-1)
            -   [New](#new-1)
        -   [Segmented Control](#segmented-control)
            -   [Old](#old-2)
            -   [New](#new-2)
        -   [Text Input](#text-input)
            -   [Old](#old-3)
            -   [New](#new-3)
        -   [Flyout](#flyout)
            -   [Old](#old-4)
            -   [New](#new-4)

## Components

### Checkbox

Changes:

-   The `state` property has been removed and replaced by `value` (`boolean | 'indeterminate'`).
-   The `label` property has been replaced by the `Label` component as a sibling of the `Checkbox`.
    -   `hideLabel` have been removed as Label is now a sibling component.
-   The `onChange` function signature has changed to expose the full event instead of the value.
-   The properties `value` and `groupInputProps` have been removed without replacement.
-   The property `ariaLabel` has been renamed to `aria-label`.
-   The size `CheckboxSize.XLarge` has been removed without replacement.

#### Old

```tsx
<Checkbox
    state={CheckboxState.Mixed}
    label="My Checkbox"
    size={CheckboxSize.Large}
    onChange={setValue}
    tooltip={{ triggerIcon: <IconInfo />, content: 'Tooltip' }}
    value="a random value"
    ariaLabel="My Checkbox"
/>
```

#### New

```tsx
<Checkbox id="checkbox-id" size="large" value="indeterminate" onChange={() => {}} aria-label="My Checkbox">
<Label htmlFor="checkbox-id">
    My Checkbox
    <Tooltip.Root>
        <Tooltip.Trigger>
            <IconInfo />
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip</Tooltip.Content>
    </Tooltip.Root>
</Label>
```

### Flyout (old `InlineDialog`)

Changes:

-   The `Flyout` component now controls its open state internally by default.

    -   You can pass in a trigger component as a child of `Flyout.Trigger` to control the open state.

    -   The `open` and `onOpenChange` props can still be used to control the open state externally if needed.

-   The `Flyout` now provides multiple subcomponents.

    -   _required_ - The `Flyout.Root` all other subcomponents and handles the flyout state and modality.

    -   _required_ - The `Flyout.Trigger` is used to pass in a component to trigger the flyout.

    -   _required_ - The `Flyout.Content` is the container appearing when the flyout is Visible

        -   _optional_ - The `Flyout.Header` can be passed in as a child of `Flyout.Content` to add a styled header to the flyout.

        -   _optional_ - The `Flyout.Body` can be passed in as a child of `Flyout.Content` to add a styled body to the flyout.

        -   _optional_ - The `Flyout.Footer` can be passed in as a child of `Flyout.Footer` to add a styled footer to the flyout.

-   The styling / layout is now controlled on the subcomponent `Flyout.Container`

-   The subcomponent `Flyout.Content` is used to display the flyout container.
    It provides no styling by default and can be used to wrap a custom content.

    -   `roundedCorners` is now called `rounded` and is a boolean.

    -   The `width`, `minWidth`, `minHeight` and `maxHeight` props were removed. The Flyout container adjusts to the content inside. Use a custom component inside if neccessary.

    -   The `strategy`, `unsafe_Zindex` and `role` props were removed to simplify the API.

    -   The `enablePortal` and `anchor` props were removed to standardize the flyout.

        The flyout now uses a portal by default and the anchor is the parent of the `Flyout.Trigger`.

    -   The `placement` and `flip` props were removed and replaced by `side` and `alignment`.

        When the flyout content collides with the viewport, it is automatically flipped to the other side and / or slightly shifted to fit into the viewport.

    -   The `padding` prop can be passed to define the padding used by all the layout components (`Flyout.Header`, `Flyout.Body` and `Flyout.Footer`) inside. It has no effect on the `Flyout.Content` or custom components passed as children.

-   The subcomponents `Flyout.Header`, `Flyout.Body`, and `Flyout.Footer` can be used to add defaut styling to the content inside of `Flyout.Content`.

    -   The prop `showCloseButton` was added to the `Flyout.Header` to add a close button to the header.

#### Old

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
    <Box className="tw-w-fit">
        <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)}>
            Trigger
        </Button>
        <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
            <DialogBody padding="comfortable">
                <Box className="tw-text-text">
                    <TextExample />
                    <TextExample />
                    <TextExample />
                    <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                </Box>
            </DialogBody>
        </InlineDialog>
    </Box>
);
```

#### New

```tsx
<Flyout.Root>
    {/* Pass in a Trigger component */}
    <Flyout.Trigger>
        <Button>Click me</Button>
    </Flyout.Trigger>
    {/* Pass in the Flyout Content component */}
    <Flyout.Content side="right">
        {/* Use the layout subcomponents inside the content */}
        <Flyout.Header showCloseButton>Header</Flyout.Header>
        <Flyout.Body {...args} />
        <Flyout.Footer>
            <div className="tw-flex tw-justify-end tw-gap-2">
                <Button emphasis="default">Cancel</Button>
                <Button>Submit</Button>
            </div>
        </Flyout.Footer>
    </Flyout.Content>
</Flyout.Root>
```

### Label (old `InputLabel`)

Changes:

-   The component has been renamed from `InputLabel` to `Label`.
-   The `clickable` and `bold` properties have been removed without replacement.
-   The `tooltip` property has been removed and replaced by the `Tooltip` component which can be used as a `children`.

#### Old

```tsx
<InputLabel htmlFor="my-input" required tooltip={[{ triggerIcon: <IconInfo />, content: 'Tooltip' }]}>
    My Label
</InputLabel>
```

#### New

```tsx
<Label htmlFor="my-input" required>
    My Label
    <Tooltip.Root>
        <Tooltip.Trigger>
            <IconInfo />
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip</Tooltip.Content>
    </Tooltip.Root>
</Label>
```

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

### Text Input

Changes:

-   The `TextInput` component can be used in 2 fashions:
    -   Simple input: `TextInput`
        ```tsx
        <TextInput value={value} onChange={setValue} />
        ```
    -   Input with decorators / actions / ...: `TextInput.Root` and `TextInput.Slot` (see examples below)
-   The properties `size` and `selectable` have been removed without replacement.
-   The property `dotted` have been removed, `className` can be used to add custom border styles.
-   The event `onEnterPressed` has been removed, use `onKeyDown` with a `event.key === 'Enter'` condition instead.
-   The properties `decorator`, `clearable` / `onClear`, `copyable` and `extraActions` have been removed with the introduction of the `TextInput.Slot` component.

    -   `TextInput.Slot` can be used to add decorators, actions, etc. to the input.

        ```tsx
        <TextInput.Root>
            {/* The following replace `decorator` prop */}
            <TextInput.Slot name="left">
                <IconIcon />
            </TextInput.Slot>

            {/* The following replace `clearable`, `copyable` and `extraActions` props */}
            <TextInput.Slot name="right">
                <Button onPress={(event) => {}}>
                    <IconClear />
                </Button>

                <Button onPress={(event) => {}}>
                    <IconCopy />
                </Button>
            </TextInput.Slot>
        </TextInput.Root>
        ```

-   Few properties have been renamed/type changed to match the React default props:
    -   `autocomplete` (boolean) -> `autoComplete` (string like `current-password`, `new-password`, `one-time-code`, etc.)
    -   `ariaLabel` -> `aria-label`
    -   `readonly` -> `readOnly`
    -   `spellcheck` -> `spellCheck`

#### Old

```tsx
<TextInput
    value={value}
    onChange={setValue}
    onEnterPressed={handleEnter}
    decorator={<IconIcon />}
    clearable
    copyable
    dotted
    extraActions={[
        {
            icon: <IconIcon />,
            onClick: handleExtraAction,
            title: 'Extra action',
            tooltip: {
                content: TOOLTIP_CONTENT,
            },
        },
    ]}
/>
```

#### New

```tsx
<TextInput.Root value={value} onChange={setValue} onKeyDown={handleKeyDown} className="custom-border">
    <TextInput.Slot name="left">
        <IconIcon />
    </TextInput.Slot>

    <TextInput.Slot name="right">
        <Button onPress={handleClear}>
            <IconClear />
        </Button>

        <Button onPress={handleCopy}>
            <IconCopy />
        </Button>

        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button onPress={handleExtraAction} title="Extra action">
                    <IconIcon />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>{TOOLTIP_CONTENT}</Tooltip.Content>
        </Tooltip.Root>
    </TextInput.Slot>
</TextInput.Root>
```
