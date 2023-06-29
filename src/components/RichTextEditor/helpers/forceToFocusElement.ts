/* (c) Copyright Frontify Ltd., all rights reserved. */

export const forceToFocusNextElement = (event: React.KeyboardEvent, forwards: boolean) => {
    if (!document.activeElement) {
        return;
    }
    event.preventDefault();
    const focusableElementSelectors =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [contenteditable], iframe, object, embed, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(document.querySelectorAll(focusableElementSelectors));
    const currentIndex = focusableElements.indexOf(document.activeElement);
    const indexOfNextFocus =
        (forwards ? currentIndex + 1 : currentIndex - 1 + focusableElements.length) % focusableElements.length;
    const nextFocusable = focusableElements[indexOfNextFocus] as HTMLElement;
    if (nextFocusable) {
        nextFocusable.focus();
    }
};
