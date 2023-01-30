/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { KeyboardEvent, useRef } from 'react';
import { Plate } from '@udecode/plate';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { EditableProps, RenderPlaceholderProps } from 'slate-react/dist/components/editable';
import { useEditorState } from './hooks';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { DesignTokens, PaddingSizes, TreeOfNodes } from './types';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { Position } from './EditorPositioningWrapper';
import { PluginComposer, defaultPlugins } from './Plugins';
import { forceToBlurActiveElement } from './helpers';
import { parseRawValue } from './utils';
import { ContentReplacement } from './ContentReplacement';

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
    columns?: number;
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
    columns = 1,
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

    const editableProps = useRef<EditableProps>({
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
                forceToBlurActiveElement();
            }

            onKeyDown && onKeyDown(event, localValue.current);
        },
    });
    const style = columns > 1 ? ({ display: 'block', columns } as React.CSSProperties) : {};

    return (
        <RichTextEditorProvider value={{ designTokens, position, style, border }}>
            <Plate
                id={editorId}
                onChange={onChange}
                editableProps={editableProps.current}
                plugins={config.create()}
                initialValue={memoizedValue}
            >
                {config.toolbar()}
                {config.inline()}
                {updateValueOnChange && <ContentReplacement value={parseRawValue({ editorId, raw: value })} />}
            </Plate>
        </RichTextEditorProvider>
    );
};
