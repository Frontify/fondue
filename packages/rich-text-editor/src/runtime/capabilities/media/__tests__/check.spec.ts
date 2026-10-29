/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { limitsOf } from '#/model/internal';

import { checkFiles } from '../uploads/check';

describe('checkFiles', () => {
    it('reports a file whose check throws as unreadable', async () => {
        const file = new File(['png'], 'photo.png', { type: 'image/png' });
        Object.defineProperty(file, 'size', {
            get() {
                throw new Error('unreadable size');
            },
        });

        await expect(checkFiles({ limits: limitsOf({}), acceptTypes: ['image/png'] }, [file])).resolves.toEqual([
            'unreadable',
        ]);
    });
});
