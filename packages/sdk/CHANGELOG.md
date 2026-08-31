# @frontify/fondue-sdk

## 0.2.1

### Patch Changes

- [#2831](https://github.com/Frontify/fondue/pull/2831) [`9fd6a43`](https://github.com/Frontify/fondue/commit/9fd6a436b253530d1b7782a358ccccfaad1ecc05) Thanks [@noahwaldner](https://github.com/noahwaldner)! - pathc: update vite version to 6.x to patch cve

## 0.2.0

### Minor Changes

- [#2801](https://github.com/Frontify/fondue/pull/2801) [`a086574`](https://github.com/Frontify/fondue/commit/a086574a656be667b17f780fca44abf769ad6e37) Thanks [@noahwaldner](https://github.com/noahwaldner)! - Harden the Fondue SDK contract ahead of the 1.0 release (still prerelease, 0.x):
    - **Component `status` is now always set.** The manifest parser understands `const meta = { … } satisfies Meta<…>` story files, the six components whose stories weren't wired up (`LoadingBar`, `LoadingCircle`, `RouterProvider`, `Section`, `Text`, `ThemeProvider`) now expose their Storybook status, and icons are bundled as `'released'`.
    - **Data-derived literal unions.** `status`, `category`, and token `category` are typed as `ComponentStatus`, `ComponentCategory`, and `TokenCategory` (exported), so a typo in a filter fails at compile time instead of silently matching nothing.
    - **New `components.statuses()` / `components.status(name)` facet accessors**, mirroring categories and tags.
    - **Uniform identity.** Every entity now carries a canonical `id`; for components it equals `name`. The redundant `ComponentDetails.subComponentNames` was dropped (use `subComponents[].name`).
    - **`null` for not-applicable fields.** `ComponentNode.instructions` and `ComponentProp.deprecationMessage` are `string | null` instead of sometimes-empty strings; `Token.cssVariable` is `string | null` for inlined-literal tokens.
    - **Segment-aware `keyPathStartsWith`.** The prefix `'colors.chart'` no longer matches `colors.charts.*`; filter edge cases (empty-array clauses, empty `text`) are now documented behavior.
    - **Deep-frozen data.** Nodes, `toJSON()` payloads, and the arrays returned by `list()` are frozen — mutating shared SDK state now throws instead of silently corrupting other consumers.
    - **Build-time data validation.** The SDK build fails on missing statuses/categories, dangling `relatedComponents` references, duplicate ids, and token/cssVariable inconsistencies.
    - **Packaging:** `sideEffects: false`, engines bumped to Node 20+, and the `*`-prefix `tailwindClass` placeholder convention is documented.

### Patch Changes

- [#2802](https://github.com/Frontify/fondue/pull/2802) [`24f103b`](https://github.com/Frontify/fondue/commit/24f103bc8990839922922123256d3a5727cd9524) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: split up the guides into smaller files

- [#2799](https://github.com/Frontify/fondue/pull/2799) [`033ffae`](https://github.com/Frontify/fondue/commit/033ffae60a7a23306638570a83083ec00bea8d74) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: remove custom skill install script

## 0.1.3

### Patch Changes

- [#2783](https://github.com/Frontify/fondue/pull/2783) [`6631e8a`](https://github.com/Frontify/fondue/commit/6631e8ab1b639fcd60de23760a6437c1086baa2c) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: add new font family tokens

## 0.1.2

### Patch Changes

- [#2768](https://github.com/Frontify/fondue/pull/2768) [`cf5c6df`](https://github.com/Frontify/fondue/commit/cf5c6df9b95a4b106c91b2259ac205c996a1314c) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: add new border-radius token

## 0.1.1

### Patch Changes

- [#2735](https://github.com/Frontify/fondue/pull/2735) [`ec9720e`](https://github.com/Frontify/fondue/commit/ec9720e81bf8dcbae59b98a02e5eb463936e2923) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: add fondue sdk package
