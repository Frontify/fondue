/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextNodeView } from '#/bridge/nodeViews/hooks/useRichTextNodeView';
import { NodeChromeButton, NodeChromeToolbar } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { fixtureTableBlock } from './feature';

/** A table menu button in the node chrome toolbar, as the table's chrome holds. */
const TableChrome = () => {
    const { context, select } = useRichTextNodeView();
    const label = context.t('RichTextEditor_fixtureTable');

    return (
        <NodeChromeToolbar aria-label={label}>
            <NodeChromeButton label={label} onClick={select} />
        </NodeChromeToolbar>
    );
};

/** The table stand-in's editor part, with its node chrome toolbar. */
export const fixtureTableBlockEditor = defineEditorPart(fixtureTableBlock, {
    views: [{ node: 'table_block', component: TableChrome }],
});
