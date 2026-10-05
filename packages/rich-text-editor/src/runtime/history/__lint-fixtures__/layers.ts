/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-runtime/AC-052: only `runtime/history` imports `prosemirror-history`; the runtime rules still hold here.
import 'prosemirror-history';
// expect-lint: eslint(no-restricted-imports)
import '#/ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import '../../../ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import 'react';
