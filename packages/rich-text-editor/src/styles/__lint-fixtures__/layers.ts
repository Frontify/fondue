/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `styles` imports nothing, in the package or outside it.
// expect-lint: eslint(no-restricted-imports)
import '../keyframes.allowlist';
// expect-lint: eslint(no-restricted-imports)
import '#/model';
// expect-lint: eslint(no-restricted-imports)
import '../../model';
// expect-lint: eslint(no-restricted-imports)
import 'react';
