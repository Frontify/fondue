/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION_INPUT } from '@udecode/plate-mention';
import { type ComponentProps } from 'react';

import { type MentionInputElement } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionInputMarkupElement/MentionInputElement';

import { MarkupElement } from '../../MarkupElement';

import { MentionInputMarkupElementNode } from './MentionInputMarkupElementNode';

export class MentionInputMarkupElement extends MarkupElement {
    constructor(
        id = ELEMENT_MENTION_INPUT,
        node: (props: ComponentProps<typeof MentionInputElement>) => JSX.Element = MentionInputMarkupElementNode,
    ) {
        super(id, node);
    }
}
