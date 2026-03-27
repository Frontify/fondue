/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

type CardContextValue = {
    titleId: string;
};

export const CardContext = createContext<CardContextValue | null>(null);
CardContext.displayName = 'CardContext';

export const useCardContext = () => useContext(CardContext);
