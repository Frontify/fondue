# AGENTS.md

An app that uses Fondue needs a different guide: the Fondue skill and SDK in [`packages/sdk/skills/fondue/SKILL.md`](./packages/sdk/skills/fondue/SKILL.md).

## Repo map

```
fondue/                     @frontify/fondue: one package that re-exports the others
packages/components/        @frontify/fondue-components
packages/icons/             @frontify/fondue-icons
packages/tokens/            @frontify/fondue-tokens
packages/charts/            @frontify/fondue-charts
packages/rich-text-editor/  @frontify/fondue-rich-text-editor, the new editor
packages/rte/               @frontify/fondue-rte, the old editor
packages/sdk/               @frontify/fondue-sdk: Fondue's components, icons and tokens as data for agents and tools
storybook-docs/             The Storybook that joins every package's Storybook
```

## Commands

### Setup

`pnpm i`, then `pnpm build`. Storybook needs the build first.

### Validation

Run in the package you changed: `pnpm typecheck` and `pnpm lint`. From the root, the same scripts check every package.

### Test

Run `pnpm test` in the package you changed. The root has no test script.

## Rules

1. **Mark a breaking change with `!`.** A change that removes, moves or renames public API is breaking. Put `!` after the prefix that CONTRIBUTING.md lists, in both the changeset description and the PR title: `feat(RichTextEditor)!: …`.
2. **Say when a barrel is a package entry.** A barrel file (an `index.ts` that only re-exports) that a `package.json` `exports` path points at has this comment line: ``// The `<entry>` package entry: every export here is public API.``
