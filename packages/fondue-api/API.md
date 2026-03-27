# @frontify/fondue-api

Programmatic API for querying the Fondue design system — components, tokens, and icons.

```ts
import { getComponent, searchTokens, listIcons } from '@frontify/fondue-api';
```

---

## Components

### `listComponents(): ComponentSummary[]`

Returns all component summaries (lightweight, from the index manifest).

```ts
const components = listComponents();
// [{ name: "Button", description: "...", status: "released", category: "input", tags: [...], subComponentNames: [] }, ...]
```

### `getComponent(name: string): ComponentDetail | undefined`

Returns the full detail for a component by name (case-insensitive). Includes props, subcomponents, examples, instructions, and import statement.

```ts
const button = getComponent('Button');
// { name, description, status, category, tags, subComponentNames, relatedComponents, importStatement, props, subComponents, examples, instructions, typeDefinitions }
```

### `getComponentSummary(name: string): ComponentSummary | undefined`

Returns only the summary for a component by name (case-insensitive). Cheaper than `getComponent()` — does not load the full detail manifest.

```ts
const summary = getComponentSummary('Button');
// { name, description, status, category, tags, subComponentNames }
```

### `searchComponents(options: SearchOptions): ComponentSummary[]`

Searches components by query string, matching against name, description, tags, and category. Returns summaries.

```ts
const results = searchComponents({ query: 'toggle', limit: 5 });
```

### `getComponentsByCategory(options: CategoryFilter): ComponentSummary[]`

Returns all components in a given category (case-insensitive).

```ts
const inputs = getComponentsByCategory({ category: 'input' });
```

**Categories:** `input`, `layout`, `overlay`, `feedback`, `typography`, `navigation`, `data`, `utility`

---

## Tokens

### `listTokenCategories(): string[]`

Returns all distinct token category names.

```ts
const categories = listTokenCategories();
// ["colors", "spacing", "shadows", ...]
```

### `getToken(id: string): Token | undefined`

Returns a token by its exact id.

```ts
const token = getToken('color-charts-dim-default');
// { category, cssVariable, id, keyPath, tailwindClass, themeable, type, value }
```

### `getTokensByCategory(options: CategoryFilter): Token[]`

Returns all tokens in a given category.

```ts
const colors = getTokensByCategory({ category: 'colors', limit: 10 });
```

### `searchTokens(options: SearchOptions): Token[]`

Searches tokens by query string, matching against id, cssVariable, tailwindClass, and category.

```ts
const results = searchTokens({ query: 'negative' });
```

### `listUtilities(): Utility[]`

Returns all utilities (composite tokens like typography styles).

```ts
const utilities = listUtilities();
// [{ id, keyPath, properties: [{ cssVariable, id, type, value }], tailwindClass, themeable }, ...]
```

### `searchUtilities(options: SearchOptions): Utility[]`

Searches utilities by query string, matching against id and tailwindClass.

```ts
const results = searchUtilities({ query: 'body-large' });
```

---

## Icons

### `listIcons(options?: { limit?: number }): Icon[]`

Returns all icons.

```ts
const icons = listIcons({ limit: 20 });
// [{ name, componentName, exportName, importPath, filled, availableSizes, defaultSize, keywords }, ...]
```

### `getIcon(name: string): Icon | undefined`

Returns an icon by its kebab-case name (case-insensitive).

```ts
const icon = getIcon('adobe-creative-cloud');
// { name: "adobe-creative-cloud", componentName: "AdobeCreativeCloud", exportName: "IconAdobeCreativeCloud", ... }
```

### `getIconByExportName(exportName: string): Icon | undefined`

Returns an icon by its React export name (case-insensitive).

```ts
const icon = getIconByExportName('IconAdobeCreativeCloud');
```

### `searchIcons(options: SearchOptions): Icon[]`

Searches icons by query string, matching against name, componentName, exportName, and keywords.

```ts
const results = searchIcons({ query: 'cloud', limit: 10 });
```

---

## Types

### Query options

| Type | Fields |
|---|---|
| `SearchOptions` | `query: string`, `limit?: number` |
| `CategoryFilter` | `category: string`, `limit?: number` |

### Component types

| Type | Description |
|---|---|
| `ComponentSummary` | `name`, `description`, `status`, `category`, `tags`, `subComponentNames` |
| `ComponentDetail` | Extends `ComponentSummary` with `relatedComponents`, `importStatement`, `props`, `subComponents`, `examples`, `instructions`, `typeDefinitions` |
| `PropInfo` | `name`, `type`, `required`, `defaultValue`, `description`, `deprecated`, `deprecationMessage` |
| `SubComponentInfo` | `name`, `props` |
| `ComponentExample` | `name`, `description`, `isCanonical`, `code` |

### Token types

| Type | Description |
|---|---|
| `Token` | `category`, `cssVariable`, `id`, `keyPath`, `tailwindClass`, `themeable`, `type`, `value` |
| `Utility` | `id`, `keyPath`, `properties`, `tailwindClass`, `themeable` |
| `UtilityProperty` | `cssVariable`, `id`, `type`, `value` |

### Icon types

| Type | Description |
|---|---|
| `Icon` | `name`, `componentName`, `exportName`, `importPath`, `filled`, `availableSizes`, `defaultSize`, `keywords` |

---

## Design principles

- **No throws**: Single-item lookups return `T | undefined`. Collections return `T[]` (empty if no matches).
- **Two-tier components**: `listComponents()`/`searchComponents()` return lightweight summaries. `getComponent()` returns full detail with props and examples. Use summaries to scan, then drill down.
- **Case-insensitive**: All name lookups are case-insensitive.
- **Deterministic search**: Substring matching across relevant fields. No fuzzy matching — results are predictable.
