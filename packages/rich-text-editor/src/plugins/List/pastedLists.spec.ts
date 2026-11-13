/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { OFFICE_LIST_ATTRIBUTES } from '#/core';

import { PASTED_LISTS } from './pastedLists';

/** `html`'s body after the transform, and the clean-up of the list data the editor runs after every transform. */
const rebuilt = (html: string): HTMLElement => {
    const { body } = new DOMParser().parseFromString(html, 'text/html');
    PASTED_LISTS.run(body, { isClaimed: () => false });
    // What the editor does after every transform: no paragraph keeps the list data.
    for (const paragraph of body.querySelectorAll('p')) {
        for (const name of Object.values(OFFICE_LIST_ATTRIBUTES)) {
            paragraph.removeAttribute(name);
        }
    }
    return body;
};

/** A paragraph with the list data the editor keeps from Word's list paragraphs. */
const item = (level: number, marker: string, text: string, list = 'l0 lfo1'): string =>
    `<p ${OFFICE_LIST_ATTRIBUTES.list}="${list}" ${OFFICE_LIST_ATTRIBUTES.level}="${level}" ` +
    `${OFFICE_LIST_ATTRIBUTES.marker}="${marker}">${text}</p>`;

/** Each list of `body` in document order, as its tag and the text of its own items. */
const listsOf = (body: HTMLElement): string[] =>
    [...body.querySelectorAll('ol, ul')].map(
        (list) =>
            `${list.localName}: ${[...list.children].map((entry) => entry.firstElementChild?.textContent).join(', ')}`,
    );

describe('PASTED_LISTS', () => {
    it('starts a new list where numbers turn into bullets at one level of one list', () => {
        expect(listsOf(rebuilt(item(1, '1.', 'A') + item(1, '·', 'B')))).toEqual(['ol: A', 'ul: B']);
    });

    it('keeps one list across a comment between its paragraphs', () => {
        expect(listsOf(rebuilt(`${item(1, '·', 'A')}<!-- note -->${item(1, '·', 'B')}`))).toEqual(['ul: A, B']);
    });

    it('nests a deeper level inside the last item of the level above', () => {
        const body = rebuilt(item(1, '·', 'A') + item(2, '1.', 'B') + item(1, '·', 'C'));

        expect(body.innerHTML).toBe('<ul><li><p>A</p><ol start="1"><li><p>B</p></li></ol></li><li><p>C</p></li></ul>');
    });

    it('starts a numbered list at the number its first item carries', () => {
        expect(
            rebuilt(item(1, '4.', 'A'))
                .querySelector('ol')
                ?.getAttribute('start'),
        ).toBe('4');
    });

    it.each(['a.', 'iv)', '(1)', '1.1.'])('reads the marker `%s` as numbered', (marker) => {
        expect(listsOf(rebuilt(item(1, marker, 'A')))).toEqual(['ol: A']);
    });

    it('starts a numbered list at the last number of a nested marker', () => {
        expect(
            rebuilt(item(1, '1.3.', 'A'))
                .querySelector('ol')
                ?.getAttribute('start'),
        ).toBe('3');
    });

    it('starts no numbered list at a number when the marker is a letter', () => {
        expect(
            rebuilt(item(1, 'a.', 'A'))
                .querySelector('ol')
                ?.hasAttribute('start'),
        ).toBe(false);
    });

    it('nests at most nine levels, as Word has', () => {
        const body = rebuilt(Array.from({ length: 20 }, (_, index) => item(index + 1, '·', `L${index + 1}`)).join(''));

        expect(body.querySelectorAll('ul')).toHaveLength(9);
    });

    it('keeps a paragraph whose list level is 0 as a paragraph', () => {
        expect(rebuilt(item(0, '·', 'A')).querySelector('ul, ol')).toBeNull();
    });
});

describe('PASTED_LISTS with a level that is no number', () => {
    it('throws instead of reading it as a level', () => {
        expect(() => rebuilt(item(1, '·', 'A').replace('level="1"', 'level="x"'))).toThrow(
            'The list paragraph has the level "x"',
        );
    });
});
