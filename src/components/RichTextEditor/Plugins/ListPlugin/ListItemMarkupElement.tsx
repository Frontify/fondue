/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, PlateRenderElementProps } from '@udecode/plate';
import React from 'react';
import { MarkupElement } from '../MarkupElement';
import { getLiStyles } from '../';

export const LI_CLASSNAMES =
    '[&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline';

export const ListItemMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    return (
        <li style={getLiStyles(element)} {...attributes} className={LI_CLASSNAMES}>
            {children}
        </li>
    );
};

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}
