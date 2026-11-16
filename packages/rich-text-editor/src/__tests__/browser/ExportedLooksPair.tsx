/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx and documentSpacing.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { type RteDocumentOf } from '../../core/document';
import {
    bulletListPlugin,
    checkListPlugin,
    columnBreakPlugin,
    fontColorPlugin,
    linkPlugin,
    quotePlugin,
    type RtePlugin,
    serializeToHtml,
    type TextStylePresets,
    textStylePlugin,
} from '../../index';

import { EXPORT_DOCUMENT } from './hostStylingValues';
import { ownMarginsPlugin } from './ownMarginsPlugin';

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
    /**
     * The document both exports hold.
     * @default EXPORT_DOCUMENT
     */
    value?: RteDocumentOf;
    /** Mounts `ownMarginsPlugin`, a block drawn by its own component whose class writes its margins. */
    withOwnMarginsBlock?: boolean;
    /** Mounts `columnBreakPlugin`, a block whose stylesheet writes its margins. */
    withColumnBreak?: boolean;
};

const pluginsWithPresets = ({ presets, withOwnMarginsBlock, withColumnBreak }: ExportedLooksPairProps): RtePlugin[] => {
    const plugins = [
        textStylePlugin({ presets }),
        bulletListPlugin,
        checkListPlugin,
        fontColorPlugin,
        quotePlugin,
        linkPlugin,
    ];
    if (withOwnMarginsBlock === true) {
        plugins.push(ownMarginsPlugin);
    }
    if (withColumnBreak === true) {
        plugins.push(columnBreakPlugin());
    }
    return plugins;
};

/** The same document exported twice, as classes and as inline styles, with the same looks. */
export const ExportedLooksPair = ({ value = EXPORT_DOCUMENT, ...options }: ExportedLooksPairProps) => {
    const plugins = pluginsWithPresets(options);

    return (
        <>
            <ExportedHtml testId="classes" html={serializeToHtml(value, { plugins })} />
            <ExportedHtml testId="inline" html={serializeToHtml(value, { plugins, styling: 'inline' })} />
        </>
    );
};
