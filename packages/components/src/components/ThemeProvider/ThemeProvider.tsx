/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/themes';
import { Slot } from '@radix-ui/react-slot';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { enUS, type Translations } from '../../locales';

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
     * Translations object to use for component strings.
     * Import from '@frontify/fondue/components/locales' or provide your own.
     * Must be a complete Translations object.
     * @default "enUS"
     * @example
     * ```tsx
     * import { deDE } from '@frontify/fondue/components/locales';
     * <ThemeProvider translations={deDE}>...</ThemeProvider>
     * ```
     */
    translations?: Translations;
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
};

type ThemeContextValue = {
    theme: AvailableTheme;
    dir: 'ltr' | 'rtl';
    translations: Translations;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    dir: 'ltr',
    translations: enUS,
});
ThemeContext.displayName = 'ThemeContext';

export const useFondueTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({
    children,
    theme = 'light',
    dir = 'ltr',
    translations = enUS,
    asChild = false,
}: ThemeProviderProps) => {
    const Comp = asChild ? Slot : 'div';

    const contextValue = useMemo(
        () => ({
            theme,
            dir,
            translations,
        }),
        [dir, theme, translations],
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <Comp dir={dir} className={`${styles[theme]} fondue-theme-provider`}>
                {children}
            </Comp>
        </ThemeContext.Provider>
    );
};
