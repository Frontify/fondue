/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { OFFICE_LIST_ATTRIBUTES } from '#/core';

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

/** The paragraphs of `body` that keep list data. */
const markedOf = (body: HTMLElement): Element[] => [...body.querySelectorAll(`[${OFFICE_LIST_ATTRIBUTES.list}]`)];

/** Each list paragraph `body` keeps data on, in document order, as its text and the data kept. */
const listDataOf = (body: HTMLElement): string[] =>
    markedOf(body).map((paragraph) =>
        [
            paragraph.textContent,
            paragraph.getAttribute(OFFICE_LIST_ATTRIBUTES.list),
            paragraph.getAttribute(OFFICE_LIST_ATTRIBUTES.level),
            paragraph.getAttribute(OFFICE_LIST_ATTRIBUTES.marker),
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
    it("keeps each item's list, level and marker as Word wrote them, without the marker text in the content", () => {
        expect(listDataOf(tidied(item(1, '1.', 'A') + item(2, '·', 'B', 'l1') + item(1, '(3)', 'C')))).toEqual([
            'A | l0 lfo1 | 1 | 1.',
            'B | l1 lfo1 | 2 | ·',
            'C | l0 lfo1 | 1 | (3)',
        ]);
    });

    it('keeps the level digits as written, without reading them', () => {
        expect(markedOf(tidied(item(20, '·', 'A')))[0]?.getAttribute(OFFICE_LIST_ATTRIBUTES.level)).toBe('20');
    });

    it.each([
        ['an Office paste', '<p class="MsoNormal" data-rte-office-list="x" data-rte-office-level="1">a</p>'],
        ['a paste from elsewhere', '<p data-rte-office-marker="1." data-rte-office-level="7">a</p>'],
    ])('removes the list data %s carries itself', (_name, html) => {
        expect(tidied(html).innerHTML).not.toContain('data-rte-office');
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
    it('keeps no list data on a paragraph inside a list paragraph, so nesting stays bounded', () => {
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
