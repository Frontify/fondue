# Fondue MCP Server — Implementation Plan

## Context

The Fondue design system monorepo lacks a machine-readable API for AI tools. An MCP server will let Claude Code, Cursor, and other AI assistants query components, tokens, icons, and docs with structured tools — rather than reading raw source files. This lives as `packages/mcp-server` in the existing pnpm workspace.

---

## Architecture

### Approach: Distributed build-time indexes + lightweight runtime

- **Index generation lives in each package's build** — the components package generates `dist/manifest.json`, the icons package generates `dist/manifest.json`. Each package owns its own index.
- **Runtime**: MCP server reads sibling package indexes + existing token JSON files. Zero heavy dependencies at runtime — only `@modelcontextprotocol/sdk`.
- **Why distributed**: Indexes stay in sync with build output automatically. The people who change components/icons maintain the index. MCP server has no build-time parsing deps.

### MCP Primitives

| Primitive | What | Why |
|-----------|------|-----|
| **Tools** | `search_components`, `get_component`, `search_tokens`, `get_token`, `search_icons`, `get_icon`, `get_documentation` | Parameterized queries — the primary interface |
| **Resources** | `fondue://components/index`, `fondue://tokens/{category}`, `fondue://icons/index`, `fondue://docs/{topic}` | Full reference data LLMs can pull as context |
| **Prompts** | `build_component_usage`, `find_right_component`, `migrate_to_v13` | Guided workflows for common tasks |

---

## Codebase Findings (from exploration)

### Component type patterns in `dist/index.d.ts` (2942 lines)

Three export shapes to handle:

1. **ForwardRefExoticComponent** — most common simple component
   ```ts
   export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement | null>>;
   ```
   Components: Box, Button, Checkbox, Divider, EditableText, Label, Link, LoadingBar, LoadingCircle, ScrollArea, Section, Slider, Switch

2. **Arrow function** — functional components
   ```ts
   export declare const Badge: ({ ... }: BadgeProps) => JSX_2.Element;
   export declare const Notice: ({ ... }: NoticeProps) => JSX_2.Element;
   export declare const ThemeProvider: ({ ... }: ThemeProviderProps) => JSX_2.Element;
   export declare const RouterProvider: ({ ... }: RouterProviderProps) => JSX_2.Element;
   ```

3. **Compound components** — object with sub-component properties
   ```ts
   export declare const Accordion: { Root: ..., Item: ..., Header: ..., Trigger: ..., Content: ..., Slot: ... };
   export declare const ColorPicker: { ... };
   export declare const Dialog: { ... };
   export declare const Dropdown: { ... };
   export declare const Flyout: { ... };
   export declare const OrderableList: { ... };
   export declare const SegmentedControl: { ... };
   export declare const Select: typeof SelectSingle & { ... };
   export declare const SplitButton: { ... };
   export declare const Table: { ... };
   export declare const Tabs: { ... };
   export declare const Textarea: typeof TextareaRoot & { ... };
   export declare const TextInput: typeof TextFieldRoot & { ... };
   export declare const Tooltip: { ... };
   ```

4. **Special cases**:
   - `Text` — re-exported alias: `export { Text_2 as Text }`
   - `Heading` — generic function: `(<TTag extends TagType = "span">(props: HeadingProps<TTag> & { ref?: ... }) => ...)`
   - `Tag` — typed as `TagComponent` (a type alias)
   - `DatePicker` — `typeof ForwardedRefSingleDatePicker & { Range: ... }`
   - `ThemeContext` — `Context<ThemeContextValue>` (not a component)
   - `useFondueTheme` — hook (not a component)

### Props pattern

All props types use JSDoc with `@default` tags:
```ts
declare type ButtonProps = {
    /** @default "button" */
    type?: ButtonType;
    /** @default "strong" */
    emphasis?: ButtonEmphasis;
    // ...
};
```

Props types are declared (not exported) — they use `declare type XxxProps = { ... }`.

### Token JSON structure

