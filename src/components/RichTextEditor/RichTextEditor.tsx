/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Plate } from '@udecode/plate';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { EditableProps, RenderPlaceholderProps } from 'slate-react/dist/components/editable';
import { Toolbar } from './components/Toolbar/Toolbar';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { useEditorState } from './hooks';
import { DesignTokens, PaddingSizes } from './types';
import { EditorActions, defaultActions } from './utils/actions';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { parseRawValue } from './utils/parseRawValue';
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
    designTokens = defaultDesignTokens,
    actions = defaultActions,
    onTextChange,
    onBlur,
    padding = PaddingSizes.None,
    position = Position.FLOATING,
    plugins = defaultPlugins,
}) => {
    const editorId = useMemoizedId(id);
    const { localValue, onChange } = useEditorState(onTextChange);

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

    const config = GeneratePlugins(editorId, plugins);
    const isNew = !!config && actions.length === 0;
    const editorConfig = isNew ? config.create() : getEditorConfig();

    return (
        <RichTextEditorProvider value={{ designTokens, position }}>
            <Plate
                id={editorId}
                initialValue={parseRawValue({ editorId, raw: initialValue })}
                onChange={onChange}
                editableProps={editableProps}
                plugins={editorConfig}
            >
                {isNew && config.toolbar()}
                {isNew && config.inline()}
                {!isNew && <Toolbar editorId={editorId} actions={actions} />}
            </Plate>
        </RichTextEditorProvider>
    );
};
