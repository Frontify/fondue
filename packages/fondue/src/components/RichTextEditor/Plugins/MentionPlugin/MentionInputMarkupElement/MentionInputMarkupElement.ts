/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION_INPUT } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import { MentionInputMarkupElementNode } from './MentionInputMarkupElementNode';

export class MentionInputMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_MENTION_INPUT, node = MentionInputMarkupElementNode) {
        super(id, node);
    }
}
