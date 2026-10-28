/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createEmptyDocument } from '#/model';
import { PROFILE_MODELS } from '#/react/examples/records';
import { typeText } from '#/testing';

import { mountProfile } from './fixtures/profiles';

describe('submit and replace', () => {
    it('calls onSubmit then leaves an empty inline field showing its placeholder', async () => {
        const onSubmit = vi.fn();
        const mounted = await mountProfile('inline', { onSubmit, placeholder: 'Write here' });
        act(() => typeText(mounted.handle, 'Hello'));
        const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        let prevented: boolean | undefined;
        document.addEventListener(
            'keydown',
            (heard) => {
                prevented = heard.defaultPrevented;
            },
            { once: true },
        );
        act(() => {
            mounted.view.dom.dispatchEvent(event);
        });
        expect(prevented).toBe(true);
        expect(onSubmit).toHaveBeenCalledTimes(1);
        await act(async () => {
            const { stamp } = mounted.handle.getSnapshot();
            await mounted.handle.replaceDocument({
                expected: stamp,
                next: {
                    documentId: 'document-1',
                    revision: null,
                    document: createEmptyDocument(PROFILE_MODELS.inline),
                },
                unsaved: { action: 'discard', confirmed: true },
                selection: 'start',
                history: 'reset',
            });
        });
        expect(mounted.view.dom.getAttribute('data-rte-empty')).toBe('');
        expect(mounted.view.dom).toHaveAttribute('data-placeholder', 'Write here');
    });
});
