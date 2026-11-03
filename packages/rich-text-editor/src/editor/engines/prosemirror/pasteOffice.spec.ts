/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

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

/** Each list of `body` in document order, as its tag and the text of its own items. */
const listsOf = (body: HTMLElement): string[] =>
    [...body.querySelectorAll('ol, ul')].map(
        (list) =>
            `${list.localName}: ${[...list.children].map((entry) => entry.firstElementChild?.textContent).join(', ')}`,
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
    it('keeps the text and order inside them, and drops the blank ones', () => {
        const body = tidied('<p class="MsoNormal"><o:p>a<o:p>b<i>c</i></o:p><o:p> </o:p>d</o:p></p>');

        expect(body.innerHTML).toBe('<p class="MsoNormal">ab<i>c</i>d</p>');
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

    it('leaves the other list properties of a `<style>` as they are', () => {
        const html =
            '<style>@list l0 {mso-list-id:1; mso-list-type:hybrid;}</style><p style="mso-list:l0 level1">a</p>';

        expect(keepOfficeListStyles(html)).toContain('{mso-list-id:1; mso-list-type:hybrid;}');
    });
});

describe('tidyOffice', () => {
    it('nests at most nine levels, as Word does', () => {
        const body = tidied(Array.from({ length: 20 }, (_, index) => item(index + 1, '·', `L${index + 1}`)).join(''));
        let deepest = 0;
        for (const entry of body.querySelectorAll('li')) {
            let depth = 0;
            for (let parent = entry.parentElement; parent !== null; parent = parent.parentElement) {
                if (parent.localName === 'ul') {
                    depth++;
                }
            }
            deepest = Math.max(deepest, depth);
        }

        expect(deepest).toBe(9);
    });

    it('starts a new list where numbers turn into bullets at one level of one list', () => {
        expect(listsOf(tidied(item(1, '1.', 'A') + item(1, '·', 'B')))).toEqual(['ol: A', 'ul: B']);
    });

    it.each(['a.', 'iv)', '(1)', '1.1.'])('reads the marker `%s` as numbered', (marker) => {
        expect(listsOf(tidied(item(1, marker, 'A')))).toEqual(['ol: A']);
    });

    it('keeps one list across a comment between its paragraphs', () => {
        expect(listsOf(tidied(`${item(1, '·', 'A')}<!-- note -->${item(1, '·', 'B')}`))).toEqual(['ul: A, B']);
    });

    it('keeps a paragraph whose list level is 0 as a paragraph', () => {
        expect(listsOf(tidied(item(0, '·', 'A')))).toEqual([]);
    });

    it('keeps the text an `<o:p>` holds', () => {
        const body = tidied('<p class="MsoNormal">a<o:p>kept</o:p></p>');

        expect(body.innerHTML).toBe('<p class="MsoNormal">akept</p>');
    });

    it('keeps a span with list data that holds no marker', () => {
        expect(tidied('<p class="MsoNormal"><span style="mso-list: l0 level1">keep</span></p>').textContent).toBe(
            'keep',
        );
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
