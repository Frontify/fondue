/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer } from 'prosemirror-model';
import { describe, expect, it } from 'vitest';

import { fixtureBold, fixtureColor, fixtureLink } from '#/features/__fixtures__/features';
import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';

import { buildSchema } from './schema';

describe('buildSchema DOM output', () => {
    it('SPEC-rich-text/AC-027 renders a partly bold, partly coloured link as one a in the editor DOM', () => {
        const model = compileContentModel([core(), fixtureBold(), fixtureColor(), fixtureLink()], {
            id: 'test',
            version: 1,
        });
        const schema = buildSchema(model);
        const link = schema.mark('link', { href: 'https://frontify.com' });
        const paragraph = schema.node('paragraph', null, [
            schema.text('bold ', [schema.mark('bold'), link]),
            schema.text('colour', [link, schema.mark('font_color', { value: '#ff0000' })]),
        ]);
        const host = document.createElement('div');
        host.append(DOMSerializer.fromSchema(schema).serializeNode(paragraph));

        expect(host.querySelectorAll('a')).toHaveLength(1);
        expect(host.innerHTML).toBe(
            '<p><a href="https://frontify.com"><strong>bold </strong><span data-color="#ff0000">colour</span></a></p>',
        );
    });
});
