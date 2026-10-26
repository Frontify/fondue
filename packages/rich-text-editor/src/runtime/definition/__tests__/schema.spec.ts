/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer } from 'prosemirror-model';
import { describe, expect, it } from 'vitest';

import { compileContentModel } from '#/model';
import { fixtureBold, fixtureColor } from '#/plugins/__tests__/fixtures/features';
import { core } from '#/plugins/Core/feature';
import { link } from '#/plugins/Link/feature';

import { buildSchema } from '../schema';

describe('buildSchema DOM output', () => {
    it('renders a partly bold, partly coloured link as one a in the editor DOM', () => {
        const model = compileContentModel([core(), fixtureBold(), fixtureColor(), link()], {
            id: 'test',
            version: 1,
        });
        const schema = buildSchema(model);
        const linkMark = schema.mark('link', { href: 'https://frontify.com' });
        const paragraph = schema.node('paragraph', null, [
            schema.text('bold ', [schema.mark('bold'), linkMark]),
            schema.text('colour', [linkMark, schema.mark('font_color', { value: '#ff0000' })]),
        ]);
        const host = document.createElement('div');
        host.append(DOMSerializer.fromSchema(schema).serializeNode(paragraph));

        expect(host.querySelectorAll('a')).toHaveLength(1);
        expect(host.innerHTML).toBe(
            '<p><a href="https://frontify.com" rel="noopener"><strong>bold </strong><span data-color="#ff0000">colour</span></a></p>',
        );
    });

    it('leaves out a url attribute that fails checkHref in the editor DOM', () => {
        const model = compileContentModel([core(), link()], { id: 'test', version: 1 });
        const schema = buildSchema(model);
        const unsafe = schema.mark('link', { href: 'javascript:alert(1)' });
        const host = document.createElement('div');
        host.append(
            DOMSerializer.fromSchema(schema).serializeNode(
                schema.node('paragraph', null, [schema.text('x', [unsafe])]),
            ),
        );

        expect(host.innerHTML).toBe('<p><a rel="noopener">x</a></p>');
    });
});
