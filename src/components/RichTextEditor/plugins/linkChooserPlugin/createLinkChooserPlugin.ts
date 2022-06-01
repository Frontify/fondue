import { ChosenLinkElement } from '@components/RichTextEditor/components';
import { createPluginFactory, ELEMENT_LINK } from '@udecode/plate';
import { ELEMENT_LINK_CHOOSER } from './types';

// Extends the default link plugin so that 'getChosenLink()' can be given into
// https://github.com/udecode/plate/tree/main/packages/nodes/link/src

export const createLinkChooserPlugin = createPluginFactory({
    key: ELEMENT_LINK_CHOOSER,
    isElement: true,
    isInline: true,
    component: ChosenLinkElement,
});

/**
 * @deprecated
 */
export const createLinkPlugin = createPluginFactory({
    key: ELEMENT_LINK,
    isElement: true,
    isInline: true,
    component: ChosenLinkElement,
});