Four JSON files in `packages/tokens/dist/json/`:
- `all-tokens.json` — top-level key is category (`colors`, `semantic`, `utilities`)
- `colors.json` — starts directly at subcategory level (e.g., `charts.dim.default`)
- `semantic.json` — same pattern
- `utilities.json` — same pattern

Leaf node shape:
```json
{
  "name": "color-charts-primary-default",
  "type": "color",
  "value": "var(--color-charts-primary-default)",
  "path": ["light", "color", "charts", "primary", "default"]
}
```

CSS file (`dist/css/base.css`) has resolved values:
```css
:root {
  --color-charts-primary-default: rgba(106, 203, 117, 1);
  --border-radius-large: 0.5rem;
}
```

### Icon structure

- 355 icon folders in `packages/icons/icons/`
- Each folder has 5 SVGs: `{name}-{12,16,20,24,32}.svg`
- Barrel exports in `src/icons/index.ts`: `export { IconArrowDown } from './arrow-down';`
- Naming: folder `arrow-down` → export `IconArrowDown` → component name `ArrowDown`

### Stories

39 story files in `packages/components/src/components/*/`:
- Most are `.stories.tsx`, a few are `.stories.ts`
- Story file naming matches component name (e.g., `Button.stories.tsx`)

### Documentation

3 MDX files in `storybook-docs/stories/`:
- `1 - Getting Started.mdx`
- `2 - Contributing.mdx`
- `3 - Upgrading.mdx`

---

## Index Generation (in source packages)

### `packages/components/scripts/build-manifest.ts`
- Added as devDep: `ts-morph`
- Build script change: `"build": "vite build && tsx scripts/build-manifest.ts"`
- Uses ts-morph on the freshly-built `dist/index.d.ts`
- Handles the four patterns above:
  - **ForwardRefExoticComponent**: Extract type arg, find props type, extract properties
  - **Arrow function**: Find parameter type in signature, extract properties
  - **Compound components**: Iterate object type properties, recurse to find each sub-component's props
  - **Special cases**: Skip `ThemeContext`, `useFondueTheme`; handle `Text` re-export, `Heading` generic, `Tag` type alias, `DatePicker`/`Select`/`Textarea`/`TextInput` typeof-and-intersection
- For each props type: extract property name, type string, required/optional, JSDoc description, `@default` value
- Reads corresponding `.stories.tsx`/`.stories.ts` files as raw text for usage examples
- Outputs `dist/manifest.json`

**Component index shape:**
```ts
{
  name: string;              // "Button" or "Accordion.Root"
  description?: string;      // JSDoc on the component/type
  importPath: string;        // "@frontify/fondue-components"
  props: Array<{
    name: string;
    type: string;            // "'default' | 'positive'" as readable string
    required: boolean;
    description: string;
    defaultValue?: string;
  }>;
  stories?: string;          // Raw story source code
}
```

### `packages/icons/scripts/build-manifest.ts`
- No new deps needed (just reads files)
- Build script change: `"build": "pnpm build:generate-react-icons && vite build && tsx scripts/build-manifest.ts"`
- Parses `src/icons/index.ts` with regex: `export \{ (Icon\w+) \} from '\.\/([\w-]+)'`
- For each icon, scans `icons/{kebab}/` folder for `{kebab}-{size}.svg` files to determine available sizes
- Generates tags by splitting kebab-name on `-`
- Outputs `dist/manifest.json`

**Icon index shape:**
```ts
{
  name: string;           // "ArrowDown"
  importName: string;     // "IconArrowDown"
  kebabName: string;      // "arrow-down"
  sizes: number[];        // [12, 16, 20, 24, 32]
  tags: string[];         // ["arrow", "down"]
}
```

---

## MCP Server Package Structure

