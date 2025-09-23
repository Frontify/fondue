# Migration guide

This document describes the changes that you need to make to your code to migrate from the old components to the v12 components.

## Table of contents

- [Migration guide](#migration-guide)
    - [Table of contents](#table-of-contents)
    - [Components](#components)
        - [Accordion](#accordion)
            - [Old](#accordion-old)
            - [New](#accordion-new)
        - [Button](#button)
            - [Old](#button-old)
            - [New](#button-new)
        - [Checkbox (replaces `Checkbox` and `Checklist`)](#checkbox)
            - [Old](#checkbox-old)
            - [New](#checkbox-new)
        - [Color Picker](#color-picker)
            - [Old](#color-picker-old)
            - [New](#color-picker-new)
        - [Dialog](#dialog)
            - [Old](#dialog-old)
            - [New](#dialog-new)
        - [Dropdown (replaces `Dropdown`, `Menu` and `ActionMenu`)](#dropdown-replaces-dropdown-menu-and-actionmenu)
            - [Old](#dropdown-old)
            - [New](#dropdown-new)
        - [Flyout (old `InlineDialog`)](#flyout-old-inlinedialog)
            - [Old](#flyout-old)
            - [New](#flyout-new)
        - [Label (old `InputLabel`)](#label-old-inputlabel)
            - [Old](#label-old)
            - [New](#label-new)
        - [Layout Components](#layout-components)
            - [Old](#layout-old)
            - [New](#layout-new)
        - [Loading Bar](#loading-bar)
            - [Old](#loading-bar-old)
            - [New](#loading-bar-new)
        - [Loading Circle](#loading-circle)
            - [Old](#loading-circle-old)
            - [New](#loading-circle-new)
        - [RadioList](#radiolist)
            - [Old](#radiolist-old)
            - [New](#radiolist-new)
        - [Scroll Wrapper](#scroll-wrapper)
            - [Old](#scroll-wrapper-old)
            - [New](#scroll-wrapper-new)
        - [Segmented Control](#segmented-control)
            - [Old](#segmented-control-old)
            - [New](#segmented-control-new)
        - [Select](#select)
            - [Old](#select-old)
            - [New](#select-new)
        - [Slider](#slider)
            - [Old](#slider-old)
            - [New](#slider-new)
        - [Switch](#switch)
            - [Old](#switch-old)
            - [New](#switch-new)
        - [Table](#table)
            - [Old](#table-old)
            - [New](#table-new)
        - [Text Input](#text-input)
            - [Old](#text-input-old)
            - [New](#text-input-new)
        - [Tooltip](#tooltip)
            - [Old](#tooltip-old)
            - [New](#tooltip-new)

## Components

### Accordion

#### Changes:

- **Component structure** now uses explicit subcomponents:
    - `Accordion.Root` wraps all accordion items and controls state
    - `Accordion.Item` for each collapsible section (requires unique `value`)
    - `Accordion.Header` for header container
    - `Accordion.Content` for collapsible content section

- **State management** changed:
    - Use `defaultValue`/`value` on `Accordion.Root` for uncontrolled/controlled state

- **Styling changes**:
    - `border` prop now only on `Accordion.Root`
    - `divider` prop moved to `Accordion.Content`
    - `padding` prop now on `Accordion.Content`
    - Icon handling moved to `Accordion.Header`

- **Removed features**:
    - `headerComponent` prop (use `Accordion.Header` composition instead)
    - Custom focus management (handled by Radix)
    - Automatic last-item activation logic

#### Old

```tsx
<Accordion border divider>
    <AccordionItem header={{ children: 'Header 1', active: true }} padding={false}>
        Content 1
    </AccordionItem>
    <AccordionItem header={{ children: 'Header 2' }}>Content 2</AccordionItem>
</Accordion>
```

#### New

```tsx
<Accordion.Root border defaultValue={['item1']}>
    <Accordion.Item value="item1">
        <Accordion.Header>Header 1</Accordion.Header>
        <Accordion.Content padding="none" divider>
            Content 1
        </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item2">
        Header 2<Accordion.Content divider>Content 2</Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
```

#### Upgrade Steps:

1. Wrap entire accordion in `Accordion.Root`
2. Convert each item to `Accordion.Item` with unique `value`
3. Move header content to `Accordion.Header`
4. Convert body content to `Accordion.Content`

### Button

Changes:

- The props `size`, `style`, `type`, `rounding` now use a union type instead of an enum.
- The `icon` prop was removed and the Icon is now passed in as a child of the button.
- The `onClick` prop was renamed to `onPress`.
- The `hideLabel` prop was removed and the label should now be passed in conditionally as a child of the button.
- The `aspect` prop was added to be able to make the button square, when only an icon is shown.

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

- The `state` property has been removed and replaced by `value` (`boolean | 'indeterminate'`).
- The `label` property has been replaced by the `Label` component as a sibling of the `Checkbox`.
    - `hideLabel` have been removed as Label is now a sibling component.
- The `onChange` function signature has changed to expose the full event instead of the value.
- The properties `value` and `groupInputProps` have been removed without replacement.
- The property `ariaLabel` has been renamed to `aria-label`.
- The size `CheckboxSize.XLarge` has been removed without replacement.

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

```tsx
<ChecklistComponent direction={ChecklistDirection.Horizontal} checkboxes={[]} activeValues={[]} setActiveValues={[]} />
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

```tsx
<Flex gap="1rem" direction="column">
    <Flex gap="4px" direction="row">
        <Checkbox {...args} id="checkbox1" aria-labelledby="label" value={true} onChange={() => {}} />
        <Label id="label" htmlFor="checkbox1">
            Checkbox 1
        </Label>
    </Flex>
    <Flex gap="4px" direction="row">
        <Checkbox {...args} id="checkbox2" aria-labelledby="label" value={false} onChange={() => {}} />
        <Label id="label" htmlFor="checkbox2">
            Checkbox 2
        </Label>
    </Flex>
    <Flex gap="4px" direction="row">
        <Checkbox {...args} id="checkbox3" aria-labelledby="label" value="indeterminate" onChange={() => {}} />
        <Label id="label" htmlFor="checkbox3">
            Checkbox 3
        </Label>
    </Flex>
</Flex>
```

### Color Picker

Changes:

- The Color Picker does not Provide a Flyout, please use the `Flyout` component instead with composition.
- The Color Picker Input is now available as a separate component `ColorPicker.Input`.
- The Color Picker now uses Composition to display the Value Input and the Color Gradient.
    - You can pass `ColorPicker.Values` as a child to show the value input fields.
    - You can pass `ColorPicker.Gradient` as a child to show the color gradient input.
- The format is now handled internally. You can pass in the initial format with the prop `defaultFormat`.
- The brand color picker has been removed without replacement.

#### Old

```tsx
<ColorPicker
    currentColor={selectedColor}
    currentFormat={currentFormat}
    setFormat={setCurrentFormat}
    onSelect={(color) => {}}
/>
```

#### New

```tsx
const [currentColor, setCurrentColor] = useState({ red: 85, green: 102, blue: 255 });

<Flyout.Root>
    <Flyout.Trigger>
        <ColorPicker.Input currentColor={currentColor} onColorChange={setCurrentColor} />
    </Flyout.Trigger>
    <Flyout.Content>
        <ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
            <ColorPicker.Values />
            <ColorPicker.Gradient />
        </ColorPicker.Root>
    </Flyout.Content>
</Flyout.Root>

// or

<ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
    <ColorPicker.Values />
    <ColorPicker.Gradient />
</ColorPicker.Root>
```

### Dialog

Changes:

- The `Dialog` should not be rendered conditionally anymore. It should always be rendered and the open state should be controlled by the `open` prop.

- The `Dialog` component now controls its open state internally by default.
    - You can pass in a trigger component as a child of `Dialog.Trigger` to open the dialog.

    - You can wrap an element inside `Dialog.Close` for it to close the dialog.

    - The `handleClose` prop was replaced by `onOpenChange`. Together with the `open` prop it can be used to control the open state externally if needed.

- The `Dialog` now provides multiple subcomponents.
    - _required_ - The `Dialog.Root` wraps all other subcomponents and handles the dialog state and modality.
        - The `modality` prop was replaced by `modal` and is now a boolean.

    - _optional_ - The `Dialog.Trigger` is used to pass in a component to trigger the dialog.

    - _required_ - The `Dialog.Content` is the container appearing when the dialog is Visible. All dialog content needs to be wrapped inside of this element.
        - _optional_ - The `Dialog.Header` can be passed in as a child of `Dialog.Content` to add a styled header to the dialog
            - _optional_ The prop `showCloseButton` can be passed to add a close button to the header.

        - _optional_ - The `Dialog.Body` can be passed in as a child of `Dialog.Content` to add a styled body to the dialog.

        - _optional_ - The `Dialog.Footer` can be passed in as a child of `Dialog.Content` to add a styled footer to the dialog.

        - _optional_ - The `Dialog.SideContent` can be passed in as a child of `Dialog.Content` to add a space on the left side of the dialog. Custom components can then be passed in as as children of `Dialog.SideContent`

- Accessibility
    - _required_ - The `Dialog.Title` component is used to wrap the title of the dialog, it will be read by the screen reader. It can be placed anywhere inside of `Dialog.Content`.
        - The prop `asChild` can be passed to `Dialog.Title` to avoid wrapping the content in a `h2` tag, but directly use the child.

    - _optional_ - The `Dialog.Description` component is used to wrap the description of the dialog and will be read by the screen readers alongside the title. It can be placed anywhere inside of `Dialog.Content`.
        - The prop `asChild` can be passed to `Dialog.Description` to avoid wrapping the content in a `h2` tag, but directly use the child.

- The styling / layout is now controlled on the subcomponent `Dialog.Content`

- The `anchor` prop was removed and the subcomponents now accept refs

- The subcomponent `Dialog.Content` is used to display the dialog container.
  It provides no styling by default and can be used to wrap a custom content.
    - `roundedCorners` is now called `rounded` and is a boolean.

    - The `width`, `maxHeight` and `autoHeight` props were removed. The Dialog container adjusts to the content inside. You can use a custom component inside if necessary. you can use `minWidth`, `maxWidth` and `minHeight` to override the default values.

    - The `strategy` and `role` props were removed to simplify the API.

    - The `enablePortal` and `verticalAlignment` props were removed to standardize the dialog.

        The dialog now uses a portal by default and is placed centered

    - The prop `darkUnderlay` was replaced by `showUnderlay`.

#### Old

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
    <Button icon={<IconIcon/>} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        Dialog Trigger
    </Button>

    <Dialog anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
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
    <Dialog.Content>
        <Dialog.SideContent>
            <div className="tw-bg-success tw-h-full tw-w-full"></div>
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

### Dropdown (replaces `Dropdown`, `Menu` and `ActionMenu`)

Changes:

The `Dropdown` is no longer meant to be used a `Select` component so many features have been deprecated. See the [Select](#select) migration guide if you need a select box.

- Position is now set automatically wherever there is space.
- `Controlled` behavior supported (use `open` prop).
- `Dropdown.Trigger` requires a component with a `forwardRef` so that it can consume the node as an anchor for the position of the `Dropdown.Content`. Any new `Fondue` component will work.
- The `menuBlocks` prop has been replaced by a composable component structure, allowing for full control of the content of the `Dropdown.Content`.
- Rather than an `onChange` on the parent, we can now assign callbacks to each individual element on the `Dropdown`.
- Rather than adding `decorators`, we can fully control the look of each `Dropdown.Item` by using whatever component we like within.

#### Old

```tsx

<Dropdown menuBlocks={[
    {
        id: 'block1',
        ariaLabel: 'First section',
        menuItems: [
            {
                id: 1,
                title: 'Item default',
            },
            {
                id: 2,
                title: 'Item small',
                size: MenuItemContentSize.Small,
            },
            {
                id: 3,
                title: 'Item decorator',
                decorator: <IconMusicNote />,
            },
        ],
    },
    {
        id: 'block2',
        ariaLabel: 'Second section',
        menuItems: [
            {
                id: '9',
                title: 'Item disabled',
                disabled: true,
            },
            {
                id: '10',
                title: 'Item danger',
                style: MenuItemStyle.Danger,
            },
        ],
    },
]}>

/* or */

<Menu onClose={() => {}}>
    <MenuItem onClick={() => {}}>Item default</MenuItem>
    <MenuItem onClick={() => {}}>
        <span className="tw-text-sm">Item small</span>
    </MenuItem>
    <MenuItem onClick={() => {}}>
        <div style={{display: "flex", gap: 8}}>
            <IconIcon size={16} />
            <span> Item decorator </span>
        </div>
    </MenuItem>
    <hr />
    <MenuItem disabled>
        Item disabled
    </MenuItem>
    <MenuItem onClick={() => {}}>
        <span className="tw-bg-red-50">Item danger</span>
    </MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">
        Item link
    </MenuItem>
</Menu>
```

#### New

```tsx
<Dropdown.Root onOpenChange={() => {}} open={open}>
    <Dropdown.Trigger>
        <Button>Trigger</Button>
    </Dropdown.Trigger>
    <Dropdown.Content onOpen={() => {}}  onClose={() => {}}>
        <Dropdown.Item onSelect={() => {}}>Item default</Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
            <span className="tw-text-sm">Item small</span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
            <Dropdown.Slot name="left">
                <IconIcon size={16} />
            </Dropdown.Slot>
            Item decorator
        </Dropdown.Item>
        <hr />
        <Dropdown.Item disabled>
            Item disabled
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
            <span className="tw-bg-red-50">Item danger</span>
        </Dropdown.Item>
        <Dropdown.Item>
            <a href="https://www.frontify.com/" target="_blank">Item link</span>
        </Dropdown.Item>
    </Dropdown.Content>
</Dropdown.Root>
```

### Flyout (old `InlineDialog`)

Changes:

- The `Flyout` component now controls its open state internally by default.
    - You can pass in a trigger component as a child of `Flyout.Trigger` to control the open state.

    - The `open` and `onOpenChange` props can still be used to control the open state externally if needed.

- The `Flyout` now provides multiple subcomponents.
    - _required_ - The `Flyout.Root` wraps all other subcomponents and handles the flyout state and modality.

    - _required_ - The `Flyout.Trigger` is used to pass in a component to trigger the flyout.

    - _required_ - The `Flyout.Content` is the container appearing when the flyout is Visible
        - _optional_ - The `Flyout.Header` can be passed in as a child of `Flyout.Content` to add a styled header to the flyout.

        - _optional_ - The `Flyout.Body` can be passed in as a child of `Flyout.Content` to add a styled body to the flyout.

        - _optional_ - The `Flyout.Footer` can be passed in as a child of `Flyout.Footer` to add a styled footer to the flyout.

- The styling / layout is now controlled on the subcomponent `Flyout.Content`

- The subcomponent `Flyout.Content` is used to display the flyout container.
  It provides no styling by default and can be used to wrap a custom content.
    - `roundedCorners` is now called `rounded` and is a boolean.

    - The `width`, `minWidth`, `minHeight` and `maxHeight` props were removed. The Flyout container adjusts to the content inside. Use a custom component inside if necessary.

    - The `strategy`, `unsafe_Zindex` and `role` props were removed to simplify the API.

    - The `enablePortal` and `anchor` props were removed to standardize the flyout.

        The flyout now uses a portal by default and the anchor is the parent of the `Flyout.Trigger`.

    - The `placement` and `flip` props were removed and replaced by `side` and `alignment`.

        When the flyout content collides with the viewport, it is automatically flipped to the other side and / or slightly shifted to fit into the viewport.

    - The `padding` prop can be passed to define the padding used by all the layout components (`Flyout.Header`, `Flyout.Body` and `Flyout.Footer`) inside. It has no effect on the `Flyout.Content` or custom components passed as children.

- The subcomponents `Flyout.Header`, `Flyout.Body`, and `Flyout.Footer` can be used to add default styling to the content inside of `Flyout.Content`.
    - The prop `showCloseButton` was added to the `Flyout.Header` to add a close button to the header.

#### Old

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
    <Box className="tw-w-fit">
        <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)}>
            Trigger
        </Button>
        <InlineDialog anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
            <DialogBody padding="comfortable">
                <Box className="tw-text-primary">
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
        <Flyout.Body />
        <Flyout.Footer>
            <Button emphasis="default">Cancel</Button>
            <Button>Submit</Button>
        </Flyout.Footer>
    </Flyout.Content>
</Flyout.Root>
```

### Label (old `InputLabel`)

Changes:

- The component has been renamed from `InputLabel` to `Label`.
- The `clickable` and `bold` properties have been removed without replacement.
- The `tooltip` property has been removed and replaced by the `Tooltip` component which can be used as a `children`.

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

### Layout Components

Changes:

- All proprietaary properties were removed, the new Layout Components now accept CSSProperties as props
- The Style properties allow for responsive styling by passing an object with breakpoints as keys and CSSProperties as values
- `Stack` has been combined with `Flex`
- `Container` has been combined with `Box`

#### Old

```tsx
<FondueStack
    alignItems="start"
    as="div"
    bg=""
    color=""
    data-test-id="custom-test-id"
    direction="column"
    justify="start"
    margin={0}
    padding={12}
    spacing={8}
>
    <div />
    <div />
    <div />
</FondueStack>
```

#### New

```tsx
<Flex
    direction={{
        base: 'row',
        sm: 'column',
    }}
    alignItems="start"
    gap="20px"
>
    <div />
    <div />
    <div />
</Flex>
```

### Loading Bar

Changes:

- The property `percentage` has been renamed to `value`.
    - If the `value` is `null`, the loading bar will be in an indeterminate state.
    - A new property `max` has been introduced so the inner loading bar percentage can be calculated based on the `max` value.
- The property `state` has been renamed to `style`

#### Old

```tsx
<LoadingBar percentage={50} state={LoadingBarState.Success} rounded />
```

#### New

```tsx
<LoadingBar value={50} style="success" rounded />
```

### Loading Circle

Changes:

- The property `style` has been renamed to `variant`.
- App props now use a union type instead of an enum.

#### Old

```tsx
<LoadingCircle style={LoadingCircleStyle.Success} size={LoadingCircleSize.Large} />
```

#### New

```tsx
<LoadingCircle variant="success" size="large" />
```

### RadioList

Changes:

- The `RadioList` component now uses a composable structure with `RadioList.Root` and `RadioList.RadioButton`.
- The `direction` prop has been renamed to `orientation` and now takes `'horizontal'` or `'vertical'` instead of enum values.
- Radio buttons are now created individually using `RadioList.RadioButton` instead of being passed as children.
- Labels are now separate `Label` components that must be associated with each radio button via `htmlFor` prop.
- The `defaultValue` prop is now called `value` for controlled usage, or `defaultValue` for uncontrolled.
- Individual radio button styling is now handled through component composition.

#### Old {#radiolist-old}

```tsx
<RadioList direction={RadioListDirection.Vertical} defaultValue="option1" onChange={handleChange}>
    <RadioButton value="option1" />
    <RadioButton value="option2" />
    <RadioButton value="option3" />
</RadioList>
```

#### New {#radiolist-new}

```tsx
<RadioList.Root orientation="vertical" defaultValue="option1" onValueChange={handleChange}>
    <RadioList.RadioButton id="option1" value="option1" />
    <Label htmlFor="option1">Option 1</Label>
    
    <RadioList.RadioButton id="option2" value="option2" />
    <Label htmlFor="option2">Option 2</Label>
    
    <RadioList.RadioButton id="option3" value="option3" />
    <Label htmlFor="option3">Option 3</Label>
</RadioList.Root>
```

### Scroll Area

Changes:

- The properties `direction` and `tabIndex` have been removed
- The property `scrollShadow`has been renamed to `showShadow` and is now `false` by default
- The properties `maxHeight`and `maxWidth`have been added
- The property `type` has been added.

#### Old

```tsx
<ScrollWrapper direction={ScrollWrapperDirection.Vertical}>
    <p className="tw-w-[200px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur
        ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur.
    </p>
</ScrollWrapper>
```

#### New

```tsx
<ScrollArea showShadow>
    <p className="tw-w-[200px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur
        ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur.
    </p>
</ScrollArea>
```

### Segmented Control

Changes:

- The component has been renamed from `SegmentedControls` to its singular form `SegmentedControl`.
- The `SegmentedControl` component now has a `Root` and `Item` component to separate the control from its items.
- `items` array has been removed and replaced by `children` to follow the composition pattern.
    - `children` can have any kind of content (icons, text, etc.) and will be rendered as the content of the item.
- `activeItemId` has been replaced by `value`.
- `onChange` has been replaced by `onValueChange`.
- `disabled` has been removed from individual items and moved to the `Root` component.
    - If you need to disable per item, you will need to conditionally render the item.

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

### Select

Changes:

- This component replaces the old `Dropdown` component.
- `menuItems` array has been removed and replaced by `children` to follow the composition pattern.
    - `children` can have any kind of content (icons, text, etc.) and will be rendered as the content of the item.
- `activeItemId` has been replaced by `value`.
- `onChange` has been replaced by `onSelect`.
- `disabled` has been removed from individual items and moved to the `Root` component.
    - If you need to disable per item, you will need to conditionally render the item.

#### Old

```tsx
const [active, setActive] = useState(args.activeItemId);
useEffect(() => setActive(args.activeItemId), [args.activeItemId]);
return (
    <Dropdown activeItemId={active} onChange={(id) => setActive(id)} menuBlocks={[
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: 1,
                    title: 'Simple',
                },
                {
                    id: 2,
                    title: 'Item with icon',
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: 3,
                    title: 'Item small',
                    size: MenuItemContentSize.Small,
                },
            ],
        },

    ]}>
)
```

#### New

```tsx
const [activeItem, setActiveItem] = useState('');

return(
    <Select
        onSelect={(selectedItem) => {
            setActiveItem(() => selectedItem);
        }}
        value={activeItem}
    >
        <Select.Slot name="left">
            <IconIcon size={16} />
        </Select.Slot>
        <Select.Slot name="right">
            <IconIcon size={16} />
        </Select.Slot>
        <Select.Slot name="menu">
            <Select.Item value="simple">Simple</Select.Item>
            <Select.Item value="item-with-icon">
                <div className="tw-flex tw-items-center tw-gap-4">
                    <IconMusicNote />
                    <span>Item with icon</span>
                </div>
            </Select.Item>
            <Select.Item value="small-item">
                <span class="tw-text-sm">Small item</span>
            </Select.Item>
        </Select.Slot>
    </Select>
)

// Or, for a simpler setup you don't have to use the slots:

<Select>
    <Select.Item value="item-1">Item 2</Select.Item>
    <Select.Item value="item-2">Item 2</Select.Item>
    <Select.Item value="item-3">Item 3</Select.Item>
</Select>

```

## Slider

Changes:

- **Controlled and Uncontrolled States**:
    - `value` (controlled) and `defaultValue` (uncontrolled) props are now arrays reflecting support for range sliders in the new component.
    - The `onChange` event now returns an array of numbers reflecting the new multi-thumb capabilities.

- **Event Handling**:
    - The new `onCommit` event is introduced for actions when user interaction ends, similar to an `onBlur`.
    - Error handling via `onError` as this component can no longer be in an error state. Use controlled mode to limit and alert the user.

- **Removed Properties**:
    - `stepMultiplier` is no longer needed.
    - `showMinMax` is no longer supported.
    - `showMinMax` is no longer supported.
    - Input no longer included by default.
    - Additional UI flourishes should be added outside the component as needed.

        ```tsx
        <Slider />
        <span className="tw-mr-3">
            {min}%-{max}%
        </span>
        ```

#### Old

```tsx
<Slider
    id="old-slider"
    label="Volume"
    value={50}
    min={0}
    max={100}
    showMinMax={true}
    step={5}
    stepMultiplier={10}
    valueSuffix="%"
    disabled={false}
    onError={(errorCode) => console.error('Error:', errorCode)}
    onChange={(value) => console.log('Value:', value.raw, value.withSuffix)}
    data-test-id="slider-test"
    aria-label="Adjust volume level"
/>
```

#### New

```tsx
const [volume, setVolume] = useState([0]);

const onSliderChange = (value: number[]) => {
    setVolume(value);
};

const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue >= 0 && newValue <= 100) {
        setVolume(value);
    }
};

return (
    <div style={{ display: 'flex', gap: 16 }}>
        <Label id="new-slider-label" htmlFor="new-slider">
            Volume
        </Label>

        <Slider
            id="new-slider"
            value={range}
            min={0}
            max={100}
            aria-labelledby="new-slider-label"
            onChange={onSliderChange}
        />

        <TextInput
            id="new-slider-input"
            value={value}
            type="number"
            aria-labelledby="new-slider-label"
            onChange={onInputChange}
        />
    </div>
```

## Switch

Changes:

- **States**:
    - `value` (controlled) and `defaultValue` (uncontrolled) replaces `mode`.
    - `indeterminate` state support has been dropped.
    - `required` is now available.
    - `name` is now available.

- **Accessibility**:
    - `aria-label` and `aria-labelledby` are both optional but one must be used.
    - `aria-describedby` has been added.

- **Event Handling**:
    - The `onChange` event now returns the latest state of the value rather than a `MouseEvent`.
    - `onBlur` and `onFocus` callbacks have been added.

- **Removed Properties**:
    - `label`, `labelStyle` and `tooltip` have been removed in favor of composition.
    - `hug` have been removed without replacement

#### Old

```tsx
<Switch
    id="old-switch"
    label="Dark mode"
    tooltip="Toggle dark mode"
    mode={true}
    size="medium"
    hug={true}
    disabled={false}
    onChange={(event) => console.log('Value:', event.target.value}
    aria-label="Adjust volume level"
    data-test-id="switch-test"
/>
```

#### New

```tsx
<Label id="dark-mode-label" htmlFor="new-switch">Dark mode</Label>
<Tooltip.Root enterDelay={200}>
    <Tooltip.Trigger>
        <IconQuestionMarkCircle />
    </Tooltip.Trigger>
    <Tooltip.Content side="top" padding="spacious">
        <p id="dark-mode-switch-description">Toggle dark mode.</p>
    </Tooltip.Content>
</Tooltip.Root>
<Switch
    id="new-switch"
    name="dark-mode-switch"
    defaultValue={true}
    size="medium"
    required={true}
    disabled={false}
    onChange={(value) => console.log('Value:', value)}
    onBlur={(event) => console.log('Event:', event)}
    onFocus={(event) => console.log('Event:', event)}
    aria-labelledby="dark-mode-label"
    aria-describedby="dark-mode-switch-description"
    data-test-id="switch-test"
/>
```

### Table

Changes:

- The Table component now uses a composable API with subcomponents instead of configuration objects and props
- Props like `columns` and `rows` have been removed in favor of direct JSX composition
- The `Table` component now provides multiple subcomponents:
    - `Table.Root`: The main wrapper component for the table
    - `Table.Header`: Container for the header section
    - `Table.HeaderCell`: Individual header cells with built-in callbacks for sorting
    - `Table.Body`: Container for the table body
    - `Table.Row`: Individual table rows with interactive capabilities
    - `Table.RowCell`: Individual table cells
- Sorting is now handled at the cell level rather than the table level
- Selection is now implemented through composition rather than through props
- Layout properties are now controlled via props on `Table.Root`
- Sorting, searching and filtering functionality removed in favor of external control
- New features:
    - Sticky header support via `sticky` prop on `Table.Header`
    - Sticky first column support via `stickyFirstColumn` prop on `Table.Body`
    - Direct support for interactive rows (clickable/links) via `onClick`/`href` props
    - Better control over cell alignment, dimentions and truncation
    - Keyboard navigation with arrow keys

#### Old

```tsx
const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
const [sortedRows, setSortedRows] = useState<Row[]>(rows);
const [filter, setFilter] = useState('');
const [roleFilter, setRoleFilter] = useState<string>('all');

const onSortChange = (key: string, direction?: SortDirection) => {
    const clonedRows = [...sortedRows];
    clonedRows.sort((a, b) => {
        const keyA = a.cells[key].sortId;
        const keyB = b.cells[key].sortId;

        if (direction === SortDirection.Descending) {
            return keyA < keyB ? -1 : 1;
        } else {
            return keyA < keyB ? 1 : -1;
        }
    });
    setSortedRows(clonedRows);
};

useEffect(() => {
    if (filter === '' && roleFilter === 'all') {
        setSortedRows(rows);
        return;
    }

    const filtered = rows.filter((row) => {
        const matchesSearch =
            filter === '' ||
            Object.values(row.cells).some((cell) => String(cell.sortId).toLowerCase().includes(filter.toLowerCase()));

        const matchesRole = roleFilter === 'all' || row.cells.role.sortId === roleFilter;

        return matchesSearch && matchesRole;
    });

    setSortedRows(filtered);
}, [filter, roleFilter]);

const columns: Column[] = [
    { name: 'User', key: 'user' },
    {
        name: 'Active Sessions',
        key: 'activeSessions',
        sortable: true,
        align: 'right',
    },
    { name: 'Last Active', key: 'lastActive' },
];

const rows: Row[] = [
    {
        key: 'row-1',
        cells: {
            user: {
                sortId: 'anna',
                value: (
                    <div className="tw-flex tw-items-center tw-gap-2">
                        <div>
                            <div className="tw-font-medium">Anna Smith</div>
                            <div className="tw-text-sm tw-text-gray-500">anna.smith@example.com</div>
                        </div>
                    </div>
                ),
            },
            activeSessions: {
                sortId: 108,
                value: <Badge>108</Badge>,
            },
            lastActive: {
                sortId: 12,
                value: '12 days ago',
            },
        },
    },
];

return (
    <Flex direction="column" gap="1rem">
        <Flex gap="1rem">
            <TextInput
                value={filter}
                onChange={(val) => setFilter(val)}
                placeholder="Search users..."
                decorator={<IconMagnifier />}
            />

            <Dropdown
                activeItemId={roleFilter}
                onChange={setRoleFilter}
                menuBlocks={[
                    {
                        id: 'roles',
                        menuItems: [
                            { id: 'all', title: 'All Roles' },
                            { id: 'admin', title: 'Admin' },
                            { id: 'user', title: 'User' },
                        ],
                    },
                ]}
            >
                <Button icon={<IconFunnel />}>Filter by role</Button>
            </Dropdown>
        </Flex>

        <Table
            columns={columns}
            rows={sortedRows}
            selectionMode={SelectionMode.MultiSelect}
            selectedRowIds={selectedRows}
            onSelectionChange={(ids) => setSelectedRows((ids as (string | number)[]) || [])}
            onSortChange={onSortChange}
        />
    </Flex>
);
```

#### New

```tsx
const [searchTerm, setSearchTerm] = useState('');

const [roleFilter, setRoleFilter] = useState('all');

const [sortField, setSortField] = useState<keyof User | null>(null);
const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>();

const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

const handleSelectAll = () => {
    if (selectedRows.size === users.length) {
        setSelectedRows(new Set());
    } else {
        setSelectedRows(new Set(users.map((user) => user.id)));
    }
};

const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
        newSelection.delete(id);
    } else {
        newSelection.add(id);
    }
    setSelectedRows(newSelection);
};

const processedData = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
        result = result.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }

    if (roleFilter !== 'all') {
        result = result.filter((user) => user.role === roleFilter);
    }

    if (sortField && sortDirection) {
        result.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    return result;
}, [users, searchTerm, roleFilter, sortField, sortDirection]);

const isAllSelected = selectedRows.size === processedData.length;
const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < processedData.length;

return (
    <Flex direction="column" gap="1rem">
        <Flex gap="1rem">
            <TextInput placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e)}>
                <TextInput.Slot name="left">
                    <IconMagnifier size="16" />
                </TextInput.Slot>
            </TextInput>

            <Dropdown.Root>
                <Dropdown.Trigger>
                    <Button emphasis="default">
                        <IconFunnel size="16" />
                        Filter by role
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onSelect={() => setRoleFilter('all')}>All Roles</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setRoleFilter('admin')}>Admin</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setRoleFilter('user')}>User</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
        </Flex>

        <Table.Root>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>
                        <Checkbox
                            value={isPartiallySelected ? 'indeterminate' : isAllSelected}
                            onChange={handleSelectAll}
                            aria-label="Select all users"
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortDirection={sortField === 'name' ? sortDirection : undefined}
                        onSortChange={(direction) => {
                            setSortField('name');
                            setSortDirection(direction);
                        }}
                    >
                        User
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortDirection={sortField === 'activeSessions' ? sortDirection : undefined}
                        onSortChange={(direction) => {
                            setSortField('activeSessions');
                            setSortDirection(direction);
                        }}
                        align="right"
                    >
                        Active Sessions
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortDirection={sortField === 'lastActive' ? sortDirection : undefined}
                        onSortChange={(direction) => {
                            setSortField('lastActive');
                            setSortDirection(direction);
                        }}
                    >
                        Last Active
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {processedData.map((user) => (
                    <Table.Row
                        key={user.id}
                        selected={selectedRows.has(user.id)}
                        onClick={() => console.log(`View details for ${user.name}`)}
                    >
                        <Table.RowCell>
                            <Checkbox
                                value={selectedRows.has(user.id)}
                                onChange={(event) => handleSelectRow(event, user.id)}
                                aria-label={`Select ${user.name}`}
                            />
                        </Table.RowCell>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell align="right">
                            <Badge>{user.activeSessions}</Badge>
                        </Table.RowCell>
                        <Table.RowCell>{user.lastActive}</Table.RowCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </Flex>
);
```

### Text Input

Changes:

- The `TextInput` component can be used in 2 fashions:
    - Simple input: `TextInput`
        ```tsx
        <TextInput value={value} onChange={setValue} />
        ```
    - Input with decorators / actions / ...: `TextInput.Root` and `TextInput.Slot` (see examples below)
- The properties `size` and `selectable` have been removed without replacement.
- The property `dotted` have been removed, `className` can be used to add custom border styles.
- The event `onEnterPressed` has been removed, use `onKeyDown` with a `event.key === 'Enter'` condition instead.
- The properties `decorator`, `clearable` / `onClear`, `copyable` and `extraActions` have been removed with the introduction of the `TextInput.Slot` component.
- The `type` property has been added to specify the type of the input. This replaces the `NumberInput` and `PasswordInput` component.
    - `TextInput.Slot` can be used to add decorators, actions, etc. to the input.

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

- Few properties have been renamed/type changed to match the React default props:
    - `autocomplete` (boolean) -> `autoComplete` (string like `current-password`, `new-password`, `one-time-code`, etc.)
    - `ariaLabel` -> `aria-label`
    - `readonly` -> `readOnly`
    - `spellcheck` -> `spellCheck`

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

- The props now use a union type instead of an enum.
- The `Tooltip` component now provides multiple subcomponents.
    - The `trigger` prop has been removed and the trigger is now passed in as a child of `Tooltip.Trigger`.
    - The `content` prop has been removed and the content is now passed in as a child of `Tooltip.Content`.
- The `placement` and `flip` props have been removed and replaced by `side`.

              When the tooltip content collides with the viewport, it is automatically flipped to the other side and / or slightly shifted to fit into the viewport.

- The `openOnMount` prop has been removed, the open state can be externally controlled with the `open` prop.
- The `enablePortal` prop has been removed, the tooltip now uses a portal by default.
- The `withArrow` prop has been removed, the arrow is now always shown.
- The `offset`, `zIndex`, `strategy`, `leaveDelay` and `maxHeight` props have been removed to simplify the API

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
