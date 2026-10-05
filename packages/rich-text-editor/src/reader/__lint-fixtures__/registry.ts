/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: only the registry of shipped reader overrides imports `features/*/reader.tsx`.
import '#/locales/en-US';
import '#/features/mentions/reader';
// expect-lint: eslint(no-restricted-imports)
import '#/features/mentions/view';
