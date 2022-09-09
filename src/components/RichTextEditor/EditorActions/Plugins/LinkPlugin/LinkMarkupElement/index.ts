/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import { LinkMarkupElementTag } from './LinkMarkupElementTag';

export class LinkMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LINK, tag = LinkMarkupElementTag) {
        super(id, tag);
    }
}
