/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `model` imports nothing else in the package.
import '#/model/environment';
import './helpers';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';
