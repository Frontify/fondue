/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

import { DropZone, OnDropCallback } from '@components/DropZone';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';

import { TreeItemProps } from '../types';

type Configuration<T> = {
    onDrop?: OnDropCallback<T>;
    accept: string | string[];
    children?: ReactElement<TreeItemProps> | ReactElement<TreeItemProps>[];
};

export const useDraggableEnhancedChildren = <T extends object>(config: Configuration<T>) => {
    const draggableEnhancedChildren = React.Children.map(config.children, (child, index) => {
        if (!child) {
            return <></>;
        }

        return React.cloneElement(
            <>
                {index === 0 && (
                    <DropZone
                        data-position={DropZonePosition.Before}
                        data={{
                            targetItem: {
                                id: child.props.id,
                                sort: child.props.sort,
                                type: child.props.type,
                            } as DraggableItem<T>,
                            position: DropZonePosition.Before,
                        }}
                        onDrop={config.onDrop}
                        accept={config.accept}
                    />
                )}

                {child}
            </>,
        );
    });

    return { draggableEnhancedChildren };
};
