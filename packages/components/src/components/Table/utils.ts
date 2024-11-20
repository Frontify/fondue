/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

/**
 * Combined selector string for all focusable elements
 */
const FOCUSABLE_SELECTORS = ['button', '[href]', 'input', 'select', 'textarea', '[tabindex]:not([tabindex="-1"])'].join(
    ', ',
);

/**
 * Valid keyboard navigation keys for table interaction
 */
export type NavigationKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Home' | 'End';

/**
 * Type guard to check if a string is a valid navigation key
 * @param key - The key to check
 * @returns True if the key is a valid navigation key
 */
export const isNavigationKey = (key: string): key is NavigationKey => {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key);
};

/**
 * Finds the first focusable element within a table cell
 * @param cell - The table cell to search within
 * @returns The first focusable element or null if none found
 */
export const getFocusableElement = (cell: HTMLElement | null) => {
    return cell?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS) ?? null;
};

/**
 * Gets all focusable elements within a container
 * @param container - The container element to search within
 * @returns Array of focusable elements
 */
export const getAllFocusableElements = (container: HTMLElement) => {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
};

/**
 * Gets a cell at a specific index within a row
 * @param row - The table row element
 * @param index - The index of the cell to retrieve
 * @returns The cell element at the specified index
 */
export const getCellAtIndex = (row: HTMLElement, index: number) => {
    return row.children[index] as HTMLElement;
};

/**
 * Gets the next adjacent cell based on the navigation key
 * @param currentCell - The current cell element
 * @param key - The navigation key pressed
 * @returns The next cell element or null if none exists
 */
export const getAdjacentCell = (currentCell: Element, key: NavigationKey): HTMLElement | null => {
    const currentRow = currentCell.closest('tr');
    if (!currentRow) {
        return null;
    }

    const cellIndex = Array.from(currentRow.children).indexOf(currentCell);

    switch (key) {
        case 'ArrowUp': {
            const previousRow = currentRow.previousElementSibling;
            return previousRow ? getCellAtIndex(previousRow as HTMLElement, cellIndex) : null;
        }
        case 'ArrowDown': {
            const nextRow = currentRow.nextElementSibling;
            return nextRow ? getCellAtIndex(nextRow as HTMLElement, cellIndex) : null;
        }
        case 'ArrowLeft':
            return currentCell.previousElementSibling as HTMLElement;
        case 'ArrowRight':
            return currentCell.nextElementSibling as HTMLElement;
        case 'Home':
        case 'End': {
            const cells = Array.from(currentRow.querySelectorAll('td, th'));
            return cells[key === 'Home' ? 0 : cells.length - 1] as HTMLElement;
        }
    }
};

/**
 * Recursively finds the next cell containing a focusable element
 * @param currentCell - The current cell element
 * @param key - The navigation key pressed
 * @returns The next cell containing a focusable element or null if none exists
 */
export const getNextFocusableCell = (currentCell: Element, key: NavigationKey): HTMLElement | null => {
    const nextCell = getAdjacentCell(currentCell, key);
    if (!nextCell) {
        return null;
    }

    return getFocusableElement(nextCell) ? nextCell : getNextFocusableCell(nextCell, key);
};

/**
 * Handles grid-based navigation (up, down, home, end)
 * @param event - The keyboard event
 * @param currentCell - The current cell element
 */
export const handleGridNavigation = (event: KeyboardEvent<HTMLTableElement>, currentCell: Element) => {
    if (!isNavigationKey(event.key)) {
        return;
    }

    const nextCell = getNextFocusableCell(currentCell, event.key);
    if (!nextCell) {
        return;
    }

    const focusableElement = getFocusableElement(nextCell);
    if (focusableElement) {
        event.preventDefault();
        focusableElement.focus();
    }
};

/**
 * Handles linear navigation between focusable elements (left, right)
 * @param event - The keyboard event
 * @param table - The table element
 * @param target - The currently focused element
 */
export const handleLinearNavigation = (
    event: KeyboardEvent<HTMLTableElement>,
    table: HTMLElement,
    target: HTMLElement,
) => {
    const focusableElements = getAllFocusableElements(table);
    const currentIndex = focusableElements.indexOf(target);
    if (currentIndex === -1) {
        return;
    }

    const nextIndex = currentIndex + (event.key === 'ArrowLeft' ? -1 : 1);
    const wrappedIndex = (nextIndex + focusableElements.length) % focusableElements.length;

    event.preventDefault();
    focusableElements[wrappedIndex]?.focus();
};

/**
 * Main keyboard event handler for table navigation
 * @param event - The keyboard event
 *
 * @example
 * ```tsx
 * <table onKeyDown={handleKeyDown}>
 *   <tbody>
 *     <tr>
 *       <td><button>Focusable</button></td>
 *       <td><input type="text" /></td>
 *     </tr>
 *   </tbody>
 * </table>
 * ```
 *
 * Navigation behaviors:
 * - Arrow Up/Down: Move to the same column in the previous/next row
 * - Arrow Left/Right: Move to the previous/next focusable element
 * - Ctrl + Home/End: Move to the first/last cell in the current row
 */
export const handleKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement;
    const currentCell = target.closest('td, th');
    const table = target.closest('table');

    if (!table) {
        return;
    }

    if (currentCell && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        handleGridNavigation(event, currentCell);
        return;
    }

    if (event.ctrlKey && currentCell && (event.key === 'Home' || event.key === 'End')) {
        handleGridNavigation(event, currentCell);
        return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        handleLinearNavigation(event, table, target);
    }
};
