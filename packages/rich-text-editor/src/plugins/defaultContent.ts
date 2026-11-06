/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteContent } from '#/core';

import { alignContent } from './Align/content';
import { boldContent } from './Bold/content';
import { checkListContent } from './CheckList/content';
import { codeContent } from './Code/content';
import { fontColorContent } from './FontColor/content';
import { italicContent } from './Italic/content';
import { linkContent } from './Link/content';
import { bulletListContent, numberedListContent } from './List/content';
import { quoteContent } from './Quote/content';
import { softBreakContent } from './SoftBreak/content';
import { strikethroughContent } from './Strikethrough/content';
import { subscriptContent } from './Subscript/content';
import { superscriptContent } from './Superscript/content';
import { textStyleContent } from './TextStyle/content';
import { underlineContent } from './Underline/content';

// Imports content modules only: the renderer must work without ever evaluating `defaultPlugins`.

/**
 * The content of every `defaultPlugins` entry, in the same order (it decides
 * how marks nest on a tie). `RichTextRenderer`, `serializeToHtml` and
 * `toPlainText` read it when given no `plugins`.
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
    linkContent,
    alignContent,
    bulletListContent,
    numberedListContent,
    checkListContent,
    quoteContent,
    softBreakContent,
]);
