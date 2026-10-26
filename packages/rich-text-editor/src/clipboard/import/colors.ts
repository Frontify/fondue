/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, hexColor } from '#/model';
import { compiledModel } from '#/model/internal';

import { createElementBeside } from './dom';

/** Which pasted colours the model keeps: `color` and `<font color>` as `font_color`, `background-color` as `highlight`. */
export type ColorReading = {
    readonly color: boolean;
    readonly background: boolean;
};

export const NO_COLORS: ColorReading = { color: false, background: false };

/** The colours the model's colour features keep: only those whose `literalColors` option is on. */
export const colorReadingOf = (model: ContentModel): ColorReading => {
    const { marks, features } = compiledModel(model);
    const literal = (name: string) => {
        const mark = marks.find((candidate) => candidate.name === name);
        if (mark === undefined) {
            return false;
        }

        return features.some(({ id, options }) => id === mark.featureId && options.literalColors === true);
    };

    return { color: literal('font_color'), background: literal('highlight') };
};

/** A background of no paint, which Google Docs writes on every run, keeps nothing. */
const isClear = (hex: string) => hex.length === 9 && hex.endsWith('00');

// Opaque black on a block is the source's computed default text colour, which a stored mark would pin against the host's
// theme; the editor never colours a block, and black on a run is the author's.
const isDefaultText = (hex: string) => hex === '#000000' || hex === '#000000ff';
const UNCOLORED_BLOCKS = new Set([
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'li',
    'ul',
    'ol',
    'div',
    'blockquote',
    'pre',
    'td',
    'th',
]);

// Values that paint no colour of their own, so removing one removes no formatting.
const UNPAINTED = new Set(['transparent', 'inherit', 'initial', 'unset', 'currentcolor']);

/** Whether removing the pasted colour `text` removes formatting: any colour but one that paints nothing. */
const paints = (text: string, hex: string | undefined) => {
    const value = text.trim().toLowerCase();

    return value !== '' && !UNPAINTED.has(value) && (hex === undefined || !isClear(hex));
};

/**
 * Turns each pasted `color`, `background-color` and `<font color>` into the lowercase hex a `color` value takes when the
 * model keeps that colour, and removes it otherwise, returning how many colours it removed. The colour mark rules read
 * one colour from a span, so a colour kept on any other element, and the background of a span that keeps both, moves
 * into a span around the element's content. The colours of an element with `data-rte-style` are its recipe's paint,
 * never colour marks. Opaque black text on a block is the source's default, so it is dropped without counting, and so is
 * the paint of a token colour, which `data-rte-color` keeps.
 */
export const normalizeColors = (body: HTMLElement, reading: ColorReading): number => {
    let removed = 0;
    const settle = (
        style: CSSStyleDeclaration,
        property: 'color' | 'background-color',
        keep: boolean,
        token: boolean,
        block: boolean,
    ) => {
        const text = style.getPropertyValue(property);
        if (text === '') {
            return false;
        }

        const hex = hexColor(text);
        if (block && property === 'color' && hex !== undefined && isDefaultText(hex)) {
            style.removeProperty(property);

            return false;
        }

        if (keep && hex !== undefined && !isClear(hex)) {
            style.setProperty(property, hex);

            return true;
        }

        style.removeProperty(property);
        if (!token && paints(text, hex)) {
            removed += 1;
        }

        return false;
    };

    for (const element of Array.from(body.querySelectorAll<HTMLElement>('[style]'))) {
        const { style } = element;
        if (element.hasAttribute('data-rte-style')) {
            style.removeProperty('color');
            style.removeProperty('background-color');
            continue;
        }

        const token = element.hasAttribute('data-rte-color');
        const block = UNCOLORED_BLOCKS.has(element.localName);
        const color = settle(style, 'color', reading.color, token, block);
        const background = settle(style, 'background-color', reading.background, token, block);
        const span = element.localName === 'span';
        const moved: ('color' | 'background-color')[] = [];
        if (color && !span) {
            moved.push('color');
        }

        if (background && (color || !span)) {
            moved.push('background-color');
        }

        if (element.firstChild === null) {
            continue;
        }

        let holder: HTMLElement = element;
        for (const property of moved) {
            const inner = createElementBeside(element, 'span');
            inner.style.setProperty(property, style.getPropertyValue(property));
            style.removeProperty(property);
            for (let child = holder.firstChild; child !== null; child = holder.firstChild) {
                inner.append(child);
            }

            holder.append(inner);
            holder = inner;
        }
    }

    for (const font of Array.from(body.querySelectorAll('font[color]'))) {
        const text = font.getAttribute('color') ?? '';
        const hex = hexColor(text);
        if (font.hasAttribute('data-rte-style')) {
            font.removeAttribute('color');
            continue;
        }

        if (reading.color && hex !== undefined) {
            font.setAttribute('color', hex);
            continue;
        }

        font.removeAttribute('color');
        if (paints(text, hex)) {
            removed += 1;
        }
    }

    return removed;
};
