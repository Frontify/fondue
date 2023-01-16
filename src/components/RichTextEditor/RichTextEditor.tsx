/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Plate } from '@udecode/plate';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { EditableProps, RenderPlaceholderProps } from 'slate-react/dist/components/editable';
import { useEditorState } from './hooks';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { DesignTokens, PaddingSizes } from './types';
import { defaultDesignTokens } from './utils/defaultDesignTokens';
import { Position } from './EditorPositioningWrapper';
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
    padding?: PaddingSizes;
    position?: Position;
    plugins?: PluginComposer;
    columns?: number;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({
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
    columns = 1,
}) => {
    const editorId = useMemoizedId(id);
    const { localValue, onChange, memoizedValue } = useEditorState({ editorId, initialValue, onTextChange });

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
    const style = columns > 1 ? ({ display: 'block', columns } as React.CSSProperties) : {};

    return (
        <RichTextEditorProvider value={{ designTokens, position, style }}>
            <Plate
                id={editorId}
                initialValue={memoizedValue}
                onChange={onChange}
                editableProps={editableProps}
                plugins={config.create()}
            >
                {config.toolbar()}
                {config.inline()}
            </Plate>
        </RichTextEditorProvider>
    );
};
