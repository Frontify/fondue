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
      "manifestPath": "src/components/Button/Button.manifest.json"
    }
  }
}
```

---

## Pipeline

```
src/index.ts
    └─ discoverComponents()       → [ { name, filePath, dirPath } ]
           │
           ├─ extractProps()       → props[], subComponents[]
           │     react-docgen-typescript on all *.tsx in component dir
           │     forwardRef wrappers resolved via AST displayName scan
           │     #/* path aliases resolved via compiler options
           │
           ├─ parseStories()       → examples[]
           │     ts.createSourceFile() on *.stories.tsx
           │     render functions → raw JSX text
           │     args-only stories → synthesized JSX
           │     action('...') replaced with () => {}
           │     multiple story files per component supported
           │
           ├─ readMetadata()       → { description, instructions }
           │     ComponentName.metadata.md (optional)
           │     frontmatter: description, status
           │     markdown body → instructions field
           │
           └─ assembleManifest()   → writes ComponentName.manifest.json
                                     writes manifest.json
```

---

## Adding instructions to a component

Create `src/components/MyComponent/MyComponent.metadata.md`:

```markdown
---
description: "One-line description shown in the global index."
status: released
---

## Usage Guidelines

Describe when and how to use this component.
```

The frontmatter `description` overrides auto-extracted descriptions. The markdown body becomes the `instructions` field in the manifest. Re-run `pnpm build:manifest` to pick up changes.

New components scaffolded with `pnpm create:component` get a pre-filled `.metadata.md` automatically.

---

## Adding per-example descriptions

In any story export, set `parameters.docs.description.story`:

```ts
export const Loud: Story = {
    args: { variant: 'loud' },
    parameters: {
        docs: {
            description: {
                story: 'Use the loud variant for primary CTAs.',
            },
        },
    },
};
```

---

## Source files

| File | Role |
|------|------|
| `scripts/buildManifest.ts` | Orchestrator entry point |
| `scripts/buildManifest/types.ts` | TypeScript interfaces for manifest schema |
| `scripts/buildManifest/discoverComponents.ts` | Parses `src/index.ts` to get component list and paths |
| `scripts/buildManifest/extractProps.ts` | `react-docgen-typescript` wrapper with path alias + forwardRef resolution |
| `scripts/buildManifest/parseStories.ts` | AST story parser — extracts JSX examples and descriptions |
| `scripts/buildManifest/readMetadata.ts` | Reads `.metadata.md` files via `gray-matter` |
| `scripts/buildManifest/assembleManifest.ts` | Combines all data and writes JSON output |
| `scripts/buildManifest/utils.ts` | Logging and path helpers |
| `scripts/templates/component.metadata.ts` | Scaffolding template for `.metadata.md` |
