/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { mentionable } from '@components/RichTextEditor/helpers/exampleValues';
import { ELEMENT_MENTION } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import { MentionableItems } from '../types';
import { MentionMarkupElementNode } from './MentionMarkupElementNode';

export class MentionMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_MENTION) {
        super(id);
    }

    setNodeWithMentionable(mentionable: MentionableItems) {
        this.node = MentionMarkupElementNode(mentionable);
        return this;
    }
}
