---
name: fondue
description: Queries the locally installed `@frontify/fondue/sdk` to surface accurate Fondue component metadata. ALWAYS use when picking a Fondue component (button, dialog, dropdown, tabs, …), finding a design token or utility class, or setting up the `@frontify/fondue` package.
allowed-tools: Bash(node *)
---

# Fondue

Use `@frontify/fondue/sdk` as the source of truth for every Fondue question. Never invent component names, props, token ids, or imports from memory — query the SDK.

**Runs against the project's locally installed Fondue.** Invoke `node` from the project root (or a subdirectory) so `@frontify/fondue` resolves from `node_modules` — results reflect the exact version this project depends on, not the version the skill was authored against.

## Verify the SDK is available

```bash
node -e "import('@frontify/fondue/sdk').then((m) => console.log(JSON.stringify({ components: m.components.size, tokens: m.tokens.size, guides: m.guides.size })))"
```

If that errors with `Cannot find package`, the project hasn't installed Fondue yet:

```bash
pnpm add @frontify/fondue   # or npm i / yarn add
```

## How to query

The SDK is a synchronous, zero-I/O ES module that resolves from the user's project. Three singletons share the same query surface:

```ts
import { components, tokens, guides } from '@frontify/fondue/sdk';

// Same shape on each domain:
components.list();
components.get('Button');             // ComponentNode | undefined (never throws)
components.has('Button');             // boolean
components.where({ text: 'dropdown' });
components.size;                      // number
```

`where(filter)` clauses AND-combine; array-valued clauses OR within the clause. `get` and `where` never throw; missing ids return `undefined` / `[]`.

Nodes have **scalar fields** (read as properties) and **graph edges** (call as methods):

```ts
const button = components.get('Button');
button?.importStatement;              // scalar
button?.props;                        // scalar (array)
button?.category();                   // edge → ComponentFacetNode { name, list, where, … }
button?.related();                    // edge → ComponentNode[]
```

### Running queries from Claude

For one-liners, use `node -e`:

```bash
node -e "import('@frontify/fondue/sdk').then(({components}) => console.log(JSON.stringify(components.where({text:'dropdown'}).map((c)=>({name:c.name,import:c.importStatement,canonical:c.examples.find((e)=>e.isCanonical)?.code})))))"
```

For anything multi-line, pipe a module via stdin to avoid quoting hell:

```bash
node --input-type=module <<'EOF'
import { components } from '@frontify/fondue/sdk';
const candidates = components.where({ text: 'dropdown', status: 'released' }).slice(0, 5);
console.log(JSON.stringify(candidates.map((c) => ({
    name: c.name,
    category: c.category().name,
    tags: c.tags().map((t) => t.name),
    import: c.importStatement,
    canonical: c.examples.find((e) => e.isCanonical)?.code ?? c.examples[0]?.code ?? null,
})), null, 2));
EOF
```

Always emit `JSON.stringify(...)` so the response is parseable. Never `console.log(node)` directly — facet methods serialize as `[Function]`.

For the formal contract (every filter clause, node shape, facet method), see [`reference.md`](./reference.md).

---

## Workflow 1 — Setting up Fondue

Read the canonical setup prose from the SDK rather than paraphrasing — the steps change between releases (font URLs, package layout, theme provider API).

```bash
node -e "import('@frontify/fondue/sdk').then(({guides}) => console.log(guides.get('getting-started')?.content))"
```

For upgrades:

```bash
node -e "import('@frontify/fondue/sdk').then(({guides}) => console.log(guides.get('upgrading')?.content))"
```

To discover other bundled guides:

```bash
node -e "import('@frontify/fondue/sdk').then(({guides}) => console.log(JSON.stringify(guides.list().map((g)=>({id:g.id,title:g.title})))))"
```

The output is the same markdown the Storybook docs render. Use it as the source for token imports, component-style imports, font face definitions, the Tailwind preset, `ThemeProvider`.

## Workflow 2 — Finding a component

Start with intent-based search:

```bash
node --input-type=module <<'EOF'
import { components } from '@frontify/fondue/sdk';
console.log(JSON.stringify(components.where({ text: 'dropdown' }).map((c) => ({
    name: c.name,
    category: c.category().name,
    status: c.status,
    description: c.description,
})), null, 2));
EOF
```

