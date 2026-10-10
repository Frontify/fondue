/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { type ShippedCommands } from '#/runtime/types';

import { type EditorHandle } from './types';

/** The handle of the editor around the caller once its session is ready, else `null` (SPEC-rich-text-react/AC-048). */
export const useEditorHandle = <C extends object = ShippedCommands>(): EditorHandle<C> | null => {
    const runtime = useContext(SessionContext);
    if (runtime === undefined) {
        return null;
    }
    return runtime.handle as unknown as EditorHandle<C>;
};
