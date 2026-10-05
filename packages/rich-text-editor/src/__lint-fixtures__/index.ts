/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: the `.` entry imports every layer except `testing`.
import '#/react/editor';
import '../react/editor';
// expect-lint: eslint(no-restricted-imports)
import '#/testing';
// expect-lint: eslint(no-restricted-imports)
import '../testing';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';
