/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/themes';
import { Slot } from '@radix-ui/react-slot';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

type AvailableTheme = keyof typeof styles;

type ThemeProviderProps = {
    children: ReactNode;
    /**
     * The theme to apply
     * @default "light"
     * */
    theme?: AvailableTheme;
    /**
     * Direction to apply to the theme
     * @default "ltr"
     */
    dir?: 'ltr' | 'rtl';
    /**
     * Direction to apply to the theme
     * @default "ltr"
     */
    dir: 'ltr' | 'rtl';
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
};

export const ThemeContext = createContext<Pick<ThemeProviderProps, 'theme' | 'dir'>>({ theme: 'light', dir: 'ltr' });
ThemeContext.displayName = 'ThemeContext';

export const useFondueTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children, theme = 'light', dir = 'ltr', asChild = false }: ThemeProviderProps) => {
    const Comp = asChild ? Slot : 'div';

    const contextValue = useMemo(() => ({ theme, dir }), [theme, dir]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <Comp dir={dir} className={`${styles[theme]} fondue-theme-provider`}>
                {children}
            </Comp>
        </ThemeContext.Provider>
    );
};
