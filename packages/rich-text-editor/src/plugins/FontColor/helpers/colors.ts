/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorPicker } from '@frontify/fondue-components';
import { type ComponentProps } from 'react';

/** What a colour carries in the document. */
export type FontColorValue = {
    color: string;
};

/** The picker's colour type, derived from the component because Fondue does not export it. */
export type RgbaColor = NonNullable<ComponentProps<typeof ColorPicker.Root>['currentColor']>;

const HEX_COLOR = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;
const RGB_COLOR = /^rgba?\(([^)]+)\)$/;

/** `red`, `#abc`, `#aabbccdd`, or one `rgb()`/`rgba()`/`hsl()`/`hsla()` holding nothing but numbers. */
const CSS_COLOR = /^([a-z]+|#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})|(rgba?|hsla?)\([\d.%,\s/]*\))$/i;

/**
 * Whether a value is a colour safe to write into a `style`: one keyword, a hex
 * value, or a single colour function of plain numbers. Anything that could
 * carry more CSS — `;`, braces, `url(`, escapes — is not, so a stored or pasted
 * colour never becomes a second declaration.
 */
export const isCssColor = (value: unknown): value is string => typeof value === 'string' && CSS_COLOR.test(value);

/**
 * Reads hex (what this plugin writes) and `rgb()`/`rgba()` (what browsers
 * normalise a pasted `style` to). Named colours and `hsl()` read as no colour:
 * resolving them would mean asking the browser.
 */
export const parseCssColor = (css: string | undefined): RgbaColor | undefined => {
    if (css === undefined) {
        return undefined;
    }
    const value = css.trim();

    const hex = HEX_COLOR.exec(value)?.[1];
    if (hex !== undefined) {
        // `#abc` is `#aabbcc`.
        const digits = hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex;
        return {
            red: parseInt(digits.slice(0, 2), 16),
            green: parseInt(digits.slice(2, 4), 16),
            blue: parseInt(digits.slice(4, 6), 16),
            alpha: 1,
        };
    }

    // Handles both `rgb(1, 2, 3)` and the modern `rgb(1 2 3 / 0.5)`.
    const [red, green, blue, alpha] =
        RGB_COLOR.exec(value)?.[1]
            ?.split(/[\s,/]+/)
            .filter((part) => part !== '')
            .map(Number) ?? [];
    if (red === undefined || green === undefined || blue === undefined) {
        return undefined;
    }
    if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
        return undefined;
    }
    // A percentage alpha (`/ 50%`) is not a number, and counts as opaque.
    return { red, green, blue, alpha: alpha === undefined || Number.isNaN(alpha) ? 1 : alpha };
};

/** Hex while opaque, `rgba()` otherwise: hex alpha is not understood everywhere exported HTML ends up. */
export const toCssColor = ({ red, green, blue, alpha = 1 }: RgbaColor): string => {
    const channels = [red, green, blue].map((channel) => Math.round(channel));
    return alpha >= 1
        ? `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
        : `rgba(${channels.join(', ')}, ${alpha})`;
};
