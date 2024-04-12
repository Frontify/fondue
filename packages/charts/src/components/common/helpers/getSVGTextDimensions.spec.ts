/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Document, HTMLElement, type SVGElement } from 'happy-dom';
import { describe, expect, it, vi } from 'vitest';

import { getSVGTextDimensions } from '@components/common/helpers/getSVGTextDimensions';

Document.prototype.createElementNS = vi.fn();
HTMLElement.prototype.appendChild = vi.fn();

describe('getSVGTextDimensions', () => {
    it('returns expected dimensions and sets attributes correctly', () => {
        const mockSVGElement = {
            setAttribute: vi.fn(),
            appendChild: vi.fn(),
            style: {},
        } as unknown as SVGElement;
        const mockTextElement = {
            setAttribute: vi.fn(),
            textContent: '',
            style: {},
            getBoundingClientRect: vi.fn().mockReturnValue({ width: 72.65625, height: 16 }),
        } as unknown as SVGElement;
        Document.prototype.createElementNS = vi.fn().mockImplementation((_namespace: string, element: string) => {
            if (element === 'svg') {
                return mockSVGElement;
            }
            if (element === 'text') {
                return mockTextElement;
            }
            return {};
        });
        const result = getSVGTextDimensions('Hello World', { fontFamily: 'sans-serif', fontSize: '12px' });

        // sets aria-hidden on svg element
        expect(mockSVGElement.setAttribute).toHaveBeenCalledWith('aria-hidden', 'true');

        // sets style on svg element
        expect(mockSVGElement).toHaveProperty('style');
        expect(mockSVGElement.style).toHaveProperty('position');
        expect(mockSVGElement.style).toHaveProperty('top');
        expect(mockSVGElement.style).toHaveProperty('left');
        expect(mockSVGElement.style).toHaveProperty('width');
        expect(mockSVGElement.style).toHaveProperty('height');
        expect(mockSVGElement.style.position).toEqual('absolute');
        expect(mockSVGElement.style.top).toEqual('-100%');
        expect(mockSVGElement.style.left).toEqual('-100%');
        expect(mockSVGElement.style.width).toEqual('0');
        expect(mockSVGElement.style.height).toEqual('0');

        // sets style on text element
        expect(mockTextElement).toHaveProperty('style');
        expect(mockTextElement).toHaveProperty('textContent');
        expect(mockTextElement.style).toHaveProperty('fontFamily');
        expect(mockTextElement.style).toHaveProperty('fontSize');
        expect(mockTextElement.style.fontFamily).toEqual('sans-serif');
        expect(mockTextElement.style.fontSize).toEqual('12px');
        expect(mockTextElement.textContent).toEqual('Hello World');

        // returns expected dimensions
        expect(result).toEqual({ width: 72.65625, height: 16 });
    });
});
