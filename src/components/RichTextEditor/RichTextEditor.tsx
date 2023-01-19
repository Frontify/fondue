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
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    onValueChanged?: (value: TreeOfNodes | null) => void;
    border?: boolean;
};

export const RichTextEditor = ({
    id,
    value: initialValue,
    placeholder = '',
    readonly = false,
    designTokens = defaultDesignTokens,
    onTextChange,
    onBlur,
    padding = PaddingSizes.None,
    position = Position.FLOATING,
    plugins = defaultPlugins,
    onKeyDown,
    onValueChanged,
    border = true,
}: RichTextEditorProps) => {
    const editorId = useMemoizedId(id);
    const { localValue, onChange, memoizedValue, config } = useEditorState({
        editorId,
        initialValue,
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

            onKeyDown && onKeyDown(event);
        },
    });

    return (
        <RichTextEditorProvider value={{ designTokens, position, border }}>
            <Plate
                id={editorId}
                initialValue={memoizedValue}
                onChange={onChange}
                editableProps={editableProps.current}
                plugins={config.create()}
            >
                {config.toolbar()}
                {config.inline()}
            </Plate>
        </RichTextEditorProvider>
    );
};
