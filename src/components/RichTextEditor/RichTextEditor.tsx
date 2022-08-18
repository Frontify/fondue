/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Plate, TNode } from '@udecode/plate';
import { debounce } from '@utilities/debounce';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { Toolbar } from './components/Toolbar/Toolbar';
import { RichTextEditorContext } from './context/DesignTokensContext';
import { useEditorState } from './hooks/useEditorState';
import { DesignTokens, Position } from './types';
import { EditorActions } from './utils/actions';
import { ON_SAVE_DELAY_IN_MS } from './utils';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { getEditorConfig } from './utils/editorConfig';
import { parseRawValue } from './utils/parseRawValue';
import { TextStyles } from './utils/textStyles';

import { ToolbarPositioningComponent } from './Abstract';

export type RichTextEditorProps = {
    id?: string;
    placeholder?: string;
    value?: string;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    readonly?: boolean;
    clear?: boolean;
    designTokens?: DesignTokens;
    actions?: EditorActions[][];
    position?: Position;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({
    id,
    value: initialValue,
    placeholder = '',
    readonly = false,
    clear = false,
    designTokens = defaultDesignTokens,
    actions = [],
    onTextChange,
    onBlur,
    position = Position.FLOATING,
}) => {
    const editorId = useMemoizedId(id);
    const { localValue } = useEditorState(editorId, clear);

    const [editorWidth, setEditorWidth] = useState<number | undefined>();
    const editableProps: EditableProps = {
        placeholder,
        readOnly: readonly,
        onBlur: () => onBlur && onBlur(JSON.stringify(localValue.current)),
    };

    const editorRef = useCallback((node) => {
        if (!node) {
            return;
        }
        const observer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                /* setTimeout is required to prevent error "ResizeObserver loop limit exceeded"
                    from being thrown during cypress component tests */
                setTimeout(() => setEditorWidth(entries[0].target.clientWidth), 0);
            }
        });

        observer.observe(node);
        return observer;
    }, []);

    useEffect(() => {
        for (const element of Object.values(TextStyles).filter(
            (textStyle) => textStyle !== TextStyles.ELEMENT_PARAGRAPH,
        )) {
            if (!designTokens[element]) {
                designTokens[element] = defaultDesignTokens[element];
            }
        }
    }, [designTokens]);

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

    const ToolbarPositioning = ToolbarPositioningComponent[position];

    return (
        <RichTextEditorContext.Provider value={{ designTokens, ToolbarPositioning }}>
            <ToolbarPositioning.PlateWrapper ref={editorRef}>
                <Plate
                    id={editorId}
                    initialValue={parseRawValue(initialValue)}
                    onChange={onChange}
                    editableProps={editableProps}
                    plugins={getEditorConfig()}
                >
                    <Toolbar editorId={editorId} actions={actions} editorWidth={editorWidth} />
                </Plate>
            </ToolbarPositioning.PlateWrapper>
        </RichTextEditorContext.Provider>
    );
};
