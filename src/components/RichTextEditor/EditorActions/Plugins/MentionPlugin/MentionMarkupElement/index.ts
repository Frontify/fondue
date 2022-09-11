/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import { MentionMarkupElementTag } from './MentionMarkupElementTag';

export class MentionMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_MENTION, tag = MentionMarkupElementTag) {
        super(id, tag);
    }
}
