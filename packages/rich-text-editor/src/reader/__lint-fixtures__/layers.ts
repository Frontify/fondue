/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `reader` imports `model`, `locales` and the `reader.tsx` of each feature.
import '#/locales/en-US';
import '#/features/mentions/reader';
// expect-lint: eslint(no-restricted-imports)
import '#/features/mentions/view';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';

// SPEC-rich-text-output/AC-027: the reader never reads the live DOM.
export const live = [
    // expect-lint: eslint(no-restricted-globals)
    document,
    // expect-lint: eslint(no-restricted-globals)
    window,
    // expect-lint: eslint(no-restricted-globals)
    navigator,
];
