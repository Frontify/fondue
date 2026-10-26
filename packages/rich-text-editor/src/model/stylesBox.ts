/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The alpha of a colour function, after its `/` or as its fourth comma-separated argument. */
const alphaOf = (color: string): string | undefined => {
    const inner = /^[a-z]+\((.*)\)$/.exec(color)?.[1];
    if (inner === undefined) {
        return undefined;
    }
    const slashed = inner.split('/');
    if (slashed.length === 2) {
        return slashed[1];
    }
    const parts = inner.split(',');
    if (parts.length === 4) {
        return parts[3];
    }
    return undefined;
};

/** Whether a CSS colour is fully transparent. */
const isTransparent = (color: string): boolean => {
    const value = color.trim().toLowerCase();
    if (value === 'transparent') {
        return true;
    }
    if (/^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/.test(value)) {
        return true;
    }
    const alpha = alphaOf(value);
    return alpha !== undefined && Number.parseFloat(alpha) === 0;
};

const LINE_STYLES = new Set('none hidden dotted dashed solid double groove ridge inset outset'.split(' '));
const ZERO_WIDTH = /^0(?:\.0*)?(?:[a-z]+|%)?$/;
const LINE_PARTS = [
    ['style', 'Style'],
    ['width', 'Width'],
    ['color', 'Color'],
] as const;

type Line = {
    style: string | undefined;
    width: string | undefined;
    color: string | undefined;
};

/** The style, width and colour a `border` or `outline` shorthand sets. */
const lineOf = (shorthand: unknown): Line => {
    const line: Line = { style: undefined, width: undefined, color: undefined };
    if (typeof shorthand !== 'string' && typeof shorthand !== 'number') {
        return line;
    }
    // A function, such as `rgb(0 0 0 / 0)`, stays one token.
    const tokens = String(shorthand).match(/[\w#.%-]+\([^)]*\)|[^\s]+/g) ?? [];
    for (const token of tokens) {
        const lower = token.toLowerCase();
        if (LINE_STYLES.has(lower)) {
            line.style = lower;
        } else if (/^[\d.]/.test(lower) || lower === 'thin' || lower === 'medium' || lower === 'thick') {
            line.width = lower;
        } else {
            line.color = lower;
        }
    }
    return line;
};

const textOf = (value: unknown): string | undefined => {
    if (typeof value === 'number') {
        return String(value);
    }
    if (typeof value === 'string') {
        return value.trim().toLowerCase();
    }
    return undefined;
};

/** Whether a line with this style, width and colour shows: a style other than `none` or `hidden`, a width above 0 and a colour that is not fully transparent. */
const visible = ({ style, width, color }: Line): boolean =>
    style !== undefined &&
    style !== 'none' &&
    style !== 'hidden' &&
    (width === undefined || !ZERO_WIDTH.test(width)) &&
    (color === undefined || !isTransparent(color));

const SIDES = [
    '',
    'Top',
    'Right',
    'Bottom',
    'Left',
    'Block',
    'Inline',
    'BlockStart',
    'BlockEnd',
    'InlineStart',
    'InlineEnd',
];

/** Whether a recipe draws a visible box: a painted background that is not clipped to the text, or a visible border or outline. */
export const drawsBox = (recipe: Readonly<Record<string, unknown>>): boolean => {
    const clip = [recipe.backgroundClip, recipe.WebkitBackgroundClip].map(textOf);
    const clipped = clip.some((value) => value !== undefined && value.split(/[\s,]+/).includes('text'));
    const painted = ['background', 'backgroundColor', 'backgroundImage'].some((name) => {
        const value = textOf(recipe[name]);
        return value !== undefined && value !== '' && value !== 'none' && !isTransparent(value);
    });
    if (painted && !clipped) {
        return true;
    }
    // A side's shorthand overrides `border`, and the longhands override both.
    const sideLine = (side: string): Line => {
        const line = lineOf(recipe.border);
        const own = lineOf(recipe[`border${side}`]);
        for (const [key, part] of LINE_PARTS) {
            const general = textOf(recipe[`border${part}`]);
            const specific = textOf(recipe[`border${side}${part}`]);
            if (specific !== undefined) {
                line[key] = specific;
            } else if (own[key] !== undefined) {
                line[key] = own[key];
            } else if (general !== undefined) {
                line[key] = general;
            }
        }
        return line;
    };
    if (SIDES.some((side) => visible(sideLine(side)))) {
        return true;
    }
    const outline = lineOf(recipe.outline);
    for (const [key, part] of LINE_PARTS) {
        const longhand = textOf(recipe[`outline${part}`]);
        if (longhand !== undefined) {
            outline[key] = longhand;
        }
    }
    return visible(outline);
};
