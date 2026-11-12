/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

type OrderableItemContextType = {
    itemId: string;
    dragHandleRef: (element: Element | null) => void;
    selected?: boolean;
    onSelect?: (isSelected: boolean) => void;
};

export const OrderableItemContext = createContext<OrderableItemContextType>({
    itemId: '',
    dragHandleRef: () => null,
});
OrderableItemContext.displayName = 'OrderableItemContext';

export const OrderableItemContextProvider = OrderableItemContext.Provider;

export const useOrderableItemContext = (): OrderableItemContextType => useContext(OrderableItemContext);
