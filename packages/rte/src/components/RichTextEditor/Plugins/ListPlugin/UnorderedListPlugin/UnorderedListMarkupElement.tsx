/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderLeafProps, useEditorRef } from '@udecode/plate-core';
import { ELEMENT_UL } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';
import { type CSSProperties } from 'react';

import { MarkupElement } from '../../MarkupElement';
import { DEFAULT_UL_STYLES, type UnorderedListLevelStyle } from '../types';
import { getNestingLevel } from '../utils';

export const UL_CLASSES =
    'tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-whitespace-nowrap [&>li>p]:before:tw-px-2 [&>li>p]:before:tw-content-[var(--bullet-character)] [&>li>p]:before:tw-text-[color:var(--bullet-color)] [&>li>p]:before:tw-text-[length:var(--bullet-size)]';

export const createUnorderedListNode = (listStyles: UnorderedListLevelStyle[] = DEFAULT_UL_STYLES) => {
    const UnorderedListNode = ({ attributes, children, element }: PlateRenderLeafProps & { element: TElement }) => {
        const editor = useEditorRef();
        const nestingLevel = getNestingLevel(editor, element);
        const levelStyle = listStyles[nestingLevel % listStyles.length];

        return (
            <ul
                className={UL_CLASSES}
                {...attributes}
                style={
                    {
                        '--bullet-character': `'${levelStyle.shape}'`,
                        '--bullet-color': levelStyle.color ?? 'currentColor',
                        '--bullet-size': levelStyle.size ?? '1em',
                    } as CSSProperties
                }
            >
                {children}
            </ul>
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
