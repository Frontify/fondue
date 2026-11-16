/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: the body look carried by the content half alone, with no `textStylePlugin`.

import {
    bulletListPlugin,
    checkListPlugin,
    definePlugin,
    fontColorPlugin,
    linkPlugin,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RtePlugin,
    type TextLook,
    textStyleContent,
} from '../../index';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostBodyContentPairProps = {
    body: TextLook;
};

const OTHER_PLUGINS: RtePlugin[] = [bulletListPlugin, checkListPlugin, fontColorPlugin, quotePlugin, linkPlugin];

/** The renderer and the editor side by side, with the body look set through `textStyleContent` alone. */
export const HostBodyContentPair = ({ body }: HostBodyContentPairProps) => {
    const content = textStyleContent({ styles: [], presets: { body } });
    // The editor takes plugins only, so the content travels in a plugin that adds nothing else.
    const editorPlugins = [definePlugin({ id: 'text-style-content', content }), ...OTHER_PLUGINS];

    return (
        <>
            <div data-testid="renderer">
                <RichTextRenderer value={BODY_QUOTE_LINK_DOCUMENT} plugins={[content, ...OTHER_PLUGINS]} />
            </div>
            <div data-testid="editor">
                <RichTextEditor value={BODY_QUOTE_LINK_DOCUMENT} plugins={editorPlugins} />
            </div>
        </>
    );
};
