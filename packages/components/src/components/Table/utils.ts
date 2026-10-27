/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type MouseEvent } from 'react';

function getAdjacentRow(currentRow: HTMLElement, key: 'ArrowUp' | 'ArrowDown'): HTMLElement | null {
    const selector = 'tr[tabindex="0"]';
    const table = currentRow.closest('table');
    if (!table) {
        return null;
    }

    const rows = Array.from(table.querySelectorAll(selector));
    const currentIndex = rows.indexOf(currentRow);
    const nextIndex = currentIndex + (key === 'ArrowUp' ? -1 : 1);

    return nextIndex >= 0 && nextIndex < rows.length ? (rows[nextIndex] as HTMLElement) : null;
}

export function handleKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    const target = event.target as HTMLElement;
    const currentRow = target.closest('tr');

    if (!currentRow || target !== currentRow || !['ArrowUp', 'ArrowDown'].includes(event.key)) {
        return;
    }

    const nextRow = getAdjacentRow(currentRow, event.key as 'ArrowUp' | 'ArrowDown');
    if (nextRow) {
        event.preventDefault();
        nextRow.focus();
    }
}

const INTERACTIVE_ROLES_LIST = ['button', 'link'];

export function shouldIgnoreRowClick(event?: MouseEvent): boolean {
    if (!event) {
        return false;
    }

    const { target, currentTarget } = event;
    // Built per call: DOM globals don't exist at module load during SSR.
    const interactiveElements = [HTMLButtonElement, HTMLAnchorElement, HTMLInputElement];

    let element = target instanceof Element ? target : null;

    if (!currentTarget.contains(element)) {
        return true;
    }

    while (element && !(element instanceof HTMLTableRowElement)) {
        if (interactiveElements.some((interactiveElement) => element instanceof interactiveElement)) {
            return true;
        }

        const role = element.getAttribute('role');
        if (role && INTERACTIVE_ROLES_LIST.includes(role)) {
            return true;
        }

        element = element.parentElement;
    }

    return false;
}

export function shouldIgnoreRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>): boolean {
    return event.target !== event.currentTarget;
}
