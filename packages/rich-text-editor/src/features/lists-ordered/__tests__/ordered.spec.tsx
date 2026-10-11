/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { item, list, listModel, outlineOf } from '#/react/__tests__/fixtures/lists';
import { mountText, para, storedIn } from '#/react/__tests__/fixtures/text';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = listModel();
const fromFive = list('ordered', [item('ordered', 'one'), item('ordered', 'two'), item('ordered', 'three')], 5);

describe('lists.ordered', () => {
    it('keeps start 5 when the list is edited, indented and outdented', () => {
        const { handle } = mountText({ model, blocks: [fromFive] });
        setSelection(handle, { text: 'one', from: 3, to: 3 });

        typeText(handle, '!');
        const edited = outlineOf(handle);
        setSelection(handle, { text: 'two', from: 0, to: 0 });
        pressKey(handle, 'Tab');
        const indented = outlineOf(handle);
        pressKey(handle, 'Shift-Tab');

        expect(edited).toEqual([{ ol: [['one!'], ['two'], ['three']], start: 5 }]);
        expect(indented).toEqual([{ ol: [['one!', { ol: [['two']] }], ['three']], start: 5 }]);
        expect(outlineOf(handle)).toEqual([{ ol: [['one!'], ['two'], ['three']], start: 5 }]);
    });

    it('keeps start 5 through HTML, plain text and a Markdown round trip', () => {
        const codecs = createCodecs(model);
        const document = storedIn(model, [fromFive]);

        const markdown = codecs.toMarkdown(document).markdown;
        const read = codecs.fromMarkdown(markdown);

        expect(codecs.toHTML(document).html).toContain('<ol start="5" style="list-style-type:decimal" dir="auto">');
        expect(codecs.toPlainText(document).text).toBe('5. one\n6. two\n7. three');
        expect(markdown).toBe('5. one\n6. two\n7. three');
        expect(read).toMatchObject({
            status: 'editable',
            document: { content: { content: [{ type: 'ordered_list', attrs: { start: 5, marker: null } }] } },
        });
    });

    it('starts a list at 1,000,000 from its number, and keeps 1000001. as typed', () => {
        const largest = mountText({ model, blocks: [para()] });
        const above = mountText({ model, blocks: [para()] });

        typeText(largest.handle, '1000000. ');
        typeText(above.handle, '1000001. ');

        expect(largest.handle.getSnapshot().document.content.content).toEqual([
            {
                type: 'ordered_list',
                attrs: { start: 1_000_000, marker: null },
                content: [{ type: 'list_item', content: [{ type: 'paragraph', attrs: { lang: null } }] }],
            },
        ]);
        expect(outlineOf(above.handle)).toEqual(['1000001. ']);
        expect(above.handle.getSnapshot().document.content.content).toMatchObject([{ type: 'paragraph' }]);
    });

    it('opens the numbering dialog on the start of the nearest ordered list, through a bulleted list inside it', () => {
        const inner = list('bullet', [item('bullet', 'inner')]);
        const { handle } = mountText({
            model,
            blocks: [list('ordered', [item('ordered', 'outer', inner)], 5)],
        });
        setSelection(handle, { text: 'inner', from: 1, to: 1 });

        act(() => {
            handle.execute('list.ordered.start.edit');
            vi.advanceTimersToNextFrame();
        });

        expect(screen.getByRole('spinbutton', { name: 'First number' })).toHaveProperty('value', '5');
    });
});
