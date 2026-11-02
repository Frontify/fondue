/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

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

const makeRow = (direction: 'rtl' | 'ltr'): HTMLElement => {
    const row = document.createElement('div');
    row.style.direction = direction;
    row.getBoundingClientRect = () => ({ left: 100, right: 500 }) as DOMRect;
    document.body.append(row);
    return row;
};

const getWrappedProps = (direction: 'rtl' | 'ltr') => {
    const onDragOver = vi.fn();
    const onDrop = vi.fn();
    const row = makeRow(direction);
    const item = {
        getElement: () => row,
    } as unknown as ItemInstance<TreeItemData>;
    const getProps = rtlDropLevelFeature.itemInstance?.getProps as unknown as (args: {
        item: ItemInstance<TreeItemData>;
        prev: () => RowProps;
    }) => RowProps;
    const props = getProps({
        item,
        prev: () => ({ onDragOver, onDrop, draggable: true }),
    });
    return { props, onDragOver, onDrop };
};

const makeEvent = (clientX: number) =>
    ({
        clientX,
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
    }) as unknown as DragEvent<HTMLElement>;

describe('rtlDropLevelFeature', () => {
    it('mirrors clientX across the row in RTL on dragover', () => {
        const { props, onDragOver } = getWrappedProps('rtl');
        props.onDragOver(makeEvent(480));
        expect(onDragOver).toHaveBeenCalledWith(expect.objectContaining({ clientX: 120 }));
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
        const [received] = onDragOver.mock.calls[0] as [DragEvent<HTMLElement>];
        received.stopPropagation();
        received.preventDefault();
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('passes the same event object through in LTR', () => {
        const { props, onDragOver } = getWrappedProps('ltr');
        const event = makeEvent(480);
        props.onDragOver(event);
        expect(onDragOver.mock.calls[0]?.[0]).toBe(event);
    });

    it('keeps the other props from the wrapped feature', () => {
        const { props } = getWrappedProps('rtl');
        expect(props.draggable).toBe(true);
    });
});
