/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeatureImplementation } from '@headless-tree/core';
import { type DragEvent } from 'react';

type DropHandlers = {
    onDragOver?: (event: DragEvent<HTMLElement>) => void;
    onDrop?: (event: DragEvent<HTMLElement>) => void;
};

const mirrorInRtl = (
    event: DragEvent<HTMLElement>,
    element: HTMLElement | null | undefined,
): DragEvent<HTMLElement> => {
    if (!element || getComputedStyle(element).direction !== 'rtl') {
        return event;
    }

    const { left, right } = element.getBoundingClientRect();
    const mirroredClientX = left + right - event.clientX;

    return new Proxy(event, {
        get: (target, property) => {
            if (property === 'clientX') {
                return mirroredClientX;
            }
            const value: unknown = Reflect.get(target, property);
            if (typeof value === 'function') {
                // stopPropagation and preventDefault must act on React's original event
                return (value as (...args: unknown[]) => unknown).bind(target);
            }
            return value;
        },
    });
};

// headless-tree measures the drop level from the row's physical left edge, which is the wrong side in RTL
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
                onDragOver: (event: DragEvent<HTMLElement>) => onDragOver?.(mirrorInRtl(event, item.getElement())),
                onDrop: (event: DragEvent<HTMLElement>) => onDrop?.(mirrorInRtl(event, item.getElement())),
            };
        },
    },
};
