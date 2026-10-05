---
type: matrix
id: CORPUS-platform
title: Web platform features for the rich text editor
updated: 2026-10-04
---

# Web platform features

This matrix lists the ECMAScript, CSS and web API features that the editor can use, with their Baseline status and their support at the browser floor of ADR 0011. `build_platform.py` writes it from primary compatibility data. Do not edit it by hand.

Sources:

- `web-features` 3.40.1 (`data/package/data.json`), the data behind Baseline on MDN and caniuse.
- browserslist 4.29.3, query `defaults and not op_mini all and not kaios > 0`, resolved on 2026-10-04 to: and_chr 154, and_ff 157, and_qq 14.9, and_uc 15.5, android 154, chrome 109 to 154, edge 150 to 154, firefox 153 to 157, ios_saf 18.5 to 27.0, op_mob 80, opera 134 and 135, safari 26.5 to 27, samsung 29 and 30.

The floor column checks the oldest floor version of each Baseline core browser: Chrome 109, Chrome Android 154, Edge 150, Firefox 153, Firefox Android 157, Safari 26.5 and Safari on iOS 18.5. Samsung Internet, Opera, UC Browser and QQ Browser are Chromium-based and are not in the Baseline core set. A feature that a floor browser lacks needs a fallback inside the package or a polyfill that the host loads (INTENT, Platform).

Two facts shape the use of this matrix. web-app does not compile `node_modules`, so the package must publish syntax that the floor runs. web-app's LightningCSS minifier does lower CSS, such as nesting, for `defaults`.

## Editing and input

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `contenteditable` contenteditable | The editing surface. | widely available | 2015-07-29 | yes |
| `contenteditable-plaintextonly` contenteditable="plaintext-only" | Plain text editing for code blocks and inline fields. | newly available | 2025-03-04 | yes |
| `input-event` input (event) | The input and beforeinput events that the engine reads. | widely available | 2020-01-15 | yes |
| `selection-api` Selection | Reading and setting the selection. | widely available | 2017-03-07 | yes |
| `composed-ranges` Selection composed ranges | Selection inside shadow roots. | newly available | 2025-08-19 | no: chrome 137 |
| `edit-context` EditContext | Decoupling text input from the DOM. | limited |  | no: chrome 121, firefox, firefox_android, safari, safari_ios |
| `highlight` Custom highlights | Decorations without DOM changes, such as find matches and checker marks. | newly available | 2026-03-24 | yes |
| `intl-segmenter` Intl.Segmenter | Grapheme-aware caret moves and character counts. | newly available | 2024-04-16 | yes |

## Clipboard and drag and drop

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `clipboard-events` Clipboard events | Copy, cut and paste events. | widely available | 2017-03-27 | yes |
| `async-clipboard` Async clipboard | Programmatic copy and paste, such as a paste-as-plain-text command. | newly available | 2024-06-11 | yes |
| `clipboard-custom-format` Custom formats for clipboard items | An internal clipboard format. | limited |  | no: firefox, firefox_android, safari, safari_ios |
| `draganddrop` Drag and Drop | Dragging blocks and files. | widely available | 2015-07-29 | yes |
| `domparser` DOMParser | Parsing pasted HTML into an inert document. | widely available | 2016-03-21 | yes |
| `sanitizer` Sanitizer API | The HTML Sanitizer API. | limited |  | no: chrome 146, safari, safari_ios |
| `trusted-types` Trusted types | Trusted Types for HTML sinks. | newly available | 2026-02-24 | no: safari_ios 26 |

## Media and identity

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `webcodecs` WebCodecs | ImageDecoder, which tells whether an uploaded image is animated, behind a guarded helper with a fallback. | limited |  | no: firefox_android, safari_ios 26 |
| `web-cryptography` Web Cryptography | Random node IDs: `crypto.randomUUID` in secure contexts, else a version 4 UUID from `crypto.getRandomValues`. | widely available | 2017-09-19 | yes |

## Overlays and focus

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `popover` Popover | Toolbars, menus and the link bubble in the top layer. | newly available | 2025-01-27 | no: chrome 116 |
| `dialog` <dialog> | Modal dialogs. | widely available | 2022-03-14 | yes |
| `anchor-positioning` Anchor positioning | Placing a popover next to its anchor in CSS. | limited |  | no: chrome, chrome_android, edge, firefox, firefox_android, safari 27, safari_ios 27 |
| `inert` inert | Making the page behind a modal unreachable. | widely available | 2023-04-11 | yes |
| `focus-visible` :focus-visible | A focus ring only for keyboard focus. | widely available | 2022-03-14 | yes |
| `invoker-commands` Invoker commands | Buttons that open popovers and dialogs without script. | newly available | 2025-12-12 | no: chrome 135, safari_ios 26.2 |
| `scroll-into-view` scrollIntoView() | Keeping the caret and matches in view. | widely available | 2020-01-15 | yes |

