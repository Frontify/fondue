/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MarkupElement } from '../../MarkupElement';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { ButtonMarkupElementNode } from './ButtonMarkupElementNode';

export class ButtonMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_BUTTON, node = ButtonMarkupElementNode) {
        super(id, node);
    }
}
