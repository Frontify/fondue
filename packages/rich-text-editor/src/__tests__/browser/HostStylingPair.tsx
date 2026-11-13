/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import {
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    textStylePlugin,
    type TextStylePluginOptions,
} from '../../index';

import { ALL_PRESETS_DOCUMENT } from './hostStylingValues';

type HostStylingPairProps = {
    presets?: TextStylePluginOptions['presets'];
    /**
     * The document both surfaces draw.
     * @default ALL_PRESETS_DOCUMENT
     */
    value?: RteDocument;
};

/** The renderer and the editor side by side, drawing the same document with the same presets. */
export const HostStylingPair = ({ presets, value = ALL_PRESETS_DOCUMENT }: HostStylingPairProps) => (
    <>
        <div data-testid="renderer">
            <RichTextRenderer value={value} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-testid="editor">
            <RichTextEditor value={value} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);
