/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The value of each Fondue token that exported inline styles fall back to, as the light theme sets it
 * in `@frontify/fondue-tokens`. `fondueTokens.spec.ts` holds them equal to the package.
 */
const FONDUE_TOKEN_VALUES = {
    'color-primary-default': 'rgba(17, 17, 16, 1)',
    'color-highlight-default': 'rgba(182, 10, 227, 1)',
    'color-container-secondary-on-secondary-container-variant': 'rgba(87, 87, 83, 1)',
    'typography-font-family-primary':
        'Diatype, Geist, Arial, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
    'typography-font-size-medium': '0.875rem',
    'typography-font-size-small': '0.8125rem',
    'typography-font-size-x-small': '0.75rem',
    'typography-font-weight-medium': '500',
    'typography-font-weight-bold': '700',
    'typography-letter-spacing-wide': '0.88px',
    'typography-text-transform-uppercase': 'uppercase',
    'spacing-x-small': '0.5rem',
    'spacing-medium': '1rem',
    'text-heading-xx-large-strong-font-size': '1.5rem',
    'text-heading-xx-large-strong-font-weight': '700',
    'text-heading-x-large-strong-font-size': '1.25rem',
    'text-heading-x-large-strong-font-weight': '700',
    'text-heading-large-default-font-size': '1rem',
    'text-heading-large-default-font-weight': '500',
    'text-heading-medium-default-font-size': '0.875rem',
    'text-heading-medium-default-font-weight': '500',
} as const;

/** The name of a Fondue token that has a value to fall back to. */
export type FondueTokenName = keyof typeof FONDUE_TOKEN_VALUES;

/** `FONDUE_TOKEN_VALUES`, for the spec that compares them with the tokens package. */
export const fondueTokenValues: Readonly<Record<FondueTokenName, string>> = FONDUE_TOKEN_VALUES;

/**
 * A Fondue token read with its value as the fallback: `var(--spacing-x-small, 0.5rem)`.
 * Where the token is loaded, the page's theme wins. Where it is not, as in an email
 * client, the value stands. Gmail, Outlook and Yahoo support no custom properties, see
 * https://www.caniemail.com/features/css-variables/.
 */
export const fondueToken = (name: FondueTokenName): string => `var(--${name}, ${FONDUE_TOKEN_VALUES[name]})`;
