# @frontify/fondue-docs

A Node API for Frontify Fondue docs data — exposed as a **navigable graph** of
components and tokens. Data is baked into the package at build time, so the
runtime API is synchronous, has zero file I/O, and ships with no peer
dependencies.

Designed for MCP servers, CLI generators, documentation pipelines, and AI
agents that need to traverse the Fondue design system.

Also exposed via the umbrella package as `@frontify/fondue/docs`.

## Install

```sh
pnpm add @frontify/fondue-docs
```

Each release pins a specific snapshot of the Fondue data — upgrade the
package to pick up newer components, icons, or tokens.

## Mental model

Every entity (component, token, utility) is a **node**. Nodes carry their
data as scalar fields, and walk the graph via methods:

```ts
import { components } from '@frontify/fondue-docs';

const button = components.get('Button');

button.category(); // → ComponentCategoryNode for "input"
button.category().list(); // → all components in the "input" category
button.related(); // → [SplitButton, Link] as ComponentNodes
button.tags(); // → [tag('button'), tag('action'), tag('cta')]
button.tags()[0].list(); // → all components tagged "button"
```

**Icons live in the same graph** under `category: 'icon'`, with the React
component name as their node id:

```ts
components.where({ category: 'icon' }); // all 381 icons as ComponentNodes
components.get('IconAdobeCreativeCloud'); // ComponentNode { category: 'icon', … }
components.category('icon').size; // 381
```

## Top-level exports

| Export       | What it is                                                    |
| ------------ | ------------------------------------------------------------- |
| `components` | Component query API (includes icons under `category: 'icon'`) |
| `tokens`     | Token query API, plus `tokens.utilities` sub-domain           |

## Common query shape

Every domain implements the same surface:

| Member         | Returns                                   |
| -------------- | ----------------------------------------- |
| `list()`       | All nodes, in stable order                |
| `get(id)`      | A node, or undefined                      |
| `has(id)`      | Boolean                                   |
| `find(filter)` | Matching nodes (filters AND-combine)      |
| `size`         | Total node count                          |
| `meta()`       | `{ packageName, generatedAt }` provenance |

Plus facet helpers (`categories()`, `tags()`, `statuses()`, `types()`,
`classes()`).

## Components

```ts
components.list(); // ComponentNode[]
components.get('Button'); // ComponentNode
components.find({
    category: 'input', // or ['input', 'overlay', 'icon']
    status: 'released',
    tag: 'cta',
    text: 'dropdown menu', // fuzzy match
});

components.categories(); // CategoryNode[] (includes 'icon')
components.category('input').list(); // ComponentNode[]
components.tag('button').size;
components.statuses(); // StatusNode[]
```

### Reading data off a `ComponentNode`

Scalar fields (no parentheses):

```ts
const button = components.get('Button');

button.name; // 'Button'
button.description; // 'A clickable action element for…'
button.importStatement; // "import { Button } from '@frontify/fondue/components';"
button.instructions; // LLM-friendly usage instructions
button.typeDefinitions; // { [typeName]: typeSourceString }
```

#### Props

```ts
button.props; // ComponentProp[]

button.props.map((p) => p.name);
// ['type', 'title', 'variant', 'emphasis', 'size', 'rounding', …]

const variant = button.props.find((p) => p.name === 'variant');
variant.type; // '"default" | "positive" | "negative" | "danger" | "loud"'
variant.required; // false
variant.defaultValue; // 'default'
variant.deprecated; // false

const deprecatedProps = button.props.filter((p) => p.deprecated);
const requiredProps = button.props.filter((p) => p.required);
```

#### Sub-components

```ts
const dialog = components.get('Dialog');

dialog.subComponents;
// [
//   { name: 'Dialog.Root', props: [...] },
//   { name: 'Dialog.Header', props: [...] },
//   …
// ]

dialog.subComponents.map((sc) => sc.name);
// ['Dialog.Root', 'Dialog.Close', 'Dialog.Title', 'Dialog.Description', …]

const header = dialog.subComponents.find((sc) => sc.name === 'Dialog.Header');
header.props.map((p) => p.name);
```

#### Examples

```ts
button.examples;
// [{ name, description, code, isCanonical }, …]

const canonical = button.examples.find((e) => e.isCanonical);
canonical.code; // the recommended snippet

button.examples.map((e) => e.name);
// ['Icon and Text Label', 'TextLabelOnly', 'Icon Only', …]
```

#### Raw payload

```ts
button.toJSON(); // the full ComponentDetails object
JSON.stringify(button); // works — uses toJSON()
```

### Graph methods

| Method       | Returns                                       |
| ------------ | --------------------------------------------- |
| `category()` | `ComponentCategoryNode`                       |
| `status()`   | `ComponentStatusNode`                         |
| `tags()`     | `readonly ComponentTagNode[]`                 |
| `related()`  | `readonly ComponentNode[]` (cross-references) |
| `toJSON()`   | The underlying `ComponentDetails` raw payload |

