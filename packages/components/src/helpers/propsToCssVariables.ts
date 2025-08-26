/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { type Breakpoint } from './layout';

const isAriaProp = (key: string): boolean => {
    return key.startsWith('aria-') || key === 'role';
};

const abbreviationToCssProperty: Record<string, string> = {
    m: 'margin',
    mx: 'margin-x',
    my: 'margin-y',
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',
    p: 'padding',
    px: 'padding-x',
    py: 'padding-y',
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',
    direction: 'flex-direction',
    align: 'align-items',
    wrap: 'flex-wrap',
    columns: 'grid-template-columns',
    rows: 'grid-template-rows',
};

const transformValueBasedOnKey = (key: string, value: string | number): string | number => {
    if (key === 'columns' || key === 'rows') {
        if (typeof value === 'number') {
            return `repeat(${value}, 1fr)`;
        }
        return value;
    }

    // Spacing tokens
    if (typeof value === 'number') {
        return `${value * 0.25}rem`;
    }

    return value;
};

export const propsToCssVariables = (
    props: Record<string, string | number | boolean | { [key in Breakpoint]?: string | number | boolean }>,
    extraAbbreviationToCssProperty: Record<string, string> = {},
): CSSProperties => {
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (isAriaProp(key)) {
            return acc;
        }

        const cssProperty =
            key in extraAbbreviationToCssProperty
                ? extraAbbreviationToCssProperty[key]
                : key in abbreviationToCssProperty
                  ? abbreviationToCssProperty[key]
                  : key;
        // The lookahead is necessary to split camelCase boundaries; disabling false-positive lint warning
        const cssPropertyKebabCase = cssProperty?.replaceAll(/([\da-z]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

        if (typeof value === 'object') {
            for (const [breakpoint, breakpointValue] of Object.entries(value)) {
                if (breakpointValue !== undefined) {
                    // @ts-expect-error CSS variables are not typed into `CSSProperties`
                    acc[`--${breakpoint}-${cssPropertyKebabCase}`] = transformValueBasedOnKey(key, breakpointValue);
                }
            }
        } else {
            // @ts-expect-error CSS variables are not typed into `CSSProperties`
            acc[`--${cssPropertyKebabCase}`] = transformValueBasedOnKey(key, value);
        }

        return acc;
    }, {} as CSSProperties);
};
