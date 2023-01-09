/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

import { DropZone, OnDropCallback } from '@components/DropZone';
import { DropZonePosition } from '@utilities/dnd';

import { TreeItemProps } from '../types';

export const useDraggableEnhancedChildren = (
    id: string,
    onDrop: OnDropCallback<{ id: string; sort: Nullable<number> }>,
    children?: ReactElement<TreeItemProps> | ReactElement<TreeItemProps>[],
) => {
    const draggableEnhancedChildren = React.Children.map(children, (child, index) => {
        if (!child) {
            return <></>;
        }

        return React.cloneElement(
            <>
                {index === 0 && (
                    <DropZone
                        data={{
                            targetItem: { id: child.props.id, sort: child.props.sort },
                            position: DropZonePosition.Before,
                        }}
                        onDrop={onDrop}
                        treeId={id}
                    />
                )}

                {child}
            </>,
        );
    });

    return { draggableEnhancedChildren };
};
