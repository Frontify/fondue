/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Plate, TEditableProps } from '@udecode/plate';
import React from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ReactEditor } from 'slate-react';
import { RenderPlaceholderProps } from 'slate-react/dist/components/editable';
import { ContentReplacement } from './ContentReplacement';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { Position } from './EditorPositioningWrapper';
import { forceToBlurActiveElement } from './helpers';
import { useEditorState } from './hooks';
import { GAP_DEFAULT, KEY_ELEMENT_BREAK_AFTER_COLUMN, PluginComposer, defaultPlugins } from './Plugins';
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

    const breakAfterPlugin = plugins.plugins.find((plugin) => plugin.key === KEY_ELEMENT_BREAK_AFTER_COLUMN);
    const columns = breakAfterPlugin?.options?.columns ?? 1;
    const columnGap = breakAfterPlugin?.options?.gap ?? GAP_DEFAULT;

    const defaultScrollSelectionIntoView = (editor: ReactEditor, domRange: Range) => {
        console.log({ editor });
        console.log('bounding client rect: ', domRange.getBoundingClientRect);

        if (
            domRange.getBoundingClientRect &&
            (!editor.selection || (editor.selection && Range.isCollapsed(editor.selection)))
        ) {
            const leafEl = domRange.startContainer.parentElement!;
            leafEl.getBoundingClientRect = domRange.getBoundingClientRect.bind(domRange);
            scrollIntoView(leafEl, {
                scrollMode: 'if-needed',
            });

            // @ts-expect-error an unorthodox delete D:
            delete leafEl.getBoundingClientRect;
        }
    };

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
                // Forcing a blur event because of accessibility
                forceToBlurActiveElement();
            }
        },
        scrollSelectionIntoView: defaultScrollSelectionIntoView,
    };

    console.log('this is the newest RTE with newest PLATE & SLATE');

    return (
        <>
            <div>HOOOI</div>
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
                    {updateValueOnChange && (
                        <ContentReplacement value={parseRawValue({ editorId, raw: value, plugins })} />
                    )}
                </Plate>
            </RichTextEditorProvider>
        </>
    );
};
RichTextEditor.displayName = 'FondueRichTextEditor';
