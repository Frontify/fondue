/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextRenderer } from '../../index';
import { textStylePlugin, type TextStylePluginOptions } from '../../plugins';

import { ALL_LOOKS_DOCUMENT, SECTION_A, SECTION_B } from './hostStylingValues';

type HostStylingSectionsProps = {
    looks?: TextStylePluginOptions['looks'];
};

/** Two sections that define the same variable differently, each with its own renderer. */
export const HostStylingSections = ({ looks }: HostStylingSectionsProps) => (
    <>
        <div data-testid="section-a" style={SECTION_A}>
            <RichTextRenderer value={ALL_LOOKS_DOCUMENT} plugins={[textStylePlugin({ looks })]} />
        </div>
        <div data-testid="section-b" style={SECTION_B}>
            <RichTextRenderer value={ALL_LOOKS_DOCUMENT} plugins={[textStylePlugin({ looks })]} />
        </div>
    </>
);
