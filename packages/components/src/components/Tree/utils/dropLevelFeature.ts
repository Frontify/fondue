/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeatureImplementation } from '@headless-tree/core';
import { type DragEvent } from 'react';

import { INDENT_STEP_PX } from '../constants';
import styles from '../styles/tree.module.scss';

type DropHandlers = {
    onDragOver?: (event: DragEvent<HTMLElement>) => void;
    onDrop?: (event: DragEvent<HTMLElement>) => void;
};

const getLeadingSpace = (row: HTMLElement, rowRect: DOMRect, isRtl: boolean, level: number): number => {
    const chevron = row.querySelector(`.${styles.chevron}`);
    if (!chevron) {
        return 0;
    }

    const chevronRect = chevron.getBoundingClientRect();
    let chevronInlineStart = chevronRect.left - rowRect.left;
    if (isRtl) {
        chevronInlineStart = rowRect.right - chevronRect.right;
    }
    return chevronInlineStart - level * INDENT_STEP_PX;
};

const toIndentClientX = (
    event: DragEvent<HTMLElement>,
    row: HTMLElement | null | undefined,
    level: number,
): DragEvent<HTMLElement> => {
    if (!row) {
        return event;
    }

    const rowRect = row.getBoundingClientRect();
    const isRtl = getComputedStyle(row).direction === 'rtl';
    let distance = event.clientX - rowRect.left;
    if (isRtl) {
        distance = rowRect.right - event.clientX;
    }
    const prefix = getLeadingSpace(row, rowRect, isRtl, level);
    // Below zero, headless-tree would outdent a top-level row and refuse drops into a last top-level folder
    const indentClientX = rowRect.left + Math.max(0, distance - prefix);
    if (indentClientX === event.clientX) {
        return event;
    }

    return new Proxy(event, {
        get: (target, property) => {
            if (property === 'clientX') {
                return indentClientX;
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

// headless-tree measures the drop level from the row's left edge, but our indentation starts after the leading columns and runs from the right in RTL
export const dropLevelFeature: FeatureImplementation = {
    key: 'drop-level',
    deps: ['drag-and-drop'],
    overwrites: ['drag-and-drop'],

    itemInstance: {
        getProps: ({ item, prev }) => {
            const props = prev?.();
            const { onDragOver, onDrop }: DropHandlers = props ?? {};
            return {
                ...props,
                onDragOver: (event: DragEvent<HTMLElement>) =>
                    onDragOver?.(toIndentClientX(event, item.getElement(), item.getItemMeta().level)),
                onDrop: (event: DragEvent<HTMLElement>) =>
                    onDrop?.(toIndentClientX(event, item.getElement(), item.getItemMeta().level)),
            };
        },
    },
};
