/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { MAX_HEIGHT_MARGIN, setMaxHeightToAvailableSpace, isElementVisible } from '../domUtilities';

describe('setMaxHeightToAvailableSpace', () => {
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
    it('sets maxHeight correctly if dialog overflows the bottom', () => {
        const dialog = document.createElement('div');
        Object.defineProperty(dialog, 'getBoundingClientRect', {
            writable: true,
            value: () => ({ top: 750, bottom: 850 }),
        });

        setMaxHeightToAvailableSpace(dialog);
        expect(dialog.style.maxHeight).toBe(`${800 - 750 - MAX_HEIGHT_MARGIN}px`);
    });

    it('sets maxHeight correctly if dialog overflows the top', () => {
        const dialog = document.createElement('div');
        Object.defineProperty(dialog, 'getBoundingClientRect', {
            writable: true,
            value: () => ({ top: -50, bottom: 100 }),
        });

        setMaxHeightToAvailableSpace(dialog);
        expect(dialog.style.maxHeight).toBe(`${100 - MAX_HEIGHT_MARGIN}px`);
    });

    it('does not change maxHeight if dialog fits within the viewport', () => {
        const dialog = document.createElement('div');
        Object.defineProperty(dialog, 'getBoundingClientRect', {
            writable: true,
            value: () => ({ top: 200, bottom: 600 }),
        });

        setMaxHeightToAvailableSpace(dialog);
        expect(dialog.style.maxHeight).toBe('');
    });
});

describe('isElementVisible', () => {
    it('should return true for an element that is visible in the viewport', () => {
        const element = document.createElement('div');
        document.body.appendChild(element);

        Object.assign(element.style, { width: '100px', height: '100px', display: 'block' });
        Object.defineProperty(element, 'getBoundingClientRect', {
            value: () => ({ top: 50, left: 50, bottom: 150, right: 150, width: 100, height: 100 }),
        });

        expect(isElementVisible(element)).toBe(true);
        document.body.removeChild(element);
    });

    it('should return false for an element with display none', () => {
        const element = document.createElement('div');
        Object.assign(element.style, { display: 'none' });

        expect(isElementVisible(element)).toBe(false);
    });

    it('should return false for an element with zero opacity', () => {
        const element = document.createElement('div');
        Object.assign(element.style, { opacity: '0' });

        expect(isElementVisible(element)).toBe(false);
    });

    it('should return false for an element outside the viewport', () => {
        const element = document.createElement('div');
        Object.defineProperty(element, 'getBoundingClientRect', {
            value: () => ({ top: -100, left: -100, bottom: -50, right: -50, width: 50, height: 50 }),
        });

        expect(isElementVisible(element)).toBe(false);
    });

    it('should return false for an element with visibility hidden', () => {
        const element = document.createElement('div');
        Object.assign(element.style, { visibility: 'hidden' });

        expect(isElementVisible(element)).toBe(false);
    });
});
