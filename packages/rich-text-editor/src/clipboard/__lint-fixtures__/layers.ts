/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `clipboard` imports `model`, `definition`, `runtime`, `codecs` and `prosemirror-*`.
import '#/codecs/markdown';
import 'prosemirror-view';
// expect-lint: eslint(no-restricted-imports)
import '#/ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import '../../ui/toolbar';
