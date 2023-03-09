/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { RangeBeforeOptions, createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { InternalLinksLoader } from '../types';
import { ButtonMarkupElement } from './ButtonMarkupElement';
import { ButtonButton } from './components/ButtonButton';
import { CustomFloatingButton } from './components/FloatingButton/CustomFloatingButton';
import { withButton } from './withButton';

export const ELEMENT_BUTTON = 'button';
export const BUTTON_PLUGIN = 'button-plugin';

export interface ButtonPlugin {
    forceSubmit?: boolean;

    /**
     * Allow custom config for rangeBeforeOptions.
     * @example default
     * {
     *   matchString: ' ',
     *   skipInvalid: true,
     *   afterMatch: true,
     * }
     */
    rangeBeforeOptions?: RangeBeforeOptions;

    /**
     * Hotkeys to trigger floating button.
     * @default 'command+k, ctrl+k'
     */
    triggerFloatingButtonHotkeys: string;

    /**
     * Callback to validate an url.
     * @default isUrl
     */
    isUrl: (text: string) => boolean;

    /**
     * Callback to optionally get the href for a url
     * @returns href: an optional link to be used that is different from the text content (example https://google.com for google.com)
     */
    getUrlHref?: (url: string) => string | undefined;

    /**
     * On keyboard shortcut or toolbar mousedown, get the link url by calling this promise. The
     * default behavior is to use the browser's native `prompt`.
     */
    getLinkUrl?: (prevUrl: string | null) => Promise<string | null>;
}

/**
 * Enables support for hyperlinks.
 */
export const createButtonPlugin = (loadInternalLinks?: InternalLinksLoader) =>
    createPluginFactory({
        key: ELEMENT_BUTTON,
        isElement: true,
        isInline: true,
        props: ({ element }) => ({
            nodeProps: { href: element?.url, target: element?.target },
        }),
        withOverrides: withButton,
        renderAfterEditable: CustomFloatingButton,
        options: {
            isUrl: isValidUrl,
            rangeBeforeOptions: {
                matchString: ' ',
                skipInvalid: true,
                afterMatch: true,
            },
            triggerFloatingButtonHotkeys: 'command+shift+k, ctrl+shift+k',
            loadInternalLinks,
        },
        then: (editor, { type }) => ({
            deserializeHtml: {
                rules: [
                    {
                        validNodeName: 'A',
                        validClassName: 'btn',
                    },
                ],
                getNode: (el) => ({
                    type,
                    url: el.getAttribute('href'),
                    target: el.getAttribute('target') || '_blank',
                }),
            },
        }),
    })();

export class ButtonPlugin extends Plugin {
    private loadInternalLinks?: InternalLinksLoader;

    constructor(props?: PluginProps) {
        super(BUTTON_PLUGIN, {
            button: ButtonButton,
            markupElement: new ButtonMarkupElement(),
            ...props,
        });
        this.loadInternalLinks = props?.loadInternalLinks;
    }

    plugins() {
        return [createButtonPlugin(this.loadInternalLinks)];
    }
}
