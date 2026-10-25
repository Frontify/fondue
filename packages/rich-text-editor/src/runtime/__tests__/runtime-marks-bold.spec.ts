/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, defineFeature } from '#/model';
import { pressKey, setSelection, typeText } from '#/testing';

import { stored, para, strong, start, contentOf, installRuntimeHooks } from './fixtures/start';

installRuntimeHooks();

describe('marks.bold', () => {
    it('toggles the stored mark at a caret, which the next typed character takes', () => {
        const { handle, changes } = start(stored(para({ type: 'text', text: 'ab' })));
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        pressKey(handle, 'Mod-b');
        expect(handle.getSummary()).toMatchObject({ sequence: 0, selection: { collapsed: true } });
        expect(handle.query('mark.bold.toggle').active).toBe(true);
        typeText(handle, 'c');

        expect(contentOf(changes[0])).toEqual(stored(para({ type: 'text', text: 'ab' }, strong('c'))).content);
    });

    it('bolds a half-bold range whole, and a range with spaces at its edges with them', () => {
        const half = start(stored(para(strong('ab'), { type: 'text', text: 'cd' })));
        setSelection(half.handle, { text: 'abcd' });
        expect(half.handle.query('mark.bold.toggle').active).toBe('mixed');
        pressKey(half.handle, 'Mod-b');
        expect(contentOf(half.changes[0])).toEqual(stored(para(strong('abcd'))).content);

        const spaced = start(stored(para({ type: 'text', text: 'a b c' })));
        setSelection(spaced.handle, { text: ' b ' });
        pressKey(spaced.handle, 'Mod-b');
        expect(contentOf(spaced.changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }, strong(' b '), { type: 'text', text: 'c' })).content,
        );
    });

    it('removes bold from a range that is bold throughout', () => {
        const { handle, changes } = start(stored(para(strong('abcd'))));
        setSelection(handle, { text: 'bc' });
        expect(handle.query('mark.bold.toggle').active).toBe(true);

        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(
            stored(para(strong('a'), { type: 'text', text: 'bc' }, strong('d'))).content,
        );
    });

    it('bolds the whole range when only a space between bold words is plain', () => {
        const { handle, changes } = start(stored(para(strong('a'), { type: 'text', text: ' ' }, strong('b'))));
        setSelection(handle, { text: 'a b' });
        expect(handle.query('mark.bold.toggle').active).toBe('mixed');

        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(stored(para(strong('a b'))).content);
    });

    it('removes bold from bold text around a hard break', () => {
        const { handle, changes } = start(stored(para(strong('a'), { type: 'hard_break' }, strong('b'))));
        setSelection(handle, { text: 'a\uFFFCb' });
        expect(handle.query('mark.bold.toggle').active).toBe(true);

        pressKey(handle, 'Mod-b');

        expect(changes).toHaveLength(1);
        expect(contentOf(changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }, { type: 'hard_break' }, { type: 'text', text: 'b' })).content,
        );
    });
    it('finds nothing to toggle in a selection that holds only a hard break', () => {
        const { handle, changes, runtime } = start(
            stored(para({ type: 'text', text: 'a' }, { type: 'hard_break' }, { type: 'text', text: 'b' })),
        );
        runtime.select({ anchor: 2, head: 3 });

        expect(handle.query('mark.bold.toggle')).toEqual({
            enabled: false,
            active: false,
            disabledReason: 'not-applicable',
        });
        pressKey(handle, 'Mod-b');

        expect(changes).toEqual([]);
    });

    it('reads a range as fully bold when its only plain text sits where bold is not allowed', () => {
        const line = defineFeature({
            id: 'test.line',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                plain_line: { group: 'block', content: 'text*', marks: [], attrs: {}, html: ['pre', 0], parse: [] },
            },
        });
        const model = compileContentModel([core(), bold(), line()], { id: 'test.bold', version: 1 });
        const plain = { type: 'plain_line', content: [{ type: 'text', text: 'b' }] };
        const { handle, changes, runtime, view } = start(stored(para(strong('a')), plain, para(strong('c'))), {
            model,
        });
        runtime.select({ anchor: 1, head: view.state.doc.content.size - 1 });

        expect(handle.query('mark.bold.toggle').active).toBe(true);
        pressKey(handle, 'Mod-b');

        expect(contentOf(changes[0])).toEqual(
            stored(para({ type: 'text', text: 'a' }), plain, para({ type: 'text', text: 'c' })).content,
        );
    });
});
