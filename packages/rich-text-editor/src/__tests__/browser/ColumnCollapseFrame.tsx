/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by columnCollapse.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextEditor, RichTextRenderer, type RteBlock, type RteDocumentWith } from '../../index';
import { columnBreakPlugin, type ColumnBreakPluginOptions } from '../../plugins';

const paragraph = (text: string): RteBlock => ({ type: 'paragraph', children: [{ text }] });

const COLUMN_DOCUMENT: RteDocumentWith<{ block: { type: 'columnBreak' } }> = {
    version: 1,
    blocks: [
        paragraph('First'),
        { type: 'columnBreak' },
        paragraph('Second'),
        { type: 'columnBreak' },
        paragraph('Third'),
    ],
};

type ColumnCollapseFrameProps = Required<Pick<ColumnBreakPluginOptions, 'columns' | 'collapse'>> & {
    width: number;
};

/** The renderer and the editor, each in a host box of the given width, drawing the same document with the given columns and collapse. */
export const ColumnCollapseFrame = ({ columns, collapse, width }: ColumnCollapseFrameProps) => {
    const plugins = [columnBreakPlugin({ columns, collapse })];

    return (
        <>
            <div data-test-id="renderer" style={{ width }}>
                <RichTextRenderer value={COLUMN_DOCUMENT} plugins={plugins} />
            </div>
            <div data-test-id="editor" style={{ width }}>
                <RichTextEditor value={COLUMN_DOCUMENT} plugins={plugins} />
            </div>
        </>
    );
};
