/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by toolbarDividers.ct.tsx.

import { createContext, type ReactNode, useContext } from 'react';

import { RTE_TOOLBAR_GROUPS, type RteToolbarGroup } from '../../core';
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
            {
                label: PANEL_LABEL,
                render: () => <button type="button">{PANEL_LABEL}</button>,
                floating: 'inline',
            },
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

/** A control the host can make draw nothing, in the given group. */
const blankPlugin = (toolbarGroup: RteToolbarGroup) =>
    definePlugin({
        id: 'blank',
        toolbarGroup,
        toolbar: [
            {
                label: BLANK_LABEL,
                render: () => <BlankControl />,
                floating: 'inline',
            },
        ],
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

/** The blank control in a group between the formatting groups and the panel. */
const BLANK_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin('insert'), panelPlugin()];

/** The blank control in the first group of the toolbar, before the formatting groups. */
const BLANK_FIRST_GROUP_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin(RTE_TOOLBAR_GROUPS[0]), panelPlugin()];

type ToolbarDividersHostBaseProps = {
    placement: NonNullable<RichTextEditorProps['toolbarPlacement']>;
};

type TableHostProps = ToolbarDividersHostBaseProps & {
    controls: 'table';
};

type BlankHostProps = ToolbarDividersHostBaseProps & {
    controls: 'blank';
    /** Whether the blank control draws a button or nothing. */
    blankDraws: boolean;
    /**
     * Puts the blank control in the toolbar's first group instead of a middle one.
     * @default false
     */
    blankInFirstGroup?: boolean;
};

type ToolbarDividersHostProps = TableHostProps | BlankHostProps;

/**
 * The editor over a paragraph, with either the formatting plugins and the table over a table document,
 * or the formatting plugins and a control the host can make draw nothing.
 */
export const ToolbarDividersHost = (props: ToolbarDividersHostProps): ReactNode => {
    switch (props.controls) {
        case 'table': {
            return <RichTextEditor value={TABLE_DOCUMENT} plugins={TABLE_PLUGINS} toolbarPlacement={props.placement} />;
        }
        case 'blank': {
            let plugins = BLANK_PLUGINS;
            if (props.blankInFirstGroup) {
                plugins = BLANK_FIRST_GROUP_PLUGINS;
            }

            return (
                <BlankDrawsContext.Provider value={props.blankDraws}>
                    <RichTextEditor value={TEXT_ONLY_DOCUMENT} plugins={plugins} toolbarPlacement={props.placement} />
                </BlankDrawsContext.Provider>
            );
        }
    }
};
