/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextEditor, RichTextRenderer, textStylePlugin, type TextStylePluginOptions } from '../../index';

import { ALL_PRESETS_DOCUMENT } from './hostStylingValues';

type HostStylingPairProps = {
    presets?: TextStylePluginOptions['presets'];
};

/** The renderer and the editor side by side, drawing the same document with the same presets. */
export const HostStylingPair = ({ presets }: HostStylingPairProps) => (
    <>
        <div data-test-id="renderer">
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-test-id="editor">
            <RichTextEditor value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);
