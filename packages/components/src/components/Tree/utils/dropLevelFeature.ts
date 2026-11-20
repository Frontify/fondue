/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeatureImplementation } from '@headless-tree/core';
import { type DragEvent } from 'react';

import { INDENT_STEP_PX } from '../constants';
import styles from '../styles/tree.module.scss';

type DropHandlers = {
    onDragOver?: (event: DragEvent<HTMLElement>) => void;
    onDrop?: (event: DragEvent<HTMLElement>) => void;
};

type Span = { left: number; right: number };

type InlineDirection = 'ltr' | 'rtl';

type RowGeometry =
    | { kind: 'detached' }
    | { kind: 'measured'; direction: InlineDirection; row: Span; chevron: Span | null; level: number };

type MeasuredGeometry = Extract<RowGeometry, { kind: 'measured' }>;

const readRowGeometry = (row: HTMLElement | null | undefined, level: number): RowGeometry => {
    if (!row) {
        return { kind: 'detached' };
    }

    const { left, right } = row.getBoundingClientRect();
    let direction: InlineDirection = 'ltr';
    if (getComputedStyle(row).direction === 'rtl') {
        direction = 'rtl';
    }

    let chevron: Span | null = null;
    const chevronElement = row.querySelector(`.${styles.chevron}`);
    if (chevronElement) {
        const chevronBox = chevronElement.getBoundingClientRect();
        chevron = { left: chevronBox.left, right: chevronBox.right };
    }

    return { kind: 'measured', direction, row: { left, right }, chevron, level };
};

const inlineStartOffset = (box: Span, row: Span, direction: InlineDirection): number => {
    switch (direction) {
        case 'ltr': {
            return box.left - row.left;
        }
        case 'rtl': {
            return row.right - box.right;
        }
    }
};

const getLeadingSpace = ({ chevron, row, direction, level }: MeasuredGeometry): number => {
    if (!chevron) {
        return 0;
    }

    return inlineStartOffset(chevron, row, direction) - level * INDENT_STEP_PX;
};

const withClientX = (event: DragEvent<HTMLElement>, clientX: number): DragEvent<HTMLElement> =>
    new Proxy(event, {
        get: (target, property) => {
            if (property === 'clientX') {
                return clientX;
            }
            const value: unknown = Reflect.get(target, property);
            if (typeof value === 'function') {
                // stopPropagation and preventDefault must act on React's original event; the cast keeps bind from returning any
                return (value as (...args: unknown[]) => unknown).bind(target);
            }
            return value;
        },
    });

const toIndentClientX = (event: DragEvent<HTMLElement>, geometry: RowGeometry): DragEvent<HTMLElement> => {
    switch (geometry.kind) {
        case 'detached': {
            return event;
        }
        case 'measured': {
            const { row, direction } = geometry;
            const distance = inlineStartOffset({ left: event.clientX, right: event.clientX }, row, direction);
            // Below zero, headless-tree would outdent a top-level row and refuse drops into a last top-level folder
            const indentClientX = row.left + Math.max(0, distance - getLeadingSpace(geometry));
            if (indentClientX === event.clientX) {
                return event;
            }

            return withClientX(event, indentClientX);
        }
    }
};

/** Measures the drop level from the row's indent columns. headless-tree measures from the row's left edge, but the indentation starts after the leading columns and runs from the right in RTL. */
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
                    onDragOver?.(toIndentClientX(event, readRowGeometry(item.getElement(), item.getItemMeta().level))),
                onDrop: (event: DragEvent<HTMLElement>) =>
                    onDrop?.(toIndentClientX(event, readRowGeometry(item.getElement(), item.getItemMeta().level))),
            };
        },
    },
};
