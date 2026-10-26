/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type ContentNodeJSON } from '#/model';
import { codeBlock, core, emoji } from '#/plugins';
import { mountText, para, text, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = textModel([core(), emoji(), codeBlock()]);
const code = (value: string): ContentNodeJSON => ({
    type: 'code_block',
    attrs: { languageId: null },
    ...(value === '' ? {} : { content: [{ type: 'text', text: value }] }),
});
const blocksOf = (handle: ReturnType<typeof mountText>['handle']) =>
    handle.getSnapshot().document.content.content ?? [];

describe('emoji', () => {
    it('inserts the given text, and the picker is enabled in a paragraph and disabled in a code block', () => {
        const paragraph = mountText({ model, blocks: [para()] });
        const coded = mountText({ model, blocks: [code('const')] });
        setSelection(coded.handle, { text: 'const', from: 1, to: 1 });

        const inserted = paragraph.handle.execute('text.insert', { text: '🎉' });

        expect(inserted).toMatchObject({ status: 'applied', contentChanged: true });
        expect(blocksOf(paragraph.handle)).toEqual([para(text('🎉'))]);
        expect(paragraph.handle.query('emoji.picker.open')).toEqual({
            enabled: true,
            active: false,
            disabledReason: null,
        });
        expect(coded.handle.query('emoji.picker.open')).toEqual({
            enabled: false,
            active: false,
            disabledReason: 'not-applicable',
        });
        paragraph.unmount();
        coded.unmount();
    });
});
