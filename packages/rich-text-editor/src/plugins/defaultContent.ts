/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteContent } from '#/core';

import { alignContent } from './Align/Align';
import { boldContent } from './Bold/Bold';
import { checkListContent } from './CheckList/CheckList';
import { codeContent } from './Code/Code';
import { fontColorContent } from './FontColor/FontColor';
import { italicContent } from './Italic/Italic';
import { linkContent } from './Link/Link';
import { bulletListContent, numberedListContent } from './List/List';
import { quoteContent } from './Quote/Quote';
import { softBreakContent } from './SoftBreak/SoftBreak';
import { strikethroughContent } from './Strikethrough/Strikethrough';
import { subscriptContent } from './Subscript/Subscript';
import { superscriptContent } from './Superscript/Superscript';
import { textStyleContent } from './TextStyle/TextStyle';
import { underlineContent } from './Underline/Underline';

// Each plugin is a function, so the renderer drops it with its editing UI; a top-level `definePlugin` call needs `/* @__PURE__ */` instead, and rendererBundle.spec.ts fails when one drags editing UI in.

/**
 * The content of every `defaultPlugins` entry, in the same order.
 * Hosts pass it to the renderer and the conversion functions when they want every shipped plugin's content.
 * Text takes Fondue's look; for the host's looks, add `textStyleContent({ look })` and `linkContent({ look: { text } })` after these.
 */
export const defaultContent: readonly RteContent[] = Object.freeze([
    textStyleContent(),
    boldContent,
    italicContent,
    underlineContent,
    strikethroughContent,
    codeContent,
    subscriptContent,
    superscriptContent,
    fontColorContent,
    linkContent(),
    alignContent,
    bulletListContent(),
    numberedListContent(),
    checkListContent(),
    quoteContent,
    softBreakContent,
]);
