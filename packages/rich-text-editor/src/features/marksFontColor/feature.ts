/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ColorToken,
    type ContentRepair,
    type ContentRule,
    type ContentRuleContext,
    type ContentRuleInput,
    composite,
    contrastOf,
    defineFeature,
    type MarkJSON,
    parseColor,
    type Rgba,
} from '#/model';

const tokenId = { type: 'id', nullable: true, default: null } as const;
const value = { type: 'color', nullable: true, default: null } as const;
// Package output names its token; a literal colour is read only with `literalColors`, already as `#rrggbb` or `#rrggbbaa`.
const TOKEN_RULES = [{ tag: 'span[data-rte-color]', attrs: { tokenId: { from: 'data-rte-color' } } }] as const;
const LITERAL_RULES = [
    ...TOKEN_RULES,
    { tag: 'span', attrs: { value: { fromStyle: 'color' } } },
    { tag: 'font', attrs: { value: { from: 'color' } } },
] as const;

const COLOR_REPAIR: ContentRepair = { command: 'mark.color.menu.open', feature: 'marks.font-color' };
const COLOR = { marks: ['font_color', 'highlight'] } as const;
// Browsers draw `h1` to `h3` at 18.72 px bold or larger, which WCAG counts as large text.
const LARGE_HEADING = 3;
const SMALL_MARKS = ['subscript', 'superscript'];
const NORMAL_RATIO = 4.5;
const LARGE_RATIO = 3;

/** A colour mark's colour: its literal value, else its token's. */
const markColor = (mark: MarkJSON | undefined, tokens: readonly ColorToken[]): Rgba | undefined => {
    const attrs = mark?.attrs;
    if (attrs === undefined) {
        return undefined;
    }

    if (typeof attrs.value === 'string') {
        return parseColor(attrs.value);
    }

    const token = tokens.find(({ id }) => id === attrs.tokenId);

    return parseColor(token?.value);
};

/** The opaque background under a run: its highlight over the known background. */
const backgroundOf = ({ marks }: ContentRuleInput, { colorTokens, background }: ContentRuleContext) => {
    const page = parseColor(background);
    const base = page?.alpha === 1 ? page : undefined;
    if (marks.highlight === undefined) {
        return base;
    }

    const highlight = markColor(marks.highlight, colorTokens);
    if (highlight === undefined) {
        return undefined;
    }

    if (highlight.alpha === 1) {
        return highlight;
    }

    return base === undefined ? undefined : composite(highlight, base);
};

/** The run's text colour and background, both opaque, or `undefined` when either cannot be resolved. */
const colorsOf = (input: ContentRuleInput, context: ContentRuleContext) => {
    const background = backgroundOf(input, context);
    const foreground = markColor(input.marks.font_color, context.colorTokens);
    if (background === undefined || foreground === undefined) {
        return undefined;
    }

    return { foreground: foreground.alpha === 1 ? foreground : composite(foreground, background), background };
};

/** Large text sits in a heading of level 3 or higher and is not subscript or superscript, which is smaller. */
const isLarge = ({ covered, ancestors }: ContentRuleInput) => {
    let large = false;
    for (const { type, attrs } of [...ancestors].reverse()) {
        if (type === 'heading' && typeof attrs?.level === 'number') {
            large = attrs.level <= LARGE_HEADING;
            break;
        }
    }

    return large && covered.every(({ marks }) => !marks?.some(({ type }) => SMALL_MARKS.includes(type)));
};

const passes = (foreground: Rgba, background: Rgba, large: boolean) =>
    contrastOf(foreground, background) >= (large ? LARGE_RATIO : NORMAL_RATIO);

const CONTENT_RULES: readonly ContentRule[] = [
    {
        id: 'contrast.low',
        kind: 'automatic',
        severity: 'error',
        subject: COLOR,
        repair: COLOR_REPAIR,
        check: (input, context) => {
            const colors = colorsOf(input, context);
            const large = isLarge(input);
            if (colors === undefined || passes(colors.foreground, colors.background, large)) {
                return undefined;
            }

            const tokenIds = context.colorTokens
                .filter(({ usage, value }) => {
                    const color = parseColor(value);
                    if (!usage.includes('font_color') || color === undefined) {
                        return false;
                    }

                    const shown = color.alpha === 1 ? color : composite(color, colors.background);

                    return passes(shown, colors.background, large);
                })
                .map(({ id }) => id);

            return { payload: { tokenIds } };
        },
    },
    {
        id: 'contrast.unknown',
        kind: 'automatic',
        severity: 'review',
        subject: COLOR,
        repair: COLOR_REPAIR,
        check: (input, context) => (colorsOf(input, context) === undefined ? { payload: null } : undefined),
    },
    { id: 'color.meaning-review', kind: 'manual', severity: 'review', subject: COLOR, check: () => true },
];

const declaration = {
    id: 'marks.font-color',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: { literalColors: { type: 'boolean', default: false } },
    // Markdown and plain text keep the text and drop its colour.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    contentRules: CONTENT_RULES,
} as const;

const fontColorMark = {
    attrs: { tokenId, value },
    exactlyOne: ['tokenId', 'value'],
    html: ['span', { 'data-rte-color': { attr: 'tokenId' } }, 0],
    rank: -1,
} as const;

const tokenColors = defineFeature({
    ...declaration,
    // Paste reads a literal colour back only with `literalColors`, so without it a stored one does not survive HTML.
    formats: { ...declaration.formats, html: 'lossy' },
    marks: { font_color: { ...fontColorMark, parse: TOKEN_RULES } },
});

const literalColors = defineFeature({
    ...declaration,
    marks: { font_color: { ...fontColorMark, parse: LITERAL_RULES } },
});

/**
 * Text colour as `font_color`: a presentation colour token, or with `literalColors` any colour, which pasted HTML then
 * keeps too. One "A" menu sets text and highlight colours and Clear removes both; Mod+Shift+H sets the last colour again.
 */
export const fontColor: typeof tokenColors = (options) => {
    if (options?.literalColors === true) {
        return literalColors(options);
    }

    return tokenColors(options);
};
