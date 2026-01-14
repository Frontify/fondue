import{j as n}from"./jsx-runtime-B3a-tEnq.js";import{useMDXComponents as t}from"./index-DDlp6MB7.js";import"./iframe-DNRErtBm.js";import"./preload-helper-C1FmrZbK.js";function i(o){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"upgrading-to-fondue-v13",children:"Upgrading to Fondue v13"}),`
`,n.jsx(e.h2,{id:"introduction",children:"Introduction"}),`
`,n.jsx(e.p,{children:"Fondue v13 introduces big changes in the way fondue is structured and how it is consumed."}),`
`,n.jsx(e.h3,{id:"package-structure",children:"Package structure"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`@frontify/fondue
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
`})}),`
`,n.jsx(e.h2,{id:"breaking-changes",children:"Breaking changes"}),`
`,n.jsx(e.h3,{id:"tokens",children:"Tokens"}),`
`,n.jsx(e.p,{children:"The token system has been completely overhauled."}),`
`,n.jsx(e.p,{children:`The updated structure features a reduced number of tokens and a more consistent naming convention.
Stroybook stories are now grouped by category and to make it easier to find the right token.`}),`
`,n.jsxs(e.p,{children:["Explore the new token system in the ",n.jsx(e.a,{href:"https://fondue-components.frontify.com/?path=/story/tokens_tokens--colors",rel:"nofollow",children:"token story"}),"."]}),`
`,n.jsxs(e.p,{children:["You can use the ",n.jsx(e.a,{href:"#migrate-tokens",children:"migrate-tokens"})," codemod to migrate your css variables and tailwind classes to the new token system."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"For properties that have tokens defined, we do no longer include the tailwind default theme tokens along with the fondue tokens."}),`
`,n.jsx(e.li,{children:"The class prefix is no longer defined by fondue, you need to set it yourself in your tailwind config file."}),`
`]}),`
`,n.jsx(e.h4,{id:"required-changes",children:"Required changes"}),`
`,n.jsx(e.p,{children:"Import the base tokens and default theme at the root of your application."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`import "@frontify/fondue/tokens/base";

export const App = () => {
    return (
        <div>
            {/* Your application */}
        </div>
    );
};
`})}),`
`,n.jsxs(e.p,{children:["Update the preset import and set your desired prefix in your ",n.jsx(e.code,{children:"tailwind.config.js"})," file."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`- import frontifyTailwindConfig from '@frontify/fondue/tailwind';
+ import frontifyTailwindConfig from '@frontify/fondue/tokens/tailwind';

const config = {
+   prefix: 'tw-',
    presets: [frontifyTailwindConfig]
}

export default config;
`})}),`
`,n.jsxs(e.p,{children:["If you are using tokens from the tailwind default theme, you need to add them into your ",n.jsx(e.code,{children:"tailwind.config.js"})," file, as fondue v13 does not include them anymore."]}),`
`,n.jsx(e.h3,{id:"rich-text-editor",children:"Rich Text Editor"}),`
`,n.jsxs(e.p,{children:[`The rich text editor has been moved to its own sub-package.
To use the rich text editor, you need to import it from the `,n.jsx(e.code,{children:"@frontify/fondue/rte"})," package."]}),`
`,n.jsx(e.h4,{id:"required-changes-1",children:"Required changes"}),`
`,n.jsxs(e.p,{children:["Update your richt text editor imports import from the ",n.jsx(e.code,{children:"@frontify/fondue/rte"})," package."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`- import { ... } from '@frontify/fondue';
+ import { ... } from '@frontify/fondue/rte';
`})}),`
`,n.jsx(e.h3,{id:"icons",children:"Icons"}),`
`,n.jsxs(e.p,{children:["In V13, icons are only available in the ",n.jsx(e.code,{children:"@frontify/fondue/icons"})," package. Exports of icons in the ",n.jsx(e.code,{children:"@frontify/fondue"})," package have been removed."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Icons with a ",n.jsx(e.code,{children:"filled"})," variant are now exported as two separate icons, one with the ",n.jsx(e.code,{children:"filled"})," variant and one without."]}),`
`,n.jsxs(e.li,{children:["The ",n.jsx(e.code,{children:"size"})," is now set as a prop on the icon component."]}),`
`]}),`
`,n.jsx(e.h4,{id:"required-changes-2",children:"Required changes"}),`
`,n.jsxs(e.p,{children:["Update your icon imports import from the ",n.jsx(e.code,{children:"@frontify/fondue/icons"})," package."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`- import { SampleIcon16 } from '@frontify/fondue';
+ import { SampleIconFilled } from '@frontify/fondue/icons';

- <SampleIcon16 size={16} filled />
+ <SampleIconFilled size={16} />

`})}),`
`,n.jsx(e.h3,{id:"legacy-components-and-utilities",children:"Legacy components and utilities"}),`
`,n.jsxs(e.p,{children:["Most of the legacy components and utilities have been removed from fondue. See ",n.jsx(e.a,{href:"#breaking-changes",children:"Breaking changes"})," for more details."]}),`
`,n.jsxs(e.p,{children:["A small number of legacy components which have not yet been refactored are still available ",n.jsx(e.code,{children:"@frontify/fondue"}),`.
These will be removed in a future version. We recommend to migrate to the new components as soon as possible.`]}),`
`,n.jsx(e.h4,{id:"removed-components",children:"Removed components"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`- AddBlockButton
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
`})}),`
`,n.jsx(e.h4,{id:"removed-utilities--constants",children:"Removed utilities & constants"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`- COMMON_INSET_BORDER
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
`})}),`
`,n.jsx(e.h2,{id:"codemod",children:"Codemod"}),`
`,n.jsx(e.p,{children:"We have created two codemods to help you migrate to V13."}),`
`,n.jsx(e.h3,{id:"find-deprecated-imports",children:"find-deprecated-imports"}),`
`,n.jsx(e.p,{children:"This codemod will help you find and replace deprecated imports and usage of legacy components and utilities."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`pnpm --package=@frontify/fondue@v13.0.0 dlx find-deprecated-imports <path-to-your-project>
`})}),`
`,n.jsx(e.h3,{id:"migrate-tokens",children:"migrate-tokens"}),`
`,n.jsx(e.p,{children:"This codemod will help you migrate your css variables and tailwind classes to the new token system."}),`
`,n.jsx(e.p,{children:"Options:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"--dry"}),": Dry run"]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"--css"}),": Migrate only css variables"]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"--tailwind"}),": Migrate only tailwind classes"]}),`
`]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`pnpm --package=@frontify/fondue@v13.0.0 dlx migrate-tokens <path-to-your-project>
`})})]})}function c(o={}){const{wrapper:e}={...t(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(i,{...o})}):i(o)}export{c as default};
