/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/themes';
import { Slot } from '@radix-ui/react-slot';
import { createContext, type ForwardedRef, forwardRef, useContext, useMemo, type ReactNode } from 'react';

import { enUS, type LocaleConfig } from '../../locales';

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
     * @deprecated Use `locale` instead.
     */
    translations?: LocaleConfig;
    /**
     * Locale object to use for component strings.
     * Import from '@frontify/fondue/components/locales' or provide your own.
     * Must be a complete LocaleConfig object.
     * @default "enUS"
     * @example
     * ```tsx
     * import { deDE } from '@frontify/fondue/components/locales';
     * <ThemeProvider locale={deDE}>...</ThemeProvider>
     * ```
     */
    locale?: LocaleConfig;
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
};

type ThemeContextValue = {
    theme: AvailableTheme;
    dir: 'ltr' | 'rtl';
    locale: LocaleConfig;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    dir: 'ltr',
    locale: enUS,
});
ThemeContext.displayName = 'ThemeContext';

export const useFondueTheme = () => {
    const context = useContext(ThemeContext);
    // Ensure we always have a valid direction, defaulting to 'ltr' if not provided
    return {
        ...context,
        dir: context.dir || 'ltr',
    };
};

export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
    (
        { children, theme = 'light', dir = 'ltr', translations = enUS, locale, asChild = false },
        forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
        const Comp = asChild ? Slot : 'div';

        const contextValue = useMemo(
            () => ({
                theme,
                dir,
                locale: locale ? locale : translations,
            }),
            [dir, theme, locale, translations],
        );

        return (
            <ThemeContext.Provider value={contextValue}>
                <Comp ref={forwardedRef} dir={dir} className={`${styles[theme]} fondue-theme-provider`}>
                    {children}
                </Comp>
            </ThemeContext.Provider>
        );
    },
);

ThemeProvider.displayName = 'ThemeProvider';
