---
'@frontify/fondue-sdk': minor
'@frontify/fondue-components': patch
'@frontify/fondue': patch
---

Harden the Fondue SDK contract ahead of release:

- **Component `status` is now always set.** The manifest parser understands `const meta = { … } satisfies Meta<…>` story files, the six components whose stories weren't wired up (`LoadingBar`, `LoadingCircle`, `RouterProvider`, `Section`, `Text`, `ThemeProvider`) now expose their Storybook status, and icons are bundled as `'released'`.
- **Data-derived literal unions.** `status`, `category`, and token `category` are typed as `ComponentStatus`, `ComponentCategory`, and `TokenCategory` (exported), so a typo in a filter fails at compile time instead of silently matching nothing.
- **New `components.statuses()` / `components.status(name)` facet accessors**, mirroring categories and tags.
- **`null` for not-applicable fields.** `ComponentNode.instructions` and `ComponentProp.deprecationMessage` are `string | null` instead of sometimes-empty strings; `Token.cssVariable` is `string | null` for inlined-literal tokens.
- **Deep-frozen data.** Nodes, `toJSON()` payloads, and the arrays returned by `list()` are frozen — mutating shared SDK state now throws instead of silently corrupting other consumers.
- **Build-time data validation.** The SDK build fails on missing statuses/categories, dangling `relatedComponents` references, duplicate ids, and token/cssVariable inconsistencies.
