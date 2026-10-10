/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { setSelection } from '#/testing';

import { item, list, listModel } from '../../../fixtures/editor/lists';
import { mountText } from '../../../fixtures/editor/text';

describe('list toggles', () => {
    it('SPEC-rich-text-react/AC-037 reports the list type at the selection depth for a nested bulleted item inside a numbered list', () => {
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
