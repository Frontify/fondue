/* (c) Copyright Frontify Ltd., all rights reserved. */

const TABBABLE_ELEMENTS = [
    'input',
    'select',
    'textarea',
    'button',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]',
].join(':not([hidden]):not([tabindex="-1"]):not([disabled]),');

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
