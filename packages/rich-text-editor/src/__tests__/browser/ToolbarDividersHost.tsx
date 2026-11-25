/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by toolbarDividers.ct.tsx.

import { type ReactNode } from 'react';

import { type RtePlugin, type RteToolbarGroup } from '../../core';
import { definePlugin, RichTextEditor, type RteDocument } from '../../index';

const HISTORY_GROUP: RteToolbarGroup = 'history';
const TEXT_GROUP: RteToolbarGroup = 'text';
const MARKS_GROUP: RteToolbarGroup = 'marks';
const COLOR_GROUP: RteToolbarGroup = 'color';
const LINK_GROUP: RteToolbarGroup = 'link';
const PANELS_GROUP: RteToolbarGroup = 'panels';

const FILLER_LABEL = 'Filler';
const EMPTY_LABEL = 'Empty';

const PARAGRAPH_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'Before' }] }],
};

type ControlPluginOptions = Required<Pick<RtePlugin, 'id' | 'toolbarGroup'>>;

const fillerPlugin = ({ id, toolbarGroup }: ControlPluginOptions): RtePlugin =>
    definePlugin({
        id,
        toolbarGroup,
        toolbar: [
            {
                label: FILLER_LABEL,
                render: () => <button type="button">{FILLER_LABEL}</button>,
            },
        ],
    });

const emptyPlugin = ({ id, toolbarGroup }: ControlPluginOptions): RtePlugin =>
    definePlugin({
        id,
        toolbarGroup,
        toolbar: [
            {
                label: EMPTY_LABEL,
                render: () => null,
            },
        ],
    });

const PLUGINS: readonly RtePlugin[] = [
    emptyPlugin({ id: 'history-empty', toolbarGroup: HISTORY_GROUP }),
    fillerPlugin({ id: 'text-filler', toolbarGroup: TEXT_GROUP }),
    emptyPlugin({ id: 'marks-empty', toolbarGroup: MARKS_GROUP }),
    fillerPlugin({ id: 'color-filler', toolbarGroup: COLOR_GROUP }),
    emptyPlugin({ id: 'color-empty', toolbarGroup: COLOR_GROUP }),
    fillerPlugin({ id: 'link-filler', toolbarGroup: LINK_GROUP }),
    emptyPlugin({ id: 'panels-empty', toolbarGroup: PANELS_GROUP }),
];

/** The editor over a paragraph, with groups that draw a control and groups that draw nothing. */
export const ToolbarDividersHost = (): ReactNode => (
    <RichTextEditor value={PARAGRAPH_DOCUMENT} plugins={PLUGINS} toolbarPlacement="top" />
);
