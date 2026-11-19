/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';
import { localeLabel } from '#/ui/translation';

import { decorationLineRules } from '../shared/helpers/declaredStyle';

/**
 * The flag this plugin sets on text nodes
 */
export type UnderlineMark = {
    /**
     * Whether the text is underlined. Present means on, and `true` is the only value.
     */
    underline?: true;
};

/**
 * Underlined text, written as `<u>`
 */
export const underlineContent = defineContent({
    marks: {
        underline: defineMark({
            tag: 'u',
            // A decorated element counts too, as Google Docs writes it; `text-decoration: none` never removes it, as in a browser.
            parse: [{ tag: 'u' }, ...decorationLineRules('underline')],
        }),
    },
});

/**
 * Underlined text with the `Mod-u` shortcut
 */
export const underlinePlugin = () =>
    definePlugin({
        content: underlineContent,
        toolbarGroup: 'marks',
        toolbar: [{ label: localeLabel('RichTextEditor_underline'), icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
    });
