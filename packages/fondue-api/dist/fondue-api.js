const name$B = "Accordion";
const description$B = "A set of collapsible sections where each item can be independently expanded or collapsed. Use when you need to organize large amounts of information into digestible sections, conserving space and improve scannability.";
const status$B = "released";
const category$B = "layout";
const tags$B = [
  "accordion",
  "collapsible",
  "expandable"
];
const relatedComponents$B = [
  "Tabs",
  "Section"
];
const importStatement$B = "import { Accordion } from '@frontify/fondue/components';";
const props$B = [];
const subComponents$B = [
  {
    name: "Accordion.Root",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-accordion-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "border",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Show or hide the top and bottom border",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Accordion component. This should contain the `Accordion.Item` components",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "defaultValue",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "The value of the items whose contents are expanded when the accordion is initially rendered.\nUse `defaultValue` if you do not need to control the state of an accordion.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Whether or not an accordion is disabled from user interaction.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "value",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "The controlled stateful value of the accordion items whose contents are expanded.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "padding",
        type: '"none" | "small" | "medium" | "large"',
        required: false,
        defaultValue: "large",
        description: "Controls if we show paddings around the header.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onValueChange",
        type: "(value: string[]) => void",
        required: false,
        defaultValue: null,
        description: "Callback function that is called when the value of the accordion changes.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Accordion.Item",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-accordion-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether or not an accordion item is disabled from user interaction.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description: "A string value for the accordion item. All items within an accordion should use a unique value.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Accordion.Header",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-accordion-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClick",
        type: "MouseEventHandler<HTMLDivElement>",
        required: false,
        defaultValue: null,
        description: "Click callback for this item.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Accordion header.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Accordion.Content",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-accordion-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Accordion content. This contains the main content.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "divider",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Adds a divider line between the header and the content.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClick",
        type: "MouseEventHandler<HTMLDivElement>",
        required: false,
        defaultValue: null,
        description: "Click callback for the content.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "padding",
        type: '"none" | "small" | "medium" | "large"',
        required: false,
        defaultValue: "large",
        description: "Controls if we show paddings around the content.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Accordion.Slot",
    props: [
      {
        name: "name",
        type: '"action"',
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-accordion-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$B = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: '<Accordion.Root >\n <Accordion.Item value="accordion-test-0">\n <Accordion.Header>\n <Flex gap={2} align="center">\n <IconIcon size="20" />\n Item with icon\n </Flex>\n </Accordion.Header>\n <Accordion.Content divider>\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt\n ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo\n dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor\n sit amet.\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-1">\n <Accordion.Header>\n With action slot\n <Accordion.Slot name="action">\n <Button size="small" emphasis="default">\n Click Me\n </Button>\n </Accordion.Slot>\n </Accordion.Header>\n <Accordion.Content>\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt\n ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo\n dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor\n sit amet.\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-2">\n <Accordion.Header>Item with dropdown child</Accordion.Header>\n <Accordion.Content>\n <Dropdown.Root>\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-3">\n <Accordion.Header>Item with flyout child</Accordion.Header>\n <Accordion.Content>\n <Flyout.Root>\n <Flyout.Trigger>\n <Button>Trigger</Button>\n </Flyout.Trigger>\n <Flyout.Content>\n <Flyout.Body>Hello!</Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-4">\n <Accordion.Header>Item with color picker flyout</Accordion.Header>\n <Accordion.Content>\n <ColorFlyOut />\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-5">\n <Accordion.Header onClick={() => () => {}}>\n Empty item with an onClick callback\n </Accordion.Header>\n <Accordion.Content />\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-6">\n <Accordion.Header>Item with resizable content</Accordion.Header>\n <Accordion.Content>\n <ResizableContent />\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-7">\n <Accordion.Header>Item without padding</Accordion.Header>\n <Accordion.Content padding="none">\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt\n ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo\n dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor\n sit amet.\n </Accordion.Content>\n </Accordion.Item>\n\n <Accordion.Item value="accordion-test-8">\n <Accordion.Header>\n Item with badge\n <Accordion.Slot>\n <Flex gap={2}>\n <Badge>42 entries</Badge>\n <Badge emphasis="strong" variant="highlight">\n very pretty\n </Badge>\n </Flex>\n </Accordion.Slot>\n <Accordion.Slot name="action">\n <Flex gap={1}>\n <Button size="small" emphasis="weak" aspect="square">\n <IconPen size={16} />\n </Button>\n <Button size="small" emphasis="weak" aspect="square">\n <IconTrashBin size={16} />\n </Button>\n </Flex>\n </Accordion.Slot>\n </Accordion.Header>\n <Accordion.Content>\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt\n ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo\n dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor\n sit amet.\n </Accordion.Content>\n </Accordion.Item>\n </Accordion.Root>'
  },
  {
    name: "WithSmallPadding",
    description: "",
    isCanonical: false,
    code: `<Accordion.Root padding='small'>
 <Accordion.Item value="accordion-test-0">
 <Accordion.Header>
 <Flex gap={2} align="center">
 <IconIcon size="20" />
 Item with icon
 </Flex>
 </Accordion.Header>
 <Accordion.Content divider>
 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
 ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
 dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
 sit amet.
 </Accordion.Content>
 </Accordion.Item>

 <Accordion.Item value="accordion-test-1">
 <Accordion.Header>
 With action slot
 <Accordion.Slot name="action">
 <Button size="small" emphasis="default">
 Click Me
 </Button>
 </Accordion.Slot>
 </Accordion.Header>
 <Accordion.Content>
 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
 ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
 dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
 sit amet.
 </Accordion.Content>
 </Accordion.Item>

 <Accordion.Item value="accordion-test-2">
 <Accordion.Header>Item with dropdown child</Accordion.Header>
 <Accordion.Content>
 <Dropdown.Root>
 <Dropdown.Trigger>
 <Button>Trigger</Button>
 </Dropdown.Trigger>
 <Dropdown.Content>
 <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
 <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
 <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </Accordion.Content>
 </Accordion.Item>

 <Accordion.Item value="accordion-test-3">
 <Accordion.Header>Item with flyout child</Accordion.Header>
 <Accordion.Content>
 <Flyout.Root>
 <Flyout.Trigger>
 <Button>Trigger</Button>
 </Flyout.Trigger>
 <Flyout.Content>
 <Flyout.Body>Hello!</Flyout.Body>
 </Flyout.Content>
 </Flyout.Root>
 </Accordion.Content>
 </Accordion.Item>

 <Accordion.Item value="accordion-test-4">
 <Accordion.Header>Item with color picker flyout</Accordion.Header>
 <Accordion.Content>
 <ColorFlyOut />
 </Accordion.Content>
 </Accordion.Item>

 <Accordion.Item value="accordion-test-5">
 <Accordion.Header onClick={() => () => {}}>
 Empty item with an onClick callback
 </Accordion.Header>
 <Accordion.Content />
 </Accordion.Item>

 <Accordion.Item value="accordion-test-6">
 <Accordion.Header>Item with resizable content</Accordion.Header>
 <Accordion.Content>
 <ResizableContent />
 </Accordion.Content>
 </Accordion.Item>

 <Accordion.Item value="accordion-test-7">
 <Accordion.Header>Item without padding</Accordion.Header>
 <Accordion.Content padding="none">
 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
 ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
 dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
 sit amet.
 </Accordion.Content>
 </Accordion.Item>
 </Accordion.Root>`
  }
];
const instructions$B = 'Always compose as Accordion.Root > Accordion.Item > Accordion.Header + Accordion.Content. Each Accordion.Item requires a unique string value prop. Use Accordion.Slot with name="action" inside Accordion.Header to place action buttons (e.g. edit/delete) on the right side of the header. Use Accordion.Slot without a name for badge-style secondary content. Add divider prop to Accordion.Content to show a separator between header and content if necessary based on the layout needs.';
const typeDefinitions$B = {};
const __vite_glob_0_0 = {
  name: name$B,
  description: description$B,
  status: status$B,
  category: category$B,
  tags: tags$B,
  relatedComponents: relatedComponents$B,
  importStatement: importStatement$B,
  props: props$B,
  subComponents: subComponents$B,
  examples: examples$B,
  instructions: instructions$B,
  typeDefinitions: typeDefinitions$B
};
const name$A = "Badge";
const description$A = "A small indicator used to highlight status, count, or contextual information. Use to convey concise data at a glance, and enhancing clarity without overwhelming the interface.";
const status$A = "released";
const category$A = "feedback";
const tags$A = [
  "badge",
  "label",
  "status"
];
const relatedComponents$A = [
  "Tag",
  "Notice"
];
const importStatement$A = "import { Badge } from '@frontify/fondue/components';";
const props$A = [
  {
    name: "emphasis",
    type: '"strong" | "weak"',
    required: false,
    defaultValue: "strong",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "variant",
    type: '"default" | "positive" | "highlight" | "warning" | "negative"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"default" | "small"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onClick",
    type: "(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
    required: false,
    defaultValue: null,
    description: "Click handler",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onDismiss",
    type: "(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
    required: false,
    defaultValue: null,
    description: "Click handler on dismiss - providing this will show the dismiss button",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "status",
    type: "string | RgbaColor",
    required: false,
    defaultValue: null,
    description: "The color of the status dot",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "title",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "badge",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$A = [];
const examples$A = [
  {
    name: "LabelOnly",
    description: "",
    isCanonical: true,
    code: "<Badge emphasis='strong' variant='default' size='default'>Text</Badge>"
  },
  {
    name: "WithOnClick",
    description: "",
    isCanonical: false,
    code: "<Badge emphasis='strong' variant='default' size='default'>Text</Badge>"
  },
  {
    name: "WithDismiss",
    description: "",
    isCanonical: false,
    code: "<Badge emphasis='strong' variant='default' size='default'>Text</Badge>"
  },
  {
    name: "WithOnClickAndDismiss",
    description: "",
    isCanonical: false,
    code: "<Badge emphasis='strong' variant='default' size='default'>Text</Badge>"
  },
  {
    name: "WithStatus",
    description: "",
    isCanonical: false,
    code: "<Badge emphasis='strong' variant='default' size='default' status='positive'>Text</Badge>"
  },
  {
    name: "WithCustomStatusColor",
    description: "",
    isCanonical: false,
    code: "<Badge emphasis='strong' variant='default' size='default' status={{ red: 40, green: 200, blue: 100, alpha: 1 }}>Text</Badge>"
  },
  {
    name: "WithCustomStatusString",
    description: "",
    isCanonical: false,
    code: "<Badge emphasis='strong' variant='default' size='default' status='#f14394'>Text</Badge>"
  },
  {
    name: "WithIcon",
    description: "",
    isCanonical: false,
    code: `<Badge emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Badge>`
  },
  {
    name: "WithOnClickAndIcon",
    description: "",
    isCanonical: false,
    code: `<Badge emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Badge>`
  },
  {
    name: "WithStatusAndIcon",
    description: "",
    isCanonical: false,
    code: `<Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>`
  },
  {
    name: "BetweenElements",
    description: "",
    isCanonical: false,
    code: `<>
 before{' '}
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>{' '}
 after
 </>`
  },
  {
    name: "MultipleBadgesInRow",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>
 <Badge emphasis='strong' variant='default' size='default' status='positive'>
 <IconColorFan size="16" /> Text
 </Badge>
 </div>`
  }
];
const instructions$A = "Use variant to control color semantics (default, positive, highlight, warning, negative). Use emphasis='weak' for a subtler appearance. Provide a status prop (string color or RgbaColor object) to show a colored dot. Provide onDismiss to show a dismiss button. Use Tag instead if the label needs to be removable or interactive in a form context.";
const typeDefinitions$A = {
  RgbaColor: "{\n    red: number;\n    green: number;\n    blue: number;\n    alpha?: number;\n    name?: string;\n}"
};
const __vite_glob_0_1 = {
  name: name$A,
  description: description$A,
  status: status$A,
  category: category$A,
  tags: tags$A,
  relatedComponents: relatedComponents$A,
  importStatement: importStatement$A,
  props: props$A,
  subComponents: subComponents$A,
  examples: examples$A,
  instructions: instructions$A,
  typeDefinitions: typeDefinitions$A
};
const name$z = "Box";
const description$z = "A general-purpose layout primitive for applying spacing, sizing, overflow, and positioning using design-system tokens. Use as a wrapper div or span when you need layout control without flexbox or grid.";
const status$z = "released";
const category$z = "layout";
const tags$z = [
  "box",
  "container",
  "layout"
];
const relatedComponents$z = [
  "Flex",
  "Grid"
];
const importStatement$z = "import { Box } from '@frontify/fondue/components';";
const props$z = [
  {
    name: "m",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mx",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "my",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "ml",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "p",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "px",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "py",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pl",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "width",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "height",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflow",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowX",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowY",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The vertical overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "position",
    type: "Responsive<PositionValue>",
    required: false,
    defaultValue: null,
    description: "The position property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "top",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "right",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "bottom",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "left",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "as",
    type: '"div" | "span"',
    required: false,
    defaultValue: "div",
    description: "The element to render the Box component as.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "display",
    type: 'Responsive<"none" | "block" | "inline-block" | "inline">',
    required: false,
    defaultValue: "'block'",
    description: "The display property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-box",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$z = [];
const examples$z = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Box width={25} height={25}>\n <DecorativeContent />\n </Box>"
  },
  {
    name: "PixelValues",
    description: "",
    isCanonical: false,
    code: "<Box width='100px' height='100px'>\n <DecorativeContent />\n </Box>"
  }
];
const instructions$z = "Spacing props (p, m, px, my, etc.) accept design token numbers or pixel strings. Use as='span' to render inline. Use Flex for flex layouts and Grid for grid layouts — Box is for simpler single-element sizing and spacing. All spacing props support responsive objects with breakpoint keys (base, xs, sm, md, lg, xl, 2xl).";
const typeDefinitions$z = {
  Responsive: "({\n    [key in Breakpoint]?: TValue;\n} & {\n    base?: TValue;\n}) | TValue",
  SizeValue: 'SpacingValue | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content"',
  SpacingValue: "// `(string & {})` and `(number & {})` allows for arbitrary strings/numbers to be passed in while keeping the suggestion of the union type\n(string & {}) | (number & {}) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64",
  OverflowValue: '"visible" | "hidden" | "clip" | "scroll" | "auto"',
  PositionValue: '"static" | "fixed" | "absolute" | "relative" | "sticky"',
  Breakpoint: "keyof typeof screens"
};
const __vite_glob_0_2 = {
  name: name$z,
  description: description$z,
  status: status$z,
  category: category$z,
  tags: tags$z,
  relatedComponents: relatedComponents$z,
  importStatement: importStatement$z,
  props: props$z,
  subComponents: subComponents$z,
  examples: examples$z,
  instructions: instructions$z,
  typeDefinitions: typeDefinitions$z
};
const name$y = "Button";
const description$y = "A clickable action element for triggering user actions. Use for primary CTAs, form submissions, and any discrete user action.";
const status$y = "released";
const category$y = "input";
const tags$y = [
  "button",
  "action",
  "cta"
];
const relatedComponents$y = [
  "SplitButton",
  "Link"
];
const importStatement$y = "import { Button } from '@frontify/fondue/components';";
const props$y = [
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    required: false,
    defaultValue: "button",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "title",
    type: "string",
    required: false,
    defaultValue: "null",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "variant",
    type: '"default" | "positive" | "negative" | "danger" | "loud"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "emphasis",
    type: '"default" | "weak" | "strong"',
    required: false,
    defaultValue: "strong",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"small" | "medium" | "large"',
    required: false,
    defaultValue: "medium",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "rounding",
    type: '"medium" | "full"',
    required: false,
    defaultValue: "medium",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aspect",
    type: '"default" | "square"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "hugWidth",
    type: "boolean",
    required: false,
    defaultValue: "true",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onPress",
    type: "(event?: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
    required: false,
    defaultValue: "() => {}",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "form",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-button",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$y = [];
const examples$y = [
  {
    name: "Icon and Text Label",
    description: "",
    isCanonical: false,
    code: "<Button type='button' variant='default' emphasis='default' size='medium' rounding='medium' hugWidth aspect='default'>\n <IconColorFan size={16} />\n Button Text\n </Button>"
  },
  {
    name: "TextLabelOnly",
    description: "",
    isCanonical: true,
    code: "<Button type='button' variant='default' emphasis='default' size='medium' rounding='medium' hugWidth aspect='default'>\n  Button Text\n</Button>"
  },
  {
    name: "Icon Only",
    description: "",
    isCanonical: false,
    code: "<Button type='button' variant='default' emphasis='default' size='medium' rounding='medium' hugWidth aspect='square'>\n  <IconIcon size={16} />\n</Button>"
  },
  {
    name: "Icon Only Rounded",
    description: "",
    isCanonical: false,
    code: "<Button type='button' variant='default' emphasis='default' size='medium' rounding='full' hugWidth aspect='square' title='Icon Only Rounded'>\n  <IconIcon size={16} />\n</Button>"
  },
  {
    name: "Icon and Text Label",
    description: "",
    isCanonical: false,
    code: "<Button type='button' variant='default' emphasis='default' size='medium' rounding='medium' hugWidth aspect='default'>\n <IconColorFan size={16} />\n Button Text\n </Button>"
  }
];
const instructions$y = "Use variant to set intent (default, positive, negative, danger, loud) and emphasis to set visual weight (strong=high contrast, default=low contrast, weak=no fill on default). Use aspect='square' with icon-only buttons and always provide a title or aria-label for accessibility. Use rounding='full' for circular icon buttons. Use SplitButton when a primary action needs a secondary dropdown menu.";
const typeDefinitions$y = {};
const __vite_glob_0_3 = {
  name: name$y,
  description: description$y,
  status: status$y,
  category: category$y,
  tags: tags$y,
  relatedComponents: relatedComponents$y,
  importStatement: importStatement$y,
  props: props$y,
  subComponents: subComponents$y,
  examples: examples$y,
  instructions: instructions$y,
  typeDefinitions: typeDefinitions$y
};
const name$x = "Checkbox";
const description$x = "A binary form input for toggling a boolean value. Supports checked, unchecked, and indeterminate states. Use in forms where multiple independent options can be selected.";
const status$x = "released";
const category$x = "input";
const tags$x = [
  "checkbox",
  "form",
  "toggle"
];
const relatedComponents$x = [
  "RadioList",
  "Switch"
];
const importStatement$x = "import { Checkbox } from '@frontify/fondue/components';";
const props$x = [
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "name",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "defaultValue",
    type: 'boolean | "indeterminate"',
    required: false,
    defaultValue: "false",
    description: "The default value of the checkbox\nUsed for uncontrolled components",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "value",
    type: 'boolean | "indeterminate"',
    required: false,
    defaultValue: "false",
    description: "The controlled value of the checkbox",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"default" | "large"',
    required: false,
    defaultValue: "default",
    description: "The size of the checkbox",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "emphasis",
    type: '"default" | "weak"',
    required: false,
    defaultValue: "default",
    description: "The emphasis of the checkbox",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Disable the checkbox",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "required",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Make the checkbox required in form",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "readOnly",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Make the checkbox read-only",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "status",
    type: '"default" | "error"',
    required: false,
    defaultValue: "default",
    description: "Status of the checkbox",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onChange",
    type: "(event: FormEvent<HTMLButtonElement>) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the checkbox value changes",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onBlur",
    type: "(event: FormEvent<HTMLButtonElement>) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the checkbox is blurred",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onFocus",
    type: "(event: FormEvent<HTMLButtonElement>) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the checkbox is focused",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-checkbox",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$x = [];
const examples$x = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<CheckboxComponent />"
  },
  {
    name: "Indeterminate",
    description: "",
    isCanonical: false,
    code: "<CheckboxComponent value='indeterminate' />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: "<CheckboxComponent disabled />"
  },
  {
    name: "Required",
    description: "",
    isCanonical: false,
    code: "<CheckboxComponent required />"
  },
  {
    name: "ReadOnly",
    description: "",
    isCanonical: false,
    code: "<CheckboxComponent readOnly value />"
  },
  {
    name: "WithTooltip",
    description: "",
    isCanonical: false,
    code: '<Flex gap={2}>\n <Checkbox id={checkboxId} aria-labelledby={labelId} value={value} onChange={handleToggle} />\n <Label id={labelId} htmlFor={checkboxId} required={args.required}>\n Checkbox\n <Tooltip.Root>\n <Tooltip.Trigger>\n <IconQuestionMarkCircle size="16" />\n </Tooltip.Trigger>\n\n <Tooltip.Content>I am a tooltip!</Tooltip.Content>\n </Tooltip.Root>\n </Label>\n </Flex>'
  },
  {
    name: "WithoutLabel",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-gap-2 tw-items-center">\n <Checkbox id="checkbox" aria-labelledby="label" value={value} onChange={handleToggle} />\n </div>'
  },
  {
    name: "Checklist",
    description: "",
    isCanonical: false,
    code: '<Flex gap="1rem" direction="column">\n <Flex gap="4px" direction="row">\n <Checkbox id="checkbox-1" aria-labelledby="label-1" value onChange={() => undefined} />\n <Label id="label-1" htmlFor="checkbox-1">\n Checkbox 1\n </Label>\n </Flex>\n <Flex gap="4px" direction="row">\n <Checkbox\n \n id="checkbox-2"\n aria-labelledby="label-2"\n value={false}\n onChange={() => undefined}\n />\n <Label id="label-2" htmlFor="checkbox-2">\n Checkbox 2\n </Label>\n </Flex>\n <Flex gap="4px" direction="row">\n <Checkbox\n \n id="checkbox-3"\n aria-labelledby="label-3"\n value="indeterminate"\n onChange={() => undefined}\n />\n <Label id="label-3" htmlFor="checkbox-3">\n Checkbox 3\n </Label>\n </Flex>\n </Flex>'
  },
  {
    name: "WithErrorAndHelpText",
    description: "",
    isCanonical: false,
    code: '<Flex direction="column" gap={2}>\n <Flex gap={2} align="center">\n <Checkbox\n \n id={checkboxId}\n aria-labelledby={labelId}\n aria-describedby={helpTextId}\n value={value}\n onChange={handleToggle}\n status="error"\n />\n <Label id={labelId} htmlFor={checkboxId}>\n I agree to the terms and conditions.\n </Label>\n </Flex>\n <Text id={helpTextId} size="small" color="negative">\n Please check this box to continue.\n </Text>\n </Flex>'
  }
];
const instructions$x = "Always pair with a Label component for accessibility — connect them via matching id and htmlFor props, or use aria-labelledby. Use value='indeterminate' for partial selection states (e.g. select-all with mixed children). Use RadioList when only one option from a group can be selected. Use Switch for binary settings that take immediate effect rather than form submission.";
const typeDefinitions$x = {};
const __vite_glob_0_4 = {
  name: name$x,
  description: description$x,
  status: status$x,
  category: category$x,
  tags: tags$x,
  relatedComponents: relatedComponents$x,
  importStatement: importStatement$x,
  props: props$x,
  subComponents: subComponents$x,
  examples: examples$x,
  instructions: instructions$x,
  typeDefinitions: typeDefinitions$x
};
const name$w = "ColorPicker";
const description$w = "A color selection panel with gradient canvas and hex/RGBA value inputs. Use when users need to pick or enter an exact color value.";
const status$w = "released";
const category$w = "input";
const tags$w = [
  "color",
  "picker",
  "input"
];
const relatedComponents$w = [];
const importStatement$w = "import { ColorPicker } from '@frontify/fondue/components';";
const props$w = [
  {
    name: "children",
    type: "ReactNode",
    required: false,
    defaultValue: null,
    description: "The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "currentColor",
    type: "RgbaColor",
    required: false,
    defaultValue: "{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",
    description: "The active color in the color picker",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onColorChange",
    type: "(color: RgbaColor) => void",
    required: false,
    defaultValue: "() => {}",
    description: "Event handler called when the color changes",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "currentFormat",
    type: '"HEX" | "RGBA"',
    required: false,
    defaultValue: null,
    description: "The active color format in the color picker",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onFormatChange",
    type: "(format: ColorFormat) => void",
    required: false,
    defaultValue: "() => {}",
    description: "Event handler called when the color format changes",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "defaultFormat",
    type: '"HEX" | "RGBA"',
    required: false,
    defaultValue: "HEX",
    description: "The default format to use for the color input when not controlled externally",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "color-picker-input",
    description: "The test id of the color picker",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$w = [
  {
    name: "ColorPicker.Values",
    props: [
      {
        name: "currentColor",
        type: "RgbaColor",
        required: false,
        defaultValue: "{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onColorChange",
        type: "(color: RgbaColor) => void",
        required: false,
        defaultValue: "() => {}",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "currentFormat",
        type: '"HEX" | "RGBA"',
        required: false,
        defaultValue: "HEX",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "setCurrentFormat",
        type: "(format: ColorFormat) => void",
        required: false,
        defaultValue: "() => {}",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "color-picker-value-input",
        description: "The test id of the color picker value input",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "ColorPicker.Input",
    props: [
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "currentColor",
        type: "RgbaColor",
        required: false,
        defaultValue: null,
        description: "The active color in the color picker",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "isOpen",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "The open state of the color picker used to determine arrow state",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the color picker input is disabled",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClear",
        type: "() => void",
        required: false,
        defaultValue: null,
        description: "callback for clearing the color",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the color picker input is clicked",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "color-picker-input",
        description: "The test id of the color picker input",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "ColorPicker.Gradient",
    props: [
      {
        name: "currentColor",
        type: "RgbaColor",
        required: false,
        defaultValue: "{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onColorChange",
        type: "(color: RgbaColor) => void",
        required: false,
        defaultValue: "() => {}",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "color-picker-input",
        description: "The test id of the color picker gradient input",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$w = [
  {
    name: "Default",
    description: "",
    isCanonical: false,
    code: "<ColorPicker.Input currentColor={{ red: 230, green: 100, blue: 50, alpha: 0.8, name: 'custom-color' }} onClear={() => {}} />"
  },
  {
    name: "Empty",
    description: "",
    isCanonical: false,
    code: "<ColorPicker.Input onClear={() => {}} />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: "<ColorPicker.Input disabled onClear={() => {}} />"
  },
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: '<ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>\n                <ColorPicker.Values />\n                <ColorPicker.Gradient />\n            </ColorPicker.Root>'
  },
  {
    name: "WithRgbaDefaultFormat",
    description: "",
    isCanonical: false,
    code: '<ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor} defaultFormat="RGBA">\n                <ColorPicker.Values />\n                <ColorPicker.Gradient />\n            </ColorPicker.Root>'
  },
  {
    name: "OnlyPicker",
    description: "",
    isCanonical: false,
    code: "<ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>\n                <ColorPicker.Gradient />\n            </ColorPicker.Root>"
  },
  {
    name: "OnlyValues",
    description: "",
    isCanonical: false,
    code: "<ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>\n                <ColorPicker.Values />\n            </ColorPicker.Root>"
  },
  {
    name: "InFlyout",
    description: "",
    isCanonical: false,
    code: '<Flyout.Root open={isOpen} onOpenChange={setIsOpen}>\n                <Flyout.Trigger>\n                    <ColorPicker.Input\n                        aria-label="Color Picker"\n                        currentColor={currentColor}\n                        onClear={() => {\n                            setCurrentColor(undefined);\n                        }}\n                    />\n                </Flyout.Trigger>\n                <Flyout.Content maxWidth="600px">\n                    <Flyout.Body>\n                        <div className="tw-p-2 md:tw-w-[450px]">\n                            <ColorPicker.Root\n                                currentFormat={currentFormat}\n                                currentColor={currentColor}\n                                onColorChange={setCurrentColor}\n                                onFormatChange={setCurrentFormat}\n                            >\n                                <ColorPicker.Values />\n                                <ColorPicker.Gradient />\n                            </ColorPicker.Root>\n                        </div>\n                    </Flyout.Body>\n                    <Flyout.Footer>\n                        <Button\n                            emphasis="default"\n                            onPress={() => {\n                                setIsOpen(false);\n                                setCurrentColor(savedColor);\n                            }}\n                        >\n                            Cancel\n                        </Button>\n                        <Button\n                            onPress={() => {\n                                setIsOpen(false);\n                                setSavedColor(currentColor);\n                            }}\n                        >\n                            Save\n                        </Button>\n                    </Flyout.Footer>\n                </Flyout.Content>\n            </Flyout.Root>'
  }
];
const instructions$w = "The picker panel (ColorPicker.Root with ColorPicker.Gradient and/or ColorPicker.Values) does not include its own popover — wrap it in a Flyout for the standard trigger-and-panel pattern. Use ColorPicker.Input as the Flyout trigger to display the selected color. Colors are represented as RgbaColor objects ({ red, green, blue, alpha, name? }). Use currentFormat and onFormatChange to control HEX vs RGBA display.";
const typeDefinitions$w = {
  RgbaColor: "{\n    red: number;\n    green: number;\n    blue: number;\n    alpha?: number;\n    name?: string;\n}",
  ColorFormat: '"HEX" | "RGBA"'
};
const __vite_glob_0_5 = {
  name: name$w,
  description: description$w,
  status: status$w,
  category: category$w,
  tags: tags$w,
  relatedComponents: relatedComponents$w,
  importStatement: importStatement$w,
  props: props$w,
  subComponents: subComponents$w,
  examples: examples$w,
  instructions: instructions$w,
  typeDefinitions: typeDefinitions$w
};
const name$v = "DatePicker";
const description$v = "A date or date range picker with a calendar panel. Use when the user needs to select a specific date or date range.";
const status$v = "released";
const category$v = "input";
const tags$v = [
  "date",
  "picker",
  "calendar",
  "input"
];
const relatedComponents$v = [
  "TextInput"
];
const importStatement$v = "import { DatePicker } from '@frontify/fondue/components';";
const props$v = [
  {
    name: "selected",
    type: "{ year: number; month: number; day: number; }",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onChange",
    type: "(date?: { year: number; month: number; day: number; }) => void",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabledDates",
    type: "DisabledDatePickerDates | DisabledDatePickerDates[]",
    required: false,
    defaultValue: null,
    description: "The days to be disabled.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The test id applied to the wrapper and forwarded to DayPicker.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "selected",
    type: "{ year: number; month: number; day: number; }",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onChange",
    type: "(date?: { year: number; month: number; day: number; }) => void",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabledDates",
    type: "DisabledDatePickerDates | DisabledDatePickerDates[]",
    required: false,
    defaultValue: null,
    description: "The days to be disabled.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The test id applied to the wrapper and forwarded to DayPicker.",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$v = [
  {
    name: "DatePicker.Range",
    props: [
      {
        name: "selected",
        type: "{ from: { year: number; month: number; day: number; }; to: { year: number; month: number; day: number; }; }",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onChange",
        type: "(dateRange: { from: { year: number; month: number; day: number; }; to: { year: number; month: number; day: number; }; }) => void",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabledDates",
        type: "DisabledDatePickerDates | DisabledDatePickerDates[]",
        required: false,
        defaultValue: null,
        description: "The days to be disabled.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The test id applied to the wrapper and forwarded to DayPicker.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "DatePicker.Input",
    props: [
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "selected",
        type: "{ from: { year: number; month: number; day: number; }; to: { year: number; month: number; day: number; }; } | { year: number; month: number; day: number; }",
        required: false,
        defaultValue: null,
        description: "The active date or date range in the date picker",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "isOpen",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "The open state of the date picker used to determine arrow state",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the date picker input is disabled",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClear",
        type: "() => void",
        required: false,
        defaultValue: null,
        description: "callback for clearing the date",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the date picker input is clicked",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "date-picker-input",
        description: "The test id of the date picker input",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$v = [
  {
    name: "SingleDate",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput selected={{\n year: 2026,\n month: 2,\n day: 11,\n }} />"
  },
  {
    name: "DateRangeSameMonth",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput selected={{\n from: {\n year: 2026,\n month: 2,\n day: 11,\n },\n to: {\n year: 2026,\n month: 2,\n day: 16,\n },\n }} />"
  },
  {
    name: "DateRangeDifferentMonth",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput selected={{\n from: {\n year: 2026,\n month: 2,\n day: 11,\n },\n to: {\n year: 2026,\n month: 3,\n day: 16,\n },\n }} />"
  },
  {
    name: "DateRangeDifferentYear",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput selected={{\n from: {\n year: 2026,\n month: 2,\n day: 11,\n },\n\n to: {\n year: 2027,\n month: 3,\n day: 16,\n },\n }} />"
  },
  {
    name: "Clearable",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput />"
  },
  {
    name: "Empty",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: "<ForwardedRefDatePickerInput disabled />"
  },
  {
    name: "SingleDate",
    description: "",
    isCanonical: true,
    code: "<SingleDatePicker />"
  },
  {
    name: "ControlledSingleDate",
    description: "",
    isCanonical: false,
    code: "<DatePicker selected={selectedDate} onChange={handleChange} />"
  },
  {
    name: "RangeDate",
    description: "",
    isCanonical: false,
    code: "<DatePicker.Range />"
  },
  {
    name: "ControlledRangeDate",
    description: "",
    isCanonical: false,
    code: "<DatePicker.Range selected={selectedDateRange} onChange={handleChange} />"
  },
  {
    name: "DisabledDatesBefore",
    description: "",
    isCanonical: false,
    code: "<DatePicker disabledDates={[{ before: { year: 2026, month: 3, day: 19 } }]} />"
  },
  {
    name: "DisabledDatesAfter",
    description: "",
    isCanonical: false,
    code: "<DatePicker disabledDates={[{ after: { year: 2026, month: 3, day: 19 } }]} />"
  },
  {
    name: "InFlyout",
    description: "",
    isCanonical: false,
    code: `<div style={{ width: '350px' }}>
                <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
                    <Flyout.Trigger>
                        <DatePicker.Input
                            aria-label="Date Picker"
                            selected={savedDateRange}
                            isOpen={isOpen}
                            onClear={() => {
                                setSavedDateRange(undefined);
                                setSelectedDate(undefined);
                            }}
                        />
                    </Flyout.Trigger>
                    <Flyout.Content>
                        <Flyout.Body>
                            <DatePicker.Range
                                selected={selectedDate}
                                onChange={(dateRange) => {
                                    setSelectedDate(dateRange);
                                }}
                            />
                        </Flyout.Body>
                        <Flyout.Footer>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    setIsOpen(false);
                                    setSelectedDate(savedDateRange);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setIsOpen(false);
                                    setSavedDateRange(selectedDate);
                                }}
                            >
                                Save
                            </Button>
                        </Flyout.Footer>
                    </Flyout.Content>
                </Flyout.Root>
            </div>`
  }
];
const instructions$v = "DatePicker does not include its own trigger or popover — combine DatePicker.Input as the Flyout.Trigger and DatePicker (or DatePicker.Range) inside Flyout.Content for the standard pattern. Dates are represented as plain objects { year, month, day } — not JS Date objects. Use DatePicker.Range for range selection. Pass disabledDates to restrict selectable dates.";
const typeDefinitions$v = {
  DisabledDatePickerDates: "{\n    before: DatePickerDate;\n} | {\n    after: DatePickerDate;\n}",
  DatePickerDate: "{\n    year: number;\n    month: number;\n    day: number;\n} | undefined"
};
const __vite_glob_0_6 = {
  name: name$v,
  description: description$v,
  status: status$v,
  category: category$v,
  tags: tags$v,
  relatedComponents: relatedComponents$v,
  importStatement: importStatement$v,
  props: props$v,
  subComponents: subComponents$v,
  examples: examples$v,
  instructions: instructions$v,
  typeDefinitions: typeDefinitions$v
};
const name$u = "Dialog";
const description$u = "A modal overlay that interrupts the user to present important content or require a decision. Use for confirmations, forms, or detail views that need to be completed before continuing.";
const status$u = "released";
const category$u = "overlay";
const tags$u = [
  "dialog",
  "modal",
  "overlay"
];
const relatedComponents$u = [
  "Flyout",
  "Tooltip"
];
const importStatement$u = "import { Dialog } from '@frontify/fondue/components';";
const props$u = [];
const subComponents$u = [
  {
    name: "Dialog.Root",
    props: [
      {
        name: "modal",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Disable interaction with the rest of the page",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "The controlled `open` state of the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the `open` state changes",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Close",
    props: []
  },
  {
    name: "Dialog.Title",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "screenReaderOnly",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Visually hide the element while keeping it accessible to screen readers",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Description",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "screenReaderOnly",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Visually hide the element while keeping it accessible to screen readers",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Trigger",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dialog-side-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Content",
    props: [
      {
        name: "rounded",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Add rounded corners to the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "padding",
        type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the padding of the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "verticalAlign",
        type: '"top" | "center"',
        required: false,
        defaultValue: "center",
        description: "The vertical alignment of the divider",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "maxWidth",
        type: "string",
        required: false,
        defaultValue: "800px",
        description: "Define a maximum width for the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "minWidth",
        type: "string",
        required: false,
        defaultValue: "400px",
        description: "Define a minimum width for the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "minHeight",
        type: "string",
        required: false,
        defaultValue: "200px",
        description: "Define a minimum height for the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "showUnderlay",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Show a dark underlay behind the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the escape key is pressed.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dialog-side-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Header",
    props: [
      {
        name: "padding",
        type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the padding for the dialog header",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "showBorder",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Show a border at the bottom of the header",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "showCloseButton",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Show a close button in the header",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "closeProps",
        type: "CommonAriaProps",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dialog-side-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Footer",
    props: [
      {
        name: "padding",
        type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the padding for the dialog footer",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "showBorder",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Show a border at the top of the footer",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dialog-side-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.Body",
    props: [
      {
        name: "padding",
        type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the padding for the dialog body",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dialog-side-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dialog.SideContent",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dialog-side-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$u = [
  {
    name: "WithFullLayout",
    description: "",
    isCanonical: false,
    code: "<DialogContent>\n  I am a dialog content\n</DialogContent>"
  },
  {
    name: "WithHeader",
    description: "",
    isCanonical: false,
    code: "<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Header>\n <Dialog.Title>Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body />\n </Dialog.Content>\n </Dialog.Root>"
  },
  {
    name: "WithCloseButton",
    description: "",
    isCanonical: false,
    code: "<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Header showCloseButton>\n <Dialog.Title>Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body />\n </Dialog.Content>\n </Dialog.Root>"
  },
  {
    name: "WithFooter",
    description: "",
    isCanonical: true,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Body />\n <Dialog.Footer>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithSideContent",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.SideContent>\n <div className="tw-bg-success tw-h-full tw-min-w-40"></div>\n </Dialog.SideContent>\n <Dialog.Body />\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithUnderlay",
    description: "",
    isCanonical: false,
    code: "<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content showUnderlay>\n <Dialog.Header>\n <Dialog.Title>Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body showUnderlay />\n </Dialog.Content>\n </Dialog.Root>"
  },
  {
    name: "WithLongText",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.SideContent>\n <div className="tw-bg-success tw-h-full tw-min-w-40"></div>\n </Dialog.SideContent>\n <Dialog.Header>\n <Dialog.Title>Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body />\n <Dialog.Footer>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithCustomElementForClose",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.SideContent>\n <div className="tw-bg-success tw-h-full tw-min-w-40"></div>\n </Dialog.SideContent>\n <Dialog.Header>\n <Dialog.Title asChild>\n <h2>Dialog Header</h2>\n </Dialog.Title>\n </Dialog.Header>\n <Dialog.Body />\n <Dialog.Footer>\n <Dialog.Close>\n <Button emphasis="default">Cancel</Button>\n </Dialog.Close>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithAnnouncedDescription",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.SideContent>\n <div className="tw-bg-success tw-h-full tw-min-w-40"></div>\n </Dialog.SideContent>\n <Dialog.Header>\n <Dialog.Title>Dialog Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body>\n <Dialog.Description>{args.children}</Dialog.Description>\n </Dialog.Body>\n <Dialog.Footer>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithCustomElementAnnouncements",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.SideContent>\n <div className="tw-bg-success tw-h-full tw-min-w-40"></div>\n </Dialog.SideContent>\n <Dialog.Header>\n <Dialog.Title asChild>\n <h2>Dialog Header</h2>\n </Dialog.Title>\n </Dialog.Header>\n <Dialog.Body>\n <Dialog.Description asChild>\n <p>{args.children}</p>\n </Dialog.Description>\n </Dialog.Body>\n <Dialog.Footer>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithFocusableContent",
    description: "",
    isCanonical: false,
    code: "<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open flyout</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Header>Header</Dialog.Header>\n <Dialog.Body >\n <TextInput />\n <TextInput />\n <TextInput />\n </Dialog.Body>\n </Dialog.Content>\n </Dialog.Root>"
  },
  {
    name: "WithNoPadding",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content >
 <Dialog.Header padding="none">
 <Flex justify="space-between" align="center" width="100%" pr="1rem">
 <Dialog.Title>Header</Dialog.Title>
 <Button
 emphasis="default"
 onPress={() => {
 alert('Button in the header clicked');
 }}
 >
 Button in the header
 </Button>
 </Flex>
 </Dialog.Header>
 <Dialog.Body padding="none">None</Dialog.Body>
 <Dialog.Footer padding="none">
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "WithTightPadding",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content >
 <Dialog.Header padding="tight">
 <Flex justify="space-between" align="center" width="100%" pr="1rem">
 <Dialog.Title>Header</Dialog.Title>
 <Button
 emphasis="default"
 onPress={() => {
 alert('Button in the header clicked');
 }}
 >
 Button in the header
 </Button>
 </Flex>
 </Dialog.Header>
 <Dialog.Body padding="tight">Tight</Dialog.Body>
 <Dialog.Footer padding="tight">
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "WithCompactPadding",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content >
 <Dialog.Header padding="compact">
 <Flex justify="space-between" align="center" width="100%" pr="1rem">
 <Dialog.Title>Header</Dialog.Title>
 <Button
 emphasis="default"
 onPress={() => {
 alert('Button in the header clicked');
 }}
 >
 Button in the header
 </Button>
 </Flex>
 </Dialog.Header>
 <Dialog.Body padding="compact">Compact</Dialog.Body>
 <Dialog.Footer padding="compact">
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "WithComfortablePadding",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content >
 <Dialog.Header padding="comfortable">
 <Flex justify="space-between" align="center" width="100%" pr="1rem">
 <Dialog.Title>Header</Dialog.Title>
 <Button
 emphasis="default"
 onPress={() => {
 alert('Button in the header clicked');
 }}
 >
 Button in the header
 </Button>
 </Flex>
 </Dialog.Header>
 <Dialog.Body padding="comfortable">Confortable</Dialog.Body>
 <Dialog.Footer padding="comfortable">
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "WithSpaciousPadding",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content >
 <Dialog.Header padding="spacious">
 <Flex justify="space-between" align="center" width="100%" pr="1rem">
 <Dialog.Title>Header</Dialog.Title>
 <Button
 emphasis="default"
 onPress={() => {
 alert('Button in the header clicked');
 }}
 >
 Button in the header
 </Button>
 </Flex>
 </Dialog.Header>
 <Dialog.Body padding="spacious">Spacious</Dialog.Body>
 <Dialog.Footer padding="spacious">
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "TopAligned",
    description: "",
    isCanonical: false,
    code: "<DialogContent verticalAlign='top' />"
  },
  {
    name: "MobileView",
    description: "",
    isCanonical: false,
    code: "<DialogContent>\n  Hello World\n</DialogContent>"
  },
  {
    name: "WithoutBorders",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Header showBorder={false}>\n <Dialog.Title>Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body />\n <Dialog.Footer showBorder={false}>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "ControlledComponent",
    description: "",
    isCanonical: false,
    code: "<Dialog.Root\n open={isDialogOpen}\n onOpenChange={(state) => {\n setIsDialogOpen(state);\n }}\n >\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Header>\n <Dialog.Title>Header</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body />\n </Dialog.Content>\n </Dialog.Root>"
  },
  {
    name: "WithFlyoutAndTooltip",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content showUnderlay>\n <Dialog.Body>\n <Flex direction="column" gap="8px" align="flex-start">\n <Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content>\n <Flyout.Header>Header</Flyout.Header>\n <Flyout.Body>I am a flyout</Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>\n\n <Tooltip.Root>\n <Tooltip.Trigger>\n <Button>I am a tooltip, hover me</Button>\n </Tooltip.Trigger>\n <Tooltip.Content side="left">Tooltip content</Tooltip.Content>\n </Tooltip.Root>\n\n <Flyout.Root>\n <ButtonWithTooltip\n text="Open flyout (and I am a tooltip too)"\n tooltipText="Tooltip text"\n />\n <Flyout.Content>\n <Flyout.Header>Header</Flyout.Header>\n <Flyout.Body>I am a flyout</Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>\n </Flex>\n </Dialog.Body>\n\n <Dialog.Footer>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "WithButtonInTheHeader",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content>
 <Dialog.Header>
 <Flex justify="space-between" align="center" width="100%" pr="1rem">
 <Dialog.Title>Header</Dialog.Title>
 <Button
 emphasis="default"
 onPress={() => {
 alert('Button in the header clicked');
 }}
 >
 Button in the header
 </Button>
 </Flex>
 </Dialog.Header>
 <Dialog.Body />
 <Dialog.Footer>
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "WithTooltip",
    description: "",
    isCanonical: false,
    code: "<Dialog.Root>\n <Tooltip.Root>\n <Tooltip.Trigger asChild>\n <span style={{ display: 'inline-flex' }}>\n <Dialog.Trigger asChild>\n <Button>Trigger</Button>\n </Dialog.Trigger>\n </span>\n </Tooltip.Trigger>\n <Tooltip.Content>Dropdown tooltip</Tooltip.Content>\n </Tooltip.Root>\n <Dialog.Content>\n <Dialog.Body />\n </Dialog.Content>\n </Dialog.Root>"
  },
  {
    name: "WithScrollArea",
    description: "",
    isCanonical: false,
    code: '<Dialog.Root>\n <Dialog.Trigger>\n <Button>Open dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content >\n <Dialog.Header showCloseButton>\n <Dialog.Title>Dialog with ScrollArea</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body padding="none">\n <ScrollArea maxHeight="400px" padding="comfortable">\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut\n labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\n cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n <br />\n <br />\n Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque\n laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi\n architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione\n voluptatem sequi nesciunt.\n <br />\n <br />\n Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci\n velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam\n quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis\n suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?\n <br />\n <br />\n Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae\n consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et\n accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti\n atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non\n provident.\n <br />\n <br />\n Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta\n nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere\n possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n <br />\n <br />\n Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut\n et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a\n sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis\n doloribus asperiores repellat.\n <br />\n <br />\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim\n nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt\n nunc pulvinar sapien et ligula ullamcorper malesuada proin libero.\n </ScrollArea>\n </Dialog.Body>\n <Dialog.Footer>\n <Button emphasis="default">Cancel</Button>\n <Button>Submit</Button>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>'
  },
  {
    name: "OnEscapeKeyDown",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content
 
 onEscapeKeyDown={() => {
 alert('Escape key was pressed!');
 }}
 >
 <Dialog.Header>
 <Dialog.Title>Dialog with onEscapeKeyDown</Dialog.Title>
 </Dialog.Header>
 <Dialog.Body>
 This dialog will show an alert when you press the Escape key, then close normally.
 </Dialog.Body>
 <Dialog.Footer>
 <Button emphasis="default">Cancel</Button>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "PreventCloseOnEscape",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content
 
 onEscapeKeyDown={(event) => {
 event.preventDefault();
 alert('Escape key pressed, but dialog will not close!');
 }}
 >
 <Dialog.Header>
 <Dialog.Title>Dialog preventing close on Escape</Dialog.Title>
 </Dialog.Header>
 <Dialog.Body>
 This dialog prevents closing when Escape is pressed. You must use the Cancel button or close
 button to close it.
 </Dialog.Body>
 <Dialog.Footer>
 <Dialog.Close>
 <Button emphasis="default">Cancel</Button>
 </Dialog.Close>
 <Button>Submit</Button>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  },
  {
    name: "NestedDialogsWithEscapeKey",
    description: "",
    isCanonical: false,
    code: '<Flex direction="column" gap="16px">\n <div>\n <strong>Outer Dialog Escape Count:</strong> {outerEscapeCount}\n </div>\n <div>\n <strong>Inner Dialog Escape Count:</strong> {innerEscapeCount}\n </div>\n\n <Dialog.Root>\n <Dialog.Trigger>\n <Button>Open Outer Dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content\n \n showUnderlay\n onEscapeKeyDown={() => {\n setOuterEscapeCount((prev) => prev + 1);\n }}\n >\n <Dialog.Header>\n <Dialog.Title>Outer Dialog</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body>\n <Flex direction="column" gap="16px">\n <p>\n This is the outer dialog. Press Escape to close it, or open the inner dialog below.\n </p>\n\n <Dialog.Root>\n <Dialog.Trigger>\n <Button>Open Inner Dialog</Button>\n </Dialog.Trigger>\n <Dialog.Content\n showUnderlay\n onEscapeKeyDown={() => {\n setInnerEscapeCount((prev) => prev + 1);\n }}\n >\n <Dialog.Header>\n <Dialog.Title>Inner Dialog</Dialog.Title>\n </Dialog.Header>\n <Dialog.Body>\n <p>\n This is the inner dialog. When you press Escape, this dialog closes\n first, and the outer dialog remains open. Press Escape again to close\n the outer dialog.\n </p>\n </Dialog.Body>\n <Dialog.Footer>\n <Dialog.Close>\n <Button emphasis="default">Close Inner</Button>\n </Dialog.Close>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>\n </Flex>\n </Dialog.Body>\n <Dialog.Footer>\n <Dialog.Close>\n <Button emphasis="default">Close Outer</Button>\n </Dialog.Close>\n </Dialog.Footer>\n </Dialog.Content>\n </Dialog.Root>\n </Flex>'
  },
  {
    name: "WithTabsInContent",
    description: "",
    isCanonical: false,
    code: `<Dialog.Root>
 <Dialog.Trigger>
 <Button>Open Settings Dialog</Button>
 </Dialog.Trigger>
 <Dialog.Content padding="none" minWidth="min(800px, 95vw)" minHeight="min(500px, 80vh)">
 {/* Screen reader only title and description for accessibility */}
 <Dialog.Title screenReaderOnly>Settings</Dialog.Title>
 <Dialog.Description screenReaderOnly>Manage your application settings</Dialog.Description>
 <Dialog.Body padding="none">
 <Tabs.Root variant="pill" withDivider padding="none">
 <Tabs.Tab value="general">
 <Tabs.Trigger>General</Tabs.Trigger>
 <Tabs.Content>
 <div style={{ padding: '24px' }}>
 <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>
 <strong>Search</strong>
 </h3>
 <div style={{ marginBottom: '24px' }}>
 <div style={{ marginBottom: '8px', fontWeight: 500 }}>
 Cross-guideline search
 </div>
 <p
 style={{
 margin: 0,
 color: 'var(--color-secondary-default)',
 fontSize: '14px',
 }}
 >
 Allow users to find results from all the guidelines they have access to
 within the current brand.
 </p>
 </div>
 <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>
 <strong>Action Toolbar</strong>
 </h3>
 <div style={{ marginBottom: '16px' }}>
 <div style={{ marginBottom: '8px', fontWeight: 500 }}>Apps</div>
 <p
 style={{
 margin: 0,
 color: 'var(--color-secondary-default)',
 fontSize: '14px',
 }}
 >
 Make any installed apps for guidelines available for all logged-in
 users.
 </p>
 </div>
 <div style={{ marginBottom: '16px' }}>
 <div style={{ marginBottom: '8px', fontWeight: 500 }}>Copy link</div>
 <p
 style={{
 margin: 0,
 color: 'var(--color-secondary-default)',
 fontSize: '14px',
 }}
 >
 Enable logged-in users to quickly copy and share links to guideline
 pages.
 </p>
 </div>
 </div>
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="team">
 <Tabs.Trigger>Team</Tabs.Trigger>
 <Tabs.Content>
 <div style={{ padding: '24px' }}>
 <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
 <strong>Team Settings</strong>
 </h3>
 <p>Manage team members, roles, and permissions for your organization.</p>
 </div>
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="targets">
 <Tabs.Trigger>Targets</Tabs.Trigger>
 <Tabs.Content>
 <div style={{ padding: '24px' }}>
 <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
 <strong>Target Settings</strong>
 </h3>
 <p>Configure deployment targets and environments for your projects.</p>
 </div>
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="share">
 <Tabs.Trigger>Share</Tabs.Trigger>
 <Tabs.Content>
 <div style={{ padding: '24px' }}>
 <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
 <strong>Share Settings</strong>
 </h3>
 <p>Control how content is shared with external users and collaborators.</p>
 </div>
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="analytics">
 <Tabs.Trigger>Analytics</Tabs.Trigger>
 <Tabs.Content>
 <div style={{ padding: '24px' }}>
 <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
 <strong>Analytics Settings</strong>
 </h3>
 <p>View and configure analytics tracking and reporting options.</p>
 </div>
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="changelog">
 <Tabs.Trigger>Changelog</Tabs.Trigger>
 <Tabs.Content>
 <div style={{ padding: '24px' }}>
 <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
 <strong>Changelog</strong>
 </h3>
 <p>View recent changes and updates to your application settings.</p>
 </div>
 </Tabs.Content>
 </Tabs.Tab>
 </Tabs.Root>
 </Dialog.Body>
 <Dialog.Footer showBorder padding="compact">
 <Dialog.Close>
 <Button>Close</Button>
 </Dialog.Close>
 </Dialog.Footer>
 </Dialog.Content>
 </Dialog.Root>`
  }
];
const instructions$u = "Compose as Dialog.Root > Dialog.Trigger + Dialog.Content. Inside Dialog.Content use Dialog.Header, Dialog.Body, and Dialog.Footer for standard layout. Always include Dialog.Title (can be screenReaderOnly) for accessibility. Use Dialog.Description for additional context announced to screen readers. Wrap cancel buttons in Dialog.Close to auto-close on click. Use showUnderlay on Dialog.Content to dim the page behind the modal. Use Flyout for non-blocking contextual panels instead.";
const typeDefinitions$u = {
  CommonAriaProps: '{\n    /**\n     * Aria label for the component.\n     */\n    "aria-label"?: string;\n    /**\n     * Aria label for the component when it is hidden.\n     */\n    "aria-hidden"?: boolean;\n    /**\n     * Aria role for the component.\n     */\n    role?: string;\n    /**\n     * Aria described by for the component.\n     */\n    "aria-describedby"?: string;\n    /**\n     * Aria labelled by for the component.\n     */\n    "aria-labelledby"?: string;\n    /**\n     * Aria expanded for the component.\n     */\n    "aria-expanded"?: boolean;\n    /**\n     * Aria has popup for the component.\n     */\n    "aria-haspopup"?: boolean;\n}'
};
const __vite_glob_0_7 = {
  name: name$u,
  description: description$u,
  status: status$u,
  category: category$u,
  tags: tags$u,
  relatedComponents: relatedComponents$u,
  importStatement: importStatement$u,
  props: props$u,
  subComponents: subComponents$u,
  examples: examples$u,
  instructions: instructions$u,
  typeDefinitions: typeDefinitions$u
};
const name$t = "Divider";
const description$t = "A visual separator between content sections, either horizontal or vertical. Use to establish a clear visual hierarchy in the UI. They should be subtle and not overpower the content they are meant to organize.";
const status$t = "released";
const category$t = "layout";
const tags$t = [
  "divider",
  "separator",
  "rule"
];
const relatedComponents$t = [];
const importStatement$t = "import { Divider } from '@frontify/fondue/components';";
const props$t = [
  {
    name: "variant",
    type: '"noline" | "dashed" | "solid"',
    required: false,
    defaultValue: "solid",
    description: "The style of the divider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "padding",
    type: '"none" | "small" | "medium" | "large"',
    required: false,
    defaultValue: "medium",
    description: "The padding of the divider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "color",
    type: '"weak" | "default" | "strong"',
    required: false,
    defaultValue: "default",
    description: "The color of the divider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "direction",
    type: '"horizontal" | "vertical"',
    required: false,
    defaultValue: "horizontal",
    description: "The direction of the divider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "as",
    type: '"div" | "li"',
    required: false,
    defaultValue: "div",
    description: "The html element to be used",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "decorative",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "When `true`, signifies that it is purely visual, carries no semantic\nmeaning, and ensures it is not present in the accessibility tree.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-divider",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$t = [];
const examples$t = [
  {
    name: "Primary",
    description: "",
    isCanonical: true,
    code: "<Divider color='default' variant='solid' padding='medium' direction='horizontal' />"
  },
  {
    name: "CustomColor",
    description: "",
    isCanonical: false,
    code: "<Divider color='strong' variant='solid' padding='medium' direction='horizontal' />"
  },
  {
    name: "CustomStyle",
    description: "",
    isCanonical: false,
    code: "<Divider color='default' variant='dashed' padding='medium' direction='horizontal' />"
  },
  {
    name: "CustomHeight",
    description: "",
    isCanonical: false,
    code: "<Divider color='default' variant='solid' padding='large' direction='horizontal' />"
  },
  {
    name: "Vertical",
    description: "",
    isCanonical: false,
    code: "<Divider color='default' variant='solid' padding='medium' direction='vertical' />"
  }
];
const instructions$t = "Use direction='vertical' for inline dividers between horizontal elements. Set decorative=true when the divider is purely visual and should be hidden from screen readers. Use as='li' when the divider appears inside a list. The padding prop controls spacing around the line, not the line thickness.";
const typeDefinitions$t = {};
const __vite_glob_0_8 = {
  name: name$t,
  description: description$t,
  status: status$t,
  category: category$t,
  tags: tags$t,
  relatedComponents: relatedComponents$t,
  importStatement: importStatement$t,
  props: props$t,
  subComponents: subComponents$t,
  examples: examples$t,
  instructions: instructions$t,
  typeDefinitions: typeDefinitions$t
};
const name$s = "Dropdown";
const description$s = "A contextual action menu that opens relative to a trigger element. Use for lists of actions or navigation options that don't require value selection.";
const status$s = "released";
const category$s = "overlay";
const tags$s = [
  "dropdown",
  "menu",
  "select"
];
const relatedComponents$s = [
  "Select",
  "Flyout"
];
const importStatement$s = "import { Dropdown } from '@frontify/fondue/components';";
const props$s = [];
const subComponents$s = [
  {
    name: "Dropdown.Root",
    props: [
      {
        name: "modal",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Controls the open state of the dropdown.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        defaultValue: null,
        description: "Callback that is called when the open state of the dropdown changes.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.SubMenu",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.Trigger",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.Content",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        required: false,
        defaultValue: "start",
        description: "Defines the alignment of the dropdown.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        required: false,
        defaultValue: "bottom",
        description: "Defines the preferred side of the dropdown. It will not be respected if there are collisions with the viewport.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "triggerOffset",
        type: '"compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Defines the spacing between the dropdown and its trigger.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "preventTriggerFocusOnClose",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Prevents the focus from being set on the trigger when the dropdown is closed.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "viewportCollisionPadding",
        type: '"compact" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the minimum distance between the dropdown and the viewport edge",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "forceMount",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "When true, the content will always be mounted in the DOM. Before enabling, make sure you really need it.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the escape key is pressed.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.Group",
    props: [
      {
        name: "heading",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.SubTrigger",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.SubContent",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.Item",
    props: [
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Disables the item.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "textValue",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The text value of the item that is passed to the onSelect callback.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "emphasis",
        type: '"default" | "danger"',
        required: false,
        defaultValue: "default",
        description: "The style of the item.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onSelect",
        type: "(event: Event) => void",
        required: false,
        defaultValue: null,
        description: "Callback that is called when the item is selected.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "If true, the item props will be passed to the child element.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Dropdown.Slot",
    props: [
      {
        name: "name",
        type: '"right" | "left"',
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-dropdown-slot",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$s = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>"
  },
  {
    name: "LinkItems",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item asChild onSelect={() => {}}>\n <a href="https://frontify.com">\n Link 1\n {/* <Dropdown.Slot name="right">\n <IconIcon size={16} />\n </Dropdown.Slot> */}\n </a>\n </Dropdown.Item>\n <Dropdown.Item asChild onSelect={() => {}}>\n <a href="https://frontify.com">\n Link 2\n <Dropdown.Slot name="left">\n <IconIcon size={16} />\n </Dropdown.Slot>\n </a>\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>\n <span>Item 3</span>\n </Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "DisabledItems",
    description: "",
    isCanonical: false,
    code: "<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}} disabled>\n Item 2\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>"
  },
  {
    name: "DangerItems",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}} emphasis="danger">\n Item 2\n <Dropdown.Slot name="right">\n <IconIcon size={16} />\n </Dropdown.Slot>\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "ItemGroups",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Group>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Group>\n <Dropdown.Group>\n <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>\n </Dropdown.Group>\n <Dropdown.Group>\n <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>\n </Dropdown.Group>\n <Dropdown.Group heading="hello world">\n <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>\n </Dropdown.Group>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "MultipleGroupsWithHeadings",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Group heading="File Actions">\n <Dropdown.Item onSelect={() => {}}>New File</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Open File</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Save File</Dropdown.Item>\n </Dropdown.Group>\n <Dropdown.Group heading="Edit Actions">\n <Dropdown.Item onSelect={() => {}}>Copy</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Paste</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Cut</Dropdown.Item>\n </Dropdown.Group>\n <Dropdown.Group heading="View Options">\n <Dropdown.Item onSelect={() => {}}>Zoom In</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Zoom Out</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Reset Zoom</Dropdown.Item>\n </Dropdown.Group>\n <Dropdown.Group heading="Settings">\n <Dropdown.Item onSelect={() => {}}>Preferences</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>About</Dropdown.Item>\n </Dropdown.Group>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "SubMenus",
    description: "",
    isCanonical: false,
    code: "<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n <Dropdown.SubMenu>\n <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>\n <Dropdown.SubContent>\n <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>\n </Dropdown.SubContent>\n </Dropdown.SubMenu>\n <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>"
  },
  {
    name: "OverflowingText",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item asChild onSelect={() => {}}>\n <a href="https://frontify.com">\n Link 2 - This is a very long text that overflows the element it is contained in\n <Dropdown.Slot name="right">\n <IconIcon size={16} />\n </Dropdown.Slot>\n </a>\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n <Dropdown.SubMenu>\n <Dropdown.SubTrigger>\n Item 4 - This is a very long text that overflows the element it is contained in\n </Dropdown.SubTrigger>\n <Dropdown.SubContent>\n <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>\n Item 4.2 - This is a very long text that overflows the element it is contained in\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>\n </Dropdown.SubContent>\n </Dropdown.SubMenu>\n <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "Decorator",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>\n <Dropdown.Slot name="left">\n <IconIcon size={16} />\n </Dropdown.Slot>\n Left decorator\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>\n <Dropdown.Slot name="right">\n <IconIcon size={16} />\n </Dropdown.Slot>\n Right decorator\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>\n <Dropdown.Slot>\n <IconIcon size={16} />\n </Dropdown.Slot>\n Implicit placement left\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>\n <Dropdown.Slot>\n <IconIcon size={16} />\n </Dropdown.Slot>\n <Dropdown.Slot>\n <IconIcon size={16} />\n </Dropdown.Slot>\n Implicit placement both\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "CustomItem",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>\n <div className="tw-bg-highlight">test bla</div>\n </Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "ControlledComponent",
    description: "",
    isCanonical: false,
    code: '<>\n <Button onPress={() => setIsOpen(!isOpen)}>External Toggle Dropdown</Button>\n <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>\n <Dropdown.Trigger>\n <Button variant="loud">Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>\n </>'
  },
  {
    name: "Overflow",
    description: "",
    isCanonical: false,
    code: '<>\n {Array.from({ length: 4 }).map((_, index) => (\n <Dropdown.Root key={index}>\n <Dropdown.Trigger>\n <Button variant="loud">Trigger 1</Button>\n </Dropdown.Trigger>\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 9</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 10</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>\n ))}\n </>'
  },
  {
    name: "RightSide",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content side="right">\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "WithTooltip",
    description: "",
    isCanonical: false,
    code: "<Dropdown.Root >\n <Tooltip.Root>\n <Tooltip.Trigger asChild>\n <Dropdown.Trigger asChild>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n </Tooltip.Trigger>\n <Tooltip.Content>Dropdown tooltip</Tooltip.Content>\n </Tooltip.Root>\n\n <Dropdown.Content>\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>"
  },
  {
    name: "SpaciousTriggerOffset",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content triggerOffset="spacious">\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "SpaciousViewportCollisionPadding",
    description: "",
    isCanonical: false,
    code: '<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content viewportCollisionPadding="spacious">\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>'
  },
  {
    name: "OnEscapeKeyDown",
    description: "",
    isCanonical: false,
    code: "<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content\n onEscapeKeyDown={() => {\n alert('Escape key was pressed!');\n }}\n >\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>"
  },
  {
    name: "PreventCloseOnEscape",
    description: "",
    isCanonical: false,
    code: "<Dropdown.Root >\n <Dropdown.Trigger>\n <Button>Trigger</Button>\n </Dropdown.Trigger>\n <Dropdown.Content\n onEscapeKeyDown={(event) => {\n event.preventDefault();\n alert('Escape key pressed, but dropdown will not close!');\n }}\n >\n <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>\n <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>\n </Dropdown.Content>\n </Dropdown.Root>"
  }
];
const instructions$s = "Compose as Dropdown.Root > Dropdown.Trigger + Dropdown.Content > Dropdown.Item. Use Dropdown.Group to group related items — provide a heading prop for labeled groups. Use Dropdown.SubMenu > Dropdown.SubTrigger + Dropdown.SubContent for nested menus. Use Dropdown.Slot with name='left' or 'right' inside Dropdown.Item to add icon decorators. Use emphasis='danger' on Dropdown.Item for destructive actions. Use Select instead when users need to pick a value from a list.";
const typeDefinitions$s = {};
const __vite_glob_0_9 = {
  name: name$s,
  description: description$s,
  status: status$s,
  category: category$s,
  tags: tags$s,
  relatedComponents: relatedComponents$s,
  importStatement: importStatement$s,
  props: props$s,
  subComponents: subComponents$s,
  examples: examples$s,
  instructions: instructions$s,
  typeDefinitions: typeDefinitions$s
};
const name$r = "EditableText";
const description$r = "An inline text element that becomes editable on click. Use for in-place renaming or editing of labels without opening a separate input field.";
const status$r = "released";
const category$r = "input";
const tags$r = [
  "editable",
  "text",
  "inline-edit"
];
const relatedComponents$r = [
  "TextInput",
  "Textarea"
];
const importStatement$r = "import { EditableText } from '@frontify/fondue/components';";
const props$r = [
  {
    name: "onChange",
    type: "(value: string) => void",
    required: false,
    defaultValue: null,
    description: "Callback fired with the plain text value when editing is confirmed (on blur or Enter).\nOnly fires if the value has actually changed.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "asChild",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "When true, renders the child element instead of a default span,\nmerging all editable props onto it.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "hugWidth",
    type: "boolean",
    required: false,
    defaultValue: "true",
    description: "When true, the EditableText only takes the width of the content.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Accessible label for the editable text field.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-editable-text",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$r = [];
const examples$r = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<EditableText>\n  Click to edit this text\n</EditableText>"
  },
  {
    name: "AsHeading",
    description: "",
    isCanonical: false,
    code: '<EditableText asChild>\n  (\n            <Heading as="h1" size="x-large">\n                Editable Heading\n            </Heading>\n        )\n</EditableText>'
  },
  {
    name: "CustomTextStyling",
    description: "",
    isCanonical: false,
    code: '<EditableText asChild>\n  <p className="tw-body-small-x-strong">Editable Text</p>\n</EditableText>'
  },
  {
    name: "FullWidth",
    description: "",
    isCanonical: false,
    code: "<EditableText>\n  Click to edit this text\n</EditableText>"
  },
  {
    name: "triggerEditingExternally",
    description: "",
    isCanonical: false,
    code: "<Flex gapX={8}>\n <EditableText ref={editableTextRef} />\n <Button\n onPress={() => {\n editableTextRef.current?.focus();\n }}\n >\n Edit\n </Button>\n </Flex>"
  }
];
const instructions$r = "onChange fires only when the value has changed, on blur or Enter key. Use asChild to wrap a custom element (e.g. a Heading) and make it editable — the child receives all editable props. Use hugWidth=false to make the component fill its container width. Trigger editing programmatically by calling focus() on a ref. Use TextInput for form fields with validation or labels.";
const typeDefinitions$r = {};
const __vite_glob_0_10 = {
  name: name$r,
  description: description$r,
  status: status$r,
  category: category$r,
  tags: tags$r,
  relatedComponents: relatedComponents$r,
  importStatement: importStatement$r,
  props: props$r,
  subComponents: subComponents$r,
  examples: examples$r,
  instructions: instructions$r,
  typeDefinitions: typeDefinitions$r
};
const name$q = "Flex";
const description$q = "A flexbox layout container for arranging children in a row or column with alignment, justification, and gap control. Use as the primary layout tool for linear arrangements.";
const status$q = "released";
const category$q = "layout";
const tags$q = [
  "flex",
  "flexbox",
  "layout"
];
const relatedComponents$q = [
  "Box",
  "Grid"
];
const importStatement$q = "import { Flex } from '@frontify/fondue/components';";
const props$q = [
  {
    name: "m",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mx",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "my",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "ml",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "p",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "px",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "py",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pl",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "width",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "height",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflow",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowX",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowY",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The vertical overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "position",
    type: "Responsive<PositionValue>",
    required: false,
    defaultValue: null,
    description: "The position property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "top",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "right",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "bottom",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "left",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "as",
    type: '"div" | "span"',
    required: false,
    defaultValue: "div",
    description: "The element to render the Flex component as.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "display",
    type: 'Responsive<"none" | "flex" | "inline-flex">',
    required: false,
    defaultValue: "'flex'",
    description: "The display property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "direction",
    type: 'Responsive<"row" | "row-reverse" | "column" | "column-reverse">',
    required: false,
    defaultValue: "'row'",
    description: "The direction of the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "align",
    type: 'Responsive<"flex-start" | "center" | "flex-end" | "stretch" | "baseline">',
    required: false,
    defaultValue: null,
    description: "The alignment of the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "justify",
    type: 'Responsive<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">',
    required: false,
    defaultValue: null,
    description: "The justification of the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "wrap",
    type: 'Responsive<"wrap" | "nowrap" | "wrap-reverse">',
    required: false,
    defaultValue: null,
    description: "The wrap property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "gap",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The gap between the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "gapX",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal gap between the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "gapY",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The vertical gap between the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-flex",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$q = [];
const examples$q = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Flex gap={4} direction='column'>\n <Flex gapX={3}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n <Flex gapX={3}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n </Flex>"
  },
  {
    name: "PixelValues",
    description: "",
    isCanonical: false,
    code: `<Flex gap='16px' direction='column'>
 <Flex gapX="12px">
 <DecorativeBox />
 <DecorativeBox />
 <DecorativeBox />
 <DecorativeBox />
 <DecorativeBox />
 </Flex>
 <Flex gapX="12px">
 <DecorativeBox />
 <DecorativeBox />
 <DecorativeBox />
 <DecorativeBox />
 <DecorativeBox />
 </Flex>
 </Flex>`
  },
  {
    name: "Nested",
    description: "",
    isCanonical: false,
    code: "<Flex gap={4} direction='column'>\n <Flex gapX={3}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <Flex>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n </Flex>\n <Flex p={5}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <Flex gapX={3}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n </Flex>\n </Flex>"
  },
  {
    name: "Responsive",
    description: "",
    isCanonical: false,
    code: "<Flex\n gap={4} direction='column'\n direction={{\n base: 'row',\n sm: 'column',\n }}\n >\n <Flex\n gapX={{ sm: '10px' }}\n gapY={{ base: '10px', sm: 0 }}\n direction={{\n base: 'column',\n sm: 'row',\n }}\n >\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n\n <Flex\n gapX={{ sm: '10px' }}\n gapY={{ base: '10px', sm: 0 }}\n direction={{\n base: 'column',\n sm: 'row',\n }}\n >\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n </Flex>"
  },
  {
    name: "WithSizeToken",
    description: "",
    isCanonical: false,
    code: "<Flex gap={4} direction='column'>\n <Flex px={36} gapX={12}>\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n <Flex p={5}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Flex>\n </Flex>"
  }
];
const instructions$q = "All props (direction, gap, align, justify, wrap, spacing) support responsive objects with breakpoint keys (base, xs, sm, md, lg, xl, 2xl). Gap accepts design token numbers or pixel strings. Use as='span' for inline-flex contexts. Use Grid when you need two-dimensional column/row layouts.";
const typeDefinitions$q = {
  Responsive: "({\n    [key in Breakpoint]?: TValue;\n} & {\n    base?: TValue;\n}) | TValue",
  SizeValue: 'SpacingValue | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content"',
  SpacingValue: "// `(string & {})` and `(number & {})` allows for arbitrary strings/numbers to be passed in while keeping the suggestion of the union type\n(string & {}) | (number & {}) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64",
  OverflowValue: '"visible" | "hidden" | "clip" | "scroll" | "auto"',
  PositionValue: '"static" | "fixed" | "absolute" | "relative" | "sticky"',
  Breakpoint: "keyof typeof screens"
};
const __vite_glob_0_11 = {
  name: name$q,
  description: description$q,
  status: status$q,
  category: category$q,
  tags: tags$q,
  relatedComponents: relatedComponents$q,
  importStatement: importStatement$q,
  props: props$q,
  subComponents: subComponents$q,
  examples: examples$q,
  instructions: instructions$q,
  typeDefinitions: typeDefinitions$q
};
const name$p = "Flyout";
const description$p = "An anchored popover panel that opens next to a trigger element without blocking page interaction. Use for contextual detail panels, pickers (color, date), and forms that don't require full-screen focus.";
const status$p = "released";
const category$p = "overlay";
const tags$p = [
  "flyout",
  "popover",
  "overlay"
];
const relatedComponents$p = [
  "Dialog",
  "Dropdown",
  "Tooltip"
];
const importStatement$p = "import { Flyout } from '@frontify/fondue/components';";
const props$p = [];
const subComponents$p = [
  {
    name: "Flyout.Root",
    props: [
      {
        name: "modal",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Disable interaction with the rest of the page",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "The controlled `open` state of the flyout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the `open` state changes",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Flyout.Trigger",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-flyout-body",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Flyout.Content",
    props: [
      {
        name: "shadow",
        type: '"none" | "medium" | "large"',
        required: false,
        defaultValue: "medium",
        description: "Add a shadow to the flyout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "rounded",
        type: '"none" | "medium" | "large"',
        required: false,
        defaultValue: "medium",
        description: "Add rounded corners to the flyout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        required: false,
        defaultValue: '"bottom"',
        description: "Define the prefered side of the flyout. Can be overriden by viewport collisions viewport.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        required: false,
        defaultValue: "start",
        description: "Define the prefered alignment of the flyout. Can be overriden by viewport collisions viewport.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "padding",
        type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the padding of the flyout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "width",
        type: "string",
        required: false,
        defaultValue: "fit-content",
        description: "Define the fixed width of the flyout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "triggerOffset",
        type: '"compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Defines the spacing between the dropdown and its trigger.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "maxWidth",
        type: "string",
        required: false,
        defaultValue: "360px",
        description: "Define the maximum width of the flyout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "viewportCollisionPadding",
        type: '"compact" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the minimum distance between the flyout and the viewport edge",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onOpenAutoFocus",
        type: "(event: Event) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when auto-focusing on open",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the escape key is pressed.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-flyout-body",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Flyout.Header",
    props: [
      {
        name: "showCloseButton",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Show a close button in the header",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-flyout-body",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "closeProps",
        type: "CommonAriaProps",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Flyout.Footer",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-flyout-body",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Flyout.Body",
    props: [
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-flyout-body",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "scrollable",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Allow the body to scroll if the max height of the flyout is reached",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$p = [
  {
    name: "BasicContent",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Body />\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "WithHeader",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Header>Header</Flyout.Header>\n <Flyout.Body>I am a flyout</Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "WithFooter",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Body>I am a flyout</Flyout.Body>\n <Flyout.Footer>\n <Button>Submit</Button>\n </Flyout.Footer>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "WithFocusableContent",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Header>Header</Flyout.Header>\n <Flyout.Body >\n <TextInput />\n <TextInput />\n <TextInput />\n </Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "WithHeaderAndFooter",
    description: "",
    isCanonical: true,
    code: "<FlyoutContent>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "WithHeaderAndFooterAndScrollableContent",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Header>Header</Flyout.Header>\n <Flyout.Body scrollable>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur voluptate velit esse\n cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\n culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\n minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n mollit anim id est laborum.\n </Flyout.Body>\n <Flyout.Footer>\n <Button>Submit</Button>\n </Flyout.Footer>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "WithCloseButton",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Header showCloseButton>Header</Flyout.Header>\n <Flyout.Body>I am a flyout</Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "WithNoPadding",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent padding='none'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "WithTightPadding",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent padding='tight'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "WithComfortablePadding",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent padding='comfortable'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "WithSpaciousPadding",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent padding='spacious'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "WithCustomContent",
    description: "",
    isCanonical: false,
    code: '<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <div className="tw-bg-container-secondary tw-p-10">This is FlyoutContent</div>\n </Flyout.Content>\n </Flyout.Root>'
  },
  {
    name: "RightSide",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent side='right'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "AlignCenter",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent side='right' align='center'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "AlignEnd",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent side='right' align='end'>\n  Hello World\n</FlyoutContent>"
  },
  {
    name: "LongContent",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent side='bottom'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n</FlyoutContent>"
  },
  {
    name: "WithCustomWidth",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent width='500px' side='bottom'>\n  Lorem ipsum dolor sit amet.\n</FlyoutContent>"
  },
  {
    name: "WithCustomMaxWidth",
    description: "",
    isCanonical: false,
    code: "<FlyoutContent maxWidth='200px' side='bottom'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n</FlyoutContent>"
  },
  {
    name: "MobileView",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Header showCloseButton>Header</Flyout.Header>\n <Flyout.Body>I am a flyout</Flyout.Body>\n <Flyout.Footer>\n <Button>Submit</Button>\n </Flyout.Footer>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "MobileViewBottom",
    description: "",
    isCanonical: false,
    code: '<Flyout.Root>\n <Flyout.Trigger>\n <Button className="tw-mt-[590px] tw-ml-28">Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content >\n <Flyout.Header showCloseButton>Header</Flyout.Header>\n <Flyout.Body>I am a flyout</Flyout.Body>\n <Flyout.Footer>\n <Button>Submit</Button>\n </Flyout.Footer>\n </Flyout.Content>\n </Flyout.Root>'
  },
  {
    name: "Overflow",
    description: "",
    isCanonical: false,
    code: "<>\n {Array.from({ length: 4 }).map((_, index) => (\n <Flyout.Root key={index}>\n <Flyout.Trigger>\n <Button>Trigger {index}</Button>\n </Flyout.Trigger>\n <Flyout.Content>\n <Flyout.Header>Flyout {index}</Flyout.Header>\n <Flyout.Body>\n <p>Lorem ipsum dolor sit amet</p>\n <p>Lorem ipsum dolor sit amet</p>\n <p>Lorem ipsum dolor sit amet</p>\n <p>Lorem ipsum dolor sit amet</p>\n <p>Lorem ipsum dolor sit amet</p>\n <p>Lorem ipsum dolor sit amet</p>\n </Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>\n ))}\n </>"
  },
  {
    name: "WithTooltip",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Tooltip.Root>\n <Tooltip.Trigger asChild>\n <Flyout.Trigger asChild>\n <Button>Trigger</Button>\n </Flyout.Trigger>\n </Tooltip.Trigger>\n <Tooltip.Content>Flyout tooltip</Tooltip.Content>\n </Tooltip.Root>\n <Flyout.Content>\n <Flyout.Body />\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "SpaciousTriggerOffset",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content triggerOffset='spacious'>\n <Flyout.Body triggerOffset='spacious' />\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "SpaciousViewportCollisionPadding",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content viewportCollisionPadding='spacious'>\n <Flyout.Body viewportCollisionPadding='spacious' />\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "OnEscapeKeyDown",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content\n \n onEscapeKeyDown={() => {\n alert('Escape key was pressed!');\n }}\n >\n <Flyout.Header>Flyout with onEscapeKeyDown</Flyout.Header>\n <Flyout.Body>\n This flyout will show an alert when you press the Escape key, then close normally.\n </Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>"
  },
  {
    name: "PreventCloseOnEscape",
    description: "",
    isCanonical: false,
    code: "<Flyout.Root>\n <Flyout.Trigger>\n <Button>Open flyout</Button>\n </Flyout.Trigger>\n <Flyout.Content\n \n onEscapeKeyDown={(event) => {\n event.preventDefault();\n alert('Escape key pressed, but flyout will not close!');\n }}\n >\n <Flyout.Header showCloseButton>Flyout preventing close on Escape</Flyout.Header>\n <Flyout.Body>\n This flyout prevents closing when Escape is pressed. You must use the close button to close it.\n </Flyout.Body>\n </Flyout.Content>\n </Flyout.Root>"
  }
];
const instructions$p = "Compose as Flyout.Root > Flyout.Trigger + Flyout.Content. Inside Flyout.Content use Flyout.Header, Flyout.Body, and Flyout.Footer for standard layout. Use Flyout.Body with scrollable prop for long content. Use showCloseButton on Flyout.Header to add a close button. Use Dialog instead when the action requires full-screen focus or blocks all background interaction.";
const typeDefinitions$p = {
  CommonAriaProps: '{\n    /**\n     * Aria label for the component.\n     */\n    "aria-label"?: string;\n    /**\n     * Aria label for the component when it is hidden.\n     */\n    "aria-hidden"?: boolean;\n    /**\n     * Aria role for the component.\n     */\n    role?: string;\n    /**\n     * Aria described by for the component.\n     */\n    "aria-describedby"?: string;\n    /**\n     * Aria labelled by for the component.\n     */\n    "aria-labelledby"?: string;\n    /**\n     * Aria expanded for the component.\n     */\n    "aria-expanded"?: boolean;\n    /**\n     * Aria has popup for the component.\n     */\n    "aria-haspopup"?: boolean;\n}'
};
const __vite_glob_0_12 = {
  name: name$p,
  description: description$p,
  status: status$p,
  category: category$p,
  tags: tags$p,
  relatedComponents: relatedComponents$p,
  importStatement: importStatement$p,
  props: props$p,
  subComponents: subComponents$p,
  examples: examples$p,
  instructions: instructions$p,
  typeDefinitions: typeDefinitions$p
};
const name$o = "Grid";
const description$o = "A CSS Grid layout container for two-dimensional arrangements of children in rows and columns. Use when content needs to align across both axes.";
const status$o = "released";
const category$o = "layout";
const tags$o = [
  "grid",
  "layout",
  "columns"
];
const relatedComponents$o = [
  "Box",
  "Flex"
];
const importStatement$o = "import { Grid } from '@frontify/fondue/components';";
const props$o = [
  {
    name: "m",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mx",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "my",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "ml",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "p",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "px",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "py",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pl",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "width",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "height",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflow",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowX",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowY",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The vertical overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "position",
    type: "Responsive<PositionValue>",
    required: false,
    defaultValue: null,
    description: "The position property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "top",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "right",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "bottom",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "left",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "as",
    type: '"div" | "span"',
    required: false,
    defaultValue: "div",
    description: "The element to render the Grid component as.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "display",
    type: '"none" | "grid" | "inline-grid"',
    required: false,
    defaultValue: "'grid'",
    description: "The display property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "columns",
    type: "Responsive<string | number>",
    required: false,
    defaultValue: null,
    description: "The columns property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "rows",
    type: "Responsive<string | number>",
    required: false,
    defaultValue: null,
    description: "The rows property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "flow",
    type: 'Responsive<"row" | "column" | "dense" | "row-dense" | "column-dense">',
    required: false,
    defaultValue: null,
    description: "The flow property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "align",
    type: 'Responsive<"start" | "center" | "end" | "baseline" | "stretch">',
    required: false,
    defaultValue: null,
    description: "The alignment of the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "justify",
    type: 'Responsive<"start" | "center" | "end" | "between">',
    required: false,
    defaultValue: null,
    description: "The justification of the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "gap",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The gap between the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "gapX",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal gap between the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "gapY",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The vertical gap between the children.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-grid",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$o = [];
const examples$o = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Grid columns='repeat(3, 1fr)' gap={4}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Grid>"
  },
  {
    name: "GridWithFixedColumnsAndRows",
    description: "",
    isCanonical: false,
    code: "<Grid columns={3} gap={4}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Grid>"
  },
  {
    name: "ResponsiveGrid",
    description: "",
    isCanonical: false,
    code: "<Grid columns={{\n base: 'repeat(1, 1fr)',\n xs: 'repeat(4, 1fr)',\n sm: 'repeat(5, 1fr)',\n md: 'repeat(6, 1fr)',\n '2xl': 'repeat(8, 1fr)',\n }} gap={4}>\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n <DecorativeBox />\n </Grid>"
  }
];
const instructions$o = "The columns prop accepts CSS grid-template-columns values (e.g. 'repeat(3, 1fr)') or a number for equal-width columns. All layout props support responsive breakpoint objects. Use Flex for single-axis (row or column) layouts.";
const typeDefinitions$o = {
  Responsive: "({\n    [key in Breakpoint]?: TValue;\n} & {\n    base?: TValue;\n}) | TValue",
  SizeValue: 'SpacingValue | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content"',
  SpacingValue: "// `(string & {})` and `(number & {})` allows for arbitrary strings/numbers to be passed in while keeping the suggestion of the union type\n(string & {}) | (number & {}) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64",
  OverflowValue: '"visible" | "hidden" | "clip" | "scroll" | "auto"',
  PositionValue: '"static" | "fixed" | "absolute" | "relative" | "sticky"',
  Breakpoint: "keyof typeof screens"
};
const __vite_glob_0_13 = {
  name: name$o,
  description: description$o,
  status: status$o,
  category: category$o,
  tags: tags$o,
  relatedComponents: relatedComponents$o,
  importStatement: importStatement$o,
  props: props$o,
  subComponents: subComponents$o,
  examples: examples$o,
  instructions: instructions$o,
  typeDefinitions: typeDefinitions$o
};
const name$n = "Heading";
const description$n = "A semantic heading element for page and section titles with design-system typography styles. Use for h1–h6 headings and display text.";
const status$n = "released";
const category$n = "typography";
const tags$n = [
  "heading",
  "title",
  "typography"
];
const relatedComponents$n = [
  "Text",
  "Label"
];
const importStatement$n = "import { Heading } from '@frontify/fondue/components';";
const props$n = [
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "as",
    type: '"span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"',
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "color",
    type: '"default" | "weak" | "x-weak" | "disabled" | "negative" | "positive" | "warning" | "interactive"',
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"medium" | "large" | "x-large" | "xx-large"',
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "weight",
    type: '"default" | "strong"',
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "ref",
    type: "ForwardedRef<HeadingElementType<TTag>>",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$n = [];
const examples$n = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Heading>\n  Hello World\n</Heading>"
  }
];
const instructions$n = "Use the as prop to set the HTML element (h1–h6, p, span) and size to set the visual scale — these are independent, allowing semantic markup to differ from visual size. Use weight='strong' for bold headings. Use color to apply semantic text colors.";
const typeDefinitions$n = {
  HeadingElementType: 'TTag extends "span" ? HTMLSpanElement : TTag extends "p" ? HTMLParagraphElement : HTMLHeadingElement'
};
const __vite_glob_0_14 = {
  name: name$n,
  description: description$n,
  status: status$n,
  category: category$n,
  tags: tags$n,
  relatedComponents: relatedComponents$n,
  importStatement: importStatement$n,
  props: props$n,
  subComponents: subComponents$n,
  examples: examples$n,
  instructions: instructions$n,
  typeDefinitions: typeDefinitions$n
};
const name$m = "Label";
const description$m = "A form label that associates visible text with an input element for accessibility. Always use alongside form inputs like TextInput, Checkbox, Select, and Switch.";
const status$m = "released";
const category$m = "typography";
const tags$m = [
  "label",
  "form",
  "typography"
];
const relatedComponents$m = [
  "Text",
  "Heading"
];
const importStatement$m = "import { Label } from '@frontify/fondue/components';";
const props$m = [
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "htmlFor",
    type: "string",
    required: true,
    defaultValue: null,
    description: "The id of the input element the label is associated with",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "required",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Add an asterisk to the label to indicate it is required",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "variant",
    type: '"default" | "strong"',
    required: false,
    defaultValue: "default",
    description: "The variant of the label",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onClick",
    type: "MouseEventHandler<HTMLLabelElement>",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-label",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$m = [];
const examples$m = [
  {
    name: "Mandatory",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-flex-col tw-gap-2">\n <Label required htmlFor="input-mandatory" />\n <STextInput id="input-mandatory" placeholder="Enter your name" />\n </div>'
  },
  {
    name: "WithTextInput",
    description: "",
    isCanonical: true,
    code: '<div className="tw-flex tw-flex-col tw-gap-2">\n <Label htmlFor="input-text" />\n <STextInput id="input-text" placeholder="Enter your name" />\n </div>'
  },
  {
    name: "WithDisabledInput",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-flex-col tw-gap-2">\n <Label htmlFor="input-disabled" />\n <STextInput id="input-disabled" placeholder="Enter your name" disabled />\n </div>'
  },
  {
    name: "WithSelect",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-flex-col tw-gap-2">\n <Label id="label-select" htmlFor="select" />\n <Select id="select" aria-labelledby="label-select" placeholder="Select...">\n <Select.Item value="1">Option 1</Select.Item>\n <Select.Item value="2">Option 2</Select.Item>\n </Select>\n </div>'
  },
  {
    name: "WithCombobox",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-flex-col tw-gap-2">\n <Label id="label-combobox" htmlFor="combobox" />\n <Select.Combobox id="combobox" aria-labelledby="label-combobox" placeholder="Select...">\n <Select.Item value="1">Option 1</Select.Item>\n <Select.Item value="2">Option 2</Select.Item>\n </Select.Combobox>\n </div>'
  },
  {
    name: "WithCheckbox",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-gap-1.5">\n <Checkbox id="input-checkbox" aria-labelledby="label" />\n <Label id="label" htmlFor="input-checkbox" />\n </div>'
  },
  {
    name: "WithTooltip",
    description: "",
    isCanonical: false,
    code: '<div className="tw-flex tw-flex-col tw-gap-1.5">\n <Label required htmlFor="input-tooltip">\n Hello World\n <Tooltip.Root>\n <Tooltip.Trigger>\n <IconQuestionMarkCircle size={16} />\n </Tooltip.Trigger>\n <Tooltip.Content>Tooltip</Tooltip.Content>\n </Tooltip.Root>\n </Label>\n <STextInput id="input-tooltip" placeholder="Enter your name" />\n </div>'
  },
  {
    name: "Strong",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-2">
 <Label variant='strong' htmlFor="input-strong" />
 <STextInput id="input-strong" placeholder="Enter your name" />
 </div>`
  },
  {
    name: "WithInputAndDisabledButtons",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-2">
 <Label htmlFor="input-with-buttons" />
 <TextInput.Root id="input-with-buttons" type="text" defaultValue="50">
 <TextInput.Slot name="right" className="!tw-p-0">
 <Button aspect="square" emphasis="weak" size="small" disabled aria-label="Decrease value">
 <IconMinus size={16} />
 </Button>
 </TextInput.Slot>
 <TextInput.Slot name="right" className="!tw-pl-0 !tw-pr-1">
 <Button aspect="square" emphasis="weak" size="small" aria-label="Increase value">
 <IconPlus size={16} />
 </Button>
 </TextInput.Slot>
 </TextInput.Root>
 <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
 The decrement button is disabled, but the label remains active because TextInput.Slot automatically
 prevents disabled children from affecting the label
 </p>
 </div>`
  },
  {
    name: "WithManualIgnoreDisabled",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <div>
 <Label htmlFor="custom-component" />
 <div className="tw-flex tw-gap-2 tw-mt-2">
 <TextInput
 id="custom-component"
 type="text"
 defaultValue="Custom value"
 className="tw-flex-1"
 />
 <div data-label-ignore-disabled="true" className="tw-flex tw-gap-1">
 <Button emphasis="weak" size="small" disabled aria-label="Action 1">
 Action 1
 </Button>
 <Button emphasis="weak" size="small" disabled aria-label="Action 2">
 Action 2
 </Button>
 </div>
 </div>
 <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
 The action buttons are disabled but don't affect the label because their container has{' '}
 <code>data-label-ignore-disabled=&quot;true&quot;</code>
 </p>
 </div>

 <div>
 <Label htmlFor="without-ignore" variant="strong">
 Without Ignore Attribute
 </Label>
 <div className="tw-flex tw-gap-2 tw-mt-2">
 <TextInput id="without-ignore" type="text" defaultValue="Custom value" className="tw-flex-1" />
 <div className="tw-flex tw-gap-1">
 <Button emphasis="weak" size="small" disabled aria-label="Action 1">
 Action 1
 </Button>
 <Button emphasis="weak" size="small" disabled aria-label="Action 2">
 Action 2
 </Button>
 </div>
 </div>
 <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
 Without the attribute, the label becomes disabled when there are disabled buttons nearby
 </p>
 </div>
 </div>`
  }
];
const instructions$m = "Always provide htmlFor matching the input's id, or use id on the Label with aria-labelledby on the input. Use required prop to show an asterisk indicator. Use variant='strong' for emphasized labels. The Label automatically becomes visually disabled when its associated input is disabled — use data-label-ignore-disabled='true' on sibling containers (like action button groups) to prevent them from affecting the label state.";
const typeDefinitions$m = {};
const __vite_glob_0_15 = {
  name: name$m,
  description: description$m,
  status: status$m,
  category: category$m,
  tags: tags$m,
  relatedComponents: relatedComponents$m,
  importStatement: importStatement$m,
  props: props$m,
  subComponents: subComponents$m,
  examples: examples$m,
  instructions: instructions$m,
  typeDefinitions: typeDefinitions$m
};
const name$l = "Link";
const description$l = "An inline navigation anchor with configurable typography and underline behavior. Use for hyperlinks within text content.";
const status$l = "beta";
const category$l = "typography";
const tags$l = [
  "link",
  "anchor",
  "navigation"
];
const relatedComponents$l = [
  "Button",
  "Text"
];
const importStatement$l = "import { Link } from '@frontify/fondue/components';";
const props$l = [
  {
    name: "href",
    type: "string",
    required: true,
    defaultValue: null,
    description: "The link to navigate to when clicked",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Id of the element",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large"',
    required: false,
    defaultValue: "medium",
    description: "Size of the text",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "weight",
    type: '"medium" | "regular" | "bold"',
    required: false,
    defaultValue: "regular",
    description: "Weight of the font",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "error" | "success" | "warning" | "highlight"',
    required: false,
    defaultValue: "primary",
    description: "Color of the text",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onContainer",
    type: '"disabled" | "secondary" | "error" | "success" | "warning" | "highlight"',
    required: false,
    defaultValue: null,
    description: "The texts color when used within a container",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "truncate",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Truncate the text if it overflows",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "wrap",
    type: '"wrap" | "nowrap"',
    required: false,
    defaultValue: "nowrap",
    description: "Wrap the text if it overflows",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "underline",
    type: '"auto" | "always" | "hover" | "none"',
    required: false,
    defaultValue: "auto",
    description: "Underline behavior of the link",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "target",
    type: "string",
    required: false,
    defaultValue: "'_self'",
    description: "The target attribute for the link",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "rel",
    type: "string",
    required: false,
    defaultValue: "'noopener noreferrer'",
    description: "The rel attribute for the link",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onPress",
    type: "(event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-details",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria details for extend description of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Disable the link",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$l = [];
const examples$l = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Link href='/hello'>\n  Hello Link\n</Link>"
  },
  {
    name: "AllVariants",
    description: "",
    isCanonical: false,
    code: "<Link href='/variants' size='large' weight='bold' color='success' onContainer='secondary' wrap='wrap' underline='always' target='_blank' rel='noopener noreferrer'>\n  All Variants Link\n</Link>"
  },
  {
    name: "Truncated",
    description: "",
    isCanonical: false,
    code: "<div style={{ display: 'flex', width: 180, border: '1px dashed #ccc', padding: 8 }}>\n <Link href='/truncate' truncate size='medium' weight='regular' color='primary' />\n </div>"
  }
];
const instructions$l = "href is required. For SPA navigation, wrap the app with RouterProvider to enable client-side routing. Default target is '_self'; use target='_blank' with rel='noopener noreferrer' for external links (this is the default rel). Use Button instead for actions that don't navigate to a URL.";
const typeDefinitions$l = {};
const __vite_glob_0_16 = {
  name: name$l,
  description: description$l,
  status: status$l,
  category: category$l,
  tags: tags$l,
  relatedComponents: relatedComponents$l,
  importStatement: importStatement$l,
  props: props$l,
  subComponents: subComponents$l,
  examples: examples$l,
  instructions: instructions$l,
  typeDefinitions: typeDefinitions$l
};
const name$k = "LoadingBar";
const description$k = "A horizontal progress bar for showing determinate or indeterminate loading progress. Use for file uploads, multi-step processes, or any operation with measurable progress.";
const status$k = "";
const category$k = "feedback";
const tags$k = [
  "loading",
  "progress",
  "bar"
];
const relatedComponents$k = [
  "LoadingCircle"
];
const importStatement$k = "import { LoadingBar } from '@frontify/fondue/components';";
const props$k = [
  {
    name: "value",
    type: "number",
    required: true,
    defaultValue: "null",
    description: "The current value of the loading bar. If `null`, the loading bar will be in an indeterminate state.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "max",
    type: "number",
    required: false,
    defaultValue: "100",
    description: "The maximum value of the loading bar",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-loading-bar",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "rounded",
    type: "boolean",
    required: false,
    defaultValue: "true",
    description: "Add rounded corners to the loading bar",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "variant",
    type: '"default" | "positive" | "negative"',
    required: false,
    defaultValue: "default",
    description: "The style of the loading bar",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"small" | "medium" | "large" | "x-large"',
    required: false,
    defaultValue: "medium",
    description: "The size of the loading bar",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "getValueLabel",
    type: "(value: number, max: number) => string",
    required: false,
    defaultValue: null,
    description: "The label of the loading bar for accessibility purposes",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: true,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: true,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$k = [];
const examples$k = [];
const instructions$k = "Either aria-label or aria-labelledby is required for accessibility. Pass a numeric value for determinate progress (0 to max, default max=100). Omit value or pass null for indeterminate (animated) state. Use variant to communicate success or failure state. Use LoadingCircle when this layout pattern is not suitable.";
const typeDefinitions$k = {};
const __vite_glob_0_17 = {
  name: name$k,
  description: description$k,
  status: status$k,
  category: category$k,
  tags: tags$k,
  relatedComponents: relatedComponents$k,
  importStatement: importStatement$k,
  props: props$k,
  subComponents: subComponents$k,
  examples: examples$k,
  instructions: instructions$k,
  typeDefinitions: typeDefinitions$k
};
const name$j = "LoadingCircle";
const description$j = "A circular spinner for indicating loading or processing states. Use for inline or overlay loading indicators where a full progress bar is too large.";
const status$j = "";
const category$j = "feedback";
const tags$j = [
  "loading",
  "spinner",
  "progress"
];
const relatedComponents$j = [
  "LoadingBar"
];
const importStatement$j = "import { LoadingCircle } from '@frontify/fondue/components';";
const props$j = [
  {
    name: "variant",
    type: '"progress" | "success" | "danger"',
    required: false,
    defaultValue: "progress",
    description: "The  variant of the loading circle.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"xx-small" | "x-small" | "small" | "medium" | "large"',
    required: false,
    defaultValue: "medium",
    description: "The size of the loading circle",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-loading-circle-content",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$j = [];
const examples$j = [];
const instructions$j = "Use variant='progress' (default) for ongoing loading, 'success' for completion, and 'danger' for failure. Size ranges from xx-small to large — match to the surrounding context. Use for inline or overlay loading indicators where a full progress bar is too large.";
const typeDefinitions$j = {};
const __vite_glob_0_18 = {
  name: name$j,
  description: description$j,
  status: status$j,
  category: category$j,
  tags: tags$j,
  relatedComponents: relatedComponents$j,
  importStatement: importStatement$j,
  props: props$j,
  subComponents: subComponents$j,
  examples: examples$j,
  instructions: instructions$j,
  typeDefinitions: typeDefinitions$j
};
const name$i = "Notice";
const description$i = "An inline alert banner for displaying feedback messages such as errors, warnings, success confirmations, or informational notices. Use to keep users informed without interrupting their workflow by presenting clear, accessible feedback that stays visible until acknowledged.";
const status$i = "released";
const category$i = "feedback";
const tags$i = [
  "notice",
  "alert",
  "message"
];
const relatedComponents$i = [
  "Badge",
  "Tag"
];
const importStatement$i = "import { Notice } from '@frontify/fondue/components';";
const props$i = [
  {
    name: "variant",
    type: '"default" | "highlight" | "positive" | "danger" | "warning"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "emphasis",
    type: '"default" | "strong" | "weak"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"medium" | "large"',
    required: false,
    defaultValue: "medium",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "icon",
    type: "ReactNode",
    required: false,
    defaultValue: null,
    description: "Leading icon element",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "action",
    type: "ReactNode",
    required: false,
    defaultValue: null,
    description: "Action element (typically a button)",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onDismiss",
    type: "(event?: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
    required: false,
    defaultValue: null,
    description: "Callback when the dismiss button is clicked",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Custom aria-label for the dismiss button",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "notice",
    description: "Test ID for the component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    defaultValue: null,
    description: "Message content",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$i = [];
const examples$i = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<Notice variant='default' emphasis='default' size='medium'>Neutral message text</Notice>"
  },
  {
    name: "WithIcon",
    description: "",
    isCanonical: false,
    code: `<Notice variant='default' emphasis='default' size='medium' icon={<IconInfo size="16" />}>
 Neutral message text
 </Notice>`
  },
  {
    name: "WithDismiss",
    description: "",
    isCanonical: false,
    code: `<Notice variant='default' emphasis='default' size='medium' icon={<IconInfo size="16" />}>
 Neutral message text
 </Notice>`
  },
  {
    name: "WithAction",
    description: "",
    isCanonical: false,
    code: `<Notice
 variant='default' emphasis='default' size='medium'
 icon={<IconInfo size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 >
 Neutral message text
 </Notice>`
  },
  {
    name: "WithActionAndDismiss",
    description: "",
    isCanonical: false,
    code: `<Notice
 variant='default' emphasis='default' size='medium'
 icon={<IconInfo size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 >
 Neutral message text
 </Notice>`
  },
  {
    name: "VariantHighlight",
    description: "",
    isCanonical: false,
    code: `<Notice variant='highlight' emphasis='default' size='medium' icon={<IconInfo size="16" />}>
 Highlight message text
 </Notice>`
  },
  {
    name: "VariantPositive",
    description: "",
    isCanonical: false,
    code: `<Notice variant='positive' emphasis='default' size='medium' icon={<IconCheckMark size="16" />}>
 Success message text
 </Notice>`
  },
  {
    name: "VariantDanger",
    description: "",
    isCanonical: false,
    code: `<Notice variant='danger' emphasis='default' size='medium' icon={<IconExclamationMarkTriangle size="16" />}>
 Error message text
 </Notice>`
  },
  {
    name: "VariantWarning",
    description: "",
    isCanonical: false,
    code: `<Notice variant='warning' emphasis='default' size='medium' icon={<IconExclamationMarkTriangle size="16" />}>
 Warning message text
 </Notice>`
  },
  {
    name: "EmphasisStrong",
    description: "",
    isCanonical: false,
    code: `<Notice variant='positive' emphasis='strong' size='medium' icon={<IconCheckMark size="16" />}>
 Strong emphasis message
 </Notice>`
  },
  {
    name: "EmphasisWeak",
    description: "",
    isCanonical: false,
    code: `<Notice variant='positive' emphasis='weak' size='medium' icon={<IconCheckMark size="16" />}>
 Weak emphasis message
 </Notice>`
  },
  {
    name: "SizeLarge",
    description: "",
    isCanonical: false,
    code: `<Notice
 variant='default' emphasis='default' size='large'
 icon={<IconInfo size="20" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 This is a large notice with more vertical space
 </Notice>`
  },
  {
    name: "AllVariants",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <Notice variant='default' emphasis='default' size='medium' variant="default" icon={<IconInfo size="16" />}>
 Default variant
 </Notice>
 <Notice variant='default' emphasis='default' size='medium' variant="highlight" icon={<IconInfo size="16" />}>
 Highlight variant
 </Notice>
 <Notice variant='default' emphasis='default' size='medium' variant="positive" icon={<IconCheckMark size="16" />}>
 Positive variant
 </Notice>
 <Notice variant='default' emphasis='default' size='medium' variant="danger" icon={<IconExclamationMarkTriangle size="16" />}>
 Danger variant
 </Notice>
 <Notice variant='default' emphasis='default' size='medium' variant="warning" icon={<IconExclamationMarkTriangle size="16" />}>
 Warning variant
 </Notice>
 </div>`
  },
  {
    name: "AllEmphasis",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <Notice variant='positive' emphasis='default' size='medium' emphasis="strong" icon={<IconCheckMark size="16" />}>
 Strong emphasis
 </Notice>
 <Notice variant='positive' emphasis='default' size='medium' emphasis="default" icon={<IconCheckMark size="16" />}>
 Default emphasis
 </Notice>
 <Notice variant='positive' emphasis='default' size='medium' emphasis="weak" icon={<IconCheckMark size="16" />}>
 Weak emphasis
 </Notice>
 </div>`
  },
  {
    name: "LongContent",
    description: "",
    isCanonical: false,
    code: `<Notice
 variant='default' emphasis='default' size='medium'
 icon={<IconInfo size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 Learn More
 </Button>
 }
 onDismiss={() => {}}
 >
 This is a notice with much longer content to demonstrate how the component handles text wrapping. The
 content area should expand to accommodate all the text while maintaining proper spacing between elements.
 </Notice>`
  },
  {
    name: "AllVariantsWithActions",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="default"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Neutral message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="highlight"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Highlight message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="positive"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Positive message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="warning"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Warning message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="danger"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Danger message text
 </Notice>
 </div>`
  },
  {
    name: "AllVariantsWeakEmphasis",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="default"
 emphasis="weak"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Neutral message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="highlight"
 emphasis="weak"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Highlight message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="positive"
 emphasis="weak"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Positive message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="warning"
 emphasis="weak"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Warning message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="danger"
 emphasis="weak"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Danger message text
 </Notice>
 </div>`
  },
  {
    name: "AllVariantsStrongEmphasis",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="default"
 emphasis="strong"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Neutral message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="highlight"
 emphasis="strong"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Highlight message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="positive"
 emphasis="strong"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Positive message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="warning"
 emphasis="strong"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Warning message text
 </Notice>
 <Notice
 variant='default' emphasis='default' size='medium'
 variant="danger"
 emphasis="strong"
 icon={<IconLightning size="16" />}
 action={
 <Button size="small" emphasis="default" onPress={() => {}}>
 <IconArrowRoundAntiClockwise size={16} />
 Undo
 </Button>
 }
 onDismiss={() => {}}
 >
 Danger message text
 </Notice>
 </div>`
  }
];
const instructions$i = "Use variant to set intent (default, highlight, positive, danger, warning). Use emphasis='strong' for high-visibility banners and 'weak' for subtle inline notices. Provide an icon ReactNode to add a leading icon. Provide an action ReactNode (typically a Button) for actionable notices. Provide onDismiss to show a dismiss button. Children is the message content.";
const typeDefinitions$i = {};
const __vite_glob_0_19 = {
  name: name$i,
  description: description$i,
  status: status$i,
  category: category$i,
  tags: tags$i,
  relatedComponents: relatedComponents$i,
  importStatement: importStatement$i,
  props: props$i,
  subComponents: subComponents$i,
  examples: examples$i,
  instructions: instructions$i,
  typeDefinitions: typeDefinitions$i
};
const name$h = "OrderableList";
const description$h = "A drag-and-drop sortable list where users can reorder items. Use when the order of items has semantic meaning and needs to be changed by the user.";
const status$h = "released";
const category$h = "data";
const tags$h = [
  "list",
  "sortable",
  "drag",
  "reorder"
];
const relatedComponents$h = [
  "Table"
];
const importStatement$h = "import { OrderableList } from '@frontify/fondue/components';";
const props$h = [
  {
    name: "spacing",
    type: '"tight" | "compact" | "comfortable"',
    required: false,
    defaultValue: "comfortable",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "direction",
    type: '"vertical" | "horizontal"',
    required: false,
    defaultValue: "vertical",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "order",
    type: "string[]",
    required: false,
    defaultValue: "[]",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onOrderChange",
    type: "(order: string[]) => void",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: "Sortable list",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$h = [];
const examples$h = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: '<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>\n                <OrderableList.Item id="1">\n                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="2">\n                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="3">\n                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="4">\n                    <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="5">\n                    <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n            </OrderableList.Root>'
  },
  {
    name: "WithActions",
    description: "",
    isCanonical: false,
    code: '<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>\n                <OrderableList.Item id="1">\n                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>\n                    <OrderableList.ItemAction>\n                        <Button aspect="square" emphasis="default" size="small">\n                            <IconTrashBin size={16} />\n                        </Button>\n                    </OrderableList.ItemAction>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="2">\n                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>\n                    <OrderableList.ItemAction>\n                        <Button aspect="square" emphasis="default" size="small">\n                            <IconTrashBin size={16} />\n                        </Button>\n                    </OrderableList.ItemAction>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="3">\n                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>\n                    <OrderableList.ItemAction>\n                        <Button aspect="square" emphasis="default" size="small">\n                            <IconTrashBin size={16} />\n                        </Button>\n                    </OrderableList.ItemAction>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n            </OrderableList.Root>'
  },
  {
    name: "Selectable",
    description: "",
    isCanonical: false,
    code: `<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                <OrderableList.Item
                    id="1"
                    selected={selectedId === '1'}
                    onSelect={() => setSelectedId(selectedId === '1' ? null : '1')}
                >
                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Click to select</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item
                    id="2"
                    selected={selectedId === '2'}
                    onSelect={() => setSelectedId(selectedId === '2' ? null : '2')}
                >
                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Click to select</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
                <OrderableList.Item
                    id="3"
                    selected={selectedId === '3'}
                    onSelect={() => setSelectedId(selectedId === '3' ? null : '3')}
                >
                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    <OrderableList.ItemDescription>Click to select</OrderableList.ItemDescription>
                    <OrderableList.DragHandle />
                </OrderableList.Item>
            </OrderableList.Root>`
  },
  {
    name: "WithDecorator",
    description: "",
    isCanonical: false,
    code: '<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>\n                <OrderableList.Item id="1">\n                    <OrderableList.ItemDecorator>A</OrderableList.ItemDecorator>\n                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="2">\n                    <OrderableList.ItemDecorator>B</OrderableList.ItemDecorator>\n                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="3">\n                    <OrderableList.ItemDecorator>C</OrderableList.ItemDecorator>\n                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n            </OrderableList.Root>'
  },
  {
    name: "Horizontal",
    description: "",
    isCanonical: false,
    code: '<OrderableList.Root spacing="compact" direction="horizontal" order={order} onOrderChange={setOrder}>\n                <OrderableList.Item id="1">\n                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="2">\n                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="3">\n                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="4">\n                    <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="5">\n                    <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n            </OrderableList.Root>'
  },
  {
    name: "NoDragHandle",
    description: "",
    isCanonical: false,
    code: '<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>\n                <OrderableList.Item id="1">\n                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Drag the entire item</OrderableList.ItemDescription>\n                </OrderableList.Item>\n                <OrderableList.Item id="2">\n                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Drag the entire item</OrderableList.ItemDescription>\n                </OrderableList.Item>\n                <OrderableList.Item id="3">\n                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Drag the entire item</OrderableList.ItemDescription>\n                </OrderableList.Item>\n            </OrderableList.Root>'
  },
  {
    name: "WithDisabledItem",
    description: "",
    isCanonical: false,
    code: '<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>\n                <OrderableList.Item id="1">\n                    <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Draggable</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="2" disabled>\n                    <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Drag disabled</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n                <OrderableList.Item id="3">\n                    <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>\n                    <OrderableList.ItemDescription>Draggable</OrderableList.ItemDescription>\n                    <OrderableList.DragHandle />\n                </OrderableList.Item>\n            </OrderableList.Root>'
  },
  {
    name: "ExternallyControlled",
    description: "",
    isCanonical: false,
    code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 1 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 2 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="3">
                        <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 3 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="4">
                        <OrderableList.ItemTitle>Item 4</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 4 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="5">
                        <OrderableList.ItemTitle>Item 5</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Item 5 description</OrderableList.ItemDescription>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button onPress={() => setOrder(['5', '4', '3', '2', '1'])}>Reverse order</Button>
                    <Button onPress={() => setOrder(['1', '2', '3', '4', '5'])}>Reset order</Button>
                </div>
                <span>Current order: {JSON.stringify(order)}</span>
            </div>`
  },
  {
    name: "CustomContentWithButtonHandle",
    description: "",
    isCanonical: false,
    code: `<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                {order.map((id) => (
                    <OrderableList.Item padding="none" id={id} key={id}>
                        <div style={{ backgroundColor: 'var(--color-surface-dim)', padding: 12 }}>
                            <OrderableList.ItemTitle>Item {id}</OrderableList.ItemTitle>
                            <div style={{ marginTop: 8 }}>
                                <OrderableList.CustomHandle asChild>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            padding: '4px 8px',
                                            backgroundColor: 'var(--color-container-secondary-default)',
                                            cursor: 'grab',
                                        }}
                                    >
                                        Drag here
                                    </span>
                                </OrderableList.CustomHandle>
                            </div>
                        </div>
                    </OrderableList.Item>
                ))}
            </OrderableList.Root>`
  },
  {
    name: "CustomContentWithCardHandle",
    description: "",
    isCanonical: false,
    code: `<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                {order.map((id) => (
                    <OrderableList.Item padding="none" id={id} key={id}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: 'var(--color-surface-dim)',
                                    fontWeight: 600,
                                }}
                            >
                                <OrderableList.ItemTitle>Card {id}</OrderableList.ItemTitle>
                            </div>
                            <OrderableList.CustomHandle asChild>
                                <div
                                    style={{
                                        padding: 24,
                                        backgroundColor: 'var(--color-container-secondary-default)',
                                        cursor: 'grab',
                                        textAlign: 'center',
                                    }}
                                >
                                    Drag from this area
                                </div>
                            </OrderableList.CustomHandle>
                        </div>
                    </OrderableList.Item>
                ))}
            </OrderableList.Root>`
  },
  {
    name: "CustomContentFullyDraggable",
    description: "",
    isCanonical: false,
    code: `<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                {order.map((id) => (
                    <OrderableList.Item padding="none" id={id} key={id}>
                        <div
                            style={{
                                padding: 16,
                                backgroundColor: 'var(--color-surface-dim)',
                                cursor: 'grab',
                            }}
                        >
                            <OrderableList.ItemTitle>Item {id}</OrderableList.ItemTitle>
                            <div style={{ marginTop: 4, color: 'var(--color-text-weak)' }}>
                                The entire item is draggable
                            </div>
                        </div>
                    </OrderableList.Item>
                ))}
            </OrderableList.Root>`
  },
  {
    name: "CustomContentWithCustomTitle",
    description: "",
    isCanonical: false,
    code: `<OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                {order.map((id) => (
                    <OrderableList.Item padding="none" id={id} key={id}>
                        <div style={{ padding: 16, backgroundColor: 'var(--color-surface-dim)' }}>
                            <OrderableList.ItemTitle asChild>
                                <span style={{ fontWeight: 600, letterSpacing: '0.2em', fontStyle: 'italic' }}>
                                    Item {id}
                                </span>
                            </OrderableList.ItemTitle>
                        </div>
                    </OrderableList.Item>
                ))}
            </OrderableList.Root>`
  },
  {
    name: "Spacing",
    description: "",
    isCanonical: false,
    code: `<div style={{ display: 'flex', gap: 48 }}>
                <div>
                    <h4 style={{ marginBottom: 8 }}>Tight</h4>
                    <OrderableList.Root spacing="tight" order={order} onOrderChange={setOrder}>
                        <OrderableList.Item id="1">
                            <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="2">
                            <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="3">
                            <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                    </OrderableList.Root>
                </div>
                <div>
                    <h4 style={{ marginBottom: 8 }}>Compact</h4>
                    <OrderableList.Root spacing="compact" order={order} onOrderChange={setOrder}>
                        <OrderableList.Item id="1">
                            <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="2">
                            <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="3">
                            <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                    </OrderableList.Root>
                </div>
                <div>
                    <h4 style={{ marginBottom: 8 }}>Comfortable</h4>
                    <OrderableList.Root spacing="comfortable" order={order} onOrderChange={setOrder}>
                        <OrderableList.Item id="1">
                            <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="2">
                            <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                        <OrderableList.Item id="3">
                            <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                            <OrderableList.DragHandle />
                        </OrderableList.Item>
                    </OrderableList.Root>
                </div>
            </div>`
  }
];
const instructions$h = "Compose as OrderableList.Root > OrderableList.Item. The order prop is a string array of item IDs that controls render order — always keep it in sync via onOrderChange. Each OrderableList.Item requires a unique id prop. Add OrderableList.DragHandle inside items for an explicit drag handle; omit it to make the entire item draggable. Use OrderableList.ItemTitle and OrderableList.ItemDescription for standard content layout. Add OrderableList.ItemAction for per-item action buttons.";
const typeDefinitions$h = {};
const __vite_glob_0_20 = {
  name: name$h,
  description: description$h,
  status: status$h,
  category: category$h,
  tags: tags$h,
  relatedComponents: relatedComponents$h,
  importStatement: importStatement$h,
  props: props$h,
  subComponents: subComponents$h,
  examples: examples$h,
  instructions: instructions$h,
  typeDefinitions: typeDefinitions$h
};
const name$g = "RadioList";
const description$g = "A group of radio buttons for single-choice selection from a list of options. Use when users must pick exactly one option from a small, visible set.";
const status$g = "released";
const category$g = "input";
const tags$g = [
  "radio",
  "list",
  "form"
];
const relatedComponents$g = [
  "Checkbox",
  "SegmentedControl",
  "Select"
];
const importStatement$g = "import { RadioList } from '@frontify/fondue/components';";
const props$g = [];
const subComponents$g = [
  {
    name: "RadioList.Root",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "emphasis",
        type: '"default" | "highlight"',
        required: false,
        defaultValue: "default",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "readOnly",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "required",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "value",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "RadioList.RadioButton",
    props: [
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "readOnly",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$g = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<RadioListRoot />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: "<RadioListRoot disabled />"
  },
  {
    name: "ReadOnly",
    description: "",
    isCanonical: false,
    code: "<RadioListRoot readOnly />"
  },
  {
    name: "Required",
    description: "",
    isCanonical: false,
    code: "<RadioListRoot required />"
  },
  {
    name: "Vertical",
    description: "",
    isCanonical: false,
    code: "<RadioListRoot orientation='vertical' />"
  },
  {
    name: "WithEmphasisHighlight",
    description: "",
    isCanonical: false,
    code: "<RadioListRoot emphasis='highlight' />"
  },
  {
    name: "WithoutLabels",
    description: "",
    isCanonical: false,
    code: '<RadioList.Root >\n <RadioList.RadioButton id={idOption1} value="1" />\n <RadioList.RadioButton id={idOption2} value="2" />\n <RadioList.RadioButton id={idOption3} value="3" />\n </RadioList.Root>'
  },
  {
    name: "WithCustomLayout",
    description: "",
    isCanonical: false,
    code: '<RadioList.Root disabled={args.disabled} required={args.required} value={args.value} asChild>\n                <Flex gap={4}>\n                    <Flex gap={2} align="center">\n                        <RadioList.RadioButton id={idOption1} value="1" />\n                        <Label htmlFor={idOption1} required={args.required}>\n                            Option 1\n                        </Label>\n                    </Flex>\n\n                    <Flex gap={2} align="center">\n                        <RadioList.RadioButton id={idOption2} value="2" />\n                        <Label htmlFor={idOption2} required={args.required}>\n                            Option 2\n                        </Label>\n                    </Flex>\n\n                    <Flex gap={2} align="center">\n                        <RadioList.RadioButton id={idOption3} value="3" />\n                        <Label htmlFor={idOption3} required={args.required}>\n                            Option 3\n                        </Label>\n                    </Flex>\n                </Flex>\n            </RadioList.Root>'
  }
];
const instructions$g = "Compose as RadioList.Root > RadioList.RadioButton. Each RadioList.RadioButton requires a unique value prop. Use RadioList.Root with asChild and a Flex container to customize the layout. Pair each RadioButton with a Label for accessibility. Use SegmentedControl for compact 2–5 option toggles inline with other controls. Use Select for longer option lists that should be hidden in a dropdown.";
const typeDefinitions$g = {};
const __vite_glob_0_21 = {
  name: name$g,
  description: description$g,
  status: status$g,
  category: category$g,
  tags: tags$g,
  relatedComponents: relatedComponents$g,
  importStatement: importStatement$g,
  props: props$g,
  subComponents: subComponents$g,
  examples: examples$g,
  instructions: instructions$g,
  typeDefinitions: typeDefinitions$g
};
const name$f = "RouterProvider";
const description$f = "A context provider that enables SPA client-side navigation for Link components. Required when using Link in a single-page application with a router like React Router or Next.js.";
const status$f = "";
const category$f = "utility";
const tags$f = [
  "router",
  "navigation",
  "provider"
];
const relatedComponents$f = [
  "ThemeProvider"
];
const importStatement$f = "import { RouterProvider } from '@frontify/fondue/components';";
const props$f = [];
const subComponents$f = [];
const examples$f = [];
const instructions$f = "Place RouterProvider near the root of your app, inside ThemeProvider. Provide navigate (a function that pushes a path to the router) and useHref (a function that resolves a path to a full URL). Without RouterProvider, Link components use standard anchor navigation.";
const typeDefinitions$f = {};
const __vite_glob_0_22 = {
  name: name$f,
  description: description$f,
  status: status$f,
  category: category$f,
  tags: tags$f,
  relatedComponents: relatedComponents$f,
  importStatement: importStatement$f,
  props: props$f,
  subComponents: subComponents$f,
  examples: examples$f,
  instructions: instructions$f,
  typeDefinitions: typeDefinitions$f
};
const name$e = "ScrollArea";
const description$e = "A container with custom styled scrollbars that activates when content overflows its bounds. Use when you need a scrollable region with consistent cross-browser scrollbar appearance.";
const status$e = "released";
const category$e = "layout";
const tags$e = [
  "scroll",
  "overflow",
  "container"
];
const relatedComponents$e = [
  "Box"
];
const importStatement$e = "import { ScrollArea } from '@frontify/fondue/components';";
const props$e = [
  {
    name: "type",
    type: '"auto" | "always" | "scroll" | "hover"',
    required: false,
    defaultValue: "hover",
    description: '"auto" visible when content is overflowing on the corresponding orientation.\n"always" always visible regardless of whether the content is overflowing. Sets the scrollbar gutter to stable.\n"scroll" visible when the user is scrolling along its corresponding orientation.\n"hover" when the user is hovering over the scroll area.',
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "scrollbarGutter",
    type: '"auto" | "stable" | "stable-horizontal" | "stable-vertical"',
    required: false,
    defaultValue: "auto",
    description: "Determines if the scrollbar should take up space in the content area",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxHeight",
    type: "string | number",
    required: false,
    defaultValue: "100%",
    description: "Maximum height of the scroll area",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxWidth",
    type: "string | number",
    required: false,
    defaultValue: "100%",
    description: "Minimum width of the scroll area",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "padding",
    type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
    required: false,
    defaultValue: '"compact"',
    description: "Define the padding of the scroll area",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "showShadow",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Determines if a inset shadow should be shown the edge of the component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-scroll-area",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$e = [];
const examples$e = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<ScrollArea maxHeight={200} maxWidth={600}>\n <p style={{ width: 500 }}>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>"
  },
  {
    name: "Horizontal",
    description: "",
    isCanonical: false,
    code: "<ScrollArea maxWidth={300}>\n <p style={{ width: 500 }}>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>"
  },
  {
    name: "TwoDimensions",
    description: "",
    isCanonical: false,
    code: "<ScrollArea maxHeight={200} maxWidth={300}>\n <p style={{ width: 500 }}>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>"
  },
  {
    name: "AlwaysVisible",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="always">\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "VisibleWhenOverflowing",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="auto" maxHeight={200} maxWidth={300}>\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "VisibleWhenScrolling",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="scroll" maxHeight={200} maxWidth={300}>\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "WithShadow",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="scroll" maxHeight={200} maxWidth={300} showShadow>\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "WithTightPadding",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="scroll" maxHeight={200} maxWidth={300} padding="tight">\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "WithCompactPadding",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="scroll" maxHeight={200} maxWidth={300} padding="compact">\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "WithComfortablePadding",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="scroll" maxHeight={200} maxWidth={300} padding="comfortable">\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "WithSpaciousPadding",
    description: "",
    isCanonical: false,
    code: '<ScrollArea type="scroll" maxHeight={200} maxWidth={300} padding="spacious">\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies ornare.\n Quisque auctor, nunc nec aliquam fermentum, odio turpis ultricies elit, in ultricies nunc justo\n vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies\n nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo,\n vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero\n posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies tincidunt,\n odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero in ultricies\n tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer auctor, libero\n in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae purus. Integer\n auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc justo vitae\n purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel ultricies nunc\n justo vitae purus. Integer auctor, libero in ultricies tincidunt, odio libero posuere justo, vel\n ultricies nunc justo vitae purus.\n </p>\n </ScrollArea>'
  },
  {
    name: "WithStableGutter",
    description: "",
    isCanonical: false,
    code: `<ScrollArea maxHeight={200} maxWidth={600} scrollbarGutter="stable">
 <div style={{ height: '1000px', width: '100%' }}>Scrollable content</div>
 </ScrollArea>`
  }
];
const instructions$e = "Set maxHeight and/or maxWidth to define the scrollable viewport. Use type='hover' (default) to only show scrollbars on hover, 'always' to always show them, or 'auto' to show only when overflowing. Use scrollbarGutter='stable' to prevent layout shift when content changes between scrollable and non-scrollable. Use showShadow to add an inset shadow at scroll edges.";
const typeDefinitions$e = {};
const __vite_glob_0_23 = {
  name: name$e,
  description: description$e,
  status: status$e,
  category: category$e,
  tags: tags$e,
  relatedComponents: relatedComponents$e,
  importStatement: importStatement$e,
  props: props$e,
  subComponents: subComponents$e,
  examples: examples$e,
  instructions: instructions$e,
  typeDefinitions: typeDefinitions$e
};
const name$d = "Section";
const description$d = "A semantic HTML section element with design-system spacing props. Use in place of Box when the content represents a standalone section of the page for document outline and accessibility purposes.";
const status$d = "";
const category$d = "layout";
const tags$d = [
  "section",
  "container",
  "layout"
];
const relatedComponents$d = [
  "Accordion",
  "Box"
];
const importStatement$d = "import { Section } from '@frontify/fondue/components';";
const props$d = [
  {
    name: "m",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mx",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "my",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical margin property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "mb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "ml",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The margin-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "p",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "px",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "py",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The vertical padding property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pt",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pr",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pb",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "pl",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The padding-left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "width",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxWidth",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-width property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "height",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The min-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "maxHeight",
    type: "Responsive<SizeValue>",
    required: false,
    defaultValue: null,
    description: "The max-height property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflow",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowX",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The horizontal overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "overflowY",
    type: "Responsive<OverflowValue>",
    required: false,
    defaultValue: null,
    description: "The vertical overflow property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "position",
    type: "Responsive<PositionValue>",
    required: false,
    defaultValue: null,
    description: "The position property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "top",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The top property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "right",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The right property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "bottom",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The bottom property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "left",
    type: "Responsive<SpacingValue>",
    required: false,
    defaultValue: null,
    description: "The left property of the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "display",
    type: 'Responsive<"none" | "block" | "inline-block" | "inline">',
    required: false,
    defaultValue: "'block'",
    description: "The display property.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-section",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$d = [];
const examples$d = [];
const instructions$d = "Functionally identical to Box but renders a <section> element. Supports all the same spacing, sizing, and positioning props as Box. Provide aria-label or aria-labelledby to identify the section to screen readers when no visible heading is present.";
const typeDefinitions$d = {
  Responsive: "({\n    [key in Breakpoint]?: TValue;\n} & {\n    base?: TValue;\n}) | TValue",
  SizeValue: 'SpacingValue | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content"',
  SpacingValue: "// `(string & {})` and `(number & {})` allows for arbitrary strings/numbers to be passed in while keeping the suggestion of the union type\n(string & {}) | (number & {}) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64",
  OverflowValue: '"visible" | "hidden" | "clip" | "scroll" | "auto"',
  PositionValue: '"static" | "fixed" | "absolute" | "relative" | "sticky"',
  Breakpoint: "keyof typeof screens"
};
const __vite_glob_0_24 = {
  name: name$d,
  description: description$d,
  status: status$d,
  category: category$d,
  tags: tags$d,
  relatedComponents: relatedComponents$d,
  importStatement: importStatement$d,
  props: props$d,
  subComponents: subComponents$d,
  examples: examples$d,
  instructions: instructions$d,
  typeDefinitions: typeDefinitions$d
};
const name$c = "SegmentedControl";
const description$c = "A compact control for selecting one of 2–5 mutually exclusive options. Use it for view mode switches, layout changes, filter selections, or input choices where all options should remain visible and directly selectable.";
const status$c = "released";
const category$c = "input";
const tags$c = [
  "segmented",
  "toggle",
  "tabs"
];
const relatedComponents$c = [
  "Tabs",
  "RadioList",
  "Select"
];
const importStatement$c = "import { SegmentedControl } from '@frontify/fondue/components';";
const props$c = [];
const subComponents$c = [
  {
    name: "SegmentedControl.Item",
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$c = [
  {
    name: "TextOnly",
    description: "",
    isCanonical: true,
    code: `<SegmentedControl.Root defaultValue='first'>
 <SegmentedControl.Item value="first">First</SegmentedControl.Item>
 <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
 <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
 </SegmentedControl.Root>`
  },
  {
    name: "WithTooltip",
    description: "",
    isCanonical: false,
    code: `<SegmentedControl.Root defaultValue='first'>
 <Tooltip.Root>
 <Tooltip.Trigger asChild>
 <SegmentedControl.Item value="first">First</SegmentedControl.Item>
 </Tooltip.Trigger>
 <Tooltip.Content>First one</Tooltip.Content>
 </Tooltip.Root>

 <Tooltip.Root>
 <Tooltip.Trigger asChild>
 <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
 </Tooltip.Trigger>
 <Tooltip.Content>Second one</Tooltip.Content>
 </Tooltip.Root>

 <Tooltip.Root>
 <Tooltip.Trigger asChild>
 <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
 </Tooltip.Trigger>
 <Tooltip.Content>Third one</Tooltip.Content>
 </Tooltip.Root>
 </SegmentedControl.Root>`
  },
  {
    name: "IconOnly",
    description: "",
    isCanonical: false,
    code: `<SegmentedControl.Root defaultValue='first'>
 <SegmentedControl.Item value="first">
 <IconIcon size={20} />
 </SegmentedControl.Item>
 <SegmentedControl.Item value="second">
 <IconIcon size={20} />
 </SegmentedControl.Item>
 <SegmentedControl.Item value="third">
 <IconIcon size={20} />
 </SegmentedControl.Item>
 </SegmentedControl.Root>`
  },
  {
    name: "IconAndText",
    description: "",
    isCanonical: false,
    code: `<SegmentedControl.Root defaultValue='first'>
 <SegmentedControl.Item value="first">
 <IconIcon size={20} />
 First
 </SegmentedControl.Item>
 <SegmentedControl.Item value="second">
 <IconIcon size={20} />
 Second
 </SegmentedControl.Item>
 <SegmentedControl.Item value="third">
 <IconIcon size={20} />
 Third
 </SegmentedControl.Item>
 </SegmentedControl.Root>`
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: `<SegmentedControl.Root defaultValue='first' disabled>
 <SegmentedControl.Item value="first">
 <IconIcon size={20} />
 First
 </SegmentedControl.Item>
 <SegmentedControl.Item value="second">
 <IconIcon size={20} />
 Second
 </SegmentedControl.Item>
 <SegmentedControl.Item value="third">
 <IconIcon size={20} />
 Third
 </SegmentedControl.Item>
 </SegmentedControl.Root>`
  },
  {
    name: "WithLabel",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-2">
 <Label htmlFor="segmented-control">Segmented Control</Label>

 <SegmentedControl.Root defaultValue='first' id="segmented-control">
 <SegmentedControl.Item value="first">First</SegmentedControl.Item>
 <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
 <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
 </SegmentedControl.Root>
 </div>`
  },
  {
    name: "FullWidth",
    description: "",
    isCanonical: false,
    code: `<SegmentedControl.Root defaultValue='first' hugWidth={false}>
 <SegmentedControl.Item value="first">First</SegmentedControl.Item>
 <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
 <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
 </SegmentedControl.Root>`
  },
  {
    name: "ContainerTooSmall",
    description: "",
    isCanonical: false,
    code: `<SegmentedControl.Root defaultValue='first'>
 <SegmentedControl.Item value="first">First</SegmentedControl.Item>
 <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
 <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
 </SegmentedControl.Root>`
  }
];
const instructions$c = "Compose as SegmentedControl.Root > SegmentedControl.Item. Each item requires a unique value prop. Use defaultValue for uncontrolled usage or value + onValueChange for controlled. Use hugWidth=false to stretch to container width. Pair with a Label for accessibility. Use Tabs when switching also changes the visible content panel below. Use RadioList for longer option sets.Use RadioList or Select for longer option sets.";
const typeDefinitions$c = {};
const __vite_glob_0_25 = {
  name: name$c,
  description: description$c,
  status: status$c,
  category: category$c,
  tags: tags$c,
  relatedComponents: relatedComponents$c,
  importStatement: importStatement$c,
  props: props$c,
  subComponents: subComponents$c,
  examples: examples$c,
  instructions: instructions$c,
  typeDefinitions: typeDefinitions$c
};
const name$b = "Select";
const description$b = "A dropdown for selecting a single value from a list of options. Use Select.Combobox for searchable/filterable selection, and Select.Multi or Select.Combobox.Multiple for multi-value selection.";
const status$b = "released";
const category$b = "input";
const tags$b = [
  "select",
  "dropdown",
  "form"
];
const relatedComponents$b = [
  "Dropdown",
  "RadioList",
  "SegmentedControl"
];
const importStatement$b = "import { Select } from '@frontify/fondue/components';";
const props$b = [
  {
    name: "children",
    type: "ReactNode",
    required: false,
    defaultValue: null,
    description: "Children of the Select component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "placeholder",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The placeholder in the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "status",
    type: '"neutral" | "success" | "error"',
    required: false,
    defaultValue: '"neutral"',
    description: "Status of the text input",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Disables the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "alignMenu",
    type: '"start" | "center" | "end"',
    required: false,
    defaultValue: '"start"',
    description: "The alignment of the menu",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "side",
    type: '"left" | "right" | "bottom" | "top"',
    required: false,
    defaultValue: '"bottom"',
    description: "Defines the preferred side of the select. It will not be respected if there are collisions with the viewport",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The data test id of the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Id of the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "showStringValue",
    type: "boolean",
    required: false,
    defaultValue: "true",
    description: "The value of the select is shown as plain text (from the label prop) when set to true\nItems child components are used if set to false",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "viewportCollisionPadding",
    type: '"compact" | "spacious"',
    required: false,
    defaultValue: "'compact'",
    description: "Define the minimum distance between the select menu and the viewport edge",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onEscapeKeyDown",
    type: "(event: KeyboardEvent) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the escape key is pressed",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "value",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The active value in the select component. This is used to control the select externally",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onSelect",
    type: "(selectedValue: string) => void",
    required: false,
    defaultValue: null,
    description: "Callback function that is called when an item is selected",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "defaultValue",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The default value of the select component. Used for uncontrolled usages",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "children",
    type: "ReactNode",
    required: false,
    defaultValue: null,
    description: "Children of the Select component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "placeholder",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The placeholder in the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "status",
    type: '"neutral" | "success" | "error"',
    required: false,
    defaultValue: '"neutral"',
    description: "Status of the text input",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Disables the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "alignMenu",
    type: '"start" | "center" | "end"',
    required: false,
    defaultValue: '"start"',
    description: "The alignment of the menu",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "side",
    type: '"left" | "right" | "bottom" | "top"',
    required: false,
    defaultValue: '"bottom"',
    description: "Defines the preferred side of the select. It will not be respected if there are collisions with the viewport",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The data test id of the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Id of the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "showStringValue",
    type: "boolean",
    required: false,
    defaultValue: "true",
    description: "The value of the select is shown as plain text (from the label prop) when set to true\nItems child components are used if set to false",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "viewportCollisionPadding",
    type: '"compact" | "spacious"',
    required: false,
    defaultValue: "'compact'",
    description: "Define the minimum distance between the select menu and the viewport edge",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onEscapeKeyDown",
    type: "(event: KeyboardEvent) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the escape key is pressed",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "value",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The active value in the select component. This is used to control the select externally",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onSelect",
    type: "(selectedValue: string) => void",
    required: false,
    defaultValue: null,
    description: "Callback function that is called when an item is selected",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "defaultValue",
    type: "string",
    required: false,
    defaultValue: null,
    description: "The default value of the select component. Used for uncontrolled usages",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "children",
    type: "ReactNode",
    required: false,
    defaultValue: null,
    description: "Children of the Select component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "placeholder",
    type: "string",
    required: false,
    defaultValue: "",
    description: "The placeholder in the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "status",
    type: '"neutral" | "success" | "error"',
    required: false,
    defaultValue: "neutral",
    description: "Status of the text input",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Disables the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "alignMenu",
    type: '"start" | "center" | "end"',
    required: false,
    defaultValue: "start",
    description: "The alignment of the menu",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "side",
    type: '"left" | "right" | "bottom" | "top"',
    required: false,
    defaultValue: "bottom",
    description: "Defines the preferred side of the select. It will not be respected if there are collisions with the viewport",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-select",
    description: "The data test id of the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Id of the select component",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "showStringValue",
    type: "boolean",
    required: false,
    defaultValue: "true",
    description: "The value of the select is shown as plain text (from the label prop) when set to true\nItems child components are used if set to false",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "viewportCollisionPadding",
    type: '"compact" | "spacious"',
    required: false,
    defaultValue: "compact",
    description: "Define the minimum distance between the select menu and the viewport edge",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onEscapeKeyDown",
    type: "(event: KeyboardEvent) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the escape key is pressed",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria label for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-hidden",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria label for the component when it is hidden.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "role",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria role for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-describedby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria described by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-labelledby",
    type: "string",
    required: false,
    defaultValue: null,
    description: "Aria labelled by for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-expanded",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria expanded for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-haspopup",
    type: "boolean",
    required: false,
    defaultValue: null,
    description: "Aria has popup for the component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "selectedItemValues",
    type: "string[]",
    required: true,
    defaultValue: null,
    description: "The currently selected item values",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onItemSelect",
    type: "(value?: string) => void",
    required: true,
    defaultValue: null,
    description: "Callback fired when an item is selected or deselected",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onClear",
    type: "() => void",
    required: true,
    defaultValue: null,
    description: "Callback fired when the selection is cleared",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "multiple",
    type: "boolean",
    required: true,
    defaultValue: null,
    description: "Whether the select allows multiple selections",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$b = [
  {
    name: "Select.Multi",
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Select component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The placeholder in the select component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "status",
        type: '"neutral" | "success" | "error"',
        required: false,
        defaultValue: '"neutral"',
        description: "Status of the text input",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Disables the select component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "alignMenu",
        type: '"start" | "center" | "end"',
        required: false,
        defaultValue: '"start"',
        description: "The alignment of the menu",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"left" | "right" | "bottom" | "top"',
        required: false,
        defaultValue: '"bottom"',
        description: "Defines the preferred side of the select. It will not be respected if there are collisions with the viewport",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The data test id of the select component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Id of the select component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "showStringValue",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "The value of the select is shown as plain text (from the label prop) when set to true\nItems child components are used if set to false",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "viewportCollisionPadding",
        type: '"compact" | "spacious"',
        required: false,
        defaultValue: "'compact'",
        description: "Define the minimum distance between the select menu and the viewport edge",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the escape key is pressed",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria label for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-hidden",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria label for the component when it is hidden.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "role",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria role for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-describedby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria described by for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-labelledby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria labelled by for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-expanded",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria expanded for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-haspopup",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria has popup for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "value",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "The active value in the select component. This is used to control the select externally",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onSelect",
        type: "(selectedValues: string[]) => void",
        required: false,
        defaultValue: null,
        description: "Callback function that is called when items are selected",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "defaultValue",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "The default value of the select component. Used for uncontrolled usages",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Select.Combobox",
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Combobox component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        defaultValue: "",
        description: "The placeholder in the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "status",
        type: '"neutral" | "success" | "error"',
        required: false,
        defaultValue: "neutral",
        description: "Status of the text input",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Disables the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "alignMenu",
        type: '"start" | "center" | "end"',
        required: false,
        defaultValue: "start",
        description: "The alignment of the menu",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"left" | "right" | "bottom" | "top"',
        required: false,
        defaultValue: "bottom",
        description: "Defines the preferred side of the combobox. It will not be respected if there are collisions with the viewport",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Id of the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-select-combobox",
        description: "The data test id of the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "viewportCollisionPadding",
        type: '"compact" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the minimum distance between the select menu and the viewport edge",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "getAsyncItems",
        type: "AsyncItemsFetcher",
        required: false,
        defaultValue: null,
        description: "Function to fetch items asynchronously",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the escape key is pressed",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria label for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-hidden",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria label for the component when it is hidden.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "role",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria role for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-describedby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria described by for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-labelledby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria labelled by for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-expanded",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria expanded for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-haspopup",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria has popup for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "selectedItemValues",
        type: "string[]",
        required: true,
        defaultValue: null,
        description: "The currently selected item values",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onItemSelect",
        type: "(value?: string) => void",
        required: true,
        defaultValue: null,
        description: "Callback fired when an item is selected or deselected",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClear",
        type: "() => void",
        required: true,
        defaultValue: null,
        description: "Callback fired when the selection is cleared",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "multiple",
        type: "boolean",
        required: true,
        defaultValue: null,
        description: "Whether the combobox allows multiple selections",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Select.Combobox.Multiple",
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Children of the Combobox component. This can contain the `Select.Slot` components for the label, decorators, clear action and menu",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The placeholder in the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "status",
        type: '"neutral" | "success" | "error"',
        required: false,
        defaultValue: '"neutral"',
        description: "Status of the text input",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Disables the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "alignMenu",
        type: '"start" | "center" | "end"',
        required: false,
        defaultValue: '"start"',
        description: "The alignment of the menu",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"left" | "right" | "bottom" | "top"',
        required: false,
        defaultValue: '"bottom"',
        description: "Defines the preferred side of the combobox. It will not be respected if there are collisions with the viewport",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Id of the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The data test id of the combobox component",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "viewportCollisionPadding",
        type: '"compact" | "spacious"',
        required: false,
        defaultValue: "'compact'",
        description: "Define the minimum distance between the select menu and the viewport edge",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "getAsyncItems",
        type: "AsyncItemsFetcher",
        required: false,
        defaultValue: null,
        description: "Function to fetch items asynchronously",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the escape key is pressed",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria label for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-hidden",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria label for the component when it is hidden.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "role",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria role for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-describedby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria described by for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-labelledby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Aria labelled by for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-expanded",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria expanded for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-haspopup",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Aria has popup for the component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "value",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "The active value in the combobox component. This is used to control the combobox externally",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onSelect",
        type: "(selectedValues: string[]) => void",
        required: false,
        defaultValue: null,
        description: "Callback function that is called when items are selected",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "defaultValue",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "The default value of the combobox component. Used for uncontrolled usages",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Select.Slot",
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "The children of the select slot. This can be a custom component.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "name",
        type: '"menu" | "left" | "right" | "clear"',
        required: true,
        defaultValue: null,
        description: "The slot name that is used to determine the placement.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-select-slot",
        description: "The data test id of the select slot.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Select.Menu",
    props: [
      {
        name: "highlightedIndex",
        type: "number",
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "getMenuProps",
        type: "(<Options>(options?: UseSelectGetMenuPropsOptions & Options, otherOptions?: GetPropsCommonOptions) => Overwrite<UseSelectGetMenuReturnValue, Options>) | (<Options>(options?: UseComboboxGetMenuPropsOptions & Options, otherOptions?: GetPropsCommonOptions) => Overwrite<...>)",
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "getItemProps",
        type: '(<Options>(options: UseSelectGetItemPropsOptions<unknown> & Options) => Omit<Overwrite<UseSelectGetItemPropsReturnValue, Options>, "index" | "item">) | (<Options>(options: UseComboboxGetItemPropsOptions<...> & Options) => Omit<...>)',
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "filterText",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"left" | "right" | "bottom" | "top"',
        required: true,
        defaultValue: '"bottom"',
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "selectedItemValues",
        type: "string[]",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "hasInteractedSinceOpening",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "viewportCollisionPadding",
        type: '"compact" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the minimum distance between the select menu and the viewport edge",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onEscapeKeyDown",
        type: "(event: KeyboardEvent) => void",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Select.Item",
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description: "The value of the select item.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-select-item-group",
        description: "The data test id of the select item.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The label of the select item. Required when the child is not a string.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "The children of the select item. This can be a custom component or a string.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Select.Group",
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        defaultValue: null,
        description: "The children of the select item group. This can contain multiple `Select.Item` components.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "groupId",
        type: "string",
        required: true,
        defaultValue: null,
        description: "The internal group ID of the select item group.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "heading",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The groups heading",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-select-item-group",
        description: "The data test id of the select item group.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$b = [
  {
    name: "Select",
    description: "",
    isCanonical: true,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select>`
  },
  {
    name: "Select Multiple",
    description: "",
    isCanonical: false,
    code: `<Select.Multiple aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Multiple>`
  },
  {
    name: "Combobox",
    description: "",
    isCanonical: false,
    code: `<Select.Combobox aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Combobox>`
  },
  {
    name: "Combobox Multiple",
    description: "",
    isCanonical: false,
    code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Select.Combobox.Multiple
                    placeholder="Search and select items"
                    value={selectedValues}
                    onSelect={handleSelect}
                >
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                    <Select.Item value="cherry">Cherry</Select.Item>
                    <Select.Item value="date">Date</Select.Item>
                    <Select.Item value="elderberry">Elderberry</Select.Item>
                    <Select.Item value="fig">Fig</Select.Item>
                    <Select.Item value="grape">Grape</Select.Item>
                </Select.Combobox.Multiple>
            </div>`
  },
  {
    name: "ComboboxWithAsyncItems",
    description: "",
    isCanonical: false,
    code: `<Select.Combobox aria-label='Select an item' placeholder='Select an item' getAsyncItems={async (filterText: string) => {
 const items = [
 {
 value: 'test1',
 label: 'Test 1 - Custom Content',
 content: (
 <Flex gap={4} align="center">
 <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
 <p>Switzerland</p>
 </Flex>
 ),
 },
 {
 value: 'test2',
 label: 'Test 2',
 content: (
 <Flex gap={4} align="center">
 <p>With a Component</p>
 <IconIcon size={16} />
 </Flex>
 ),
 },
 {
 value: 'test3',
 label: 'Test 3',
 content: (
 <Flex gap={4} align="center">
 Test 3<IconIcon />
 </Flex>
 ),
 },
 { value: 'aaaa', label: 'AAAA' },
 { value: 'bbbb', label: 'BBBB' },
 { value: 'cccc', label: 'CCCC' },
 ];

 const filteredItems = items.filter((item) => item.label.toLowerCase().includes(filterText.toLowerCase()));

 await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

 return filteredItems;
 }}></Select.Combobox>`
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item' disabled>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "WithPlaceholder",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "WithDecorator",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="left">
 <IconIcon size={16} />
 </Select.Slot>
 <Select.Slot name="right">
 <IconIcon size={16} />
 </Select.Slot>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "Clearable",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="right">
 <IconIcon size={16} />
 </Select.Slot>
 <Select.Slot name="clear" />
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "CustomClearElement",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="clear">
 <Button size="small" emphasis="strong" onPress={() => {}}>
 Clear
 </Button>
 </Select.Slot>
 <Select.Slot name="left">
 <IconIcon size={16} />
 </Select.Slot>
 <Select.Slot name="right">
 <IconIcon size={16} />
 </Select.Slot>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "DefaultItem",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item' defaultValue='test1'>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "ItemGroups",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Group groupId="Group 1">
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 </Select.Group>
 <Select.Item value="test6">Test6</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "ItemGroupsWithHeaders",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Group groupId="Group 1" heading="Group 1">
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 </Select.Group>
 <Select.Group groupId="Group 2" heading="Group 2">
 <Select.Item value="test6">Test6</Select.Item>
 <Select.Item value="test7">Test7</Select.Item>
 <Select.Item value="test8">Test8</Select.Item>
 </Select.Group>
 <Select.Item value="test9">Test9</Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "OnlyItemGroups",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="menu">
 <Select.Group groupId="Group 1">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 </Select.Group>
 <Select.Group groupId="Group 2">
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 </Select.Group>
 </Select.Slot>
 </Select>`
  },
  {
    name: "CustomItem",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Slot name="menu">
 <Select.Item value="ch" label="Switzerland">
 <div className="tw-flex tw-items-center tw-gap-4">
 <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
 <p>Switzerland</p>
 </div>
 </Select.Item>
 <Select.Item value="icon" label="Component">
 <div className="tw-flex tw-items-center tw-gap-4">
 <p>With a Component</p>
 <IconIcon size={16} />
 </div>
 </Select.Item>
 <Select.Item value="basic" label="Basic">
 Basic
 </Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "CustomItemIncludingSelectField",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item' showStringValue={false}>
 <Select.Slot name="menu">
 <Select.Item value="ch" label="Switzerland">
 <div className="tw-flex tw-items-center tw-gap-4">
 <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
 <p>Switzerland</p>
 </div>
 </Select.Item>
 <Select.Item value="icon" label="Component">
 <div className="tw-flex tw-items-center tw-gap-4">
 <p>With a Component</p>
 <IconIcon size={16} />
 </div>
 </Select.Item>
 <Select.Item value="basic" label="Basic">
 Basic
 </Select.Item>
 </Select.Slot>
 </Select>`
  },
  {
    name: "ExternallyControlled",
    description: "",
    isCanonical: false,
    code: `<>
 <Select
 onSelect={(selectedItem) => {
 setActiveItem(() => selectedItem);
 }}
 value={activeItem}
 aria-label='Select an item' placeholder='Select an item'
 >
 <Select.Slot name="menu">
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Slot>
 </Select>
 <Button onPress={() => setActiveItem('test1')}>Set Test1</Button>
 </>`
  },
  {
    name: "OverflowingText",
    description: "",
    isCanonical: false,
    code: `<div style={{ display: 'flex', gap: 8, maxWidth: 600 }}>
 <Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">
 Test1 - This is a very long text to see how it overflows This is a very long text to see how it
 overflows This is a very long text to see how it overflows y long text to see how it overflows
 This is a very long text to see how it overflows This is a very long text to see how it
 overflows y long text to see how it overflows This is a very long text to see how it overflows
 This is a very long text to see how it overflows
 </Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select>
 <Select.Combobox aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1 - This is a very long text to see how it overflows</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Combobox>
 <Select.Combobox aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1 - This is a very long text to see how it overflows</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Combobox>
 </div>`
  },
  {
    name: "ListOverflow",
    description: "",
    isCanonical: false,
    code: `<>
 <Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 <Select.Item value="test6">Test6</Select.Item>
 <Select.Item value="test7">Test7</Select.Item>
 </Select>
 <Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 <Select.Item value="test6">Test6</Select.Item>
 <Select.Item value="test7">Test7</Select.Item>
 </Select>
 <Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 <Select.Item value="test6">Test6</Select.Item>
 <Select.Item value="test7">Test7</Select.Item>
 </Select>
 <Select aria-label='Select an item' placeholder='Select an item'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 <Select.Item value="test4">Test4</Select.Item>
 <Select.Item value="test5">Test5</Select.Item>
 <Select.Item value="test6">Test6</Select.Item>
 <Select.Item value="test7">Test7</Select.Item>
 </Select>
 </>`
  },
  {
    name: "Success",
    description: "",
    isCanonical: false,
    code: `<Select aria-label='Select an item' placeholder='Select an item' status='success'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select>`
  },
  {
    name: "Errored",
    description: "",
    isCanonical: false,
    code: `<Select.Combobox aria-label='Select an item' placeholder='Select an item' status='error'>
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Combobox>`
  },
  {
    name: "OnEscapeKeyDown",
    description: "",
    isCanonical: false,
    code: `<Select
 aria-label='Select an item' placeholder='Select an item'
 onEscapeKeyDown={() => {
 alert('Escape key was pressed!');
 }}
 >
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select>`
  },
  {
    name: "ComboboxOnEscapeKeyDown",
    description: "",
    isCanonical: false,
    code: `<Select.Combobox
 aria-label='Select an item' placeholder='Select an item'
 onEscapeKeyDown={() => {
 alert('Escape key was pressed!');
 }}
 >
 <Select.Item value="test1">Test1</Select.Item>
 <Select.Item value="test2">Test2</Select.Item>
 <Select.Item value="test3">Test3</Select.Item>
 </Select.Combobox>`
  }
];
const instructions$b = "Use Select for simple single-value selection. Use Select.Combobox when users need to search or filter the options list. Use Select.Multi or Select.Combobox.Multiple for multi-value selection. Group options with Select.Group. Use Select.Slot to add icons to items. Use Dropdown instead when items trigger actions rather than selecting a value.";
const typeDefinitions$b = {
  AsyncItemsFetcher: "(filterText: string) => Promise<AsyncItem[]>",
  AsyncItem: "{\n    label: string;\n    value: string;\n    content?: ReactNode;\n}"
};
const __vite_glob_0_26 = {
  name: name$b,
  description: description$b,
  status: status$b,
  category: category$b,
  tags: tags$b,
  relatedComponents: relatedComponents$b,
  importStatement: importStatement$b,
  props: props$b,
  subComponents: subComponents$b,
  examples: examples$b,
  instructions: instructions$b,
  typeDefinitions: typeDefinitions$b
};
const name$a = "Slider";
const description$a = "A range input for selecting a numerical value or range between a minimum and maximum.";
const status$a = "released";
const category$a = "input";
const tags$a = [
  "slider",
  "range",
  "input"
];
const relatedComponents$a = [];
const importStatement$a = "import { Slider } from '@frontify/fondue/components';";
const props$a = [
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "name",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "defaultValue",
    type: "number[]",
    required: false,
    defaultValue: "[0]",
    description: "The default value of the slider\nUsed for uncontrolled components",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "value",
    type: "number[]",
    required: false,
    defaultValue: "[0]",
    description: "The controlled value of the slider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "min",
    type: "number",
    required: false,
    defaultValue: "0",
    description: "Minimum value of the slider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "max",
    type: "number",
    required: false,
    defaultValue: "100",
    description: "Maximum value of the slider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "step",
    type: "number",
    required: false,
    defaultValue: "1",
    description: "The granularity with which the slider can step through values",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "minStepsBetweenThumbs",
    type: "number",
    required: false,
    defaultValue: "0",
    description: "The minimum steps between thumbs in a range slider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Disable the slider",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onChange",
    type: "(value: number[]) => void",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onCommit",
    type: "(value: number[]) => void",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-slider",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$a = [];
const examples$a = [
  {
    name: "SimpleSlider",
    description: "",
    isCanonical: true,
    code: "<Slider min={0} max={100} name='Simple slider' />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: "<Slider min={0} max={100} disabled defaultValue={[50]} />"
  },
  {
    name: "MinimumAndMaximum",
    description: "",
    isCanonical: false,
    code: "<Slider min={50} max={1000} />"
  },
  {
    name: "MinimumGap",
    description: "",
    isCanonical: false,
    code: "<Slider min={0} max={100} minStepsBetweenThumbs={25} />"
  },
  {
    name: "StepSize",
    description: "",
    isCanonical: false,
    code: "<Slider min={0} max={100} step={25} />"
  },
  {
    name: "MultipleThumbsUncontrolled",
    description: "",
    isCanonical: false,
    code: "<Slider min={0} max={100} defaultValue={[33, 67]} />"
  },
  {
    name: "ExternallyControlled",
    description: "",
    isCanonical: false,
    code: `<Slider
 onChange={(value) => {
 if (!value[0]) {
 return;
 }
 if (value[0] > 80 && !userIsWarned.current) {
 userIsWarned.current = true;
 alert("You're going a bit high there");
 }
 setSliderRange(value);
 }}
 value={sliderRange}
 min={0} max={100}
 />`
  },
  {
    name: "MultipleThumbsExternallyControlled",
    description: "",
    isCanonical: false,
    code: "<Slider\n onChange={(value) => {\n if (!value[0] || !value[1]) {\n return;\n }\n if (value[1] - value[0] > 80) {\n alert('The range is too large');\n return;\n }\n setSliderRange(value);\n }}\n value={sliderRange}\n min={0} max={100}\n />"
  },
  {
    name: "WithInputs",
    description: "",
    isCanonical: false,
    code: '<>\n                <Label id="new-slider-label" htmlFor="new-slider">\n                    Price range\n                </Label>\n\n                <Slider\n                    id="new-slider"\n                    aria-labelledby="new-slider-label"\n                    value={range}\n                    min={200}\n                    max={500}\n                    onChange={onRangeChange}\n                />\n\n                {range.map((value, index) => (\n                    <TextInput\n                        key={index}\n                        id={`new-slider-input-${index}`}\n                        value={value}\n                        type="number"\n                        aria-label={`Price range ${index === 0 ? \'from\' : \'to\'}`}\n                        onChange={onInputChange(index)}\n                    />\n                ))}\n            </>'
  }
];
const instructions$a = "Value is an array of numbers — use a single-element array for a single thumb, or two elements for a range slider. Use defaultValue for uncontrolled or value + onChange for controlled. onChange fires during drag; onCommit fires only when the user releases. Use minStepsBetweenThumbs to enforce a minimum gap in range sliders. Always provide aria-label or aria-labelledby for accessibility.";
const typeDefinitions$a = {};
const __vite_glob_0_27 = {
  name: name$a,
  description: description$a,
  status: status$a,
  category: category$a,
  tags: tags$a,
  relatedComponents: relatedComponents$a,
  importStatement: importStatement$a,
  props: props$a,
  subComponents: subComponents$a,
  examples: examples$a,
  instructions: instructions$a,
  typeDefinitions: typeDefinitions$a
};
const name$9 = "SplitButton";
const description$9 = "A combined primary action button with a secondary dropdown menu. Use when a main action has several related secondary options.";
const status$9 = "released";
const category$9 = "input";
const tags$9 = [
  "split-button",
  "button",
  "dropdown"
];
const relatedComponents$9 = [
  "Button",
  "Dropdown"
];
const importStatement$9 = "import { SplitButton } from '@frontify/fondue/components';";
const props$9 = [];
const subComponents$9 = [
  {
    name: "SplitButton.Root",
    props: [
      {
        name: "emphasis",
        type: '"default" | "weak" | "strong"',
        required: false,
        defaultValue: "default",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        required: false,
        defaultValue: "medium",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible label for the button group",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "split-button-action-button",
        description: "Test ID for the root element",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "SplitButton.Content",
    props: [
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        required: false,
        defaultValue: "button",
        description: "Button type",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the button is disabled",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onPress",
        type: "(event?: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
        required: false,
        defaultValue: null,
        description: "Click handler",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible label",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-describedby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible description",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "split-button-action-button",
        description: "Test ID for the content section",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Button title",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "SplitButton.Action",
    props: [
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible label",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "split-button-action-button",
        description: "Test ID for the action slot",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "rotateIcon",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Whether to rotate the icon 180 degrees when active (typically for caret icons)",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "SplitButton.ActionButton",
    props: [
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        required: false,
        defaultValue: "button",
        description: "Button type",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the button is disabled",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible label",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-describedby",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible description",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "split-button-action-button",
        description: "Test ID for the action button",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Button title",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$9 = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: `<SplitButton.Root emphasis='strong' size='medium'>
 <SplitButton.Content onPress={() => {}}>Primary Action</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton aria-label="Show more options">
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 3</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  },
  {
    name: "WithIcon",
    description: "",
    isCanonical: false,
    code: `<SplitButton.Root emphasis='strong' size='medium'>
 <SplitButton.Content onPress={() => {}}>
 <IconPlus size={16} />
 Add Item
 </SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Add File</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Add Folder</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Add Link</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  },
  {
    name: "AllEmphasis",
    description: "",
    isCanonical: false,
    code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
 <SplitButton.Root emphasis='strong' size='medium' emphasis="strong">
 <SplitButton.Content onPress={() => {}}>Strong</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>

 <SplitButton.Root emphasis='strong' size='medium' emphasis="default">
 <SplitButton.Content onPress={() => {}}>Default</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>

 <SplitButton.Root emphasis='strong' size='medium' emphasis="weak">
 <SplitButton.Content onPress={() => {}}>Weak</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>
 </div>`
  },
  {
    name: "AllSizes",
    description: "",
    isCanonical: false,
    code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
 <SplitButton.Root emphasis='strong' size='medium' size="small">
 <SplitButton.Content onPress={() => {}}>Small</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={12} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>

 <SplitButton.Root emphasis='strong' size='medium' size="medium">
 <SplitButton.Content onPress={() => {}}>Medium</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>

 <SplitButton.Root emphasis='strong' size='medium' size="large">
 <SplitButton.Content onPress={() => {}}>Large</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={20} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>
 </div>`
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: `<SplitButton.Root emphasis='strong' size='medium' disabled>
 <SplitButton.Content onPress={() => {}}>Disabled Action</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton aria-label="More options">
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  },
  {
    name: "ContentDisabled",
    description: "",
    isCanonical: false,
    code: `<SplitButton.Root emphasis='strong' size='medium'>
 <SplitButton.Content disabled onPress={() => {}}>
 Primary Action (disabled)
 </SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton aria-label="More options">
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 3</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  },
  {
    name: "ActionButtonDisabled",
    description: "",
    isCanonical: false,
    code: `<SplitButton.Root emphasis='strong' size='medium'>
 <SplitButton.Content onPress={() => {}}>Primary Action</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton disabled aria-label="More options (disabled)">
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Option 1</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 2</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Option 3</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  },
  {
    name: "AlternativeIcon",
    description: "",
    isCanonical: false,
    code: `<SplitButton.Root emphasis='strong' size='medium'>
 <SplitButton.Content onPress={() => {}}>More Actions</SplitButton.Content>
 <SplitButton.Action rotateIcon={false}>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconDotsVertical size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Duplicate</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}} emphasis="danger">
 Delete
 </Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  },
  {
    name: "ComplexMenu",
    description: "",
    isCanonical: false,
    code: `<SplitButton.Root emphasis='strong' size='medium'>
 <SplitButton.Content onPress={() => {}}>Save</SplitButton.Content>
 <SplitButton.Action>
 <Dropdown.Root>
 <Dropdown.Trigger asChild>
 <SplitButton.ActionButton>
 <IconCaretDown size={16} />
 </SplitButton.ActionButton>
 </Dropdown.Trigger>
 <Dropdown.Content align="end">
 <Dropdown.Group>
 <Dropdown.Item onSelect={() => {}}>Save and Close</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Save and New</Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>Save As...</Dropdown.Item>
 </Dropdown.Group>
 <Dropdown.Group heading="Export">
 <Dropdown.Item onSelect={() => {}}>
 <Dropdown.Slot name="left">
 <IconIcon size={16} />
 </Dropdown.Slot>
 Export as PDF
 </Dropdown.Item>
 <Dropdown.Item onSelect={() => {}}>
 <Dropdown.Slot name="left">
 <IconIcon size={16} />
 </Dropdown.Slot>
 Export as JSON
 </Dropdown.Item>
 </Dropdown.Group>
 </Dropdown.Content>
 </Dropdown.Root>
 </SplitButton.Action>
 </SplitButton.Root>`
  }
];
const instructions$9 = "Compose as SplitButton.Root > SplitButton.Content + SplitButton.Action. Place a Dropdown.Root inside SplitButton.Action with a SplitButton.ActionButton as the Dropdown.Trigger (use asChild). The emphasis and size on SplitButton.Root apply to both sections. Always provide aria-label on SplitButton.ActionButton describing what the secondary options are.";
const typeDefinitions$9 = {};
const __vite_glob_0_28 = {
  name: name$9,
  description: description$9,
  status: status$9,
  category: category$9,
  tags: tags$9,
  relatedComponents: relatedComponents$9,
  importStatement: importStatement$9,
  props: props$9,
  subComponents: subComponents$9,
  examples: examples$9,
  instructions: instructions$9,
  typeDefinitions: typeDefinitions$9
};
const name$8 = "Switch";
const description$8 = "A boolean toggle for enabling or disabling a setting. Use when toggling takes immediate effect without a form submission.";
const status$8 = "released";
const category$8 = "input";
const tags$8 = [
  "switch",
  "toggle",
  "boolean"
];
const relatedComponents$8 = [
  "Checkbox"
];
const importStatement$8 = "import { Switch } from '@frontify/fondue/components';";
const props$8 = [
  {
    name: "id",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "name",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"small" | "medium" | "large"',
    required: false,
    defaultValue: "medium",
    description: "The size of the switch component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "value",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "The active value in the select component. This is used to control the select externally.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "defaultValue",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "The default value of the select component. Used for uncontrolled usages.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Disables the select component.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "required",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Whether the switch is required.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    required: false,
    defaultValue: null,
    description: "Callback function that is called when the switch is toggled.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onBlur",
    type: "(event: FormEvent<HTMLButtonElement>) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the checkbox is blurred",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onFocus",
    type: "(event: FormEvent<HTMLButtonElement>) => void",
    required: false,
    defaultValue: null,
    description: "Event handler called when the checkbox is focused",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "fondue-switch",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$8 = [];
const examples$8 = [
  {
    name: "Checked",
    description: "",
    isCanonical: false,
    code: "<Switch id='airplane-mode' aria-label='Toggle airplane mode' defaultValue />"
  },
  {
    name: "Unchecked",
    description: "",
    isCanonical: false,
    code: "<Switch id='airplane-mode' aria-label='Toggle airplane mode' />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: "<Switch id='airplane-mode' aria-label='Toggle airplane mode' disabled />"
  },
  {
    name: "Required",
    description: "",
    isCanonical: false,
    code: "<Switch id='airplane-mode' aria-label='Toggle airplane mode' required />"
  },
  {
    name: "WithLabel",
    description: "",
    isCanonical: true,
    code: `<>
 <Label id="label" htmlFor="switch" required={args.required}>
 Switch
 </Label>
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' id="switch" aria-labelledby="label" />
 </>`
  },
  {
    name: "WithLabelRequired",
    description: "",
    isCanonical: false,
    code: `<>
 <Label id="label" htmlFor="switch" required={args.required}>
 Switch
 </Label>
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' required id="switch" aria-labelledby="label" />
 </>`
  },
  {
    name: "WithLabelAndTooltip",
    description: "",
    isCanonical: false,
    code: `<>
 <Label id="label" htmlFor="switch" required={args.required}>
 Switch
 <Tooltip.Root>
 <Tooltip.Trigger>
 <IconQuestionMarkCircle size="16" />
 </Tooltip.Trigger>
 <Tooltip.Content>Tooltip</Tooltip.Content>
 </Tooltip.Root>
 </Label>
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' id="switch" aria-labelledby="label" />
 </>`
  },
  {
    name: "ExternallyControlled",
    description: "",
    isCanonical: false,
    code: "<Switch value={checked} onChange={onChange} id='airplane-mode' aria-label='Toggle airplane mode' />"
  },
  {
    name: "Size",
    description: "",
    isCanonical: false,
    code: `<>
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' size="small" />
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' size="medium" />
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' size="large" />
 </>`
  },
  {
    name: "HugWidth",
    description: "The Switch component does not have a `hugWidth` prop. Instead, control the layout using flex container styles. When `hugWidth: true`, use a flex container with a small gap. When `hugWidth: false`, use a flex container with `justify-between` and full width.",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-4">
 <div>
 <div className="tw-mb-2">hugWidth: true (default) - Use flex with gap</div>
 <div className="tw-flex tw-gap-1.5 tw-items-center">
 <Label id="label-hug-true" htmlFor="switch-hug-true">
 Label
 </Label>
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' id="switch-hug-true" aria-labelledby="label-hug-true" />
 </div>
 </div>
 <div>
 <div className="tw-mb-2">hugWidth: false - Use flex with justify-between and full width</div>
 <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
 <Label id="label-hug-false" htmlFor="switch-hug-false">
 Label
 </Label>
 <Switch id='airplane-mode' aria-label='Toggle airplane mode' id="switch-hug-false" aria-labelledby="label-hug-false" />
 </div>
 </div>
 </div>`
  }
];
const instructions$8 = "Always pair with a Label for accessibility — connect via id/htmlFor or use aria-labelledby. The Switch has no hugWidth prop; control layout using flex containers (use flex + gap for compact, flex + justify-between for full-width label-switch rows). Use Checkbox instead when the toggle is part of a form submitted later.";
const typeDefinitions$8 = {};
const __vite_glob_0_29 = {
  name: name$8,
  description: description$8,
  status: status$8,
  category: category$8,
  tags: tags$8,
  relatedComponents: relatedComponents$8,
  importStatement: importStatement$8,
  props: props$8,
  subComponents: subComponents$8,
  examples: examples$8,
  instructions: instructions$8,
  typeDefinitions: typeDefinitions$8
};
const name$7 = "Table";
const description$7 = "A structured data table for displaying rows and columns of information. Use when presenting tabular data that users need to scan, compare, or sort.";
const status$7 = "released";
const category$7 = "data";
const tags$7 = [
  "table",
  "data",
  "list"
];
const relatedComponents$7 = [
  "OrderableList"
];
const importStatement$7 = "import { Table } from '@frontify/fondue/components';";
const props$7 = [];
const subComponents$7 = [
  {
    name: "Table.Root",
    props: [
      {
        name: "layout",
        type: '"auto" | "fixed"',
        required: false,
        defaultValue: "auto",
        description: "Whether the table should have a fixed or auto layout",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "fontSize",
        type: '"small" | "medium"',
        required: false,
        defaultValue: "medium",
        description: "Font size of the table content",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "gutter",
        type: "BorderSpacing<string | number>",
        required: false,
        defaultValue: "0px",
        description: "Additional spacing between table cells (both horizontal and vertical)\n\nThis value is added to the default cell spacing. For example, with `gutter=\"48px\"`,\ncells will have 48px of additional space between them in both directions\n(24px added to each side).\n\nAccepts any CSS length value with units (e.g., '16px', '1rem', '48px')\n\n**Important:** Always include a unit, even for zero (use '0px', not '0')",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "sticky",
        type: '"head" | "col" | "both"',
        required: false,
        defaultValue: "false",
        description: "Whether header should stick to the top when scrolling",
        deprecated: true,
        deprecationMessage: "Use `Table.Header sticky` prop instead. For sticky columns, use `Table.Body firstColumnSticky` or `lastColumnSticky` props"
      },
      {
        name: "noBorder",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether to remove the top and bottom borders from the table",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Table.Caption",
    props: []
  },
  {
    name: "Table.Header",
    props: [
      {
        name: "sticky",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the header should stick to the top when scrolling",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-busy",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Table.HeaderCell",
    props: [
      {
        name: "scope",
        type: "string",
        required: false,
        defaultValue: "col",
        description: "Scope of the column",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "colSpan",
        type: "number",
        required: false,
        defaultValue: null,
        description: "Number of columns the cell should span",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "width",
        type: "Width<string | number>",
        required: false,
        defaultValue: null,
        description: "Width of the column",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "sortDirection",
        type: '"ascending" | "descending"',
        required: false,
        defaultValue: null,
        description: "Current sort direction of the column",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "align",
        type: '"left" | "center" | "right"',
        required: false,
        defaultValue: "left",
        description: "Horizontal alignment of the content",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "truncate",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether to truncate content with ellipsis when it overflows",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "sortTranslations",
        type: "{ sortAscending?: string; sortDescending?: string; }",
        required: false,
        defaultValue: '"Sort by {column} ascending/descending"',
        description: "Aria label for ascending/descending sort. Variables: {column} - column name",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "noShrink",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the column should have a minimum width",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "state",
        type: '"idle" | "loading"',
        required: false,
        defaultValue: "idle",
        description: "State of the cell, used for displaying loading state",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "loadingStateAriaLabel",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The aria-label to be applied when state='loading'",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onSortChange",
        type: "(direction: SortDirection) => void",
        required: false,
        defaultValue: null,
        description: "Handler called when the sort direction changes",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Table.Body",
    props: [
      {
        name: "firstColumnSticky",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the first column should stick to the left when scrolling horizontally",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "lastColumnSticky",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the last column should stick to the right when scrolling horizontally",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-busy",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Table.Row",
    props: [
      {
        name: "selected",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether the row is in a selected state",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether to disable interactions for this row",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onClick",
        type: "(selected: boolean) => void",
        required: false,
        defaultValue: null,
        description: "Handler called when the row is clicked or activated via keyboard\nIf provided, the row will be hoverable and interactive",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        defaultValue: null,
        description: "Content to be rendered within the row",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Accessible label for the row",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Table.RowCell",
    props: [
      {
        name: "colSpan",
        type: "number",
        required: false,
        defaultValue: null,
        description: "Number of columns the cell should span",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "truncate",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether to truncate content with ellipsis when it overflows",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "align",
        type: '"left" | "center" | "right"',
        required: false,
        defaultValue: "left",
        description: "Horizontal alignment of the content",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$7 = [
  {
    name: "Basic",
    description: "",
    isCanonical: true,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Admin</Table.HeaderCell>
 <Table.HeaderCell>Invited by</Table.HeaderCell>
 <Table.HeaderCell>Last seen</Table.HeaderCell>
 <Table.HeaderCell>Initial login</Table.HeaderCell>
 <Table.HeaderCell>Last login</Table.HeaderCell>
 <Table.HeaderCell>2FA</Table.HeaderCell>
 <Table.HeaderCell>Analytics access</Table.HeaderCell>
 <Table.HeaderCell>Actions</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.email}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>
 <Switch size="small" aria-label="Admin" />
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 <Table.RowCell>{user.initialLogin}</Table.RowCell>
 <Table.RowCell>{user.lastLogin}</Table.RowCell>
 <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
 <Table.RowCell>
 <Switch size="small" aria-label="Analytics" />
 </Table.RowCell>

 <Table.RowCell>
 <Flex gap="0.25rem">
 <Button size="small" aspect="square" emphasis="weak">
 <IconPen size={16} />
 </Button>
 <Button variant="danger" size="small" aspect="square" emphasis="weak">
 <IconTrashBin size={16} />
 </Button>
 </Flex>
 </Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "SmallText",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table' fontSize="small">
 <Table.Header>
 <tr>
 <Table.HeaderCell width="100px">Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </tr>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "AutoLayout",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <tr>
 <Table.HeaderCell width="100px">Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </tr>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "FixedLayout",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table' layout="fixed">
 <Table.Header>
 <tr>
 <Table.HeaderCell width="100px">Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </tr>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "Sortable",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell
 sortDirection={sortField === 'name' ? sortDirection : undefined}
 onSortChange={(direction) => {
 setSortField('name');
 setSortDirection(direction);
 }}
 >
 Name
 </Table.HeaderCell>
 <Table.HeaderCell
 truncate
 sortDirection={sortField === 'invited' ? sortDirection : undefined}
 onSortChange={(direction) => {
 setSortField('invited');
 setSortDirection(direction);
 }}
 state="loading"
 loadingStateAriaLabel="Loading Data"
 >
 Invited by
 </Table.HeaderCell>
 <Table.HeaderCell
 sortDirection={sortField === 'lastSeen' ? sortDirection : undefined}
 onSortChange={(direction) => {
 setSortField('lastSeen');
 setSortDirection(direction);
 }}
 >
 Last seen
 </Table.HeaderCell>
 {/* Other columns without sorting */}
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {sortedUsers.map((user) => (
 <Table.Row key={user.email}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell truncate>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "StickyHead",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header sticky>
 <Table.Row>
 <Table.HeaderCell width="250px">Name</Table.HeaderCell>
 <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
 <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
 <Table.HeaderCell width="120px">Initial login</Table.HeaderCell>
 <Table.HeaderCell width="120px">Last login</Table.HeaderCell>
 <Table.HeaderCell width="80px">2FA</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map(
 (user, index) => (
 <Table.Row key={\`\${user.email}-\${index}\`}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 <Table.RowCell>{user.initialLogin}</Table.RowCell>
 <Table.RowCell>{user.lastLogin}</Table.RowCell>
 <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
 </Table.Row>
 ),
 )}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "StickyFirstColumn",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Invited by</Table.HeaderCell>
 <Table.HeaderCell>Last seen</Table.HeaderCell>
 <Table.HeaderCell>Initial login</Table.HeaderCell>
 <Table.HeaderCell>Last login</Table.HeaderCell>
 <Table.HeaderCell>2FA</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body firstColumnSticky>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.email}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 <Table.RowCell>{user.initialLogin}</Table.RowCell>
 <Table.RowCell>{user.lastLogin}</Table.RowCell>
 <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "StickyHeadAndCol",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header sticky>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Invited by</Table.HeaderCell>
 <Table.HeaderCell>Last seen</Table.HeaderCell>
 <Table.HeaderCell>Initial login</Table.HeaderCell>
 <Table.HeaderCell>Last login</Table.HeaderCell>
 <Table.HeaderCell>2FA</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body firstColumnSticky>
 {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user) => (
 <Table.Row key={user.email}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 <Table.RowCell>{user.initialLogin}</Table.RowCell>
 <Table.RowCell>{user.lastLogin}</Table.RowCell>
 <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "StickyRightColumn",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Invited by</Table.HeaderCell>
 <Table.HeaderCell>Last seen</Table.HeaderCell>
 <Table.HeaderCell>Initial login</Table.HeaderCell>
 <Table.HeaderCell>Last login</Table.HeaderCell>
 <Table.HeaderCell>Actions</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body lastColumnSticky>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.email}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 <Table.RowCell>{user.initialLogin}</Table.RowCell>
 <Table.RowCell>{user.lastLogin}</Table.RowCell>
 <Table.RowCell>
 <Flex gap="0.25rem">
 <Button size="small" aspect="square" emphasis="weak">
 <IconPen size={16} />
 </Button>
 <Button variant="danger" size="small" aspect="square" emphasis="weak">
 <IconTrashBin size={16} />
 </Button>
 </Flex>
 </Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "StickyHeaderAndRightColumn",
    description: "",
    isCanonical: false,
    code: '<Table.Root aria-label=\'User Management Table\'>\n <Table.Header sticky>\n <Table.Row>\n <Table.HeaderCell>Name</Table.HeaderCell>\n <Table.HeaderCell>Invited by</Table.HeaderCell>\n <Table.HeaderCell>Last seen</Table.HeaderCell>\n <Table.HeaderCell>Initial login</Table.HeaderCell>\n <Table.HeaderCell>Last login</Table.HeaderCell>\n <Table.HeaderCell>Actions</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body lastColumnSticky>\n {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => (\n <Table.Row key={`${user.email}-${index}`}>\n <Table.RowCell>\n <div className="tw-flex tw-items-center tw-gap-2">\n <div>\n <div className="tw-font-medium">{user.name}</div>\n <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>\n </div>\n </div>\n </Table.RowCell>\n <Table.RowCell>{user.invited}</Table.RowCell>\n <Table.RowCell>{user.lastSeen}</Table.RowCell>\n <Table.RowCell>{user.initialLogin}</Table.RowCell>\n <Table.RowCell>{user.lastLogin}</Table.RowCell>\n <Table.RowCell>\n <Flex gap="0.25rem">\n <Button size="small" aspect="square" emphasis="weak">\n <IconPen size={16} />\n </Button>\n <Button variant="danger" size="small" aspect="square" emphasis="weak">\n <IconTrashBin size={16} />\n </Button>\n </Flex>\n </Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>'
  },
  {
    name: "Sticky Header, Left & Right Columns",
    description: "",
    isCanonical: false,
    code: '<Table.Root aria-label=\'User Management Table\'>\n <Table.Header sticky>\n <Table.Row>\n <Table.HeaderCell>Name</Table.HeaderCell>\n <Table.HeaderCell>Invited by</Table.HeaderCell>\n <Table.HeaderCell>Last seen</Table.HeaderCell>\n <Table.HeaderCell>Initial login</Table.HeaderCell>\n <Table.HeaderCell>Last login</Table.HeaderCell>\n <Table.HeaderCell>Actions</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body firstColumnSticky lastColumnSticky>\n {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => (\n <Table.Row key={`${user.email}-${index}`}>\n <Table.RowCell>\n <div className="tw-flex tw-items-center tw-gap-2">\n <div>\n <div className="tw-font-medium">{user.name}</div>\n <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>\n </div>\n </div>\n </Table.RowCell>\n <Table.RowCell>{user.invited}</Table.RowCell>\n <Table.RowCell>{user.lastSeen}</Table.RowCell>\n <Table.RowCell>{user.initialLogin}</Table.RowCell>\n <Table.RowCell>{user.lastLogin}</Table.RowCell>\n <Table.RowCell>\n <Flex gap="0.25rem">\n <Button size="small" aspect="square" emphasis="weak">\n <IconPen size={16} />\n </Button>\n <Button variant="danger" size="small" aspect="square" emphasis="weak">\n <IconTrashBin size={16} />\n </Button>\n </Flex>\n </Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>'
  },
  {
    name: "Interactive",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Invited by</Table.HeaderCell>
 <Table.HeaderCell>Last seen</Table.HeaderCell>
 <Table.HeaderCell>Action</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 <Table.RowCell>
 <Button onPress={() => alert('Button pressed — this does NOT trigger row click')}>
 <span>Press me</span>
 </Button>
 </Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: '<Table.Root aria-label=\'User Management Table\'>\n <Table.Header>\n <Table.Row>\n <Table.HeaderCell>Name</Table.HeaderCell>\n <Table.HeaderCell>Invited by</Table.HeaderCell>\n <Table.HeaderCell>Last seen</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body>\n {TABLE_DATA.map((user, index) => (\n <Table.Row\n key={user.email}\n onClick={() => alert(`Clicked on ${user.name}`)}\n disabled={index % 3 === 0}\n >\n <Table.RowCell>\n <div className="tw-flex tw-items-center tw-gap-2">\n <div>\n <div className="tw-font-medium">{user.name}</div>\n <div className="tw-body-small tw-text-secondary">{user.email}</div>\n </div>\n </div>\n </Table.RowCell>\n <Table.RowCell>{user.invited}</Table.RowCell>\n <Table.RowCell>{user.lastSeen}</Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>'
  },
  {
    name: "WithCaption",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Caption>User Management Dashboard</Table.Caption>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Invited by</Table.HeaderCell>
 <Table.HeaderCell>Last seen</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.slice(0, 5).map((user) => (
 <Table.Row key={user.email}>
 <Table.RowCell>
 <div className="tw-flex tw-items-center tw-gap-2">
 <div>
 <div className="tw-font-medium">{user.name}</div>
 <div className="tw-body-small tw-text-secondary">{user.email}</div>
 </div>
 </div>
 </Table.RowCell>
 <Table.RowCell>{user.invited}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "TruncatedContent",
    description: "",
    isCanonical: false,
    code: "<div style={{ width: '500px' }}>\n <Table.Root aria-label='User Management Table'>\n <Table.Header>\n <Table.Row>\n <Table.HeaderCell truncate>Name</Table.HeaderCell>\n <Table.HeaderCell>Invited by</Table.HeaderCell>\n <Table.HeaderCell truncate>Last seen</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body>\n {TABLE_DATA.slice(0, 5).map((user) => (\n <Table.Row key={user.email}>\n <Table.RowCell truncate>{user.name}</Table.RowCell>\n <Table.RowCell>{user.invited}</Table.RowCell>\n <Table.RowCell truncate>{user.lastSeen}</Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>\n </div>"
  },
  {
    name: "WithSearchAndFilters",
    description: "",
    isCanonical: false,
    code: `<Flex direction="column" gap="1rem">
 <Flex gap="1rem">
 <TextInput
 placeholder="Search..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 >
 <TextInput.Slot>
 <IconMagnifier size="16" />
 </TextInput.Slot>
 </TextInput>
 <Dropdown.Root>
 <Dropdown.Trigger>
 <Button emphasis="default">
 <IconFunnel size="16" />
 Filter by age
 </Button>
 </Dropdown.Trigger>
 <Dropdown.Content>
 <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
 <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
 <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
 </Dropdown.Content>
 </Dropdown.Root>
 </Flex>

 <Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Age</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {filteredAndSortedData.map((user) => (
 <Table.Row key={user.id} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.age}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>
 </Flex>`
  },
  {
    name: "WithSelection",
    description: "",
    isCanonical: false,
    code: "<Table.Root aria-label='User Management Table' aria-multiselectable>\n <Table.Header>\n <Table.Row>\n <Table.HeaderCell>\n <Checkbox\n value={isPartiallySelected ? 'indeterminate' : isAllSelected}\n onChange={handleSelectAll}\n />\n </Table.HeaderCell>\n <Table.HeaderCell>Name</Table.HeaderCell>\n <Table.HeaderCell>Age</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body>\n {TABLE_DATA.map((user) => (\n <Table.Row\n key={user.id}\n selected={selectedRows.has(user.id)}\n onClick={() => console.log(`View details for ${user.firstName}`)}\n >\n <Table.RowCell>\n <Checkbox\n value={selectedRows.has(user.id)}\n onChange={(event) => handleSelectRow(event, user.id)}\n />\n </Table.RowCell>\n <Table.RowCell>{user.name}</Table.RowCell>\n <Table.RowCell>{user.age}</Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>"
  },
  {
    name: "Cell Alignment Options",
    description: "",
    isCanonical: false,
    code: `<Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
 <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
 <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
 <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell align="left">{user.firstName}</Table.RowCell>
 <Table.RowCell align="center">{user.role}</Table.RowCell>
 <Table.RowCell align="right">{user.age}</Table.RowCell>
 <Table.RowCell>
 <Flex justify="space-between" align="center">
 <span>{user.invited}</span>
 <span>{user.lastLogin}</span>
 </Flex>
 </Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>`
  },
  {
    name: "WidthControl",
    description: "",
    isCanonical: false,
    code: '<div style={{ width: \'800px\' }}>\n <Table.Root aria-label=\'User Management Table\' layout="fixed">\n <Table.Header>\n <Table.Row>\n <Table.HeaderCell width="100px">Fixed Width & No Shrink</Table.HeaderCell>\n <Table.HeaderCell width="100px" truncate>\n Truncated Very Long Header Title That Should Be Cut Off\n </Table.HeaderCell>\n <Table.HeaderCell width="50%">Percentage Width</Table.HeaderCell>\n <Table.HeaderCell>Auto Width</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body>\n {TABLE_DATA.map((user) => (\n <Table.Row key={user.id}>\n <Table.RowCell>Fixed Width Content</Table.RowCell>\n <Table.RowCell truncate>\n {`${user.firstName} ${user.lastName} - ${user.role} - ${user.lastLogin}`}\n </Table.RowCell>\n <Table.RowCell>Normal Cell</Table.RowCell>\n <Table.RowCell>Auto Width Content</Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>\n </div>'
  },
  {
    name: "No Border (Within Container)",
    description: "",
    isCanonical: false,
    code: `<Flex direction="column" gap="2rem">
 <div>
 <h3 style={{ marginBottom: '0.5rem' }}>Without noBorder (default)</h3>
 <div style={{ border: '1px solid var(--color-line-mid)', borderRadius: '8px', padding: '0 1rem' }}>
 <Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.slice(0, 3).map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>
 </div>
 </div>
 <div>
 <h3 style={{ marginBottom: '0.5rem' }}>With noBorder=true</h3>
 <div style={{ border: '1px solid var(--color-line-mid)', borderRadius: '8px', padding: '0 1rem' }}>
 <Table.Root aria-label='User Management Table' noBorder>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.slice(0, 3).map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>
 </div>
 </div>
 </Flex>`
  },
  {
    name: "Custom Gutter Spacing",
    description: "",
    isCanonical: false,
    code: `<Flex direction="column" gap="2rem">
 <div>
 <h3 style={{ marginBottom: '0.5rem' }}>Default (no extra gutter)</h3>
 <Table.Root aria-label='User Management Table'>
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.slice(0, 3).map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>
 </div>
 <div>
 <h3 style={{ marginBottom: '0.5rem' }}>16px gutter</h3>
 <Table.Root aria-label='User Management Table' gutter="16px">
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.slice(0, 3).map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>
 </div>
 <div>
 <h3 style={{ marginBottom: '0.5rem' }}>48px gutter</h3>
 <Table.Root aria-label='User Management Table' gutter="48px">
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Role</Table.HeaderCell>
 <Table.HeaderCell>Last Seen</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {TABLE_DATA.slice(0, 3).map((user) => (
 <Table.Row key={user.id}>
 <Table.RowCell>{user.name}</Table.RowCell>
 <Table.RowCell>{user.role}</Table.RowCell>
 <Table.RowCell>{user.lastSeen}</Table.RowCell>
 </Table.Row>
 ))}
 </Table.Body>
 </Table.Root>
 </div>
 </Flex>`
  },
  {
    name: "Minimum Width Columns (Last Expands)",
    description: "",
    isCanonical: false,
    code: "<Table.Root aria-label='User Management Table'>\n <Table.Header>\n <Table.Row>\n <Table.HeaderCell noShrink>Name</Table.HeaderCell>\n <Table.HeaderCell noShrink>Role</Table.HeaderCell>\n <Table.HeaderCell>Last Seen (Expands)</Table.HeaderCell>\n </Table.Row>\n </Table.Header>\n <Table.Body>\n {TABLE_DATA.slice(0, 3).map((user) => (\n <Table.Row key={user.id}>\n <Table.RowCell>{user.name}</Table.RowCell>\n <Table.RowCell>{user.role}</Table.RowCell>\n <Table.RowCell>{user.lastSeen}</Table.RowCell>\n </Table.Row>\n ))}\n </Table.Body>\n </Table.Root>"
  }
];
const instructions$7 = "Compose as Table.Root > Table.Header + Table.Body. Inside Table.Header use Table.HeaderCell for column headers. Inside Table.Body use Table.Row > Table.RowCell for data rows. Use Table.Caption for an accessible table title. Use OrderableList instead when rows need to be reordered by the user.";
const typeDefinitions$7 = {
  SortDirection: '"ascending" | "descending" | undefined'
};
const __vite_glob_0_30 = {
  name: name$7,
  description: description$7,
  status: status$7,
  category: category$7,
  tags: tags$7,
  relatedComponents: relatedComponents$7,
  importStatement: importStatement$7,
  props: props$7,
  subComponents: subComponents$7,
  examples: examples$7,
  instructions: instructions$7,
  typeDefinitions: typeDefinitions$7
};
const name$6 = "Tabs";
const description$6 = "A tabbed navigation component that switches between associated content panels. Use when content is divided into distinct sections that users switch between without leaving the page.";
const status$6 = "released";
const category$6 = "navigation";
const tags$6 = [
  "tabs",
  "navigation",
  "panel"
];
const relatedComponents$6 = [
  "SegmentedControl",
  "Accordion"
];
const importStatement$6 = "import { Tabs } from '@frontify/fondue/components';";
const props$6 = [];
const subComponents$6 = [
  {
    name: "Tabs.Tab",
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Tabs.Root",
    props: [
      {
        name: "id",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "padding",
        type: '"none" | "tight" | "compact" | "comfortable" | "spacious"',
        required: false,
        defaultValue: "compact",
        description: "Define the padding of the dialog",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "defaultActiveTab",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The default active tab\nUsed for uncontrolled components",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "activeTab",
        type: "string",
        required: false,
        defaultValue: null,
        description: "The controlled value of the active tab",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "size",
        type: '"medium" | "large"',
        required: false,
        defaultValue: "medium",
        description: "The height of the tabs",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onActiveTabChange",
        type: "(value: string) => void",
        required: false,
        defaultValue: null,
        description: "Event handler called when the active tab changes",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "variant",
        type: '"default" | "pill"',
        required: false,
        defaultValue: "default",
        description: "Select the used variant",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "withDivider",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Add a divider line below the tabs\nOnly available when variant is 'pill'\nUseful for tabs placed inside Dialog content",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Tabs.Trigger",
    props: []
  },
  {
    name: "Tabs.Content",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples$6 = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: '<Tabs.Root >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithDefaultActiveTab",
    description: "",
    isCanonical: false,
    code: `<Tabs.Root defaultActiveTab='second'>
 <Tabs.Tab value="first">
 <Tabs.Trigger>First Tab</Tabs.Trigger>
 <Tabs.Content>
 <b>First Content</b>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
 et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
 aliquip ex ea commodo consequat.
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="second">
 <Tabs.Trigger>Second Tab</Tabs.Trigger>
 <Tabs.Content>
 <b>Second Content</b>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
 et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
 aliquip ex ea commodo consequat.
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="third">
 <Tabs.Trigger>Third Tab</Tabs.Trigger>
 <Tabs.Content>
 <b>Third Content</b>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
 et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
 aliquip ex ea commodo consequat.
 </Tabs.Content>
 </Tabs.Tab>
 </Tabs.Root>`
  },
  {
    name: "ExternallyControlled",
    description: "",
    isCanonical: false,
    code: `<Tabs.Root defaultActiveTab='second' activeTab={activeTab} onActiveTabChange={setActiveTab}>
 <Tabs.Tab value="first">
 <Tabs.Trigger>First Tab</Tabs.Trigger>
 <Tabs.Content>
 <b>First Content</b>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
 labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
 laboris nisi ut aliquip ex ea commodo consequat.
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="second">
 <Tabs.Trigger>Second Tab</Tabs.Trigger>
 <Tabs.Content>
 <b>Second Content</b>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
 labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
 laboris nisi ut aliquip ex ea commodo consequat.
 </Tabs.Content>
 </Tabs.Tab>
 <Tabs.Tab value="third">
 <Tabs.Trigger>Third Tab</Tabs.Trigger>
 <Tabs.Content>
 <b>Third Content</b>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
 labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
 laboris nisi ut aliquip ex ea commodo consequat.
 </Tabs.Content>
 </Tabs.Tab>
 </Tabs.Root>`
  },
  {
    name: "DisabledTabs",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root >\n <Tabs.Tab value="first">\n <Tabs.Trigger>\n <span>First Tab</span>\n </Tabs.Trigger>\n <Tabs.Content>\n First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation\n ullamco laboris nisi ut aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second" disabled>\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third" disabled>\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithDecorator",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root >\n <Tabs.Tab value="first">\n <Tabs.Trigger>\n <IconIcon size={20} />\n First Tab\n </Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>\n Second Tab\n <IconIcon size={20} />\n </Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third" disabled>\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithBadge",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root >\n <Tabs.Tab value="first">\n <Tabs.Trigger>\n First Tab <Badge variant="highlight">Beta</Badge>\n </Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>\n Third Tab <Badge variant="highlight">Beta</Badge>\n </Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithNoPadding",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root padding="none" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithTightPadding",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root padding="tight" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithCompactPadding",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root padding="compact" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithComfortablePadding",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root padding="comfortable" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithSpaciousPadding",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root padding="spacious" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "WithPillVariant",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root variant="pill" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>First Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>Third Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "PillVariantWithBadge",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root variant="pill" >\n <Tabs.Tab value="first">\n <Tabs.Trigger>\n First Tab <Badge variant="highlight">Beta</Badge>\n </Tabs.Trigger>\n <Tabs.Content>\n <b>First Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="second">\n <Tabs.Trigger>Second Tab</Tabs.Trigger>\n <Tabs.Content>\n <b>Second Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="third">\n <Tabs.Trigger>\n Third Tab <Badge variant="highlight">Beta</Badge>\n </Tabs.Trigger>\n <Tabs.Content>\n <b>Third Content</b>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n aliquip ex ea commodo consequat.\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  },
  {
    name: "PillVariantWithDivider",
    description: "",
    isCanonical: false,
    code: '<Tabs.Root variant="pill" withDivider >\n <Tabs.Tab value="general">\n <Tabs.Trigger>General</Tabs.Trigger>\n <Tabs.Content>\n <b>General Settings</b>\n <p>\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n labore et dolore magna aliqua.\n </p>\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="team">\n <Tabs.Trigger>Team</Tabs.Trigger>\n <Tabs.Content>\n <b>Team Settings</b>\n <p>\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n consequat.\n </p>\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="targets">\n <Tabs.Trigger>Targets</Tabs.Trigger>\n <Tabs.Content>\n <b>Target Settings</b>\n <p>\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n pariatur.\n </p>\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="share">\n <Tabs.Trigger>Share</Tabs.Trigger>\n <Tabs.Content>\n <b>Share Settings</b>\n <p>\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim\n id est laborum.\n </p>\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="analytics">\n <Tabs.Trigger>Analytics</Tabs.Trigger>\n <Tabs.Content>\n <b>Analytics Settings</b>\n <p>\n Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque\n laudantium.\n </p>\n </Tabs.Content>\n </Tabs.Tab>\n <Tabs.Tab value="changelog">\n <Tabs.Trigger>Changelog</Tabs.Trigger>\n <Tabs.Content>\n <b>Changelog</b>\n <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>\n </Tabs.Content>\n </Tabs.Tab>\n </Tabs.Root>'
  }
];
const instructions$6 = "Compose as Tabs.Root > Tabs.Tab (one per tab). Each Tabs.Tab contains a Tabs.Trigger (the tab label) and a Tabs.Content (the panel). Each Tabs.Tab requires a unique value prop. Use defaultActiveTab for uncontrolled or activeTab + onActiveTabChange for controlled. Use variant='pill' with withDivider=true when placing tabs inside a Dialog or other contained surface. Use SegmentedControl for view-mode toggles that don't show a content panel below.";
const typeDefinitions$6 = {};
const __vite_glob_0_31 = {
  name: name$6,
  description: description$6,
  status: status$6,
  category: category$6,
  tags: tags$6,
  relatedComponents: relatedComponents$6,
  importStatement: importStatement$6,
  props: props$6,
  subComponents: subComponents$6,
  examples: examples$6,
  instructions: instructions$6,
  typeDefinitions: typeDefinitions$6
};
const name$5 = "Tag";
const description$5 = "An interactive chip label for representing metadata, filters, or user-selected values. Use when labels need to be removable, addable, or carry secondary content.";
const status$5 = "released";
const category$5 = "feedback";
const tags$5 = [
  "tag",
  "badge",
  "label"
];
const relatedComponents$5 = [
  "Badge",
  "Notice"
];
const importStatement$5 = "import { Tag } from '@frontify/fondue/components';";
const props$5 = [
  {
    name: "emphasis",
    type: '"strong" | "weak"',
    required: false,
    defaultValue: "strong",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "variant",
    type: '"default" | "highlight"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "size",
    type: '"default" | "small"',
    required: false,
    defaultValue: "default",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "disabled",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onDismiss",
    type: "(event?: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
    required: false,
    defaultValue: null,
    description: "Click handler on dismiss - providing this will show the dismiss button",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onAddClick",
    type: "(event?: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
    required: false,
    defaultValue: null,
    description: "Click handler on add click - providing this will show the add button",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "title",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "data-test-id",
    type: "string",
    required: false,
    defaultValue: "tag",
    description: "",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "onClick",
    type: "undefined",
    required: false,
    defaultValue: null,
    description: "",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$5 = [
  {
    name: "Tag.HoverContent",
    props: []
  },
  {
    name: "Tag.SecondaryContent",
    props: []
  }
];
const examples$5 = [
  {
    name: "LabelOnly",
    description: "",
    isCanonical: true,
    code: "<Tag emphasis='strong' variant='default' size='default'>Text</Tag>"
  },
  {
    name: "WithSecondaryContent",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>\n Text\n <Tag.SecondaryContent>Secondary</Tag.SecondaryContent>\n </Tag>"
  },
  {
    name: "WithOnClick",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>Text</Tag>"
  },
  {
    name: "WithDismiss",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>Text</Tag>"
  },
  {
    name: "WithAddable",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>Text</Tag>"
  },
  {
    name: "WithOnClickAndDismiss",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>Text</Tag>"
  },
  {
    name: "WithIcon",
    description: "",
    isCanonical: false,
    code: `<Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" />
 Text
 </Tag>`
  },
  {
    name: "WithIconOnBothSides",
    description: "",
    isCanonical: false,
    code: `<Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" />
 Text
 <IconColorFan size="16" />
 </Tag>`
  },
  {
    name: "WithOnClickAndIcon",
    description: "",
    isCanonical: false,
    code: `<Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>`
  },
  {
    name: "BetweenElements",
    description: "",
    isCanonical: false,
    code: `<>
 before{' '}
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>{' '}
 after
 </>`
  },
  {
    name: "WithHoverContent",
    description: "",
    isCanonical: false,
    code: `<Tag emphasis='strong' variant='default' size='default'>
 This is a tag!
 <Tag.HoverContent>
 <div className="tw-flex tw-w-full tw-justify-center">
 <IconDotsHorizontal />
 </div>
 </Tag.HoverContent>
 </Tag>`
  },
  {
    name: "WithSecondaryContentBefore",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>\n <Tag.SecondaryContent>Before</Tag.SecondaryContent>\n Main content\n </Tag>"
  },
  {
    name: "WithMultipleSecondaryContent",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>\n <Tag.SecondaryContent>First</Tag.SecondaryContent>\n Main content\n <Tag.SecondaryContent>Second</Tag.SecondaryContent>\n </Tag>"
  },
  {
    name: "WithBothSlotTypes",
    description: "",
    isCanonical: false,
    code: "<Tag emphasis='strong' variant='default' size='default'>\n <Tag.SecondaryContent>Prefix</Tag.SecondaryContent>\n Main content\n <Tag.HoverContent>\n <IconDotsHorizontal />\n </Tag.HoverContent>\n <Tag.SecondaryContent>Suffix</Tag.SecondaryContent>\n </Tag>"
  },
  {
    name: "MultipleTagsInRow",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>
 <Tag emphasis='strong' variant='default' size='default'>
 <IconColorFan size="16" /> Text
 </Tag>
 </div>`
  }
];
const instructions$5 = "Provide onDismiss to show a dismiss (×) button. Provide onAddClick to show an add (+) button. Use Tag.SecondaryContent for additional metadata displayed within the tag (can appear before or after main content). Use Tag.HoverContent to replace the tag's content with alternative content on hover.";
const typeDefinitions$5 = {};
const __vite_glob_0_32 = {
  name: name$5,
  description: description$5,
  status: status$5,
  category: category$5,
  tags: tags$5,
  relatedComponents: relatedComponents$5,
  importStatement: importStatement$5,
  props: props$5,
  subComponents: subComponents$5,
  examples: examples$5,
  instructions: instructions$5,
  typeDefinitions: typeDefinitions$5
};
const name$4 = "Text";
const description$4 = "A body text typography element for rendering paragraphs, inline text, and labels with design-system font styles.";
const status$4 = "";
const category$4 = "typography";
const tags$4 = [
  "text",
  "paragraph",
  "typography"
];
const relatedComponents$4 = [
  "Heading",
  "Label"
];
const importStatement$4 = "import { Text } from '@frontify/fondue/components';";
const props$4 = [];
const subComponents$4 = [];
const examples$4 = [];
const instructions$4 = "Use the as prop to control the HTML element (span by default, also p, li, label, etc.). Use size (x-small to large) and weight (default, strong, x-strong) to set typography. Use color for semantic text colors. Use boxColor when the text appears inside a colored container and needs a contextual color. Use Heading for h1–h6 heading elements.";
const typeDefinitions$4 = {};
const __vite_glob_0_33 = {
  name: name$4,
  description: description$4,
  status: status$4,
  category: category$4,
  tags: tags$4,
  relatedComponents: relatedComponents$4,
  importStatement: importStatement$4,
  props: props$4,
  subComponents: subComponents$4,
  examples: examples$4,
  instructions: instructions$4,
  typeDefinitions: typeDefinitions$4
};
const name$3 = "TextInput";
const description$3 = "A single-line text input field for collecting short text values. Use for names, emails, URLs, search queries, and other single-line form inputs.";
const status$3 = "released";
const category$3 = "input";
const tags$3 = [
  "text-input",
  "form",
  "input"
];
const relatedComponents$3 = [
  "Textarea",
  "EditableText"
];
const importStatement$3 = "import { TextInput } from '@frontify/fondue/components';";
const props$3 = [];
const subComponents$3 = [];
const examples$3 = [
  {
    name: "Text",
    description: "",
    isCanonical: true,
    code: "<TextFieldRoot placeholder='Placeholder' defaultValue='Hello from Frontify' />"
  },
  {
    name: "Password",
    description: "",
    isCanonical: false,
    code: "<TextFieldRoot placeholder='Placeholder' defaultValue='Hello from Frontify' type='password' />"
  },
  {
    name: "Disabled",
    description: "",
    isCanonical: false,
    code: `<>
 <TextInput placeholder='Placeholder' defaultValue='Hello from Frontify' disabled />
 <TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify' disabled>
 <TextInput.Slot>
 <IconIcon size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 <Button aspect="square" rounding="full" emphasis="weak" size="small" disabled>
 <IconIcon size={16} />
 </Button>
 </TextInput.Slot>
 </TextInput.Root>
 </>`
  },
  {
    name: "Readonly",
    description: "",
    isCanonical: false,
    code: `<>
 <TextInput placeholder='Placeholder' defaultValue='Hello from Frontify' readOnly />

 <TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify' readOnly>
 <TextInput.Slot>
 <IconIcon size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 {!args.readOnly ? (
 <Button aspect="square" rounding="full" emphasis="weak" size="small" disabled>
 <IconIcon size={16} />
 </Button>
 ) : null}
 </TextInput.Slot>
 </TextInput.Root>
 </>`
  },
  {
    name: "WithLeftItem",
    description: "",
    isCanonical: false,
    code: `<TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify'>
 <TextInput.Slot name="left">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>`
  },
  {
    name: "WithRightItem",
    description: "",
    isCanonical: false,
    code: `<TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify'>
 <TextInput.Slot name="right">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>`
  },
  {
    name: "WithLeftAndRightItem",
    description: "",
    isCanonical: false,
    code: `<TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify'>
 <TextInput.Slot name="left">
 <IconPen size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>`
  },
  {
    name: "WithButtons",
    description: "",
    isCanonical: false,
    code: `<TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify'>
 <TextInput.Slot name="right">
 <Button aspect="square" rounding="full" emphasis="weak" size="small">
 <IconIcon size={16} />
 </Button>
 <Button aspect="square" rounding="full" emphasis="weak" size="small">
 <IconIcon size={16} />
 </Button>
 </TextInput.Slot>
 </TextInput.Root>`
  },
  {
    name: "WithLabel",
    description: "",
    isCanonical: false,
    code: `<div className="tw-flex tw-flex-col tw-gap-2">
 <Label htmlFor="text-input">Label</Label>

 <TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify' id="text-input">
 <TextInput.Slot name="left">
 <IconPen size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>
 </div>`
  },
  {
    name: "Success",
    description: "",
    isCanonical: false,
    code: `<Flex gap={2} direction="column">
 <TextInput placeholder='Placeholder' defaultValue='Hello from Frontify' status='success' />
 <TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify' status='success'>
 <TextInput.Slot name="left">
 <IconPen size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>
 </Flex>`
  },
  {
    name: "Errored",
    description: "",
    isCanonical: false,
    code: `<Flex gap={2} direction="column">
 <TextInput placeholder='Placeholder' defaultValue='Hello from Frontify' status='error' />
 <TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify' status='error'>
 <TextInput.Slot name="left">
 <IconPen size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>
 </Flex>`
  },
  {
    name: "Loading",
    description: "",
    isCanonical: false,
    code: `<TextInput.Root placeholder='Placeholder' defaultValue='Hello from Frontify' status='loading'>
 <TextInput.Slot name="left">
 <IconPen size={16} />
 </TextInput.Slot>
 <TextInput.Slot name="right">
 <IconIcon size={16} />
 </TextInput.Slot>
 </TextInput.Root>`
  }
];
const instructions$3 = "Use the simple TextInput for basic inputs, or compose TextInput.Root > TextInput.Slot for inputs with icon or button decorators. TextInput.Slot accepts name='left' or 'right'. Use status prop ('success', 'error', 'loading') to communicate validation state. Always pair with a Label for accessibility. Use Textarea for multi-line input.";
const typeDefinitions$3 = {};
const __vite_glob_0_34 = {
  name: name$3,
  description: description$3,
  status: status$3,
  category: category$3,
  tags: tags$3,
  relatedComponents: relatedComponents$3,
  importStatement: importStatement$3,
  props: props$3,
  subComponents: subComponents$3,
  examples: examples$3,
  instructions: instructions$3,
  typeDefinitions: typeDefinitions$3
};
const name$2 = "Textarea";
const description$2 = "A multi-line text input for collecting longer text content such as descriptions, comments, or messages.";
const status$2 = "released";
const category$2 = "input";
const tags$2 = [
  "textarea",
  "form",
  "input"
];
const relatedComponents$2 = [
  "TextInput",
  "EditableText"
];
const importStatement$2 = "import { Textarea } from '@frontify/fondue/components';";
const props$2 = [];
const subComponents$2 = [];
const examples$2 = [
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<TextareaRoot defaultValue='Hello from Frontify' minRows={1} placeholder='Placeholder' selectable />"
  },
  {
    name: "WithDecoratorAndAutosize",
    description: "",
    isCanonical: false,
    code: "<TextareaRoot autosize defaultValue='Hello from Frontify' minRows={1} placeholder='Enter some long form text here' selectable decorator={<IconNook size={16} />} />"
  },
  {
    name: "Required",
    description: "",
    isCanonical: false,
    code: "<TextareaRoot defaultValue='Hello from Frontify' minRows={1} placeholder='Enter some long form text here' selectable required />"
  },
  {
    name: "WithSlots",
    description: "",
    isCanonical: false,
    code: `<Textarea.Root autosize defaultValue='Hello from Frontify' minRows={1} placeholder='Enter some long form text here' selectable>
 <Textarea.Slot name="left">
 <IconNook size={16} />
 </Textarea.Slot>
 <Textarea.Slot name="right">
 <button onClick={() => alert('Action clicked!')} style={{ cursor: 'pointer' }}>
 <IconClipboard size={16} />
 </button>
 </Textarea.Slot>
 </Textarea.Root>`
  }
];
const instructions$2 = "Use autosize to automatically grow the height as the user types. Use minRows to set the minimum visible height. Use Textarea.Root > Textarea.Slot for adding icon or action decorators on the left or right. Use TextInput for single-line input. Use EditableText for inline editing without a visible input border.";
const typeDefinitions$2 = {};
const __vite_glob_0_35 = {
  name: name$2,
  description: description$2,
  status: status$2,
  category: category$2,
  tags: tags$2,
  relatedComponents: relatedComponents$2,
  importStatement: importStatement$2,
  props: props$2,
  subComponents: subComponents$2,
  examples: examples$2,
  instructions: instructions$2,
  typeDefinitions: typeDefinitions$2
};
const name$1 = "ThemeProvider";
const description$1 = "A root context provider that applies theming, text direction, and translations to all fondue components in its subtree. Required at the top level of any application using this component library.";
const status$1 = "";
const category$1 = "utility";
const tags$1 = [
  "theme",
  "provider",
  "context"
];
const relatedComponents$1 = [
  "RouterProvider"
];
const importStatement$1 = "import { ThemeProvider } from '@frontify/fondue/components';";
const props$1 = [
  {
    name: "theme",
    type: '"light" | "base" | "dark"',
    required: false,
    defaultValue: "light",
    description: "The theme to apply",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "dir",
    type: '"ltr" | "rtl"',
    required: false,
    defaultValue: "ltr",
    description: "Direction to apply to the theme",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "translations",
    type: "Translations",
    required: false,
    defaultValue: "{\n    translationStrings: translations,\n    dateLocale,\n}",
    description: "Translations object to use for component strings.\nImport from '@frontify/fondue/components/locales' or provide your own.\nMust be a complete Translations object.",
    deprecated: false,
    deprecationMessage: ""
  },
  {
    name: "asChild",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
    deprecated: false,
    deprecationMessage: ""
  }
];
const subComponents$1 = [];
const examples$1 = [];
const instructions$1 = "Wrap the entire application (or at minimum all fondue components) with ThemeProvider. Use theme='light' (default) or 'dark'. Use dir='rtl' for right-to-left language support. Provide a translations object from '@frontify/fondue/components/locales' or a custom Translations object for localized UI strings used by components. Use asChild to merge ThemeProvider onto an existing root element.";
const typeDefinitions$1 = {
  Translations: "{\n    translationStrings: typeof enUS.translationStrings;\n    dateLocale: Locale;\n}",
  Locale: "(typeof availableLocales)[number]"
};
const __vite_glob_0_36 = {
  name: name$1,
  description: description$1,
  status: status$1,
  category: category$1,
  tags: tags$1,
  relatedComponents: relatedComponents$1,
  importStatement: importStatement$1,
  props: props$1,
  subComponents: subComponents$1,
  examples: examples$1,
  instructions: instructions$1,
  typeDefinitions: typeDefinitions$1
};
const name = "Tooltip";
const description = "A hover-triggered hint overlay that provides additional context for an element. Use for icon-only buttons, truncated text, or any UI element that benefits from a brief explanation.";
const status = "released";
const category = "overlay";
const tags = [
  "tooltip",
  "hint",
  "popover"
];
const relatedComponents = [
  "Flyout",
  "Dialog"
];
const importStatement = "import { Tooltip } from '@frontify/fondue/components';";
const props = [];
const subComponents = [
  {
    name: "Tooltip.Root",
    props: [
      {
        name: "open",
        type: "boolean",
        required: false,
        defaultValue: null,
        description: "Sets the open state of the tooltip.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        defaultValue: null,
        description: "Callback that is called when the open state of the tooltip changes.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "enterDelay",
        type: "number",
        required: false,
        defaultValue: "700",
        description: "The delay in milliseconds before the tooltip appears.",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Tooltip.Trigger",
    props: [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-tooltip-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  },
  {
    name: "Tooltip.Content",
    props: [
      {
        name: "padding",
        type: '"spacious" | "compact"',
        required: false,
        defaultValue: "spacious",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        required: false,
        defaultValue: null,
        description: "Defines the preferred side of the tooltip. It will not be respected if there are collisions with the viewport.",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "maxWidth",
        type: "string",
        required: false,
        defaultValue: null,
        description: "",
        deprecated: false,
        deprecationMessage: ""
      },
      {
        name: "data-test-id",
        type: "string",
        required: false,
        defaultValue: "fondue-tooltip-content",
        description: "",
        deprecated: false,
        deprecationMessage: ""
      }
    ]
  }
];
const examples = [
  {
    name: "LongText",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='spacious' side='top' maxWidth='200px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "Compact",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='compact' side='top' maxWidth='200px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "TopWithCollision",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='spacious' side='top' maxWidth='200px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "TopWithoutCollision",
    description: "",
    isCanonical: false,
    code: `<div className="tw-mt-64">
 <Tooltip.Root>
 <Tooltip.Trigger>
 <Button>Hover over me!</Button>
 </Tooltip.Trigger>
 <Tooltip.Content padding='spacious' side='top' maxWidth='200px' />
 </Tooltip.Root>
 </div>`
  },
  {
    name: "LeftWithCollision",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='spacious' side='left' maxWidth='200px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "LeftWithoutCollision",
    description: "",
    isCanonical: false,
    code: `<div className="tw-ml-64">
 <Tooltip.Root>
 <Tooltip.Trigger>
 <Button>Hover over me!</Button>
 </Tooltip.Trigger>
 <Tooltip.Content padding='spacious' side='left' maxWidth='200px' />
 </Tooltip.Root>
 </div>`
  },
  {
    name: "Bottom",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='spacious' side='bottom' maxWidth='200px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "Right",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='spacious' side='right' maxWidth='200px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "WithMaxWidth",
    description: "",
    isCanonical: false,
    code: "<TooltipContent padding='spacious' side='top' maxWidth='400px'>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n</TooltipContent>"
  },
  {
    name: "Default",
    description: "",
    isCanonical: true,
    code: "<TooltipRoot />"
  },
  {
    name: "NoDelay",
    description: "",
    isCanonical: false,
    code: "<TooltipRoot enterDelay={0} />"
  },
  {
    name: "LongDelay",
    description: "",
    isCanonical: false,
    code: "<TooltipRoot enterDelay={2000} />"
  },
  {
    name: "ControlledComponent",
    description: "",
    isCanonical: false,
    code: "<>\n                <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>\n                    <Tooltip.Trigger>\n                        <Button>Hover over me!</Button>\n                    </Tooltip.Trigger>\n                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>\n                </Tooltip.Root>\n                <Button onPress={() => setIsTooltipOpen(true)}>Open Tooltip</Button>\n                <Button onPress={() => setIsTooltipOpen(false)}>Close Tooltip</Button>\n            </>"
  },
  {
    name: "WithSwitch",
    description: "",
    isCanonical: false,
    code: '<Flex direction="row" gap="4px" align="flex-start">\n            <Switch id="switch" aria-label="Hover me!" />\n            <Label htmlFor="switch">\n                <Tooltip.Root>\n                    <Tooltip.Trigger>\n                        <IconInfo size={16} />\n                    </Tooltip.Trigger>\n                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>\n                </Tooltip.Root>\n            </Label>\n        </Flex>'
  },
  {
    name: "WithTextInput",
    description: "",
    isCanonical: false,
    code: '<TextInput.Root>\n            <TextInput.Slot name="left">\n                <Tooltip.Root>\n                    <Tooltip.Trigger>\n                        <IconPen size={16} />\n                    </Tooltip.Trigger>\n                    <Tooltip.Content>I have a pen</Tooltip.Content>\n                </Tooltip.Root>\n            </TextInput.Slot>\n            <TextInput.Slot name="right">\n                <Tooltip.Root>\n                    <Tooltip.Trigger>\n                        <IconIcon size={16} />\n                    </Tooltip.Trigger>\n                    <Tooltip.Content>I am an icon with a tooltip</Tooltip.Content>\n                </Tooltip.Root>\n            </TextInput.Slot>\n        </TextInput.Root>'
  },
  {
    name: "WithButton",
    description: "",
    isCanonical: false,
    code: "<Tooltip.Root>\n            <Tooltip.Trigger asChild>\n                <Button>Hover me!</Button>\n            </Tooltip.Trigger>\n            <Tooltip.Content>I am a tooltip!</Tooltip.Content>\n        </Tooltip.Root>"
  }
];
const instructions = "Compose as Tooltip.Root > Tooltip.Trigger + Tooltip.Content. Use asChild on Tooltip.Trigger to forward tooltip behavior onto a custom element (e.g. a Button). Default enter delay is 700ms — use enterDelay=0 for immediate display. Tooltip.Content appears on hover; use Flyout for click-triggered contextual panels with richer content.";
const typeDefinitions = {};
const __vite_glob_0_37 = {
  name,
  description,
  status,
  category,
  tags,
  relatedComponents,
  importStatement,
  props,
  subComponents,
  examples,
  instructions,
  typeDefinitions
};
const components = {
  Accordion: {
    name: "Accordion",
    description: "A set of collapsible sections where each item can be independently expanded or collapsed. Use when you need to organize large amounts of information into digestible sections, conserving space and improve scannability.",
    status: "released",
    category: "layout",
    tags: [
      "accordion",
      "collapsible",
      "expandable"
    ],
    subComponentNames: [
      "Accordion.Root",
      "Accordion.Item",
      "Accordion.Header",
      "Accordion.Content",
      "Accordion.Slot"
    ],
    manifestPath: "Accordion.manifest.json"
  },
  Badge: {
    name: "Badge",
    description: "A small indicator used to highlight status, count, or contextual information. Use to convey concise data at a glance, and enhancing clarity without overwhelming the interface.",
    status: "released",
    category: "feedback",
    tags: [
      "badge",
      "label",
      "status"
    ],
    subComponentNames: [],
    manifestPath: "Badge.manifest.json"
  },
  Box: {
    name: "Box",
    description: "A general-purpose layout primitive for applying spacing, sizing, overflow, and positioning using design-system tokens. Use as a wrapper div or span when you need layout control without flexbox or grid.",
    status: "released",
    category: "layout",
    tags: [
      "box",
      "container",
      "layout"
    ],
    subComponentNames: [],
    manifestPath: "Box.manifest.json"
  },
  Button: {
    name: "Button",
    description: "A clickable action element for triggering user actions. Use for primary CTAs, form submissions, and any discrete user action.",
    status: "released",
    category: "input",
    tags: [
      "button",
      "action",
      "cta"
    ],
    subComponentNames: [],
    manifestPath: "Button.manifest.json"
  },
  Checkbox: {
    name: "Checkbox",
    description: "A binary form input for toggling a boolean value. Supports checked, unchecked, and indeterminate states. Use in forms where multiple independent options can be selected.",
    status: "released",
    category: "input",
    tags: [
      "checkbox",
      "form",
      "toggle"
    ],
    subComponentNames: [],
    manifestPath: "Checkbox.manifest.json"
  },
  ColorPicker: {
    name: "ColorPicker",
    description: "A color selection panel with gradient canvas and hex/RGBA value inputs. Use when users need to pick or enter an exact color value.",
    status: "released",
    category: "input",
    tags: [
      "color",
      "picker",
      "input"
    ],
    subComponentNames: [
      "ColorPicker.Values",
      "ColorPicker.Input",
      "ColorPicker.Gradient"
    ],
    manifestPath: "ColorPicker.manifest.json"
  },
  DatePicker: {
    name: "DatePicker",
    description: "A date or date range picker with a calendar panel. Use when the user needs to select a specific date or date range.",
    status: "released",
    category: "input",
    tags: [
      "date",
      "picker",
      "calendar",
      "input"
    ],
    subComponentNames: [
      "DatePicker.Range",
      "DatePicker.Input"
    ],
    manifestPath: "DatePicker.manifest.json"
  },
  Dialog: {
    name: "Dialog",
    description: "A modal overlay that interrupts the user to present important content or require a decision. Use for confirmations, forms, or detail views that need to be completed before continuing.",
    status: "released",
    category: "overlay",
    tags: [
      "dialog",
      "modal",
      "overlay"
    ],
    subComponentNames: [
      "Dialog.Root",
      "Dialog.Close",
      "Dialog.Title",
      "Dialog.Description",
      "Dialog.Trigger",
      "Dialog.Content",
      "Dialog.Header",
      "Dialog.Footer",
      "Dialog.Body",
      "Dialog.SideContent"
    ],
    manifestPath: "Dialog.manifest.json"
  },
  Divider: {
    name: "Divider",
    description: "A visual separator between content sections, either horizontal or vertical. Use to establish a clear visual hierarchy in the UI. They should be subtle and not overpower the content they are meant to organize.",
    status: "released",
    category: "layout",
    tags: [
      "divider",
      "separator",
      "rule"
    ],
    subComponentNames: [],
    manifestPath: "Divider.manifest.json"
  },
  Dropdown: {
    name: "Dropdown",
    description: "A contextual action menu that opens relative to a trigger element. Use for lists of actions or navigation options that don't require value selection.",
    status: "released",
    category: "overlay",
    tags: [
      "dropdown",
      "menu",
      "select"
    ],
    subComponentNames: [
      "Dropdown.Root",
      "Dropdown.SubMenu",
      "Dropdown.Trigger",
      "Dropdown.Content",
      "Dropdown.Group",
      "Dropdown.SubTrigger",
      "Dropdown.SubContent",
      "Dropdown.Item",
      "Dropdown.Slot"
    ],
    manifestPath: "Dropdown.manifest.json"
  },
  EditableText: {
    name: "EditableText",
    description: "An inline text element that becomes editable on click. Use for in-place renaming or editing of labels without opening a separate input field.",
    status: "released",
    category: "input",
    tags: [
      "editable",
      "text",
      "inline-edit"
    ],
    subComponentNames: [],
    manifestPath: "EditableText.manifest.json"
  },
  Flex: {
    name: "Flex",
    description: "A flexbox layout container for arranging children in a row or column with alignment, justification, and gap control. Use as the primary layout tool for linear arrangements.",
    status: "released",
    category: "layout",
    tags: [
      "flex",
      "flexbox",
      "layout"
    ],
    subComponentNames: [],
    manifestPath: "Flex.manifest.json"
  },
  Flyout: {
    name: "Flyout",
    description: "An anchored popover panel that opens next to a trigger element without blocking page interaction. Use for contextual detail panels, pickers (color, date), and forms that don't require full-screen focus.",
    status: "released",
    category: "overlay",
    tags: [
      "flyout",
      "popover",
      "overlay"
    ],
    subComponentNames: [
      "Flyout.Root",
      "Flyout.Trigger",
      "Flyout.Content",
      "Flyout.Header",
      "Flyout.Footer",
      "Flyout.Body"
    ],
    manifestPath: "Flyout.manifest.json"
  },
  Grid: {
    name: "Grid",
    description: "A CSS Grid layout container for two-dimensional arrangements of children in rows and columns. Use when content needs to align across both axes.",
    status: "released",
    category: "layout",
    tags: [
      "grid",
      "layout",
      "columns"
    ],
    subComponentNames: [],
    manifestPath: "Grid.manifest.json"
  },
  Heading: {
    name: "Heading",
    description: "A semantic heading element for page and section titles with design-system typography styles. Use for h1–h6 headings and display text.",
    status: "released",
    category: "typography",
    tags: [
      "heading",
      "title",
      "typography"
    ],
    subComponentNames: [],
    manifestPath: "Heading.manifest.json"
  },
  Label: {
    name: "Label",
    description: "A form label that associates visible text with an input element for accessibility. Always use alongside form inputs like TextInput, Checkbox, Select, and Switch.",
    status: "released",
    category: "typography",
    tags: [
      "label",
      "form",
      "typography"
    ],
    subComponentNames: [],
    manifestPath: "Label.manifest.json"
  },
  Link: {
    name: "Link",
    description: "An inline navigation anchor with configurable typography and underline behavior. Use for hyperlinks within text content.",
    status: "beta",
    category: "typography",
    tags: [
      "link",
      "anchor",
      "navigation"
    ],
    subComponentNames: [],
    manifestPath: "Link.manifest.json"
  },
  LoadingBar: {
    name: "LoadingBar",
    description: "A horizontal progress bar for showing determinate or indeterminate loading progress. Use for file uploads, multi-step processes, or any operation with measurable progress.",
    status: "",
    category: "feedback",
    tags: [
      "loading",
      "progress",
      "bar"
    ],
    subComponentNames: [],
    manifestPath: "LoadingBar.manifest.json"
  },
  LoadingCircle: {
    name: "LoadingCircle",
    description: "A circular spinner for indicating loading or processing states. Use for inline or overlay loading indicators where a full progress bar is too large.",
    status: "",
    category: "feedback",
    tags: [
      "loading",
      "spinner",
      "progress"
    ],
    subComponentNames: [],
    manifestPath: "LoadingCircle.manifest.json"
  },
  Notice: {
    name: "Notice",
    description: "An inline alert banner for displaying feedback messages such as errors, warnings, success confirmations, or informational notices. Use to keep users informed without interrupting their workflow by presenting clear, accessible feedback that stays visible until acknowledged.",
    status: "released",
    category: "feedback",
    tags: [
      "notice",
      "alert",
      "message"
    ],
    subComponentNames: [],
    manifestPath: "Notice.manifest.json"
  },
  OrderableList: {
    name: "OrderableList",
    description: "A drag-and-drop sortable list where users can reorder items. Use when the order of items has semantic meaning and needs to be changed by the user.",
    status: "released",
    category: "data",
    tags: [
      "list",
      "sortable",
      "drag",
      "reorder"
    ],
    subComponentNames: [],
    manifestPath: "OrderableList.manifest.json"
  },
  RadioList: {
    name: "RadioList",
    description: "A group of radio buttons for single-choice selection from a list of options. Use when users must pick exactly one option from a small, visible set.",
    status: "released",
    category: "input",
    tags: [
      "radio",
      "list",
      "form"
    ],
    subComponentNames: [
      "RadioList.Root",
      "RadioList.RadioButton"
    ],
    manifestPath: "RadioList.manifest.json"
  },
  RouterProvider: {
    name: "RouterProvider",
    description: "A context provider that enables SPA client-side navigation for Link components. Required when using Link in a single-page application with a router like React Router or Next.js.",
    status: "",
    category: "utility",
    tags: [
      "router",
      "navigation",
      "provider"
    ],
    subComponentNames: [],
    manifestPath: "RouterProvider.manifest.json"
  },
  ScrollArea: {
    name: "ScrollArea",
    description: "A container with custom styled scrollbars that activates when content overflows its bounds. Use when you need a scrollable region with consistent cross-browser scrollbar appearance.",
    status: "released",
    category: "layout",
    tags: [
      "scroll",
      "overflow",
      "container"
    ],
    subComponentNames: [],
    manifestPath: "ScrollArea.manifest.json"
  },
  Section: {
    name: "Section",
    description: "A semantic HTML section element with design-system spacing props. Use in place of Box when the content represents a standalone section of the page for document outline and accessibility purposes.",
    status: "",
    category: "layout",
    tags: [
      "section",
      "container",
      "layout"
    ],
    subComponentNames: [],
    manifestPath: "Section.manifest.json"
  },
  SegmentedControl: {
    name: "SegmentedControl",
    description: "A compact control for selecting one of 2–5 mutually exclusive options. Use it for view mode switches, layout changes, filter selections, or input choices where all options should remain visible and directly selectable.",
    status: "released",
    category: "input",
    tags: [
      "segmented",
      "toggle",
      "tabs"
    ],
    subComponentNames: [
      "SegmentedControl.Item"
    ],
    manifestPath: "SegmentedControl.manifest.json"
  },
  Select: {
    name: "Select",
    description: "A dropdown for selecting a single value from a list of options. Use Select.Combobox for searchable/filterable selection, and Select.Multi or Select.Combobox.Multiple for multi-value selection.",
    status: "released",
    category: "input",
    tags: [
      "select",
      "dropdown",
      "form"
    ],
    subComponentNames: [
      "Select.Multi",
      "Select.Combobox",
      "Select.Combobox.Multiple",
      "Select.Slot",
      "Select.Menu",
      "Select.Item",
      "Select.Group"
    ],
    manifestPath: "Select.manifest.json"
  },
  Slider: {
    name: "Slider",
    description: "A range input for selecting a numerical value or range between a minimum and maximum.",
    status: "released",
    category: "input",
    tags: [
      "slider",
      "range",
      "input"
    ],
    subComponentNames: [],
    manifestPath: "Slider.manifest.json"
  },
  SplitButton: {
    name: "SplitButton",
    description: "A combined primary action button with a secondary dropdown menu. Use when a main action has several related secondary options.",
    status: "released",
    category: "input",
    tags: [
      "split-button",
      "button",
      "dropdown"
    ],
    subComponentNames: [
      "SplitButton.Root",
      "SplitButton.Content",
      "SplitButton.Action",
      "SplitButton.ActionButton"
    ],
    manifestPath: "SplitButton.manifest.json"
  },
  Switch: {
    name: "Switch",
    description: "A boolean toggle for enabling or disabling a setting. Use when toggling takes immediate effect without a form submission.",
    status: "released",
    category: "input",
    tags: [
      "switch",
      "toggle",
      "boolean"
    ],
    subComponentNames: [],
    manifestPath: "Switch.manifest.json"
  },
  Table: {
    name: "Table",
    description: "A structured data table for displaying rows and columns of information. Use when presenting tabular data that users need to scan, compare, or sort.",
    status: "released",
    category: "data",
    tags: [
      "table",
      "data",
      "list"
    ],
    subComponentNames: [
      "Table.Root",
      "Table.Caption",
      "Table.Header",
      "Table.HeaderCell",
      "Table.Body",
      "Table.Row",
      "Table.RowCell"
    ],
    manifestPath: "Table.manifest.json"
  },
  Tabs: {
    name: "Tabs",
    description: "A tabbed navigation component that switches between associated content panels. Use when content is divided into distinct sections that users switch between without leaving the page.",
    status: "released",
    category: "navigation",
    tags: [
      "tabs",
      "navigation",
      "panel"
    ],
    subComponentNames: [
      "Tabs.Tab",
      "Tabs.Root",
      "Tabs.Trigger",
      "Tabs.Content"
    ],
    manifestPath: "Tabs.manifest.json"
  },
  Tag: {
    name: "Tag",
    description: "An interactive chip label for representing metadata, filters, or user-selected values. Use when labels need to be removable, addable, or carry secondary content.",
    status: "released",
    category: "feedback",
    tags: [
      "tag",
      "badge",
      "label"
    ],
    subComponentNames: [
      "Tag.HoverContent",
      "Tag.SecondaryContent"
    ],
    manifestPath: "Tag.manifest.json"
  },
  Text: {
    name: "Text",
    description: "A body text typography element for rendering paragraphs, inline text, and labels with design-system font styles.",
    status: "",
    category: "typography",
    tags: [
      "text",
      "paragraph",
      "typography"
    ],
    subComponentNames: [],
    manifestPath: "Text.manifest.json"
  },
  Textarea: {
    name: "Textarea",
    description: "A multi-line text input for collecting longer text content such as descriptions, comments, or messages.",
    status: "released",
    category: "input",
    tags: [
      "textarea",
      "form",
      "input"
    ],
    subComponentNames: [],
    manifestPath: "Textarea.manifest.json"
  },
  TextInput: {
    name: "TextInput",
    description: "A single-line text input field for collecting short text values. Use for names, emails, URLs, search queries, and other single-line form inputs.",
    status: "released",
    category: "input",
    tags: [
      "text-input",
      "form",
      "input"
    ],
    subComponentNames: [],
    manifestPath: "TextInput.manifest.json"
  },
  ThemeProvider: {
    name: "ThemeProvider",
    description: "A root context provider that applies theming, text direction, and translations to all fondue components in its subtree. Required at the top level of any application using this component library.",
    status: "",
    category: "utility",
    tags: [
      "theme",
      "provider",
      "context"
    ],
    subComponentNames: [],
    manifestPath: "ThemeProvider.manifest.json"
  },
  Tooltip: {
    name: "Tooltip",
    description: "A hover-triggered hint overlay that provides additional context for an element. Use for icon-only buttons, truncated text, or any UI element that benefits from a brief explanation.",
    status: "released",
    category: "overlay",
    tags: [
      "tooltip",
      "hint",
      "popover"
    ],
    subComponentNames: [
      "Tooltip.Root",
      "Tooltip.Trigger",
      "Tooltip.Content"
    ],
    manifestPath: "Tooltip.manifest.json"
  }
};
const componentIndex = {
  components
};
const sizes = [
  12,
  16,
  20,
  24,
  32
];
const icons = [
  {
    name: "adobe-creative-cloud",
    componentName: "AdobeCreativeCloud",
    exportName: "IconAdobeCreativeCloud",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "adobe",
      "creative",
      "cloud"
    ]
  },
  {
    name: "adobe-in-design",
    componentName: "AdobeInDesign",
    exportName: "IconAdobeInDesign",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "adobe",
      "in",
      "design"
    ]
  },
  {
    name: "anchor",
    componentName: "Anchor",
    exportName: "IconAnchor",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "anchor"
    ]
  },
  {
    name: "annotation-lines",
    componentName: "AnnotationLines",
    exportName: "IconAnnotationLines",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "annotation",
      "lines"
    ]
  },
  {
    name: "annotation-numbers",
    componentName: "AnnotationNumbers",
    exportName: "IconAnnotationNumbers",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "annotation",
      "numbers"
    ]
  },
  {
    name: "apps",
    componentName: "Apps",
    exportName: "IconApps",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "apps"
    ]
  },
  {
    name: "archive",
    componentName: "Archive",
    exportName: "IconArchive",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "archive"
    ]
  },
  {
    name: "arrow-align-down",
    componentName: "ArrowAlignDown",
    exportName: "IconArrowAlignDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "align",
      "down"
    ]
  },
  {
    name: "arrow-align-horizontal-centre",
    componentName: "ArrowAlignHorizontalCentre",
    exportName: "IconArrowAlignHorizontalCentre",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "align",
      "horizontal",
      "centre"
    ]
  },
  {
    name: "arrow-align-left",
    componentName: "ArrowAlignLeft",
    exportName: "IconArrowAlignLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "align",
      "left"
    ]
  },
  {
    name: "arrow-align-right",
    componentName: "ArrowAlignRight",
    exportName: "IconArrowAlignRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "align",
      "right"
    ]
  },
  {
    name: "arrow-align-up",
    componentName: "ArrowAlignUp",
    exportName: "IconArrowAlignUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "align",
      "up"
    ]
  },
  {
    name: "arrow-align-vertical-centre",
    componentName: "ArrowAlignVerticalCentre",
    exportName: "IconArrowAlignVerticalCentre",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "align",
      "vertical",
      "centre"
    ]
  },
  {
    name: "arrow-bidirectional",
    componentName: "ArrowBidirectional",
    exportName: "IconArrowBidirectional",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "bidirectional"
    ]
  },
  {
    name: "arrow-bidirectional-horizontal",
    componentName: "ArrowBidirectionalHorizontal",
    exportName: "IconArrowBidirectionalHorizontal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "bidirectional",
      "horizontal"
    ]
  },
  {
    name: "arrow-bottom-to-top",
    componentName: "ArrowBottomToTop",
    exportName: "IconArrowBottomToTop",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "bottom",
      "to",
      "top"
    ]
  },
  {
    name: "arrow-circle-down",
    componentName: "ArrowCircleDown",
    exportName: "IconArrowCircleDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "circle",
      "down"
    ]
  },
  {
    name: "arrow-circle-up",
    componentName: "ArrowCircleUp",
    exportName: "IconArrowCircleUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "circle",
      "up"
    ]
  },
  {
    name: "arrow-down",
    componentName: "ArrowDown",
    exportName: "IconArrowDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "down"
    ]
  },
  {
    name: "arrow-expand",
    componentName: "ArrowExpand",
    exportName: "IconArrowExpand",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "expand"
    ]
  },
  {
    name: "arrow-fit-bottom-left",
    componentName: "ArrowFitBottomLeft",
    exportName: "IconArrowFitBottomLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "fit",
      "bottom",
      "left"
    ]
  },
  {
    name: "arrow-fit-bottom-right",
    componentName: "ArrowFitBottomRight",
    exportName: "IconArrowFitBottomRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "fit",
      "bottom",
      "right"
    ]
  },
  {
    name: "arrow-fit-top-left",
    componentName: "ArrowFitTopLeft",
    exportName: "IconArrowFitTopLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "fit",
      "top",
      "left"
    ]
  },
  {
    name: "arrow-fit-top-right",
    componentName: "ArrowFitTopRight",
    exportName: "IconArrowFitTopRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "fit",
      "top",
      "right"
    ]
  },
  {
    name: "arrow-hook",
    componentName: "ArrowHook",
    exportName: "IconArrowHook",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "hook"
    ]
  },
  {
    name: "arrow-left",
    componentName: "ArrowLeft",
    exportName: "IconArrowLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "left"
    ]
  },
  {
    name: "arrow-left-to-right",
    componentName: "ArrowLeftToRight",
    exportName: "IconArrowLeftToRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "left",
      "to",
      "right"
    ]
  },
  {
    name: "arrow-minimize",
    componentName: "ArrowMinimize",
    exportName: "IconArrowMinimize",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "minimize"
    ]
  },
  {
    name: "arrow-move",
    componentName: "ArrowMove",
    exportName: "IconArrowMove",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "move"
    ]
  },
  {
    name: "arrow-out-external",
    componentName: "ArrowOutExternal",
    exportName: "IconArrowOutExternal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "out",
      "external"
    ]
  },
  {
    name: "arrow-out-logout",
    componentName: "ArrowOutLogout",
    exportName: "IconArrowOutLogout",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "out",
      "logout"
    ]
  },
  {
    name: "arrow-out-share",
    componentName: "ArrowOutShare",
    exportName: "IconArrowOutShare",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "out",
      "share"
    ]
  },
  {
    name: "arrow-right",
    componentName: "ArrowRight",
    exportName: "IconArrowRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "right"
    ]
  },
  {
    name: "arrow-right-to-left",
    componentName: "ArrowRightToLeft",
    exportName: "IconArrowRightToLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "right",
      "to",
      "left"
    ]
  },
  {
    name: "arrow-round-anti-clockwise",
    componentName: "ArrowRoundAntiClockwise",
    exportName: "IconArrowRoundAntiClockwise",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "round",
      "anti",
      "clockwise"
    ]
  },
  {
    name: "arrow-round-clockwise",
    componentName: "ArrowRoundClockwise",
    exportName: "IconArrowRoundClockwise",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "round",
      "clockwise"
    ]
  },
  {
    name: "arrow-scale-horizontal",
    componentName: "ArrowScaleHorizontal",
    exportName: "IconArrowScaleHorizontal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "scale",
      "horizontal"
    ]
  },
  {
    name: "arrow-scale-vertical",
    componentName: "ArrowScaleVertical",
    exportName: "IconArrowScaleVertical",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "scale",
      "vertical"
    ]
  },
  {
    name: "arrow-slide-in",
    componentName: "ArrowSlideIn",
    exportName: "IconArrowSlideIn",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "slide",
      "in"
    ]
  },
  {
    name: "arrow-slide-out",
    componentName: "ArrowSlideOut",
    exportName: "IconArrowSlideOut",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "slide",
      "out"
    ]
  },
  {
    name: "arrow-spin-left",
    componentName: "ArrowSpinLeft",
    exportName: "IconArrowSpinLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "spin",
      "left"
    ]
  },
  {
    name: "arrow-spin-right",
    componentName: "ArrowSpinRight",
    exportName: "IconArrowSpinRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "spin",
      "right"
    ]
  },
  {
    name: "arrow-stretch-box",
    componentName: "ArrowStretchBox",
    exportName: "IconArrowStretchBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "stretch",
      "box"
    ]
  },
  {
    name: "arrow-swap",
    componentName: "ArrowSwap",
    exportName: "IconArrowSwap",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "swap"
    ]
  },
  {
    name: "arrow-sync",
    componentName: "ArrowSync",
    exportName: "IconArrowSync",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "sync"
    ]
  },
  {
    name: "arrow-top-to-bottom",
    componentName: "ArrowTopToBottom",
    exportName: "IconArrowTopToBottom",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "top",
      "to",
      "bottom"
    ]
  },
  {
    name: "arrow-up",
    componentName: "ArrowUp",
    exportName: "IconArrowUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "arrow",
      "up"
    ]
  },
  {
    name: "bar",
    componentName: "Bar",
    exportName: "IconBar",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "bar"
    ]
  },
  {
    name: "bar-narrow",
    componentName: "BarNarrow",
    exportName: "IconBarNarrow",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "bar",
      "narrow"
    ]
  },
  {
    name: "basketball",
    componentName: "Basketball",
    exportName: "IconBasketball",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "basketball"
    ]
  },
  {
    name: "bell",
    componentName: "Bell",
    exportName: "IconBell",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "bell"
    ]
  },
  {
    name: "bookmark",
    componentName: "Bookmark",
    exportName: "IconBookmark",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "bookmark"
    ]
  },
  {
    name: "bookmark-filled",
    componentName: "BookmarkFilled",
    exportName: "IconBookmarkFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "bookmark",
      "filled"
    ]
  },
  {
    name: "box",
    componentName: "Box",
    exportName: "IconBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "box"
    ]
  },
  {
    name: "brackets-curly",
    componentName: "BracketsCurly",
    exportName: "IconBracketsCurly",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "brackets",
      "curly"
    ]
  },
  {
    name: "building-block",
    componentName: "BuildingBlock",
    exportName: "IconBuildingBlock",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "building",
      "block"
    ]
  },
  {
    name: "buildings",
    componentName: "Buildings",
    exportName: "IconBuildings",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "buildings"
    ]
  },
  {
    name: "button",
    componentName: "Button",
    exportName: "IconButton",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "button"
    ]
  },
  {
    name: "calendar",
    componentName: "Calendar",
    exportName: "IconCalendar",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "calendar"
    ]
  },
  {
    name: "calendar-checked",
    componentName: "CalendarChecked",
    exportName: "IconCalendarChecked",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "calendar",
      "checked"
    ]
  },
  {
    name: "camera",
    componentName: "Camera",
    exportName: "IconCamera",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "camera"
    ]
  },
  {
    name: "cap",
    componentName: "Cap",
    exportName: "IconCap",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cap"
    ]
  },
  {
    name: "card",
    componentName: "Card",
    exportName: "IconCard",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "card"
    ]
  },
  {
    name: "card-layout-large",
    componentName: "CardLayoutLarge",
    exportName: "IconCardLayoutLarge",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "card",
      "layout",
      "large"
    ]
  },
  {
    name: "card-layout-medium",
    componentName: "CardLayoutMedium",
    exportName: "IconCardLayoutMedium",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "card",
      "layout",
      "medium"
    ]
  },
  {
    name: "card-layout-small",
    componentName: "CardLayoutSmall",
    exportName: "IconCardLayoutSmall",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "card",
      "layout",
      "small"
    ]
  },
  {
    name: "card-stack",
    componentName: "CardStack",
    exportName: "IconCardStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "card",
      "stack"
    ]
  },
  {
    name: "caret-down",
    componentName: "CaretDown",
    exportName: "IconCaretDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "down"
    ]
  },
  {
    name: "caret-left",
    componentName: "CaretLeft",
    exportName: "IconCaretLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "left"
    ]
  },
  {
    name: "caret-left-double",
    componentName: "CaretLeftDouble",
    exportName: "IconCaretLeftDouble",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "left",
      "double"
    ]
  },
  {
    name: "caret-right",
    componentName: "CaretRight",
    exportName: "IconCaretRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "right"
    ]
  },
  {
    name: "caret-right-double",
    componentName: "CaretRightDouble",
    exportName: "IconCaretRightDouble",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "right",
      "double"
    ]
  },
  {
    name: "caret-up",
    componentName: "CaretUp",
    exportName: "IconCaretUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "up"
    ]
  },
  {
    name: "caret-up-down",
    componentName: "CaretUpDown",
    exportName: "IconCaretUpDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "caret",
      "up",
      "down"
    ]
  },
  {
    name: "carousel",
    componentName: "Carousel",
    exportName: "IconCarousel",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "carousel"
    ]
  },
  {
    name: "chart-bars",
    componentName: "ChartBars",
    exportName: "IconChartBars",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "chart",
      "bars"
    ]
  },
  {
    name: "chart-line",
    componentName: "ChartLine",
    exportName: "IconChartLine",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "chart",
      "line"
    ]
  },
  {
    name: "chart-pie",
    componentName: "ChartPie",
    exportName: "IconChartPie",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "chart",
      "pie"
    ]
  },
  {
    name: "check-mark",
    componentName: "CheckMark",
    exportName: "IconCheckMark",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "check",
      "mark"
    ]
  },
  {
    name: "check-mark-circle",
    componentName: "CheckMarkCircle",
    exportName: "IconCheckMarkCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "check",
      "mark",
      "circle"
    ]
  },
  {
    name: "check-mark-circle-filled",
    componentName: "CheckMarkCircleFilled",
    exportName: "IconCheckMarkCircleFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "check",
      "mark",
      "circle",
      "filled"
    ]
  },
  {
    name: "checkbox",
    componentName: "Checkbox",
    exportName: "IconCheckbox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "checkbox"
    ]
  },
  {
    name: "checkmark-circle-box",
    componentName: "CheckmarkCircleBox",
    exportName: "IconCheckmarkCircleBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "checkmark",
      "circle",
      "box"
    ]
  },
  {
    name: "circle",
    componentName: "Circle",
    exportName: "IconCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "circle"
    ]
  },
  {
    name: "clipboard",
    componentName: "Clipboard",
    exportName: "IconClipboard",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "clipboard"
    ]
  },
  {
    name: "clipboard-at",
    componentName: "ClipboardAt",
    exportName: "IconClipboardAt",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "clipboard",
      "at"
    ]
  },
  {
    name: "clipboard-out",
    componentName: "ClipboardOut",
    exportName: "IconClipboardOut",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "clipboard",
      "out"
    ]
  },
  {
    name: "clock",
    componentName: "Clock",
    exportName: "IconClock",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "clock"
    ]
  },
  {
    name: "clock-alternative",
    componentName: "ClockAlternative",
    exportName: "IconClockAlternative",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "clock",
      "alternative"
    ]
  },
  {
    name: "clock-list",
    componentName: "ClockList",
    exportName: "IconClockList",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "clock",
      "list"
    ]
  },
  {
    name: "closed-captions",
    componentName: "ClosedCaptions",
    exportName: "IconClosedCaptions",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "closed",
      "captions"
    ]
  },
  {
    name: "cloud-arrow-down",
    componentName: "CloudArrowDown",
    exportName: "IconCloudArrowDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cloud",
      "arrow",
      "down"
    ]
  },
  {
    name: "cloud-arrow-up",
    componentName: "CloudArrowUp",
    exportName: "IconCloudArrowUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cloud",
      "arrow",
      "up"
    ]
  },
  {
    name: "cloud-off",
    componentName: "CloudOff",
    exportName: "IconCloudOff",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cloud",
      "off"
    ]
  },
  {
    name: "code",
    componentName: "Code",
    exportName: "IconCode",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "code"
    ]
  },
  {
    name: "code-box",
    componentName: "CodeBox",
    exportName: "IconCodeBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "code",
      "box"
    ]
  },
  {
    name: "code-frame",
    componentName: "CodeFrame",
    exportName: "IconCodeFrame",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "code",
      "frame"
    ]
  },
  {
    name: "cog",
    componentName: "Cog",
    exportName: "IconCog",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cog"
    ]
  },
  {
    name: "color-fan",
    componentName: "ColorFan",
    exportName: "IconColorFan",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "color",
      "fan"
    ]
  },
  {
    name: "command-line-box",
    componentName: "CommandLineBox",
    exportName: "IconCommandLineBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "command",
      "line",
      "box"
    ]
  },
  {
    name: "content-block",
    componentName: "ContentBlock",
    exportName: "IconContentBlock",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "content",
      "block"
    ]
  },
  {
    name: "context-search",
    componentName: "ContextSearch",
    exportName: "IconContextSearch",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "context",
      "search"
    ]
  },
  {
    name: "controller",
    componentName: "Controller",
    exportName: "IconController",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "controller"
    ]
  },
  {
    name: "country",
    componentName: "Country",
    exportName: "IconCountry",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "country"
    ]
  },
  {
    name: "crop",
    componentName: "Crop",
    exportName: "IconCrop",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "crop"
    ]
  },
  {
    name: "cross",
    componentName: "Cross",
    exportName: "IconCross",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cross"
    ]
  },
  {
    name: "cross-circle",
    componentName: "CrossCircle",
    exportName: "IconCrossCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cross",
      "circle"
    ]
  },
  {
    name: "cross-circle-box",
    componentName: "CrossCircleBox",
    exportName: "IconCrossCircleBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cross",
      "circle",
      "box"
    ]
  },
  {
    name: "cross-circle-filled",
    componentName: "CrossCircleFilled",
    exportName: "IconCrossCircleFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cross",
      "circle",
      "filled"
    ]
  },
  {
    name: "cursor-click",
    componentName: "CursorClick",
    exportName: "IconCursorClick",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "cursor",
      "click"
    ]
  },
  {
    name: "curve-easing",
    componentName: "CurveEasing",
    exportName: "IconCurveEasing",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "curve",
      "easing"
    ]
  },
  {
    name: "design-system",
    componentName: "DesignSystem",
    exportName: "IconDesignSystem",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "design",
      "system"
    ]
  },
  {
    name: "diagram-tree",
    componentName: "DiagramTree",
    exportName: "IconDiagramTree",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "diagram",
      "tree"
    ]
  },
  {
    name: "divider-blank",
    componentName: "DividerBlank",
    exportName: "IconDividerBlank",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "divider",
      "blank"
    ]
  },
  {
    name: "divider-dashed",
    componentName: "DividerDashed",
    exportName: "IconDividerDashed",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "divider",
      "dashed"
    ]
  },
  {
    name: "divider-dotted",
    componentName: "DividerDotted",
    exportName: "IconDividerDotted",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "divider",
      "dotted"
    ]
  },
  {
    name: "divider-solid",
    componentName: "DividerSolid",
    exportName: "IconDividerSolid",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "divider",
      "solid"
    ]
  },
  {
    name: "do-and-dont",
    componentName: "DoAndDont",
    exportName: "IconDoAndDont",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "do",
      "and",
      "dont"
    ]
  },
  {
    name: "do-and-dont-box",
    componentName: "DoAndDontBox",
    exportName: "IconDoAndDontBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "do",
      "and",
      "dont",
      "box"
    ]
  },
  {
    name: "document",
    componentName: "Document",
    exportName: "IconDocument",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document"
    ]
  },
  {
    name: "document-arrow-right",
    componentName: "DocumentArrowRight",
    exportName: "IconDocumentArrowRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "arrow",
      "right"
    ]
  },
  {
    name: "document-arrow-up",
    componentName: "DocumentArrowUp",
    exportName: "IconDocumentArrowUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "arrow",
      "up"
    ]
  },
  {
    name: "document-badge",
    componentName: "DocumentBadge",
    exportName: "IconDocumentBadge",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "badge"
    ]
  },
  {
    name: "document-check",
    componentName: "DocumentCheck",
    exportName: "IconDocumentCheck",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "check"
    ]
  },
  {
    name: "document-code",
    componentName: "DocumentCode",
    exportName: "IconDocumentCode",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "code"
    ]
  },
  {
    name: "document-list",
    componentName: "DocumentList",
    exportName: "IconDocumentList",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "list"
    ]
  },
  {
    name: "document-stack",
    componentName: "DocumentStack",
    exportName: "IconDocumentStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "stack"
    ]
  },
  {
    name: "document-text",
    componentName: "DocumentText",
    exportName: "IconDocumentText",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "document",
      "text"
    ]
  },
  {
    name: "dots-horizontal",
    componentName: "DotsHorizontal",
    exportName: "IconDotsHorizontal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "dots",
      "horizontal"
    ]
  },
  {
    name: "dots-vertical",
    componentName: "DotsVertical",
    exportName: "IconDotsVertical",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "dots",
      "vertical"
    ]
  },
  {
    name: "droplet",
    componentName: "Droplet",
    exportName: "IconDroplet",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "droplet"
    ]
  },
  {
    name: "drops",
    componentName: "Drops",
    exportName: "IconDrops",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "drops"
    ]
  },
  {
    name: "edge-all",
    componentName: "EdgeAll",
    exportName: "IconEdgeAll",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "edge",
      "all"
    ]
  },
  {
    name: "edge-bottom",
    componentName: "EdgeBottom",
    exportName: "IconEdgeBottom",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "edge",
      "bottom"
    ]
  },
  {
    name: "edge-left",
    componentName: "EdgeLeft",
    exportName: "IconEdgeLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "edge",
      "left"
    ]
  },
  {
    name: "edge-right",
    componentName: "EdgeRight",
    exportName: "IconEdgeRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "edge",
      "right"
    ]
  },
  {
    name: "edge-top",
    componentName: "EdgeTop",
    exportName: "IconEdgeTop",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "edge",
      "top"
    ]
  },
  {
    name: "envelope",
    componentName: "Envelope",
    exportName: "IconEnvelope",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "envelope"
    ]
  },
  {
    name: "eraser",
    componentName: "Eraser",
    exportName: "IconEraser",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "eraser"
    ]
  },
  {
    name: "exclamation-mark",
    componentName: "ExclamationMark",
    exportName: "IconExclamationMark",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "exclamation",
      "mark"
    ]
  },
  {
    name: "exclamation-mark-circle",
    componentName: "ExclamationMarkCircle",
    exportName: "IconExclamationMarkCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "exclamation",
      "mark",
      "circle"
    ]
  },
  {
    name: "exclamation-mark-circle-filled",
    componentName: "ExclamationMarkCircleFilled",
    exportName: "IconExclamationMarkCircleFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "exclamation",
      "mark",
      "circle",
      "filled"
    ]
  },
  {
    name: "exclamation-mark-triangle",
    componentName: "ExclamationMarkTriangle",
    exportName: "IconExclamationMarkTriangle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "exclamation",
      "mark",
      "triangle"
    ]
  },
  {
    name: "eye",
    componentName: "Eye",
    exportName: "IconEye",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "eye"
    ]
  },
  {
    name: "eye-off",
    componentName: "EyeOff",
    exportName: "IconEyeOff",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "eye",
      "off"
    ]
  },
  {
    name: "face-extra-happy",
    componentName: "FaceExtraHappy",
    exportName: "IconFaceExtraHappy",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "extra",
      "happy"
    ]
  },
  {
    name: "face-happy",
    componentName: "FaceHappy",
    exportName: "IconFaceHappy",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "happy"
    ]
  },
  {
    name: "face-happy-filled",
    componentName: "FaceHappyFilled",
    exportName: "IconFaceHappyFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "happy",
      "filled"
    ]
  },
  {
    name: "face-neutral",
    componentName: "FaceNeutral",
    exportName: "IconFaceNeutral",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "neutral"
    ]
  },
  {
    name: "face-neutral-filled",
    componentName: "FaceNeutralFilled",
    exportName: "IconFaceNeutralFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "neutral",
      "filled"
    ]
  },
  {
    name: "face-sad",
    componentName: "FaceSad",
    exportName: "IconFaceSad",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "sad"
    ]
  },
  {
    name: "face-sad-filled",
    componentName: "FaceSadFilled",
    exportName: "IconFaceSadFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "face",
      "sad",
      "filled"
    ]
  },
  {
    name: "fade-in",
    componentName: "FadeIn",
    exportName: "IconFadeIn",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fade",
      "in"
    ]
  },
  {
    name: "fade-out",
    componentName: "FadeOut",
    exportName: "IconFadeOut",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fade",
      "out"
    ]
  },
  {
    name: "fast-forward",
    componentName: "FastForward",
    exportName: "IconFastForward",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fast",
      "forward"
    ]
  },
  {
    name: "fast-forward-filled",
    componentName: "FastForwardFilled",
    exportName: "IconFastForwardFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fast",
      "forward",
      "filled"
    ]
  },
  {
    name: "fast-rewind",
    componentName: "FastRewind",
    exportName: "IconFastRewind",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fast",
      "rewind"
    ]
  },
  {
    name: "fast-rewind-filled",
    componentName: "FastRewindFilled",
    exportName: "IconFastRewindFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fast",
      "rewind",
      "filled"
    ]
  },
  {
    name: "figma",
    componentName: "Figma",
    exportName: "IconFigma",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "figma"
    ]
  },
  {
    name: "fixed-height",
    componentName: "FixedHeight",
    exportName: "IconFixedHeight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fixed",
      "height"
    ]
  },
  {
    name: "fixed-width",
    componentName: "FixedWidth",
    exportName: "IconFixedWidth",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "fixed",
      "width"
    ]
  },
  {
    name: "flag",
    componentName: "Flag",
    exportName: "IconFlag",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "flag"
    ]
  },
  {
    name: "flask",
    componentName: "Flask",
    exportName: "IconFlask",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "flask"
    ]
  },
  {
    name: "flip-horizontal-circle",
    componentName: "FlipHorizontalCircle",
    exportName: "IconFlipHorizontalCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "flip",
      "horizontal",
      "circle"
    ]
  },
  {
    name: "flip-horizontally",
    componentName: "FlipHorizontally",
    exportName: "IconFlipHorizontally",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "flip",
      "horizontally"
    ]
  },
  {
    name: "flip-vertical-circle",
    componentName: "FlipVerticalCircle",
    exportName: "IconFlipVerticalCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "flip",
      "vertical",
      "circle"
    ]
  },
  {
    name: "flip-vertically",
    componentName: "FlipVertically",
    exportName: "IconFlipVertically",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "flip",
      "vertically"
    ]
  },
  {
    name: "focal-point",
    componentName: "FocalPoint",
    exportName: "IconFocalPoint",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "focal",
      "point"
    ]
  },
  {
    name: "folder",
    componentName: "Folder",
    exportName: "IconFolder",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "folder"
    ]
  },
  {
    name: "folder-arrow-right",
    componentName: "FolderArrowRight",
    exportName: "IconFolderArrowRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "folder",
      "arrow",
      "right"
    ]
  },
  {
    name: "folder-arrow-up",
    componentName: "FolderArrowUp",
    exportName: "IconFolderArrowUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "folder",
      "arrow",
      "up"
    ]
  },
  {
    name: "folder-filled",
    componentName: "FolderFilled",
    exportName: "IconFolderFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "folder",
      "filled"
    ]
  },
  {
    name: "folder-stack",
    componentName: "FolderStack",
    exportName: "IconFolderStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "folder",
      "stack"
    ]
  },
  {
    name: "folders",
    componentName: "Folders",
    exportName: "IconFolders",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "folders"
    ]
  },
  {
    name: "footer",
    componentName: "Footer",
    exportName: "IconFooter",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "footer"
    ]
  },
  {
    name: "funnel",
    componentName: "Funnel",
    exportName: "IconFunnel",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "funnel"
    ]
  },
  {
    name: "grab-handle",
    componentName: "GrabHandle",
    exportName: "IconGrabHandle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "grab",
      "handle"
    ]
  },
  {
    name: "gradient",
    componentName: "Gradient",
    exportName: "IconGradient",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "gradient"
    ]
  },
  {
    name: "grid-regular",
    componentName: "GridRegular",
    exportName: "IconGridRegular",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "grid",
      "regular"
    ]
  },
  {
    name: "grid-regular-filled",
    componentName: "GridRegularFilled",
    exportName: "IconGridRegularFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "grid",
      "regular",
      "filled"
    ]
  },
  {
    name: "gutter-horizontal",
    componentName: "GutterHorizontal",
    exportName: "IconGutterHorizontal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "gutter",
      "horizontal"
    ]
  },
  {
    name: "gutter-vertical",
    componentName: "GutterVertical",
    exportName: "IconGutterVertical",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "gutter",
      "vertical"
    ]
  },
  {
    name: "h",
    componentName: "H",
    exportName: "IconH",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "h"
    ]
  },
  {
    name: "hashtag",
    componentName: "Hashtag",
    exportName: "IconHashtag",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "hashtag"
    ]
  },
  {
    name: "heading",
    componentName: "Heading",
    exportName: "IconHeading",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "heading"
    ]
  },
  {
    name: "heading-1",
    componentName: "Heading1",
    exportName: "IconHeading1",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "heading",
      "1"
    ]
  },
  {
    name: "heart-circle",
    componentName: "HeartCircle",
    exportName: "IconHeartCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "heart",
      "circle"
    ]
  },
  {
    name: "heart-circle-stack",
    componentName: "HeartCircleStack",
    exportName: "IconHeartCircleStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "heart",
      "circle",
      "stack"
    ]
  },
  {
    name: "highlighter",
    componentName: "Highlighter",
    exportName: "IconHighlighter",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "highlighter"
    ]
  },
  {
    name: "home",
    componentName: "Home",
    exportName: "IconHome",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "home"
    ]
  },
  {
    name: "hub",
    componentName: "Hub",
    exportName: "IconHub",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "hub"
    ]
  },
  {
    name: "icon",
    componentName: "Icon",
    exportName: "IconIcon",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "icon"
    ]
  },
  {
    name: "icon-shape",
    componentName: "IconShape",
    exportName: "IconIconShape",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "icon",
      "shape"
    ]
  },
  {
    name: "icon-shape-stack",
    componentName: "IconShapeStack",
    exportName: "IconIconShapeStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "icon",
      "shape",
      "stack"
    ]
  },
  {
    name: "image",
    componentName: "Image",
    exportName: "IconImage",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "image"
    ]
  },
  {
    name: "image-stack",
    componentName: "ImageStack",
    exportName: "IconImageStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "image",
      "stack"
    ]
  },
  {
    name: "image-stack-plus",
    componentName: "ImageStackPlus",
    exportName: "IconImageStackPlus",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "image",
      "stack",
      "plus"
    ]
  },
  {
    name: "image-with-text",
    componentName: "ImageWithText",
    exportName: "IconImageWithText",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "image",
      "with",
      "text"
    ]
  },
  {
    name: "info",
    componentName: "Info",
    exportName: "IconInfo",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "info"
    ]
  },
  {
    name: "intercom",
    componentName: "Intercom",
    exportName: "IconIntercom",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "intercom"
    ]
  },
  {
    name: "label",
    componentName: "Label",
    exportName: "IconLabel",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "label"
    ]
  },
  {
    name: "language",
    componentName: "Language",
    exportName: "IconLanguage",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "language"
    ]
  },
  {
    name: "layers",
    componentName: "Layers",
    exportName: "IconLayers",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "layers"
    ]
  },
  {
    name: "layers-single",
    componentName: "LayersSingle",
    exportName: "IconLayersSingle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "layers",
      "single"
    ]
  },
  {
    name: "leaf",
    componentName: "Leaf",
    exportName: "IconLeaf",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "leaf"
    ]
  },
  {
    name: "lightbulb",
    componentName: "Lightbulb",
    exportName: "IconLightbulb",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lightbulb"
    ]
  },
  {
    name: "lightning",
    componentName: "Lightning",
    exportName: "IconLightning",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lightning"
    ]
  },
  {
    name: "lightning-filled",
    componentName: "LightningFilled",
    exportName: "IconLightningFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lightning",
      "filled"
    ]
  },
  {
    name: "lines",
    componentName: "Lines",
    exportName: "IconLines",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lines"
    ]
  },
  {
    name: "lines-triangular",
    componentName: "LinesTriangular",
    exportName: "IconLinesTriangular",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lines",
      "triangular"
    ]
  },
  {
    name: "link",
    componentName: "Link",
    exportName: "IconLink",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "link"
    ]
  },
  {
    name: "link-box",
    componentName: "LinkBox",
    exportName: "IconLinkBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "link",
      "box"
    ]
  },
  {
    name: "link-open",
    componentName: "LinkOpen",
    exportName: "IconLinkOpen",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "link",
      "open"
    ]
  },
  {
    name: "list-bullet",
    componentName: "ListBullet",
    exportName: "IconListBullet",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "list",
      "bullet"
    ]
  },
  {
    name: "list-check",
    componentName: "ListCheck",
    exportName: "IconListCheck",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "list",
      "check"
    ]
  },
  {
    name: "list-indented",
    componentName: "ListIndented",
    exportName: "IconListIndented",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "list",
      "indented"
    ]
  },
  {
    name: "list-numbers",
    componentName: "ListNumbers",
    exportName: "IconListNumbers",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "list",
      "numbers"
    ]
  },
  {
    name: "lock-closed",
    componentName: "LockClosed",
    exportName: "IconLockClosed",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lock",
      "closed"
    ]
  },
  {
    name: "lock-open",
    componentName: "LockOpen",
    exportName: "IconLockOpen",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lock",
      "open"
    ]
  },
  {
    name: "lock-open-filled",
    componentName: "LockOpenFilled",
    exportName: "IconLockOpenFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lock",
      "open",
      "filled"
    ]
  },
  {
    name: "lollipop",
    componentName: "Lollipop",
    exportName: "IconLollipop",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "lollipop"
    ]
  },
  {
    name: "magnifier",
    componentName: "Magnifier",
    exportName: "IconMagnifier",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "magnifier"
    ]
  },
  {
    name: "magnifier-minus",
    componentName: "MagnifierMinus",
    exportName: "IconMagnifierMinus",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "magnifier",
      "minus"
    ]
  },
  {
    name: "magnifier-plus",
    componentName: "MagnifierPlus",
    exportName: "IconMagnifierPlus",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "magnifier",
      "plus"
    ]
  },
  {
    name: "map-pointer",
    componentName: "MapPointer",
    exportName: "IconMapPointer",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "map",
      "pointer"
    ]
  },
  {
    name: "margin-bottom",
    componentName: "MarginBottom",
    exportName: "IconMarginBottom",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "margin",
      "bottom"
    ]
  },
  {
    name: "margin-left",
    componentName: "MarginLeft",
    exportName: "IconMarginLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "margin",
      "left"
    ]
  },
  {
    name: "margin-right",
    componentName: "MarginRight",
    exportName: "IconMarginRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "margin",
      "right"
    ]
  },
  {
    name: "margin-top",
    componentName: "MarginTop",
    exportName: "IconMarginTop",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "margin",
      "top"
    ]
  },
  {
    name: "mark-area",
    componentName: "MarkArea",
    exportName: "IconMarkArea",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "mark",
      "area"
    ]
  },
  {
    name: "market",
    componentName: "Market",
    exportName: "IconMarket",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "market"
    ]
  },
  {
    name: "masonry",
    componentName: "Masonry",
    exportName: "IconMasonry",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "masonry"
    ]
  },
  {
    name: "media-object",
    componentName: "MediaObject",
    exportName: "IconMediaObject",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object"
    ]
  },
  {
    name: "media-object-icon",
    componentName: "MediaObjectIcon",
    exportName: "IconMediaObjectIcon",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "icon"
    ]
  },
  {
    name: "media-object-image",
    componentName: "MediaObjectImage",
    exportName: "IconMediaObjectImage",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "image"
    ]
  },
  {
    name: "media-object-ratio-1-to-1",
    componentName: "MediaObjectRatio1To1",
    exportName: "IconMediaObjectRatio1To1",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "ratio",
      "1",
      "to",
      "1"
    ]
  },
  {
    name: "media-object-ratio-1-to-2",
    componentName: "MediaObjectRatio1To2",
    exportName: "IconMediaObjectRatio1To2",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "ratio",
      "1",
      "to",
      "2"
    ]
  },
  {
    name: "media-object-ratio-1-to-3",
    componentName: "MediaObjectRatio1To3",
    exportName: "IconMediaObjectRatio1To3",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "ratio",
      "1",
      "to",
      "3"
    ]
  },
  {
    name: "media-object-ratio-2-to-1",
    componentName: "MediaObjectRatio2To1",
    exportName: "IconMediaObjectRatio2To1",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "ratio",
      "2",
      "to",
      "1"
    ]
  },
  {
    name: "media-object-ratio-3-to-1",
    componentName: "MediaObjectRatio3To1",
    exportName: "IconMediaObjectRatio3To1",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "ratio",
      "3",
      "to",
      "1"
    ]
  },
  {
    name: "media-object-text-bottom",
    componentName: "MediaObjectTextBottom",
    exportName: "IconMediaObjectTextBottom",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "text",
      "bottom"
    ]
  },
  {
    name: "media-object-text-left",
    componentName: "MediaObjectTextLeft",
    exportName: "IconMediaObjectTextLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "text",
      "left"
    ]
  },
  {
    name: "media-object-text-right",
    componentName: "MediaObjectTextRight",
    exportName: "IconMediaObjectTextRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "text",
      "right"
    ]
  },
  {
    name: "media-object-text-top",
    componentName: "MediaObjectTextTop",
    exportName: "IconMediaObjectTextTop",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "text",
      "top"
    ]
  },
  {
    name: "media-object-video",
    componentName: "MediaObjectVideo",
    exportName: "IconMediaObjectVideo",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "media",
      "object",
      "video"
    ]
  },
  {
    name: "mega-menu",
    componentName: "MegaMenu",
    exportName: "IconMegaMenu",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "mega",
      "menu"
    ]
  },
  {
    name: "megaphone",
    componentName: "Megaphone",
    exportName: "IconMegaphone",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "megaphone"
    ]
  },
  {
    name: "microphone",
    componentName: "Microphone",
    exportName: "IconMicrophone",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "microphone"
    ]
  },
  {
    name: "minus",
    componentName: "Minus",
    exportName: "IconMinus",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "minus"
    ]
  },
  {
    name: "minus-circle",
    componentName: "MinusCircle",
    exportName: "IconMinusCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "minus",
      "circle"
    ]
  },
  {
    name: "money",
    componentName: "Money",
    exportName: "IconMoney",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "money"
    ]
  },
  {
    name: "money-circle-filled",
    componentName: "MoneyCircleFilled",
    exportName: "IconMoneyCircleFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "money",
      "circle",
      "filled"
    ]
  },
  {
    name: "move-bounce",
    componentName: "MoveBounce",
    exportName: "IconMoveBounce",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "bounce"
    ]
  },
  {
    name: "move-emphasis",
    componentName: "MoveEmphasis",
    exportName: "IconMoveEmphasis",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "emphasis"
    ]
  },
  {
    name: "move-entry",
    componentName: "MoveEntry",
    exportName: "IconMoveEntry",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "entry"
    ]
  },
  {
    name: "move-exit",
    componentName: "MoveExit",
    exportName: "IconMoveExit",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "exit"
    ]
  },
  {
    name: "move-float",
    componentName: "MoveFloat",
    exportName: "IconMoveFloat",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "float"
    ]
  },
  {
    name: "move-pulse",
    componentName: "MovePulse",
    exportName: "IconMovePulse",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "pulse"
    ]
  },
  {
    name: "move-to",
    componentName: "MoveTo",
    exportName: "IconMoveTo",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "to"
    ]
  },
  {
    name: "move-wiggle",
    componentName: "MoveWiggle",
    exportName: "IconMoveWiggle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "move",
      "wiggle"
    ]
  },
  {
    name: "music-note",
    componentName: "MusicNote",
    exportName: "IconMusicNote",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "music",
      "note"
    ]
  },
  {
    name: "nook",
    componentName: "Nook",
    exportName: "IconNook",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "nook"
    ]
  },
  {
    name: "open-ai",
    componentName: "OpenAi",
    exportName: "IconOpenAi",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "open",
      "ai"
    ]
  },
  {
    name: "orientation-boxes",
    componentName: "OrientationBoxes",
    exportName: "IconOrientationBoxes",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "orientation",
      "boxes"
    ]
  },
  {
    name: "padding-horizontal",
    componentName: "PaddingHorizontal",
    exportName: "IconPaddingHorizontal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "padding",
      "horizontal"
    ]
  },
  {
    name: "padding-vertical",
    componentName: "PaddingVertical",
    exportName: "IconPaddingVertical",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "padding",
      "vertical"
    ]
  },
  {
    name: "paintbrush",
    componentName: "Paintbrush",
    exportName: "IconPaintbrush",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "paintbrush"
    ]
  },
  {
    name: "paperclip",
    componentName: "Paperclip",
    exportName: "IconPaperclip",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "paperclip"
    ]
  },
  {
    name: "paperplane",
    componentName: "Paperplane",
    exportName: "IconPaperplane",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "paperplane"
    ]
  },
  {
    name: "pause",
    componentName: "Pause",
    exportName: "IconPause",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pause"
    ]
  },
  {
    name: "pause-filled",
    componentName: "PauseFilled",
    exportName: "IconPauseFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pause",
      "filled"
    ]
  },
  {
    name: "pen",
    componentName: "Pen",
    exportName: "IconPen",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pen"
    ]
  },
  {
    name: "people",
    componentName: "People",
    exportName: "IconPeople",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "people"
    ]
  },
  {
    name: "person",
    componentName: "Person",
    exportName: "IconPerson",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "person"
    ]
  },
  {
    name: "person-anonymous",
    componentName: "PersonAnonymous",
    exportName: "IconPersonAnonymous",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "person",
      "anonymous"
    ]
  },
  {
    name: "person-lock",
    componentName: "PersonLock",
    exportName: "IconPersonLock",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "person",
      "lock"
    ]
  },
  {
    name: "person-slash",
    componentName: "PersonSlash",
    exportName: "IconPersonSlash",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "person",
      "slash"
    ]
  },
  {
    name: "pills",
    componentName: "Pills",
    exportName: "IconPills",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pills"
    ]
  },
  {
    name: "pin",
    componentName: "Pin",
    exportName: "IconPin",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pin"
    ]
  },
  {
    name: "pin-filled",
    componentName: "PinFilled",
    exportName: "IconPinFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pin",
      "filled"
    ]
  },
  {
    name: "play",
    componentName: "Play",
    exportName: "IconPlay",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "play"
    ]
  },
  {
    name: "play-box",
    componentName: "PlayBox",
    exportName: "IconPlayBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "play",
      "box"
    ]
  },
  {
    name: "play-circle",
    componentName: "PlayCircle",
    exportName: "IconPlayCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "play",
      "circle"
    ]
  },
  {
    name: "play-filled",
    componentName: "PlayFilled",
    exportName: "IconPlayFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "play",
      "filled"
    ]
  },
  {
    name: "play-frame",
    componentName: "PlayFrame",
    exportName: "IconPlayFrame",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "play",
      "frame"
    ]
  },
  {
    name: "plus",
    componentName: "Plus",
    exportName: "IconPlus",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "plus"
    ]
  },
  {
    name: "plus-box-stack",
    componentName: "PlusBoxStack",
    exportName: "IconPlusBoxStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "plus",
      "box",
      "stack"
    ]
  },
  {
    name: "plus-circle",
    componentName: "PlusCircle",
    exportName: "IconPlusCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "plus",
      "circle"
    ]
  },
  {
    name: "plus-frame",
    componentName: "PlusFrame",
    exportName: "IconPlusFrame",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "plus",
      "frame"
    ]
  },
  {
    name: "pointout",
    componentName: "Pointout",
    exportName: "IconPointout",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "pointout"
    ]
  },
  {
    name: "polygon",
    componentName: "Polygon",
    exportName: "IconPolygon",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "polygon"
    ]
  },
  {
    name: "puzzle",
    componentName: "Puzzle",
    exportName: "IconPuzzle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "puzzle"
    ]
  },
  {
    name: "question-mark",
    componentName: "QuestionMark",
    exportName: "IconQuestionMark",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "question",
      "mark"
    ]
  },
  {
    name: "question-mark-circle",
    componentName: "QuestionMarkCircle",
    exportName: "IconQuestionMarkCircle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "question",
      "mark",
      "circle"
    ]
  },
  {
    name: "radius-bottom-left",
    componentName: "RadiusBottomLeft",
    exportName: "IconRadiusBottomLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "radius",
      "bottom",
      "left"
    ]
  },
  {
    name: "radius-bottom-right",
    componentName: "RadiusBottomRight",
    exportName: "IconRadiusBottomRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "radius",
      "bottom",
      "right"
    ]
  },
  {
    name: "radius-top-left",
    componentName: "RadiusTopLeft",
    exportName: "IconRadiusTopLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "radius",
      "top",
      "left"
    ]
  },
  {
    name: "radius-top-right",
    componentName: "RadiusTopRight",
    exportName: "IconRadiusTopRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "radius",
      "top",
      "right"
    ]
  },
  {
    name: "rectangle-landscape",
    componentName: "RectangleLandscape",
    exportName: "IconRectangleLandscape",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rectangle",
      "landscape"
    ]
  },
  {
    name: "rectangle-portrait-square",
    componentName: "RectanglePortraitSquare",
    exportName: "IconRectanglePortraitSquare",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rectangle",
      "portrait",
      "square"
    ]
  },
  {
    name: "report",
    componentName: "Report",
    exportName: "IconReport",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "report"
    ]
  },
  {
    name: "rewind",
    componentName: "Rewind",
    exportName: "IconRewind",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rewind"
    ]
  },
  {
    name: "rewind-filled",
    componentName: "RewindFilled",
    exportName: "IconRewindFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rewind",
      "filled"
    ]
  },
  {
    name: "rocket",
    componentName: "Rocket",
    exportName: "IconRocket",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rocket"
    ]
  },
  {
    name: "rotate-90-left",
    componentName: "Rotate90Left",
    exportName: "IconRotate90Left",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rotate",
      "90",
      "left"
    ]
  },
  {
    name: "rotate-90-right",
    componentName: "Rotate90Right",
    exportName: "IconRotate90Right",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "rotate",
      "90",
      "right"
    ]
  },
  {
    name: "ruler",
    componentName: "Ruler",
    exportName: "IconRuler",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "ruler"
    ]
  },
  {
    name: "scale-large",
    componentName: "ScaleLarge",
    exportName: "IconScaleLarge",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "scale",
      "large"
    ]
  },
  {
    name: "scale-small",
    componentName: "ScaleSmall",
    exportName: "IconScaleSmall",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "scale",
      "small"
    ]
  },
  {
    name: "scissors",
    componentName: "Scissors",
    exportName: "IconScissors",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "scissors"
    ]
  },
  {
    name: "sidebar-left",
    componentName: "SidebarLeft",
    exportName: "IconSidebarLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "left"
    ]
  },
  {
    name: "sidebar-left-hide",
    componentName: "SidebarLeftHide",
    exportName: "IconSidebarLeftHide",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "left",
      "hide"
    ]
  },
  {
    name: "sidebar-left-hide-filled",
    componentName: "SidebarLeftHideFilled",
    exportName: "IconSidebarLeftHideFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "left",
      "hide",
      "filled"
    ]
  },
  {
    name: "sidebar-left-show",
    componentName: "SidebarLeftShow",
    exportName: "IconSidebarLeftShow",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "left",
      "show"
    ]
  },
  {
    name: "sidebar-left-show-filled",
    componentName: "SidebarLeftShowFilled",
    exportName: "IconSidebarLeftShowFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "left",
      "show",
      "filled"
    ]
  },
  {
    name: "sidebar-right",
    componentName: "SidebarRight",
    exportName: "IconSidebarRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "right"
    ]
  },
  {
    name: "sidebar-right-hide",
    componentName: "SidebarRightHide",
    exportName: "IconSidebarRightHide",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "right",
      "hide"
    ]
  },
  {
    name: "sidebar-right-hide-filled",
    componentName: "SidebarRightHideFilled",
    exportName: "IconSidebarRightHideFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "right",
      "hide",
      "filled"
    ]
  },
  {
    name: "sidebar-right-show",
    componentName: "SidebarRightShow",
    exportName: "IconSidebarRightShow",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "right",
      "show"
    ]
  },
  {
    name: "sidebar-right-show-filled",
    componentName: "SidebarRightShowFilled",
    exportName: "IconSidebarRightShowFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sidebar",
      "right",
      "show",
      "filled"
    ]
  },
  {
    name: "sketch",
    componentName: "Sketch",
    exportName: "IconSketch",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sketch"
    ]
  },
  {
    name: "skip-5-seconds-backward",
    componentName: "Skip5SecondsBackward",
    exportName: "IconSkip5SecondsBackward",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "skip",
      "5",
      "seconds",
      "backward"
    ]
  },
  {
    name: "skip-5-seconds-forward",
    componentName: "Skip5SecondsForward",
    exportName: "IconSkip5SecondsForward",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "skip",
      "5",
      "seconds",
      "forward"
    ]
  },
  {
    name: "skip-next",
    componentName: "SkipNext",
    exportName: "IconSkipNext",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "skip",
      "next"
    ]
  },
  {
    name: "skip-next-filled",
    componentName: "SkipNextFilled",
    exportName: "IconSkipNextFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "skip",
      "next",
      "filled"
    ]
  },
  {
    name: "skip-previous",
    componentName: "SkipPrevious",
    exportName: "IconSkipPrevious",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "skip",
      "previous"
    ]
  },
  {
    name: "skip-previous-filled",
    componentName: "SkipPreviousFilled",
    exportName: "IconSkipPreviousFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "skip",
      "previous",
      "filled"
    ]
  },
  {
    name: "sound-wave",
    componentName: "SoundWave",
    exportName: "IconSoundWave",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sound",
      "wave"
    ]
  },
  {
    name: "sparks",
    componentName: "Sparks",
    exportName: "IconSparks",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sparks"
    ]
  },
  {
    name: "sparks-filled",
    componentName: "SparksFilled",
    exportName: "IconSparksFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "sparks",
      "filled"
    ]
  },
  {
    name: "speaker",
    componentName: "Speaker",
    exportName: "IconSpeaker",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "speaker"
    ]
  },
  {
    name: "speaker-off",
    componentName: "SpeakerOff",
    exportName: "IconSpeakerOff",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "speaker",
      "off"
    ]
  },
  {
    name: "speech-bubble-dots",
    componentName: "SpeechBubbleDots",
    exportName: "IconSpeechBubbleDots",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "speech",
      "bubble",
      "dots"
    ]
  },
  {
    name: "speech-bubble-empty",
    componentName: "SpeechBubbleEmpty",
    exportName: "IconSpeechBubbleEmpty",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "speech",
      "bubble",
      "empty"
    ]
  },
  {
    name: "speech-bubble-quote",
    componentName: "SpeechBubbleQuote",
    exportName: "IconSpeechBubbleQuote",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "speech",
      "bubble",
      "quote"
    ]
  },
  {
    name: "speech-bubble-stack",
    componentName: "SpeechBubbleStack",
    exportName: "IconSpeechBubbleStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "speech",
      "bubble",
      "stack"
    ]
  },
  {
    name: "square",
    componentName: "Square",
    exportName: "IconSquare",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "square"
    ]
  },
  {
    name: "stack-horizontal",
    componentName: "StackHorizontal",
    exportName: "IconStackHorizontal",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "stack",
      "horizontal"
    ]
  },
  {
    name: "stack-horizontal-alt-four",
    componentName: "StackHorizontalAltFour",
    exportName: "IconStackHorizontalAltFour",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "stack",
      "horizontal",
      "alt",
      "four"
    ]
  },
  {
    name: "stack-horizontal-alt-three",
    componentName: "StackHorizontalAltThree",
    exportName: "IconStackHorizontalAltThree",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "stack",
      "horizontal",
      "alt",
      "three"
    ]
  },
  {
    name: "stack-horizontal-alt-two",
    componentName: "StackHorizontalAltTwo",
    exportName: "IconStackHorizontalAltTwo",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "stack",
      "horizontal",
      "alt",
      "two"
    ]
  },
  {
    name: "stack-vertical",
    componentName: "StackVertical",
    exportName: "IconStackVertical",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "stack",
      "vertical"
    ]
  },
  {
    name: "star",
    componentName: "Star",
    exportName: "IconStar",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "star"
    ]
  },
  {
    name: "star-filled",
    componentName: "StarFilled",
    exportName: "IconStarFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "star",
      "filled"
    ]
  },
  {
    name: "storybook",
    componentName: "Storybook",
    exportName: "IconStorybook",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "storybook"
    ]
  },
  {
    name: "strikethrough-box",
    componentName: "StrikethroughBox",
    exportName: "IconStrikethroughBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "strikethrough",
      "box"
    ]
  },
  {
    name: "subscript",
    componentName: "Subscript",
    exportName: "IconSubscript",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "subscript"
    ]
  },
  {
    name: "suitcase",
    componentName: "Suitcase",
    exportName: "IconSuitcase",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "suitcase"
    ]
  },
  {
    name: "suitcase-tag",
    componentName: "SuitcaseTag",
    exportName: "IconSuitcaseTag",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "suitcase",
      "tag"
    ]
  },
  {
    name: "superscript",
    componentName: "Superscript",
    exportName: "IconSuperscript",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "superscript"
    ]
  },
  {
    name: "table",
    componentName: "Table",
    exportName: "IconTable",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "table"
    ]
  },
  {
    name: "target",
    componentName: "Target",
    exportName: "IconTarget",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "target"
    ]
  },
  {
    name: "text-alignment-centre",
    componentName: "TextAlignmentCentre",
    exportName: "IconTextAlignmentCentre",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "alignment",
      "centre"
    ]
  },
  {
    name: "text-alignment-justify",
    componentName: "TextAlignmentJustify",
    exportName: "IconTextAlignmentJustify",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "alignment",
      "justify"
    ]
  },
  {
    name: "text-alignment-left",
    componentName: "TextAlignmentLeft",
    exportName: "IconTextAlignmentLeft",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "alignment",
      "left"
    ]
  },
  {
    name: "text-alignment-right",
    componentName: "TextAlignmentRight",
    exportName: "IconTextAlignmentRight",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "alignment",
      "right"
    ]
  },
  {
    name: "text-box-stack",
    componentName: "TextBoxStack",
    exportName: "IconTextBoxStack",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "box",
      "stack"
    ]
  },
  {
    name: "text-brackets",
    componentName: "TextBrackets",
    exportName: "IconTextBrackets",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "brackets"
    ]
  },
  {
    name: "text-column-break",
    componentName: "TextColumnBreak",
    exportName: "IconTextColumnBreak",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "column",
      "break"
    ]
  },
  {
    name: "text-columns",
    componentName: "TextColumns",
    exportName: "IconTextColumns",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "columns"
    ]
  },
  {
    name: "text-format-bold",
    componentName: "TextFormatBold",
    exportName: "IconTextFormatBold",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "format",
      "bold"
    ]
  },
  {
    name: "text-format-italic",
    componentName: "TextFormatItalic",
    exportName: "IconTextFormatItalic",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "format",
      "italic"
    ]
  },
  {
    name: "text-format-strikethrough",
    componentName: "TextFormatStrikethrough",
    exportName: "IconTextFormatStrikethrough",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "format",
      "strikethrough"
    ]
  },
  {
    name: "text-format-underline",
    componentName: "TextFormatUnderline",
    exportName: "IconTextFormatUnderline",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "format",
      "underline"
    ]
  },
  {
    name: "text-indent",
    componentName: "TextIndent",
    exportName: "IconTextIndent",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "indent"
    ]
  },
  {
    name: "text-outdent",
    componentName: "TextOutdent",
    exportName: "IconTextOutdent",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "text",
      "outdent"
    ]
  },
  {
    name: "thumbs-down",
    componentName: "ThumbsDown",
    exportName: "IconThumbsDown",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "thumbs",
      "down"
    ]
  },
  {
    name: "thumbs-down-filled",
    componentName: "ThumbsDownFilled",
    exportName: "IconThumbsDownFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "thumbs",
      "down",
      "filled"
    ]
  },
  {
    name: "thumbs-up",
    componentName: "ThumbsUp",
    exportName: "IconThumbsUp",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "thumbs",
      "up"
    ]
  },
  {
    name: "thumbs-up-filled",
    componentName: "ThumbsUpFilled",
    exportName: "IconThumbsUpFilled",
    importPath: "@frontify/fondue-icons",
    filled: true,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "thumbs",
      "up",
      "filled"
    ]
  },
  {
    name: "trash-bin",
    componentName: "TrashBin",
    exportName: "IconTrashBin",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "trash",
      "bin"
    ]
  },
  {
    name: "triangle",
    componentName: "Triangle",
    exportName: "IconTriangle",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "triangle"
    ]
  },
  {
    name: "twitter",
    componentName: "Twitter",
    exportName: "IconTwitter",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "twitter"
    ]
  },
  {
    name: "typography",
    componentName: "Typography",
    exportName: "IconTypography",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "typography"
    ]
  },
  {
    name: "typography-box",
    componentName: "TypographyBox",
    exportName: "IconTypographyBox",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "typography",
      "box"
    ]
  },
  {
    name: "typography-case",
    componentName: "TypographyCase",
    exportName: "IconTypographyCase",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "typography",
      "case"
    ]
  },
  {
    name: "typography-multiple",
    componentName: "TypographyMultiple",
    exportName: "IconTypographyMultiple",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "typography",
      "multiple"
    ]
  },
  {
    name: "vimeo",
    componentName: "Vimeo",
    exportName: "IconVimeo",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "vimeo"
    ]
  },
  {
    name: "wand",
    componentName: "Wand",
    exportName: "IconWand",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "wand"
    ]
  },
  {
    name: "workflow-lanes",
    componentName: "WorkflowLanes",
    exportName: "IconWorkflowLanes",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "workflow",
      "lanes"
    ]
  },
  {
    name: "workflow-shapes",
    componentName: "WorkflowShapes",
    exportName: "IconWorkflowShapes",
    importPath: "@frontify/fondue-icons",
    filled: false,
    availableSizes: [
      12,
      16,
      20,
      24,
      32
    ],
    defaultSize: 24,
    keywords: [
      "workflow",
      "shapes"
    ]
  }
];
const iconsManifest = {
  sizes,
  icons
};
const tokens = [
  {
    category: "colors",
    cssVariable: "var(--color-charts-dim-default)",
    id: "color-charts-dim-default",
    keyPath: [
      "colors",
      "charts",
      "dim",
      "default"
    ],
    tailwindClass: "*-charts-dim",
    themeable: true,
    type: "color",
    value: "var(--color-charts-dim-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-missing-default)",
    id: "color-charts-missing-default",
    keyPath: [
      "colors",
      "charts",
      "missing",
      "default"
    ],
    tailwindClass: "*-charts-missing",
    themeable: true,
    type: "color",
    value: "var(--color-charts-missing-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-negative-default)",
    id: "color-charts-negative-default",
    keyPath: [
      "colors",
      "charts",
      "negative",
      "default"
    ],
    tailwindClass: "*-charts-negative",
    themeable: true,
    type: "color",
    value: "var(--color-charts-negative-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-negative-hover)",
    id: "color-charts-negative-hover",
    keyPath: [
      "colors",
      "charts",
      "negative",
      "hover"
    ],
    tailwindClass: "*-charts-negative-hover",
    themeable: true,
    type: "color",
    value: "var(--color-charts-negative-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-negative-subtle)",
    id: "color-charts-negative-subtle",
    keyPath: [
      "colors",
      "charts",
      "negative",
      "subtle"
    ],
    tailwindClass: "*-charts-negative-subtle",
    themeable: true,
    type: "color",
    value: "var(--color-charts-negative-subtle)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-primary-default)",
    id: "color-charts-primary-default",
    keyPath: [
      "colors",
      "charts",
      "primary",
      "default"
    ],
    tailwindClass: "*-charts-primary",
    themeable: true,
    type: "color",
    value: "var(--color-charts-primary-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-primary-hover)",
    id: "color-charts-primary-hover",
    keyPath: [
      "colors",
      "charts",
      "primary",
      "hover"
    ],
    tailwindClass: "*-charts-primary-hover",
    themeable: true,
    type: "color",
    value: "var(--color-charts-primary-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-primary-subtle)",
    id: "color-charts-primary-subtle",
    keyPath: [
      "colors",
      "charts",
      "primary",
      "subtle"
    ],
    tailwindClass: "*-charts-primary-subtle",
    themeable: true,
    type: "color",
    value: "var(--color-charts-primary-subtle)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-secondary-default)",
    id: "color-charts-secondary-default",
    keyPath: [
      "colors",
      "charts",
      "secondary",
      "default"
    ],
    tailwindClass: "*-charts-secondary",
    themeable: true,
    type: "color",
    value: "var(--color-charts-secondary-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-secondary-hover)",
    id: "color-charts-secondary-hover",
    keyPath: [
      "colors",
      "charts",
      "secondary",
      "hover"
    ],
    tailwindClass: "*-charts-secondary-hover",
    themeable: true,
    type: "color",
    value: "var(--color-charts-secondary-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-secondary-subtle)",
    id: "color-charts-secondary-subtle",
    keyPath: [
      "colors",
      "charts",
      "secondary",
      "subtle"
    ],
    tailwindClass: "*-charts-secondary-subtle",
    themeable: true,
    type: "color",
    value: "var(--color-charts-secondary-subtle)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-tertiary-default)",
    id: "color-charts-tertiary-default",
    keyPath: [
      "colors",
      "charts",
      "tertiary",
      "default"
    ],
    tailwindClass: "*-charts-tertiary",
    themeable: true,
    type: "color",
    value: "var(--color-charts-tertiary-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-tertiary-hover)",
    id: "color-charts-tertiary-hover",
    keyPath: [
      "colors",
      "charts",
      "tertiary",
      "hover"
    ],
    tailwindClass: "*-charts-tertiary-hover",
    themeable: true,
    type: "color",
    value: "var(--color-charts-tertiary-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-charts-tertiary-subtle)",
    id: "color-charts-tertiary-subtle",
    keyPath: [
      "colors",
      "charts",
      "tertiary",
      "subtle"
    ],
    tailwindClass: "*-charts-tertiary-subtle",
    themeable: true,
    type: "color",
    value: "var(--color-charts-tertiary-subtle)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-disabled-default)",
    id: "color-container-disabled-default",
    keyPath: [
      "colors",
      "container",
      "disabled",
      "default"
    ],
    tailwindClass: "*-container-disabled",
    themeable: true,
    type: "color",
    value: "var(--color-container-disabled-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-disabled-on-disabled-container)",
    id: "color-container-disabled-on-disabled-container",
    keyPath: [
      "colors",
      "container",
      "disabled",
      "on-disabled-container"
    ],
    tailwindClass: "*-container-disabled-on-disabled-container",
    themeable: true,
    type: "color",
    value: "var(--color-container-disabled-on-disabled-container)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-error-active)",
    id: "color-container-error-active",
    keyPath: [
      "colors",
      "container",
      "error",
      "active"
    ],
    tailwindClass: "*-container-error-active",
    themeable: true,
    type: "color",
    value: "var(--color-container-error-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-error-default)",
    id: "color-container-error-default",
    keyPath: [
      "colors",
      "container",
      "error",
      "default"
    ],
    tailwindClass: "*-container-error",
    themeable: true,
    type: "color",
    value: "var(--color-container-error-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-error-hover)",
    id: "color-container-error-hover",
    keyPath: [
      "colors",
      "container",
      "error",
      "hover"
    ],
    tailwindClass: "*-container-error-hover",
    themeable: true,
    type: "color",
    value: "var(--color-container-error-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-error-on-error-container)",
    id: "color-container-error-on-error-container",
    keyPath: [
      "colors",
      "container",
      "error",
      "on-error-container"
    ],
    tailwindClass: "*-container-error-on-error-container",
    themeable: true,
    type: "color",
    value: "var(--color-container-error-on-error-container)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-highlight-active)",
    id: "color-container-highlight-active",
    keyPath: [
      "colors",
      "container",
      "highlight",
      "active"
    ],
    tailwindClass: "*-container-highlight-active",
    themeable: true,
    type: "color",
    value: "var(--color-container-highlight-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-highlight-default)",
    id: "color-container-highlight-default",
    keyPath: [
      "colors",
      "container",
      "highlight",
      "default"
    ],
    tailwindClass: "*-container-highlight",
    themeable: true,
    type: "color",
    value: "var(--color-container-highlight-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-highlight-hover)",
    id: "color-container-highlight-hover",
    keyPath: [
      "colors",
      "container",
      "highlight",
      "hover"
    ],
    tailwindClass: "*-container-highlight-hover",
    themeable: true,
    type: "color",
    value: "var(--color-container-highlight-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-highlight-on-highlight-container)",
    id: "color-container-highlight-on-highlight-container",
    keyPath: [
      "colors",
      "container",
      "highlight",
      "on-highlight-container"
    ],
    tailwindClass: "*-container-highlight-on-highlight-container",
    themeable: true,
    type: "color",
    value: "var(--color-container-highlight-on-highlight-container)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-secondary-active)",
    id: "color-container-secondary-active",
    keyPath: [
      "colors",
      "container",
      "secondary",
      "active"
    ],
    tailwindClass: "*-container-secondary-active",
    themeable: true,
    type: "color",
    value: "var(--color-container-secondary-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-secondary-default)",
    id: "color-container-secondary-default",
    keyPath: [
      "colors",
      "container",
      "secondary",
      "default"
    ],
    tailwindClass: "*-container-secondary",
    themeable: true,
    type: "color",
    value: "var(--color-container-secondary-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-secondary-hover)",
    id: "color-container-secondary-hover",
    keyPath: [
      "colors",
      "container",
      "secondary",
      "hover"
    ],
    tailwindClass: "*-container-secondary-hover",
    themeable: true,
    type: "color",
    value: "var(--color-container-secondary-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-secondary-on-secondary-container)",
    id: "color-container-secondary-on-secondary-container",
    keyPath: [
      "colors",
      "container",
      "secondary",
      "on-secondary-container"
    ],
    tailwindClass: "*-container-secondary-on-secondary-container",
    themeable: true,
    type: "color",
    value: "var(--color-container-secondary-on-secondary-container)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-secondary-on-secondary-container-variant)",
    id: "color-container-secondary-on-secondary-container-variant",
    keyPath: [
      "colors",
      "container",
      "secondary",
      "on-secondary-container-variant"
    ],
    tailwindClass: "*-container-secondary-on-secondary-container-variant",
    themeable: true,
    type: "color",
    value: "var(--color-container-secondary-on-secondary-container-variant)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-success-active)",
    id: "color-container-success-active",
    keyPath: [
      "colors",
      "container",
      "success",
      "active"
    ],
    tailwindClass: "*-container-success-active",
    themeable: true,
    type: "color",
    value: "var(--color-container-success-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-success-default)",
    id: "color-container-success-default",
    keyPath: [
      "colors",
      "container",
      "success",
      "default"
    ],
    tailwindClass: "*-container-success",
    themeable: true,
    type: "color",
    value: "var(--color-container-success-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-success-hover)",
    id: "color-container-success-hover",
    keyPath: [
      "colors",
      "container",
      "success",
      "hover"
    ],
    tailwindClass: "*-container-success-hover",
    themeable: true,
    type: "color",
    value: "var(--color-container-success-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-success-on-success-container)",
    id: "color-container-success-on-success-container",
    keyPath: [
      "colors",
      "container",
      "success",
      "on-success-container"
    ],
    tailwindClass: "*-container-success-on-success-container",
    themeable: true,
    type: "color",
    value: "var(--color-container-success-on-success-container)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-warning-active)",
    id: "color-container-warning-active",
    keyPath: [
      "colors",
      "container",
      "warning",
      "active"
    ],
    tailwindClass: "*-container-warning-active",
    themeable: true,
    type: "color",
    value: "var(--color-container-warning-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-warning-default)",
    id: "color-container-warning-default",
    keyPath: [
      "colors",
      "container",
      "warning",
      "default"
    ],
    tailwindClass: "*-container-warning",
    themeable: true,
    type: "color",
    value: "var(--color-container-warning-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-warning-hover)",
    id: "color-container-warning-hover",
    keyPath: [
      "colors",
      "container",
      "warning",
      "hover"
    ],
    tailwindClass: "*-container-warning-hover",
    themeable: true,
    type: "color",
    value: "var(--color-container-warning-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-container-warning-on-warning-container)",
    id: "color-container-warning-on-warning-container",
    keyPath: [
      "colors",
      "container",
      "warning",
      "on-warning-container"
    ],
    tailwindClass: "*-container-warning-on-warning-container",
    themeable: true,
    type: "color",
    value: "var(--color-container-warning-on-warning-container)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-disabled-default)",
    id: "color-disabled-default",
    keyPath: [
      "colors",
      "disabled",
      "default"
    ],
    tailwindClass: "*-disabled",
    themeable: true,
    type: "color",
    value: "var(--color-disabled-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-disabled-on-disabled)",
    id: "color-disabled-on-disabled",
    keyPath: [
      "colors",
      "disabled",
      "on-disabled"
    ],
    tailwindClass: "*-disabled-on-disabled",
    themeable: true,
    type: "color",
    value: "var(--color-disabled-on-disabled)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-error-active)",
    id: "color-error-active",
    keyPath: [
      "colors",
      "error",
      "active"
    ],
    tailwindClass: "*-error-active",
    themeable: true,
    type: "color",
    value: "var(--color-error-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-error-default)",
    id: "color-error-default",
    keyPath: [
      "colors",
      "error",
      "default"
    ],
    tailwindClass: "*-error",
    themeable: true,
    type: "color",
    value: "var(--color-error-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-error-hover)",
    id: "color-error-hover",
    keyPath: [
      "colors",
      "error",
      "hover"
    ],
    tailwindClass: "*-error-hover",
    themeable: true,
    type: "color",
    value: "var(--color-error-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-error-on-error)",
    id: "color-error-on-error",
    keyPath: [
      "colors",
      "error",
      "on-error"
    ],
    tailwindClass: "*-error-on-error",
    themeable: true,
    type: "color",
    value: "var(--color-error-on-error)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-focus-contrast)",
    id: "color-focus-contrast",
    keyPath: [
      "colors",
      "focus",
      "contrast"
    ],
    tailwindClass: "*-focus-contrast",
    themeable: true,
    type: "color",
    value: "var(--color-focus-contrast)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-focus-default)",
    id: "color-focus-default",
    keyPath: [
      "colors",
      "focus",
      "default"
    ],
    tailwindClass: "*-focus",
    themeable: true,
    type: "color",
    value: "var(--color-focus-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-highlight-active)",
    id: "color-highlight-active",
    keyPath: [
      "colors",
      "highlight",
      "active"
    ],
    tailwindClass: "*-highlight-active",
    themeable: true,
    type: "color",
    value: "var(--color-highlight-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-highlight-default)",
    id: "color-highlight-default",
    keyPath: [
      "colors",
      "highlight",
      "default"
    ],
    tailwindClass: "*-highlight",
    themeable: true,
    type: "color",
    value: "var(--color-highlight-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-highlight-hover)",
    id: "color-highlight-hover",
    keyPath: [
      "colors",
      "highlight",
      "hover"
    ],
    tailwindClass: "*-highlight-hover",
    themeable: true,
    type: "color",
    value: "var(--color-highlight-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-highlight-on-highlight)",
    id: "color-highlight-on-highlight",
    keyPath: [
      "colors",
      "highlight",
      "on-highlight"
    ],
    tailwindClass: "*-highlight-on-highlight",
    themeable: true,
    type: "color",
    value: "var(--color-highlight-on-highlight)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-line-mid)",
    id: "color-line-mid",
    keyPath: [
      "colors",
      "line",
      "mid"
    ],
    tailwindClass: "*-line-mid",
    themeable: true,
    type: "color",
    value: "var(--color-line-mid)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-line-strong)",
    id: "color-line-strong",
    keyPath: [
      "colors",
      "line",
      "strong"
    ],
    tailwindClass: "*-line-strong",
    themeable: true,
    type: "color",
    value: "var(--color-line-strong)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-line-subtle)",
    id: "color-line-subtle",
    keyPath: [
      "colors",
      "line",
      "subtle"
    ],
    tailwindClass: "*-line-subtle",
    themeable: true,
    type: "color",
    value: "var(--color-line-subtle)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-low-contrast-default)",
    id: "color-low-contrast-default",
    keyPath: [
      "colors",
      "low-contrast",
      "default"
    ],
    tailwindClass: "*-low-contrast",
    themeable: true,
    type: "color",
    value: "var(--color-low-contrast-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-overlay-default)",
    id: "color-overlay-default",
    keyPath: [
      "colors",
      "overlay",
      "default"
    ],
    tailwindClass: "*-overlay",
    themeable: true,
    type: "color",
    value: "var(--color-overlay-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-primary-active)",
    id: "color-primary-active",
    keyPath: [
      "colors",
      "primary",
      "active"
    ],
    tailwindClass: "*-primary-active",
    themeable: true,
    type: "color",
    value: "var(--color-primary-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-primary-default)",
    id: "color-primary-default",
    keyPath: [
      "colors",
      "primary",
      "default"
    ],
    tailwindClass: "*-primary",
    themeable: true,
    type: "color",
    value: "var(--color-primary-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-primary-hover)",
    id: "color-primary-hover",
    keyPath: [
      "colors",
      "primary",
      "hover"
    ],
    tailwindClass: "*-primary-hover",
    themeable: true,
    type: "color",
    value: "var(--color-primary-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-primary-on-primary)",
    id: "color-primary-on-primary",
    keyPath: [
      "colors",
      "primary",
      "on-primary"
    ],
    tailwindClass: "*-primary-on-primary",
    themeable: true,
    type: "color",
    value: "var(--color-primary-on-primary)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-primary-on-primary-variant)",
    id: "color-primary-on-primary-variant",
    keyPath: [
      "colors",
      "primary",
      "on-primary-variant"
    ],
    tailwindClass: "*-primary-on-primary-variant",
    themeable: true,
    type: "color",
    value: "var(--color-primary-on-primary-variant)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-secondary-active)",
    id: "color-secondary-active",
    keyPath: [
      "colors",
      "secondary",
      "active"
    ],
    tailwindClass: "*-secondary-active",
    themeable: true,
    type: "color",
    value: "var(--color-secondary-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-secondary-default)",
    id: "color-secondary-default",
    keyPath: [
      "colors",
      "secondary",
      "default"
    ],
    tailwindClass: "*-secondary",
    themeable: true,
    type: "color",
    value: "var(--color-secondary-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-secondary-hover)",
    id: "color-secondary-hover",
    keyPath: [
      "colors",
      "secondary",
      "hover"
    ],
    tailwindClass: "*-secondary-hover",
    themeable: true,
    type: "color",
    value: "var(--color-secondary-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-secondary-on-secondary)",
    id: "color-secondary-on-secondary",
    keyPath: [
      "colors",
      "secondary",
      "on-secondary"
    ],
    tailwindClass: "*-secondary-on-secondary",
    themeable: true,
    type: "color",
    value: "var(--color-secondary-on-secondary)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-shadow-default)",
    id: "color-shadow-default",
    keyPath: [
      "colors",
      "shadow",
      "default"
    ],
    tailwindClass: "*-shadow",
    themeable: true,
    type: "color",
    value: "var(--color-shadow-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-success-active)",
    id: "color-success-active",
    keyPath: [
      "colors",
      "success",
      "active"
    ],
    tailwindClass: "*-success-active",
    themeable: true,
    type: "color",
    value: "var(--color-success-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-success-default)",
    id: "color-success-default",
    keyPath: [
      "colors",
      "success",
      "default"
    ],
    tailwindClass: "*-success",
    themeable: true,
    type: "color",
    value: "var(--color-success-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-success-hover)",
    id: "color-success-hover",
    keyPath: [
      "colors",
      "success",
      "hover"
    ],
    tailwindClass: "*-success-hover",
    themeable: true,
    type: "color",
    value: "var(--color-success-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-success-on-success)",
    id: "color-success-on-success",
    keyPath: [
      "colors",
      "success",
      "on-success"
    ],
    tailwindClass: "*-success-on-success",
    themeable: true,
    type: "color",
    value: "var(--color-success-on-success)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-surface-active)",
    id: "color-surface-active",
    keyPath: [
      "colors",
      "surface",
      "active"
    ],
    tailwindClass: "*-surface-active",
    themeable: true,
    type: "color",
    value: "var(--color-surface-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-surface-default)",
    id: "color-surface-default",
    keyPath: [
      "colors",
      "surface",
      "default"
    ],
    tailwindClass: "*-surface",
    themeable: true,
    type: "color",
    value: "var(--color-surface-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-surface-dim)",
    id: "color-surface-dim",
    keyPath: [
      "colors",
      "surface",
      "dim"
    ],
    tailwindClass: "*-surface-dim",
    themeable: true,
    type: "color",
    value: "var(--color-surface-dim)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-surface-hover)",
    id: "color-surface-hover",
    keyPath: [
      "colors",
      "surface",
      "hover"
    ],
    tailwindClass: "*-surface-hover",
    themeable: true,
    type: "color",
    value: "var(--color-surface-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-warning-active)",
    id: "color-warning-active",
    keyPath: [
      "colors",
      "warning",
      "active"
    ],
    tailwindClass: "*-warning-active",
    themeable: true,
    type: "color",
    value: "var(--color-warning-active)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-warning-default)",
    id: "color-warning-default",
    keyPath: [
      "colors",
      "warning",
      "default"
    ],
    tailwindClass: "*-warning",
    themeable: true,
    type: "color",
    value: "var(--color-warning-default)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-warning-hover)",
    id: "color-warning-hover",
    keyPath: [
      "colors",
      "warning",
      "hover"
    ],
    tailwindClass: "*-warning-hover",
    themeable: true,
    type: "color",
    value: "var(--color-warning-hover)"
  },
  {
    category: "colors",
    cssVariable: "var(--color-warning-on-warning)",
    id: "color-warning-on-warning",
    keyPath: [
      "colors",
      "warning",
      "on-warning"
    ],
    tailwindClass: "*-warning-on-warning",
    themeable: true,
    type: "color",
    value: "var(--color-warning-on-warning)"
  },
  {
    category: "semantic",
    cssVariable: "var(--border-radius-large)",
    id: "border-radius-large",
    keyPath: [
      "semantic",
      "border-radius",
      "large"
    ],
    tailwindClass: "rounded-large",
    themeable: false,
    type: "float",
    value: "var(--border-radius-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--border-radius-medium)",
    id: "border-radius-medium",
    keyPath: [
      "semantic",
      "border-radius",
      "medium"
    ],
    tailwindClass: "rounded-medium",
    themeable: false,
    type: "float",
    value: "var(--border-radius-medium)"
  },
  {
    category: "semantic",
    cssVariable: "var(--border-radius-small)",
    id: "border-radius-small",
    keyPath: [
      "semantic",
      "border-radius",
      "small"
    ],
    tailwindClass: "rounded-small",
    themeable: false,
    type: "float",
    value: "var(--border-radius-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--border-radius-x-large)",
    id: "border-radius-x-large",
    keyPath: [
      "semantic",
      "border-radius",
      "x-large"
    ],
    tailwindClass: "rounded-x-large",
    themeable: false,
    type: "float",
    value: "var(--border-radius-x-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--border-width-default)",
    id: "border-width-default",
    keyPath: [
      "semantic",
      "border-width",
      "default"
    ],
    tailwindClass: "border",
    themeable: false,
    type: "float",
    value: "var(--border-width-default)"
  },
  {
    category: "semantic",
    cssVariable: "var(--border-width-large)",
    id: "border-width-large",
    keyPath: [
      "semantic",
      "border-width",
      "large"
    ],
    tailwindClass: "border-large",
    themeable: false,
    type: "float",
    value: "var(--border-width-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--shadow-big)",
    id: "shadow-big",
    keyPath: [
      "semantic",
      "shadow",
      "big"
    ],
    tailwindClass: "shadow-big",
    themeable: true,
    type: "shadow",
    value: "var(--shadow-big)"
  },
  {
    category: "semantic",
    cssVariable: "var(--shadow-default)",
    id: "shadow-default",
    keyPath: [
      "semantic",
      "shadow",
      "default"
    ],
    tailwindClass: "shadow",
    themeable: true,
    type: "shadow",
    value: "var(--shadow-default)"
  },
  {
    category: "semantic",
    cssVariable: "var(--shadow-mid)",
    id: "shadow-mid",
    keyPath: [
      "semantic",
      "shadow",
      "mid"
    ],
    tailwindClass: "shadow-mid",
    themeable: true,
    type: "shadow",
    value: "var(--shadow-mid)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-large)",
    id: "spacing-large",
    keyPath: [
      "semantic",
      "spacing",
      "large"
    ],
    tailwindClass: "*-large",
    themeable: false,
    type: "float",
    value: "var(--spacing-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-medium)",
    id: "spacing-medium",
    keyPath: [
      "semantic",
      "spacing",
      "medium"
    ],
    tailwindClass: "*-medium",
    themeable: false,
    type: "float",
    value: "var(--spacing-medium)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-small)",
    id: "spacing-small",
    keyPath: [
      "semantic",
      "spacing",
      "small"
    ],
    tailwindClass: "*-small",
    themeable: false,
    type: "float",
    value: "var(--spacing-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-x-large)",
    id: "spacing-x-large",
    keyPath: [
      "semantic",
      "spacing",
      "x-large"
    ],
    tailwindClass: "*-x-large",
    themeable: false,
    type: "float",
    value: "var(--spacing-x-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-x-small)",
    id: "spacing-x-small",
    keyPath: [
      "semantic",
      "spacing",
      "x-small"
    ],
    tailwindClass: "*-x-small",
    themeable: false,
    type: "float",
    value: "var(--spacing-x-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-xx-large)",
    id: "spacing-xx-large",
    keyPath: [
      "semantic",
      "spacing",
      "xx-large"
    ],
    tailwindClass: "*-xx-large",
    themeable: false,
    type: "float",
    value: "var(--spacing-xx-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--spacing-xx-small)",
    id: "spacing-xx-small",
    keyPath: [
      "semantic",
      "spacing",
      "xx-small"
    ],
    tailwindClass: "*-xx-small",
    themeable: false,
    type: "float",
    value: "var(--spacing-xx-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-family-monospace)",
    id: "typography-font-family-monospace",
    keyPath: [
      "semantic",
      "typography",
      "font-family",
      "monospace"
    ],
    tailwindClass: "font-monospace",
    themeable: false,
    type: "string",
    value: "var(--typography-font-family-monospace)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-family-primary)",
    id: "typography-font-family-primary",
    keyPath: [
      "semantic",
      "typography",
      "font-family",
      "primary"
    ],
    tailwindClass: "font-primary",
    themeable: false,
    type: "string",
    value: "var(--typography-font-family-primary)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-large)",
    id: "typography-font-size-large",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "large"
    ],
    tailwindClass: "text-large",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-medium)",
    id: "typography-font-size-medium",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "medium"
    ],
    tailwindClass: "text-medium",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-medium)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-small)",
    id: "typography-font-size-small",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "small"
    ],
    tailwindClass: "text-small",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-x-large)",
    id: "typography-font-size-x-large",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "x-large"
    ],
    tailwindClass: "text-x-large",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-x-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-x-small)",
    id: "typography-font-size-x-small",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "x-small"
    ],
    tailwindClass: "text-x-small",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-x-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-xx-large)",
    id: "typography-font-size-xx-large",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "xx-large"
    ],
    tailwindClass: "text-xx-large",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-xx-large)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-size-xx-small)",
    id: "typography-font-size-xx-small",
    keyPath: [
      "semantic",
      "typography",
      "font-size",
      "xx-small"
    ],
    tailwindClass: "text-xx-small",
    themeable: false,
    type: "float",
    value: "var(--typography-font-size-xx-small)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-weight-bold)",
    id: "typography-font-weight-bold",
    keyPath: [
      "semantic",
      "typography",
      "font-weight",
      "bold"
    ],
    tailwindClass: "font-bold",
    themeable: false,
    type: "float",
    value: "var(--typography-font-weight-bold)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-weight-medium)",
    id: "typography-font-weight-medium",
    keyPath: [
      "semantic",
      "typography",
      "font-weight",
      "medium"
    ],
    tailwindClass: "font-medium",
    themeable: false,
    type: "float",
    value: "var(--typography-font-weight-medium)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-font-weight-regular)",
    id: "typography-font-weight-regular",
    keyPath: [
      "semantic",
      "typography",
      "font-weight",
      "regular"
    ],
    tailwindClass: "font-regular",
    themeable: false,
    type: "float",
    value: "var(--typography-font-weight-regular)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-letter-spacing-default)",
    id: "typography-letter-spacing-default",
    keyPath: [
      "semantic",
      "typography",
      "letter-spacing",
      "default"
    ],
    tailwindClass: "tracking",
    themeable: false,
    type: "float",
    value: "var(--typography-letter-spacing-default)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-letter-spacing-wide)",
    id: "typography-letter-spacing-wide",
    keyPath: [
      "semantic",
      "typography",
      "letter-spacing",
      "wide"
    ],
    tailwindClass: "tracking-wide",
    themeable: false,
    type: "float",
    value: "var(--typography-letter-spacing-wide)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-line-height-extra-loose)",
    id: "typography-line-height-extra-loose",
    keyPath: [
      "semantic",
      "typography",
      "line-height",
      "extra-loose"
    ],
    tailwindClass: "leading-extra-loose",
    themeable: false,
    type: "float",
    value: "var(--typography-line-height-extra-loose)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-line-height-loose)",
    id: "typography-line-height-loose",
    keyPath: [
      "semantic",
      "typography",
      "line-height",
      "loose"
    ],
    tailwindClass: "leading-loose",
    themeable: false,
    type: "float",
    value: "var(--typography-line-height-loose)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-line-height-medium)",
    id: "typography-line-height-medium",
    keyPath: [
      "semantic",
      "typography",
      "line-height",
      "medium"
    ],
    tailwindClass: "leading-medium",
    themeable: false,
    type: "float",
    value: "var(--typography-line-height-medium)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-line-height-tight)",
    id: "typography-line-height-tight",
    keyPath: [
      "semantic",
      "typography",
      "line-height",
      "tight"
    ],
    tailwindClass: "leading-tight",
    themeable: false,
    type: "float",
    value: "var(--typography-line-height-tight)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-line-height-wide)",
    id: "typography-line-height-wide",
    keyPath: [
      "semantic",
      "typography",
      "line-height",
      "wide"
    ],
    tailwindClass: "leading-wide",
    themeable: false,
    type: "float",
    value: "var(--typography-line-height-wide)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-text-transform-default)",
    id: "typography-text-transform-default",
    keyPath: [
      "semantic",
      "typography",
      "text-transform",
      "default"
    ],
    tailwindClass: "typography-text-transform-default",
    themeable: false,
    type: "string",
    value: "var(--typography-text-transform-default)"
  },
  {
    category: "semantic",
    cssVariable: "var(--typography-text-transform-uppercase)",
    id: "typography-text-transform-uppercase",
    keyPath: [
      "semantic",
      "typography",
      "text-transform",
      "uppercase"
    ],
    tailwindClass: "typography-text-transform-uppercase",
    themeable: false,
    type: "string",
    value: "var(--typography-text-transform-uppercase)"
  }
];
const utilities = [
  {
    id: "utilities-text-body-large-default",
    keyPath: [
      "utilities",
      "text",
      "body",
      "large",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-large-default-font-family)",
        id: "text-body-large-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-large-default-font-size)",
        id: "text-body-large-default-font-size",
        type: "float",
        value: "ref_typography/font-size/large"
      },
      {
        cssVariable: "var(--text-body-large-default-font-weight)",
        id: "text-body-large-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/regular"
      },
      {
        cssVariable: "var(--text-body-large-default-letter-casing)",
        id: "text-body-large-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-large-default-letter-spacing)",
        id: "text-body-large-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-large-default-line-height)",
        id: "text-body-large-default-line-height",
        type: "float",
        value: "ref_typography/line-height/wide"
      }
    ],
    tailwindClass: "body-large",
    themeable: false
  },
  {
    id: "utilities-text-body-large-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "large",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-large-strong-font-family)",
        id: "text-body-large-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-large-strong-font-size)",
        id: "text-body-large-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/large"
      },
      {
        cssVariable: "var(--text-body-large-strong-font-weight)",
        id: "text-body-large-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-body-large-strong-letter-casing)",
        id: "text-body-large-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-large-strong-letter-spacing)",
        id: "text-body-large-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-large-strong-line-height)",
        id: "text-body-large-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/wide"
      }
    ],
    tailwindClass: "body-large-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-large-x-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "large",
      "x-strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-large-x-strong-font-family)",
        id: "text-body-large-x-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-large-x-strong-font-size)",
        id: "text-body-large-x-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/large"
      },
      {
        cssVariable: "var(--text-body-large-x-strong-font-weight)",
        id: "text-body-large-x-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-body-large-x-strong-letter-casing)",
        id: "text-body-large-x-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-large-x-strong-letter-spacing)",
        id: "text-body-large-x-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-large-x-strong-line-height)",
        id: "text-body-large-x-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/wide"
      }
    ],
    tailwindClass: "body-large-x-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-medium-default",
    keyPath: [
      "utilities",
      "text",
      "body",
      "medium",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-medium-default-font-family)",
        id: "text-body-medium-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-medium-default-font-size)",
        id: "text-body-medium-default-font-size",
        type: "float",
        value: "ref_typography/font-size/medium"
      },
      {
        cssVariable: "var(--text-body-medium-default-font-weight)",
        id: "text-body-medium-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/regular"
      },
      {
        cssVariable: "var(--text-body-medium-default-letter-casing)",
        id: "text-body-medium-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-medium-default-letter-spacing)",
        id: "text-body-medium-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-medium-default-line-height)",
        id: "text-body-medium-default-line-height",
        type: "float",
        value: "ref_typography/line-height/medium"
      }
    ],
    tailwindClass: "body-medium",
    themeable: false
  },
  {
    id: "utilities-text-body-medium-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "medium",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-medium-strong-font-family)",
        id: "text-body-medium-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-medium-strong-font-size)",
        id: "text-body-medium-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/medium"
      },
      {
        cssVariable: "var(--text-body-medium-strong-font-weight)",
        id: "text-body-medium-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-body-medium-strong-letter-casing)",
        id: "text-body-medium-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-medium-strong-letter-spacing)",
        id: "text-body-medium-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-medium-strong-line-height)",
        id: "text-body-medium-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/medium"
      }
    ],
    tailwindClass: "body-medium-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-medium-x-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "medium",
      "x-strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-medium-x-strong-font-family)",
        id: "text-body-medium-x-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-medium-x-strong-font-size)",
        id: "text-body-medium-x-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/medium"
      },
      {
        cssVariable: "var(--text-body-medium-x-strong-font-weight)",
        id: "text-body-medium-x-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-body-medium-x-strong-letter-casing)",
        id: "text-body-medium-x-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-medium-x-strong-letter-spacing)",
        id: "text-body-medium-x-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-medium-x-strong-line-height)",
        id: "text-body-medium-x-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/medium"
      }
    ],
    tailwindClass: "body-medium-x-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-small-default",
    keyPath: [
      "utilities",
      "text",
      "body",
      "small",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-small-default-font-family)",
        id: "text-body-small-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-small-default-font-size)",
        id: "text-body-small-default-font-size",
        type: "float",
        value: "ref_typography/font-size/small"
      },
      {
        cssVariable: "var(--text-body-small-default-font-weight)",
        id: "text-body-small-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/regular"
      },
      {
        cssVariable: "var(--text-body-small-default-letter-casing)",
        id: "text-body-small-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-small-default-letter-spacing)",
        id: "text-body-small-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-small-default-line-height)",
        id: "text-body-small-default-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "body-small",
    themeable: false
  },
  {
    id: "utilities-text-body-small-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "small",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-small-strong-font-family)",
        id: "text-body-small-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-small-strong-font-size)",
        id: "text-body-small-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/small"
      },
      {
        cssVariable: "var(--text-body-small-strong-font-weight)",
        id: "text-body-small-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-body-small-strong-letter-casing)",
        id: "text-body-small-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-small-strong-letter-spacing)",
        id: "text-body-small-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-small-strong-line-height)",
        id: "text-body-small-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "body-small-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-small-x-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "small",
      "x-strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-small-x-strong-font-family)",
        id: "text-body-small-x-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-small-x-strong-font-size)",
        id: "text-body-small-x-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/small"
      },
      {
        cssVariable: "var(--text-body-small-x-strong-font-weight)",
        id: "text-body-small-x-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-body-small-x-strong-letter-casing)",
        id: "text-body-small-x-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-small-x-strong-letter-spacing)",
        id: "text-body-small-x-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-small-x-strong-line-height)",
        id: "text-body-small-x-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "body-small-x-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-x-small-default",
    keyPath: [
      "utilities",
      "text",
      "body",
      "x-small",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-x-small-default-font-family)",
        id: "text-body-x-small-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-x-small-default-font-size)",
        id: "text-body-x-small-default-font-size",
        type: "float",
        value: "ref_typography/font-size/x-small"
      },
      {
        cssVariable: "var(--text-body-x-small-default-font-weight)",
        id: "text-body-x-small-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/regular"
      },
      {
        cssVariable: "var(--text-body-x-small-default-letter-casing)",
        id: "text-body-x-small-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-x-small-default-letter-spacing)",
        id: "text-body-x-small-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-x-small-default-line-height)",
        id: "text-body-x-small-default-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "body-x-small",
    themeable: false
  },
  {
    id: "utilities-text-body-x-small-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "x-small",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-x-small-strong-font-family)",
        id: "text-body-x-small-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-x-small-strong-font-size)",
        id: "text-body-x-small-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/x-small"
      },
      {
        cssVariable: "var(--text-body-x-small-strong-font-weight)",
        id: "text-body-x-small-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-body-x-small-strong-letter-casing)",
        id: "text-body-x-small-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-x-small-strong-letter-spacing)",
        id: "text-body-x-small-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-x-small-strong-line-height)",
        id: "text-body-x-small-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "body-x-small-strong",
    themeable: false
  },
  {
    id: "utilities-text-body-x-small-x-strong",
    keyPath: [
      "utilities",
      "text",
      "body",
      "x-small",
      "x-strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-body-x-small-x-strong-font-family)",
        id: "text-body-x-small-x-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-body-x-small-x-strong-font-size)",
        id: "text-body-x-small-x-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/x-small"
      },
      {
        cssVariable: "var(--text-body-x-small-x-strong-font-weight)",
        id: "text-body-x-small-x-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-body-x-small-x-strong-letter-casing)",
        id: "text-body-x-small-x-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-body-x-small-x-strong-letter-spacing)",
        id: "text-body-x-small-x-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-body-x-small-x-strong-line-height)",
        id: "text-body-x-small-x-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "body-x-small-x-strong",
    themeable: false
  },
  {
    id: "utilities-text-heading-category-default",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "category",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-category-default-font-family)",
        id: "text-heading-category-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-category-default-font-size)",
        id: "text-heading-category-default-font-size",
        type: "float",
        value: "ref_typography/font-size/xx-small"
      },
      {
        cssVariable: "var(--text-heading-category-default-font-weight)",
        id: "text-heading-category-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-heading-category-default-letter-casing)",
        id: "text-heading-category-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/uppercase"
      },
      {
        cssVariable: "var(--text-heading-category-default-letter-spacing)",
        id: "text-heading-category-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/wide"
      },
      {
        cssVariable: "var(--text-heading-category-default-line-height)",
        id: "text-heading-category-default-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "heading-category",
    themeable: false
  },
  {
    id: "utilities-text-heading-category-strong",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "category",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-category-strong-font-family)",
        id: "text-heading-category-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-category-strong-font-size)",
        id: "text-heading-category-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/xx-small"
      },
      {
        cssVariable: "var(--text-heading-category-strong-font-weight)",
        id: "text-heading-category-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-heading-category-strong-letter-casing)",
        id: "text-heading-category-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/uppercase"
      },
      {
        cssVariable: "var(--text-heading-category-strong-letter-spacing)",
        id: "text-heading-category-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/wide"
      },
      {
        cssVariable: "var(--text-heading-category-strong-line-height)",
        id: "text-heading-category-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "heading-category-strong",
    themeable: false
  },
  {
    id: "utilities-text-heading-large-default",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "large",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-large-default-font-family)",
        id: "text-heading-large-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-large-default-font-size)",
        id: "text-heading-large-default-font-size",
        type: "float",
        value: "ref_typography/font-size/large"
      },
      {
        cssVariable: "var(--text-heading-large-default-font-weight)",
        id: "text-heading-large-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-heading-large-default-letter-casing)",
        id: "text-heading-large-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-large-default-letter-spacing)",
        id: "text-heading-large-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-large-default-line-height)",
        id: "text-heading-large-default-line-height",
        type: "float",
        value: "ref_typography/line-height/wide"
      }
    ],
    tailwindClass: "heading-large",
    themeable: false
  },
  {
    id: "utilities-text-heading-large-strong",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "large",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-large-strong-font-family)",
        id: "text-heading-large-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-large-strong-font-size)",
        id: "text-heading-large-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/large"
      },
      {
        cssVariable: "var(--text-heading-large-strong-font-weight)",
        id: "text-heading-large-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-heading-large-strong-letter-casing)",
        id: "text-heading-large-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-large-strong-letter-spacing)",
        id: "text-heading-large-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-large-strong-line-height)",
        id: "text-heading-large-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/wide"
      }
    ],
    tailwindClass: "heading-large-strong",
    themeable: false
  },
  {
    id: "utilities-text-heading-medium-default",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "medium",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-medium-default-font-family)",
        id: "text-heading-medium-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-medium-default-font-size)",
        id: "text-heading-medium-default-font-size",
        type: "float",
        value: "ref_typography/font-size/medium"
      },
      {
        cssVariable: "var(--text-heading-medium-default-font-weight)",
        id: "text-heading-medium-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-heading-medium-default-letter-casing)",
        id: "text-heading-medium-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-medium-default-letter-spacing)",
        id: "text-heading-medium-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-medium-default-line-height)",
        id: "text-heading-medium-default-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "heading-medium",
    themeable: false
  },
  {
    id: "utilities-text-heading-medium-strong",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "medium",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-medium-strong-font-family)",
        id: "text-heading-medium-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-medium-strong-font-size)",
        id: "text-heading-medium-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/medium"
      },
      {
        cssVariable: "var(--text-heading-medium-strong-font-weight)",
        id: "text-heading-medium-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-heading-medium-strong-letter-casing)",
        id: "text-heading-medium-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-medium-strong-letter-spacing)",
        id: "text-heading-medium-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-medium-strong-line-height)",
        id: "text-heading-medium-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/tight"
      }
    ],
    tailwindClass: "heading-medium-strong",
    themeable: false
  },
  {
    id: "utilities-text-heading-x-large-default",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "x-large",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-x-large-default-font-family)",
        id: "text-heading-x-large-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-x-large-default-font-size)",
        id: "text-heading-x-large-default-font-size",
        type: "float",
        value: "ref_typography/font-size/x-large"
      },
      {
        cssVariable: "var(--text-heading-x-large-default-font-weight)",
        id: "text-heading-x-large-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-heading-x-large-default-letter-casing)",
        id: "text-heading-x-large-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-x-large-default-letter-spacing)",
        id: "text-heading-x-large-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-x-large-default-line-height)",
        id: "text-heading-x-large-default-line-height",
        type: "float",
        value: "ref_typography/line-height/loose"
      }
    ],
    tailwindClass: "heading-x-large",
    themeable: false
  },
  {
    id: "utilities-text-heading-x-large-strong",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "x-large",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-x-large-strong-font-family)",
        id: "text-heading-x-large-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-x-large-strong-font-size)",
        id: "text-heading-x-large-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/x-large"
      },
      {
        cssVariable: "var(--text-heading-x-large-strong-font-weight)",
        id: "text-heading-x-large-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-heading-x-large-strong-letter-casing)",
        id: "text-heading-x-large-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-x-large-strong-letter-spacing)",
        id: "text-heading-x-large-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-x-large-strong-line-height)",
        id: "text-heading-x-large-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/loose"
      }
    ],
    tailwindClass: "heading-x-large-strong",
    themeable: false
  },
  {
    id: "utilities-text-heading-xx-large-default",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "xx-large",
      "default"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-xx-large-default-font-family)",
        id: "text-heading-xx-large-default-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-xx-large-default-font-size)",
        id: "text-heading-xx-large-default-font-size",
        type: "float",
        value: "ref_typography/font-size/xx-large"
      },
      {
        cssVariable: "var(--text-heading-xx-large-default-font-weight)",
        id: "text-heading-xx-large-default-font-weight",
        type: "float",
        value: "ref_typography/font-weight/medium"
      },
      {
        cssVariable: "var(--text-heading-xx-large-default-letter-casing)",
        id: "text-heading-xx-large-default-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-xx-large-default-letter-spacing)",
        id: "text-heading-xx-large-default-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-xx-large-default-line-height)",
        id: "text-heading-xx-large-default-line-height",
        type: "float",
        value: "ref_typography/line-height/extra loose"
      }
    ],
    tailwindClass: "heading-xx-large",
    themeable: false
  },
  {
    id: "utilities-text-heading-xx-large-strong",
    keyPath: [
      "utilities",
      "text",
      "heading",
      "xx-large",
      "strong"
    ],
    properties: [
      {
        cssVariable: "var(--text-heading-xx-large-strong-font-family)",
        id: "text-heading-xx-large-strong-font-family",
        type: "string",
        value: "ref_typography/font-family/primary"
      },
      {
        cssVariable: "var(--text-heading-xx-large-strong-font-size)",
        id: "text-heading-xx-large-strong-font-size",
        type: "float",
        value: "ref_typography/font-size/xx-large"
      },
      {
        cssVariable: "var(--text-heading-xx-large-strong-font-weight)",
        id: "text-heading-xx-large-strong-font-weight",
        type: "float",
        value: "ref_typography/font-weight/bold"
      },
      {
        cssVariable: "var(--text-heading-xx-large-strong-letter-casing)",
        id: "text-heading-xx-large-strong-letter-casing",
        type: "string",
        value: "ref_typography/text-transform/default"
      },
      {
        cssVariable: "var(--text-heading-xx-large-strong-letter-spacing)",
        id: "text-heading-xx-large-strong-letter-spacing",
        type: "float",
        value: "ref_typography/letter-spacing/default"
      },
      {
        cssVariable: "var(--text-heading-xx-large-strong-line-height)",
        id: "text-heading-xx-large-strong-line-height",
        type: "float",
        value: "ref_typography/line-height/extra loose"
      }
    ],
    tailwindClass: "heading-xx-large-strong",
    themeable: false
  }
];
const tokensManifest = {
  tokens,
  utilities
};
const componentDetailModules = /* @__PURE__ */ Object.assign({
  "../../components/manifests/Accordion.manifest.json": __vite_glob_0_0,
  "../../components/manifests/Badge.manifest.json": __vite_glob_0_1,
  "../../components/manifests/Box.manifest.json": __vite_glob_0_2,
  "../../components/manifests/Button.manifest.json": __vite_glob_0_3,
  "../../components/manifests/Checkbox.manifest.json": __vite_glob_0_4,
  "../../components/manifests/ColorPicker.manifest.json": __vite_glob_0_5,
  "../../components/manifests/DatePicker.manifest.json": __vite_glob_0_6,
  "../../components/manifests/Dialog.manifest.json": __vite_glob_0_7,
  "../../components/manifests/Divider.manifest.json": __vite_glob_0_8,
  "../../components/manifests/Dropdown.manifest.json": __vite_glob_0_9,
  "../../components/manifests/EditableText.manifest.json": __vite_glob_0_10,
  "../../components/manifests/Flex.manifest.json": __vite_glob_0_11,
  "../../components/manifests/Flyout.manifest.json": __vite_glob_0_12,
  "../../components/manifests/Grid.manifest.json": __vite_glob_0_13,
  "../../components/manifests/Heading.manifest.json": __vite_glob_0_14,
  "../../components/manifests/Label.manifest.json": __vite_glob_0_15,
  "../../components/manifests/Link.manifest.json": __vite_glob_0_16,
  "../../components/manifests/LoadingBar.manifest.json": __vite_glob_0_17,
  "../../components/manifests/LoadingCircle.manifest.json": __vite_glob_0_18,
  "../../components/manifests/Notice.manifest.json": __vite_glob_0_19,
  "../../components/manifests/OrderableList.manifest.json": __vite_glob_0_20,
  "../../components/manifests/RadioList.manifest.json": __vite_glob_0_21,
  "../../components/manifests/RouterProvider.manifest.json": __vite_glob_0_22,
  "../../components/manifests/ScrollArea.manifest.json": __vite_glob_0_23,
  "../../components/manifests/Section.manifest.json": __vite_glob_0_24,
  "../../components/manifests/SegmentedControl.manifest.json": __vite_glob_0_25,
  "../../components/manifests/Select.manifest.json": __vite_glob_0_26,
  "../../components/manifests/Slider.manifest.json": __vite_glob_0_27,
  "../../components/manifests/SplitButton.manifest.json": __vite_glob_0_28,
  "../../components/manifests/Switch.manifest.json": __vite_glob_0_29,
  "../../components/manifests/Table.manifest.json": __vite_glob_0_30,
  "../../components/manifests/Tabs.manifest.json": __vite_glob_0_31,
  "../../components/manifests/Tag.manifest.json": __vite_glob_0_32,
  "../../components/manifests/Text.manifest.json": __vite_glob_0_33,
  "../../components/manifests/TextInput.manifest.json": __vite_glob_0_34,
  "../../components/manifests/Textarea.manifest.json": __vite_glob_0_35,
  "../../components/manifests/ThemeProvider.manifest.json": __vite_glob_0_36,
  "../../components/manifests/Tooltip.manifest.json": __vite_glob_0_37
});
let componentSummaryList;
let componentSummaryMap;
let componentDetailMap;
let tokenList;
let tokenMap;
let tokenCategoryMap;
let utilityList;
let iconList;
let iconNameMap;
let iconExportNameMap;
function getComponentSummaries() {
  if (!componentSummaryList) {
    const index = componentIndex;
    componentSummaryList = Object.values(index.components).map(
      ({
        name: name2,
        description: description2,
        status: status2,
        category: category2,
        tags: tags2,
        subComponentNames
      }) => ({
        name: name2,
        description: description2,
        status: status2,
        category: category2,
        tags: tags2,
        subComponentNames
      })
    );
  }
  return componentSummaryList;
}
function getComponentSummaryMap() {
  if (!componentSummaryMap) {
    componentSummaryMap = /* @__PURE__ */ new Map();
    for (const summary of getComponentSummaries()) {
      componentSummaryMap.set(summary.name.toLowerCase(), summary);
    }
  }
  return componentSummaryMap;
}
function getComponentDetailMap() {
  if (!componentDetailMap) {
    componentDetailMap = /* @__PURE__ */ new Map();
    for (const mod of Object.values(componentDetailModules)) {
      const detail = mod;
      componentDetailMap.set(detail.name.toLowerCase(), detail);
    }
  }
  return componentDetailMap;
}
function getTokensManifest() {
  return tokensManifest;
}
function getTokenList() {
  if (!tokenList) {
    tokenList = getTokensManifest().tokens;
  }
  return tokenList;
}
function getTokenMap() {
  if (!tokenMap) {
    tokenMap = /* @__PURE__ */ new Map();
    for (const token of getTokenList()) {
      tokenMap.set(token.id, token);
    }
  }
  return tokenMap;
}
function getTokenCategoryMap() {
  if (!tokenCategoryMap) {
    tokenCategoryMap = /* @__PURE__ */ new Map();
    for (const token of getTokenList()) {
      const existing = tokenCategoryMap.get(token.category);
      if (existing) {
        existing.push(token);
      } else {
        tokenCategoryMap.set(token.category, [token]);
      }
    }
  }
  return tokenCategoryMap;
}
function getUtilityList() {
  if (!utilityList) {
    utilityList = getTokensManifest().utilities;
  }
  return utilityList;
}
function getIconsManifest() {
  return iconsManifest;
}
function getIconList() {
  if (!iconList) {
    iconList = getIconsManifest().icons;
  }
  return iconList;
}
function getIconNameMap() {
  if (!iconNameMap) {
    iconNameMap = /* @__PURE__ */ new Map();
    for (const icon of getIconList()) {
      iconNameMap.set(icon.name.toLowerCase(), icon);
    }
  }
  return iconNameMap;
}
function getIconExportNameMap() {
  if (!iconExportNameMap) {
    iconExportNameMap = /* @__PURE__ */ new Map();
    for (const icon of getIconList()) {
      iconExportNameMap.set(icon.exportName.toLowerCase(), icon);
    }
  }
  return iconExportNameMap;
}
function matchesQuery(query, ...fields) {
  if (query === "") {
    return true;
  }
  const lowerQuery = query.toLowerCase();
  for (const field of fields) {
    if (field === void 0) {
      continue;
    }
    if (typeof field === "string") {
      if (field.toLowerCase().includes(lowerQuery)) {
        return true;
      }
    } else {
      for (const item of field) {
        if (item.toLowerCase().includes(lowerQuery)) {
          return true;
        }
      }
    }
  }
  return false;
}
function applyLimit(items, limit) {
  if (limit === void 0 || limit <= 0) {
    return items;
  }
  return items.slice(0, limit);
}
function listComponents() {
  return getComponentSummaries();
}
function getComponent(name2) {
  return getComponentDetailMap().get(name2.toLowerCase());
}
function searchComponents(options) {
  const results = getComponentSummaries().filter(
    (c) => matchesQuery(options.query, c.name, c.description, c.tags, c.category)
  );
  return applyLimit(results, options.limit);
}
function getComponentsByCategory(options) {
  const lowerCategory = options.category.toLowerCase();
  const results = getComponentSummaries().filter(
    (c) => c.category.toLowerCase() === lowerCategory
  );
  return applyLimit(results, options.limit);
}
function getComponentSummary(name2) {
  return getComponentSummaryMap().get(name2.toLowerCase());
}
function listTokenCategories() {
  return [...getTokenCategoryMap().keys()];
}
function getToken(id) {
  return getTokenMap().get(id);
}
function getTokensByCategory(options) {
  const tokens2 = getTokenCategoryMap().get(options.category) ?? [];
  return applyLimit(tokens2, options.limit);
}
function searchTokens(options) {
  const results = getTokenList().filter(
    (t) => matchesQuery(
      options.query,
      t.id,
      t.cssVariable,
      t.tailwindClass,
      t.category
    )
  );
  return applyLimit(results, options.limit);
}
function searchUtilities(options) {
  const results = getUtilityList().filter(
    (u) => matchesQuery(options.query, u.id, u.tailwindClass)
  );
  return applyLimit(results, options.limit);
}
function listUtilities() {
  return getUtilityList();
}
function listIcons(options) {
  return applyLimit(getIconList(), options == null ? void 0 : options.limit);
}
function getIcon(name2) {
  return getIconNameMap().get(name2.toLowerCase());
}
function getIconByExportName(exportName) {
  return getIconExportNameMap().get(exportName.toLowerCase());
}
function searchIcons(options) {
  const results = getIconList().filter(
    (i) => matchesQuery(
      options.query,
      i.name,
      i.componentName,
      i.exportName,
      i.keywords
    )
  );
  return applyLimit(results, options.limit);
}
export {
  getComponent,
  getComponentSummary,
  getComponentsByCategory,
  getIcon,
  getIconByExportName,
  getToken,
  getTokensByCategory,
  listComponents,
  listIcons,
  listTokenCategories,
  listUtilities,
  searchComponents,
  searchIcons,
  searchTokens,
  searchUtilities
};
//# sourceMappingURL=fondue-api.js.map
