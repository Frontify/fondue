---
'@frontify/fondue-sdk': minor
'@frontify/fondue-components': patch
'@frontify/fondue': patch
---

Harden the Fondue SDK contract ahead of the 1.0 release (still prerelease, 0.x):

- **Component `status` is now always set.** The manifest parser understands `const meta = { … } satisfies Meta<…>` story files, the six components whose stories weren't wired up (`LoadingBar`, `LoadingCircle`, `RouterProvider`, `Section`, `Text`, `ThemeProvider`) now expose their Storybook status, and icons are bundled as `'released'`.
- **Data-derived literal unions.** `status`, `category`, and token `category` are typed as `ComponentStatus`, `ComponentCategory`, and `TokenCategory` (exported), so a typo in a filter fails at compile time instead of silently matching nothing.
- **New `components.statuses()` / `components.status(name)` facet accessors**, mirroring categories and tags.
- **Uniform identity.** Every entity now carries a canonical `id`; for components it equals `name`. The redundant `ComponentDetails.subComponentNames` was dropped (use `subComponents[].name`).
- **`null` for not-applicable fields.** `ComponentNode.instructions` and `ComponentProp.deprecationMessage` are `string | null` instead of sometimes-empty strings; `Token.cssVariable` is `string | null` for inlined-literal tokens.
- **Segment-aware `keyPathStartsWith`.** The prefix `'colors.chart'` no longer matches `colors.charts.*`; filter edge cases (empty-array clauses, empty `text`) are now documented behavior.
- **Deep-frozen data.** Nodes, `toJSON()` payloads, and the arrays returned by `list()` are frozen — mutating shared SDK state now throws instead of silently corrupting other consumers.
- **Build-time data validation.** The SDK build fails on missing statuses/categories, dangling `relatedComponents` references, duplicate ids, and token/cssVariable inconsistencies.
- **Packaging:** `sideEffects: false`, engines bumped to Node 20+, and the `*`-prefix `tailwindClass` placeholder convention is documented.
