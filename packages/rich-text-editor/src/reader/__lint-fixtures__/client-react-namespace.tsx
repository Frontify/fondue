/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-output/AC-049: a namespace import reaches `React.useState` with no named import.
// expect-lint: eslint(no-restricted-imports)
import * as React from 'react';

export const used: readonly unknown[] = [React];
