/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { serializeToHtml } from '../../index';

import { type HostLooksOptions, pluginsWithLooks } from './hostStylingPlugins';
import { EXPORT_DOCUMENT } from './hostStylingValues';

type ExportedHtmlProps = {
    html: string;
    testId: string;
};

const ExportedHtml = ({ html, testId }: ExportedHtmlProps) => (
    // Safe: the HTML is our own serializer's output for a fixed document, so nothing in it comes from a user.
    // oxlint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
    <div data-test-id={testId} dangerouslySetInnerHTML={{ __html: html }} />
);

type ExportedLooksPairProps = HostLooksOptions;

/** The same document exported twice, as classes and as inline styles, with the same looks. */
export const ExportedLooksPair = (props: ExportedLooksPairProps) => {
    const plugins = pluginsWithLooks(props);

    return (
        <>
            <ExportedHtml testId="classes" html={serializeToHtml(EXPORT_DOCUMENT, { plugins })} />
            <ExportedHtml testId="inline" html={serializeToHtml(EXPORT_DOCUMENT, { plugins, styling: 'inline' })} />
        </>
    );
};
