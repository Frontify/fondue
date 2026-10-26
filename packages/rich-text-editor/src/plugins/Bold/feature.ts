/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, inheritedAnswer } from '#/model';

/** The weight `element` declares, as CSS reads it: bold from 600, `undefined` when it declares none. */
const declaredBold = (element: Element): boolean | undefined => {
    const style = (element as HTMLElement).style as CSSStyleDeclaration | undefined;
    let weight = '';
    if (style !== undefined) {
        weight = style.getPropertyValue('font-weight').trim().toLowerCase();
    }

    if (weight === '' || weight === 'inherit' || weight === 'unset') {
        if (element.localName === 'b' || element.localName === 'strong') {
            return true;
        }

        return undefined;
    }

    if (weight === 'bold' || weight === 'bolder') {
        return true;
    }

    const value = Number(weight);

    return Number.isFinite(value) && value >= 600;
};

const answers = new WeakMap<Element, boolean>();

/** Whether CSS reads `element` as bold: the nearest weight declared on it or around it. */
const readsBold = (element: Element): boolean => inheritedAnswer(element, answers, declaredBold);

/** Strong importance as `strong`; its editor part toggles it on the selection or at the caret. */
export const bold = defineFeature({
    id: 'marks.bold',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        bold: {
            attrs: {},
            html: ['strong', 0],
            parse: [
                { tag: 'strong' },
                { tag: 'b' },
                { style: 'font-weight', value: 'bold' },
                // CSS reads a weight from 600 as bold.
                { style: 'font-weight', value: '600' },
                { style: 'font-weight', value: '700' },
                { style: 'font-weight', value: '800' },
                { style: 'font-weight', value: '900' },
            ],
            markdown: { open: '**', close: '**' },
        },
    },
    // A `b` that sets a normal weight, as the one around every Google Docs copy does, is no bold, and neither is a
    // normal weight inside a bold element.
    parseRules: [
        {
            // A case-insensitive or element-free style selector triples the cost of matching every pasted element.
            tag: 'b, strong, span[style*="font-weight"]',
            mark: 'bold',
            value: (element) => {
                if (readsBold(element)) {
                    return {};
                }

                return null;
            },
        },
    ],
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});
