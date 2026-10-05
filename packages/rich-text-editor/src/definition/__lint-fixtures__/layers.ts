/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `definition` imports `model` and `prosemirror-*`.
import '#/model';
import 'prosemirror-state';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../runtime/session';