Narrow by category or tag when the use case maps cleanly:

```ts
components.where({ category: 'overlay', status: 'released' });
components.where({ tag: 'cta' });
components.where({ category: 'input', tag: 'cta' });
```

Once you have a candidate, pull the recommendation shape:

```bash
node --input-type=module <<'EOF'
import { components } from '@frontify/fondue/sdk';
const c = components.get('Button');
console.log(JSON.stringify({
    name: c.name,
    description: c.description,
    importStatement: c.importStatement,
    canonical: c.examples.find((e) => e.isCanonical)?.code ?? c.examples[0]?.code,
    requiredProps: c.props.filter((p) => p.required).map((p) => p.name),
    subComponents: c.subComponents.map((sc) => sc.name),
    related: c.related().map((r) => r.name),
    instructions: c.instructions,
}, null, 2));
EOF
```

**Recommendation shape** — when you suggest a component, output: the name, what it's for, the import statement, and the canonical example. If the use case isn't a clean match, list 2–3 candidates with their categories and let the user pick.

**Icons** live in the components graph under `category: 'icon'`. They have empty `status`, empty `props`, empty `related()` — don't probe those fields. Find them with:

```ts
components.where({ category: 'icon', tag: 'arrow' });
components.get('IconAdobeCreativeCloud')?.importStatement;
```

When nothing matches:
- Try a related tag — `components.tags().map((t) => t.name)` lists every tag.
- Look at the closest hit's `related()`.
- If there truly is no component for the use case, say so. Don't recommend hand-rolling something Fondue already provides, but don't invent a component name either.

## Workflow 3 — Picking tokens for a custom component

Two layers exist:

- `tokens` — atomic design tokens (colors, sizes, shadows, strings). Each has a CSS variable and a Tailwind class.
- `tokens.utilities` — composed Tailwind utilities (typography classes like `tw-body-large-strong`) bundling multiple token references.

```ts
tokens.where({ text: 'primary' });
tokens.where({ category: 'colors', themeable: true });
tokens.where({ keyPathStartsWith: 'colors.text' });
tokens.type('color')?.where({ themeable: true });

const t = tokens.get('color-text-weak');
t?.value;              // 'var(--color-text-weak)'
t?.cssVariable;        // '--color-text-weak'
t?.tailwindClass;      // 'tw-text-weak'
t?.themeable;          // true

// Typography: always use the utility class, not raw font tokens
tokens.utilities.where({ keyPathStartsWith: 'utilities.text' });
```

Rules:
- Prefer `themeable: true` tokens for any user-facing surface so dark mode and theming work out of the box.
- Prefer the Tailwind class when the project uses `@frontify/fondue/tokens/tailwind`; prefer the CSS variable otherwise.
- For typography, recommend the **utility class** — not raw font-size / line-height / weight tokens.
- Never invent token ids. If `tokens.get(id)` returns `undefined`, search again.
- If the design calls for a value with no matching token, surface that explicitly — don't silently hardcode. The right answer is usually a token the user didn't know existed.

---

## Common pitfalls

| Mistake | Fix |
| ------- | --- |
| Calling `.where()` / `.get()` on the array returned by `list()` / `where()` | Arrays are arrays. Use native `.filter` / `.find`, or navigate back to a facet to query. |
| Assuming a component exists ("there must be a `Combobox`") | `components.has('Combobox')` first, or `components.where({ text: 'combobox' })` |
| Hardcoding a hex / px value in custom code | `tokens.where({ text: '<intent>' })` — most "obvious" values have a token |
| Treating icons like normal components, reading `status` / `props` | Detect with `node.category().name === 'icon'`. Icons have empty `status`, `props`, `related`. |
| Importing `Button` from the wrong path | `components.get('Button')?.importStatement` is authoritative |
| Suggesting setup steps from memory | `guides.get('getting-started')?.content` — always the live text |
| `console.log(node)` instead of `JSON.stringify` | Facet methods serialize as `[Function]`; always stringify before logging |

## Going deeper

[`reference.md`](./reference.md) sits next to this file and ships with it — the formal contract: every export, every filter clause per domain, every node and facet type, error semantics. Load it when you need to verify a filter clause is valid (`ComponentFilter`, `TokenFilter`, `GuideFilter`) or that a method exists. Prefer it over web lookups or upstream GitHub.