```
packages/mcp-server/
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── index.ts                          # Entry point — stdio transport
│   ├── server.ts                         # McpServer setup, registers everything
│   ├── tools/
│   │   ├── components.ts                 # search_components, get_component
│   │   ├── tokens.ts                     # search_tokens, get_token
│   │   ├── icons.ts                      # search_icons, get_icon
│   │   └── documentation.ts              # get_documentation
│   ├── resources/
│   │   ├── components.ts                 # fondue://components/index
│   │   ├── tokens.ts                     # fondue://tokens/*
│   │   ├── icons.ts                      # fondue://icons/index
│   │   └── docs.ts                       # fondue://docs/*
│   ├── prompts/
│   │   ├── build-usage.ts                # build_component_usage
│   │   ├── find-component.ts             # find_right_component
│   │   └── migration.ts                  # migrate_to_v13
│   └── lib/
│       ├── load-components.ts            # Reads ../components/dist/manifest.json
│       ├── load-tokens.ts                # Reads ../tokens/dist/json + css, flattens
│       ├── load-icons.ts                 # Reads ../icons/dist/manifest.json
│       ├── load-docs.ts                  # Reads MDX files from storybook-docs/
│       └── search.ts                     # Simple scored substring search
└── bin/
    └── fondue-mcp.js                     # #!/usr/bin/env node shebang entry
```

