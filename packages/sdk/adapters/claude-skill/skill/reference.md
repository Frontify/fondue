# Fondue SDK — agent reference

Formal contract for `@frontify/fondue/sdk`. Load this when the patterns in `SKILL.md` don't expose what you need — for example, when you're generating code that imports the SDK directly, or when you need to verify a filter clause name or method signature.

## Contents

- [Exports](#exports) — the three singletons and the shared `QueryApi` shape
- [Components](#components) — `ComponentFilter`, `ComponentNode`, icons
- [Tokens](#tokens) — `TokenFilter`, `TokenNode`, utilities
- [Guides](#guides) — guide ids and shape
- [Facets](#facets) — `FacetNode` shape and how to reach them
- [Error semantics](#error-semantics) — what throws, what returns `undefined`
- [Runtime guarantees](#runtime-guarantees) — module type, Node version, deps

## Exports

```ts
import { components, tokens, guides } from '@frontify/fondue/sdk';
```

Three singletons. Each has the same query surface; each returns its own node types.

```ts
interface QueryApi<Node, Filter> {
    list(): readonly Node[];
    get(id: string): Node | undefined;          // never throws; returns undefined for unknown ids
    has(id: string): boolean;
    where(filter: Filter): readonly Node[];     // AND-combined; array-valued clauses OR within
    readonly size: number;
}
```

Plain arrays returned from `list()` / `where()` / `node.related()` are arrays — they don't carry the query surface. Use native `.filter` / `.find`, or navigate back to a facet to re-query.

## Components

```ts
components: QueryApi<ComponentNode, ComponentFilter> & {
    categories(): readonly ComponentFacetNode[];
    category(name: string): ComponentFacetNode | undefined;
    tags(): readonly ComponentFacetNode[];
    tag(name: string): ComponentFacetNode | undefined;
};
```

### `ComponentFilter`

| Clause | Type | Notes |
| ------ | ---- | ----- |
| `category` | `string \| readonly string[]` | OR within array |
| `status` | `string \| readonly string[]` | OR within array |
| `tag` | `string \| readonly string[]` | Matches if component carries any tag in the array |
| `text` | `string` | Case-insensitive substring across name, description, category, tags |

All clauses AND-combine.

### `ComponentNode`

```ts
interface ComponentNode {
    // scalar fields
    name: string;
    description: string;
    status: string;             // '' for icons
    importStatement: string;
    instructions: string;        // hand-written usage notes, often empty
    props: readonly ComponentProp[];
    subComponents: readonly ComponentSubComponent[];
    examples: readonly ComponentExample[];
    typeDefinitions: Readonly<Record<string, string>>;

    // graph edges (methods)
    category(): ComponentFacetNode;          // throws on data inconsistency only
    tags(): readonly ComponentFacetNode[];
    related(): readonly ComponentNode[];     // unknown names silently skipped
    toJSON(): ComponentDetails;
}

interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
}

interface ComponentExample {
    name: string;
    description: string;
    code: string;
    isCanonical: boolean;        // there is at most one canonical example per component
}

interface ComponentSubComponent {
    name: string;                // e.g. 'Dialog.Header'
    props: readonly ComponentProp[];
}
```

### Icons

Icons are components with `category: 'icon'`. They have:
- empty `status`, empty `props`, empty `related()`, empty `subComponents`
- a non-empty `importStatement` (e.g. `import { IconAdobeCreativeCloud } from '@frontify/fondue/icons';`)
- tags (e.g. `'arrow'`, `'brand'`)

Filter to icons with `components.where({ category: 'icon' })`. Detect at the node with `node.category().name === 'icon'`.

## Tokens

```ts
tokens: QueryApi<TokenNode, TokenFilter> & {
    categories(): readonly TokenFacetNode[];
    category(name: string): TokenFacetNode | undefined;
    types(): readonly TokenFacetNode[];
    type(name: TokenValueType): TokenFacetNode | undefined;
    utilities: TokenUtilitiesApi;
};

type TokenValueType = 'color' | 'float' | 'shadow' | 'string';
```

### `TokenFilter`

| Clause | Type | Notes |
| ------ | ---- | ----- |
| `category` | `string \| readonly string[]` | e.g. `'colors'`, `'sizes'` |
| `type` | `TokenValueType \| readonly TokenValueType[]` | |
| `themeable` | `boolean` | |
| `keyPathStartsWith` | `string` | Dot-joined keyPath prefix, e.g. `'colors.charts'` |
| `text` | `string` | Case-insensitive against id, tailwindClass, keyPath |

### `TokenNode`

```ts
interface TokenNode {
    id: string;                         // e.g. 'color-charts-primary-default'
    value: string;                      // often `var(--token)` or a literal
    cssVariable: string;                // 'var(--color-charts-primary-default)'
    tailwindClass: string;              // e.g. '*-charts-primary'
    themeable: boolean;
    keyPath: readonly string[];          // ['colors','charts','primary','default']

    category(): TokenFacetNode;
    type(): TokenFacetNode;
    toJSON(): Token;
}
```

### Utilities

```ts
tokens.utilities: QueryApi<TokenUtilityNode, TokenUtilityFilter> & {
    classes(): readonly string[];
};
```

No `categories()` / `types()` on utilities — they're a leaf domain.

```ts
interface TokenUtilityFilter {
    themeable?: boolean;
    keyPathStartsWith?: string;          // typography utilities live under 'utilities.text'
    text?: string;
}

interface TokenUtilityNode {
    id: string;
    tailwindClass: string;               // e.g. 'tw-body-large-strong'
    themeable: boolean;
    keyPath: readonly string[];
    properties: readonly TokenUtilityProperty[];
}

interface TokenUtilityProperty {
    id: string;
    type: TokenValueType;
    value: string;
    cssVariable: string;
}
```

## Guides

```ts
guides: QueryApi<Guide, GuideFilter>;

interface Guide {
    id: string;                          // slug from filename, e.g. 'getting-started'
    title: string;                       // extracted from the first `# Title` line
    content: string;                     // raw markdown body, includes the leading `# Title`
}

interface GuideFilter {
    text?: string;                       // case-insensitive against id, title, content
}
```

Known ids include `getting-started`, `contributing`, `upgrading`. The bundled set may grow; call `guides.list()` to see the current corpus.

## Facets

`ComponentFacetNode` and `TokenFacetNode` share this shape:

```ts
interface FacetNode<Node, Filter> {
    name: string;
    list(): readonly Node[];
    get(id: string): Node | undefined;
    has(id: string): boolean;
    where(filter: Filter): readonly Node[];
    size: number;
}
```

Reach a facet via the domain's accessor or via a node's edge:

```ts
components.category('input');                         // facet
components.tag('cta');                                // facet
components.get('Button')?.category();                 // facet from a node
tokens.category('colors')?.where({ themeable: true });
```

## Error semantics

- `get(id)` never throws — returns `undefined` for unknown ids.
- `node.related()` silently skips unknown names.
- `node.category()` throws only on internal data inconsistency (a component referencing a category that doesn't exist) — treat as a bug to report, not a runtime case to handle.
- `where(filter)` with an empty filter returns every node in the domain.

## Runtime guarantees

- Synchronous, zero file I/O.
- Pure ES module; Node 18+.
- No peer dependencies, no React, no DOM.
