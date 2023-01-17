/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useMemo, useRef } from 'react';
import { debounce } from '@utilities/debounce';
import { ON_SAVE_DELAY_IN_MS, parseRawValue } from '../utils';
import { PluginComposer } from '../Plugins';
import { TreeOfNodes } from '../types';

type useEditorStateProps = {
    editorId: string;
    onTextChange: ((value: string) => void) | undefined;
    plugins?: PluginComposer;
    initialValue?: string;
};

export const useEditorState = ({ editorId, onTextChange, initialValue, plugins }: useEditorStateProps) => {
    const localValue = useRef<TreeOfNodes | null>(null);

    const debouncedOnChange = debounce((value: TreeOfNodes) => {
        onTextChange && onTextChange(JSON.stringify(value));
    }, ON_SAVE_DELAY_IN_MS);

    const onChange = useCallback(
        (value) => {
            debouncedOnChange(value);
            localValue.current = value;
        },
        [debouncedOnChange, localValue],
    );

    const memoizedValue = useMemo(
        () => parseRawValue({ editorId, raw: initialValue, plugins }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [editorId],
    );

    return { localValue, onChange, memoizedValue };
};