### Dependencies

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0"
  },
  "devDependencies": {
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
  }
}
```

- No `ts-morph` — that's a devDep of `packages/components` only
- Runtime has a single dep: `@modelcontextprotocol/sdk`
- No bundler — plain `tsc` output (Node CLI tool)

---

## Implementation Steps

### Phase 1: Scaffold MCP server package
1. Create `packages/mcp-server/` with `package.json`, `tsconfig.json`, `.gitignore`
2. Minimal `src/index.ts` with stdio transport + `src/server.ts` with McpServer
3. Add `bin/fondue-mcp.js` shebang entry

### Phase 2: Search utility + data loaders
1. `lib/search.ts` — scored substring search (exact > startsWith > includes), works on any `{ name: string }[]`
2. `lib/load-tokens.ts` — reads `packages/tokens/dist/json/*.json` + `dist/css/base.css`, flattens nested token objects into flat `TokenEntry[]` with resolved CSS values
3. `lib/load-docs.ts` — reads the 3 MDX files from `storybook-docs/stories/`
4. `lib/load-components.ts` — reads `packages/components/dist/manifest.json`
5. `lib/load-icons.ts` — reads `packages/icons/dist/manifest.json`

### Phase 3: Token + Documentation tools & resources
1. `tools/tokens.ts` — `search_tokens(query, category?, type?)` and `get_token(name)`
2. `tools/documentation.ts` — `get_documentation(topic)` for getting-started/contributing/upgrading
3. `resources/tokens.ts` — `fondue://tokens/all`, `fondue://tokens/colors`, etc.
4. `resources/docs.ts` — `fondue://docs/{topic}`

### Phase 4: Component index build script (in components package)
1. Add `ts-morph` as devDep to `packages/components`
2. Create `packages/components/scripts/build-manifest.ts`
3. Update build script: `"build": "vite build && tsx scripts/build-manifest.ts"`
4. Handle all four component patterns (ForwardRef, arrow fn, compound, special cases)
5. Read `.stories.tsx`/`.stories.ts` files for usage examples
6. Output `dist/manifest.json`

### Phase 5: Component tools & resources (in MCP server)
1. `tools/components.ts` — `search_components(query)` and `get_component(name, include_stories?)`
2. `resources/components.ts` — `fondue://components/index`

### Phase 6: Icon index build script (in icons package) + tools
1. Create `packages/icons/scripts/build-manifest.ts`
2. Update build script: `"build": "pnpm build:generate-react-icons && vite build && tsx scripts/build-manifest.ts"`
3. Output `dist/manifest.json`
4. `tools/icons.ts` — `search_icons(query)` and `get_icon(name)`
5. `resources/icons.ts` — `fondue://icons/index`

### Phase 7: Prompts
1. `build_component_usage` — given a component name, compose a complete usage example with imports, token usage, icon usage
2. `find_right_component` — given a UI description, suggest matching Fondue components
3. `migrate_to_v13` — pull from upgrading doc + token deprecation data

### Phase 8: Integration & polish
1. Add `"build:mcp"` script to root `package.json`
2. Error handling: missing index files → clear error message with rebuild instructions
3. Wire up server.ts to register all tools/resources/prompts

---

## Tool Definitions (Detailed)

### `search_components`
- **Input**: `{ query: string }`
- **Output**: Array of `{ name, description, propsCount }` for matching components
- Searches component name + description

### `get_component`
- **Input**: `{ name: string, include_stories?: boolean }`
- **Output**: Full component detail — props table (name, type, required, default, description), import statement, story code
- Fuzzy matches name (e.g., "button" → "Button")

### `search_tokens`
- **Input**: `{ query: string, category?: "colors" | "semantic" | "utilities", type?: string }`
- **Output**: Array of `{ name, cssVariable, value, type, category }`
- Searches token name + CSS variable name + path segments

### `get_token`
- **Input**: `{ name: string }`
- **Output**: `{ name, cssVariable, resolvedValue, type, category, path, tailwindClass }`

### `search_icons`
- **Input**: `{ query: string }`
- **Output**: Array of `{ name, importName, sizes }` for matching icons
- Searches icon name + tag segments (e.g., "arrow" matches all arrow icons)

### `get_icon`
- **Input**: `{ name: string }`
- **Output**: `{ name, importName, importStatement, sizes, usage }`

### `get_documentation`
- **Input**: `{ topic: "getting-started" | "contributing" | "upgrading" }`
- **Output**: Full MDX content as text

---

## Files Modified in Existing Packages

| File | Change |
|------|--------|
| `packages/components/package.json` | Add `ts-morph` devDep, update `build` script |
| `packages/components/scripts/build-manifest.ts` | **New** — ts-morph index generator |
| `packages/icons/package.json` | Update `build` script |
| `packages/icons/scripts/build-manifest.ts` | **New** — icon index generator |
| Root `package.json` | Add `build:mcp` script |

## Critical Source Files (read-only)

| File | Role |
|------|------|
| `packages/components/dist/index.d.ts` | Primary input for component props extraction (2942 lines, rolled-up types with JSDoc) |
| `packages/components/src/components/*/*.stories.tsx` | Usage examples per component (39 files) |
| `packages/tokens/dist/json/all-tokens.json` | Complete token set (nested objects with name, type, value, path) |
| `packages/tokens/dist/json/colors.json` | Color tokens (subcategory-level, no top wrapper) |
| `packages/tokens/dist/json/semantic.json` | Semantic tokens |
| `packages/tokens/dist/json/utilities.json` | Utility tokens |
| `packages/tokens/dist/css/base.css` | CSS custom properties with resolved values |
| `packages/icons/src/icons/index.ts` | Barrel exports for all ~355 icons |
| `packages/icons/icons/` | Source SVG folders with 5 size variants each (12/16/20/24/32) |
| `storybook-docs/stories/*.mdx` | 3 documentation guides |

---

## Verification

1. **Package builds**: `pnpm --filter @frontify/fondue-components build` produces `dist/manifest.json` with ~38 components
2. **Package builds**: `pnpm --filter @frontify/fondue-icons build` produces `dist/manifest.json` with ~355 icons
3. **MCP build**: `pnpm --filter @frontify/fondue-mcp-server build` completes without errors
4. **Manual test**: Run server with `npx tsx packages/mcp-server/src/index.ts` and test with MCP Inspector or Claude Code
5. **Tool tests**: Each tool returns correct results:
   - `search_components({ query: "button" })` → finds Button, SplitButton
   - `get_component({ name: "Button" })` → returns all ButtonProps with types/defaults
   - `search_tokens({ query: "primary" })` → returns color-primary-* tokens
   - `search_icons({ query: "arrow" })` → returns all arrow icons
   - `get_documentation({ topic: "getting-started" })` → returns full MDX content
6. **Claude Code integration**: Add to `.claude/settings.json` and verify tools appear
