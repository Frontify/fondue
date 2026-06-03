/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderElementProps } from '@udecode/plate-core';
import { ELEMENT_LIC } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';
import { useContext } from 'react';

import { merge } from '@utilities/merge';

import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { justifyClassNames } from '../helper';

import { ListBulletContext } from './ListBulletContext';

export const LIST_ITEM_SPAN_CLASSES = 'tw-w-auto tw-min-w-[10px]';

export const LIST_BULLET_CONTAINER_CLASSES =
    'tw-relative tw-flex tw-items-center tw-justify-center tw-select-none tw-w-[var(--parent-lh)] tw-h-[var(--parent-lh)] tw-shrink-0 before:tw-content-[var(--bullet-content)] before:tw-absolute before:[color:var(--bullet-color)] before:[font-size:var(--bullet-size)]';

export const getLicElementClassNames = (element: TElement, includeColumnBreakClasses = true) =>
    merge([
        includeColumnBreakClasses && getColumnBreakClasses(element),
        element.align ? justifyClassNames[element.align as string] : 'tw-justify-start',
        element.breakAfterColumn ? 'tw-flex' : 'tw-inline-flex',
    ]);

const ListBullet = () => {
    const bulletInfo = useContext(ListBulletContext);

    if (!bulletInfo) {
        return <span contentEditable={false} className={LIST_BULLET_CONTAINER_CLASSES} />;
    }

    const style: Record<string, string> = {};

    if (bulletInfo.type === 'ul') {
        style['--bullet-content'] = bulletInfo.character;
        style['--bullet-color'] = bulletInfo.color;
        style['--bullet-size'] = bulletInfo.size;
    } else {
        style['--bullet-content'] = `counter(list-counter, ${bulletInfo.counterType}) "."`;
        style['--bullet-color'] = bulletInfo.color;
    }

    return <span contentEditable={false} className={LIST_BULLET_CONTAINER_CLASSES} style={style} />;
};

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    return (
        <p className={getLicElementClassNames(element)} {...attributes}>
            <ListBullet />
            <span className={LIST_ITEM_SPAN_CLASSES}>{children}</span>
        </p>
    );
};

export class ListItemContentMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LIC, node = ListItemContentMarkupElementNode) {
        super(id, node);
    }
}
