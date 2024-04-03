/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate-link';

import { MarkupElement } from '../../MarkupElement';

import { LinkMarkupElementNode } from './LinkMarkupElementNode';

export class LinkMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LINK, node = LinkMarkupElementNode) {
        super(id, node);
    }
}
