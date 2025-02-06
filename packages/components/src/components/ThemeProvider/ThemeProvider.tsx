/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/theme-tokens';
import { createContext, useContext, type ReactNode } from 'react';

type AvalaibleTheme = keyof typeof styles;

type ThemeProviderProps = {
    children: ReactNode;
    /**
     * The theme to apply
     * @default light
     * */
    theme: AvalaibleTheme;
};

export const ThemeContext = createContext<AvalaibleTheme>('light');

export const useFondueTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children, theme = 'light' }: ThemeProviderProps) => {
    return (
        <ThemeContext.Provider value={theme}>
            <div className={styles[theme]}>{children}</div>
        </ThemeContext.Provider>
    );
};
