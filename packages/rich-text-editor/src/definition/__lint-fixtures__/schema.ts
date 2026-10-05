/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `definition/schema.ts` imports only `model` and `prosemirror-model`; the file matches two overrides.
import '#/model';
import 'prosemirror-model';
// expect-lint: eslint(no-restricted-imports)
import '#/definition/compiler';
// expect-lint: eslint(no-restricted-imports)
import './compiler';
// expect-lint: eslint(no-restricted-imports)
import '../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-state';
