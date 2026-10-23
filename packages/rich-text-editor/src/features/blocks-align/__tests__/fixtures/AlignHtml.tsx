/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { createCodecs } from '#/codecs';
import { align } from '#/features/blocks-align/feature';
import { heading } from '#/features/blocks-heading/feature';
import { core } from '#/features/core/feature';
import { compileContentModel, type RichTextDocument } from '#/model';

const model = compileContentModel([core(), heading(), align()], { id: 'test.align-ct', version: 1 });
const values = ['left', 'center', 'right', 'justify'] as const;
const document = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'ltr' },
        content: values.map((value) => ({
            type: 'paragraph',
            attrs: { lang: null, align: value },
            content: [{ type: 'text', text: value }],
        })),
    },
} as unknown as RichTextDocument;

const html = createCodecs(model).toHTML(document).html;

/** Codec HTML on a page with no package stylesheet. */
export const AlignHtml = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = ref.current;
        if (root !== null) {
            root.innerHTML = html;
        }
    }, []);
    return <div ref={ref} />;
};
