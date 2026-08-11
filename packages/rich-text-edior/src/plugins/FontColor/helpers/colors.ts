/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorPicker } from '@frontify/fondue-components';
import { type ComponentProps } from 'react';

/**
 * The colour as the picker works in it. Fondue does not export the type, so it
 * is taken from the component that does.
 */
export type RgbaColor = NonNullable<ComponentProps<typeof ColorPicker.Root>['currentColor']>;

const HEX_COLOR = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;
const RGB_COLOR = /^rgba?\(([^)]+)\)$/;

/**
 * The document's colour as the picker's. It is whatever CSS says it is: hex is
 * what this plugin writes, `rgb()`/`rgba()` is what a browser normalises a
 * pasted `style` attribute to.
 *
 * Anything else — a named colour, `hsl()` — reads as no colour, and the picker
 * opens on its own default rather than on the text's. Reading those would mean
 * asking the browser to resolve them, which is a document away from a helper
 * that otherwise only does arithmetic.
 */
export const parseCssColor = (css: unknown): RgbaColor | undefined => {
    if (typeof css !== 'string') {
        return undefined;
    }
    const value = css.trim();

    const hex = HEX_COLOR.exec(value)?.[1];
    if (hex !== undefined) {
        // `#abc` is `#aabbcc`: each digit stands for a doubled pair.
        const digits = hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex;
        return {
            red: parseInt(digits.slice(0, 2), 16),
            green: parseInt(digits.slice(2, 4), 16),
            blue: parseInt(digits.slice(4, 6), 16),
            alpha: 1,
        };
    }

    // Both spellings at once: the commas of `rgb(1, 2, 3)` and the spaces and
    // slash of the modern `rgb(1 2 3 / 0.5)`.
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

/**
 * The picker's colour as CSS. Hex while it is opaque, which is the shorter and
 * more familiar of the two, and `rgba()` as soon as it is not — hex alpha is
 * not understood everywhere the editor's HTML ends up.
 */
export const toCssColor = ({ red, green, blue, alpha = 1 }: RgbaColor): string => {
    const channels = [red, green, blue].map((channel) => Math.round(channel));
    return alpha >= 1
        ? `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
        : `rgba(${channels.join(', ')}, ${alpha})`;
};
