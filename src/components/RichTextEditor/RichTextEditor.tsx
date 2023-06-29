/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Plate, TEditableProps } from '@udecode/plate';
import React from 'react';
import { RenderPlaceholderProps } from 'slate-react';
import { ContentReplacement } from './ContentReplacement';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { Position } from './EditorPositioningWrapper';
import { forceToFocusNextElement } from './helpers';
import { useEditorState } from './hooks';
import { GAP_DEFAULT, KEY_ELEMENT_BREAK_AFTER_COLUMN, PluginComposer, defaultPlugins } from './Plugins';
import { PaddingSizes, TreeOfNodes } from './types';
import { parseRawValue } from './utils';

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
    padding?: PaddingSizes;
    position?: Position;
    plugins?: PluginComposer;
    onValueChanged?: (value: TreeOfNodes | null) => void;
    border?: boolean;
    updateValueOnChange?: boolean; // Only set to true when you are sure that performance isn't an issue
    toolbarWidth?: number;
};

export const RichTextEditor = ({
    id,
    value,
    placeholder = '',
    readonly = false,
    onTextChange,
    onBlur,
    padding = PaddingSizes.None,
    position = Position.FLOATING,
    plugins = defaultPlugins,
    updateValueOnChange = false,
    onValueChanged,
    border = true,
    toolbarWidth,
}: RichTextEditorProps) => {
    const editorId = useMemoizedId(id);
    const { localValue, onChange, memoizedValue, config } = useEditorState({
        editorId,
        initialValue: value,
        onTextChange,
        plugins,
        onValueChanged,
    });

    const breakAfterPlugin = plugins.plugins.find((plugin) => plugin.key === KEY_ELEMENT_BREAK_AFTER_COLUMN);
    const columns = breakAfterPlugin?.options?.columns ?? 1;
    const columnGap = breakAfterPlugin?.options?.gap ?? GAP_DEFAULT;

    const editableProps: TEditableProps = {
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
        className: `${padding}`,
        style: {
            columns,
            columnGap,
        },
        onKeyDown: (event) => {
            if (event.code === 'Tab') {
                forceToFocusNextElement(event, !event.shiftKey);
            }
        },
        scrollSelectionIntoView: () => {
            // We pass in an empty function here because we don't want the default scroll behaviour
        },
    };

    return (
        <RichTextEditorProvider
            value={{
                styles: config.styles(),
                position,
                border,
            }}
        >
            <Plate
                id={editorId}
                onChange={onChange}
                editableProps={editableProps}
                plugins={config.create()}
                initialValue={memoizedValue}
            >
                {!editableProps.readOnly && config.toolbar(toolbarWidth)}
                {config.inline()}
                {updateValueOnChange && <ContentReplacement value={parseRawValue({ editorId, raw: value, plugins })} />}
            </Plate>
        </RichTextEditorProvider>
    );
};
RichTextEditor.displayName = 'FondueRichTextEditor';
