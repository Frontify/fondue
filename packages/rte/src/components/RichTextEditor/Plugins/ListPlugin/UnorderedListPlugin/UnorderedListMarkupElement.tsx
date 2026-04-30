/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderLeafProps, useEditorRef } from '@udecode/plate-core';
import { ELEMENT_UL } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';
import { useMemo } from 'react';

import { MarkupElement } from '../../MarkupElement';
import { ListBulletContext } from '../ListBulletContext';
import { DEFAULT_UL_STYLES, type UnorderedListLevelStyle } from '../types';
import { getNestingLevel } from '../utils';

export const UL_CLASSES =
    'tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [li_&]:tw-mb-0 [counter-reset:list-counter]';

export const createUnorderedListNode = (listStyles: UnorderedListLevelStyle[] = DEFAULT_UL_STYLES) => {
    // eslint-disable-next-line @eslint-react/component-hook-factories
    const UnorderedListNode = ({ attributes, children, element }: PlateRenderLeafProps & { element: TElement }) => {
        const editor = useEditorRef();
        const nestingLevel = getNestingLevel(editor, element);
        const levelStyle = listStyles[nestingLevel % listStyles.length];

        const bulletInfo = useMemo(
            () => ({
                type: 'ul' as const,
                character: levelStyle.shape ?? "'\u2022'",
                color: levelStyle.color ?? 'currentColor',
                size: levelStyle.size ?? '1em',
            }),
            [levelStyle],
        );

        return (
            <ListBulletContext.Provider value={bulletInfo}>
                <ul className={UL_CLASSES} {...attributes}>
                    {children}
                </ul>
            </ListBulletContext.Provider>
        );
    };
    return UnorderedListNode;
};

export class UnorderedListMarkupElement extends MarkupElement {
    constructor(
        id = ELEMENT_UL,
        node: (props: PlateRenderLeafProps & { element: TElement }) => JSX.Element = createUnorderedListNode(),
    ) {
        super(id, node);
    }
}
