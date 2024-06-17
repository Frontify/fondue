/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { type Breakpoint } from './layout';

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
    justify: 'justify-content',
    wrap: 'flex-wrap',
};

export const propsToCssVariables = (
    props: Record<string, string | number | { [key in Breakpoint]?: string | number }>,
): CSSProperties => {
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (value === undefined) {
            return acc;
        }

        const cssProperty = key in abbreviationToCssProperty ? abbreviationToCssProperty[key] : key;
        const cssPropertyKebabCase = cssProperty?.replaceAll(/([\da-z]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

        if (typeof value === 'object') {
            for (const [breakpoint, breakpointValue] of Object.entries(value)) {
                if (breakpointValue !== undefined) {
                    // @ts-expect-error CSS variables are not typed into `CSSProperties`
                    acc[`--${breakpoint}-${cssPropertyKebabCase}`] = breakpointValue;
                }
            }
        } else {
            // @ts-expect-error CSS variables are not typed into `CSSProperties`
            acc[`--${cssPropertyKebabCase}`] = value;
        }

        return acc;
    }, {} as CSSProperties);
};
