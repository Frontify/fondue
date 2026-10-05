/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010, SPEC-rich-text-runtime/AC-052, SPEC-rich-text-runtime/AC-063: `runtime` imports `model`, `definition` and `prosemirror-*`.
import '#/definition/compiler';
import 'prosemirror-view';
// expect-lint: eslint(no-restricted-imports)
import '#/react/editor';
// expect-lint: eslint(no-restricted-imports)
import '../../react/editor';
// expect-lint: eslint(no-restricted-imports)
import 'react';
// expect-lint: eslint(no-restricted-imports)
import 'react-dom/client';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-history';