## Observers and scheduling

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `resize-observer` Resize observer | Laying out overlays and tables. | widely available | 2020-07-28 | yes |
| `intersection-observer` Intersection observer | Lazy work for content out of view. | widely available | 2019-03-25 | yes |
| `mutationobserver` MutationObserver | Watching the DOM outside the engine. | widely available | 2015-07-29 | yes |
| `queuemicrotask` queueMicrotask() | Batching store notifications. | widely available | 2020-07-28 | yes |
| `requestidlecallback` requestIdleCallback() | Running content checks when idle. | limited |  | no: safari, safari_ios |
| `abortsignal-any` AbortSignal.any() | Combining cancellation for async work. | widely available | 2024-03-19 | no: chrome 116 |
| `abortsignal-timeout` AbortSignal.timeout() | Time limits for async work. | newly available | 2024-04-18 | no: chrome 124 |
| `weak-references` Weak references | Caches keyed by nodes. | widely available | 2021-04-26 | yes |

## JavaScript built-ins

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `structured-clone` structuredClone() | Copying plain document data. | widely available | 2022-03-14 | yes |
| `array-at` Array at() | Indexing from the end. | widely available | 2022-03-14 | yes |
| `array-findlast` Array findLast() and findLastIndex() | Searching from the end. | widely available | 2022-08-23 | yes |
| `array-by-copy` Array by copy | toSorted, toReversed and with. | widely available | 2023-07-04 | no: chrome 110 |
| `array-group` Array grouping | Object.groupBy and Map.groupBy. | widely available | 2024-03-05 | no: chrome 117 |
| `object-hasown` Object.hasOwn() | Own property checks on parsed data. | widely available | 2022-03-14 | yes |
| `string-replaceall` String replaceAll() | Text replacement. | widely available | 2020-08-27 | yes |
| `set-methods` Set methods | Union, intersection and difference of sets. | newly available | 2024-06-11 | no: chrome 122 |
| `iterator-methods` Iterator methods | map, filter and take on iterators. | newly available | 2025-03-31 | no: chrome 122 |
| `promise-withresolvers` Promise.withResolvers() | Deferred promises for async targets. | widely available | 2024-03-05 | no: chrome 119 |
| `url-canparse` URL.canParse() | Checking URLs without exceptions. | widely available | 2023-12-07 | no: chrome 120 |
| `urlpattern` URLPattern | Matching link patterns. | newly available | 2025-09-15 | no: safari_ios 26 |
| `string-wellformed` String isWellFormed() and toWellFormed() | Rejecting lone surrogates, as `checkHref` does, behind a guarded helper with a fallback. | widely available | 2023-10-24 | no: chrome 111 |
| `top-level-await` Top-level await | Not used: published modules must not await at the top level. | newly available | 2026-09-14 | no: safari 27, safari_ios 27 |

## CSS

| Feature | Use in the editor | Baseline | Since | At the floor |
|---|---|---|---|---|
| `has` :has() | Styling a parent by its content. | widely available | 2023-12-19 | yes |
| `where` :where() | Zero-specificity selectors, so host rules win. | widely available | 2021-01-21 | yes |
| `nesting` Nesting | Nested style rules. | widely available | 2023-12-11 | no: chrome 120 |
| `cascade-layers` Cascade layers | Ordering package and host styles. | widely available | 2022-03-14 | yes |
| `container-queries` Container queries (size) | Toolbars that adapt to the editor width. | widely available | 2023-02-14 | yes |
| `logical-properties` Logical properties | Layout that follows text direction. | widely available | 2021-09-20 | yes |
| `color-mix` color-mix() | Derived colours from tokens. | widely available | 2023-05-09 | no: chrome 111 |
| `light-dark` light-dark() | Light and dark theme values. | newly available | 2024-05-13 | no: chrome 123 |
| `forced-colors` Forced colors | High contrast modes. | widely available | 2022-09-12 | yes |
| `prefers-reduced-motion` prefers-reduced-motion media query | Less motion on request. | widely available | 2020-01-15 | yes |
| `content-visibility` content-visibility | Skipping rendering of content out of view in long documents. | newly available | 2025-09-15 | no: safari_ios 26 |
| `field-sizing` field-sizing | Inputs that grow with their content. | newly available | 2026-06-16 | no: chrome 123, safari_ios 26.2 |
| `text-wrap-pretty` text-wrap: pretty | Better line breaking of paragraphs. | limited |  | no: chrome 117, firefox, firefox_android, safari_ios 26 |
| `scrollbar-gutter` scrollbar-gutter | Stable layout when a scroll bar appears. | newly available | 2024-12-11 | yes |
| `caret-color` caret-color | The caret colour from tokens. | widely available | 2020-01-15 | yes |
| `user-select` user-select | Keeping chrome out of the text selection. | limited |  | no: safari, safari_ios |