Facet nodes (`CategoryNode` / `StatusNode` / `TagNode`) carry the same query
surface as the top-level domain, scoped to their members:

```ts
const input = components.category('input');

input.list(); // ComponentNode[] within "input"
input.find({ tag: 'cta' }); // narrow further by another filter
input.get('Button'); // → Button
input.get('Dialog'); // → undefined (Dialog isn't an input)
input.has('Checkbox'); // → true
input.size; // 13
```

## Tokens

```ts
tokens.list(); // TokenNode[]
tokens.get('color-charts-primary-default');
tokens.find({
    category: 'colors',
    type: 'color',
    themeable: true,
    keyPathStartsWith: 'colors.charts',
});

tokens.categories(); // CategoryNode[]
tokens.types(); // [type('color'), type('float'), …]
tokens.category('colors').list(); // TokenNode[]
```

### Reading data off a `TokenNode`

```ts
const color = tokens.get('color-charts-primary-default');

color.id; // 'color-charts-primary-default'
color.value; // 'var(--color-charts-primary-default)'
color.cssVariable; // 'var(--color-charts-primary-default)'
color.tailwindClass; // '*-charts-primary'
color.themeable; // true
color.keyPath; // ['colors', 'charts', 'primary', 'default']
```

Graph methods: `category()`, `type()`, `toJSON()`.

### Token utilities

```ts
tokens.utilities.list(); // TokenUtilityNode[]
tokens.utilities.find({ keyPathStartsWith: 'utilities.text' });
tokens.utilities.classes(); // distinct tailwind class names

const text = tokens.utilities.find({ keyPathStartsWith: 'utilities.text.body' })[0];
text.tailwindClass; // 'body-large'
text.properties;
// [
//   { id: 'text-body-large-default-font-family', cssVariable, type: 'string', value },
//   …
// ]
```

## Chaining examples

The whole point of the graph shape is composition. Some real chains against
the bundled data:

```ts
// All "input" components, in canonical form
components
    .get('Button')
    .category()
    .list()
    .map((c) => c.name);
// ['Button', 'Checkbox', 'ColorPicker', 'DatePicker', 'EditableText', …]

// All sibling components of any of Button's related components
const siblingNames = new Set();
for (const rel of components.get('Button').related()) {
    for (const sib of rel.category().list()) {
        siblingNames.add(sib.name);
    }
}

// All canonical examples across every "overlay" component
components
    .category('overlay')
    .list()
    .flatMap((c) => c.examples.filter((e) => e.isCanonical))
    .map((e) => e.code);

// Props shared by every component in the "input" category
const propNamesByComponent = components
    .category('input')
    .list()
    .map((c) => new Set(c.props.map((p) => p.name)));
const sharedProps = [...propNamesByComponent[0]].filter((name) => propNamesByComponent.every((set) => set.has(name)));

// All themeable color tokens that belong to the "charts" branch
tokens
    .find({ category: 'colors', themeable: true })
    .filter((t) => t.keyPath[1] === 'charts')
    .map((t) => t.cssVariable);

// All tokens whose type is the same as some reference token's
tokens
    .get('color-charts-primary-default')
    .type()
    .list()
    .slice(0, 5)
    .map((t) => t.id);

// Every component tagged "action", grouped by status
const byStatus = {};
for (const c of components.tag('action').list()) {
    (byStatus[c.status().name] ??= []).push(c.name);
}

// Icons reachable from the components graph, narrowed to a tag
components
    .find({ category: 'icon' })
    .filter((c) => c.tags().some((t) => t.name === 'adobe'))
    .map((c) => c.name);
// ['IconAdobeCreativeCloud', 'IconAdobeInDesign']
```

## Types

All public types are exported from the package root:

```ts
import type {
    // Top-level APIs
    ComponentsApi,
    TokensApi,
    TokenUtilitiesApi,
    // Nodes
    ComponentNode,
    ComponentCategoryNode,
    ComponentTagNode,
    ComponentStatusNode,
    TokenNode,
    TokenCategoryNode,
    TokenTypeNode,
    TokenUtilityNode,
    // Filters
    ComponentFilter,
    TokenFilter,
    TokenUtilityFilter,
    // Raw payloads (toJSON return types)
    ComponentDetails,
    ComponentProp,
    ComponentSubComponent,
    ComponentExample,
    Token,
    TokenUtility,
    TokenUtilityProperty,
    TokenValueType,
    // Misc
    DomainSource,
} from '@frontify/fondue-docs';
```

## Runtime

- Pure Node API; no React, no DOM, no peer dependencies.
- Node 18+, ESM only.
- Synchronous — all data is bundled at build time.
