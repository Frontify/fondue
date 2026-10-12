/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { item, list, listModel } from '#/react/__tests__/fixtures/lists';
import { mountText } from '#/react/__tests__/fixtures/text';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

describe('list toggles', () => {
    it('reports the list type at the selection depth for a nested bulleted item inside a numbered list', () => {
        const nested = list('bullet', [item('bullet', 'inner')]);
        const { handle } = mountText({
            model: listModel(),
            blocks: [list('ordered', [item('ordered', 'outer', nested)])],
            toolbar: [
                ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
            ],
        });

        act(() => setSelection(handle, { text: 'inner', from: 1, to: 1 }));
        const inner = ['Bulleted list', 'Numbered list', 'Task list'].map((name) =>
            screen.getByRole('button', { name }).getAttribute('aria-pressed'),
        );
        act(() => setSelection(handle, { text: 'outer', from: 1, to: 1 }));
        const outer = ['Bulleted list', 'Numbered list'].map((name) =>
            screen.getByRole('button', { name }).getAttribute('aria-pressed'),
        );

        expect(inner).toEqual(['true', 'false', 'false']);
        expect(outer).toEqual(['false', 'true']);
    });
});
