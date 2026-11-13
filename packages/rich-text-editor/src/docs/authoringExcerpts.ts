/* (c) Copyright Frontify Ltd., all rights reserved. */

import underlineSource from '../plugins/Underline/Underline.ts?raw';
import pluginExamplesSource from '../stories/PluginExamples.stories.tsx?raw';

import { excerptOf } from './excerptOf';

/**
 * The line that closes a top-level declaration
 */
const DECLARATION_END = '});';

/**
 * The code excerpts of the "Writing a plugin" guide, each cut from the file it shows
 */
export const acmeHighlightContentExcerpt = excerptOf(
    pluginExamplesSource,
    'const acmeHighlightContent = defineContent({',
    DECLARATION_END,
);

export const acmeHighlightPluginExcerpt = excerptOf(
    pluginExamplesSource,
    'const acmeHighlightPlugin = /* @__PURE__ */ definePlugin({',
    DECLARATION_END,
);

export const acmeCalloutContentExcerpt = excerptOf(
    pluginExamplesSource,
    'const acmeCalloutContent = defineContent({',
    DECLARATION_END,
);

export const acmeEmbedContentExcerpt = excerptOf(
    pluginExamplesSource,
    'const acmeEmbedContent = defineContent({',
    DECLARATION_END,
);

export const underlinePluginExcerpt = excerptOf(
    underlineSource,
    'export const underlinePlugin = /* @__PURE__ */ definePlugin({',
    DECLARATION_END,
);
