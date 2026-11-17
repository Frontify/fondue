/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import {
    type ButtonLook,
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    type LinkLook,
    type LinkAppearance,
    linkPlugin,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RtePlugin,
    type TextLook,
    textStylePlugin,
} from '../../index';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostLooksPairProps = {
    body?: TextLook;
    quote?: TextLook;
    link?: LinkLook;
    buttons?: Partial<Record<LinkAppearance, ButtonLook>>;
    /**
     * The document both surfaces draw.
     * @default BODY_QUOTE_LINK_DOCUMENT
     */
    value?: RteDocument;
};

const BUTTON_APPEARANCES: readonly LinkAppearance[] = ['primary', 'secondary', 'tertiary'];

const pluginsWithLooks = ({ body, quote, link, buttons }: HostLooksPairProps): RtePlugin[] => [
    textStylePlugin({ presets: { body, quote } }),
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    quotePlugin,
    linkPlugin({ look: link, appearances: BUTTON_APPEARANCES, looks: buttons }),
];

/** The renderer and the editor side by side, drawing body text, a quote and links with the same looks. */
export const HostLooksPair = ({ value = BODY_QUOTE_LINK_DOCUMENT, ...looks }: HostLooksPairProps) => {
    const plugins = pluginsWithLooks(looks);

    return (
        <>
            <div data-testid="renderer">
                <RichTextRenderer value={value} plugins={plugins} />
            </div>
            <div data-testid="editor">
                <RichTextEditor value={value} plugins={plugins} />
            </div>
        </>
    );
};
