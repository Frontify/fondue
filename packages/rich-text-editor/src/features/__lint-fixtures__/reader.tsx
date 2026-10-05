/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-061: `reader.tsx` imports only its `feature.ts`, `#/reader/define` and React.
import './feature';
import '#/reader/define';
import 'react';
// expect-lint: eslint(no-restricted-imports)
import '#/bridge/define';
// expect-lint: eslint(no-restricted-imports)
import '../../reader/static';
// expect-lint: eslint(no-restricted-imports)
import '@frontify/fondue-components';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';
