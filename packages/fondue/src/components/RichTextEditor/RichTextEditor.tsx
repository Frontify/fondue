/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, useCallback, useMemo } from 'react';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { Plate, PlateContent, TEditableProps } from '@udecode/plate-core';
import { ContentReplacement } from './ContentReplacement';
import { RichTextEditorProvider } from './context/RichTextEditorContext';
import { Position } from './components/EditorPositioningWrapper';
import { forceToFocusNextElement } from './helpers';
import { useEditorState } from './hooks';
import { GAP_DEFAULT, KEY_ELEMENT_BREAK_AFTER_COLUMN, PluginComposer, defaultPlugins } from './Plugins';
import { PaddingSizes, TreeOfNodes } from './types';
import { parseRawValue } from './utils';
import { BlurObserver } from '@components/RichTextEditor/BlurObserver';
import noop from 'lodash-es/noop';

const PLACEHOLDER_STYLES: CSSProperties = {
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
    hideExternalFloatingModals?: (editorId: string) => void;
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

    const renderPlaceholder: TEditableProps['renderPlaceholder'] = useCallback(({ children, attributes }) => {
        const mergedAttributes = {
            ...attributes,
            style: {
                ...attributes.style,
                ...PLACEHOLDER_STYLES,
            },
        };
        return <span {...mergedAttributes}>{children}</span>;
    }, []);

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

    const onKeyDownHandler = useCallback((event) => {
        if (event.code === 'Tab') {
            forceToFocusNextElement(event, !event.shiftKey);
        }
    }, []);

    const editableProps: TEditableProps = {
        placeholder,
        renderPlaceholder,
        readOnly: readonly,
        onBlur: onBlurHandler,
        className: `${padding}`,
        style,
        onKeyDown: onKeyDownHandler,
        scrollSelectionIntoView: noop,
    };

    const providerValues = useMemo(
        () => ({ styles: config.styles(), position, border, editorId }),
        [border, config, editorId, position],
    );

    const platePlugins = useMemo(() => config.create(), [config]);

    return (
        <RichTextEditorProvider value={providerValues}>
            <Plate id={editorId} onChange={onChange} plugins={platePlugins} initialValue={memoizedValue}>
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
