/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-react/AC-098: `bridge/chrome-toolbar.tsx` may import `@radix-ui/react-toolbar`; the bridge rules still hold here.
import '@radix-ui/react-toolbar';
// expect-lint: eslint(no-restricted-imports)
import '@radix-ui/react-popover';
// expect-lint: eslint(no-restricted-imports)
import '#/ui/toolbar';
