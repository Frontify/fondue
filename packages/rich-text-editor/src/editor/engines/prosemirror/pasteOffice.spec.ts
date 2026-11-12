/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { PASTED_LIST_ITEM_ATTRIBUTES } from '#/core';

import { keepOfficeListStyles, tidyOffice } from './pasteOffice';

const timed = (run: () => void): number => {
    const start = performance.now();
    run();
    return performance.now() - start;
};

/** `html`'s body after the Office cleanup. */
const tidied = (html: string): HTMLElement => {
    const { body } = new DOMParser().parseFromString(html, 'text/html');
    tidyOffice(body);
    return body;
};

const item = (level: number, marker: string, text: string, list = 'l0'): string =>
    `<p style="mso-list: ${list} level${level} lfo1"><span style="mso-list: Ignore">${marker}</span>${text}</p>`;

/** The paragraphs of `body` marked as list items. */
const markedOf = (body: HTMLElement): Element[] => [...body.querySelectorAll(`[${PASTED_LIST_ITEM_ATTRIBUTES.list}]`)];

/** Each list item `body` marks, in document order, as its text and the contract written on it. */
const contractOf = (body: HTMLElement): string[] =>
    markedOf(body).map((paragraph) =>
        [
            paragraph.textContent,
            paragraph.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.list),
            paragraph.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.level),
            paragraph.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.marker),
            paragraph.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.number),
        ].join(' | '),
    );

describe('keepOfficeListStyles on hostile HTML', () => {
    // About 700 KB each; a pattern that rescans to the end from every start takes minutes on these.
    it.each([
        ['an unquoted class attribute without end', 'mso-list<p'.concat(' class='.repeat(100_000))],
        ['tags that never close', 'mso-list'.concat('<a'.repeat(350_000))],
        ['style elements that never close', 'mso-list'.concat('<style>'.repeat(100_000))],
    ])('reads %s in one pass', (_name, html) => {
        expect(timed(() => keepOfficeListStyles(html))).toBeLessThan(1000);
    });

    it('reads a 16 MB `<style>` body without overflowing the stack', () => {
        const html = `<style>p{mso-list:x;}${'a'.repeat(16_000_000)}</style>`;

        expect(keepOfficeListStyles(html).startsWith('<style>p{--mso-list-rule:x;}')).toBe(true);
    });
});

describe('tidyOffice on nested `<o:p>` markers', () => {
    it('keeps the ones with text, and drops the blank ones', () => {
        const body = tidied('<p class="MsoNormal"><o:p>a<o:p>b<i>c</i></o:p><o:p> </o:p>d</o:p></p>');

        expect(body.textContent).toBe('abcd');
        expect(body.getElementsByTagName('o:p')).toHaveLength(2);
    });

    it.each([
        ['a span holding a space', '<u><o:p><span style="text-decoration:none">&nbsp;</span></o:p></u>', '<u></u>'],
        ['a space and a comment', '<o:p>&nbsp;<!-- c --></o:p>', ''],
        ['a break', '<o:p><br></o:p>', ''],
    ])('drops a marker holding %s', (_name, inner, left) => {
        expect(tidied(`<p class="MsoNormal">${inner}</p>`).innerHTML).toBe(`<p class="MsoNormal">${left}</p>`);
    });
});

describe('keepOfficeListStyles', () => {
    it('renames the list data of a single-quoted style', () => {
        expect(keepOfficeListStyles("<p style='mso-list:l0 level1 lfo1'>a</p>")).toBe(
            "<p style='--mso-list:l0 level1 lfo1'>a</p>",
        );
    });

    it('renames the list data of every `<style>` body and of no text between them', () => {
        expect(keepOfficeListStyles('<style>p{mso-list:a}</style>mso-list:b<style>q{mso-list:c}</style>')).toBe(
            '<style>p{--mso-list-rule:a}</style>mso-list:b<style>q{--mso-list-rule:c}</style>',
        );
    });

    it.each([
        ['a `<style>` tag no closing tag follows', '<p title="<style>">mso-list: x</p>'],
        ['a custom element named like a style tag', '<style-guide>p{mso-list:a}</style-guide>'],
    ])('leaves the text after %s as it is', (_name, html) => {
        expect(keepOfficeListStyles(html)).toBe(html);
    });

    it('leaves the other list properties of a `<style>` as they are', () => {
        const html =
            '<style>@list l0 {mso-list-id:1; mso-list-type:hybrid;}</style><p style="mso-list:l0 level1">a</p>';

        expect(keepOfficeListStyles(html)).toContain('{mso-list-id:1; mso-list-type:hybrid;}');
    });
});

describe('tidyOffice', () => {
    it('marks at most nine levels, as Word does', () => {
        const body = tidied(Array.from({ length: 20 }, (_, index) => item(index + 1, '·', `L${index + 1}`)).join(''));
        const levels = markedOf(body).map((paragraph) =>
            Number(paragraph.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.level)),
        );

        expect(Math.max(...levels)).toBe(9);
    });

    it('marks each item with its list, level, marker and own number, without the marker text', () => {
        expect(contractOf(tidied(item(1, '1.', 'A') + item(2, '·', 'B', 'l1') + item(1, '3.', 'C')))).toEqual([
            'A | l0 lfo1 | 1 | numbered | 1',
            'B | l1 lfo1 | 2 | bullet | ',
            'C | l0 lfo1 | 1 | numbered | 3',
        ]);
    });

    it.each(['a.', 'iv)', '(1)', '1.1.'])('reads the marker `%s` as numbered', (marker) => {
        expect(markedOf(tidied(item(1, marker, 'A')))[0]?.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.marker)).toBe(
            'numbered',
        );
    });

    it('keeps a paragraph whose list level is 0 as a paragraph', () => {
        expect(markedOf(tidied(item(0, '·', 'A')))).toEqual([]);
    });

    it.each([
        ['an Office paste', '<p class="MsoNormal" data-rte-pasted-list="x" data-rte-pasted-list-level="1">a</p>'],
        ['a paste from elsewhere', '<p data-rte-pasted-list-marker="numbered" data-rte-pasted-list-number="7">a</p>'],
    ])('removes the list contract %s carries itself', (_name, html) => {
        expect(tidied(html).innerHTML).not.toContain('data-rte-pasted');
    });

    it('keeps the text an `<o:p>` holds', () => {
        const body = tidied('<p class="MsoNormal">a<o:p>kept</o:p></p>');

        expect(body.textContent).toBe('akept');
    });

    it('keeps a span with list data that holds no marker', () => {
        expect(tidied('<p class="MsoNormal"><span style="mso-list: l0 level1">keep</span></p>').textContent).toBe(
            'keep',
        );
    });
});

describe('tidyOffice on paragraphs inside paragraphs', () => {
    it('marks no list paragraph inside a list paragraph, so nesting stays bounded', () => {
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

        expect(markedOf(body)).toEqual([outer]);
    });
});
