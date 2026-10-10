/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineNodeView, NodeChromeButton, NodeChromeToolbar, useRichTextNodeView } from '#/bridge/define';

import { fixtureTableBlock } from './feature';

/** A table menu button in the node chrome toolbar, as the table's chrome holds (SPEC-rich-text-react/AC-068). */
const TableChrome = () => {
    const { context, select } = useRichTextNodeView();
    const label = context.t('RichTextEditor_fixtureTable');
    return (
        <NodeChromeToolbar aria-label={label}>
            <NodeChromeButton label={label} onClick={select} />
        </NodeChromeToolbar>
    );
};

/** The table stand-in with its node chrome toolbar. */
export const fixtureTableBlockView = () =>
    defineNodeView(fixtureTableBlock(), { node: 'table_block', component: TableChrome });
