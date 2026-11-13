/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';
import { type DragEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

import styles from '../styles/tree.module.scss';
import { type TreeItemData } from '../types';

import { dropLevelFeature } from './dropLevelFeature';

type DragHandler = (event: DragEvent<HTMLElement>) => void;
type RowProps = {
    onDragOver: DragHandler;
    onDrop: DragHandler;
    draggable: boolean;
};
type GetPropsParams = { item: ItemInstance<TreeItemData>; prev: () => RowProps };
type ChevronBox = { left: number; right: number };

const makeRow = (direction: 'rtl' | 'ltr', chevron?: ChevronBox): HTMLElement => {
    const row = document.createElement('div');
    row.style.direction = direction;
    // Partial test double with only the fields the feature reads.
    row.getBoundingClientRect = () => ({ left: 100, right: 500 }) as DOMRect;
    if (chevron) {
        const chevronElement = document.createElement('span');
        chevronElement.className = styles.chevron ?? '';
        // Partial test double with only the fields the feature reads.
        chevronElement.getBoundingClientRect = () => chevron as DOMRect;
        row.append(chevronElement);
    }
    document.body.append(row);
    return row;
};

const getWrappedProps = (direction: 'rtl' | 'ltr', chevron?: ChevronBox) => {
    const onDragOver = vi.fn<DragHandler>();
    const onDrop = vi.fn<DragHandler>();
    let row: HTMLElement | undefined;
    // Partial test double with only the fields the feature reads.
    const item = {
        getElement: () => row,
        getItemMeta: () => ({ level: 2 }),
    } as unknown as ItemInstance<TreeItemData>;
    // headless-tree types getProps for every feature at once; narrow it to the row props this test reads.
    const getProps = dropLevelFeature.itemInstance?.getProps as unknown as (args: GetPropsParams) => RowProps;
    const props = getProps({
        item,
        prev: () => ({ onDragOver, onDrop, draggable: true }),
    });
    // The row ref attaches after render, so the element must be read when the event fires.
    row = makeRow(direction, chevron);
    return { props, onDragOver, onDrop };
};

// Partial test double with only the fields the feature reads.
const makeEvent = (clientX: number) =>
    ({
        clientX,
        clientY: 7,
        dataTransfer: {},
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
    }) as unknown as DragEvent<HTMLElement>;

const ltrChevron = { left: 160, right: 176 };
const rtlChevron = { left: 424, right: 440 };

describe('dropLevelFeature', () => {
    it('shifts clientX by the leading space before the indentation in LTR on dragover', () => {
        const { props, onDragOver } = getWrappedProps('ltr', ltrChevron);
        const event = makeEvent(200);
        props.onDragOver(event);
        const received = onDragOver.mock.lastCall?.[0];
        if (!received) {
            throw new Error('onDragOver was not called');
        }
        expect(received.clientX).toBe(172);
        expect(received.clientY).toBe(event.clientY);
        expect(received.dataTransfer).toBe(event.dataTransfer);
    });

    it('clamps a cursor over the leading space to the row edge', () => {
        const { props, onDragOver } = getWrappedProps('ltr', ltrChevron);
        props.onDragOver(makeEvent(110));
        const received = onDragOver.mock.lastCall?.[0];
        if (!received) {
            throw new Error('onDragOver was not called');
        }
        expect(received.clientX).toBe(100);
    });

    it('measures from the inline start and subtracts the leading space in RTL on dragover', () => {
        const { props, onDragOver } = getWrappedProps('rtl', rtlChevron);
        const event = makeEvent(440);
        props.onDragOver(event);
        const received = onDragOver.mock.lastCall?.[0];
        if (!received) {
            throw new Error('onDragOver was not called');
        }
        expect(received.clientX).toBe(132);
        expect(received.clientY).toBe(event.clientY);
        expect(received.dataTransfer).toBe(event.dataTransfer);
    });

    it('measures from the inline start and subtracts the leading space in RTL on drop', () => {
        const { props, onDrop } = getWrappedProps('rtl', rtlChevron);
        props.onDrop(makeEvent(440));
        expect(onDrop).toHaveBeenCalledWith(expect.objectContaining({ clientX: 132 }));
    });

    it('forwards stopPropagation and preventDefault to the original event', () => {
        const { props, onDragOver } = getWrappedProps('rtl', rtlChevron);
        const event = makeEvent(480);
        props.onDragOver(event);
        const received = onDragOver.mock.lastCall?.[0];
        if (!received) {
            throw new Error('onDragOver was not called');
        }
        received.stopPropagation();
        received.preventDefault();
        expect(vi.mocked(event.stopPropagation).mock.contexts[0]).toBe(event);
        expect(vi.mocked(event.preventDefault).mock.contexts[0]).toBe(event);
    });

    it('passes the same event object through in LTR without a chevron', () => {
        const { props, onDragOver } = getWrappedProps('ltr');
        const event = makeEvent(480);
        props.onDragOver(event);
        expect(onDragOver.mock.lastCall?.[0]).toBe(event);
    });

    it('keeps the other props from the wrapped feature', () => {
        const { props } = getWrappedProps('rtl', rtlChevron);
        expect(props.draggable).toBe(true);
    });
});
