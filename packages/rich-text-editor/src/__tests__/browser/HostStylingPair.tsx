/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextEditor, RichTextRenderer, type RteDocument } from '../../index';
import { textStylePlugin, type TextStylePluginOptions } from '../../plugins';

import { ALL_LOOKS_DOCUMENT } from './hostStylingValues';

type HostStylingPairProps = {
    looks?: TextStylePluginOptions['looks'];
    /**
     * The document both surfaces draw.
     * @default ALL_LOOKS_DOCUMENT
     */
    value?: RteDocument;
};

/** The renderer and the editor side by side, drawing the same document with the same looks. */
export const HostStylingPair = ({ looks, value = ALL_LOOKS_DOCUMENT }: HostStylingPairProps) => (
    <>
        <div data-testid="renderer">
            <RichTextRenderer value={value} plugins={[textStylePlugin({ looks })]} />
        </div>
        <div data-testid="editor">
            <RichTextEditor value={value} plugins={[textStylePlugin({ looks })]} />
        </div>
    </>
);
