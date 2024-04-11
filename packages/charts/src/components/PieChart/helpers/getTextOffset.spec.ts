/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSStyleDeclaration } from 'happy-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { FONT_SIZE } from '@components/PieChart/components/consts';
import { getTextOffset } from '@components/PieChart/helpers/getTextOffset';

CSSStyleDeclaration.prototype.getPropertyValue = vi.fn();

describe('getTextOffset', () => {
    beforeEach(() => {
        vi.mocked(CSSStyleDeclaration.prototype.getPropertyValue).mockImplementation((property: string) => {
            switch (property) {
                case 'font-size':
                    return '16px';
                case FONT_SIZE:
                    return '1rem';
                default:
                    return '';
            }
        });
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    test('returns expected offset title only', () => {
        const result = getTextOffset(true, false, false);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 0 });
    });

    test('returns expected offset title and value', () => {
        const result = getTextOffset(true, true, false);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 16 });
    });

    test('returns expected offset title, value and percentage', () => {
        const result = getTextOffset(true, true, true);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 16 });
    });

    test('returns expected offset title and percentage', () => {
        const result = getTextOffset(true, false, true);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 16 });
    });

    test('returns expected offset value and percentage', () => {
        const result = getTextOffset(false, true, true);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 0 });
    });

    test('returns expected offset value only', () => {
        const result = getTextOffset(false, true, false);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 0 });
    });

    test('returns expected offset percentage only', () => {
        const result = getTextOffset(false, false, true);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith('font-size');
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledWith(FONT_SIZE);
        expect(CSSStyleDeclaration.prototype.getPropertyValue).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ textTopOffset: 16, textBottomOffset: 0 });
    });
});
