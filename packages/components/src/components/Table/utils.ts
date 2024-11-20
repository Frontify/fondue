/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

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
