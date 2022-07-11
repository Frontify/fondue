import { LinkElement } from '@components/RichTextEditor/components';
import { ELEMENT_LINK, createPluginFactory } from '@udecode/plate';

// Extends the default link plugin so that 'getChosenLink()' can be given into
// https://github.com/udecode/plate/tree/main/packages/nodes/link/src

export const createLinkChooserPlugin = createPluginFactory({
    key: ELEMENT_LINK,
    isElement: true,
    isInline: true,
    component: LinkElement,
});
