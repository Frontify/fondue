/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { createRoundedDragImage } from './createRoundedDragImage';

describe('createRoundedDragImage', () => {
    it('paints the transparent border with the row fill and keeps the corner radius', () => {
        const row = document.createElement('div');
        const item = document.createElement('div');
        item.setAttribute('data-tree-item', '');
        item.style.width = '120px';
        item.style.height = '32px';
        item.style.backgroundColor = 'rgb(1, 2, 3)';
        item.style.borderColor = 'transparent';
        item.style.borderRadius = '4px';
        const handle = document.createElement('span');
        handle.setAttribute('data-tree-handle', '');
        handle.style.opacity = '0';
        item.append(handle);
        row.append(item);
        document.body.append(row);

        const image = createRoundedDragImage(row);

        expect(image.imgElement.style.backgroundColor).toBe('rgb(1, 2, 3)');
        expect(image.imgElement.style.borderColor).toBe('rgb(1, 2, 3)');
        expect(image.imgElement.style.borderRadius).toBe('4px');
        expect(image.imgElement.style.overflow).toBe('hidden');
        expect(handle.style.opacity).toBe('0');
        expect(image.imgElement.querySelector<HTMLElement>('[data-tree-handle]')?.style.opacity).toBe('1');
        expect(image.xOffset).toBe(16);
        expect(document.body.contains(image.imgElement)).toBe(true);

        row.remove();
    });
});
