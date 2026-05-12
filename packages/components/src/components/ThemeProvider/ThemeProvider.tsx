/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/themes';
import { Slot } from '@radix-ui/react-slot';
import { createContext, type ForwardedRef, forwardRef, useContext, useMemo, type ReactNode } from 'react';

import { enUS } from '../../locales';
import { type LocaleConfig } from '../../locales/types';

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
     * Import from '@frontify/fondue/locales' or provide your own.
     * Must be a complete LocaleConfig object.
     * @default "enUS"
     * @example
     * ```tsx
     * import { deDE } from '@frontify/fondue/locales';
     * <ThemeProvider locale={deDE}>...</ThemeProvider>
     * ```
     */
    locale?: LocaleConfig;
    /**
     * Additional class name to apply to the theme provider, used to scope styles to a specific component or section of the application.
     * The class is propagated to portaled content (e.g. Dropdown, Tooltip, Dialog) so scoped styles are still applied.
     * @default ""
     */
    className?: string;
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
    className: string;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    dir: 'ltr',
    locale: enUS,
    className: '',
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
        { children, theme, dir, translations, locale, className, asChild = false },
        forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
        const Comp = asChild ? Slot : 'div';

        const existingContext = useFondueTheme();

        const contextValue = useMemo(
            () => ({
                theme: theme ?? existingContext.theme,
                dir: dir ?? existingContext.dir,
                locale: locale ?? translations ?? existingContext.locale,
                className: className ?? existingContext.className,
            }),
            [dir, theme, locale, translations, className, existingContext],
        );

        return (
            <ThemeContext.Provider value={contextValue}>
                <Comp
                    ref={forwardedRef}
                    dir={contextValue.dir}
                    className={['fondue-theme-provider', styles[contextValue.theme], contextValue.className].join(' ')}
                >
                    {children}
                </Comp>
            </ThemeContext.Provider>
        );
    },
);

ThemeProvider.displayName = 'ThemeProvider';
