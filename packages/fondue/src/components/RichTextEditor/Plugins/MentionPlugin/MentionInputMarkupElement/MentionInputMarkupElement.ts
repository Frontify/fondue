/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION_INPUT } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import { MentionInputMarkupElementNode } from './MentionInputMarkupElementNode';
import { ComponentProps } from 'react';
import { MentionInputElement } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionInputMarkupElement/MentionInputElement';

export class MentionInputMarkupElement extends MarkupElement {
    constructor(
        id = ELEMENT_MENTION_INPUT,
        node: React.FC<ComponentProps<typeof MentionInputElement>> = MentionInputMarkupElementNode,
    ) {
        super(id, node);
    }
}
