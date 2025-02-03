/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, type ReactNode } from 'react';

import styles from './generated/themes.module.css';

type AvalaibleThemes = keyof typeof styles;

type ThemeProviderProps = {
    children: ReactNode;
    /**
     * The theme to apply
     * @default light
     * */
    theme: AvalaibleThemes;
};

const ThemeContext = createContext<AvalaibleThemes>('light');

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
