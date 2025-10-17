/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '@frontify/fondue-tokens/theme-tokens';
import { Slot } from '@radix-ui/react-slot';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { deepMerge, en, type Translations } from '../../locales';

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
     * @default English translations
     * @example
     * ```tsx
     * import { de } from '@frontify/fondue/components/locales';
     * <ThemeProvider translations={de}>...</ThemeProvider>
     * ```
     */
    translations?: Translations | Partial<Translations>;
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
    translations: en,
});
ThemeContext.displayName = 'ThemeContext';

export const useFondueTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({
    children,
    theme = 'light',
    dir = 'ltr',
    translations: customTranslations,
    asChild = false,
}: ThemeProviderProps) => {
    const Comp = asChild ? Slot : 'div';

    // Merge custom translations with English defaults
    const finalTranslations = useMemo(() => {
        if (!customTranslations) {
            return en;
        }

        // If it's a complete Translations object, use it directly
        // Otherwise, merge partial translations with English defaults
        const hasAllKeys = Object.keys(en).every((key) => key in customTranslations);
        if (hasAllKeys) {
            return customTranslations as Translations;
        }

        return deepMerge(en, customTranslations);
    }, [customTranslations]);

    const contextValue = useMemo(
        () => ({
            theme,
            dir,
            translations: finalTranslations,
        }),
        [theme, dir, finalTranslations],
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <Comp dir={dir} className={styles[theme]}>
                {children}
            </Comp>
        </ThemeContext.Provider>
    );
};
