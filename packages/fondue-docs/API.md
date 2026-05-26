# @frontify/fondue-docs — API specification

This document is the **formal contract** for the package. The README is a
quick tour; this file defines every export, every method signature, return
values, edge cases, and stability rules.

## Conventions

- All types and functions live under the package entry `@frontify/fondue-docs`.
- Method names without parentheses (`size`, scalar fields on nodes) are
  **properties**; method names with parentheses are **methods**.
- All collection returns are **readonly** (`readonly T[]`). Mutating returned
  arrays is undefined behaviour.
- The runtime is **synchronous** and **side-effect-free**. All data is bundled
  at build time.
- Identifiers are case-sensitive. Component names use `PascalCase`
  (`'Button'`); icons in the components graph use the React component name
  (`'IconAdobeCreativeCloud'`); token ids and utility ids use the kebab-style
  ids emitted by the Fondue tokens build (`'color-charts-primary-default'`).

## Module exports

```ts
import { components, tokens } from '@frontify/fondue-docs';
```

| Symbol       | Kind  | Description                      |
| ------------ | ----- | -------------------------------- |
| `components` | value | The component graph entry point. |
| `tokens`     | value | The token graph entry point.     |

The package has **no default export** and no other named runtime exports.

### Type exports

All types listed in [Types](#types) are exported from the package entry as
TypeScript types. They are not available at runtime.

## Stability

- The package version is the contract version.
- **Patch / minor** releases may:
    - Add new optional fields on filters, data payloads, or node types.
    - Add new methods on any API or node.
    - Add new entries to the bundled data.
- **Major** releases are required for:
    - Renaming or removing any exported symbol, field, method, or filter clause.
    - Changing the type of an existing field.
    - Changing the runtime contract (sync ↔ async, error semantics, etc.).
- The bundled data may change in every release (it's a snapshot of upstream).
  Consumers must not rely on specific component / icon / token names existing
  unless they pin the package version.

## Domain APIs

Every domain (`components`, `tokens`, `tokens.utilities`) implements this
common surface:

```ts
interface DomainQuery<TNode, TFilter> {
    list(): readonly TNode[];
    get(id: string): TNode | undefined;
    has(id: string): boolean;
    where(filter: TFilter): readonly TNode[];
    readonly size: number;
}
```

| Member         | Throws | Notes                                                 |
| -------------- | ------ | ----------------------------------------------------- |
| `list()`       | no     | Stable insertion order (load order from upstream).    |
| `get(id)`      | no     | Returns `undefined` for unknown ids — does not throw. |
| `has(id)`      | no     | Pure boolean.                                         |
| `where(filter)`| no     | Empty filter (`{}`) returns `list()` unchanged.       |
| `size`         | no     | Equivalent to `list().length`. O(1).                  |

Plus `meta(): DomainSource` on the top-level domains, and domain-specific
facet helpers.

### Filter semantics

- All filter clauses are **AND-combined**.
- Array-valued clauses (`category: ['input', 'icon']`) are **OR within the
  clause**.
- `text` is a **case-insensitive substring** match against a fixed set of
  searchable fields per domain. The set is listed below per domain.
- Undefined / omitted clauses are ignored.

## `components`

```ts
interface ComponentsApi {
    list(): readonly ComponentNode[];
    get(name: string): ComponentNode | undefined;
    has(name: string): boolean;
    where(filter: ComponentFilter): readonly ComponentNode[];
    readonly size: number;
    meta(): DomainSource;

    categories(): readonly ComponentCategoryNode[];
    category(name: string): ComponentCategoryNode | undefined;
    tags(): readonly ComponentTagNode[];
    tag(name: string): ComponentTagNode | undefined;
    statuses(): readonly ComponentStatusNode[];
    status(name: string): ComponentStatusNode | undefined;
}
```

| Method           | Returns                             | Notes                                |
| ---------------- | ----------------------------------- | ------------------------------------ |
| `categories()`   | All category facets, sorted by name | Includes synthetic `'icon'` category |
| `category(name)` | Single facet, or `undefined`        |                                      |
| `tags()`         | All tag facets, sorted              |                                      |
| `tag(name)`      | Single tag facet, or `undefined`    |                                      |
| `statuses()`     | All status facets, sorted           | Empty-string status is omitted       |
| `status(name)`   | Single status facet, or `undefined` |                                      |

### Icons in the components graph

Icons are synthesized into the components graph at construction time. Each
icon becomes a `ComponentNode` with:

| Field             | Value                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `name`            | The React component name, e.g. `'IconAdobeCreativeCloud'`        |
| `description`     | Forwarded from the icon                                          |
| `category()`      | The synthetic `'icon'` facet                                     |
| `status()`        | **Throws** — icons have empty status; do not call this for icons |
| `tags()`          | The icon's tags as `ComponentTagNode`s                           |
| `importStatement` | Forwarded from the icon                                          |
| `examples`        | Forwarded from the icon                                          |
| `props`           | Empty array (icons have no documented React props)               |
| `subComponents`   | Empty                                                            |
| `instructions`    | Empty string                                                     |
| `typeDefinitions` | Empty object                                                     |
| `related()`       | Empty array                                                      |

To detect an icon node, use `node.category().name === 'icon'`.

### `ComponentFilter`

```ts
interface ComponentFilter {
    category?: string | readonly string[];
    status?: string | readonly string[];
    tag?: string | readonly string[];
    text?: string;
}
```

The `text` clause searches: `name`, `description`, `category`, and `tags`.

## `tokens`

```ts
interface TokensApi {
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;
    meta(): DomainSource;

    categories(): readonly TokenCategoryNode[];
    category(name: string): TokenCategoryNode | undefined;
    types(): readonly TokenTypeNode[];
    type(name: TokenValueType): TokenTypeNode | undefined;

    utilities: TokenUtilitiesApi;
}
```

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

- `keyPathStartsWith` matches the **dot-joined** key path (e.g.
  `'colors.charts.primary'`).
- `text` searches: `id`, `tailwindClass`, and the dot-joined `keyPath`.

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

interface TokenUtilityFilter {
    themeable?: boolean;
    keyPathStartsWith?: string;
    text?: string;
}
```

`utilities` does **not** expose its own `meta()`. Use `tokens.meta()` —
utilities share provenance with the tokens domain.

## Nodes

Nodes are the graph's entities. Each node carries its data as scalar fields
(properties) and walks the graph through methods. All nodes implement
`toJSON()` returning their underlying raw payload — `JSON.stringify(node)`
works out of the box.

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

    category(): ComponentCategoryNode;
    status(): ComponentStatusNode;
    tags(): readonly ComponentTagNode[];
    related(): readonly ComponentNode[];

    toJSON(): ComponentDetails;
}
```

**Edge semantics**:

| Method       | Behaviour on unknown reference                                     |
| ------------ | ------------------------------------------------------------------ |
| `category()` | Throws `Error('Unknown category "<x>" on component "<name>"')`     |
| `status()`   | Throws if `status` is empty (icons) or unknown                     |
| `tags()`     | Silently filters out unknown tag references                        |
| `related()`  | Silently filters out names that don't resolve to a known component |

The throw cases are programmer errors — they indicate corrupted bundled data
and should never happen against a release build of this package.

### `TokenNode`

```ts
interface TokenNode {
    readonly id: string;
    readonly value: string;
    readonly cssVariable: string;
    readonly tailwindClass: string;
    readonly themeable: boolean;
    readonly keyPath: readonly string[];

    category(): TokenCategoryNode;
    type(): TokenTypeNode;

    toJSON(): Token;
}
```

### `TokenUtilityNode`

Leaf node — utilities have no facet edges.

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

Facets group entities by a shared attribute (category / status / tag for
components, category / type for tokens). Each facet exposes the same query
surface as the top-level domain, **scoped to its members**:

```ts
interface ComponentFacetNode {
    readonly name: string;
    list(): readonly ComponentNode[];
    get(name: string): ComponentNode | undefined;
    has(name: string): boolean;
    where(filter: ComponentFilter): readonly ComponentNode[];
    readonly size: number;
}

interface TokenCategoryNode {
    readonly name: string;
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;
}

interface TokenTypeNode {
    readonly name: TokenValueType;
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;
}
```

`ComponentCategoryNode`, `ComponentStatusNode`, and `ComponentTagNode` are
all type aliases for `ComponentFacetNode`.

Facet `get(id)` returns `undefined` for ids that are not members of the
facet, even if the id exists in the wider domain. Facet `where(filter)`
applies the filter to facet members only — the filter's own clauses
AND-combine with the facet restriction.

```ts
const input = components.category('input');
input.get('Button'); // → Button (it's in 'input')
input.get('Dialog'); // → undefined ('overlay', not in 'input')
input.where({ tag: 'cta' }); // → input components also tagged 'cta'
input.has('Checkbox'); // → true
```

## Types

### Raw payloads (`toJSON()` return types)

```ts
interface ComponentProp {
    name: string;
    type: string; // The TypeScript-source type string
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
}

interface ComponentSubComponent {
    name: string;
    props: readonly ComponentProp[];
}

interface ComponentExample {
    name: string;
    description: string;
    code: string;
    isCanonical: boolean;
}

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

type TokenValueType = 'color' | 'float' | 'shadow' | 'string';

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

interface TokenUtilityProperty {
    id: string;
    type: TokenValueType;
    value: string;
    cssVariable: string;
}

interface TokenUtility {
    id: string;
    keyPath: readonly string[];
    properties: readonly TokenUtilityProperty[];
    tailwindClass: string;
    themeable: boolean;
}
```

### Provenance

```ts
interface DomainSource {
    /** The Fondue package this data describes, e.g. "@frontify/fondue/components". */
    packageName: string;
    /** ISO 8601 timestamp when the underlying data was generated. */
    generatedAt: string;
}
```

## Errors

The runtime API does not throw under normal use. The only exceptions are:

- `ComponentNode.category()` / `.status()` / `TokenNode.category()` / `.type()`
  throw a generic `Error` when their reference cannot be resolved in the
  bundled data. This indicates a bug in the package build, not invalid input.
- `ComponentNode.status()` will throw if called on an icon (icons carry an
  empty status). Check `node.category().name !== 'icon'` first.

## Performance

- Construction is **O(C + T + U)** where C, T, U are the counts of
  components (incl. icons), tokens, and utilities. Performed once at module
  load.
- `list()` is O(1) (returns the cached array reference).
- `get(id)` / `has(id)` are O(1).
- `where(filter)` is O(N) over the domain.
- `categories()` / `tags()` / `statuses()` / `types()` are O(F log F) — they
  sort on each call. If you query them in hot paths, cache the result yourself.

## Runtime

- Node 18+, ESM only.
- No peer dependencies, no runtime file I/O.
- Bundle size: roughly 800 KB unminified / 70 KB gzipped at the time of
  writing. The number scales with the size of the bundled data.
