/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { fixturesIn, pretty, renderReader } from '../../fixtures/reader/helpers';
import { semanticModel } from '../../fixtures/reader/semantic';

const model = semanticModel();

describe('reader golden files', () => {
    it.each(fixturesIn('valid'))(
        'SPEC-rich-text-output/AC-028 SPEC-rich-text-output/AC-049 renders the valid fixture %s as its golden HTML',
        (_, document) => {
            expect(pretty(renderReader(document, model))).toMatchSnapshot();
        },
    );

    it.each([...fixturesIn('unknown'), ...fixturesIn('invalid')])(
        'SPEC-rich-text-output/AC-028 renders %s as its golden HTML',
        (_, document) => {
            expect(pretty(renderReader(document, model))).toMatchSnapshot();
        },
    );
});
