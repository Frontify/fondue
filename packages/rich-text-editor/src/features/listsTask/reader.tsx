/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactNode } from 'react';

import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

/** The blocks of a task item, which the reader passes as one fragment. */
const blocksOf = (children: ReactNode): ReactNode[] => {
    if (isValidElement<{ readonly children?: ReactNode }>(children)) {
        return Children.toArray(children.props.children);
    }

    return Children.toArray(children);
};

/** A disabled native checkbox that shows `checked`, labelled by the item's first paragraph. */
const TaskItem = ({ attrs, children }: ReaderNodeProps) => {
    const checked = attrs.checked === true;
    let nodeId = '';
    if (typeof attrs.nodeId === 'string') {
        nodeId = attrs.nodeId;
    }

    // An ID holds no space, which would split the `aria-labelledby` reference.
    const label = `rte-task-${encodeURIComponent(nodeId)}`;
    const [first, ...rest] = blocksOf(children);

    return (
        <li data-checked={String(checked)} dir="auto">
            <input type="checkbox" disabled checked={checked} aria-labelledby={label} />
            <div id={label}>{first}</div>
            {rest}
        </li>
    );
};

export const taskReader: ReaderRenderers = { task_item: TaskItem };

/** The feature these renderers belong to. */
export const readerFeature = 'lists.task';
