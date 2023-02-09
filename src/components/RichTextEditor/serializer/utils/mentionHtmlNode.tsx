/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ReactDOMServer from 'react-dom/server';
import { MappedMentionableItems } from '@components/RichTextEditor/Plugins/MentionPlugin';
import { MentionMarkupElementNode } from '@components/RichTextEditor/Plugins/MentionPlugin';
// import { NodeType } from '../markdown/types';
import { TElement } from '@udecode/plate';

type MentionHtmlNodeProps = { mentionable?: MappedMentionableItems };

export const mentionHtmlNode = (node: TElement, { mentionable }: MentionHtmlNodeProps = {}) => {
    return mentionable
        ? ReactDOMServer.renderToStaticMarkup(MentionMarkupElementNode(mentionable)({ element: node }))
        : '';
};
