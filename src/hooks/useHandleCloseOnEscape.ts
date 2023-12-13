/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect } from 'react';

export const useHandleCloseOnEscape = (
    open: boolean,
    { isBlockingModal, callback }: { isBlockingModal?: boolean; callback?: () => void } = { isBlockingModal: false },
): void => {
    const checkKeyboardEvent = useCallback(
        (event: KeyboardEvent) => {
            const callbackFnc = typeof callback === 'function' ? callback : () => ({});

            if (open) {
                event.stopPropagation();
            }
            if (open && !isBlockingModal && event.key === 'Escape') {
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
};
