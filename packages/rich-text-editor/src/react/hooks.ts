/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { SessionContext } from '#/bridge/session';
import { type ShippedCommands } from '#/runtime/types';

import { type EditorHandle } from './types';

/**
 * The handle of the editor around the caller once its session is ready, else `null`. It is the host's: a plugin's
 * UI uses `useEditorApi`, which adds the editor's hosts: overlays, panels and the live region.
 */
export const useEditorHandle = <C extends object = ShippedCommands>(): EditorHandle<C> | null => {
    const runtime = useContext(SessionContext);
    if (runtime === undefined) {
        return null;
    }
    return runtime.handle as unknown as EditorHandle<C>;
};
