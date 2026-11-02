/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { keepOfficeListStyles, tidyOffice } from './pasteOffice';

const timed = (run: () => void): number => {
    const start = performance.now();
    run();
    return performance.now() - start;
};

describe('keepOfficeListStyles on hostile HTML', () => {
    // About 700 KB each; a pattern that rescans to the end from every start takes minutes on these.
    it.each([
        ['an unquoted class attribute without end', '<p'.concat(' class='.repeat(100_000))],
        ['tags that never close', 'mso-list'.concat('<a'.repeat(350_000))],
        ['style elements that never close', 'mso-list'.concat('<style>'.repeat(100_000))],
    ])('reads %s in one pass', (_name, html) => {
        expect(timed(() => keepOfficeListStyles(html))).toBeLessThan(1000);
    });
});

describe('tidyOffice on paragraphs inside paragraphs', () => {
    it('rebuilds no list inside a list paragraph, so nesting stays bounded', () => {
        const body = document.createElement('body');
        const listParagraph = (): HTMLElement => {
            const paragraph = document.createElement('p');
            paragraph.setAttribute('style', 'mso-list: l0 level1 lfo1');
            paragraph.append('item');
            return paragraph;
        };
        const outer = listParagraph();
        const holder = document.createElement('object');
        holder.append(listParagraph());
        outer.append(holder);
        body.append(outer);

        tidyOffice(body);

        expect(body.querySelectorAll('ol, ul')).toHaveLength(1);
    });
});
