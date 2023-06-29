/* (c) Copyright Frontify Ltd., all rights reserved. */

const TABBABLE_ELEMENTS = [
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(':not([hidden]):not([tabindex="-1"]),');

export const forceToFocusNextElement = (event: React.KeyboardEvent, forwards: boolean) => {
    if (!document.activeElement) {
        return;
    }
    event.preventDefault();
    const focusableElements = Array.from(document.querySelectorAll(TABBABLE_ELEMENTS));
    const currentIndex = focusableElements.indexOf(document.activeElement);
    const indexOfNextFocus =
        (forwards ? currentIndex + 1 : currentIndex - 1 + focusableElements.length) % focusableElements.length;
    const nextFocusable = focusableElements[indexOfNextFocus] as HTMLElement;
    if (nextFocusable) {
        nextFocusable.focus();
    }
};
