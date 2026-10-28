/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type RefObject } from 'react';

import { type EditorApi, useClientLayoutEffect } from '#/bridge/pluginApi/plugin';

import { surfaceFocused } from './useUploadStatus';

/**
 * Keeps focus on an upload button when the upload's change removes the one that had it, and on the image's first
 * button once the upload completes.
 */
export const useUploadControlFocus = (
    wrapperRef: RefObject<HTMLSpanElement | null>,
    focusedRef: { current: boolean },
    running: boolean,
    focus: EditorApi['focus'] | undefined,
    surface: EditorApi['surface'] | undefined,
) => {
    useClientLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!focusedRef.current || wrapper === null || wrapper.contains(wrapper.ownerDocument.activeElement)) {
            return;
        }

        const next = wrapper.querySelector<HTMLElement>('button');
        if (next === null) {
            focusedRef.current = false;
            focus?.();

            return;
        }

        next.focus();
    }, [running, focus]);
    useClientLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        let toolbar: HTMLElement | null = null;
        if (wrapper !== null) {
            toolbar = wrapper.closest<HTMLElement>('[data-rte-node-chrome]');
        }

        return () => {
            if (!focusedRef.current) {
                return;
            }

            focus?.();
            // A completed upload leaves the image and its toolbar, whose first button then takes focus; a removed
            // image takes its toolbar along, which leaves focus on the surface.
            queueMicrotask(() => {
                if (toolbar === null || !toolbar.isConnected || !surfaceFocused(surface)) {
                    return;
                }

                const next = toolbar.querySelector<HTMLElement>('button');
                if (next !== null && !wrapper?.contains(next)) {
                    next.focus();
                }
            });
        };
    }, [focus, surface]);
    const onBlur = (event: FocusEvent<HTMLSpanElement>) => {
        const { target } = event;
        // A button that leaves the DOM blurs too, which is no move of the author's.
        queueMicrotask(() => {
            if (target.isConnected && !wrapperRef.current?.contains(target.ownerDocument.activeElement)) {
                focusedRef.current = false;
            }
        });
    };

    return onBlur;
};
