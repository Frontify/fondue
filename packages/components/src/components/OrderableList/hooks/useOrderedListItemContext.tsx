/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, type ReactNode } from 'react';

type OrderableItemContextType = {
    dragHandleRef: (element: Element | null) => void;
    onSelect?: (isSelected: boolean) => void;
};

export const OrderableItemContext = createContext<OrderableItemContextType>({
    dragHandleRef: () => null,
});
OrderableItemContext.displayName = 'OrderableItemContext';

export const useOrderableItemContext = (): OrderableItemContextType => useContext(OrderableItemContext);

export const OrderableItemContextProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: OrderableItemContextType;
}) => {
    return <OrderableItemContext.Provider value={value}>{children}</OrderableItemContext.Provider>;
};
