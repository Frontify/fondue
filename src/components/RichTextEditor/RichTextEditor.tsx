/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Plate } from '@udecode/plate';
import React, { KeyboardEvent } from 'react';
import { EditableProps, RenderPlaceholderProps } from 'slate-react/dist/components/editable';
import { ContentReplacement } from './ContentReplacement';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { Position } from './EditorPositioningWrapper';
import { forceToBlurActiveElement } from './helpers';
import { useEditorState } from './hooks';
import { KEY_ELEMENT_BREAK_AFTER, PluginComposer, defaultPlugins } from './Plugins';
import { DesignTokens, PaddingSizes, TreeOfNodes } from './types';
import { parseRawValue } from './utils';
import { defaultDesignTokens } from './utils/defaultDesignTokens';

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
    padding?: PaddingSizes;
    position?: Position;
    plugins?: PluginComposer;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>, value: TreeOfNodes | null) => void;
    onValueChanged?: (value: TreeOfNodes | null) => void;
    border?: boolean;
    updateValueOnChange?: boolean; // Only set to true when you are sure that performance isn't an issue
};

export const RichTextEditor = ({
    id,
    value,
    placeholder = '',
    readonly = false,
    designTokens = defaultDesignTokens,
    onTextChange,
    onBlur,
    padding = PaddingSizes.None,
    position = Position.FLOATING,
    plugins = defaultPlugins,
    updateValueOnChange = false,
    onKeyDown,
    onValueChanged,
    border = true,
}: RichTextEditorProps) => {
    const editorId = useMemoizedId(id);
    const { localValue, onChange, memoizedValue, config } = useEditorState({
        editorId,
        initialValue: value,
        onTextChange,
        plugins,
        onValueChanged,
    });

    const breakAfterPlugin = plugins.plugins.find((plugin) => plugin.key === KEY_ELEMENT_BREAK_AFTER);
    const columns = breakAfterPlugin?.options?.columns ?? 1;
    const columnGap = breakAfterPlugin?.options?.gap ?? 0;

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
        className: `${padding}`,
        style: {
            columns,
            columnGap,
        },
        onKeyDown: (event) => {
            if (event.code === 'Tab') {
                // Forcing a blur event because of accessibility
                forceToBlurActiveElement();
            }

            onKeyDown && onKeyDown(event, localValue.current);
        },
    };

    return (
        <RichTextEditorProvider
            value={{
                designTokens,
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
                {config.toolbar()}
                {config.inline()}
                {updateValueOnChange && <ContentReplacement value={parseRawValue({ editorId, raw: value, plugins })} />}
            </Plate>
        </RichTextEditorProvider>
    );
};
