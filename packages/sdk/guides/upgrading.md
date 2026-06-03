# Upgrading to Fondue v13

## Introduction

Fondue v13 introduces big changes in the way fondue is structured and how it is consumed.

### Package structure
```
@frontify/fondue
 |
 ├── /components
 |   Contains the react components
 |
 ├── /icons
 |   Contains the icons
 |
 ├── /charts
 |   Contains the charts
 |
 ├── /rte
 |   Contains the rich text editor
 |
 └── /tokens
     Contains the style tokens
```

## Breaking changes

### Tokens

The token system has been completely overhauled.

The updated structure features a reduced number of tokens and a more consistent naming convention.
Stroybook stories are now grouped by category and to make it easier to find the right token.

Explore the new token system in the [token story](https://fondue-components.frontify.com/?path=/story/tokens_tokens--colors).

You can use the [migrate-tokens](#migrate-tokens) codemod to migrate your css variables and tailwind classes to the new token system.

- For properties that have tokens defined, we do no longer include the tailwind default theme tokens along with the fondue tokens.
- The class prefix is no longer defined by fondue, you need to set it yourself in your tailwind config file.


#### Required changes


Import the base tokens and default theme at the root of your application.

```jsx
import "@frontify/fondue/tokens/base";

export const App = () => {
    return (
        <div>
            {/* Your application */}
        </div>
    );
};
```

Update the preset import and set your desired prefix in your `tailwind.config.js` file.

```js
- import frontifyTailwindConfig from '@frontify/fondue/tailwind';
+ import frontifyTailwindConfig from '@frontify/fondue/tokens/tailwind';

const config = {
+   prefix: 'tw-',
    presets: [frontifyTailwindConfig]
}

export default config;
```

If you are using tokens from the tailwind default theme, you need to add them into your `tailwind.config.js` file, as fondue v13 does not include them anymore.


### Rich Text Editor

The rich text editor has been moved to its own sub-package.
To use the rich text editor, you need to import it from the `@frontify/fondue/rte` package.

#### Required changes

Update your richt text editor imports import from the `@frontify/fondue/rte` package.

```jsx
- import { ... } from '@frontify/fondue';
+ import { ... } from '@frontify/fondue/rte';
```

### Icons

In V13, icons are only available in the `@frontify/fondue/icons` package. Exports of icons in the `@frontify/fondue` package have been removed.

- Icons with a `filled` variant are now exported as two separate icons, one with the `filled` variant and one without.
- The `size` is now set as a prop on the icon component.

#### Required changes

Update your icon imports import from the `@frontify/fondue/icons` package.


```jsx
- import { SampleIcon16 } from '@frontify/fondue';
+ import { SampleIconFilled } from '@frontify/fondue/icons';

- <SampleIcon16 size={16} filled />
+ <SampleIconFilled size={16} />

```

### Legacy components and utilities

Most of the legacy components and utilities have been removed from fondue. See [Breaking changes](#breaking-changes) for more details.

A small number of legacy components which have not yet been refactored are still available `@frontify/fondue`.
These will be removed in a future version. We recommend to migrate to the new components as soon as possible.


#### Removed components
```
- AddBlockButton
- Box
- Button
- ButtonGroup
- Card
- Checkbox
- Checklist
- Code
- ColorInputFlyout
- ColorPicker
- Container
- Dialog
- DialogBody
- DialogFooter
- DialogHeader
- Divider
- DropZone
- Dropdown
- FieldsetHeader
- Flex
- FormField
- Grid
- InlineDialog
- LegacyOrderableList
- LegacyTooltip
- LoadingBar
- LoadingCircle
- Menu
- Modal
- MultiInput
- NumberInput
- OverflowMenu
- Popover
- Popper
- Portal
- RadioPill
- ScrollWrapper
- SegmentedControls
- Slider
- Stack
- Switch
- Tag
- TextInput
- Tooltip
- TooltipIcon
- Trigger
- LegacyStack
- [All Icon components]
```

#### Removed utilities & constants
```
- COMMON_INSET_BORDER
- INSET_BORDER
- INSET_BORDER
- getColorDisplayValue
- isColorLight
- toShortRgb
- toLongRgb
- compose
- debounce
- moveItems
- DraggableItem
- ItemElementType
- getItemElementType
- checkIfContainInteractiveElements
- FOCUS_STYLE
- FOCUS_STYLE_NO_OFFSET
- PARENT_FOCUS_VISIBLE_STYLE
- FOCUS_STYLE_INSET
- generateRandomId
- mergeRefs
- clamp
- validationClassMap
- validationTextClassMap
- SPACING_VALUES
- PADDING_VALUES_MAP
- PADDING_X_VALUES_MAP
- PADDING_Y_VALUES_MAP
- PADDING_DIRECTIONS
- MARGIN_VALUES_MAP
- MARGIN_X_VALUES_MAP
- MARGIN_Y_VALUES_MAP
- MARGIN_DIRECTIONS
- GAP_MAPPING
- GAP_X_MAPPING
- GAP_Y_MAPPING
- GAP_DIRECTIONS
- GetPaddingClassNames
- GetMarginClassNames
- GetGapClassName
- BOX_BG_ALIAS_TOKENS_CLASSES
- BOX_TEXT_ALIAS_TOKENS_CLASSES
- InputStyles
- HelperText
- GetStatusIcon
- InputActions
- InputExtraActions
- GetInputStatusIcon
- ColorRgb
- ColorFormat
- CodeProps
- HeadingProps
- TextProps
- useClickOutside
- useDebounce
```



## Codemod

We have created two codemods to help you migrate to V13.

### find-deprecated-imports

This codemod will help you find and replace deprecated imports and usage of legacy components and utilities.

```bash
pnpm --package=@frontify/fondue@v13.0.0 dlx find-deprecated-imports <path-to-your-project>
```

### migrate-tokens

This codemod will help you migrate your css variables and tailwind classes to the new token system.

Options:
- `--dry`: Dry run

- `--css`: Migrate only css variables
- `--tailwind`: Migrate only tailwind classes

```bash
pnpm --package=@frontify/fondue@v13.0.0 dlx migrate-tokens <path-to-your-project>
```
