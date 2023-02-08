/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TElement } from '@udecode/plate';
import {
    MappedMentionableItems,
    MentionableCategory,
    combineMentionableKeyWith,
    renderMentionLabel,
} from '@components/RichTextEditor/Plugins/MentionPlugin';

type MentionHtmlNodeProps = { mentionable: MappedMentionableItems; node: TElement };

export const mentionHtmlNode = ({ mentionable, node }: MentionHtmlNodeProps) => {
    const { id, category } = node;

    const key = combineMentionableKeyWith(category as MentionableCategory, String(id));

    return `<span>${renderMentionLabel(mentionable, key, String(id))}</span>`;
};
