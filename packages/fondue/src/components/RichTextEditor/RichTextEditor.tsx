/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plate, PlateContent, type TEditableProps } from '@udecode/plate-core';
import noop from 'lodash-es/noop';
import { type KeyboardEvent, useCallback, useMemo } from 'react';

import { BlurObserver } from '@components/RichTextEditor/BlurObserver';
import { useMemoizedId } from '@hooks/useMemoizedId';

import { ContentReplacement } from './ContentReplacement';
import { GAP_DEFAULT, KEY_ELEMENT_BREAK_AFTER_COLUMN, type PluginComposer, defaultPlugins } from './Plugins';
import { Position } from './components/EditorPositioningWrapper';
import { RenderPlaceholder } from './components/RenderPlaceholder';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { forceToFocusNextElement } from './helpers';
import { useEditorState } from './hooks';
import { PaddingSizes, type TreeOfNodes } from './types';
import { parseRawValue } from './utils';

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
    hideExternalFloatingModals?: (editorId: string) => void;
};

export const RichTextEditor = ({
    id,
    value,
    placeholder = '',
    readonly: readOnly = false,
    onTextChange,
    onBlur,
    padding = PaddingSizes.None,
    position = Position.FLOATING,
    plugins = defaultPlugins,
    updateValueOnChange = false,
    onValueChanged,
    border = true,
    toolbarWidth,
    hideExternalFloatingModals,
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

    const style = useMemo(
        () => ({
            columns,
            columnGap,
            outline: 'none',
        }),
        [columns, columnGap],
    );

    const onBlurHandler = useCallback(() => {
        if (onBlur) {
            onBlur(JSON.stringify(localValue.current));
        }
    }, [onBlur, localValue]);

    const onKeyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Tab') {
            forceToFocusNextElement(event, !event.shiftKey);
        }
    }, []);

    const editableProps: TEditableProps = {
        placeholder,
        renderPlaceholder: RenderPlaceholder,
        readOnly,
        onBlur: onBlurHandler,
        className: `${padding}`,
        style,
        onKeyDown: onKeyDownHandler,
        scrollSelectionIntoView: noop,
    };

    return (
        <RichTextEditorProvider styles={config.styles()} position={position} border={border} editorId={editorId}>
            <Plate id={editorId} onChange={onChange} plugins={config.plugins} initialValue={memoizedValue}>
                <PlateContent {...editableProps} />
                {!editableProps.readOnly && config.toolbar(toolbarWidth)}
                {config.inline()}
                {updateValueOnChange && <ContentReplacement value={parseRawValue({ editorId, raw: value, plugins })} />}
                {position === Position.FLOATING && (
                    <BlurObserver hideExternalFloatingModals={hideExternalFloatingModals} />
                )}
            </Plate>
        </RichTextEditorProvider>
    );
};
RichTextEditor.displayName = 'FondueRichTextEditor';
