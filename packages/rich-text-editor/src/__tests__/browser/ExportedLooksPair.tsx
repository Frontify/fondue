/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import {
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    linkPlugin,
    quotePlugin,
    type RtePlugin,
    serializeToHtml,
    type TextStylePresets,
    textStylePlugin,
} from '../../index';

import { EXPORT_DOCUMENT } from './hostStylingValues';

type ExportedHtmlProps = {
    html: string;
    testId: string;
};

const ExportedHtml = ({ html, testId }: ExportedHtmlProps) => (
    // Safe: the HTML is our own serializer's output for a fixed document, so nothing in it comes from a user.
    // oxlint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
    <div data-testid={testId} dangerouslySetInnerHTML={{ __html: html }} />
);

type ExportedLooksPairProps = {
    /**
     * Every look the host sets, the text styles, body text, quotes and links alike.
     * @default {}
     */
    presets?: TextStylePresets;
};

const pluginsWithPresets = (presets: TextStylePresets): RtePlugin[] => [
    textStylePlugin({ presets }),
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    quotePlugin,
    linkPlugin,
];

/** The same document exported twice, as classes and as inline styles, with the same looks. */
export const ExportedLooksPair = ({ presets = {} }: ExportedLooksPairProps) => {
    const plugins = pluginsWithPresets(presets);

    return (
        <>
            <ExportedHtml testId="classes" html={serializeToHtml(EXPORT_DOCUMENT, { plugins })} />
            <ExportedHtml testId="inline" html={serializeToHtml(EXPORT_DOCUMENT, { plugins, styling: 'inline' })} />
        </>
    );
};
