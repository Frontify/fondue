import { withLink } from "@udecode/plate";
import { createPluginFactory, isUrl as isUrlProtocol } from "@udecode/plate-core";
import { onKeyDownLink } from "./onKeyDownLink";
import { LinkPlugin } from "./types";

export const ELEMENT_LINK_CHOOSER = "a";

/**
 * Enables support for hyperlinks.
 */
export const createLinkChooserPlugin = createPluginFactory<LinkPlugin>({
    key: ELEMENT_LINK_CHOOSER,
    isElement: true,
    isInline: true,
    props: ({ element }) => ({ nodeProps: { url: element?.url } }),
    handlers: {
        onKeyDown: onKeyDownLink,
    },
    withOverrides: withLink,
    options: {
        isUrl: isUrlProtocol,
        rangeBeforeOptions: {
            matchString: " ",
            skipInvalid: true,
            afterMatch: true,
        },
        hotkey: "mod+k",
    },
    then: (editor, { type }) => ({
        deserializeHtml: {
            rules: [
                {
                    validNodeName: "A",
                },
            ],
            getNode: (el) => ({
                type,
                url: el.getAttribute("href"),
            }),
        },
    }),
});
