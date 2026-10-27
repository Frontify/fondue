/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createEmptyDocument } from '#/model';
import { inlineModel } from '#/plugins';

import * as inlineProfile from '../profiles/inline';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import { type EditorHandle } from '../types';

vi.mock('../profiles/inline', async (importOriginal) => {
    const actual = await importOriginal<typeof inlineProfile>();

    return { ...actual, shipped: vi.fn(actual.shipped) };
});

describe('an editor whose profile module fails to load', () => {
    it('shows a retry shell in place, reports one diagnostic and mounts the editor after Retry', async () => {
        const failure = new TypeError('secret chunk url');
        vi.mocked(inlineProfile.shipped).mockImplementationOnce(() => {
            throw failure;
        });
        const onDiagnostic = vi.fn();
        const ref = createRef<EditorHandle<object>>();
        const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(inlineModel) };
        const { container } = render(
            <div>
                <p>sibling</p>
                <RichTextEditor
                    aria-label="Title"
                    profile="inline"
                    defaultValue={defaultValue}
                    onDiagnostic={onDiagnostic}
                    ref={ref}
                />
            </div>,
        );
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
        });

        expect(screen.getByText('sibling')).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
        expect(ref.current).toBeNull();
        expect(onDiagnostic).toHaveBeenCalledTimes(1);
        expect(onDiagnostic.mock.calls[0]?.[0]).toMatchObject({
            code: 'react.profile-load-failed',
            severity: 'error',
            details: { profile: 'inline', name: 'TypeError' },
        });
        expect(JSON.stringify(onDiagnostic.mock.calls[0]?.[0])).not.toContain('secret');

        screen.getByRole('button', { name: 'Retry' }).focus();
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
        });

        expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
        expect(container.querySelector('[data-rte-shell]')).toBeNull();
        expect(ref.current).not.toBeNull();
        expect(container.querySelector('[data-rte-surface]')).toBe(document.activeElement);
        expect(onDiagnostic).toHaveBeenCalledTimes(1);
    });
});
