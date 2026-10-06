# Using the SDK

`@frontify/fondue/sdk` describes Fondue as data: every component (with props, examples and usage instructions), icon, token and guide. It reads the Fondue version installed in your project, so it always matches what you actually depend on.

There are two ways to use it: let a coding agent query it through the Fondue skill, or query it yourself in code.

## With a coding agent

The Fondue agent skill teaches coding agents (Claude Code, Cursor, Codex, …) to look up components, props and tokens in the SDK instead of guessing them. Install it with the [skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add frontify/fondue/packages/sdk
```

The project needs `@frontify/fondue` installed, since the skill queries it. Then ask your agent for Fondue work as usual, e.g. "set up Fondue in this project" or "add a confirmation dialog with Fondue components".

The skill's own instructions are a snapshot from install time. As Fondue evolves they can fall behind, so re-run the install command after upgrading Fondue. The SDK reference the skill reads (`sdk/Reference`) always comes from your installed version.

## In code

### Install

```sh
pnpm add @frontify/fondue
```

No peer dependencies. No build step. The package bundles the Fondue data
internally.

### Hello, Fondue

```ts
import { components, tokens } from '@frontify/fondue/sdk';

console.log(`${components.size} components, ${tokens.size} tokens`);
// → 442 components, 128 tokens
```

That count of 442 is 40 library components + 402 icons. Icons live in the
**components** graph under `category: 'icon'`. The
"Icons as components" section of the `sdk/Concepts` guide explains why.

### Look up a single entity

```ts
const button = components.get('Button');

button?.name; // 'Button'
button?.description; // 'A clickable action element for…'
button?.importStatement; // "import { Button } from '@frontify/fondue/components';"
button?.props.length; // 15
```

`get` returns `undefined` for unknown ids — it never throws. The `?.`
operator is a comfortable fit.

### Filter

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

### Walk the graph

Fields read like properties; relationships are methods that return more
nodes or queryable groups:

```ts
const button = components.get('Button');

button?.related(); // → [SplitButton, Link]
button?.category().list(); // → all components in the 'input' category
```

The `sdk/Concepts` guide explains which results you can query further and
which are plain arrays.

### Tokens

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

### Guides

The SDK also exposes the **same prose guides the Storybook docs site renders**
— setup, styling, upgrade notes and these SDK docs — as raw markdown:

```ts
import { guides } from '@frontify/fondue/sdk';

guides.list().map((g) => g.id); // → ['development/Contributing', …, 'usage/Styling']
guides.get('getting-started/Setup')?.content; // raw markdown, starting with '# Setup'
```

## Where to go next

- `sdk/Concepts` — what's a node, what's a facet, what's a plain array.
  Read this once and the rest of the API clicks.
- `sdk/Reference` — every method and type.
- `sdk/Examples` — copy-paste snippets for real tasks.

Each is a guide too: `guides.get('sdk/Concepts')?.content`.
