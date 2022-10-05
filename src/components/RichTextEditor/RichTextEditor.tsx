/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useCallback, useEffect } from 'react';
import { Plate, TNode } from '@udecode/plate';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { debounce } from '@utilities/debounce';
import { EditableProps } from 'slate-react/dist/components/editable';
import { Toolbar } from './components/Toolbar/Toolbar';
import { RichTextEditorContext } from './context/RichTextEditorContext';
import { useEditorResize, useEditorState } from './hooks';
import { DesignTokens, PaddingSizes } from './types';
import { EditorActions, defaultActions } from './utils/actions';
import { ON_SAVE_DELAY_IN_MS } from './utils';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { parseRawValue } from './utils/parseRawValue';
import { TextStyles } from './EditorActions/Plugins/TextStylePlugin/TextStyles';
import { EditorPositioningWrapper } from './EditorPositioningWrapper';
import { Position } from './EditorPositioningWrapper';
import { getEditorConfig } from './utils/editorConfig';
import { GeneratePlugins, PluginComposer } from './EditorActions';
import { forceTabOutOfActiveElement } from './helper';

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
    padding?: PaddingSizes;
    position?: Position;
    plugins?: PluginComposer;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({
    id,
    value: initialValue,
    placeholder = '',
    readonly = false,
    clear = false,
    designTokens = defaultDesignTokens,
    actions = defaultActions,
    onTextChange,
    onBlur,
    padding = PaddingSizes.None,
    position = Position.FLOATING,
    plugins,
}) => {
    const editorId = useMemoizedId(id);
    const { localValue } = useEditorState(editorId, clear);
    const { editorRef, editorWidth } = useEditorResize();

    const editableProps: EditableProps = {
        placeholder,
        readOnly: readonly,
        onBlur: () => onBlur && onBlur(JSON.stringify(localValue.current)),
        className: padding,
        onKeyDown: (event) => {
            if (event.code === 'Tab') {
                // Forcing a blur event because of accessibility
                forceTabOutOfActiveElement();
            }
        },
    };

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

    const PositioningWrapper = EditorPositioningWrapper[position];

    const config = GeneratePlugins(editorId, plugins);
    const isNew = !!config && actions.length === 0 && !!plugins;
    const editorConfig = isNew ? config.create() : getEditorConfig();

    return (
        <RichTextEditorContext.Provider value={{ designTokens, PositioningWrapper }}>
            <PositioningWrapper.PlateWrapper ref={editorRef}>
                <Plate
                    id={editorId}
                    initialValue={parseRawValue(initialValue)}
                    onChange={onChange}
                    editableProps={editableProps}
                    plugins={editorConfig}
                >
                    {isNew && config.toolbar(editorWidth)}
                    {isNew && config.inline()}
                    {!isNew && <Toolbar editorId={editorId} actions={actions} editorWidth={editorWidth} />}
                </Plate>
            </PositioningWrapper.PlateWrapper>
        </RichTextEditorContext.Provider>
    );
};
