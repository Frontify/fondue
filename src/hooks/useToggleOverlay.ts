/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';

export const useToggleOverlay = (
    initialState = false,
    { isBlockingModal, callback }: { isBlockingModal?: boolean; callback?: () => void } = { isBlockingModal: false },
): [boolean, (value: boolean) => void] => {
    const [open, setOpen] = useState<boolean>(initialState);

    const checkKeyboardEvent = useCallback(
        (event: KeyboardEvent) => {
            const callbackFnc = typeof callback === 'function' ? callback : () => ({});

            if (open) {
                event.stopPropagation();
            }
            if (open && !isBlockingModal && event.key === 'Escape') {
                setOpen(false);
                callbackFnc();
            }
        },
        [callback, isBlockingModal, open],
    );

    useEffect(() => {
        window.addEventListener('keydown', checkKeyboardEvent);
        window.addEventListener('blur', () => setOpen(false));

        return () => {
            window.removeEventListener('keydown', checkKeyboardEvent);
            window.removeEventListener('blur', () => setOpen(false));
        };
    }, [checkKeyboardEvent, isBlockingModal]);

    return [open, setOpen];
};
