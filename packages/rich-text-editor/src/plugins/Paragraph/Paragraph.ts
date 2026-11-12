/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, definePlugin, lookProperties, PARAGRAPH, type TextLook } from '#/core';

import styles from './paragraph.module.scss';

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
        // The paragraph is core's block, so its class and margins are declared by type, and only while this plugin is on.
        extendBlocks: { [PARAGRAPH]: { className: styles.paragraph, ownsMargins: true } },
        contentProperties: lookProperties('body', look),
    });

/**
 * Sets the look of body text, from values such as a guideline's variables
 */
export const paragraphPlugin = (options: ParagraphPluginOptions = {}) =>
    definePlugin({ id: 'paragraph', content: paragraphContent(options) });
