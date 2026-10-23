/* (c) Copyright Frontify Ltd., all rights reserved. */

import { decorationLines, defineFeature, inheritedAnswer } from '#/model';

const STRUCK = new Set(['s', 'del', 'strike']);

const answers = new WeakMap<Element, boolean>();

/** Whether `element` itself strikes through, which is `undefined` otherwise so the walk goes on to its parent. */
const declaresStrike = (element: Element): boolean | undefined => {
    if (STRUCK.has(element.localName) || decorationLines(element).includes('line-through')) {
        return true;
    }
    return undefined;
};

/** Whether CSS strikes `element` through from it or around it, since a `null` answer clears the strike its content inherits. */
const readsStrike = (element: Element): boolean => inheritedAnswer(element, answers, declaresStrike);

/** Struck-through text as `s`; its editor part toggles it on the selection or at the caret. */
export const strike = defineFeature({
    id: 'marks.strike',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        strike: {
            attrs: {},
            html: ['s', 0],
            parse: [
                { tag: 's' },
                { tag: 'del' },
                { tag: 'strike' },
                { style: 'text-decoration', value: 'line-through' },
            ],
            markdown: { open: '~~', close: '~~' },
        },
    },
    // Reads `underline line-through`, which no style rule does; on spans, as an element-free selector is slow.
    parseRules: [
        {
            tag: 'span[style*="text-decoration"]',
            mark: 'strike',
            value: (element) => {
                if (readsStrike(element)) {
                    return {};
                }
                return null;
            },
        },
    ],
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});
