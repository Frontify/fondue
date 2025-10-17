/* (c) Copyright Frontify Ltd., all rights reserved. */

export { en, type Translations } from './en';
export { de } from './de';
export { fr } from './fr';
export { it } from './it';
export { es } from './es';
export { pt } from './pt';
export { nl } from './nl';
export { pl } from './pl';

export const availableLocales = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'pl'] as const;

export type Locale = (typeof availableLocales)[number];

/**
 * Deep merge two objects, with the second object taking precedence.
 * Used for merging custom translations over default translations.
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
    const result = { ...target };

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = result[key];

            if (
                sourceValue &&
                typeof sourceValue === 'object' &&
                !Array.isArray(sourceValue) &&
                targetValue &&
                typeof targetValue === 'object' &&
                !Array.isArray(targetValue)
            ) {
                result[key] = deepMerge(targetValue, sourceValue);
            } else if (sourceValue !== undefined) {
                result[key] = sourceValue as any;
            }
        }
    }

    return result;
};
