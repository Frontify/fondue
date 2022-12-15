/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useMemo, useRef } from 'react';
import { TNode } from '@udecode/plate';
import { debounce } from '@utilities/debounce';
import { ON_SAVE_DELAY_IN_MS, parseRawValue } from '../utils';

type useEditorStateProps = {
    editorId: string;
    initialValue?: string;
    onTextChange: ((value: string) => void) | undefined;
};

export const useEditorState = ({ editorId, onTextChange, initialValue }: useEditorStateProps) => {
    const localValue = useRef<TNode[] | null>(null);

    const debouncedOnChange = debounce((value: TNode[]) => {
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
        () => parseRawValue({ editorId, raw: initialValue }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [editorId],
    );

    return { localValue, onChange, memoizedValue };
};
