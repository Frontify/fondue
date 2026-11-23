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
    underlinePlugin,
} from '../../plugins';

import { BLANK_LABEL, type BlankAt, PANEL_LABEL, PARAGRAPH_DOCUMENT } from './toolbarDividersValues';

/** A group drawn after the blank control's, so a blank group in the middle sits between two others. */
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

/** The blank control in the toolbar's first group, before the formatting groups. */
const BLANK_FIRST_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin(RTE_TOOLBAR_GROUPS[0]), panelPlugin()];

/** The blank control in a group between the formatting groups and the panel. */
const BLANK_MIDDLE_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin('insert'), panelPlugin()];

/** The blank control in the last group of the toolbar. */
const BLANK_LAST_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin('insert')];

/** The blank control in the lists group, beside the list plugins that draw. */
const BLANK_BESIDE_PLUGINS = [...FORMATTING_PLUGINS, blankPlugin('lists')];

type ToolbarDividersHostProps = {
    placement: NonNullable<RichTextEditorProps['toolbarPlacement']>;
    blankAt: BlankAt;
    /** Whether the blank control draws a button or nothing. */
    blankDraws: boolean;
};

const pluginsFor = (blankAt: BlankAt) => {
    switch (blankAt) {
        case 'first': {
            return BLANK_FIRST_PLUGINS;
        }
        case 'middle': {
            return BLANK_MIDDLE_PLUGINS;
        }
        case 'last': {
            return BLANK_LAST_PLUGINS;
        }
        case 'beside': {
            return BLANK_BESIDE_PLUGINS;
        }
    }
};

/** The editor over a paragraph, with the formatting plugins and a control the host can make draw nothing. */
export const ToolbarDividersHost = ({ placement, blankAt, blankDraws }: ToolbarDividersHostProps): ReactNode => (
    <BlankDrawsContext.Provider value={blankDraws}>
        <RichTextEditor value={PARAGRAPH_DOCUMENT} plugins={pluginsFor(blankAt)} toolbarPlacement={placement} />
    </BlankDrawsContext.Provider>
);
