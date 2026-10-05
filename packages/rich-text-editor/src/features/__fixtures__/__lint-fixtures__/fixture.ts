/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-061: test-only fixture features import only public entries.
import '#/model';
import '#/testing';
import '#/features/marks-bold/feature';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';
