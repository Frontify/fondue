/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TElement } from '@udecode/slate';
import { createRoot } from 'react-dom/client';

import {
    type MappedMentionableItems,
    MentionMarkupElementNode,
} from '@components/RichTextEditor/Plugins/MentionPlugin';
import { type MarkupElementProps } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionMarkupElement/types';

type MentionHtmlNodeProps = { mentionable?: MappedMentionableItems };

export const mentionHtmlNode = (node: TElement, { mentionable }: MentionHtmlNodeProps = {}) => {
    if (!mentionable) {
        return '';
    }

    const div = document.createElement('div');
    createRoot(div).render(MentionMarkupElementNode(mentionable)({ element: node } as MarkupElementProps));
    return div.innerHTML;
};
