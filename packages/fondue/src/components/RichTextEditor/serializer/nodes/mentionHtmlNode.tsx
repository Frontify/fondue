/* (c) Copyright Frontify Ltd., all rights reserved. */

import ReactDOM from 'react-dom';
import { MappedMentionableItems } from '@components/RichTextEditor/Plugins/MentionPlugin';
import { MentionMarkupElementNode } from '@components/RichTextEditor/Plugins/MentionPlugin';
import { TElement } from '@udecode/slate';
import { MarkupElementProps } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionMarkupElement/types';

type MentionHtmlNodeProps = { mentionable?: MappedMentionableItems };

export const mentionHtmlNode = (node: TElement, { mentionable }: MentionHtmlNodeProps = {}) => {
    if (!mentionable) {
        return '';
    }

    const div = document.createElement('div');
    ReactDOM.render(MentionMarkupElementNode(mentionable)({ element: node } as MarkupElementProps), div);
    return div.innerHTML;
};
