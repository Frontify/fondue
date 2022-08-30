/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { MentionCombobox, Plate, TNode, usePlateEditorState } from '@udecode/plate';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { debounce } from '@utilities/debounce';
import { EditableProps } from 'slate-react/dist/components/editable';
import { Toolbar } from './components/Toolbar/Toolbar';
import { DesignTokensContext } from './context/DesignTokensContext';
import { DesignTokens } from './types';
import { EditorActions } from './utils/actions';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { getEditorConfig } from './utils/editorConfig';
import { EMPTY_RICH_TEXT_VALUE, parseRawValue } from './utils/parseRawValue';
import { TextStyles } from './utils/textStyles';
import { mentionable } from './utils/exampleValues';

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
};

export const ON_SAVE_DELAY_IN_MS = 500;

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
}) => {
    const editorId = id || useMemoizedId();
    const editor = usePlateEditorState(editorId);

    const [editorWidth, setEditorWidth] = useState<number | undefined>();
    const localValue = useRef<TNode[] | null>(null);
    const [debouncedValue, setDebouncedValue] = useState<TNode[] | null>(null);
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

    useEffect(() => {
        debouncedValue && onTextChange && onTextChange(JSON.stringify(debouncedValue));
    }, [debouncedValue]);

    useEffect(() => {
        if (clear && editor) {
            const point = { path: [0, 0], offset: 0 };
            editor.selection = { anchor: point, focus: point };
            editor.history = { redos: [], undos: [] };
            editor.children = EMPTY_RICH_TEXT_VALUE;
            localValue.current = EMPTY_RICH_TEXT_VALUE;
        }
    }, [clear]);

    const debouncedOnChange = useCallback(
        debounce((value: TNode[]) => {
            setDebouncedValue(value);
        }, ON_SAVE_DELAY_IN_MS),
        [],
    );

    const onChange = useCallback((value) => {
        debouncedOnChange(value);
        localValue.current = value;
    }, []);

    return (
        <DesignTokensContext.Provider value={{ designTokens }}>
            <div data-test-id="rich-text-editor" className="tw-relative tw-w-full" ref={editorRef}>
                <Plate
                    id={editorId}
                    initialValue={parseRawValue(initialValue)}
                    onChange={onChange}
                    editableProps={editableProps}
                    plugins={getEditorConfig()}
                >
                    <Toolbar editorId={editorId} actions={actions} editorWidth={editorWidth} />
                    <MentionCombobox items={mentionable} />
                </Plate>
            </div>
        </DesignTokensContext.Provider>
    );
};
