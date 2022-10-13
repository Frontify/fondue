/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import { MentionMarkupElementNode } from './MentionMarkupElementNode';

export class MentionMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_MENTION, node = MentionMarkupElementNode) {
        super(id, node);
    }
}
