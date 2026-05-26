# API reference

The formal contract for `@frontify/fondue/sdk`. Every export, type, and
method, with edge cases.

## Module exports

```ts
import { components, guides, tokens } from '@frontify/fondue/sdk';
```

| Symbol       | Kind  | Description                                          |
| ------------ | ----- | ---------------------------------------------------- |
| `components` | value | The components query API.                            |
| `tokens`     | value | The tokens query API.                                |
| `guides`     | value | Prose guides bundled with the SDK (markdown bodies). |

All other identifiers exposed from the package are TypeScript **types**
(see [Types](#types)). The package has no default export.

## Conventions

- Identifiers are case-sensitive. Component names use `PascalCase`
  (`'Button'`); icons are reachable by their React name
  (`'IconAdobeCreativeCloud'`); token and utility ids use the kebab-style
  ids emitted by the Fondue tokens build
  (`'color-charts-primary-default'`).
- All collection returns are `readonly`. Treat them as immutable — the
  runtime won't enforce it beyond TypeScript.
- Members without parentheses (`size`, scalar fields on nodes) are
  **properties**. Members with parentheses are **methods**.
- The API is synchronous and side-effect-free.

## Common query surface

`components`, `tokens`, `tokens.utilities`, `guides`, and every facet node
implement the same five members:

| Member          | Returns                              | Throws |
| --------------- | ------------------------------------ | ------ |
| `list()`        | All nodes, in stable insertion order | no     |
| `get(id)`       | One node, or `undefined`             | no     |
| `has(id)`       | Boolean                              | no     |
| `where(filter)` | Matching nodes (filters AND-combine) | no     |
| `size`          | Total node count, O(1)               | no     |

For facets, the query is **scoped to the facet's members** — for example
`components.category('input').get('Dialog')` returns `undefined` because
Dialog isn't in the `'input'` category, even though it exists in the
wider domain.

## `components`

```ts
interface ComponentsApi {
    list(): readonly ComponentNode[];
    get(name: string): ComponentNode | undefined;
    has(name: string): boolean;
    where(filter: ComponentFilter): readonly ComponentNode[];
    readonly size: number;

    categories(): readonly ComponentFacetNode[];
    category(name: string): ComponentFacetNode | undefined;
    tags(): readonly ComponentFacetNode[];
    tag(name: string): ComponentFacetNode | undefined;
    statuses(): readonly ComponentFacetNode[];
    status(name: string): ComponentFacetNode | undefined;
}
```

| Method           | Returns                             | Notes                                    |
| ---------------- | ----------------------------------- | ---------------------------------------- |
| `categories()`   | All category facets, sorted by name | Includes the synthetic `'icon'` category |
| `category(name)` | Single facet, or `undefined`        |                                          |
| `tags()`         | All tag facets, sorted by name      |                                          |
| `tag(name)`      | Single tag facet, or `undefined`    |                                          |
| `statuses()`     | All status facets, sorted by name   | Empty-string status (icons) is omitted   |
| `status(name)`   | Single status facet, or `undefined` |                                          |

### Icons in the components graph

Icons are folded into the components domain at build time. Each icon
becomes a `ComponentNode` with:

| Field             | Value                                                                |
| ----------------- | -------------------------------------------------------------------- |
| `name`            | The React component name (`'IconAdobeCreativeCloud'`)                |
| `category()`      | The synthetic `'icon'` facet                                         |
| `status()`        | **Throws** — icons carry an empty status, don't call this            |
| `tags()`          | The icon's tags                                                      |
| `importStatement` | `"import { IconAdobeCreativeCloud } from '@frontify/fondue/icons';"` |
| `examples`        | Icon stories                                                         |
| `props`           | `[]`                                                                 |
| `subComponents`   | `[]`                                                                 |
| `related()`       | `[]`                                                                 |
| `instructions`    | `''`                                                                 |
| `typeDefinitions` | `{}`                                                                 |

Detect an icon with `node.category().name === 'icon'`.

## `tokens`

```ts
interface TokensApi {
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;

    categories(): readonly TokenFacetNode[];
    category(name: string): TokenFacetNode | undefined;
    types(): readonly TokenFacetNode[];
    type(name: TokenValueType): TokenFacetNode | undefined;

    utilities: TokenUtilitiesApi;
}
```

### `tokens.utilities`

```ts
interface TokenUtilitiesApi {
    list(): readonly TokenUtilityNode[];
    get(id: string): TokenUtilityNode | undefined;
    has(id: string): boolean;
    where(filter: TokenUtilityFilter): readonly TokenUtilityNode[];
    readonly size: number;

    classes(): readonly string[];
}
```

`classes()` returns the distinct `tailwindClass` values across all
utilities, sorted.

## `guides`

The prose guides bundled with the SDK — installation, contribution,
upgrade notes — surfaced as queryable markdown. Same source the Storybook
docs site renders; this is how an MCP server or agent reads them.

```ts
interface GuidesApi {
    list(): readonly Guide[];
    get(id: string): Guide | undefined;
    has(id: string): boolean;
    where(filter: GuideFilter): readonly Guide[];
    readonly size: number;
}
```

`Guide` is a **leaf** — no graph methods, just three string fields.

```ts
interface Guide {
    /** Slug derived from the source filename, e.g. "getting-started". */
    readonly id: string;
    /** Title extracted from the first `# Title` line of the markdown. */
    readonly title: string;
    /** Raw markdown body, including the leading `# Title`. */
    readonly content: string;
}
```

Use cases:

- Feed `content` into an LLM as system-prompt context.
- Pipe through a markdown renderer (`marked`, `markdown-it`, `<Markdown>`
  from `@storybook/addon-docs/blocks`).
- Grep across the corpus with `where({ text: 'tailwind' })`.

## Filters

Filters are plain objects. **All clauses AND-combine.** Array-valued
clauses are **OR within the clause**. Omitted clauses are ignored.
Empty filter (`{}`) is equivalent to `list()`.

### `ComponentFilter`

```ts
interface ComponentFilter {
    category?: string | readonly string[];
    status?: string | readonly string[];
    tag?: string | readonly string[];
    text?: string;
}
```

| Clause     | Matches against                                                                   |
| ---------- | --------------------------------------------------------------------------------- |
| `category` | The component's `category`                                                        |
| `status`   | The component's `status` (e.g. `'released'`)                                      |
| `tag`      | Whether any of the supplied tags is in the component's `tags`                     |
| `text`     | Case-insensitive substring in `name`, `description`, `category`, or any of `tags` |

### `TokenFilter`

```ts
interface TokenFilter {
    category?: string | readonly string[];
    type?: TokenValueType | readonly TokenValueType[];
    themeable?: boolean;
    keyPathStartsWith?: string;
    text?: string;
}
```

| Clause              | Matches against                                                                  |
| ------------------- | -------------------------------------------------------------------------------- |
| `category`          | The token's `category`                                                           |
| `type`              | The token's `type` (`'color' \| 'float' \| 'shadow' \| 'string'`)                |
| `themeable`         | Exact boolean match                                                              |
| `keyPathStartsWith` | Dot-joined keyPath starts with this prefix (e.g. `'colors.charts'`)              |
| `text`              | Case-insensitive substring in `id`, `tailwindClass`, or the dot-joined `keyPath` |

### `TokenUtilityFilter`

```ts
interface TokenUtilityFilter {
    themeable?: boolean;
    keyPathStartsWith?: string;
    text?: string;
}
```

Same semantics as `TokenFilter` for the clauses present.

### `GuideFilter`

```ts
interface GuideFilter {
    text?: string;
}
```

`text` is a case-insensitive substring match against the guide's `id`,
`title`, and `content`.

## Nodes

### `ComponentNode`

```ts
interface ComponentNode {
    readonly name: string;
    readonly description: string;
    readonly importStatement: string;
    readonly instructions: string;
    readonly props: readonly ComponentProp[];
    readonly subComponents: readonly ComponentSubComponent[];
    readonly examples: readonly ComponentExample[];
    readonly typeDefinitions: Readonly<Record<string, string>>;

    category(): ComponentFacetNode;
    status(): ComponentFacetNode;
    tags(): readonly ComponentFacetNode[];
    related(): readonly ComponentNode[];

    toJSON(): ComponentDetails;
}
```

**Edge semantics**:

| Method       | Behaviour on unresolvable reference                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `category()` | Throws `Error('Unknown category "<x>" on "<name>"')`. Should never happen against released data.                  |
| `status()`   | Throws if status is empty (icons) or unknown. Check `category().name !== 'icon'` first if you're iterating icons. |
| `tags()`     | Silently filters out unknown tag references                                                                       |
| `related()`  | Silently filters out names that don't resolve to a known component                                                |

### `TokenNode`

```ts
interface TokenNode {
    readonly id: string;
    readonly value: string;
    readonly cssVariable: string;
    readonly tailwindClass: string;
    readonly themeable: boolean;
    readonly keyPath: readonly string[];

    category(): TokenFacetNode;
    type(): TokenFacetNode;

    toJSON(): Token;
}
```

`category()` and `type()` throw the same way `ComponentNode.category()`
does — programmer errors against an inconsistent data bundle.

### `TokenUtilityNode`

A leaf node — no graph edges.

```ts
interface TokenUtilityNode {
    readonly id: string;
    readonly tailwindClass: string;
    readonly themeable: boolean;
    readonly keyPath: readonly string[];
    readonly properties: readonly TokenUtilityProperty[];

    toJSON(): TokenUtility;
}
```

### Facet nodes

A facet groups entities by a shared attribute. Both component and token
facets carry the standard query surface, scoped to their members.

```ts
interface ComponentFacetNode {
    readonly name: string;
    list(): readonly ComponentNode[];
    get(name: string): ComponentNode | undefined;
    has(name: string): boolean;
    where(filter: ComponentFilter): readonly ComponentNode[];
    readonly size: number;
}

interface TokenFacetNode {
    readonly name: string;
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;
}
```

`ComponentFacetNode` is returned by every component facet method —
categories, tags, and statuses share the same shape. `TokenFacetNode`
serves both `tokens.categories()` and `tokens.types()`.

## Types

### Scalar / embedded data

```ts
interface ComponentProp {
    name: string;
    type: string; // The TypeScript source-type string
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
}

interface ComponentSubComponent {
    name: string; // e.g. 'Dialog.Header'
    props: readonly ComponentProp[];
}

interface ComponentExample {
    name: string;
    description: string;
    code: string;
    isCanonical: boolean;
}

interface TokenUtilityProperty {
    id: string;
    type: TokenValueType;
    value: string;
    cssVariable: string;
}

type TokenValueType = 'color' | 'float' | 'shadow' | 'string';
```

### Raw payloads (toJSON return shapes)

These describe what `toJSON()` returns. Most consumers don't need to name
them — `JSON.stringify(node)` and `node.toJSON()` both work without type
imports.

```ts
interface ComponentDetails {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: readonly string[];
    subComponentNames: readonly string[];
    relatedComponents: readonly string[];
    importStatement: string;
    instructions: string;
    props: readonly ComponentProp[];
    subComponents: readonly ComponentSubComponent[];
    examples: readonly ComponentExample[];
    typeDefinitions: Readonly<Record<string, string>>;
}

interface Token {
    id: string;
    category: string;
    type: TokenValueType;
    keyPath: readonly string[];
    value: string;
    cssVariable: string;
    tailwindClass: string;
    themeable: boolean;
}

interface TokenUtility {
    id: string;
    keyPath: readonly string[];
    properties: readonly TokenUtilityProperty[];
    tailwindClass: string;
    themeable: boolean;
}
```

### Public type exports

```ts
import type {
    // Nodes
    ComponentNode,
    ComponentFacetNode,
    TokenNode,
    TokenFacetNode,
    TokenUtilityNode,
    Guide,
    // Filters
    ComponentFilter,
    TokenFilter,
    TokenUtilityFilter,
    GuideFilter,
    // Embedded scalars
    ComponentProp,
    ComponentExample,
    ComponentSubComponent,
    TokenUtilityProperty,
    TokenValueType,
} from '@frontify/fondue/sdk';
```

`ComponentDetails`, `Token`, and `TokenUtility` (toJSON return shapes) are
not re-exported. If you need to type them explicitly, use
`ReturnType<ComponentNode['toJSON']>` etc.

## Errors

Runtime errors are not part of the normal flow. They indicate a programmer
error (e.g. a typo) or — rarely — corrupt bundled data:

| Source                                   | When                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ComponentNode.category()` / `.status()` | The referenced facet isn't in the data. Only `.status()` can hit this in practice (it throws on icons because their status is empty). |
| `TokenNode.category()` / `.type()`       | The referenced facet isn't in the data. Should never happen against released data.                                                    |

All other methods return `undefined` for missing lookups — they never throw.

## Complexity

| Operation                                            | Complexity                                      |
| ---------------------------------------------------- | ----------------------------------------------- |
| Module load                                          | O(C + T + U) over components, tokens, utilities |
| `domain.list()`                                      | O(1) — returns the cached array                 |
| `domain.get(id)`                                     | O(1) — map lookup                               |
| `domain.has(id)`                                     | O(1)                                            |
| `domain.where(filter)`                               | O(N) over the domain                            |
| `facet.list()`                                       | O(M) over the facet's member count              |
| `facet.get(id)`                                      | O(1)                                            |
| `facet.where(filter)`                                | O(M)                                            |
| `categories()` / `tags()` / `statuses()` / `types()` | O(F log F) — sorts on each call. Cache if hot.  |

## Stability

The package version is the contract version.

- **Patch / minor** may add optional fields, new methods, new entries to
  the bundled data, and tighten unspecified behaviour.
- **Major** is required to rename or remove any exported symbol, field,
  method, or filter clause, or to change the runtime contract (sync ↔
  async, error semantics, etc.).
- The bundled data refreshes with every release. **Don't rely on specific
  component / icon / token names existing** unless you pin the package
  version.

## Runtime

- Node 18+, ESM only.
- No peer dependencies, no runtime file I/O.
- Bundle size: ~800 KB unminified / ~70 KB gzipped, dominated by the
  bundled JSON.
