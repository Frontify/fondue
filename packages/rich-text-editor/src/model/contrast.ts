/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Rgba = {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
};

const channelOf = (part: string, scale: number): number | undefined => {
    const percent = part.endsWith('%');
    const value = Number.parseFloat(percent ? part.slice(0, -1) : part);
    if (!Number.isFinite(value)) {
        return undefined;
    }
    return Math.min(scale, Math.max(0, percent ? (value / 100) * scale : value));
};

const RGB = /^rgba?\(\s*([\d.]+%?)\s*[,\s]\s*([\d.]+%?)\s*[,\s]\s*([\d.]+%?)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i;

/** A colour as `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()` or `transparent`; any other is unknown. */
export const parseColor = (value: unknown): Rgba | undefined => {
    if (typeof value !== 'string') {
        return undefined;
    }
    const color = value.trim().toLowerCase();
    if (color === 'transparent') {
        return { red: 0, green: 0, blue: 0, alpha: 0 };
    }
    if (/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/.test(color)) {
        let hex = color.slice(1);
        if (hex.length <= 4) {
            hex = [...hex].map((digit) => `${digit}${digit}`).join('');
        }
        const byte = (index: number) => Number.parseInt(hex.slice(index, index + 2), 16);
        const alpha = hex.length === 8 ? byte(6) / 255 : 1;
        return { red: byte(0), green: byte(2), blue: byte(4), alpha };
    }
    const match = RGB.exec(color);
    if (match === null) {
        return undefined;
    }
    const [, red, green, blue, alpha] = match;
    const channels = [red, green, blue].map((part) => channelOf(part ?? '', 255));
    const opacity = alpha === undefined ? 1 : channelOf(alpha, 1);
    const [r, g, b] = channels;
    if (r === undefined || g === undefined || b === undefined || opacity === undefined) {
        return undefined;
    }
    return { red: r, green: g, blue: b, alpha: opacity };
};

/** Blends a translucent `top` colour over the opaque `bottom`, as the contrast checks need. */
export const composite = (top: Rgba, bottom: Rgba): Rgba => {
    const mix = (a: number, b: number) => top.alpha * a + (1 - top.alpha) * b;
    return {
        red: mix(top.red, bottom.red),
        green: mix(top.green, bottom.green),
        blue: mix(top.blue, bottom.blue),
        alpha: 1,
    };
};

const luminance = ({ red, green, blue }: Rgba) => {
    const linear = (channel: number) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
};

export const contrastOf = (a: Rgba, b: Rgba) => {
    const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
    return (light + 0.05) / (dark + 0.05);
};
