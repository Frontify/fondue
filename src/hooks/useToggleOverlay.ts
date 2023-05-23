/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';

export const useToggleOverlay = (
    initialState: boolean,
    { isBlockingModal }: { isBlockingModal?: boolean },
): [boolean, (value: boolean) => void] => {
    const [open, setOpen] = useState<boolean>(initialState);
    const checkKeyboardEvent = useCallback(
        (event: KeyboardEvent) => {
            if (open && isBlockingModal && event.key === 'Escape') {
                setOpen(false);
            }
        },
        [isBlockingModal, open],
    );

    useEffect(() => {
        window.addEventListener('keydown', checkKeyboardEvent);
        if (!isBlockingModal) {
            window.addEventListener('blur', () => setOpen(false));
        }

        return () => {
            window.removeEventListener('keydown', checkKeyboardEvent);
        };
    }, [checkKeyboardEvent, open]);
    const handler = useCallback((value: boolean): void => setOpen(value), []);
    return [open, handler];
};
