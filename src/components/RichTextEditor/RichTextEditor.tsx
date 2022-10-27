/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useCallback, useEffect } from 'react';
import { Plate, TNode } from '@udecode/plate';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { debounce } from '@utilities/debounce';
import { EditableProps, RenderPlaceholderProps } from 'slate-react/dist/components/editable';
import { Toolbar } from './components/Toolbar/Toolbar';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { useEditorState } from './hooks';
import { DesignTokens, PaddingSizes } from './types';
import { EditorActions, defaultActions } from './utils/actions';
import { ON_SAVE_DELAY_IN_MS } from './utils';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { parseRawValue } from './utils/parseRawValue';
import { TextStyles } from './Plugins/TextStylePlugin/TextStyles';
import { Position } from './EditorPositioningWrapper';
import { getEditorConfig } from './utils/editorConfig';
import { GeneratePlugins, PluginComposer, defaultPlugins } from './Plugins';
import { forceTabOutOfActiveElement } from './helpers';

const PLACEHOLDER_STYLES: RenderPlaceholderProps['attributes']['style'] = {
    position: 'relative',
    height: '0',
};

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
    plugins = defaultPlugins,
}) => {
    const editorId = useMemoizedId(id);
    const { localValue } = useEditorState(editorId, clear);

    const editableProps: EditableProps = {
        placeholder,
        renderPlaceholder: ({ children, attributes }) => {
            const mergedAttributes = {
                ...attributes,
                style: {
                    ...attributes.style,
                    ...PLACEHOLDER_STYLES,
                },
            };
            return <span {...mergedAttributes}>{children}</span>;
        },
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

    const config = GeneratePlugins(editorId, plugins);
    const isNew = !!config && actions.length === 0;
    const editorConfig = isNew ? config.Create() : getEditorConfig();

    return (
        <RichTextEditorProvider value={{ designTokens, position }}>
            <Plate
                id={editorId}
                initialValue={parseRawValue({ editorId, raw: initialValue })}
                onChange={onChange}
                editableProps={editableProps}
                plugins={editorConfig}
            >
                {isNew && config.Toolbar()}
                {isNew && config.Inline()}
                {!isNew && <Toolbar editorId={editorId} actions={actions} />}
            </Plate>
        </RichTextEditorProvider>
    );
};
