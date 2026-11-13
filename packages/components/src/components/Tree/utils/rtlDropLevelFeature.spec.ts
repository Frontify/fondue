/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';
import { type DragEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { type TreeItemData } from '../types';

import { rtlDropLevelFeature } from './rtlDropLevelFeature';

type DragHandler = (event: DragEvent<HTMLElement>) => void;
type RowProps = {
    onDragOver: DragHandler;
    onDrop: DragHandler;
    draggable: boolean;
};
type GetPropsParams = { item: ItemInstance<TreeItemData>; prev: () => RowProps };

const makeRow = (direction: 'rtl' | 'ltr'): HTMLElement => {
    const row = document.createElement('div');
    row.style.direction = direction;
    // Partial test double with only the fields the feature reads.
    row.getBoundingClientRect = () => ({ left: 100, right: 500 }) as DOMRect;
    document.body.append(row);
    return row;
};

const getWrappedProps = (direction: 'rtl' | 'ltr') => {
    const onDragOver = vi.fn<DragHandler>();
    const onDrop = vi.fn<DragHandler>();
    let row: HTMLElement | undefined;
    // Partial test double with only the fields the feature reads.
    const item = {
        getElement: () => row,
    } as unknown as ItemInstance<TreeItemData>;
    // headless-tree types getProps for every feature at once; narrow it to the row props this test reads.
    const getProps = rtlDropLevelFeature.itemInstance?.getProps as unknown as (args: GetPropsParams) => RowProps;
    const props = getProps({
        item,
        prev: () => ({ onDragOver, onDrop, draggable: true }),
    });
    // The row ref attaches after render, so the element must be read when the event fires.
    row = makeRow(direction);
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

describe('rtlDropLevelFeature', () => {
    it('mirrors clientX across the row in RTL on dragover', () => {
        const { props, onDragOver } = getWrappedProps('rtl');
        const event = makeEvent(480);
        props.onDragOver(event);
        const received = onDragOver.mock.lastCall?.[0];
        if (!received) {
            throw new Error('onDragOver was not called');
        }
        expect(received.clientX).toBe(120);
        expect(received.clientY).toBe(event.clientY);
        expect(received.dataTransfer).toBe(event.dataTransfer);
    });

    it('mirrors clientX across the row in RTL on drop', () => {
        const { props, onDrop } = getWrappedProps('rtl');
        props.onDrop(makeEvent(480));
        expect(onDrop).toHaveBeenCalledWith(expect.objectContaining({ clientX: 120 }));
    });

    it('forwards stopPropagation and preventDefault to the original event in RTL', () => {
        const { props, onDragOver } = getWrappedProps('rtl');
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

    it('passes the same event object through in LTR', () => {
        const { props, onDragOver } = getWrappedProps('ltr');
        const event = makeEvent(480);
        props.onDragOver(event);
        expect(onDragOver.mock.lastCall?.[0]).toBe(event);
    });

    it('keeps the other props from the wrapped feature', () => {
        const { props } = getWrappedProps('rtl');
        expect(props.draggable).toBe(true);
    });
});
