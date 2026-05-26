# Getting started

## Install

```sh
pnpm add @frontify/fondue
```

No peer dependencies. No build step. The package bundles the Fondue data
internally.

## Hello, Fondue

```ts
import { components, tokens } from '@frontify/fondue/sdk';

console.log(`${components.size} components, ${tokens.size} tokens`);
// → 419 components, 113 tokens
```

That count of 419 is 38 library components + 381 icons. Icons live in the
**components** graph under `category: 'icon'`. See
[Mental model](./mental-model.md#icons-as-components) for why.

## Look up a single entity

```ts
const button = components.get('Button');

button?.name; // 'Button'
button?.description; // 'A clickable action element for…'
button?.importStatement; // "import { Button } from '@frontify/fondue/components';"
button?.props.length; // 14
```

`get` returns `undefined` for unknown ids — it never throws. The `?.`
operator is a comfortable fit.

## Filter

```ts
components.where({ category: 'input' });
components.where({ category: 'input', tag: 'cta' });
components.where({ text: 'dropdown' }); // fuzzy match
```

All clauses are **AND-combined**. Array-valued clauses are **OR within the
clause**:

```ts
components.where({ category: ['input', 'overlay'] }); // input OR overlay
```

See [API reference → Filters](./api-reference.md#filters) for the full list
of clauses per domain.

## Walk the graph

Each node exposes its relationships as methods:

```ts
const button = components.get('Button');

button?.category(); // → ComponentFacetNode { name: 'input', size: 13 }
button?.category().list(); // → all components in the 'input' category
button?.related(); // → [SplitButton, Link]
button?.tags(); // → [tag('button'), tag('action'), tag('cta')]
button?.tags()[0]?.list(); // → all components tagged 'button'
```

Facets are themselves queryable:

```ts
const input = components.category('input');

input?.size; // 13
input?.list(); // ComponentNode[] in 'input'
input?.where({ tag: 'cta' }); // narrow further by another filter
input?.get('Checkbox'); // ComponentNode (Checkbox is in 'input')
input?.get('Dialog'); // undefined (Dialog is 'overlay')
```

## Tokens

Identical shape:

```ts
const primary = tokens.get('color-charts-primary-default');

primary?.value; // 'var(--color-charts-primary-default)'
primary?.tailwindClass; // '*-charts-primary'
primary?.themeable; // true
primary?.category().name; // 'colors'
primary?.type().name; // 'color'

tokens.where({ category: 'colors', themeable: true });
tokens.utilities.where({ keyPathStartsWith: 'utilities.text' });
```

## Where to go next

- [Mental model](./mental-model.md) — what's a node, what's a facet, what's
  a plain array. Read this once and the rest of the API clicks.
- [API reference](./api-reference.md) — every method and type.
- [Recipes](./recipes.md) — copy-paste snippets for real tasks.
- [Integrations](./integrations.md) — MCP servers, CLI tools, LLM context.
