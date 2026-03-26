/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useMemo, type ReactNode } from 'react';

export type RouterProviderProps = {
    children: ReactNode;
    /**
     * Function to navigate to a specific path
     */
    navigate: (path: string) => void;
    /**
     * Function to resolves a URL against the current location.
     */
    useHref: (path: string) => string;
};

const RouterContext = createContext<{
    navigate: (path: string) => void;
    useHref: (path: string) => string;
}>({
    navigate: () => {},
    // eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix
    useHref: (path: string) => path,
});
RouterContext.displayName = 'RouterContext';

export const useFondueRouter = () => {
    return useContext(RouterContext);
};

export const RouterProvider = ({ children, navigate, useHref }: RouterProviderProps) => {
    const contextValue = useMemo(() => ({ navigate, useHref }), [navigate, useHref]);

    return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
};
