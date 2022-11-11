import { useCallback, useEffect, useState } from 'react';

export const useMenuKeyboardNavigation = (
    isMenuOpened: boolean,
    menuContainerRef: HTMLElement | null,
    focusableElementsSelector = 'li > button:not(:disabled)',
) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [itemsElements, setItemsElements] = useState<NodeList>();
    const [menuKeyboardNavigationAction, setMenuKeyboardNavigationAction] = useState('');

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!itemsElements || !['Tab', 'ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
                return;
            }

            const isTab = event.key === 'Tab' && !event.shiftKey;
            const isShiftTab = event.key === 'Tab' && event.shiftKey;
            const isEsc = event.key === 'Escape';
            const shouldMoveDown = isTab || event.key === 'ArrowDown';
            const shouldMoveUp = isShiftTab || event.key === 'ArrowUp';

            if (
                (isShiftTab && currentItemIndex <= 0) ||
                (isTab && currentItemIndex >= itemsElements.length - 1) ||
                isEsc
            ) {
                setMenuKeyboardNavigationAction('CLOSE_MENU');
                return;
            }

            if (shouldMoveDown) {
                setCurrentItemIndex(Math.min(currentItemIndex + 1, itemsElements.length - 1));
            } else if (shouldMoveUp) {
                setCurrentItemIndex(Math.max(currentItemIndex - 1, 0));
            }

            event.preventDefault();
        },
        [itemsElements, currentItemIndex],
    );

    useEffect(() => {
        if (!isMenuOpened || !menuContainerRef) {
            return;
        }

        const focusableItems = menuContainerRef.querySelectorAll(focusableElementsSelector);

        for (const item of focusableItems) {
            (item as HTMLButtonElement | HTMLAnchorElement).onkeydown = handleKeyDown;
        }

        if (!itemsElements) {
            setItemsElements(focusableItems);
        }
    }, [isMenuOpened, menuContainerRef, itemsElements, handleKeyDown, focusableElementsSelector]);

    useEffect(() => {
        if (!itemsElements) {
            return;
        }

        if (itemsElements[currentItemIndex]) {
            (itemsElements[currentItemIndex] as HTMLButtonElement).focus();
        }
    }, [currentItemIndex, itemsElements]);

    useEffect(() => {
        if (!isMenuOpened) {
            setItemsElements(undefined);
            setMenuKeyboardNavigationAction('');
        }

        setCurrentItemIndex(0);
    }, [isMenuOpened]);

    return menuKeyboardNavigationAction;
};
