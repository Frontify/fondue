/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment jsdom

import { act, render, screen, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// The globals a consumer's jsdom may lack, which the editor must not need to mount (CL-4397).
const MISSING = ['ClipboardEvent', 'DataTransfer', 'InputEvent'] as const;
const saved = new Map<string, PropertyDescriptor>();

beforeAll(() => {
    // `@frontify/fondue-components` subclasses ResizeObserver at import, so a consumer's jsdom setup already defines one.
    if (typeof ResizeObserver === 'undefined') {
        vi.stubGlobal(
            'ResizeObserver',
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
    }

    for (const name of MISSING) {
        const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);
        if (descriptor !== undefined) {
            saved.set(name, descriptor);
        }

        Reflect.deleteProperty(globalThis, name);
    }
});
afterAll(() => {
    vi.unstubAllGlobals();
    for (const [name, descriptor] of saved) {
        Object.defineProperty(globalThis, name, descriptor);
    }
});

describe('a consumer test in jsdom', () => {
    it('imports the package entry and mounts the Comment profile with no ClipboardEvent, DataTransfer or InputEvent', async () => {
        expect(MISSING.map((name) => typeof Reflect.get(globalThis, name))).toEqual([
            'undefined',
            'undefined',
            'undefined',
        ]);
        vi.resetModules();
        const { RichTextEditor } = await import('#/index');
        const { commentModel } = await import('#/plugins');
        const { createEmptyDocument } = await import('#/model');
        const { loadProfile } = await import('#/react/profiles');

        render(
            <RichTextEditor
                aria-label="Comment"
                profile="comment"
                defaultValue={{ documentId: 'comment-1', revision: null, document: createEmptyDocument(commentModel) }}
            />,
        );
        await act(async () => {
            await loadProfile('comment');
        });

        await waitFor(() =>
            expect(screen.getByRole('textbox', { name: 'Comment' })).toHaveAttribute('contenteditable', 'true'),
        );
    }, 60_000);
});
