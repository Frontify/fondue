/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getColorWithName } from '../utils';

describe('ColorPicker Utils', () => {
    describe('getColorWithName', () => {
        it('should return the color with hex name', () => {
            const color = getColorWithName({ red: 255, green: 0, blue: 0, alpha: 1 }, 'HEX');
            expect(color).toEqual({ red: 255, green: 0, blue: 0, alpha: 1, name: '#ff0000' });
        });
        it('should return the color with rgba name', () => {
            const color = getColorWithName({ red: 255, green: 0, blue: 0, alpha: 1 }, 'RGBA');
            expect(color).toEqual({ red: 255, green: 0, blue: 0, alpha: 1, name: 'rgba(255, 0, 0, 1)' });
        });
    });
});
