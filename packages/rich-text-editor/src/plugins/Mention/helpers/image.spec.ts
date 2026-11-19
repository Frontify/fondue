/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { isSafeImageSrc } from './image';

describe('isSafeImageSrc', () => {
    it('accepts web and relative URLs', () => {
        const sources = ['https://example.com/a.png', 'http://example.com/a.png', '/a.png', 'a.png'];
        for (const src of sources) {
            expect(isSafeImageSrc(src)).toBe(true);
        }
    });

    it('refuses data URLs, other schemes and non-strings', () => {
        const sources = [
            'data:image/png;base64,AAAA',
            'DATA:IMAGE/svg+xml,x',
            'mailto:a@b.co',
            'tel:+4144',
            'javascript:alert(1)',
            'data:text/html,x',
            undefined,
            null,
            1,
            {},
        ];
        for (const src of sources) {
            expect(isSafeImageSrc(src)).toBe(false);
        }
    });
});
