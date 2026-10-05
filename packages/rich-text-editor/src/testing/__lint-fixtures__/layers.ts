/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `testing` imports `model`, `runtime`, `persistence`, the conformance kits and the fixtures.
import '#/persistence/coordinator';
import '#/features/conformance';
import '#/features/marks-bold/fixtures';
import '#/features/__fixtures__/contract.cases';
// expect-lint: eslint(no-restricted-imports)
import '#/ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import '../../ui/toolbar';
// expect-lint: eslint(no-restricted-imports)
import '#/features/marks-bold/view';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';

// SPEC-rich-text/AC-051: the test helpers may use host capabilities; SPEC-rich-text-quality/AC-002 still holds.
export const helpers = [
    localStorage,
    // expect-lint: eslint(no-restricted-globals)
    setTimeout,
];
