/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `clipboard/import` imports only `model`, `definition/schema.ts` and `prosemirror-model`.
import '#/definition/schema';
import 'prosemirror-model';
import './cleanup';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '#/clipboard/paste';
// expect-lint: eslint(no-restricted-imports)
import '../../paste';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-view';
