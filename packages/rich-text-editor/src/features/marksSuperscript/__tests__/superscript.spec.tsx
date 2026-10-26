/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { core, subscript, superscript } from '#/features';
import { mountText, para, text, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const marksOf = ({ handle }: ReturnType<typeof mountText>) => {
    const [block] = handle.getSnapshot().document.content.content ?? [];
    if (block === undefined) {
        return [];
    }

    return (block.content ?? []).map((child) => {
        const marks = (child.marks ?? []).map(({ type }) => `[${type}]`).join('');

        return `${child.text ?? ''}${marks}`;
    });
};

describe('marks.subscript and marks.superscript', () => {
    it('installs each of subscript and superscript alone', () => {
        const results = (['subscript', 'superscript'] as const).map((name) => {
            const features = name === 'subscript' ? [core(), subscript()] : [core(), superscript()];
            const mounted = mountText({ model: textModel(features), blocks: [para(text('H2O'))] });
            setSelection(mounted.handle, { text: 'H2O', from: 1, to: 2 });
            const result = mounted.handle.execute(`mark.${name}.toggle`);
            const marks = marksOf(mounted);
            mounted.unmount();

            return [result.status, marks];
        });

        expect(results).toEqual([
            ['applied', ['H', '2[subscript]', 'O']],
            ['applied', ['H', '2[superscript]', 'O']],
        ]);
    });

    it('removes the other mark from the range when both are installed', () => {
        const mounted = mountText({
            model: textModel([core(), subscript(), superscript()]),
            blocks: [para(text('H'), text('2', 'subscript'), text('O'))],
        });
        setSelection(mounted.handle, { text: 'H2O', from: 1, to: 2 });

        mounted.handle.execute('mark.superscript.toggle');
        const raised = marksOf(mounted);
        mounted.handle.execute('mark.subscript.toggle');

        expect([raised, marksOf(mounted)]).toEqual([
            ['H', '2[superscript]', 'O'],
            ['H', '2[subscript]', 'O'],
        ]);
    });
});
