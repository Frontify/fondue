/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION_INPUT } from '@udecode/plate-mention';
import { MarkupElement } from '../../MarkupElement';
import { MentionInputMarkupElementNode } from './MentionInputMarkupElementNode';
import { ComponentProps } from 'react';
import { MentionInputElement } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionInputMarkupElement/MentionInputElement';

export class MentionInputMarkupElement extends MarkupElement {
    constructor(
        id = ELEMENT_MENTION_INPUT,
        node: (props: ComponentProps<typeof MentionInputElement>) => JSX.Element = MentionInputMarkupElementNode,
    ) {
        super(id, node);
    }
}
