/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/theme-tokens';
import { createContext, useContext, type ReactNode } from 'react';

type AvalaibleThemes = keyof typeof styles;

type ThemeProviderProps = {
    children: ReactNode;
    /**
     * The theme to apply
     * @default light
     * */
    theme: AvalaibleThemes;
};

export const ThemeContext = createContext<AvalaibleThemes>('light');

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
