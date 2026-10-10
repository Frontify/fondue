/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `html` imports `model`, `clipboard/import`, `definition/schema.ts` and `prosemirror-model`.
import '#/clipboard/import';
import '#/definition/schema';
import 'prosemirror-model';
// expect-lint: eslint(no-restricted-imports)
import '#/clipboard/any-module';
// expect-lint: eslint(no-restricted-imports)
import '../../clipboard/any-module';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-view';
