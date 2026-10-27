/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type MutableRefObject, useImperativeHandle } from 'react';

import { type EditorPort } from '#/runtime/port';

import { type EditorHandle } from '../../types';

/** Gives the host's ref the session's handle. */
export const useSessionHandle = (
    ref: ForwardedRef<EditorHandle<object> | null>,
    live: EditorPort | undefined,
    handleRef: MutableRefObject<EditorHandle<object> | null>,
) => {
    // A blocked document gets no session and so no handle. The ref is the fallback because `live` lags the layout effect.
    useImperativeHandle<EditorHandle<object> | null, EditorHandle<object> | null>(
        ref,
        () => live?.handle ?? handleRef.current,
        [live, handleRef],
    );
};
