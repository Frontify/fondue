/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-061: `feature.ts` imports only `#/model`, its `migration.ts` and a declared dependency's `feature.ts`.
import '#/model';
import './migration';
import '#/features/core/feature';
import '../core/feature';
// expect-lint: eslint(no-restricted-imports)
import '#/model/environment';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import './internal';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';
// expect-lint: eslint(no-restricted-imports)
import 'react';
