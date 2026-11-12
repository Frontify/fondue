/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { HEADING_GAP_VARIABLE } from './headingGap';

// Stylesheets cannot import the constant, so these read them as text. The document stylesheet zeroes
// its own leading gap instead, so it must not name this one.

const STYLESHEETS = {
    'text style presets': fileURLToPath(new URL('../textStyle.module.scss', import.meta.url)),
    'text style dropdown': fileURLToPath(new URL('../components/textStyleSelect.module.scss', import.meta.url)),
};
const DOCUMENT_STYLESHEET = fileURLToPath(new URL('../../../renderer/document.module.scss', import.meta.url));

/** Whatever a stylesheet spells as a heading gap variable, or a misspelling of one. */
const HEADING_VARIABLE = /--rte-heading-[a-z0-9-]+/g;

describe('the heading gap variable', () => {
    for (const [name, path] of Object.entries(STYLESHEETS)) {
        it(`is spelled as the constant in the ${name} stylesheet`, () => {
            const spelled = readFileSync(path, 'utf8').match(HEADING_VARIABLE) ?? [];

            expect(spelled.length).toBeGreaterThan(0);
            expect(new Set(spelled)).toEqual(new Set([HEADING_GAP_VARIABLE]));
        });
    }

    it('is not spelled in the document stylesheet, which knows no text style', () => {
        expect(readFileSync(DOCUMENT_STYLESHEET, 'utf8').match(HEADING_VARIABLE)).toBeNull();
    });
});
