/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { compileContentModel } from '#/model';
import { core } from '#/plugins/Core/feature';
import { compileDefinition } from '#/runtime/definition';

import { createEncoder } from '../../session/encode';

const model = compileContentModel([core()], { id: 'test.encode', version: 1 });
const { schema } = compileDefinition(model);
const paragraph = (text: string) => schema.node('paragraph', null, text === '' ? [] : [schema.text(text)]);
const docOf = (...texts: readonly string[]) => schema.node('doc', null, texts.map(paragraph));
const foreign = [{ id: 'acme.callout', version: 3 }];

describe('createEncoder', () => {
    it('keeps the capabilities it was given until they are replaced', () => {
        const encoder = createEncoder(model, []);
        expect(encoder.capabilities).toEqual([]);
        encoder.capabilities = foreign;
        expect(encoder.capabilities).toBe(foreign);
    });

    it('encodes the document as a stored document of the model', () => {
        const document = createEncoder(model, []).encode(docOf('a'));
        expect(document.model).toEqual(model.ref);
        expect(document.content.content?.[0]?.content?.[0]).toMatchObject({ type: 'text', text: 'a' });
    });

    it('gives block encoding the same document as whole encoding', () => {
        const encoder = createEncoder(model, foreign);
        for (const doc of [docOf('a', 'b', ''), docOf('')]) {
            expect(encoder.encodeByBlock(doc)).toEqual(encoder.encode(doc));
        }
    });

    it('reuses a frozen block of an unchanged top-level node after an edit', () => {
        const encoder = createEncoder(model, []);
        const first = paragraph('a');
        const one = encoder.encodeByBlock(schema.node('doc', null, [first, paragraph('b')]));
        const two = encoder.encodeByBlock(schema.node('doc', null, [first, paragraph('c')]));
        expect(two.content.content?.[0]).toBe(one.content.content?.[0]);
        expect(two.content.content?.[1]).not.toBe(one.content.content?.[1]);
    });

    it('drops the block cache when the capabilities are replaced', () => {
        const encoder = createEncoder(model, []);
        const first = paragraph('a');
        const doc = schema.node('doc', null, [first]);
        const one = encoder.encodeByBlock(doc);
        encoder.capabilities = foreign;
        const two = encoder.encodeByBlock(doc);
        expect(two.content.content?.[0]).not.toBe(one.content.content?.[0]);
        expect(two.requiredCapabilities).toEqual(encoder.encode(doc).requiredCapabilities);
    });
});
