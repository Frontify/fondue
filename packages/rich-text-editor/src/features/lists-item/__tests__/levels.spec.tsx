/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { item, list, listModel } from '#/react/__tests__/fixtures/lists';
import { storedIn } from '#/react/__tests__/fixtures/text';
import { pretty, renderReader } from '#/reader/__tests__/helpers/helpers';

const model = listModel();
/** Four levels of `kind`, the item at depth n holding `kind` n. */
const fourLevels = (kind: 'bullet' | 'ordered') =>
    list(kind, [
        item(
            kind,
            `${kind}1`,
            list(kind, [
                item(kind, `${kind}2`, list(kind, [item(kind, `${kind}3`, list(kind, [item(kind, `${kind}4`)]))])),
            ]),
        ),
    ]);
const document = storedIn(model, [fourLevels('ordered'), fourLevels('bullet')]);

const custom = {
    ordered: [{ counterType: 'upper-roman', color: 'rgb(200, 0, 0)' }, { counterType: 'lower-greek' }],
    bullet: [{ shape: 'square', color: 'rgb(0, 0, 200)', size: '24px' }, { shape: 'circle' }],
};
const typesOf = (html: string) => html.match(/list-style-type:[\w-]+/g)?.map((match) => match.slice(16));

describe('list levels', () => {
    it('marks a four-level list by depth in the reader with the default and a custom listLevels, entry n modulo its length', () => {
        const byDefault = renderReader(document, model);
        const customized = renderReader(document, model, {
            presentation: { styles: [], colorTokens: [], listLevels: custom },
        });

        expect(typesOf(byDefault)).toEqual([
            'decimal',
            'lower-alpha',
            'lower-roman',
            'decimal',
            'disc',
            'circle',
            'square',
            'disc',
        ]);
        expect(typesOf(customized)).toEqual([
            'upper-roman',
            'lower-greek',
            'upper-roman',
            'lower-greek',
            'square',
            'circle',
            'square',
            'circle',
        ]);
        expect(pretty(byDefault)).toMatchSnapshot('default');
        expect(pretty(customized)).toMatchSnapshot('custom');
    });

    it('writes the reader markup of a four-level list through toHTML with the default and a custom listLevels', () => {
        const codecs = createCodecs(model);

        expect(codecs.toHTML(document).html).toBe(renderReader(document, model));
        expect(codecs.toHTML(document, { listLevels: custom }).html).toBe(
            renderReader(document, model, { presentation: { styles: [], colorTokens: [], listLevels: custom } }),
        );
    });
});
