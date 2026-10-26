/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ownValue } from '../helpers/values';
import {
    colorOf,
    type ColorToken,
    inlineStyleText,
    type PresentationStyle,
    type ResolvedStyle,
    resolveStyle,
    STYLES_FEATURE,
    type StyleResolution,
} from '../styling/styles';
import { type JsonObject } from '../vocabulary/declarations';
import { type Diagnostic } from '../vocabulary/format';

import { type HtmlTemplate } from './htmlSpec';

/** The presentation data an HTML output styles with: brand style recipes and colour tokens. */
export type OutputStyles = {
    styles: readonly PresentationStyle[];
    colorTokens: readonly ColorToken[];
    /** Writes each recipe's resting declarations inline too, as `toHTML` does with `inlineStyles`. */
    inline: boolean;
};

/** The colour property each colour mark writes. */
export const COLOR_PROPERTIES: Readonly<Record<string, string>> = {
    font_color: 'color',
    highlight: 'background-color',
};

/** `template` with `attribute` set on its outer element, after the value it already holds and a space. */
const withOuterAttribute = (template: HtmlTemplate, attribute: 'class' | 'style', value: string): HtmlTemplate => {
    const [outer, ...inner] = template.layers;
    if (outer === undefined) {
        return template;
    }

    const existing = outer.attrs[attribute];
    let text = value;
    if (existing !== undefined && attribute === 'class') {
        text = `${existing} ${value}`;
    } else if (existing !== undefined) {
        text = `${existing};${value}`;
    }

    return { ...template, layers: [{ ...outer, attrs: { ...outer.attrs, [attribute]: text } }, ...inner] };
};

/** The style recipe a node or mark of `type` with `attrs` renders with, and whether its stored `styleId` is unknown. */
export const styleOfNode = (styles: readonly PresentationStyle[], type: string, attrs: JsonObject): StyleResolution => {
    let styleId: string | null = null;
    if (typeof attrs.styleId === 'string') {
        styleId = attrs.styleId;
    }

    return resolveStyle(styles, type, styleId);
};

/** `template` with `data-rte-style` naming a stored `styleId` on its outer element, unless that element already names one. */
export const withStyleId = (template: HtmlTemplate, attrs: JsonObject): HtmlTemplate => {
    const [outer, ...inner] = template.layers;
    if (outer === undefined || typeof attrs.styleId !== 'string' || outer.attrs['data-rte-style'] !== undefined) {
        return template;
    }

    return {
        ...template,
        layers: [{ ...outer, attrs: { ...outer.attrs, 'data-rte-style': attrs.styleId } }, ...inner],
    };
};

/** `template` with the recipe class of `style` on its outer element, and its declarations inline when `inline` is set. */
export const withStyle = (template: HtmlTemplate, style: ResolvedStyle | undefined, inline: boolean): HtmlTemplate => {
    if (style === undefined) {
        return template;
    }

    let styled = withOuterAttribute(template, 'class', style.className);
    if (inline && style.declarations.length > 0) {
        styled = withOuterAttribute(styled, 'style', inlineStyleText(style));
    }

    return styled;
};

/** `template` with the inline colour of a `font_color` or `highlight` mark: its literal value or its token's. */
export const withColor = (
    template: HtmlTemplate,
    type: string,
    attrs: JsonObject,
    tokens: readonly ColorToken[],
): HtmlTemplate => {
    const property = ownValue(COLOR_PROPERTIES, type);
    if (property === undefined) {
        return template;
    }

    const color = colorOf(tokens, attrs);
    if (color === undefined) {
        return template;
    }

    return withOuterAttribute(template, 'style', `${property}:${color}`);
};

/** The unknown-style diagnostic of a stored `styleId`, at the first node that uses it. */
export const unknownStyle = (path: string): Diagnostic => ({
    code: 'styles.unknown-style',
    severity: 'warning',
    messageKey: 'styles.unknown-style',
    path,
    featureId: STYLES_FEATURE,
});
