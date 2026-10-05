/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `bridge` imports `model`, `runtime`, `persistence` and the `prosemirror-view` and `prosemirror-model` types.
import '#/persistence/coordinator';
import 'prosemirror-view';
// expect-lint: eslint(no-restricted-imports)
import '#/ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import '../../ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-state';
// expect-lint: eslint(no-restricted-imports)
import '@radix-ui/react-toolbar';
