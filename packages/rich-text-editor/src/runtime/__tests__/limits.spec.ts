/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { compileDefinition } from '#/definition';
import { fixtureLink } from '#/features/__tests__/fixtures/features';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, defaultLimits } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';

import { createLimitCheck } from '../limits';

const model = compileContentModel([core(), bold(), fixtureLink()], { id: 'test.limits', version: 1 });
const link = { type: 'link', attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: null } };
const stored = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: [
        { id: 'acme.callout', version: 1 },
        { id: 'core', version: 1 },
        { id: 'fixture.link', version: 1 },
        { id: 'marks.bold', version: 1 },
    ],
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: 'de', tone: 'warm' },
                content: [
                    { type: 'text', text: 'Grüße ', marks: [{ type: 'bold' }] },
                    { type: 'text', text: 'link', marks: [link, { type: 'acme_glow', attrs: { level: 2 } }] },
                    { type: 'hard_break' },
                ],
            },
            { type: 'acme_callout', attrs: { tone: 'warm' }, content: [{ type: 'paragraph', attrs: { lang: null } }] },
        ],
    },
};

describe('the limit check', () => {
    it('counts exactly the UTF-8 bytes the encoder writes, islands, unknown attributes and marks included', () => {
        const { result, tree } = decodeToTree(stored, model);
        if (result.status !== 'editable' || tree === undefined) {
            throw new Error('expected an editable document');
        }
        const doc = compileDefinition(model).schema.nodeFromJSON(tree);
        const encoded = encodeTree(doc.toJSON() as TreeNode, model, result.document.requiredCapabilities).document;
        const bytes = new TextEncoder().encode(JSON.stringify(encoded)).byteLength;
        // The check writes every installed and stored capability, an upper bound the encoder meets when the content uses them all.
        const exceeds = createLimitCheck(model, result.document.requiredCapabilities);

        expect(encoded.requiredCapabilities).toEqual(stored.requiredCapabilities);
        expect(
            [bytes, bytes - 1].map((maxDocumentBytes) => exceeds(doc, { ...defaultLimits, maxDocumentBytes })),
        ).toEqual([false, true]);
    });
});
