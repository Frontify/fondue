/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import {
    getAdjacentCell,
    getAllFocusableElements,
    getFocusableElement,
    handleKeyDown,
    isNavigationKey,
} from '../utils';

describe('Table Navigation', () => {
    let table: HTMLTableElement;

    const createTable = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.firstElementChild as HTMLTableElement;
    };

    const createKeyboardEvent = (key: string, ctrlKey = false, target?: HTMLElement) => {
        return {
            key,
            ctrlKey,
            target: target || document.createElement('button'),
            preventDefault: () => {},
        } as unknown as KeyboardEvent<HTMLTableElement>;
    };

    beforeEach(() => {
        table = createTable(`
            <table>
                <tbody>
                    <tr>
                        <td><button id="btn1">Button 1</button></td>
                        <td><input id="input1" type="text" /></td>
                        <td><button id="btn2">Button 2</button></td>
                    </tr>
                    <tr>
                        <td><button id="btn3">Button 3</button></td>
                        <td><select id="select1"><option>Option</option></select></td>
                        <td><button id="btn4">Button 4</button></td>
                    </tr>
                </tbody>
            </table>
        `);
        document.body.appendChild(table);
    });

    describe('getFocusableElement', () => {
        it('should find the first focusable element in a cell', () => {
            const cell = table.querySelector('td');
            const button = cell?.querySelector('button');
            const focusable = getFocusableElement(cell as HTMLElement);
            expect(focusable).toBe(button);
        });

        it('should return null for cell with no focusable elements', () => {
            const cell = document.createElement('td');
            const focusable = getFocusableElement(cell);
            expect(focusable).toBeNull();
        });
    });

    describe('getAllFocusableElements', () => {
        it('should return all focusable elements in the container', () => {
            const elements = getAllFocusableElements(table);
            expect(elements).toHaveLength(6);
            expect(elements[0]?.id).toBe('btn1');
            expect(elements[1]?.id).toBe('input1');
        });
    });

    describe('getAdjacentCell', () => {
        it('should get the cell above', () => {
            const currentCell = table.querySelector('tr:nth-child(2) td:first-child');
            const adjacentCell = getAdjacentCell(currentCell!, 'ArrowUp');
            expect(adjacentCell).toBe(table.querySelector('tr:first-child td:first-child'));
        });

        it('should get the cell below', () => {
            const currentCell = table.querySelector('tr:first-child td:first-child');
            const adjacentCell = getAdjacentCell(currentCell!, 'ArrowDown');
            expect(adjacentCell).toBe(table.querySelector('tr:nth-child(2) td:first-child'));
        });

        it('should get the cell to the right', () => {
            const currentCell = table.querySelector('td:first-child');
            const adjacentCell = getAdjacentCell(currentCell!, 'ArrowRight');
            expect(adjacentCell).toBe(table.querySelector('td:nth-child(2)'));
        });

        it('should get the cell to the left', () => {
            const currentCell = table.querySelector('td:nth-child(2)');
            const adjacentCell = getAdjacentCell(currentCell!, 'ArrowLeft');
            expect(adjacentCell).toBe(table.querySelector('td:first-child'));
        });
    });

    describe('handleKeyDown', () => {
        it('should handle arrow up navigation', () => {
            const button = table.querySelector('#btn3') as HTMLButtonElement;
            const event = createKeyboardEvent('ArrowUp', false, button);
            const spy = vi.spyOn(table.querySelector('#btn1') as HTMLButtonElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });

        it('should handle arrow down navigation', () => {
            const button = table.querySelector('#btn1') as HTMLButtonElement;
            const event = createKeyboardEvent('ArrowDown', false, button);
            const spy = vi.spyOn(table.querySelector('#btn3') as HTMLButtonElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });

        it('should handle linear navigation with arrow right', () => {
            const button = table.querySelector('#btn1') as HTMLButtonElement;
            const event = createKeyboardEvent('ArrowRight', false, button);
            const spy = vi.spyOn(table.querySelector('#input1') as HTMLInputElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });

        it('should handle linear navigation with arrow left', () => {
            const input = table.querySelector('#input1') as HTMLInputElement;
            const event = createKeyboardEvent('ArrowLeft', false, input);
            const spy = vi.spyOn(table.querySelector('#btn1') as HTMLButtonElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });

        it('should handle Ctrl+Home navigation', () => {
            const button = table.querySelector('#btn2') as HTMLButtonElement;
            const event = createKeyboardEvent('Home', true, button);
            const spy = vi.spyOn(table.querySelector('#btn1') as HTMLButtonElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });

        it('should handle Ctrl+End navigation', () => {
            const button = table.querySelector('#btn1') as HTMLButtonElement;
            const event = createKeyboardEvent('End', true, button);
            const spy = vi.spyOn(table.querySelector('#btn2') as HTMLButtonElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });

        it('should do nothing if table is not found', () => {
            const button = document.createElement('button');
            const event = createKeyboardEvent('ArrowRight', false, button);
            const preventDefault = vi.fn();
            event.preventDefault = preventDefault;

            handleKeyDown(event);

            expect(preventDefault).not.toHaveBeenCalled();
        });

        it('should wrap around when reaching the end of focusable elements', () => {
            const lastButton = table.querySelector('#btn4') as HTMLButtonElement;
            const event = createKeyboardEvent('ArrowRight', false, lastButton);
            const spy = vi.spyOn(table.querySelector('#btn1') as HTMLButtonElement, 'focus');

            handleKeyDown(event);

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('isNavigationKey', () => {
        it('should return true for valid navigation keys', () => {
            expect(isNavigationKey('ArrowUp')).toBe(true);
            expect(isNavigationKey('ArrowDown')).toBe(true);
            expect(isNavigationKey('ArrowLeft')).toBe(true);
            expect(isNavigationKey('ArrowRight')).toBe(true);
            expect(isNavigationKey('Home')).toBe(true);
            expect(isNavigationKey('End')).toBe(true);
        });

        it('should return false for invalid navigation keys', () => {
            expect(isNavigationKey('Enter')).toBe(false);
            expect(isNavigationKey('Tab')).toBe(false);
            expect(isNavigationKey('Space')).toBe(false);
        });
    });

    afterEach(() => {
        document.body.removeChild(table);
        vi.clearAllMocks();
    });
});
