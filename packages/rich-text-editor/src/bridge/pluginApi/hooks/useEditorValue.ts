/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { useSessionValue } from '../../session/hooks/useSessionValue';
import { type EditorApi } from '../apiFacets';
import { EditorHostsContext } from '../helpers/editorHostsContext';
import { editorApiOf } from '../liveApi';

/** A value read through the editor API, which rerenders the caller only when `isEqual` finds it changed. */
export const useEditorValue = <T>(
    read: (api: EditorApi | undefined) => T,
    isEqual: (previous: T, next: T) => boolean = Object.is,
): T => {
    const hosts = useContext(EditorHostsContext);

    return useSessionValue((runtime) => {
        if (runtime === undefined || hosts === null) {
            return read(undefined);
        }

        return read(editorApiOf(runtime, hosts));
    }, isEqual);
};
