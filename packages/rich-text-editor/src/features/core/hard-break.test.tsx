/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { fixtureChrome } from '#/features/__fixtures__/chrome/feature';
import { fixtureMention } from '#/features/__fixtures__/features';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

import { mountText, para, text, textFeatures, textModel } from '../../../fixtures/editor/text';

const model = textModel([...textFeatures(), fixtureChrome()]);
type Mounted = ReturnType<typeof mountText>;

const pressShiftEnter = ({ view }: Mounted) => {
    const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true, cancelable: true });
    view.dom.dispatchEvent(event);
    return event.defaultPrevented;
};
const firstOf = ({ handle }: Mounted) => {
    const [block] = handle.getSnapshot().document.content.content ?? [];
    return block;
};

describe('hard-break.insert', () => {
    it('SPEC-rich-text-editing/AC-005 inserts a hard_break with Shift+Enter as one undo step', () => {
        const mounted = mountText({ model, blocks: [para(text('ab'))] });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

        const prevented = pressShiftEnter(mounted);
        const broken = firstOf(mounted);
        mounted.handle.execute('history.undo');

        expect(prevented).toBe(true);
        expect(broken).toEqual(para(text('a'), { type: 'hard_break' }, text('b')));
        expect(mounted.changes.at(0)?.commandId).toBe('hard-break.insert');
        expect(firstOf(mounted)).toEqual(para(text('ab')));
    });

    it('SPEC-rich-text-editing/AC-005 runs hard-break.insert through execute, and inserts a newline in a code block', () => {
        const mounted = mountText({
            model,
            blocks: [
                para(text('ab')),
                {
                    type: 'chrome_block',
                    attrs: { nodeId: 'code-1', language: 'plain', checked: false },
                    content: [text('cd')],
                },
            ],
        });
        setSelection(mounted.handle, { text: 'ab', from: 2, to: 2 });
        const result = mounted.handle.execute('hard-break.insert');
        setSelection(mounted.handle, { text: 'cd', from: 1, to: 1 });
        pressShiftEnter(mounted);

        expect(result.status).toBe('applied');
        expect(mounted.handle.getSnapshot().document.content.content).toEqual([
            para(text('ab'), { type: 'hard_break' }),
            {
                type: 'chrome_block',
                attrs: { nodeId: 'code-1', language: 'plain', checked: false },
                content: [text('c\nd')],
            },
        ]);
    });

    it('SPEC-rich-text-runtime/AC-072 inserts no hard_break with Shift+Enter in a read-only editor', () => {
        const mounted = mountText({ model, blocks: [para(text('ab'))] });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
        mounted.handle.setMode('readonly');

        pressShiftEnter(mounted);

        expect(mounted.changes).toEqual([]);
        expect(firstOf(mounted)).toEqual(para(text('ab')));
    });

    it('SPEC-rich-text-editing/AC-005 keeps another inline atom from becoming a newline in a code block', () => {
        const withMention = textModel([...textFeatures(), fixtureChrome(), fixtureMention()]);
        const mounted = mountText({
            model: withMention,
            blocks: [
                {
                    type: 'chrome_block',
                    attrs: { nodeId: 'code-1', language: 'plain', checked: false },
                    content: [text('cd')],
                },
            ],
        });
        setSelection(mounted.handle, { text: 'cd', from: 1, to: 1 });

        const result = runtimeOf(mounted.handle)?.handle.execute('fixture.mention.insert');

        expect(result).toEqual({ status: 'rejected', code: 'not-applicable' });
        expect(firstOf(mounted)).toEqual({
            type: 'chrome_block',
            attrs: { nodeId: 'code-1', language: 'plain', checked: false },
            content: [text('cd')],
        });
    });
});
