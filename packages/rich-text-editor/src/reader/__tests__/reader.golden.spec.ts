/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { semanticModel } from './fixtures/semantic';
import { fixturesIn, pretty, renderReader } from './helpers/helpers';

const model = semanticModel();

describe('reader golden files', () => {
    it.each(fixturesIn('valid'))('renders the valid fixture %s as its golden HTML', (_, document) => {
        expect(pretty(renderReader(document, model))).toMatchSnapshot();
    });

    it.each([...fixturesIn('unknown'), ...fixturesIn('invalid')])('renders %s as its golden HTML', (_, document) => {
        expect(pretty(renderReader(document, model))).toMatchSnapshot();
    });
});
