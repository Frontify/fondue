/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useRef } from 'react';
import { TNode } from '@udecode/plate';
import { debounce } from '@utilities/debounce';
import { ON_SAVE_DELAY_IN_MS } from '../utils';

type useEditorStateProps = ((value: string) => void) | undefined;

export const useEditorState = (onTextChange: useEditorStateProps) => {
    const localValue = useRef<TNode[] | null>(null);

    const debouncedOnChange = debounce((value: TNode[]) => {
        onTextChange && onTextChange(JSON.stringify(value));
    }, ON_SAVE_DELAY_IN_MS);

    const onChange = useCallback(
        (value: any) => {
            debouncedOnChange(value);
            localValue.current = value;
        },
        [debouncedOnChange, localValue],
    );

    return { localValue, onChange };
};
