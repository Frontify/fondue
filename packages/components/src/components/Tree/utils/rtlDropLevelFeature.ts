/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeatureImplementation } from '@headless-tree/core';
import { type DragEvent } from 'react';

type DropHandlers = {
    onDragOver?: (event: DragEvent<HTMLElement>) => void;
    onDrop?: (event: DragEvent<HTMLElement>) => void;
};

type InlineAxis = { kind: 'unchanged' } | { kind: 'mirrored'; left: number; right: number };

const readInlineAxis = (element: HTMLElement | null | undefined): InlineAxis => {
    if (!element || getComputedStyle(element).direction !== 'rtl') {
        return { kind: 'unchanged' };
    }

    const { left, right } = element.getBoundingClientRect();
    return { kind: 'mirrored', left, right };
};

const toInlineStartEvent = (event: DragEvent<HTMLElement>, axis: InlineAxis): DragEvent<HTMLElement> => {
    switch (axis.kind) {
        case 'unchanged': {
            return event;
        }
        case 'mirrored': {
            const mirroredClientX = axis.left + axis.right - event.clientX;
            return new Proxy(event, {
                get: (target, property) => {
                    if (property === 'clientX') {
                        return mirroredClientX;
                    }
                    const value: unknown = Reflect.get(target, property);
                    if (typeof value === 'function') {
                        // stopPropagation and preventDefault must act on React's original event; the cast keeps bind from returning any
                        return (value as (...args: unknown[]) => unknown).bind(target);
                    }
                    return value;
                },
            });
        }
    }
};

/** Measures the drop level from the row's inline start edge. headless-tree measures from the physical left edge, which is the wrong side in RTL. */
export const rtlDropLevelFeature: FeatureImplementation = {
    key: 'rtl-drop-level',
    deps: ['drag-and-drop'],
    overwrites: ['drag-and-drop'],

    itemInstance: {
        getProps: ({ item, prev }) => {
            const props = prev?.();
            const { onDragOver, onDrop }: DropHandlers = props ?? {};
            return {
                ...props,
                onDragOver: (event: DragEvent<HTMLElement>) =>
                    onDragOver?.(toInlineStartEvent(event, readInlineAxis(item.getElement()))),
                onDrop: (event: DragEvent<HTMLElement>) =>
                    onDrop?.(toInlineStartEvent(event, readInlineAxis(item.getElement()))),
            };
        },
    },
};
