/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `locales` imports nothing in the package.
import '../en-US';
// expect-lint: eslint(no-restricted-imports)
import '#/model';
// expect-lint: eslint(no-restricted-imports)
import '../../model';
