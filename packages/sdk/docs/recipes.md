# Recipes

Copy-paste solutions for common tasks. All snippets assume:

```ts
import { components, tokens } from '@frontify/fondue/sdk';
```

## Search

### "Find anything matching a free-text query"

```ts
components.where({ text: 'dropdown' }).map((c) => c.name);
// → ['Dropdown', 'Select', 'Tooltip', …]
```

### "Find a component by exact name"

```ts
const button = components.get('Button');
if (button) {
    // use it
}
```

### "All released input components"

```ts
components.where({ category: 'input', status: 'released' });
```

### "All icons tagged with 'arrow'"

```ts
components.where({ category: 'icon', tag: 'arrow' });
```

### "Tokens in the colors/charts subtree"

```ts
tokens.where({ keyPathStartsWith: 'colors.charts' });
```

## Listing & enumeration

### "All categories with their sizes"

```ts
for (const cat of components.categories()) {
    console.log(`${cat.name}: ${cat.size}`);
}
// → data: 2
//   feedback: 5
//   icon: 381
//   input: 13
//   layout: 7
//   …
```

### "All distinct tags"

```ts
const allTags = components.tags().map((t) => t.name);
```

### "Compare components in two categories"

```ts
const inputs = new Set(
    components
        .category('input')
        ?.list()
        .map((c) => c.name),
);
const overlays = new Set(
    components
        .category('overlay')
        ?.list()
        .map((c) => c.name),
);
const both = [...inputs].filter((n) => overlays.has(n));
```

## Walking the graph

### "Components related to Button"

```ts
const related = components.get('Button')?.related() ?? [];
related.map((c) => c.name);
// → ['SplitButton', 'Link']
```

### "Siblings of any component"

```ts
const siblings = components.get('Button')?.category().list() ?? [];
```

### "All components sharing any tag with Button"

```ts
const buttonTags = components.get('Button')?.tags() ?? [];
const sharing = new Set<string>();
for (const tag of buttonTags) {
    for (const c of tag.list()) {
        if (c.name !== 'Button') sharing.add(c.name);
    }
}
```

### "All canonical examples in the overlay category"

```ts
components
    .category('overlay')
    ?.list()
    .flatMap((c) => c.examples.filter((e) => e.isCanonical));
```

## Working with props

### "Find a specific prop on a component"

```ts
const variant = components.get('Button')?.props.find((p) => p.name === 'variant');
variant?.type; // '"default" | "positive" | "negative" | "danger" | "loud"'
variant?.defaultValue; // 'default'
variant?.required; // false
```

### "Required props on every component"

```ts
const requiredByName = new Map<string, string[]>();
for (const c of components.list()) {
    const names = c.props.filter((p) => p.required).map((p) => p.name);
    if (names.length > 0) requiredByName.set(c.name, names);
}
```

### "Deprecated props anywhere"

```ts
const deprecated = components
    .list()
    .flatMap((c) => c.props.filter((p) => p.deprecated).map((p) => ({ component: c.name, prop: p })));
```

### "Props shared by every component in a category"

```ts
const sets =
    components
        .category('input')
        ?.list()
        .map((c) => new Set(c.props.map((p) => p.name))) ?? [];

const shared = sets.length === 0 ? [] : [...sets[0]!].filter((name) => sets.every((s) => s.has(name)));
```

## Sub-components

### "List sub-components of Dialog"

```ts
const dialog = components.get('Dialog');
dialog?.subComponents.map((sc) => sc.name);
// → ['Dialog.Root', 'Dialog.Header', 'Dialog.Footer', …]
```

### "Find a specific sub-component's props"

```ts
const header = components.get('Dialog')?.subComponents.find((sc) => sc.name === 'Dialog.Header');

header?.props.map((p) => p.name);
```

## Examples

### "The canonical snippet for a component"

```ts
components.get('Button')?.examples.find((e) => e.isCanonical)?.code;
```

### "All snippets that reference an icon"

```ts
components
    .list()
    .flatMap((c) => c.examples)
    .filter((e) => /\bIcon[A-Z][A-Za-z0-9]*\b/.test(e.code));
```

## Tokens

### "All themeable colors"

```ts
tokens.where({ category: 'colors', themeable: true });
```

### "Tokens of a given type"

```ts
tokens.type('color')?.list();
```

### "Walk from a token to its siblings"

```ts
const primary = tokens.get('color-charts-primary-default');
const siblings = primary?.category().list() ?? [];
```

### "All distinct tailwind classes for typography utilities"

```ts
tokens.utilities.where({ keyPathStartsWith: 'utilities.text' }).map((u) => u.tailwindClass);
```

## Guides

### "List every guide with title and id"

```ts
import { guides } from '@frontify/fondue/sdk';

guides.list().map((g) => ({ id: g.id, title: g.title }));
// → [
//     { id: 'contributing',    title: 'How to contribute' },
//     { id: 'getting-started', title: 'Getting started' },
//     { id: 'upgrading',       title: 'Upgrading to Fondue v13' },
//   ]
```

### "Get a guide's raw markdown"

```ts
const intro = guides.get('getting-started');
intro?.content; // '# Getting started\n\nWelcome to Fondue, …'
```

### "Search across all prose"

```ts
guides.where({ text: 'tailwind' }).map((g) => g.id);
// → ['getting-started', 'upgrading']
```

### "Drop the corpus into a system prompt"

```ts
const systemContext = guides
    .list()
    .map((g) => `## ${g.title}\n\n${g.content}`)
    .join('\n\n');
```

### "Render a guide with a markdown renderer"

```ts
import { marked } from 'marked';
import { guides } from '@frontify/fondue/sdk';

const html = marked.parse(guides.get('contributing')?.content ?? '');
```

## Serialization

### "Dump the whole graph as JSON"

```ts
JSON.stringify(
    {
        components: components.list(),
        tokens: tokens.list(),
        utilities: tokens.utilities.list(),
        guides: guides.list(),
    },
    null,
    2,
);
```

`toJSON()` is implemented on every node, so `JSON.stringify` writes the
raw underlying payload — not the graph methods.

### "Export everything as an OpenAPI-style component manifest"

```ts
const manifest = components.list().map((c) => ({
    name: c.name,
    description: c.description,
    category: c.category().name,
    tags: c.tags().map((t) => t.name),
    props: c.props.map((p) => ({ name: p.name, type: p.type, required: p.required })),
}));
```

## Iteration patterns

### "Group components by status"

```ts
const byStatus: Record<string, string[]> = {};
for (const c of components.list()) {
    const status = c.category().name === 'icon' ? 'icon' : c.status().name;
    (byStatus[status] ??= []).push(c.name);
}
```

(Icons have no `status()` — guard with a category check first.)

### "Iterate every facet of every kind"

```ts
const facetGroups = [
    { kind: 'category', facets: components.categories() },
    { kind: 'status', facets: components.statuses() },
    { kind: 'tag', facets: components.tags() },
];

for (const { kind, facets } of facetGroups) {
    for (const f of facets) {
        console.log(`${kind}: ${f.name} (${f.size})`);
    }
}
```
