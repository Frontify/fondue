/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mountText, para, text } from '#/react/__tests__/fixtures/text';
import { paste, setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const blockOf = ({ handle }: ReturnType<typeof mountText>) =>
    handle.getSnapshot().document.content.content?.[0]?.content;

describe('paste', () => {
    it('feeds the paste order and dispatches no clipboard event', () => {
        const mounted = mountText({ blocks: [para(text('a'))] });
        const seen = vi.fn();
        mounted.view.dom.addEventListener('paste', seen);
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        act(() => {
            paste(mounted.handle, { html: '<p><strong>b</strong></p>', text: 'b' });
        });

        expect(blockOf(mounted)).toEqual([text('a'), text('b', 'bold')]);
        expect(seen).not.toHaveBeenCalled();
    });

    it('takes plain text when no HTML comes with it', () => {
        const mounted = mountText({ blocks: [para(text('a'))] });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        act(() => {
            paste(mounted.handle, { text: 'c' });
        });

        expect(blockOf(mounted)).toEqual([text('ac')]);
    });
});
