/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import {
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    textStylePlugin,
    type TextStylePluginOptions,
} from '../../index';

import { H1_COLOR_VARIABLE, SECTION_A_H1_COLOR, SECTION_B_H1_COLOR } from './hostStylingValues';

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and
// the plugin list holds functions, which cannot travel as props.

/** One block per text style, in the dropdown's order. */
const ALL_PRESETS_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
        { type: 'textStyle', style: 'heading2', children: [{ text: 'Heading 2' }] },
        { type: 'textStyle', style: 'heading3', children: [{ text: 'Heading 3' }] },
        { type: 'textStyle', style: 'heading4', children: [{ text: 'Heading 4' }] },
        { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
        { type: 'textStyle', style: 'custom2', children: [{ text: 'Custom 2' }] },
        { type: 'textStyle', style: 'custom3', children: [{ text: 'Custom 3' }] },
        { type: 'textStyle', style: 'imageTitle', children: [{ text: 'Image title' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'Image caption' }] },
    ],
};

/** The variable a host defines around its editors, as the guideline's theme settings would. */
const hostVariable = (name: string, value: string): CSSProperties =>
    // CSSProperties has no custom properties.
    ({ [name]: value }) as CSSProperties;

const SECTION_A = hostVariable(H1_COLOR_VARIABLE, SECTION_A_H1_COLOR);
const SECTION_B = hostVariable(H1_COLOR_VARIABLE, SECTION_B_H1_COLOR);

type HostStylingPairProps = {
    presets?: TextStylePluginOptions['presets'];
};

type HostStylingSectionsProps = HostStylingPairProps;

/** The renderer and the editor side by side, drawing the same document with the same presets. */
export const HostStylingPair = ({ presets }: HostStylingPairProps) => (
    <>
        <div data-testid="renderer">
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-testid="editor">
            <RichTextEditor value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);

/** Two sections that define the same variable differently, each with its own renderer. */
export const HostStylingSections = ({ presets }: HostStylingSectionsProps) => (
    <>
        <div data-testid="section-a" style={SECTION_A}>
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-testid="section-b" style={SECTION_B}>
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);
