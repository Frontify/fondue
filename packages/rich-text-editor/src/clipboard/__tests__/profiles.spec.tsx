/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mountProfile } from '#/react/__tests__/fixtures/profiles';
import { paste } from '#/testing';

const CELLS = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
const TABLE = `<table>${['a', 'b', 'c']
    .map((row) => `<tr>${[1, 2, 3].map((column) => `<td>${row}${column}</td>`).join('')}</tr>`)
    .join('')}</table>`;
const REMOVED = 'Some formatting was removed.';

const pasteHtml = ({ handle }: Awaited<ReturnType<typeof mountProfile>>, html: string) => {
    act(() => {
        paste(handle, { html });
    });
};

const paragraph = (value: string) => ({
    type: 'paragraph',
    attrs: { lang: null, align: null },
    content: [{ type: 'text', text: value }],
});

describe('paste of structures the profile cannot hold', () => {
    it('turns a pasted h2 into a paragraph in a comment, which holds no heading', async () => {
        const mounted = await mountProfile('comment');

        pasteHtml(mounted, '<h2>Title</h2>');

        expect(mounted.content()).toEqual([paragraph('Title')]);
    });

    it('keeps the nine cell texts of a pasted 3 by 3 table as paragraphs in a comment, announced once', async () => {
        const mounted = await mountProfile('comment');

        pasteHtml(mounted, TABLE);

        expect(mounted.content()).toEqual(CELLS.map(paragraph));
        expect(mounted.announced()).toBe(REMOVED);
    });

    it('joins a pasted three-paragraph fragment into the one paragraph of an Inline field, announced once', async () => {
        const mounted = await mountProfile('inline');

        pasteHtml(mounted, '<p>one</p><p><strong>two</strong></p><p>three</p>');

        expect(mounted.handle.getSnapshot().document.content.content).toHaveLength(1);
        expect(mounted.view.state.doc.textContent).toBe('one two three');
        expect(mounted.announced()).toBe(REMOVED);
    });

    it('joins the cell texts of a pasted table into the one paragraph of an Inline field, in order', async () => {
        const mounted = await mountProfile('inline');

        pasteHtml(mounted, TABLE);

        expect(mounted.content()).toEqual([paragraph(CELLS.join(' '))]);
        expect(mounted.announced()).toBe(REMOVED);
    });
});
