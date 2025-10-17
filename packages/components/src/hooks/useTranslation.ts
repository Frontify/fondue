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
 * const label = t('colorPicker.selectColor');
 *
 * // Translation with variables
 * const sortLabel = t('table.sortByAscending', { column: 'Name' });
 * ```
 */
export const useTranslation = () => {
    const { translations } = useContext(ThemeContext);

    /**
     * Translates a key to its localized string value.
     * Supports nested keys using dot notation (e.g., 'colorPicker.selectColor')
     * and variable interpolation using ${variable} syntax.
     *
     * @param key - The translation key in dot notation
     * @param variables - Optional variables to interpolate into the translation
     * @returns The translated string, or the key itself if translation is not found
     */
    const t = useCallback(
        (key: string, variables?: Record<string, string>): string => {
            // Navigate nested object using dot notation
            const keys = key.split('.');
            let value: unknown = translations;

            for (const k of keys) {
                if (typeof value === 'object' && value !== null && k in value) {
                    value = (value as Record<string, unknown>)[k];
                } else {
                    if (process.env.NODE_ENV !== 'production') {
                        console.warn(`[Fondue] Translation key "${key}" not found`);
                    }
                    return key;
                }
            }

            let text = String(value);

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
