/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useMemo, useRef } from 'react';
import { debounce } from '@utilities/debounce';
import { ON_SAVE_DELAY_IN_MS, parseRawValue } from '../utils';
import { GeneratePlugins, PluginComposer } from '../Plugins';
import { TreeOfNodes } from '../types';

type useEditorStateProps = {
    editorId: string;
    plugins: PluginComposer;
    initialValue?: string;
    onTextChange?: (value: string) => void;
    onValueChanged?: (value: TreeOfNodes | null) => void;
};

export const useEditorState = ({
    editorId,
    initialValue,
    plugins,
    onTextChange,
    onValueChanged,
}: useEditorStateProps) => {
    const localValue = useRef<TreeOfNodes | null>(null);

    const debouncedOnChange = debounce((value: TreeOfNodes) => {
        onTextChange && onTextChange(JSON.stringify(value));
    }, ON_SAVE_DELAY_IN_MS);

    const onChange = useCallback(
        (value) => {
            debouncedOnChange(value);
            localValue.current = value;
            onValueChanged && onValueChanged(value);
        },
        [debouncedOnChange, localValue, onValueChanged],
    );

    const memoizedValue = useMemo(
        () => parseRawValue({ editorId, raw: initialValue, plugins }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [editorId],
    );

    const config = GeneratePlugins(editorId, plugins);

    return { localValue, onChange, memoizedValue, config };
};
