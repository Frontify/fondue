/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx.

import {
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    linkPlugin,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RtePlugin,
    type TextLook,
    textStylePlugin,
} from '../../index';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostNoHeadingsPairProps = {
    body: TextLook;
};

const OTHER_PLUGINS: RtePlugin[] = [bulletListPlugin(), checkListPlugin, fontColorPlugin, quotePlugin, linkPlugin];

/** The renderer and the editor of a surface without headings, which still carries the body look */
export const HostNoHeadingsPair = ({ body }: HostNoHeadingsPairProps) => {
    const plugins = [textStylePlugin({ styles: [], presets: { body } }), ...OTHER_PLUGINS];

    return (
        <>
            <div data-testid="renderer">
                <RichTextRenderer value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
            <div data-testid="editor">
                <RichTextEditor value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
        </>
    );
};
