# @frontify/fondue-sdk

## 0.2.4

### Patch Changes

- Updated dependencies [[`56f03e4`](https://github.com/Frontify/fondue/commit/56f03e4a733e88e21f0b5c9a367b1d7176148355)]:
    - @frontify/fondue-components@33.1.0
    - @frontify/fondue-tokens@5.1.2

## 0.2.3

### Patch Changes

- [#2872](https://github.com/Frontify/fondue/pull/2872) [`1711a8a`](https://github.com/Frontify/fondue/commit/1711a8a40a51bc16962a8067df68bd73dc7f1703) Thanks [@noahwaldner](https://github.com/noahwaldner)! - docs: clarify setup requirements (React 18, Tailwind v3, `tw-` prefix, PostCSS), document colour pairings and page theming, and fix guide ids and utility class examples in the fondue skill

- [#2872](https://github.com/Frontify/fondue/pull/2872) [`1711a8a`](https://github.com/Frontify/fondue/commit/1711a8a40a51bc16962a8067df68bd73dc7f1703) Thanks [@noahwaldner](https://github.com/noahwaldner)! - docs: ship the SDK documentation (usage, concepts, reference, examples) as `sdk/*` guides so it renders in Storybook and can be read through `guides.get()`; the fondue skill now reads `sdk/Reference` from the installed version instead of bundling its own reference

- Updated dependencies [[`1711a8a`](https://github.com/Frontify/fondue/commit/1711a8a40a51bc16962a8067df68bd73dc7f1703), [`557a49d`](https://github.com/Frontify/fondue/commit/557a49dc1226498e121660acc2869d47610eca48), [`1711a8a`](https://github.com/Frontify/fondue/commit/1711a8a40a51bc16962a8067df68bd73dc7f1703), [`cff52fb`](https://github.com/Frontify/fondue/commit/cff52fbfb2349bffae3b498a72a01d959d98942f), [`9e83eee`](https://github.com/Frontify/fondue/commit/9e83eee7cf76830d5e6e1f28e5dd72fde8036393), [`1711a8a`](https://github.com/Frontify/fondue/commit/1711a8a40a51bc16962a8067df68bd73dc7f1703), [`07d0eb8`](https://github.com/Frontify/fondue/commit/07d0eb8b048b119cbc251bd77618b667563e1c3f), [`5f55b89`](https://github.com/Frontify/fondue/commit/5f55b892dd6ce8fd9ba9c744c4e95df01cf0e816)]:
    - @frontify/fondue-components@33.0.2
    - @frontify/fondue-icons@0.29.1
    - @frontify/fondue-tokens@5.1.2

## 0.2.2

### Patch Changes

- [#2847](https://github.com/Frontify/fondue/pull/2847) [`bab07c2`](https://github.com/Frontify/fondue/commit/bab07c2f5b12c0f39e82107f0cf52a05e2d9a0f2) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(Select): add indeterminate values to the multi-select variants

    `Select.Multi` and `Select.Combobox.Multiple` accept `indeterminateValues` for values that apply to
    only some of the records being edited. Those options render a dash instead of a checkmark and the
    field gains a "2 mixed" badge next to the selection badges.

    The prop is purely visual and never reported by `onSelect`. Once the user selects such a value,
    remove it from `indeterminateValues`; otherwise the dash returns as soon as it is deselected again.

    In a narrow field the selection badges collapse into a "3 selected" badge instead of a lone clipped
    badge, and into a single "Mixed" badge when not even the counts fit next to each other.

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
