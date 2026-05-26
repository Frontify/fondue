# @frontify/fondue-sdk

A Node API for inspecting Frontify Fondue — components, icons, tokens, and
prose guides — exposed as a **navigable graph**. Data is baked in at build
time, so the runtime is synchronous, has zero file I/O, and ships with no
peer dependencies.

Designed for MCP servers, CLI generators, documentation pipelines, AI
agents, and anything else that needs machine-readable knowledge of the
Fondue design system.

> The package ships as part of the `@frontify/fondue` umbrella.
> Import from **`@frontify/fondue/sdk`** in all consumer code.

## Install

```sh
pnpm add @frontify/fondue
# npm install @frontify/fondue
# yarn add @frontify/fondue
```

No peer dependencies, no extra installs. Each release pins a specific
snapshot of the Fondue data; upgrade the package to pick up newer
components, icons, or tokens.

## 30-second tour

```ts
import { components, guides, tokens } from '@frontify/fondue/sdk';

// Look up by id
const button = components.get('Button');

// Read scalar data
button?.props.length; // 14
button?.examples.find((e) => e.isCanonical)?.code; // "<Button …>…"

// Walk the graph
button?.category().name; // 'input'
button?.related().map((c) => c.name); // ['SplitButton', 'Link']

// Query
components.where({ category: 'input', status: 'released' });
components.tag('cta')?.list();
tokens.where({ category: 'colors', themeable: true });

// Icons live in the components graph under category: 'icon'
components.where({ category: 'icon' }); // all icons as ComponentNodes
components.get('IconAdobeCreativeCloud'); // { category: 'icon', … }

// Prose guides — the same content the Storybook docs site renders
guides.list().map((g) => g.title); // ['Getting started', 'How to contribute', 'Upgrading to Fondue v13']
guides.get('getting-started')?.content; // raw markdown body
```

## What's in the bundle

| Domain          | Notes                                                                       |
| --------------- | --------------------------------------------------------------------------- |
| Components      | All Fondue library components, with props, sub-components, examples         |
| Icons           | Surfaced inside the components graph under `category: 'icon'`               |
| Tokens          | Design tokens with their key path, css variable, tailwind class             |
| Token utilities | Composed utilities (typography classes etc.) under `tokens.utilities`       |
| Guides          | Prose guides as raw markdown — the same source the Storybook docs site uses |

Live counts and a browsable catalog are rendered server-side from this
package in the Fondue Storybook under
[**Technical → Fondue SDK**](https://fondue-components.frontify.com/?path=/docs/technical-fondue-sdk--docs).

## Top-level shape

| Export       | What it is                                                    |
| ------------ | ------------------------------------------------------------- |
| `components` | Component query API (includes icons under `category: 'icon'`) |
| `tokens`     | Token query API, with a `tokens.utilities` sub-domain         |
| `guides`     | Prose guides bundled with the SDK (markdown content)          |

Every domain and all their **facet nodes** (categories, tags, statuses,
types) implement the same query surface:

| Member          | Returns                              |
| --------------- | ------------------------------------ |
| `list()`        | All nodes, in stable order           |
| `get(id)`       | A node, or `undefined`               |
| `has(id)`       | Boolean                              |
| `where(filter)` | Matching nodes (filters AND-combine) |
| `size`          | Total node count                     |

See [Mental model](./docs/mental-model.md) for the full picture and
[API reference](./docs/api-reference.md) for the formal contract.

## Documentation

- **[Getting started](./docs/getting-started.md)** — install, first queries,
  the "you-can-skim-this-once" basics.
- **[Mental model](./docs/mental-model.md)** — how the graph fits together:
  nodes, facets, plain arrays; where you can use `.where`/`.get`/`.has`
  and where you can't.
- **[API reference](./docs/api-reference.md)** — every export, type, method,
  and edge case.
- **[Recipes](./docs/recipes.md)** — copy-pasteable solutions for common
  tasks (search, group by tag, walk relationships, serialize, …).

## Runtime

- Pure Node API; no React, no DOM, no peer dependencies.
- Node 18+, ESM only.
- Synchronous — all data is bundled at build time.
- ~70 KB gzipped.

## Versioning

The umbrella package version is the contract version. Patch / minor releases
add fields, new methods, and refreshed bundled data. Major releases are
required for any rename or removal in the public surface.
