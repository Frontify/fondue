/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { PASTED_LIST_ITEM_ATTRIBUTES, type PastedListMarker } from '#/core';

import { PASTED_LISTS } from './pastedLists';

/** `html`'s body after the transform. */
const rebuilt = (html: string): HTMLElement => {
    const { body } = new DOMParser().parseFromString(html, 'text/html');
    PASTED_LISTS.run(body, { isClaimed: () => false });
    return body;
};

/** A paragraph the editor marked as a list item, as it does for Word's list paragraphs. */
const item = (level: number, marker: PastedListMarker, text: string, list = 'l0 lfo1'): string =>
    `<p ${PASTED_LIST_ITEM_ATTRIBUTES.list}="${list}" ${PASTED_LIST_ITEM_ATTRIBUTES.level}="${level}" ` +
    `${PASTED_LIST_ITEM_ATTRIBUTES.marker}="${marker}">${text}</p>`;

/** Each list of `body` in document order, as its tag and the text of its own items. */
const listsOf = (body: HTMLElement): string[] =>
    [...body.querySelectorAll('ol, ul')].map(
        (list) =>
            `${list.localName}: ${[...list.children].map((entry) => entry.firstElementChild?.textContent).join(', ')}`,
    );

describe('PASTED_LISTS', () => {
    it('starts a new list where numbers turn into bullets at one level of one list', () => {
        expect(listsOf(rebuilt(item(1, 'numbered', 'A') + item(1, 'bullet', 'B')))).toEqual(['ol: A', 'ul: B']);
    });

    it('keeps one list across a comment between its paragraphs', () => {
        expect(listsOf(rebuilt(`${item(1, 'bullet', 'A')}<!-- note -->${item(1, 'bullet', 'B')}`))).toEqual([
            'ul: A, B',
        ]);
    });

    it('nests a deeper level inside the last item of the level above', () => {
        const body = rebuilt(item(1, 'bullet', 'A') + item(2, 'numbered', 'B') + item(1, 'bullet', 'C'));

        expect(body.innerHTML).toBe('<ul><li><p>A</p><ol><li><p>B</p></li></ol></li><li><p>C</p></li></ul>');
    });

    it('starts a numbered list at the number its first item carries', () => {
        const body = rebuilt(
            `<p ${PASTED_LIST_ITEM_ATTRIBUTES.list}="l0 lfo1" ${PASTED_LIST_ITEM_ATTRIBUTES.level}="1" ` +
                `${PASTED_LIST_ITEM_ATTRIBUTES.marker}="numbered" ${PASTED_LIST_ITEM_ATTRIBUTES.number}="4">A</p>`,
        );

        expect(body.querySelector('ol')?.getAttribute('start')).toBe('4');
    });

    it('leaves no contract attribute on any paragraph', () => {
        expect(rebuilt(item(1, 'bullet', 'A') + item(1, 'numbered', 'B', 'l1 lfo2')).innerHTML).not.toContain(
            'data-rte-pasted',
        );
    });
});
