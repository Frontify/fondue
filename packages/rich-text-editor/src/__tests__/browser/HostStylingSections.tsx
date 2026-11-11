/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextRenderer, textStylePlugin, type TextStylePluginOptions } from '../../index';

import { ALL_PRESETS_DOCUMENT, SECTION_A, SECTION_B } from './hostStylingValues';

type HostStylingSectionsProps = {
    presets?: TextStylePluginOptions['presets'];
};

/** Two sections that define the same variable differently, each with its own renderer. */
export const HostStylingSections = ({ presets }: HostStylingSectionsProps) => (
    <>
        <div data-test-id="section-a" style={SECTION_A}>
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-test-id="section-b" style={SECTION_B}>
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);
