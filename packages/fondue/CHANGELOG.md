# @frontify/fondue

## 12.0.4

### Patch Changes

- Updated dependencies [[`65a6163`](https://github.com/Frontify/fondue/commit/65a61630c01b2e0492352df44d1956d902543c45)]:
  - @frontify/fondue-charts@1.8.2

## 12.0.3

### Patch Changes

- Updated dependencies [[`158973e`](https://github.com/Frontify/fondue/commit/158973e0ce2ae63f074db85b798942a953ecb38e)]:
  - @frontify/fondue-components@1.1.0

## 12.0.2

### Patch Changes

- Updated dependencies [[`fcb84f3`](https://github.com/Frontify/fondue/commit/fcb84f3d269ceba04a282c27c8548dd62699d439)]:
  - @frontify/fondue-charts@1.8.1

## 12.0.1

### Patch Changes

- Updated dependencies [[`27eac5a`](https://github.com/Frontify/fondue/commit/27eac5a989fe81a6464d16a10c50160036301c9d)]:
  - @frontify/fondue-components@1.0.1

## 12.0.0

### Major Changes

- [#1807](https://github.com/Frontify/fondue/pull/1807) [`fc35a50`](https://github.com/Frontify/fondue/commit/fc35a509e641604eaf2a4b644c573929c3440be3) Thanks [@noahwaldner](https://github.com/noahwaldner)! - refactor: Finalized Monorepo transition, added subexport for new components, added contribution guidelines and readme

### Minor Changes

- [#1761](https://github.com/Frontify/fondue/pull/1761) [`54142eb`](https://github.com/Frontify/fondue/commit/54142ebb1f683c626dd13b3eae9920f25cb82c79) Thanks [@ftascon](https://github.com/ftascon)! - feat(InlineDialog): add `unsafe_zIndex` as a temporary workaround to support stacked layers

- [#1752](https://github.com/Frontify/fondue/pull/1752) [`86f58b2`](https://github.com/Frontify/fondue/commit/86f58b2e509dcd59ae7e743a4b7f3db5c8b11111) Thanks [@bojangles-m](https://github.com/bojangles-m)! - refactor(Tooltip): replaced `onMouse` events with `onPointer` events to distinguish between devices.

- [`c4e179c`](https://github.com/Frontify/fondue/commit/c4e179ca542da239ed6be743cefd1902406c86c5) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Update minimum Node version to v18

- [#1697](https://github.com/Frontify/fondue/pull/1697) [`8114231`](https://github.com/Frontify/fondue/commit/8114231ca84012dc428682f06bc421393e727fd7) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - refactor: move to ESM

- [#1784](https://github.com/Frontify/fondue/pull/1784) [`ceb35b5`](https://github.com/Frontify/fondue/commit/ceb35b57948a04b38ffc6599bedf88e07d67b239) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix(CustomColorPicker): infinite loop when rgb color input field is cleared

- [#1764](https://github.com/Frontify/fondue/pull/1764) [`068fda8`](https://github.com/Frontify/fondue/commit/068fda89478d0784410e4b391452931ed684fad6) Thanks [@bojangles-m](https://github.com/bojangles-m)! - feat(TextInput): exposed component ref and set focusOnMount prop to be deprecated.

### Patch Changes

- [#1791](https://github.com/Frontify/fondue/pull/1791) [`a78ec51`](https://github.com/Frontify/fondue/commit/a78ec5191314a82cc661e1f5202688de1402cccc) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: add `tailwind.config.ts` to exported files

- [#1746](https://github.com/Frontify/fondue/pull/1746) [`b433069`](https://github.com/Frontify/fondue/commit/b4330693df2c76a1e7a9825e386e7d3bea765fdf) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: revert exporting of fondue-components

- [#1701](https://github.com/Frontify/fondue/pull/1701) [`1dc0aa7`](https://github.com/Frontify/fondue/commit/1dc0aa7b4ea594f1032b55aaaadf9187ddb1b9b5) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix(RichTextEditor): disappearing line break made with shortcut Shift-Enter

- [#1707](https://github.com/Frontify/fondue/pull/1707) [`89f8297`](https://github.com/Frontify/fondue/commit/89f8297523441d6b9ea8ac6a2505d4708de1af9d) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - build: update dependencies

- [#1718](https://github.com/Frontify/fondue/pull/1718) [`5531d4e`](https://github.com/Frontify/fondue/commit/5531d4e1072f1070e492df95fccb8e31220f628c) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): wrong import for hotkey

- [`c338f2a`](https://github.com/Frontify/fondue/commit/c338f2a18a3ed38483a0511930ddb9c24482fe3f) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Fix date picker component since we went ESM

- [#1705](https://github.com/Frontify/fondue/pull/1705) [`154368e`](https://github.com/Frontify/fondue/commit/154368edeb7f9ee3bb75d025d2795b9b09931f61) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - chore: update plate to v30

  Fondue will now be exposing parts of @udecode/plate that is necessary for creating custom plugins. This means that @udecode/plate only needs to be installed in Fondue.

- [#1768](https://github.com/Frontify/fondue/pull/1768) [`d163220`](https://github.com/Frontify/fondue/commit/d16322024c22a28b2cdfb93e6b0aaad9ab004906) Thanks [@imoutaharik](https://github.com/imoutaharik)! - fix(TextInput): disabled state styling

- [#1758](https://github.com/Frontify/fondue/pull/1758) [`fc7fffc`](https://github.com/Frontify/fondue/commit/fc7fffc738d0a3559c214b5ecfe0e35295eb31ae) Thanks [@anxobotana](https://github.com/anxobotana)! - feat: disabled items unchecked on multiselect tree

- [#1732](https://github.com/Frontify/fondue/pull/1732) [`7acb645`](https://github.com/Frontify/fondue/commit/7acb6454b5af1b3bd9e4e4a3497c5c2e650c2660) Thanks [@SamCreasey](https://github.com/SamCreasey)! - feat(RichTextEditor): `FloatingModalWrapper` component has been created. Use this when a custom plugin requires a flyout. An example of it's usage be found in `src/components/RichTextEditor/Plugins/LinkPlugin/FloatingLink/InsertLinkModal/InsertModal.tsx`

  fix(RichTextEditor): The `BlurObserver` element has been updated to close floating modals when the user clicks inside the richTextEditor content. In addition, it will only be activated once the user has focused the editor, reducing the number of event listeners active on the page.

- [`f91e3b4`](https://github.com/Frontify/fondue/commit/f91e3b44df4ee51f17b77d4032ba78b430b6dcae) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Revert update of `date-fns` and `react-datepicker`

- [#1722](https://github.com/Frontify/fondue/pull/1722) [`c0b0a91`](https://github.com/Frontify/fondue/commit/c0b0a9142dc56af3e47fc434f820d705cea192c1) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): remove important classes

- [#1776](https://github.com/Frontify/fondue/pull/1776) [`9966089`](https://github.com/Frontify/fondue/commit/9966089d37148739a13e54e1b4037bb138f4da92) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - chore: update dependencies

- [#1811](https://github.com/Frontify/fondue/pull/1811) [`4fa8007`](https://github.com/Frontify/fondue/commit/4fa8007bf973494ff4621f526d8f2919115f95ff) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: housekeeping for v12 release

- [#1744](https://github.com/Frontify/fondue/pull/1744) [`17b7b7d`](https://github.com/Frontify/fondue/commit/17b7b7d354b5d2c1bb83cef44c34116dd1b46f07) Thanks [@noahwaldner](https://github.com/noahwaldner)! - build: bundle fondue-components within fondue build

- [#1774](https://github.com/Frontify/fondue/pull/1774) [`f7e4d31`](https://github.com/Frontify/fondue/commit/f7e4d319ae953761c3cf7f32ac0b4d23844ad6be) Thanks [@selimovicz](https://github.com/selimovicz)! - chore: Exporting FilterableMultiSelect component

- [#1720](https://github.com/Frontify/fondue/pull/1720) [`02f9a35`](https://github.com/Frontify/fondue/commit/02f9a35a36cb2cd18bb9271e832c110ac350bbcf) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: add missing `id` props on `Dialog`

- [#1739](https://github.com/Frontify/fondue/pull/1739) [`30bfe34`](https://github.com/Frontify/fondue/commit/30bfe3487ee2f121d83d13607c79089d70d57071) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: change classname order to avoid overwriting

- [#1735](https://github.com/Frontify/fondue/pull/1735) [`4dc05a3`](https://github.com/Frontify/fondue/commit/4dc05a354dec3c9510423aeb736ae9ecc722be27) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): toolbar closes on safari

- [#1700](https://github.com/Frontify/fondue/pull/1700) [`6a740b7`](https://github.com/Frontify/fondue/commit/6a740b705aa250944a1f24e50139c79c1ee415d6) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix: body is not scrollable when modal is open

- [#1745](https://github.com/Frontify/fondue/pull/1745) [`93be3c9`](https://github.com/Frontify/fondue/commit/93be3c9d9c77c2d7e645e33aeb64b49aedb0d65e) Thanks [@SamCreasey](https://github.com/SamCreasey)! - fix(SegmentedControls): Update size calculations to prevent resizing glitches

  fix(SegmentedControls): Remove initial motion.div that appears before position has been calculated

- [#1690](https://github.com/Frontify/fondue/pull/1690) [`7c20259`](https://github.com/Frontify/fondue/commit/7c20259673409bde59f698b62e3f5bfe2edf68ab) Thanks [@noahwaldner](https://github.com/noahwaldner)! - Fix a11y in Color and Date pickers

- [#1771](https://github.com/Frontify/fondue/pull/1771) [`f325dc7`](https://github.com/Frontify/fondue/commit/f325dc74579772dfac1d568bda361bc91e56c684) Thanks [@noahwaldner](https://github.com/noahwaldner)! - added filtered multiselect

- [#1729](https://github.com/Frontify/fondue/pull/1729) [`f38e4a8`](https://github.com/Frontify/fondue/commit/f38e4a8bd3f3bd01a2c51844301dac57b0f78e4e) Thanks [@SamCreasey](https://github.com/SamCreasey)! - perf(RichTextEditor): memoize props to reduce rendering times

- [#1799](https://github.com/Frontify/fondue/pull/1799) [`22f155c`](https://github.com/Frontify/fondue/commit/22f155c244bdf206403959bb688411584e72c0e2) Thanks [@ragi96](https://github.com/ragi96)! - chore: bump all `@udecode/plate` dependencies to v31

- [#1724](https://github.com/Frontify/fondue/pull/1724) [`3ecff27`](https://github.com/Frontify/fondue/commit/3ecff272f25e39a826221854e5ea02a70b581563) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): lic and checkbox item serialization

- [#1741](https://github.com/Frontify/fondue/pull/1741) [`b244528`](https://github.com/Frontify/fondue/commit/b244528576d9748c9d1b8e5665d0b3fd892dc2ed) Thanks [@SamCreasey](https://github.com/SamCreasey)! - fix: hide floating link

- [#1783](https://github.com/Frontify/fondue/pull/1783) [`7903425`](https://github.com/Frontify/fondue/commit/7903425984d69f340ea0611390d2bfeabd4d4493) Thanks [@getflourish](https://github.com/getflourish)! - Segmented Controls: Center align icon and text

- [`88b3be6`](https://github.com/Frontify/fondue/commit/88b3be6a214803a1ac65ed2e3e2439ffb825aedc) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Update dependencies

- [#1795](https://github.com/Frontify/fondue/pull/1795) [`a27e8fe`](https://github.com/Frontify/fondue/commit/a27e8fe918f8520039c033bfa5fbcbde62f267ed) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix(TextInput): due to accessibility issues, an additional input type 'search' has been added

- [#1706](https://github.com/Frontify/fondue/pull/1706) [`ee96663`](https://github.com/Frontify/fondue/commit/ee96663ccc5e6d353cfe1e9bd4e3c089f0e30ea0) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix: don't use dark variant for the tooltip styles

- [#1806](https://github.com/Frontify/fondue/pull/1806) [`246dfb8`](https://github.com/Frontify/fondue/commit/246dfb8112b68341de8cfd25a71cf3729848395d) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: add packages sub-export to `@frontify/fondue`

- [#1777](https://github.com/Frontify/fondue/pull/1777) [`29a9b34`](https://github.com/Frontify/fondue/commit/29a9b34ac76209484e6fd6d1ca8495ce02d93cd3) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): text style dropdown shows wrong value

- [#1782](https://github.com/Frontify/fondue/pull/1782) [`4073c37`](https://github.com/Frontify/fondue/commit/4073c373d20b046613dbcfd2d5618dcb404e6d46) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - chore: update ESLint and lint codebase

- [#1789](https://github.com/Frontify/fondue/pull/1789) [`4a2ce08`](https://github.com/Frontify/fondue/commit/4a2ce081da056f22547023a994b98277c6d53a3a) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: wrong export path in package.json

- Updated dependencies [[`fc35a50`](https://github.com/Frontify/fondue/commit/fc35a509e641604eaf2a4b644c573929c3440be3), [`99c8cea`](https://github.com/Frontify/fondue/commit/99c8cea49a6148206c127ebde6f559e17f5980bf), [`4fa8007`](https://github.com/Frontify/fondue/commit/4fa8007bf973494ff4621f526d8f2919115f95ff), [`246dfb8`](https://github.com/Frontify/fondue/commit/246dfb8112b68341de8cfd25a71cf3729848395d)]:
  - @frontify/fondue-components@1.0.0
  - @frontify/fondue-charts@1.8.0
  - @frontify/fondue-icons@0.2.0
  - @frontify/fondue-tokens@3.5.0

## 12.0.0-beta.427

### Patch Changes

- [#1799](https://github.com/Frontify/fondue/pull/1799) [`22f155c`](https://github.com/Frontify/fondue/commit/22f155c244bdf206403959bb688411584e72c0e2) Thanks [@ragi96](https://github.com/ragi96)! - chore: bump all `@udecode/plate` dependencies to v31

## 12.0.0-beta.426

### Patch Changes

- [#1795](https://github.com/Frontify/fondue/pull/1795) [`a27e8fe`](https://github.com/Frontify/fondue/commit/a27e8fe918f8520039c033bfa5fbcbde62f267ed) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix(TextInput): due to accessibility issues, an additional input type 'search' has been added

## 12.0.0-beta.425

### Patch Changes

- [#1791](https://github.com/Frontify/fondue/pull/1791) [`a78ec51`](https://github.com/Frontify/fondue/commit/a78ec5191314a82cc661e1f5202688de1402cccc) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: add `tailwind.config.ts` to exported files

## 12.0.0-beta.424

### Patch Changes

- [#1789](https://github.com/Frontify/fondue/pull/1789) [`4a2ce08`](https://github.com/Frontify/fondue/commit/4a2ce081da056f22547023a994b98277c6d53a3a) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: wrong export path in package.json

## 12.0.0-beta.423

### Minor Changes

- [#1784](https://github.com/Frontify/fondue/pull/1784) [`ceb35b5`](https://github.com/Frontify/fondue/commit/ceb35b57948a04b38ffc6599bedf88e07d67b239) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix(CustomColorPicker): infinite loop when rgb color input field is cleared

### Patch Changes

- [#1768](https://github.com/Frontify/fondue/pull/1768) [`d163220`](https://github.com/Frontify/fondue/commit/d16322024c22a28b2cdfb93e6b0aaad9ab004906) Thanks [@imoutaharik](https://github.com/imoutaharik)! - fix(TextInput): disabled state styling

- [#1776](https://github.com/Frontify/fondue/pull/1776) [`9966089`](https://github.com/Frontify/fondue/commit/9966089d37148739a13e54e1b4037bb138f4da92) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - chore: update dependencies

- [#1783](https://github.com/Frontify/fondue/pull/1783) [`7903425`](https://github.com/Frontify/fondue/commit/7903425984d69f340ea0611390d2bfeabd4d4493) Thanks [@getflourish](https://github.com/getflourish)! - Segmented Controls: Center align icon and text

- [#1782](https://github.com/Frontify/fondue/pull/1782) [`4073c37`](https://github.com/Frontify/fondue/commit/4073c373d20b046613dbcfd2d5618dcb404e6d46) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - chore: update ESLint and lint codebase

## 12.0.0-beta.422

### Patch Changes

- [#1777](https://github.com/Frontify/fondue/pull/1777) [`29a9b34`](https://github.com/Frontify/fondue/commit/29a9b34ac76209484e6fd6d1ca8495ce02d93cd3) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): text style dropdown shows wrong value

## 12.0.0-beta.421

### Patch Changes

- [#1774](https://github.com/Frontify/fondue/pull/1774) [`f7e4d31`](https://github.com/Frontify/fondue/commit/f7e4d319ae953761c3cf7f32ac0b4d23844ad6be) Thanks [@selimovicz](https://github.com/selimovicz)! - chore: Exporting FilterableMultiSelect component

## 12.0.0-beta.420

### Patch Changes

- [#1771](https://github.com/Frontify/fondue/pull/1771) [`f325dc7`](https://github.com/Frontify/fondue/commit/f325dc74579772dfac1d568bda361bc91e56c684) Thanks [@noahwaldner](https://github.com/noahwaldner)! - added filtered multiselect

## 12.0.0-beta.419

### Minor Changes

- [#1764](https://github.com/Frontify/fondue/pull/1764) [`068fda8`](https://github.com/Frontify/fondue/commit/068fda89478d0784410e4b391452931ed684fad6) Thanks [@bojangles-m](https://github.com/bojangles-m)! - feat(TextInput): exposed component ref and set focusOnMount prop to be deprecated.

## 12.0.0-beta.418

### Patch Changes

- [#1758](https://github.com/Frontify/fondue/pull/1758) [`fc7fffc`](https://github.com/Frontify/fondue/commit/fc7fffc738d0a3559c214b5ecfe0e35295eb31ae) Thanks [@anxobotana](https://github.com/anxobotana)! - feat: disabled items unchecked on multiselect tree

## 12.0.0-beta.417

### Minor Changes

- [#1761](https://github.com/Frontify/fondue/pull/1761) [`54142eb`](https://github.com/Frontify/fondue/commit/54142ebb1f683c626dd13b3eae9920f25cb82c79) Thanks [@ftascon](https://github.com/ftascon)! - feat(InlineDialog): add `unsafe_zIndex` as a temporary workaround to support stacked layers

- [#1752](https://github.com/Frontify/fondue/pull/1752) [`86f58b2`](https://github.com/Frontify/fondue/commit/86f58b2e509dcd59ae7e743a4b7f3db5c8b11111) Thanks [@bojangles-m](https://github.com/bojangles-m)! - refactor(Tooltip): replaced `onMouse` events with `onPointer` events to distinguish between devices.

## 12.0.0-beta.416

### Patch Changes

- [#1745](https://github.com/Frontify/fondue/pull/1745) [`93be3c9`](https://github.com/Frontify/fondue/commit/93be3c9d9c77c2d7e645e33aeb64b49aedb0d65e) Thanks [@SamCreasey](https://github.com/SamCreasey)! - fix(SegmentedControls): Update size calculations to prevent resizing glitches

  fix(SegmentedControls): Remove initial motion.div that appears before position has been calculated

## 12.0.0-beta.415

### Patch Changes

- [#1746](https://github.com/Frontify/fondue/pull/1746) [`b433069`](https://github.com/Frontify/fondue/commit/b4330693df2c76a1e7a9825e386e7d3bea765fdf) Thanks [@noahwaldner](https://github.com/noahwaldner)! - fix: revert exporting of fondue-components

## 12.0.0-beta.414

### Patch Changes

- [#1744](https://github.com/Frontify/fondue/pull/1744) [`17b7b7d`](https://github.com/Frontify/fondue/commit/17b7b7d354b5d2c1bb83cef44c34116dd1b46f07) Thanks [@noahwaldner](https://github.com/noahwaldner)! - build: bundle fondue-components within fondue build

- [#1741](https://github.com/Frontify/fondue/pull/1741) [`b244528`](https://github.com/Frontify/fondue/commit/b244528576d9748c9d1b8e5665d0b3fd892dc2ed) Thanks [@SamCreasey](https://github.com/SamCreasey)! - fix: hide floating link

## 12.0.0-beta.413

### Patch Changes

- [#1739](https://github.com/Frontify/fondue/pull/1739) [`30bfe34`](https://github.com/Frontify/fondue/commit/30bfe3487ee2f121d83d13607c79089d70d57071) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: change classname order to avoid overwriting

## 12.0.0-beta.412

### Minor Changes

- [#1731](https://github.com/Frontify/fondue/pull/1731) [`ef0519d`](https://github.com/Frontify/fondue/commit/ef0519d8021204b280b65812c98686b4ce3b909e) Thanks [@noahwaldner](https://github.com/noahwaldner)! - added export for the new components in fondue

### Patch Changes

- [#1735](https://github.com/Frontify/fondue/pull/1735) [`4dc05a3`](https://github.com/Frontify/fondue/commit/4dc05a354dec3c9510423aeb736ae9ecc722be27) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): toolbar closes on safari

- Updated dependencies [[`ef0519d`](https://github.com/Frontify/fondue/commit/ef0519d8021204b280b65812c98686b4ce3b909e)]:
  - @frontify/fondue-components@0.1.0

## 12.0.0-beta.411

### Patch Changes

- [#1732](https://github.com/Frontify/fondue/pull/1732) [`7acb645`](https://github.com/Frontify/fondue/commit/7acb6454b5af1b3bd9e4e4a3497c5c2e650c2660) Thanks [@SamCreasey](https://github.com/SamCreasey)! - feat(RichTextEditor): `FloatingModalWrapper` component has been created. Use this when a custom plugin requires a flyout. An example of it's usage be found in `src/components/RichTextEditor/Plugins/LinkPlugin/FloatingLink/InsertLinkModal/InsertModal.tsx`

  fix(RichTextEditor): The `BlurObserver` element has been updated to close floating modals when the user clicks inside the richTextEditor content. In addition, it will only be activated once the user has focused the editor, reducing the number of event listeners active on the page.

## 12.0.0-beta.410

### Patch Changes

- [#1729](https://github.com/Frontify/fondue/pull/1729) [`f38e4a8`](https://github.com/Frontify/fondue/commit/f38e4a8bd3f3bd01a2c51844301dac57b0f78e4e) Thanks [@SamCreasey](https://github.com/SamCreasey)! - perf(RichTextEditor): memoize props to reduce rendering times

## 12.0.0-beta.409

### Patch Changes

- [#1724](https://github.com/Frontify/fondue/pull/1724) [`3ecff27`](https://github.com/Frontify/fondue/commit/3ecff272f25e39a826221854e5ea02a70b581563) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): lic and checkbox item serialization

## 12.0.0-beta.408

### Patch Changes

- [#1722](https://github.com/Frontify/fondue/pull/1722) [`c0b0a91`](https://github.com/Frontify/fondue/commit/c0b0a9142dc56af3e47fc434f820d705cea192c1) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): remove important classes

## 12.0.0-beta.407

### Patch Changes

- [#1720](https://github.com/Frontify/fondue/pull/1720) [`02f9a35`](https://github.com/Frontify/fondue/commit/02f9a35a36cb2cd18bb9271e832c110ac350bbcf) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - fix: add missing `id` props on `Dialog`

## 12.0.0-beta.406

### Patch Changes

- [#1718](https://github.com/Frontify/fondue/pull/1718) [`5531d4e`](https://github.com/Frontify/fondue/commit/5531d4e1072f1070e492df95fccb8e31220f628c) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - fix(RTE): wrong import for hotkey

## 12.0.0-beta.405

### Patch Changes

- [#1705](https://github.com/Frontify/fondue/pull/1705) [`154368e`](https://github.com/Frontify/fondue/commit/154368edeb7f9ee3bb75d025d2795b9b09931f61) Thanks [@fulopdaniel](https://github.com/fulopdaniel)! - chore: update plate to v30

  Fondue will now be exposing parts of @udecode/plate that is necessary for creating custom plugins. This means that @udecode/plate only needs to be installed in Fondue.

- [#1690](https://github.com/Frontify/fondue/pull/1690) [`7c20259`](https://github.com/Frontify/fondue/commit/7c20259673409bde59f698b62e3f5bfe2edf68ab) Thanks [@noahwaldner](https://github.com/noahwaldner)! - Fix a11y in Color and Date pickers

## 12.0.0-beta.404

### Patch Changes

- [`c338f2a`](https://github.com/Frontify/fondue/commit/c338f2a18a3ed38483a0511930ddb9c24482fe3f) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Fix date picker component since we went ESM

## 12.0.0-beta.403

### Patch Changes

- [`88b3be6`](https://github.com/Frontify/fondue/commit/88b3be6a214803a1ac65ed2e3e2439ffb825aedc) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Update dependencies

## 12.0.0-beta.402

### Patch Changes

- [`f91e3b4`](https://github.com/Frontify/fondue/commit/f91e3b44df4ee51f17b77d4032ba78b430b6dcae) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Revert update of `date-fns` and `react-datepicker`

## 12.0.0-beta.401

### Minor Changes

- [`c4e179c`](https://github.com/Frontify/fondue/commit/c4e179ca542da239ed6be743cefd1902406c86c5) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - Update minimum Node version to v18

- [#1697](https://github.com/Frontify/fondue/pull/1697) [`8114231`](https://github.com/Frontify/fondue/commit/8114231ca84012dc428682f06bc421393e727fd7) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - refactor: move to ESM

### Patch Changes

- [#1701](https://github.com/Frontify/fondue/pull/1701) [`1dc0aa7`](https://github.com/Frontify/fondue/commit/1dc0aa7b4ea594f1032b55aaaadf9187ddb1b9b5) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix(RichTextEditor): disappearing line break made with shortcut Shift-Enter

- [#1707](https://github.com/Frontify/fondue/pull/1707) [`89f8297`](https://github.com/Frontify/fondue/commit/89f8297523441d6b9ea8ac6a2505d4708de1af9d) Thanks [@SamuelAlev](https://github.com/SamuelAlev)! - build: update dependencies

- [#1700](https://github.com/Frontify/fondue/pull/1700) [`6a740b7`](https://github.com/Frontify/fondue/commit/6a740b705aa250944a1f24e50139c79c1ee415d6) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix: body is not scrollable when modal is open

- [#1706](https://github.com/Frontify/fondue/pull/1706) [`ee96663`](https://github.com/Frontify/fondue/commit/ee96663ccc5e6d353cfe1e9bd4e3c089f0e30ea0) Thanks [@bojangles-m](https://github.com/bojangles-m)! - fix: don't use dark variant for the tooltip styles
