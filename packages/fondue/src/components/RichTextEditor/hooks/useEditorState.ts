/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useMemo, useRef } from 'react';

import { useDebounce } from '@hooks/useDebounce';

import { GeneratePlugins, type PluginComposer } from '../Plugins';
import { type TreeOfNodes } from '../types';
import { ON_SAVE_DELAY_IN_MS, parseRawValue } from '../utils';

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

    const _onChange = useCallback(
        (value: TreeOfNodes) => {
            onTextChange && onTextChange(JSON.stringify(value));
        },
        [onTextChange],
    );

    const debouncedOnChange = useDebounce(_onChange, ON_SAVE_DELAY_IN_MS);

    const onChange = useCallback(
        (value: TreeOfNodes) => {
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

    const config = useMemo(() => GeneratePlugins(editorId, plugins), [editorId, plugins]);

    return { localValue, onChange, memoizedValue, config };
};
