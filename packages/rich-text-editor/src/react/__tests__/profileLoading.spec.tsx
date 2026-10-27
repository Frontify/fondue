/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createEmptyDocument } from '#/model';
import { commentModel } from '#/plugins';

import { loadProfile } from '../profiles';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import { type EditorHandle } from '../types';

describe('an editor whose profile module has not loaded', () => {
    it('renders the busy textbox shell, holds no handle and calls no host callback until the module loads', async () => {
        const callbacks = {
            onReady: vi.fn(),
            onDocumentChange: vi.fn(),
            onDiagnostic: vi.fn(),
            onSubmit: vi.fn(),
            onFocus: vi.fn(),
            onBlur: vi.fn(),
            onToolbarModeChange: vi.fn(),
        };
        const ref = createRef<EditorHandle<object>>();
        const { container } = render(
            <RichTextEditor
                {...callbacks}
                aria-label="Message"
                profile="comment"
                defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(commentModel) }}
                ref={ref}
            />,
        );
        const calls = () => Object.entries(callbacks).filter(([, callback]) => callback.mock.calls.length > 0);

        const shells = container.querySelectorAll('[role="textbox"]');
        expect([shells.length, ref.current, calls()]).toEqual([1, null, []]);
        expect(shells[0]).toHaveAttribute('aria-label', 'Message');
        expect(container.firstElementChild).toHaveAttribute('aria-busy', 'true');

        await act(async () => {
            await loadProfile('comment');
        });

        expect(container.querySelectorAll('[role="textbox"]')).toHaveLength(1);
        expect(container.querySelector('[role="textbox"]')).not.toBe(shells[0]);
        expect(container.firstElementChild).not.toHaveAttribute('aria-busy');

        expect(ref.current).not.toBeNull();
        expect(calls().map(([name]) => name)).toEqual(['onReady']);
    });
});
