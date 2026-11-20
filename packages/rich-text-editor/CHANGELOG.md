# @frontify/fondue-rich-text-editor

## 0.1.0-rc.2

### Minor Changes

- [#3091](https://github.com/Frontify/fondue/pull/3091) [`7e8cab8`](https://github.com/Frontify/fondue/commit/7e8cab85503ef706b46ede4c1b72e344736d097c) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): add `id`, set on the editable element (on the read-only view's root while read-only or showing its crash message), and `data-test-id`, set on the editor's root and defaulting to `fondue-rich-text-editor`.

- [#3034](https://github.com/Frontify/fondue/pull/3034) [`a6217b1`](https://github.com/Frontify/fondue/commit/a6217b17481a20eaf530aee759fe4bcfc21ad42a) Thanks [@jcosta33](https://github.com/jcosta33)! - refactor(RichTextEditor): the document spaces its blocks as a layout stack, whatever their tags, so a block from a new plugin gets the gap between blocks. A block that holds blocks spaces them itself with the `stack` mixin; list and to-do items keep theirs tight, and table cells use the document gap. Margins a block's look hands over through `--rte-own-margin-top` and `--rte-own-margin-bottom` still replace the gap.

- [#3097](https://github.com/Frontify/fondue/pull/3097) [`a6693d1`](https://github.com/Frontify/fondue/commit/a6693d18439060546fed779248e303b26942af1b) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): tablePlugin adds an "Insert table" button to the toolbar; the button and the `/` entry are left out inside a table

- [#3067](https://github.com/Frontify/fondue/pull/3067) [`c818a03`](https://github.com/Frontify/fondue/commit/c818a0336a7b15407302f682552e9a4cf45967f4) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor)!: `textStyleContent` is now a function taking `{ look }`, so the renderer can draw the host's text looks without the text style plugin. Replace `textStyleContent` with `textStyleContent()`.

### Patch Changes

- [#3094](https://github.com/Frontify/fondue/pull/3094) [`ff01a22`](https://github.com/Frontify/fondue/commit/ff01a2248dcecf7ab0ebfe8b57aa6452076807c7) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): read tables in stored HTML and pastes as tables when the table plugin is mounted

- [#3096](https://github.com/Frontify/fondue/pull/3096) [`a0fe11f`](https://github.com/Frontify/fondue/commit/a0fe11fdda122bceef518d3f76cc7c930b1328b0) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): find the editors in the table paste browser test by data-test-id

## 0.1.0-rc.1

### Minor Changes

- [#3005](https://github.com/Frontify/fondue/pull/3005) [`7409b82`](https://github.com/Frontify/fondue/commit/7409b82bd17c2cd220523ba543982737e152f36c) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): keyboard reference generated from the plugins. A hotkey is now `{ label, run }`. A hotkey or toolbar shortcut that names an unknown modifier throws when the editor mounts, and so do the shortcut helpers. Toolbar tooltips write the Apple modifiers in macOS order (⇧⌘X, not ⌘⇧X). Alt+F10 moves focus to the toolbar only as exactly Alt+F10, the WAI-ARIA toolbar key, so Shift+Alt+F10 and Ctrl+Alt+F10 no longer do.

- [#3065](https://github.com/Frontify/fondue/pull/3065) [`66ed807`](https://github.com/Frontify/fondue/commit/66ed8071068ece76e44b1583f41a0b8002a9774b) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): links come in two kinds, text and button (primary, secondary, tertiary). Offer buttons with `linkPlugin({ kinds: ['text', 'button'] })` and set each kind's look with `look: { text, button }`.

- [#2983](https://github.com/Frontify/fondue/pull/2983) [`d6df217`](https://github.com/Frontify/fondue/commit/d6df2178dfb9f3f5a4bd0ea4843c2b5a181a1ce4) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): add page search and link editing flows. `linkPlugin({ search })` offers the app's own pages as link targets.

- [#2984](https://github.com/Frontify/fondue/pull/2984) [`7bcaa1a`](https://github.com/Frontify/fondue/commit/7bcaa1a9a03aacbc31df41231a121d7ae9dca0d3) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): the mention picker shows Searching while a search takes long and offers Retry when it fails, draws an avatar only from a safe image URL, and `@` in inline code starts no mention; a mention's name is now wrapped in `<bdi>` in exported HTML; a malformed stored mention shows "Unknown person", "Unknown group" or "Unknown mention" for an empty username, has control characters stripped from what it shows, and writes no `data-mention-kind` for an unknown kind

- [#3064](https://github.com/Frontify/fondue/pull/3064) [`056f840`](https://github.com/Frontify/fondue/commit/056f840cf9743c3926e40bc4ee1f131d5406a77e) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): add `parseHtml` to load stored HTML into a document, read the way a paste is

- [#2981](https://github.com/Frontify/fondue/pull/2981) [`6e27664`](https://github.com/Frontify/fondue/commit/6e27664788d01d3deb813b8ff54b88a9021f91d9) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): read pasted marks the way the browser does and make sub and superscript exclusive

- [#2985](https://github.com/Frontify/fondue/pull/2985) [`157a973`](https://github.com/Frontify/fondue/commit/157a973c3677b1f46a9202aaa4d288be89498ee0) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): submit on Enter, and reset formatting as one undo step that keeps links. `blurOnBreakPlugin` is now called, with an optional `onBreak`. `blocks.setType` now lifts every list in the range, which Turn into inherits

- [#2982](https://github.com/Frontify/fondue/pull/2982) [`e65f3ea`](https://github.com/Frontify/fondue/commit/e65f3ea2cf67486e3dedf6111124ce513e69b394) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): keep typing rules out of code and technical text. `typographyPlugin` is now a function: call `typographyPlugin()` or `typographyPlugin({ groups })` instead of passing `typographyPlugin`.

- [#3053](https://github.com/Frontify/fondue/pull/3053) [`add8b74`](https://github.com/Frontify/fondue/commit/add8b74449c70c93d37f40bfe22279ff6a930447) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): let a block command say whether it can run on the selection (`isAvailable`), so the menus leave it out when it cannot

- [#3056](https://github.com/Frontify/fondue/pull/3056) [`fe256cd`](https://github.com/Frontify/fondue/commit/fe256cdb1021418dde83fc68f3f89f27042e8f87) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): let blocks lay out in rows and columns

- [#3068](https://github.com/Frontify/fondue/pull/3068) [`6b2684e`](https://github.com/Frontify/fondue/commit/6b2684ecd55a1105f21fba50d740a5fd9f960532) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix(RichTextEditor): the "Turn into" and `/` menus list only the block commands that can run on the selection, never one disabled

- [#3055](https://github.com/Frontify/fondue/pull/3055) [`8589915`](https://github.com/Frontify/fondue/commit/8589915b529a3c088572697eb86e23401bc76a93) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): let markup say how many columns and rows an element spans, and what a header labels

- [#3063](https://github.com/Frontify/fondue/pull/3063) [`034b822`](https://github.com/Frontify/fondue/commit/034b8228998b3c5c18c06dad29d8c315751f1929) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor)!: set the link look with `linkPlugin({ look })`, and hand the renderer the same look with `linkContent({ look })`. `textStylePlugin({ presets })` and `textStyleContent({ presets })` no longer take `link`, so move `presets.link` to `look`. `linkContent` is now a function, so replace `linkContent` with `linkContent()`.

  `defaultPlugins` already holds a `linkPlugin()`. Adding a second link plugin next to it throws `Duplicate edit view "link"` at mount, because each `linkPlugin()` call builds its own edit view. Replace the default one in place instead:

  ```ts
  const plugins = defaultPlugins.map((plugin) => {
    if (plugin.id === "link") {
      return linkPlugin({ look });
    }
    return plugin;
  });
  ```

- [#3066](https://github.com/Frontify/fondue/pull/3066) [`f22bdc8`](https://github.com/Frontify/fondue/commit/f22bdc859bbb40218f12097e92f51982705866ab) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): let hosts set the look of list markers per nesting level. `bulletListPlugin()` and `numberedListPlugin()` take `{ look }` to set the marker, its colour, its size (bullets only) and the indent of the first three levels, which repeat deeper down. `bulletListContent({ look })` and `numberedListContent({ look })` take the same, so a renderer given only content draws them. A marker with no colour or size of its own takes the body text's, so it matches its item under a body look.

- [#3051](https://github.com/Frontify/fondue/pull/3051) [`97e3b89`](https://github.com/Frontify/fondue/commit/97e3b893c9b5143fcc56ab79addc5cf7890493f2) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): let a block declare parts that exist only inside it

- [#3002](https://github.com/Frontify/fondue/pull/3002) [`3899388`](https://github.com/Frontify/fondue/commit/3899388e4e6e9e9344eab2ffd8c6dd28ad2410b3) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): let hosts set the look of body text, block quotes and links through `textStylePlugin({ presets })`.

- [#2977](https://github.com/Frontify/fondue/pull/2977) [`f5c4140`](https://github.com/Frontify/fondue/commit/f5c4140e8c0050eb64f14dc70e6b8d9d4f0ac315) Thanks [@jcosta33](https://github.com/jcosta33)! - refactor(RichTextEditor): keep plugin content apart from editing UI; plugins move their editing UI out of content

- [#3070](https://github.com/Frontify/fondue/pull/3070) [`5607c0a`](https://github.com/Frontify/fondue/commit/5607c0a0aa704be8c1679b858b0d311455d04509) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor)!: every plugin is now a function. Call `boldPlugin()`, `linkPlugin()`, `bulletListPlugin()` and so on instead of passing `boldPlugin`; this applies to `boldPlugin`, `italicPlugin`, `underlinePlugin`, `strikethroughPlugin`, `codePlugin`, `subscriptPlugin`, `superscriptPlugin`, `fontColorPlugin`, `linkPlugin`, `alignPlugin`, `bulletListPlugin`, `numberedListPlugin`, `checkListPlugin`, `quotePlugin`, `historyPlugin`, `resetFormattingPlugin`, `softBreakPlugin` and `blurOnBreakPlugin`. `defaultPlugins` stays a list.

- [#3075](https://github.com/Frontify/fondue/pull/3075) [`a46d5eb`](https://github.com/Frontify/fondue/commit/a46d5eb75809096b414130d125b487b79be2d80f) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor)!: move the shipped plugins, their content, `defaultPlugins`, `defaultContent` and the plugin option and look types to `@frontify/fondue-rich-text-editor/plugins`; the root keeps the editor, the renderer and the plugin authoring API

- [#3006](https://github.com/Frontify/fondue/pull/3006) [`1b16542`](https://github.com/Frontify/fondue/commit/1b165420459e0e50370f693491db711b60a914ec) Thanks [@jcosta33](https://github.com/jcosta33)! - perf(RichTextEditor): the renderer, `serializeToHtml` and `toPlainText` no longer load the editing registry; a plugin list with a duplicate edit view or a malformed hotkey now renders instead of throwing, and only the editor rejects it

- [#3052](https://github.com/Frontify/fondue/pull/3052) [`3f2bb4b`](https://github.com/Frontify/fondue/commit/3f2bb4bbe9cc68f0135d802f781c04ed7705f8ce) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): tell plugins whether text, a whole node or part of a grid is selected

- [#3073](https://github.com/Frontify/fondue/pull/3073) [`6e61bf7`](https://github.com/Frontify/fondue/commit/6e61bf758d1e77e7575d8caededc47849113abbd) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): `RtePlugin.*` now lists only the plugin authoring types you write by hand. `defineBlock`, `defineMark`, `defineInline`, `defineContent` and `definePlugin` infer the rest. Removed: `MarkState`, `ToolbarGroup`, `ToolbarEntry`, `EditView`, `Icon`, `Definition`, `Content`, `DefaultStyle`, `ParseRule`, `MarkParseRule`, `StyleParseRule`, `MarkClearRule`.

- [#3058](https://github.com/Frontify/fondue/pull/3058) [`6918851`](https://github.com/Frontify/fondue/commit/69188511317e8dfbc0b95a74aca849f5e344b275) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): add and remove rows and columns of a grid, toggle its headers, and give the table plugin a menu for it

- [#3061](https://github.com/Frontify/fondue/pull/3061) [`5441e2a`](https://github.com/Frontify/fondue/commit/5441e2a3a7a9bdad8d8adc4f3da89e5590e43f9e) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): merge and split the slots of a grid, and offer Merge cells and Split cell in the table menu

- [#3057](https://github.com/Frontify/fondue/pull/3057) [`5305ffd`](https://github.com/Frontify/fondue/commit/5305ffdbe7315dd529f9ddf2c769bddc9d72547c) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): add `tablePlugin`, tables whose cells hold paragraphs and lists

- [#3072](https://github.com/Frontify/fondue/pull/3072) [`958e5f0`](https://github.com/Frontify/fondue/commit/958e5f08acc3598729855280350c977224423fb0) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor)!: `textStyleContent` is now a function taking `{ presets }`, so the renderer can draw the host's text looks without the text style plugin. Replace `textStyleContent` with `textStyleContent()`.

- [#3001](https://github.com/Frontify/fondue/pull/3001) [`feb7138`](https://github.com/Frontify/fondue/commit/feb71389e4ffad7c83a3e364bd420c12173865a9) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): let hosts set the look of text style presets. Each preset class now sets all 11 look properties, so host tag rules such as `h1 { color }` no longer reach text styles. The document stylesheet alone writes block margins, so a host rule such as `.prose p { margin: 0 }` no longer changes the spacing of text styles.

- [#3080](https://github.com/Frontify/fondue/pull/3080) [`f428a52`](https://github.com/Frontify/fondue/commit/f428a528785ca7302ffbbd19549ee19bc9f1dd4e) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): the toolbar uses plain Fondue components. Toolbar controls use the regular `Button` size, a toggle that is on switches from the weak to the default emphasis, the text style picker is the regular `Select`, and a vertical `Divider` parts the groups. The editor no longer restyles any Fondue component, so the toolbar is taller and touch screens no longer get 44px targets.

- [#3069](https://github.com/Frontify/fondue/pull/3069) [`c227dd9`](https://github.com/Frontify/fondue/commit/c227dd9ad33e483ccf356f77bef8eda7d4c0e21d) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat(RichTextEditor): stop exporting `ANY_LIST`; it was only used by the built-in list plugins

### Patch Changes

- [#3047](https://github.com/Frontify/fondue/pull/3047) [`7206d27`](https://github.com/Frontify/fondue/commit/7206d27f2c79cf6a7304655de318475f6d00f5af) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): show no text style picker when an editor offers no styles

- [#3059](https://github.com/Frontify/fondue/pull/3059) [`c50adba`](https://github.com/Frontify/fondue/commit/c50adba1c64a7ccb7fd56e8cd44855d06c5607bd) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): keep the text selection when a press lands on any toolbar control, including a plain button a plugin draws, so its action applies to the selected text

- [#2938](https://github.com/Frontify/fondue/pull/2938) [`0fd2e6d`](https://github.com/Frontify/fondue/commit/0fd2e6d6d616d4392692abd0dc4e18f956d87db6) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): fix to-do split, alignment on Enter and list joining

- [#3026](https://github.com/Frontify/fondue/pull/3026) [`9b6a452`](https://github.com/Frontify/fondue/commit/9b6a452773883a485b221894cea4496708a679db) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): apply the last valid hex typed in the font colour flyout, three or six digits

- [#3025](https://github.com/Frontify/fondue/pull/3025) [`b4ed589`](https://github.com/Frontify/fondue/commit/b4ed58987d10864d1d2dffa1a74fcbeb70d1d5de) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): ignore unfinished hex values when saving a font colour

- [#2995](https://github.com/Frontify/fondue/pull/2995) [`9c8b78a`](https://github.com/Frontify/fondue/commit/9c8b78a4e66a85c0e35d4bf2a2eb90318cd317d9) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): toggle a mark on or off by the same rule the toolbar uses, so a range with a line break or blank text no longer behaves opposite to the toolbar

- [#3071](https://github.com/Frontify/fondue/pull/3071) [`8deed44`](https://github.com/Frontify/fondue/commit/8deed4455d998eccc7b6119009dabb92529f2e2f) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix(RichTextEditor): show menus and flyouts above the toolbar. The top toolbar's layering no longer reaches outside the editor, so the `/` menu, link and colour flyouts and other popups paint over it.

- [#3062](https://github.com/Frontify/fondue/pull/3062) [`58fdcd6`](https://github.com/Frontify/fondue/commit/58fdcd65f10db802bcebaa46d02c3449e17ed72b) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): pasted HTML no longer creates a mention; mention markup pastes as its text, or as a link when it carries one

## 0.1.0-rc.0

### Patch Changes

- [#3035](https://github.com/Frontify/fondue/pull/3035) [`cf1839b`](https://github.com/Frontify/fondue/commit/cf1839b10095b928008a8a11934056d0cf5b2581) Thanks [@noahwaldner](https://github.com/noahwaldner)! - First release candidate for Fondue v14.

## 0.1.0-beta.2

### Patch Changes

- [#3012](https://github.com/Frontify/fondue/pull/3012) [`2328458`](https://github.com/Frontify/fondue/commit/232845885a8bf906905a751a352f8e71d188939e) Thanks [@noahwaldner](https://github.com/noahwaldner)! - docs(RichTextEditor): mark the rich text editor as experimental. `@frontify/fondue-rich-text-editor` and the `@frontify/fondue/rich-text-editor` entry can change their API and document format in any release until the editor reaches 1.0.

## 0.1.0-beta.1

### Minor Changes

- [#3008](https://github.com/Frontify/fondue/pull/3008) [`52723d6`](https://github.com/Frontify/fondue/commit/52723d6c051eea35913062818ec469a6c650ef7c) Thanks [@fondue-release-bot](https://github.com/apps/fondue-release-bot)! - Bring in the rich text editor changes from main:

  - feat(RichTextEditor): clean up pastes from Word, Outlook and Google Docs
  - feat(RichTextEditor): add `[x] ` and `[~] ` (in progress) to-do shortcuts, autolink on Enter and Shift-Enter, and a drop cursor
  - fix(RichTextEditor): open documents from a newer format version read-only
  - fix(RichTextEditor): keep stored attributes no plugin declares
  - fix(RichTextEditor): replace a font colour in one undo step
  - fix(RichTextEditor): draw an unknown block among a list's items as an item of its own in the reader and export
  - fix(RichTextEditor): keep an unknown block's stored data out of the selection snapshot

## 0.1.0-beta.0

### Minor Changes

- [`a1e088f`](https://github.com/Frontify/fondue/commit/a1e088f019e10c42b338c45ba1f53d9d703dc023) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: publish `@frontify/fondue-rich-text-editor` and re-export it from `@frontify/fondue/rich-text-editor` (styles: `@frontify/fondue/rich-text-editor/styles`)
