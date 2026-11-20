/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by toolbarDividers.ct.tsx.

import { createContext, type ReactNode, useContext } from 'react';

import { definePlugin, RichTextEditor, type RichTextEditorProps } from '../../index';
import {
    boldPlugin,
    bulletListPlugin,
    italicPlugin,
    linkPlugin,
    numberedListPlugin,
    tablePlugin,
    underlinePlugin,
} from '../../plugins';

import { TABLE_DOCUMENT } from './tableCellValues';
import { BLANK_LABEL, PANEL_LABEL, TEXT_ONLY_DOCUMENT } from './toolbarDividersValues';

/** A group drawn after the table's own, so the table's group sits between two others. */
const panelPlugin = () =>
    definePlugin({
        id: 'panel',
        toolbarGroup: 'panels',
        toolbar: [
            { label: PANEL_LABEL, render: () => <button type="button">{PANEL_LABEL}</button>, floating: 'inline' },
        ],
    });

const BlankDrawsContext = createContext(false);
BlankDrawsContext.displayName = 'BlankDrawsContext';

const BlankControl = (): ReactNode => {
    const draws = useContext(BlankDrawsContext);
    if (!draws) {
        return null;
    }

    return <button type="button">{BLANK_LABEL}</button>;
};

/** A control the host can make draw nothing, in a group between the formatting groups and the panel. */
const blankPlugin = () =>
    definePlugin({
        id: 'blank',
        toolbarGroup: 'insert',
        toolbar: [{ label: BLANK_LABEL, render: () => <BlankControl />, floating: 'inline' }],
    });

const FORMATTING_PLUGINS = [
    boldPlugin(),
    italicPlugin(),
    underlinePlugin(),
    linkPlugin(),
    bulletListPlugin(),
    numberedListPlugin(),
];

const TABLE_PLUGINS = [...FORMATTING_PLUGINS, tablePlugin()];

const TABLE_PLUGINS_WITH_PANEL = [...TABLE_PLUGINS, panelPlugin()];

const BLANK_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin(), panelPlugin()];

type ToolbarDividersHostBaseProps = {
    placement: NonNullable<RichTextEditorProps['toolbarPlacement']>;
    /** The width of the editor in pixels, so the toolbar can be made to overflow. */
    width?: number;
};

type TableHostProps = ToolbarDividersHostBaseProps & {
    controls: 'table';
    /** Adds a group after the table's, which draws something wherever the table's does not. */
    withPanel?: boolean;
};

type BlankHostProps = ToolbarDividersHostBaseProps & {
    controls: 'blank';
    /** Whether the blank control draws a button or nothing. */
    blankDraws: boolean;
};

type ToolbarDividersHostProps = TableHostProps | BlankHostProps;

/**
 * The editor over a paragraph, with either the formatting plugins and the table over a table document,
 * or the formatting plugins and a control the host can make draw nothing.
 */
export const ToolbarDividersHost = (props: ToolbarDividersHostProps): ReactNode => {
    switch (props.controls) {
        case 'table': {
            let plugins = TABLE_PLUGINS;
            if (props.withPanel) {
                plugins = TABLE_PLUGINS_WITH_PANEL;
            }

            return (
                <div style={{ width: props.width }}>
                    <RichTextEditor value={TABLE_DOCUMENT} plugins={plugins} toolbarPlacement={props.placement} />
                </div>
            );
        }
        case 'blank':
            return (
                <BlankDrawsContext.Provider value={props.blankDraws}>
                    <div style={{ width: props.width }}>
                        <RichTextEditor
                            value={TEXT_ONLY_DOCUMENT}
                            plugins={BLANK_PLUGINS}
                            toolbarPlacement={props.placement}
                        />
                    </div>
                </BlankDrawsContext.Provider>
            );
    }
};
