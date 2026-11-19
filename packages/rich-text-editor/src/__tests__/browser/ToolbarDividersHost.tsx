/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by toolbarDividers.ct.tsx.

import { type ReactNode } from 'react';

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
import { PANEL_LABEL, TEXT_ONLY_DOCUMENT } from './toolbarDividersValues';

// A group drawn after the table's own, so the table's group sits between two others.
const panelPlugin = () =>
    definePlugin({
        id: 'panel',
        toolbarGroup: 'panels',
        toolbar: [
            { label: PANEL_LABEL, render: () => <button type="button">{PANEL_LABEL}</button>, floating: 'inline' },
        ],
    });

const PLUGINS = [
    boldPlugin(),
    italicPlugin(),
    underlinePlugin(),
    linkPlugin(),
    bulletListPlugin(),
    numberedListPlugin(),
    tablePlugin(),
];

const PLUGINS_WITH_PANEL = [...PLUGINS, panelPlugin()];

type ToolbarDividersHostProps = {
    placement: NonNullable<RichTextEditorProps['toolbarPlacement']>;
    /** Adds a group after the table's, which draws something wherever the table's does not. */
    withPanel?: boolean;
    /** Shows a document with no table instead, as a host pushing a new value would. */
    withoutTable?: boolean;
    /** The width of the editor in pixels, so the toolbar can be made to overflow. */
    width?: number;
};

/** The editor with the formatting plugins and the table, over a paragraph and a table. */
export const ToolbarDividersHost = ({
    placement,
    withPanel = false,
    withoutTable = false,
    width,
}: ToolbarDividersHostProps): ReactNode => {
    let plugins = PLUGINS;
    if (withPanel) {
        plugins = PLUGINS_WITH_PANEL;
    }
    let value = TABLE_DOCUMENT;
    if (withoutTable) {
        value = TEXT_ONLY_DOCUMENT;
    }

    return (
        <div style={{ width }}>
            <RichTextEditor value={value} plugins={plugins} toolbarPlacement={placement} />
        </div>
    );
};
