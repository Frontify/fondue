/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

import { DropZone } from '@components/DropZone';
import { DropZonePosition } from '@utilities/dnd';

import { TreeItemProps } from '../types';

export const useDraggableEnhancedChildren = (
    id: string | string[],
    // onDrop: OnDropCallback<{ id: string; sort: Nullable<number> }> | (() => void),
    onDrop: any,
    // isDragging: boolean,
    children?: ReactElement<TreeItemProps> | ReactElement<TreeItemProps>[],
) => {
    const draggableEnhancedChildren = React.Children.map(children, (child, index) => {
        // console.log('PROBLEM: ', id);

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
                        acceptType={id}
                        // isDragging={isDragging}
                    />
                )}

                {child}
            </>,
        );
    });

    return { draggableEnhancedChildren };
};
