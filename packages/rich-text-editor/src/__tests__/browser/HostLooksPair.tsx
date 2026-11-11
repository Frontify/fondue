/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextEditor, RichTextRenderer } from '../../index';

import { type HostLooksOptions, pluginsWithLooks } from './hostStylingPlugins';
import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostLooksPairProps = HostLooksOptions;

/** The renderer and the editor side by side, drawing body text, a quote and links with the same looks. */
export const HostLooksPair = (props: HostLooksPairProps) => {
    const plugins = pluginsWithLooks(props);

    return (
        <>
            <div data-test-id="renderer">
                <RichTextRenderer value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
            <div data-test-id="editor">
                <RichTextEditor value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
        </>
    );
};
