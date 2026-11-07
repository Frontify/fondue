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

// Imports the plugin files for their content: their `/* @__PURE__ */` calls let a bundler drop the plugins.

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
