/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useMemo, type ReactNode } from 'react';

export type RouterProviderProps = {
    children: ReactNode;
    /**
     * Navigation function called when a `<Link>` is clicked. Wire this to your router's push/navigate method.
     * @param path - The destination path
     */
    navigate: (path: string) => void;
    /**
     * Resolves a path into a full URL. Wire this to your router's href resolution logic.
     * @param path - The path to resolve
     */
    useHref: (path: string) => string;
};

const RouterContext = createContext<{
    navigate: (path: string) => void;
    useHref: (path: string) => string;
}>({
    navigate: () => {
        throw new Error('RouterProvider: `navigate` function is not implemented');
    },
    // eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix
    useHref: () => {
        throw new Error('RouterProvider: `useHref` function is not implemented');
    },
});
RouterContext.displayName = 'RouterContext';

export const useFondueRouter = () => {
    return useContext(RouterContext);
};

export const RouterProvider = ({ children, navigate, useHref }: RouterProviderProps) => {
    const contextValue = useMemo(() => ({ navigate, useHref }), [navigate, useHref]);

    return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
};
