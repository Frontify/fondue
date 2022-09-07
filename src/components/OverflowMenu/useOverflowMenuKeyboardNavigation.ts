import { useCallback, useEffect, useState } from 'react';

export const useOverflowMenuKeyboardNavigation = (isMenuOpened: boolean, menuContainerRef: HTMLElement | null) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [itemsElements, setItemsElements] = useState<NodeList>();
    const [menuKeyboardNavigationAction, setMenuKeyboardNavigationAction] = useState('');

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!itemsElements || !['Tab', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
                return;
            }

            const isTab = event.key === 'Tab' && !event.shiftKey;
            const isShiftTab = event.key === 'Tab' && event.shiftKey;
            const shouldMoveDown = isTab || event.key === 'ArrowDown';
            const shouldMoveUp = isShiftTab || event.key === 'ArrowUp';

            if ((isShiftTab && currentItemIndex <= 0) || (isTab && currentItemIndex >= itemsElements.length - 1)) {
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

        const focusableItems = menuContainerRef?.querySelectorAll('[id^=overflow-menu-item] .item-action');

        for (const item of focusableItems) {
            (item as HTMLButtonElement | HTMLAnchorElement).onkeydown = handleKeyDown;
        }

        if (!itemsElements) {
            setItemsElements(focusableItems);
        }
    }, [isMenuOpened, menuContainerRef, itemsElements, handleKeyDown]);

    useEffect(() => {
        if (!itemsElements) {
            return;
        }

        (itemsElements[currentItemIndex] as HTMLButtonElement).focus();
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
