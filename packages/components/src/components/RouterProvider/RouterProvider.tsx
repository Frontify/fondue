/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, type ReactNode } from 'react';

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

const Context = createContext<{
    navigate: (path: string) => void;
    useHref: (path: string) => string;
}>({
    navigate: () => {
        throw new Error('RouterProvider: `navigate` function is not implemented');
    },
    useHref: () => {
        throw new Error('RouterProvider: `useHref` function is not implemented');
    },
});

export const useFondueRouter = () => {
    return useContext(Context);
};

export const RouterProvider = ({ children, navigate, useHref }: RouterProviderProps) => {
    return <Context.Provider value={{ navigate, useHref }}>{children}</Context.Provider>;
};
