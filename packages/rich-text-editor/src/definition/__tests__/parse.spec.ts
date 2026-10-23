/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMParser } from 'prosemirror-model';
import { describe, expect, it } from 'vitest';

import { fixtureHeading } from '#/features/__tests__/fixtures/features';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel } from '#/model';

import { buildSchema } from '../schema';

const schema = buildSchema(compileContentModel([core(), bold(), fixtureHeading()], { id: 'test.parse', version: 1 }));
const parse = (html: string) => {
    const host = document.createElement('div');
    host.innerHTML = html;
    return DOMParser.fromSchema(schema).parse(host).toJSON() as unknown;
};
const paragraph = (attrs: object, ...content: readonly unknown[]) => ({
    type: 'paragraph',
    attrs: { lang: null, unknownAttributes: null, ...attrs },
    content,
});
const doc = (...content: readonly unknown[]) => ({
    type: 'doc',
    attrs: { lang: null, dir: 'auto', unknownAttributes: null },
    content,
});
const boldMark = { type: 'bold', attrs: { unknownAttributes: null } };

describe('compiled parse rules', () => {
    it('reads each feature tag and style rule, with attributes converted by their declarations', () => {
        expect(
            parse('<p lang="de-CH"><strong>a</strong><b>b</b><span style="font-weight: bold">c</span></p><h2>d</h2>'),
        ).toEqual(
            doc(paragraph({ lang: 'de-CH' }, { type: 'text', text: 'abc', marks: [boldMark] }), {
                type: 'heading',
                attrs: { level: 2, unknownAttributes: null },
                content: [{ type: 'text', text: 'd' }],
            }),
        );
    });
});
