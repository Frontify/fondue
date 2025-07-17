/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type MouseEvent } from 'react';
import { describe, it, expect, vi, beforeEach, test } from 'vitest';

import { handleKeyDown, shouldIgnoreRowClick } from '../utils';

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

describe('shouldIgnoreRowClick', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button id="button">A button</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a id="link" href="#">A link</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="role-button" role="button">Role Button</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="role-link" role="link">Role Link</div>
                        </td>
                    </tr> 
                    <tr>
                        <td id="non-interactive-cell">Non interactive cell</td>
                    </tr>
                    <tr>
                        <td>
                            <span id="non-interactive-span">A non-interactive-span</span>
                            <button><span id="interactive-span">An interactive span</span></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="dialog">Modal dialog content</div>
        `;
    });

    const clickOnElement = async (target: HTMLElement): Promise<boolean> => {
        const clickPromise = new Promise<boolean>((resolve) => {
            target.addEventListener(
                'click',
                (event) => {
                    const result = shouldIgnoreRowClick(event as unknown as MouseEvent);
                    resolve(result);
                },
                { once: true },
            );
        });

        target.click();

        return clickPromise;
    };

    const cases = [
        {
            elementDescription: 'button',
            elementId: 'button',
            expected: true,
        },
        {
            elementDescription: 'element with role[button]',
            elementId: 'role-button',
            expected: true,
        },
        {
            elementDescription: 'link',
            elementId: 'link',
            expected: true,
        },
        {
            elementDescription: 'element with role[link]',
            elementId: 'role-link',
            expected: true,
        },
        {
            elementDescription: 'cell without any interactive element',
            elementId: 'non-interactive-cell',
            expected: false,
        },
        {
            elementDescription: 'a span outside a button',
            elementId: 'non-interactive-span',
            expected: false,
        },
        {
            elementDescription: 'a span within a button',
            elementId: 'interactive-span',
            expected: true,
        },
    ];

    test.each(cases)(
        'should return $expected when clicking on $elementDescription',
        async ({ elementId, expected }) => {
            expect(await clickOnElement(document.getElementById(elementId)!)).toBe(expected);
        },
    );

    test('should return true when clicking outside the row element', () => {
        const row = document.querySelector('tr')!;
        const dialog = document.getElementById('dialog')!;

        // simulates a click event inside a dialog that was opened using a dialog trigger button located within the row
        const fakeEvent = {
            target: dialog,
            currentTarget: row,
        } as unknown as MouseEvent;

        const result = shouldIgnoreRowClick(fakeEvent);

        expect(result).toBe(true);
    });
});
