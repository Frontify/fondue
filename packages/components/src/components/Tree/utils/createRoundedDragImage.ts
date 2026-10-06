/* (c) Copyright Frontify Ltd., all rights reserved. */

type DragImage = {
    imgElement: HTMLElement;
    xOffset: number;
    yOffset: number;
};

const isTransparent = (color: string): boolean => color === 'transparent' || color === 'rgba(0, 0, 0, 0)';

/**
 * Drag ghost for a tree row.
 *
 * The browser snapshots the dragged element as a rectangle and paints transparent
 * pixels white, so the row's 2px transparent border becomes a white frame. This
 * clone keeps the rounded item and paints that border with the row fill.
 */
export const createRoundedDragImage = (row: HTMLElement): DragImage => {
    const item = row.querySelector<HTMLElement>('[data-tree-item]') ?? row;
    const rect = item.getBoundingClientRect();
    const computed = getComputedStyle(item);
    const background = computed.backgroundColor;
    const surface = computed.getPropertyValue('--color-surface-default').trim();
    const fill = isTransparent(background) ? surface : background;
    const image = item.cloneNode(true) as HTMLElement;

    image.style.position = 'fixed';
    image.style.top = '-1000px';
    image.style.left = '0';
    image.style.margin = '0';
    image.style.width = `${Math.max(1, rect.width)}px`;
    image.style.height = `${Math.max(1, rect.height)}px`;
    image.style.boxSizing = 'border-box';
    image.style.borderRadius = computed.borderTopLeftRadius || 'var(--border-radius-medium)';
    image.style.overflow = 'hidden';
    image.style.backgroundColor = fill;
    image.style.borderColor = fill;
    image.style.opacity = '1';
    image.style.pointerEvents = 'none';
    image.querySelectorAll<HTMLElement>('[data-tree-handle]').forEach((handle) => {
        handle.style.opacity = '1';
    });

    document.body.appendChild(image);
    queueMicrotask(() => image.remove());

    return { imgElement: image, xOffset: 16, yOffset: Math.max(1, rect.height) / 2 };
};
