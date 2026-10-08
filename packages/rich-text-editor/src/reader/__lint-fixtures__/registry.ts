/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: only the registry of shipped reader overrides imports `features/*/reader.tsx`.
import '#/locales/en-US';
import '#/features/mentions/reader';
// expect-lint: eslint(no-restricted-imports)
import '#/features/mentions/view';
// SPEC-rich-text-output/AC-049: the registry is reader code too, so it imports no hook either.
// expect-lint: eslint(no-restricted-imports)
import { useContext } from 'react';

export const used: readonly unknown[] = [useContext];
