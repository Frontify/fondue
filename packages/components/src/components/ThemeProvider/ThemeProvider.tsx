/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/theme-tokens';
import { Slot } from '@radix-ui/react-slot';
import { createContext, useContext, type ReactNode } from 'react';

type AvailableTheme = keyof typeof styles;

type ThemeProviderProps = {
    children: ReactNode;
    /**
     * The theme to apply
     * @default "light"
     * */
    theme: AvailableTheme;
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
};

export const ThemeContext = createContext<AvailableTheme>('light');
ThemeContext.displayName = 'ThemeContext';

export const useFondueTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children, theme = 'light', asChild = false }: ThemeProviderProps) => {
    const Comp = asChild ? Slot : 'div';
    return (
        <ThemeContext.Provider value={theme}>
            <Comp className={styles[theme]}>{children}</Comp>
        </ThemeContext.Provider>
    );
};
