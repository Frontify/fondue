import { ChosenLinkElement } from "@components/RichTextEditor/components";
import { createPluginFactory } from "@udecode/plate";

// Extends the default link plugin so that 'getChosenLink()' can be given into
// https://github.com/udecode/plate/tree/main/packages/nodes/link/src

export const ELEMENT_LINK_CHOOSER = "link_chooser";

export const createLinkChooserPlugin = createPluginFactory({
    key: ELEMENT_LINK_CHOOSER,
    isElement: true,
    isInline: true,
    component: ChosenLinkElement,
});
