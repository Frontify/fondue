/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';

export const useToggleOverlay = (initialState = false): [boolean, any] => {
    const [open, setOpen] = useState<boolean>(initialState);
    const checkKeyboardEvent = useCallback(
        (event: KeyboardEvent) => {
            if (open && event.key === 'Escape') {
                setOpen(false);
            }
        },
        [open],
    );

    useEffect(() => {
        window.addEventListener('keydown', checkKeyboardEvent);

        return () => {
            window.removeEventListener('keydown', checkKeyboardEvent);
        };
    }, [checkKeyboardEvent, open]);
    const handler = useCallback((value: boolean): void => setOpen(value), []);
    return [open, handler];
};
