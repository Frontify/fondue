/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { MarkupElement } from '../../MarkupElement';
import { mapMentionable } from '../helpers';
import { MentionableItems } from '../types';
import { MentionMarkupElementNode } from './MentionMarkupElementNode';

export class MentionMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_MENTION) {
        super(id);
    }

    setNodeWithMentionable(mentionable: MentionableItems) {
        this.node = MentionMarkupElementNode(mapMentionable(mentionable));
        return this;
    }
}
