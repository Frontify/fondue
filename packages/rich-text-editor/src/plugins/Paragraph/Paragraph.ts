/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, definePlugin, lookProperties, lookStyle, type TextLook } from '#/core';

import styles from './paragraph.module.scss';

const PARAGRAPH_TAG = 'p';

export type ParagraphPluginOptions = {
    /**
     * How body text looks, inside list items too. A field left out keeps Fondue's look.
     * @default {}
     */
    look?: TextLook;
};

/**
 * The look of body text, set by the host
 */
export const paragraphContent = ({ look = {} }: ParagraphPluginOptions = {}) =>
    defineContent({
        // The body look's rules hang off this class, so they reach the paragraphs only while this plugin is on.
        contentClassName: styles.body,
        contentProperties: lookProperties('body', look),
        // What the stylesheet sets on a plain paragraph; `hostStyling.ct.tsx` holds them equal.
        contentStyles: () => ({ plainTags: { [PARAGRAPH_TAG]: lookStyle(look, {}) } }),
    });

/**
 * Sets the look of body text, from values such as a guideline's variables
 */
export const paragraphPlugin = (options: ParagraphPluginOptions = {}) =>
    definePlugin({ id: 'paragraph', content: paragraphContent(options) });
