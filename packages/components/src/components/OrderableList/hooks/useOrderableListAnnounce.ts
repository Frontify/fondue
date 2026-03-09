/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useCallback, useContext, useState } from 'react';

type AnnounceFunction = (message: string) => void;

const OrderableListAnnounceContext = createContext<AnnounceFunction>(() => {});
OrderableListAnnounceContext.displayName = 'OrderableListAnnounceContext';

export const OrderableListAnnounceProvider = OrderableListAnnounceContext.Provider;

export const useOrderableListAnnounce = (): AnnounceFunction => useContext(OrderableListAnnounceContext);

export const useAnnounceState = () => {
    const [message, setMessage] = useState('');

    const announce = useCallback((text: string) => {
        // Clear first to ensure repeated identical messages are announced
        setMessage('');
        requestAnimationFrame(() => setMessage(text));
    }, []);

    return { message, announce };
};
