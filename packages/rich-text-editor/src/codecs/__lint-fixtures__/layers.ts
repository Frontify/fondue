/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `codecs` imports `model`, `locales` and `markdown-it`.
import '#/locales/en-US';
import 'markdown-it';
// expect-lint: eslint(no-restricted-imports)
import '#/reader/define';
// expect-lint: eslint(no-restricted-imports)
import '../../reader/define';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';

// SPEC-rich-text-output/AC-027: codecs never read the live DOM.
export const live = [
    // expect-lint: eslint(no-restricted-globals)
    document,
    // expect-lint: eslint(no-restricted-globals)
    window,
    // expect-lint: eslint(no-restricted-globals)
    navigator,
    // expect-lint: eslint(no-restricted-properties)
    globalThis.document,
];
