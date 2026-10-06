# SDK quickstart

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
// → 442 components, 128 tokens
```

That count of 442 is 40 library components + 402 icons. Icons live in the
**components** graph under `category: 'icon'`. The
"Icons as components" section of the `sdk/Concepts` guide explains why.

## Look up a single entity

```ts
const button = components.get('Button');

button?.name; // 'Button'
button?.description; // 'A clickable action element for…'
button?.importStatement; // "import { Button } from '@frontify/fondue/components';"
button?.props.length; // 15
```

`get` returns `undefined` for unknown ids — it never throws. The `?.`
operator is a comfortable fit.

## Filter

```ts
components.where({ category: 'input' });
components.where({ category: 'input', tag: 'cta' });
components.where({ text: 'dropdown' }); // case-insensitive substring match
```

All clauses are **AND-combined**. Array-valued clauses are **OR within the
clause**:

```ts
components.where({ category: ['input', 'overlay'] }); // input OR overlay
```

The "Filters" section of the `sdk/Reference` guide lists every clause
per domain.

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

## Guides

The SDK also exposes the **same prose guides the Storybook docs site renders**
— setup, styling, upgrade notes and these SDK docs — as raw markdown. Agents can
ingest them with the same `list/get/has/where/size` interface.

```ts
import { guides } from '@frontify/fondue/sdk';

guides.list().map((g) => g.title);
// → ['How to contribute', 'Upgrading to Fondue v13', 'Setup', 'SDK concepts', 'SDK quickstart', …]

const setup = guides.get('getting-started/Setup');
setup?.title; // 'Setup'
setup?.content; // raw markdown body, starting with '# Setup'

guides.where({ text: 'tailwind' }).map((g) => g.id);
// → ['development/Upgrading', 'getting-started/Setup', …, 'usage/Styling']
```

Use `Guide.content` to feed an LLM, render with your own markdown renderer,
or grep across the corpus.

## Where to go next

- `sdk/Concepts` — what's a node, what's a facet, what's a plain array.
  Read this once and the rest of the API clicks.
- `sdk/Reference` — every method and type.
- `sdk/Recipes` — copy-paste snippets for real tasks.

Each is a guide too: `guides.get('sdk/Concepts')?.content`.
