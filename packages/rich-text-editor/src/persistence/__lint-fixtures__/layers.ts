/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `persistence` imports `model` and `runtime`.
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '#/definition/compiler';
// expect-lint: eslint(no-restricted-imports)
import '../../definition/compiler';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-state';
