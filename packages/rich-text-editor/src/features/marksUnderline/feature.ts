/* (c) Copyright Frontify Ltd., all rights reserved. */

import { decorationLines, defineFeature, inheritedAnswer } from '#/model';

const answers = new WeakMap<Element, boolean>();

/** Whether `element` itself underlines, which is `undefined` otherwise so the walk goes on to its parent. */
const declaresUnderline = (element: Element): boolean | undefined => {
    if (element.localName === 'u' || decorationLines(element).includes('underline')) {
        return true;
    }

    return undefined;
};

/** Whether CSS underlines `element` from it or around it, since a `null` answer clears the underline its content inherits. */
const readsUnderline = (element: Element): boolean => inheritedAnswer(element, answers, declaresUnderline);

/** Underlined text as `u`, which Markdown cannot hold. */
export const underline = defineFeature({
    id: 'marks.underline',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        underline: {
            attrs: {},
            html: ['u', 0],
            parse: [{ tag: 'u' }, { style: 'text-decoration', value: 'underline' }],
        },
    },
    // Reads `underline line-through`, which no style rule does; on spans, as an element-free selector is slow.
    parseRules: [
        {
            tag: 'span[style*="text-decoration"]',
            mark: 'underline',
            value: (element) => {
                if (readsUnderline(element)) {
                    return {};
                }

                return null;
            },
        },
    ],
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
