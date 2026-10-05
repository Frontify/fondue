/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: the feature registry and profiles import `model` and each feature's `feature.ts` and `migration.ts`.
import '#/model';
import '#/features/marks-bold/feature';
import '#/features/marks-bold/migration';
import '#/features/registry';
// expect-lint: eslint(no-restricted-imports)
import '#/features/marks-bold/view';
// expect-lint: eslint(no-restricted-imports)
import '../../marks-bold/view';
// expect-lint: eslint(no-restricted-imports)
import '#/runtime/session';
// expect-lint: eslint(no-restricted-imports)
import '../../../runtime/session';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';
