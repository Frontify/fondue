/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TElement } from '@udecode/slate';
import { renderToStaticMarkup } from 'react-dom/server';

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

    return renderToStaticMarkup(MentionMarkupElementNode(mentionable)({ element: node } as MarkupElementProps));
};
