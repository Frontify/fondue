/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { SessionContext } from '../../session/helpers/sessionContext';
import { type EditorApi } from '../apiFacets';
import { EditorHostsContext } from '../helpers/editorHostsContext';
import { editorApiOf } from '../liveApi';

/**
 * The API of the editor around the caller, or `undefined` until its session is ready. Plugin UI acts through it;
 * `useEditorHandle` is the host's own handle, which a plugin does not use.
 */
export const useEditorApi = (): EditorApi | undefined => {
    const runtime = useContext(SessionContext);
    const hosts = useContext(EditorHostsContext);
    if (runtime === undefined || hosts === null) {
        return undefined;
    }

    return editorApiOf(runtime, hosts);
};
