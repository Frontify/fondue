/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by toolbarDividers.ct.tsx.

import { createContext, type ReactNode, useContext } from 'react';

import { RTE_TOOLBAR_GROUPS, type RtePlugin, type RteToolbarGroup } from '../../core';
import { definePlugin, RichTextEditor, type RichTextEditorProps } from '../../index';

import {
    BLANK_LABEL,
    type BlankAt,
    LISTS_FILLER_LABEL,
    MARKS_FILLER_LABEL,
    PANEL_FILLER_LABEL,
    PARAGRAPH_DOCUMENT,
} from './toolbarDividersValues';

/** The group the blank control takes to sit first, before every group that draws. */
const FIRST_GROUP = RTE_TOOLBAR_GROUPS[0];
const MARKS_GROUP = 'marks';
const LISTS_GROUP = 'lists';
const INSERT_GROUP = 'insert';
const LAST_GROUP = 'panels';

type FillerPluginOptions = {
    id: string;
    toolbarGroup: RteToolbarGroup;
    label: string;
};

/** A control that always draws a button, in the given group. */
const fillerPlugin = ({ id, toolbarGroup, label }: FillerPluginOptions): RtePlugin =>
    definePlugin({
        id,
        toolbarGroup,
        toolbar: [
            {
                label,
                render: () => <button type="button">{label}</button>,
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
const blankPlugin = (toolbarGroup: RteToolbarGroup): RtePlugin =>
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

const MARKS_FILLER = fillerPlugin({ id: 'marks-filler', toolbarGroup: MARKS_GROUP, label: MARKS_FILLER_LABEL });
const LISTS_FILLER = fillerPlugin({ id: 'lists-filler', toolbarGroup: LISTS_GROUP, label: LISTS_FILLER_LABEL });
const PANEL_FILLER = fillerPlugin({ id: 'panel-filler', toolbarGroup: LAST_GROUP, label: PANEL_FILLER_LABEL });

/** The blank control in the toolbar's first group, before the groups that draw. */
const BLANK_FIRST_PLUGINS = [blankPlugin(FIRST_GROUP), MARKS_FILLER, LISTS_FILLER];

/** The blank control in a group between the groups that draw. */
const BLANK_MIDDLE_PLUGINS = [MARKS_FILLER, blankPlugin(INSERT_GROUP), PANEL_FILLER];

/** The blank control in the last group of the toolbar. */
const BLANK_LAST_PLUGINS = [MARKS_FILLER, LISTS_FILLER, blankPlugin(LAST_GROUP)];

/** The blank control in the lists group, beside a control that draws. */
const BLANK_BESIDE_PLUGINS = [MARKS_FILLER, LISTS_FILLER, blankPlugin(LISTS_GROUP)];

type ToolbarDividersHostProps = {
    placement: NonNullable<RichTextEditorProps['toolbarPlacement']>;
    blankAt: BlankAt;
    /** Whether the blank control draws a button or nothing. */
    blankDraws: boolean;
};

const pluginsFor = (blankAt: BlankAt): readonly RtePlugin[] => {
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

/** The editor over a paragraph, with controls that draw and a control the host can make draw nothing. */
export const ToolbarDividersHost = ({ placement, blankAt, blankDraws }: ToolbarDividersHostProps): ReactNode => (
    <BlankDrawsContext.Provider value={blankDraws}>
        <RichTextEditor value={PARAGRAPH_DOCUMENT} plugins={pluginsFor(blankAt)} toolbarPlacement={placement} />
    </BlankDrawsContext.Provider>
);
