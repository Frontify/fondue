/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { Component, createRef, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createEmptyDocument } from '#/model';
import { commentModel, inlineModel } from '#/plugins';

import { loadProfile } from '../profiles';
import * as inlineProfile from '../profiles/inline';
import { RichTextEditor } from '../RichTextEditor';
import { type EditorHandle } from '../types';

vi.mock('../profiles/inline', async (importOriginal) => {
    const actual = await importOriginal<typeof inlineProfile>();

    return { ...actual, shipped: vi.fn(actual.shipped) };
});

/** Shows `failed` once a child threw, as a host's error boundary around the editor does. */
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    override state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    override render() {
        if (this.state.failed) {
            return 'failed';
        }

        return this.props.children;
    }
}

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

describe('an editor whose profile module failed to load', () => {
    it('loads the module again for a later editor, once the failure is gone', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        vi.mocked(inlineProfile.shipped).mockImplementationOnce(() => {
            throw new Error('offline');
        });
        const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(inlineModel) };
        const first = render(
            <Boundary>
                <RichTextEditor aria-label="Title" profile="inline" defaultValue={defaultValue} />
            </Boundary>,
        );
        await act(async () => {
            await loadProfile('inline').catch(() => undefined);
        });

        expect(first.container.textContent).toBe('failed');

        first.unmount();
        const ref = createRef<EditorHandle<object>>();
        render(<RichTextEditor aria-label="Title" profile="inline" defaultValue={defaultValue} ref={ref} />);
        await act(async () => {
            await loadProfile('inline');
        });

        expect(ref.current).not.toBeNull();
        vi.mocked(console.error).mockRestore();
    });
});
