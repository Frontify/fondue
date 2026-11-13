/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { pasteLinesPlugin } from './PasteLines';

const TABLE = '<table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>';

/** `html`'s body after the plugin's paste transforms, with `isClaimed` answering for the elements the test names. */
const flattened = (html: string, isClaimed: (element: HTMLElement) => boolean = () => false): HTMLElement => {
    const { body } = new DOMParser().parseFromString(html, 'text/html');
    for (const transform of pasteLinesPlugin().pasteTransforms ?? []) {
        transform.run(body, { isClaimed });
    }
    return body;
};

describe('pasteLinesPlugin', () => {
    it('pastes one line per table row, with the cells joined by a space', () => {
        expect(flattened(TABLE).innerHTML).toBe('<div>a b</div><div>c d</div>');
    });

    it('pastes a nested table as the lines it became inside its outer cell', () => {
        const nested = '<table><tr><td>x<table><tr><td>y</td></tr></table></td><td>z</td></tr></table>';

        expect(flattened(nested).innerHTML).toBe('<div>xy z</div>');
    });

    it('pastes one line per line of a `<pre>`', () => {
        expect(flattened('<pre>one\r\ntwo\nthree</pre>').innerHTML).toBe(
            '<div>one</div><div>two</div><div>three</div>',
        );
    });

    it('keeps a table or `<pre>` that a mounted plugin reads', () => {
        const body = flattened(`${TABLE}<pre>a\nb</pre>`, () => true);

        expect(body.querySelectorAll('table, pre')).toHaveLength(2);
        expect(body.querySelector('div')).toBeNull();
    });
});
