/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';

export const useToggleOverlay = (
    initialState = false,
    { isBlockingModal }: { isBlockingModal?: boolean } = { isBlockingModal: false },
): [boolean, (value: boolean) => void] => {
    const [open, setOpen] = useState<boolean>(initialState);
    const checkKeyboardEvent = useCallback(
        (event: KeyboardEvent) => {
            if (open && !isBlockingModal && event.key === 'Escape') {
                setOpen(false);
            }
        },
        [isBlockingModal, open],
    );

    useEffect(() => {
        window.addEventListener('keydown', checkKeyboardEvent);

        return () => {
            window.removeEventListener('keydown', checkKeyboardEvent);
        };
    }, [checkKeyboardEvent, isBlockingModal]);

    const handler = useCallback((value: boolean): void => setOpen(value), []);
    return [open, handler];
};
