# Manifest Generation

Generates a per-component `ComponentName.manifest.json` and a global `manifest.json` index from source files at build time. Consumed by CLI tools and MCP servers without runtime parsing. Storybook-independent.

## Usage

```sh
pnpm build:manifest
```

Output files are gitignored (`*.manifest.json`, `/manifest.json`).

---

## Output

### Per-component — `src/components/Button/Button.manifest.json`

```jsonc
{
  "name": "Button",
  "description": "A button component for triggering actions.",
  "status": "stable",
  "category": "input",
  "tags": ["button", "action", "cta"],
  "relatedComponents": ["Link", "SplitButton"],
  "importStatement": "import { Button } from '@frontify/fondue-components';",
  "filePath": "src/components/Button/Button.tsx",
  "props": [
    {
      "name": "variant",
      "type": "\"default\" | \"positive\" | \"negative\" | \"danger\" | \"loud\"",
      "required": false,
      "defaultValue": "default",
      "description": ""
    }
  ],
  "subComponents": [
    {
      "name": "Select.Item",
      "props": [ /* same shape */ ]
    }
  ],
  "examples": [
    {
      "name": "Default",
      "storyName": "Icon and Text Label",
      "description": "Use this for primary CTAs",
      "isCanonical": true,
      "code": "<Button variant=\"loud\">Submit</Button>",
      "sourceFile": "Button.stories.tsx"
    }
  ],
  "instructions": "## Usage\nUse Button for actions, Link for navigation..."
}
```

### Global index — `manifest.json` (package root)

Contains only lightweight references to avoid duplication. Load the per-component file for full data.

```jsonc
{
  "schemaVersion": "1.0.0",
  "packageName": "@frontify/fondue-components",
  "generatedAt": "2026-03-20T14:30:00.000Z",
  "components": {
    "Button": {
      "name": "Button",
      "description": "A button component for triggering actions.",
      "status": "stable",
      "category": "input",
      "tags": ["button", "action", "cta"],
      "subComponentNames": [],
      "manifestPath": "src/components/Button/Button.manifest.json"
    }
  }
}
```

---

## Pipeline

```
src/components/**/*.metadata.json
    └─ discoverComponents()       → [ { name, filePath, dirPath, storyFilePaths } ]
           │     globs for *.metadata.json files
           │     filePath + storyFilePaths read from each file
           │     skips entries with no filePath
           │
           ├─ extractProps()       → props[], subComponents[]
           │     react-docgen-typescript on component filePath
           │     forwardRef wrappers resolved via AST displayName scan
           │     #/* path aliases resolved via compiler options
           │
           ├─ parseStories()       → { examples[], status }
           │     ts.createSourceFile() on storyFilePaths
           │     render functions → raw JSX text
           │     {…args} spreads resolved to inlined props
           │     args-only stories → synthesized JSX
           │     action('...') replaced with () => {}
           │     parameters.manifest.canonical → isCanonical flag
           │     meta.parameters.status.type → status
           │
           ├─ readMetadata()       → { description, category, tags, relatedComponents, instructions }
           │     same ComponentName.metadata.json file
           │     filePath/storyFilePaths fields ignored here (used in discovery)
           │
           └─ assembleManifest()   → writes ComponentName.manifest.json
                                     writes manifest.json
```

---

## Adding metadata to a component

Create `src/components/MyComponent/MyComponent.metadata.json`:

```json
{
  "filePath": "src/components/Button/Button.tsx",
  "storyFilePaths": ["src/components/Button/Button.stories.tsx"],
  "description": "One-line description shown in the global index.",
  "category": "input",
  "tags": ["button", "action"],
  "relatedComponents": ["Link", "SplitButton"],
  "instructions": "Use Button for actions, Link for navigation.\n\nAvoid using more than one loud variant per view."
}
```

`filePath` and `storyFilePaths` are required for discovery — a component without `filePath` is skipped. All other fields are optional. Re-run `pnpm build:manifest` to pick up changes.

New components scaffolded with `pnpm create:component` get a pre-filled `.metadata.json` automatically.

### Fields

| Field | Type | Description |
|---|---|---|
| `filePath` | string | Path to the component source file (required) |
| `storyFilePaths` | string[] | Paths to story files (empty array = no examples) |
| `description` | string | One-line summary, shown in the global index |
| `category` | string | e.g. `input`, `layout`, `overlay`, `feedback` |
| `tags` | string[] | Keywords for discovery |
| `relatedComponents` | string[] | Names of related components |
| `instructions` | string | LLM-facing usage guidance, gotchas, patterns |

> **`status`** is sourced automatically from `meta.parameters.status.type` in the Storybook story file — no need to set it here.

---

## Adding per-example descriptions and marking canonical examples

In any story export, use `parameters`:

```ts
export const Loud: Story = {
    args: { variant: 'loud' },
    parameters: {
        docs: {
            description: {
                story: 'Use the loud variant for primary CTAs.',
            },
        },
        manifest: {
            canonical: true,  // marks this as the recommended minimal example
        },
    },
};
```

`isCanonical: true` on an example signals to consumers (CLI, MCP) that this is the best starting point for the component. Only one example per component should be canonical.

---

## Source files

| File | Role |
|------|------|
| `scripts/buildManifest.ts` | Orchestrator entry point |
| `scripts/buildManifest/types.ts` | TypeScript interfaces for manifest schema |
| `scripts/buildManifest/discoverComponents.ts` | Parses `src/index.ts` to get component list and paths |
| `scripts/buildManifest/extractProps.ts` | `react-docgen-typescript` wrapper with path alias + forwardRef resolution |
| `scripts/buildManifest/parseStories.ts` | AST story parser — extracts JSX examples and descriptions |
| `scripts/buildManifest/readMetadata.ts` | Reads `.metadata.json` files |
| `scripts/buildManifest/assembleManifest.ts` | Combines all data and writes JSON output |
| `scripts/buildManifest/utils.ts` | Logging and path helpers |
| `scripts/templates/component.metadata.ts` | Scaffolding template for `.metadata.json` |
