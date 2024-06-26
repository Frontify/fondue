# Migration guide

This document describes the changes that you need to make to your code to migrate from the old components to the v12 components.

## Table of contents

-   [Migration guide](#migration-guide)
    -   [Table of contents](#table-of-contents)
    -   [Components](#components)
        -   [Button](#button)
            -   [Old](#old)
            -   [New](#new)
        -   [Checkbox](#checkbox)
            -   [Old](#old-1)
            -   [New](#new-1)
        -   [Dialog](#dialog)
            -   [Old](#old-2)
            -   [New](#new-2)
        -   [Flyout (old `InlineDialog`)](#flyout-old-inlinedialog)
            -   [Old](#old-3)
            -   [New](#new-3)
        -   [Label (old `InputLabel`)](#label-old-inputlabel)
            -   [Old](#old-4)
            -   [New](#new-4)
        -   [Loading Bar](#loading-bar)
            -   [Old](#old-5)
            -   [New](#new-5)
        -   [Segmented Control](#segmented-control)
            -   [Old](#old-6)
            -   [New](#new-6)
        -   [Text Input](#text-input)
            -   [Old](#old-7)
            -   [New](#new-7)
        -   [Tooltip](#tooltip)
            -   [Old](#old-8)
            -   [New](#new-8)

## Components

### Button

Changes:

-   The props `size`, `style`, `type`, `rounding` now use a union type instead of an enum.
-   The `icon` prop was removed and the Icon is now passed in as a child of the button.
-   The `onClick` prop was renamed to `onPress`.
-   The `hideLabel` prop was removed and the label should now be passed in conditionally as a child of the button.
-   The `aspect` prop was added to be able to make the button square, when only an icon is shown.

#### Old

```tsx
<Button
    hugWidth
    onClick={() => {}}
    icon={<Icon.ColorFan16 />}
    rounding={ButtonRounding.Medium}
    size={ButtonSize.Medium}
    style={ButtonStyle.Default}
    type={ButtonType.Button}
>
    Button Text
</Button>
```

#### New

```tsx
<Button
    aspect="default"
    emphasis="default"
    hugWidth
    onPress={function Qa() {}}
    rounding="medium"
    size="medium"
    style="default"
    type="button"
>
    <IconColorFan size={16} />
    Button Text
</Button>
```

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

### Dialog

Changes:

-   The `Dialog` should not be rendered conditionally anymore. It should always be rendered and the open state should be controlled by the `open` prop.

-   The `Dialog` component now controls its open state internally by default.

    -   You can pass in a trigger component as a child of `Dialog.Trigger` to open the dialog.

    -   You can wrap an element inside `Dialog.Close` for it to close the dialog.

    -   The `handleClose` prop was replaced by `onOpenChange`. Together with the `open` prop it can be used to control the open state externally if needed.

-   The `Dialog` now provides multiple subcomponents.

    -   _required_ - The `Dialog.Root` wraps all other subcomponents and handles the dialog state and modality.

        -   The `modality` prop was replaced by `modal` and is now a boolean.

    -   _optional_ - The `Dialog.Trigger` is used to pass in a component to trigger the dialog.

    -   _required_ - The `Dialog.Content` is the container appearing when the dialog is Visible. All dialog content needs to be wrapped inside of this element.

        -   _optional_ - The `Dialog.Header` can be passed in as a child of `Dialog.Content` to add a styled header to the dialog

            -   _optional_ The prop `showCloseButton` can be passed to add a close button to the header.

        -   _optional_ - The `Dialog.Body` can be passed in as a child of `Dialog.Content` to add a styled body to the dialog.

        -   _optional_ - The `Dialog.Footer` can be passed in as a child of `Dialog.Content` to add a styled footer to the dialog.

        -   _optional_ - The `Dialog.SideContent` can be passed in as a child of `Dialog.Content` to add a space on the left side of the dialog. Custom components can then be passed in as as children of `Dialog.SideContent`

-   Accessibility

    -   _required_ - The `Dialog.Title` component is used to wrap the title of the dialog, it will be read by the screen reader. It can be placed anywhere inside of `Dialog.Content`.

        -   The prop `asChild` can be passed to `Dialog.Title` to avoid wrapping the content in a `h2` tag, but directly use the child.

    -   _optional_ - The `Dialog.Description` component is used to wrap the description of the dialog and will be read by the screen readers alongside the title. It can be placed anywhere inside of `Dialog.Content`.

        -   The prop `asChild` can be passed to `Dialog.Description` to avoid wrapping the content in a `h2` tag, but directly use the child.

-   The styling / layout is now controlled on the subcomponent `Dialog.Content`

-   The `anchor` prop was removed and the subcomponents now accept refs

-   The subcomponent `Dialog.Content` is used to display the dialog container.
    It provides no styling by default and can be used to wrap a custom content.

    -   `roundedCorners` is now called `rounded` and is a boolean.

    -   The `width`, `maxHeight` and `autoHeight` props were removed. The Dialog container adjusts to the content inside. You can use a custom component inside if necessary. you can use `minWidth`, `maxWidth` and `minHeight` to override the default values.

    -   The `strategy` and `role` props were removed to simplify the API.

    -   The `enablePortal` and `verticalAlignment` props were removed to standardize the dialog.

        The dialog now uses a portal by default and is placed centered

    -   The prop `darkUnderlay` was replaced by `showUnderlay`.

#### Old

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
    <Button icon={<IconIcon/>} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        Dialog Trigger
    </Button>

    <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
        <DialogHeader>Header</DialogHeader>
        <DialogBody padding="spacious">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel.
                Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora
                temporibus voluptates?
            </p>
        </DialogBody>
        <DialogFooter
            actionButtons={[
                {
                    children: 'Close',
                    onClick: () => {},
                },
            ]}
        ></DialogFooter>
    </Dialog>
)
```

#### New

```tsx
<Dialog.Root>
    <Dialog.Trigger>
        <Button>
            <IconIcon />
            Dialog Trigger
        </Button>
    </Dialog.Trigger>
    <Dialog.Content {...args}>
        <Dialog.SideContent>
            <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
        </Dialog.SideContent>
        <Dialog.Header>Header</Dialog.Header>
        <Dialog.Body padding="spacious">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel.
            Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora
            temporibus voluptates?
        </Dialog.Body>
        <Dialog.Footer>
            <Button onPress={() => {}}>Close</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
```

### Flyout (old `InlineDialog`)

Changes:

-   The `Flyout` component now controls its open state internally by default.

    -   You can pass in a trigger component as a child of `Flyout.Trigger` to control the open state.

    -   The `open` and `onOpenChange` props can still be used to control the open state externally if needed.

-   The `Flyout` now provides multiple subcomponents.

    -   _required_ - The `Flyout.Root` wraps all other subcomponents and handles the flyout state and modality.

    -   _required_ - The `Flyout.Trigger` is used to pass in a component to trigger the flyout.

    -   _required_ - The `Flyout.Content` is the container appearing when the flyout is Visible

        -   _optional_ - The `Flyout.Header` can be passed in as a child of `Flyout.Content` to add a styled header to the flyout.

        -   _optional_ - The `Flyout.Body` can be passed in as a child of `Flyout.Content` to add a styled body to the flyout.

        -   _optional_ - The `Flyout.Footer` can be passed in as a child of `Flyout.Footer` to add a styled footer to the flyout.

-   The styling / layout is now controlled on the subcomponent `Flyout.Content`

-   The subcomponent `Flyout.Content` is used to display the flyout container.
    It provides no styling by default and can be used to wrap a custom content.

    -   `roundedCorners` is now called `rounded` and is a boolean.

    -   The `width`, `minWidth`, `minHeight` and `maxHeight` props were removed. The Flyout container adjusts to the content inside. Use a custom component inside if necessary.

    -   The `strategy`, `unsafe_Zindex` and `role` props were removed to simplify the API.

    -   The `enablePortal` and `anchor` props were removed to standardize the flyout.

        The flyout now uses a portal by default and the anchor is the parent of the `Flyout.Trigger`.

    -   The `placement` and `flip` props were removed and replaced by `side` and `alignment`.

        When the flyout content collides with the viewport, it is automatically flipped to the other side and / or slightly shifted to fit into the viewport.

    -   The `padding` prop can be passed to define the padding used by all the layout components (`Flyout.Header`, `Flyout.Body` and `Flyout.Footer`) inside. It has no effect on the `Flyout.Content` or custom components passed as children.

-   The subcomponents `Flyout.Header`, `Flyout.Body`, and `Flyout.Footer` can be used to add default styling to the content inside of `Flyout.Content`.

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
    <Flyout.Trigger>
        <Button>
            <IconIcon />
            Trigger
        </Button>
    </Flyout.Trigger>
    <Flyout.Content side="right">
        <Flyout.Header showCloseButton>Header</Flyout.Header>
        <Flyout.Body {...args} />
        <Flyout.Footer>
            <Button emphasis="default">Cancel</Button>
            <Button>Submit</Button>
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

### Loading Bar

Changes:

-   The property `percentage` has been renamed to `value`.
    -   If the `value` is `null`, the loading bar will be in an indeterminate state.
    -   A new property `max` has been introduced so the inner loading bar percentage can be calculated based on the `max` value.
-   The property `state` has been renamed to `style`

#### Old

```tsx
<LoadingBar percentage={50} state={LoadingBarState.Success} rounded />
```

#### New

```tsx
<LoadingBar value={50} style="success" rounded />
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

### Tooltip

Changes:

-   The props now use a union type instead of an enum.
-   The `Tooltip` component now provides multiple subcomponents.
    -   The `trigger` prop has been removed and the trigger is now passed in as a child of `Tooltip.Trigger`.
    -   The `content` prop has been removed and the content is now passed in as a child of `Tooltip.Content`.
-   The `placement` and `flip` props have been removed and replaced by `side`.

        When the tooltip content collides with the viewport, it is automatically flipped to the other side and / or slightly shifted to fit into the viewport.

-   The `openOnMount` prop has been removed, the open state can be externally controlled with the `open` prop.
-   The `enablePortal` prop has been removed, the tooltip now uses a portal by default.
-   The `withArrow` prop has been removed, the arrow is now always shown.
-   The `offset`, `zIndex`, `strategy`, `leaveDelay` and `maxHeight` props have been removed to simplify the API

#### Old

```tsx
<Tooltip
    content="Your text here"
    enablePortal
    enterDelay={200}
    flip
    leaveDelay={0}
    maxHeight="auto"
    maxWidth={200}
    offset={[0, 8]}
    placement="bottom-center"
    size="spacious"
    withArrow
>
    <Button>Hover over me!</Button>
</Tooltip>
```

#### New

```tsx
<Tooltip.Root enterDelay={200}>
    <Tooltip.Trigger>
        <Button>Hover over me!</Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="bottom" padding="spacious">
        Your text here
    </Tooltip.Content>
</Tooltip.Root>
```
