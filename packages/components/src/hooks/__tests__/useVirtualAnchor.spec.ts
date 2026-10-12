/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useVirtualAnchorFocus } from '../useVirtualAnchor';

const createCloseEvent = () => new Event('focusScope.autoFocusOnUnmount', { cancelable: true });

describe('useVirtualAnchorFocus', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should keep the saved element through a close that leaves focus in place, as Strict Mode does', () => {
        const input = document.createElement('input');
        const overlayButton = document.createElement('button');
        document.body.append(input, overlayButton);
        input.focus();
        const { result } = renderHook(() => useVirtualAnchorFocus(true));

        result.current.onOpenAutoFocus();
        overlayButton.focus();
        result.current.onCloseAutoFocus(createCloseEvent());
        expect(document.activeElement).toBe(overlayButton);

        overlayButton.blur();
        result.current.onCloseAutoFocus(createCloseEvent());
        expect(document.activeElement).toBe(input);
    });
});
