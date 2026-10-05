/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { checkTestLevels } from './check-test-levels';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('check-test-levels', () => {
    it('SPEC-rich-text-quality/AC-035 fails on input events dispatched at the textbox or a contenteditable', async () => {
        const violations = await checkTestLevels(root, 'fixtures/test-levels/failing');

        expect(violations.map((violation) => violation.replace(/ on the editing surface.*/, ''))).toEqual([
            'fixtures/test-levels/failing/input-events.test.tsx:10 calls userEvent.type',
            'fixtures/test-levels/failing/input-events.test.tsx:11 calls user.type',
            'fixtures/test-levels/failing/input-events.test.tsx:12 calls userEvent.keyboard',
            'fixtures/test-levels/failing/input-events.test.tsx:13 calls fireEvent.input',
            'fixtures/test-levels/failing/input-events.test.tsx:14 calls fireEvent.paste',
        ]);
    });

    it('SPEC-rich-text-quality/AC-035 passes on tests that use typeText and paste', async () => {
        expect(await checkTestLevels(root, 'fixtures/test-levels/passing')).toEqual([]);
    });

    it('SPEC-rich-text-quality/AC-035 passes on the package source', async () => {
        expect(await checkTestLevels(root, 'src')).toEqual([]);
    });
});
