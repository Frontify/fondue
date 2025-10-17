/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext } from 'react';

import { ThemeContext } from '../components/ThemeProvider/ThemeProvider';

/**
 * Hook to access translation functionality.
 *
 * @returns Object containing translation function
 *
 * @example
 * ```tsx
 * const { t } = useTranslation();
 *
 * // Simple translation
 * const label = t('ColorPicker_selectColor');
 *
 * // Translation with variables
 * const sortLabel = t('Table_sortByAscending', { column: 'Name' });
 * ```
 */
export const useTranslation = () => {
    const { translations } = useContext(ThemeContext);

    /**
     * Translates a key to its localized string value.
     * Keys follow the format ComponentName_localLabelName[_moreLocalLabelName]
     * and support variable interpolation using ${variable} syntax.
     *
     * @param key - The translation key (e.g., 'ColorPicker_selectColor')
     * @param variables - Optional variables to interpolate into the translation
     * @returns The translated string, or the key itself if translation is not found
     */
    const t = useCallback(
        (key: keyof typeof translations, variables?: Record<string, string>): string => {
            // Direct lookup for flat keys
            const value = translations[key];

            if (value === undefined) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`[Fondue] Translation key "${key}" not found`);
                }
                return key;
            }

            if (typeof value !== 'string') {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`[Fondue] Translation value for key "${key}" is not a string`);
                }
                return key;
            }

            let text = value;

            // Variable interpolation: replace ${variable} with actual values
            if (variables) {
                for (const [varKey, varValue] of Object.entries(variables)) {
                    text = text.replaceAll(`\${${varKey}}`, varValue);
                }
            }

            return text;
        },
        [translations],
    );

    return {
        /** Translation function */
        t,
    };
};
