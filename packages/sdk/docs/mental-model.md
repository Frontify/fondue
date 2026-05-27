# Mental model

The API is a small **graph** with three top-level entry points:

- `components` — the components domain (includes icons)
- `tokens` — the tokens domain (plus a `tokens.utilities` sub-domain)
- `guides` — the prose-guide corpus (markdown bodies); a flat leaf domain
  with no graph edges

All three are **queryable**. They contain **nodes** (or, in `guides`'
case, plain `Guide` records). Some methods give you back a single node or
a queryable facet; others give you back a plain array. Knowing which is
which is most of what you need to learn.

## The three shapes you'll meet

### 1. Domains and facets (queryable)

A **domain** is one of `components`, `tokens`, `tokens.utilities`, or
`guides`. A **facet** is a single named grouping inside a domain — for
example `components.category('input')`, `components.tag('cta')`,
`tokens.type('color')`. (`guides` is a leaf domain — no facets.)

Both expose the same query surface:

| Member          | Returns                                                    |
| --------------- | ---------------------------------------------------------- |
| `list()`        | All nodes in the domain or facet, in stable order          |
| `get(id)`       | One node by its canonical id, or `undefined`               |
| `has(id)`       | Boolean                                                    |
| `where(filter)` | Matching nodes — see [Filters](./api-reference.md#filters) |
| `size`          | Total node count                                           |

The only difference: a facet is **scoped to its members**.
`components.category('input').get('Button')` returns Button. The same call
with `'Dialog'` returns `undefined`, because Dialog isn't in `input`.

### 2. Nodes (data + edges)

A node represents a single entity. It has:

- **Scalar fields** read like properties: `node.name`, `node.props`,
  `node.examples`. No parentheses.
- **Graph edges** read like methods: `node.category()`, `node.related()`,
  `node.tags()`. Parentheses required.
- A `toJSON()` method returning the raw payload (useful for serialization).

A `ComponentNode` looks like:

```ts
interface ComponentNode {
    // Scalars
    readonly name: string;
    readonly description: string;
    readonly status: string;
    readonly importStatement: string;
    readonly instructions: string;
    readonly props: readonly ComponentProp[];
    readonly subComponents: readonly ComponentSubComponent[];
    readonly examples: readonly ComponentExample[];
    readonly typeDefinitions: Readonly<Record<string, string>>;

    // Graph edges
    category(): ComponentFacetNode;
    tags(): readonly ComponentFacetNode[];
    related(): readonly ComponentNode[];

    // Serialization
    toJSON(): ComponentDetails;
}
```

A `TokenNode` is analogous: `category()`, `type()`, and scalar fields like
`value`, `cssVariable`, `tailwindClass`.

### 3. Plain arrays

Anything that's already plural — `list()`, `where()`, `related()`,
`tags()`, `categories()`, `statuses()`, `types()` — returns a
**`readonly Array<…>`**. Use native array methods on these:

```ts
components.list().filter((c) => c.props.length > 5);
button.examples.find((e) => e.isCanonical);
button.related().map((c) => c.name);
button.subComponents.flatMap((sc) => sc.props);
```

## Where you can use `.where`/`.get`/`.has`

| You can call query methods on… | Returned by                                                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| The domain itself              | `components`, `tokens`, `tokens.utilities`                                                                                   |
| A single facet by name         | `components.category(name)`, `components.tag(name)`, `components.status(name)`, `tokens.category(name)`, `tokens.type(name)` |
| A facet from a node            | `node.category()`, `node.type()`                                                                                             |

All of these work:

```ts
components.category('input').where({ tag: 'cta' });
components.category('input').get('Button');
components.tag('action').has('Button');
components.get('Button').category().list();
components.get('Button').category().where({ status: 'released' });
tokens.type('color').where({ themeable: true });
```

## Where you can't

Anything that returns an array doesn't have `.where`/`.get`/`.has` —
use native `.filter`/`.find`/`.includes` instead:

```ts
components.list().where(…)           // ✗ — Array has no .where
components.related().get('Link')     // ✗ — Array has no .get
components.where({…}).where({…})     // ✗ — Array has no .where
button.tags().get('cta')             // ✗ — Array has no .get

components.list().filter((c) => …)   // ✓
button.related().find((c) => c.name === 'Link')                // ✓
button.tags()[0]?.where({ status: 'released' })                // ✓ index, then query
```

**Rule of thumb**: if you can name one specific thing (a domain, or a
named facet), it's queryable. Once it's been pluralized into an array,
use native JavaScript array methods. To get back into query land,
navigate to a single facet — e.g. `array[0].category()` or
`components.category(name)`.

## Icons as components

Icons are surfaced inside the components domain rather than as their own
top-level export. Each icon is a `ComponentNode` with:

| Field             | Value                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| `name`            | The React component name (`'IconAdobeCreativeCloud'`)                   |
| `category()`      | The synthetic `'icon'` facet                                            |
| `status()`        | Throws — icons have no status; check `category().name === 'icon'` first |
| `tags()`          | The icon's tags as `ComponentFacetNode`s                                |
| `importStatement` | `"import { IconAdobeCreativeCloud } from '@frontify/fondue/icons';"`    |
| `examples`        | Icon stories                                                            |
| `props`           | Empty array                                                             |
| `subComponents`   | Empty array                                                             |
| `related()`       | Empty array                                                             |

To find icons:

```ts
components.where({ category: 'icon' }); // all 381
components.where({ category: 'icon', tag: 'adobe' });
components.category('icon').size; // 381
components.get('IconAdobeCreativeCloud'); // the React component
```

## Guides as a leaf domain

`guides` follows the same query surface as the other domains, but its
entries (`Guide`) are plain records — no graph methods, no facets, no
`toJSON()`. Each guide has `id`, `title`, and `content` (raw markdown).

```ts
guides.list().map((g) => g.title);
guides.get('getting-started')?.content; // raw markdown body
guides.where({ text: 'tailwind' });
```

The prose comes from the same `packages/sdk/guides/*.md` files the
Storybook docs site renders, so an MCP server or agent reads exactly
what humans see.

## Construction & lifetime

The three singletons (`components`, `tokens`, `guides`) are built once at
module load from bundled JSON. They are immutable and process-lifetime.
No I/O is performed; nothing is async.

`list()` returns a cached array (O(1)). `get`/`has` are O(1) map lookups.
`where` is O(N). Facet helpers (`categories`, `tags`, …) re-sort on each
call — cache the result yourself if calling in a hot loop.
