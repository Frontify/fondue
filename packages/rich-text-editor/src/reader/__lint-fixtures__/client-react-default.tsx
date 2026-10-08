/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-output/AC-049: a default import reaches `React.Component` with no named import.
// expect-lint: eslint(no-restricted-imports)
import React from 'react';

export const used: readonly unknown[] = [React];
