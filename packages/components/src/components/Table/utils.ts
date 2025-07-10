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

const INTERACTIVE_ELEMENTS_LIST = [HTMLButtonElement, HTMLAnchorElement];
const INTERACTIVE_ROLES_LIST = ['button', 'link'];

export function isEventFromInteractiveElement(event?: MouseEvent): boolean {
    let node = event?.target instanceof Element ? event.target : null;

    while (node && !(node instanceof HTMLTableRowElement)) {
        if (INTERACTIVE_ELEMENTS_LIST.some((interactiveElement) => node instanceof interactiveElement)) {
            return true;
        }

        const role = node.getAttribute('role');
        if (role && INTERACTIVE_ROLES_LIST.includes(role)) {
            return true;
        }

        node = node.parentElement;
    }

    return false;
}
