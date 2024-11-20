/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { handleKeyDown } from '../utils';

describe('handleKeyDown', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <table>
                <thead>
                    <tr tabindex="0">
                        <th>Header</th>
                    </tr>
                </thead>
                <tbody>
                    <tr tabindex="0">
                        <td>Row 1</td>
                    </tr>
                    <tr tabindex="0">
                        <td>Row 2</td>
                    </tr>
                    <tr tabindex="0">
                        <td>Row 3</td>
                    </tr>
                </tbody>
            </table>
        `;
    });

    it('moves focus to previous row when ArrowUp is pressed', () => {
        const rows = document.querySelectorAll('tr');
        const currentRow = rows[2];
        const previousRow = rows[1];

        currentRow?.focus();

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        Object.defineProperty(event, 'target', { value: currentRow });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
        const focusSpy = vi.spyOn(previousRow, 'focus' as never);

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('moves focus to next row when ArrowDown is pressed', () => {
        const rows = document.querySelectorAll('tr');
        const currentRow = rows[1];
        const nextRow = rows[2];

        currentRow?.focus();

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        Object.defineProperty(event, 'target', { value: currentRow });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
        const focusSpy = vi.spyOn(nextRow, 'focus' as never);

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('allows navigation between header and body rows', () => {
        const rows = document.querySelectorAll('tr');
        const headerRow = rows[0];
        const firstBodyRow = rows[1];

        headerRow?.focus();

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        Object.defineProperty(event, 'target', { value: headerRow });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
        const focusSpy = vi.spyOn(firstBodyRow, 'focus' as never);

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('does nothing when at the first row and ArrowUp is pressed', () => {
        const rows = document.querySelectorAll('tr');
        const firstRow = rows[0];

        firstRow?.focus();

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        Object.defineProperty(event, 'target', { value: firstRow });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('does nothing when at the last row and ArrowDown is pressed', () => {
        const rows = document.querySelectorAll('tr');
        const lastRow = rows[rows.length - 1];

        lastRow?.focus();

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        Object.defineProperty(event, 'target', { value: lastRow });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('ignores non-arrow keys', () => {
        const rows = document.querySelectorAll('tr');
        const currentRow = rows[1];

        currentRow?.focus();

        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        Object.defineProperty(event, 'target', { value: currentRow });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('ignores events when target is not a row', () => {
        const rows = document.querySelectorAll('tr');

        if (!rows[1]) {
            throw new Error('No row found');
        }

        const cell = rows[1].querySelector('td')!;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        Object.defineProperty(event, 'target', { value: cell });

        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        handleKeyDown(event as unknown as KeyboardEvent<HTMLTableElement>);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
});
