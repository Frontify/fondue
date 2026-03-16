# @frontify/fondue-rte

## 0.1.1

### Patch Changes

- [#2660](https://github.com/Frontify/fondue/pull/2660) [`4804668`](https://github.com/Frontify/fondue/commit/48046687aa920257eca5f0c363ec5b5c1b9e2d40) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): close text style dropdown on click

- [#2663](https://github.com/Frontify/fondue/pull/2663) [`957c716`](https://github.com/Frontify/fondue/commit/957c7166bc7e8d19e07e069a38e21c0fe7a3984a) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): toolbar position is not calculated properly

- Updated dependencies [[`3ed56a6`](https://github.com/Frontify/fondue/commit/3ed56a6185d9f96959d8e38d34b34bbb6d526fde), [`2e5534d`](https://github.com/Frontify/fondue/commit/2e5534d53a8587786311f011b32f1bf9c4e55454), [`16899f6`](https://github.com/Frontify/fondue/commit/16899f6005f9ec2bf63f6ebe5ed7467b53c27a98), [`4794c76`](https://github.com/Frontify/fondue/commit/4794c762088e99a3a8da5160c4a9cb21e32019f4), [`dab4cef`](https://github.com/Frontify/fondue/commit/dab4cef3c76d71b115142fc465b3259ce5e3e97b), [`500b8de`](https://github.com/Frontify/fondue/commit/500b8de27ce5d50e8b37929e32dd61cfd348ce6b)]:
    - @frontify/fondue-components@29.0.0
    - @frontify/fondue-icons@0.25.0
    - @frontify/fondue-tokens@5.0.0

## 0.1.0

### Minor Changes

- [#2637](https://github.com/Frontify/fondue/pull/2637) [`701d6ee`](https://github.com/Frontify/fondue/commit/701d6ee6d1ffad292cbfd5d880aa8b821559029e) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - feat(\*): add custom list styles

    Adds support for configurable list styles in the `UnorderedListPlugin` and `OrderedListPlugin`.
    The styles can be customized per nesting level.

    ```ts
    new UnorderedListPlugin({
        listStyles: [
            { color: 'var(--f-theme-settings-list-bullet-1-color)', shape: 'var(--f-theme-settings-list-bullet-1-shape)', size: 'var(--f-theme-settings-list-bullet-1-size)' },
            { color: 'var(--f-theme-settings-list-bullet-2-color)', shape: 'var(--f-theme-settings-list-bullet-2-shape)', size: 'var(--f-theme-settings-list-bullet-2-size)' },
            { color: 'var(--f-theme-settings-list-bullet-3-color)', shape: 'var(--f-theme-settings-list-bullet-3-shape)', size: 'var(--f-theme-settings-list-bullet-3-size)' },
        ],
    }),

    new OrderedListPlugin({
        listStyles: [
            { counterType: 'var(--f-theme-settings-list-numbered-1-counterType)', color: 'var(--f-theme-settings-list-numbered-1-color)' },
            { counterType: 'var(--f-theme-settings-list-numbered-2-counterType)', color: 'var(--f-theme-settings-list-numbered-2-color)' },
            { counterType: 'var(--f-theme-settings-list-numbered-3-counterType)', color: 'var(--f-theme-settings-list-numbered-3-color)' },
        ],
    }),
    ```

### Patch Changes

- [#2648](https://github.com/Frontify/fondue/pull/2648) [`b093e77`](https://github.com/Frontify/fondue/commit/b093e77996ea99fa32b17a71b78de37b51398904) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(MentionPlugin): adjust serialized rendering

- Updated dependencies [[`f9216f3`](https://github.com/Frontify/fondue/commit/f9216f33c2f37dc65531717f0aefe1ac8654cdfe)]:
    - @frontify/fondue-components@28.0.0
    - @frontify/fondue-tokens@5.0.0

## 0.0.4

### Patch Changes

- [#2626](https://github.com/Frontify/fondue/pull/2626) [`5f743cc`](https://github.com/Frontify/fondue/commit/5f743cc194d034bfb5b2a06af090458d08b7d2f7) Thanks [@joelharkes](https://github.com/joelharkes)! - Fix building FontColorPlugin, module name could not be resolved.

- [#2635](https://github.com/Frontify/fondue/pull/2635) [`70300ec`](https://github.com/Frontify/fondue/commit/70300ec66f3de0351bb68bc5588cf3c669eb9706) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(MentionPlugin): mentions are not properly serialized

- Updated dependencies [[`e8cf780`](https://github.com/Frontify/fondue/commit/e8cf7807a7856c8535b40e75682054eb2749ccb8), [`39a18ec`](https://github.com/Frontify/fondue/commit/39a18ec58cb6d3b4bfffd3cc48b311b59e91bda2), [`49665d9`](https://github.com/Frontify/fondue/commit/49665d9d3e14c956e0da9089b12af01a5dce7ecc)]:
    - @frontify/fondue-components@27.0.0
    - @frontify/fondue-tokens@5.0.0

## 0.0.3

### Patch Changes

- [`80d58b0`](https://github.com/Frontify/fondue/commit/80d58b07a7026cda8b47299558e07ada953afdb9) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - chore: update fondue export json

- Updated dependencies [[`80d58b0`](https://github.com/Frontify/fondue/commit/80d58b07a7026cda8b47299558e07ada953afdb9)]:
    - @frontify/fondue-components@26.0.1
    - @frontify/fondue-icons@0.24.1
    - @frontify/fondue-tokens@5.0.0

## 0.0.2

### Patch Changes

- [#2617](https://github.com/Frontify/fondue/pull/2617) [`0f59d44`](https://github.com/Frontify/fondue/commit/0f59d4448399c396e691ee46150f7f2786f3d325) Thanks [@peter-tudosa](https://github.com/peter-tudosa)! - Add selector for the new dialogs for RTE click outside logic

- Updated dependencies [[`31f7341`](https://github.com/Frontify/fondue/commit/31f7341a466649fac3363d4a753fd8101d4fb4cb), [`0509788`](https://github.com/Frontify/fondue/commit/050978884da4e1c654f1a2d8cbb36f49950bcaa3)]:
    - @frontify/fondue-components@26.0.0
    - @frontify/fondue-icons@0.24.0
    - @frontify/fondue-tokens@5.0.0

## 0.0.1

### Patch Changes

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: adjust rte toolbar

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: upgrade `@types/react`and adjust legacy `TooltipIcon` to work with new icons

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - refactor: update link color and keyboard shortcut

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - chore: release all packages

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - chore: update dependencies

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: downgrade immer to fix issue with hotkeys

- [#2610](https://github.com/Frontify/fondue/pull/2610) [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: fix tests and linting

- Updated dependencies [[`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`bfa2903`](https://github.com/Frontify/fondue/commit/bfa29038ada10805ccf4d52e4f4034aea4c7163a), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`eb292a2`](https://github.com/Frontify/fondue/commit/eb292a255c4b8459f3ca0e06d5fbfcd3d155ca4b), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669), [`b4e77b9`](https://github.com/Frontify/fondue/commit/b4e77b9aed5c78aecdeb2de98e9634dc9951f669)]:
    - @frontify/fondue-components@25.0.0
    - @frontify/fondue-icons@0.23.0
    - @frontify/fondue-tokens@5.0.0
    - @frontify/fondue-charts@7.0.0

## 0.0.1-rc.12

### Patch Changes

- [#2608](https://github.com/Frontify/fondue/pull/2608) [`682c415`](https://github.com/Frontify/fondue/commit/682c4156d1458302a36a71a17f91efc72dd3b667) Thanks [@peter-tudosa](https://github.com/peter-tudosa)! - refactor: update link color and keyboard shortcut

- [#2609](https://github.com/Frontify/fondue/pull/2609) [`0ab6e64`](https://github.com/Frontify/fondue/commit/0ab6e64e3bdf1198f89f7d946c44cad003185d2a) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - chore: update dependencies

- Updated dependencies [[`0bf06d0`](https://github.com/Frontify/fondue/commit/0bf06d03217ff2b8c3ccaa3c4e9e573981e520e2), [`19f55b5`](https://github.com/Frontify/fondue/commit/19f55b50fa30f51e21305ec58653b78545a5d1aa), [`64de9ad`](https://github.com/Frontify/fondue/commit/64de9adab9080e5414ed95d5d97f10dedb3cb7e2), [`7d0e2bf`](https://github.com/Frontify/fondue/commit/7d0e2bf98768f1b131e12526e6f1f067e35dd345), [`7952ccf`](https://github.com/Frontify/fondue/commit/7952ccf0083efddcbf3ff453430981d18da2fb3b), [`0ab6e64`](https://github.com/Frontify/fondue/commit/0ab6e64e3bdf1198f89f7d946c44cad003185d2a), [`e888ea6`](https://github.com/Frontify/fondue/commit/e888ea616ddc4f8e7abd54572796fc0022c77fa5), [`98dbeb6`](https://github.com/Frontify/fondue/commit/98dbeb6794a5960685db5520267a0f5a2a736fe8)]:
    - @frontify/fondue-components@25.0.0-rc.6
    - @frontify/fondue-tokens@5.0.0-rc.6
    - @frontify/fondue-charts@7.0.0-rc.7
    - @frontify/fondue-icons@0.23.0-rc.5

## 0.0.1-rc.11

### Patch Changes

- [#2596](https://github.com/Frontify/fondue/pull/2596) [`f62de74`](https://github.com/Frontify/fondue/commit/f62de743188570ce7fe3cb1b9e3a00f2823e7354) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: downgrade immer to fix issue with hotkeys

- Updated dependencies [[`f62de74`](https://github.com/Frontify/fondue/commit/f62de743188570ce7fe3cb1b9e3a00f2823e7354)]:
    - @frontify/fondue-components@25.0.0-rc.5
    - @frontify/fondue-charts@7.0.0-rc.6
    - @frontify/fondue-tokens@5.0.0-rc.5
    - @frontify/fondue-icons@0.23.0-rc.4

## 0.0.1-rc.10

### Patch Changes

- [#2594](https://github.com/Frontify/fondue/pull/2594) [`049e77d`](https://github.com/Frontify/fondue/commit/049e77df0875a20fd00ec4c570a9f02b0252d874) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore: release all packages

- Updated dependencies [[`049e77d`](https://github.com/Frontify/fondue/commit/049e77df0875a20fd00ec4c570a9f02b0252d874), [`4e21dbc`](https://github.com/Frontify/fondue/commit/4e21dbcf8b9058d720c0ca704b1153717222fd3d)]:
    - @frontify/fondue-components@25.0.0-rc.4
    - @frontify/fondue-charts@7.0.0-rc.5
    - @frontify/fondue-tokens@5.0.0-rc.4
    - @frontify/fondue-icons@0.23.0-rc.3

## 0.0.1-rc.9

### Patch Changes

- [#2583](https://github.com/Frontify/fondue/pull/2583) [`0b953d7`](https://github.com/Frontify/fondue/commit/0b953d7e0098cefc60a845fd67e0b8d46fb5098c) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: upgrade `@types/react`and adjust legacy `TooltipIcon` to work with new icons

- Updated dependencies [[`8a33af1`](https://github.com/Frontify/fondue/commit/8a33af120b8379fdd5ee3164af9e8901ecf4f7cb), [`0b953d7`](https://github.com/Frontify/fondue/commit/0b953d7e0098cefc60a845fd67e0b8d46fb5098c), [`1ff2cab`](https://github.com/Frontify/fondue/commit/1ff2cab1dd80d104b762a78b978cfdc06b70da3b), [`888ae9b`](https://github.com/Frontify/fondue/commit/888ae9b0056762c802a9c60626b44cb71d7e925c), [`46016ad`](https://github.com/Frontify/fondue/commit/46016ad4ce7f7a05c5fc666311e5815eec791514), [`2f33abe`](https://github.com/Frontify/fondue/commit/2f33abe5b6b8a1c4719b5dca01519ac980292044), [`77e5ab9`](https://github.com/Frontify/fondue/commit/77e5ab9d24477a94865497f544d1ac06d221d4a1), [`e9f4ebd`](https://github.com/Frontify/fondue/commit/e9f4ebd640f775c5813bf77d4fe038bd18dd674f), [`cfc1142`](https://github.com/Frontify/fondue/commit/cfc11424a43ecb18547f4c6035c4dd56cc351799), [`493b333`](https://github.com/Frontify/fondue/commit/493b33342f695f43c3371a9d5ab852babb5ffca6)]:
    - @frontify/fondue-components@25.0.0-rc.3
    - @frontify/fondue-charts@7.0.0-rc.4
    - @frontify/fondue-tokens@5.0.0-rc.3
    - @frontify/fondue-icons@0.23.0-rc.2

## 0.0.1-rc.8

### Patch Changes

- [#2555](https://github.com/Frontify/fondue/pull/2555) [`1a4c800`](https://github.com/Frontify/fondue/commit/1a4c800a2f992e6bb3c3590737abce0448110a0f) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: adjust rte toolbar

## 0.0.1-rc.7

### Patch Changes

- Updated dependencies [[`9033c88`](https://github.com/Frontify/fondue/commit/9033c886f71d43c3a051ef7bccca6e63f5af1e0d), [`3a4f967`](https://github.com/Frontify/fondue/commit/3a4f967614fb290ea3af0811ff2aa09d30cae226)]:
    - @frontify/fondue-components@25.0.0-rc.0
    - @frontify/fondue-icons@0.23.0-rc.0
    - @frontify/fondue-tokens@5.0.0-rc.2

## 0.0.1-rc.6

### Patch Changes

- [`a4df74d`](https://github.com/Frontify/fondue/commit/a4df74dab2328a2afe0505a1afd34b57d233106c) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: fix tests and linting
