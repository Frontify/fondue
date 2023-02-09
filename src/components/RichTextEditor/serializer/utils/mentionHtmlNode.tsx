/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ReactDOMServer from 'react-dom/server';
import { MappedMentionableItems } from '@components/RichTextEditor/Plugins/MentionPlugin';
import { MentionMarkupElementNode } from '@components/RichTextEditor/Plugins/MentionPlugin';
import { TElement, TMentionElement } from '@udecode/plate';

type MentionHtmlNodeProps = { mentionable?: MappedMentionableItems };

export const mentionHtmlNode = (node: TElement, { mentionable }: MentionHtmlNodeProps = {}) => {
    if (!mentionable) {
        return '';
    }

    return ReactDOMServer.renderToStaticMarkup(
        MentionMarkupElementNode(mentionable)({ element: node as TMentionElement }),
    );
};
