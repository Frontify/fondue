/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, ReactElement, cloneElement, useMemo } from 'react';

import { DropZone, OnDropCallback } from '@components/DropZone';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';

import { TreeItemProps } from '../types';

type Configuration<T> = {
    onDrop?: OnDropCallback<T>;
    accept: string | string[];
    children?: ReactElement<TreeItemProps> | ReactElement<TreeItemProps>[];
    sort?: number;
};

export const useDraggableEnhancedChildren = <T extends object>(config: Configuration<T>) => {
    const draggableEnhancedChildren = useMemo(() => {
        return Children.map(config.children, (child, index) => {
            if (!child) {
                return null;
            }

            return (
                <>
                    {index === 0 ? (
                        <DropZone
                            data-position={DropZonePosition.Before}
                            data={{
                                targetItem: {
                                    id: child.props.id,
                                    type: child.props.type,
                                    sort: config.sort ?? index,
                                } as DraggableItem<T>,
                                position: DropZonePosition.Before,
                            }}
                            onDrop={config.onDrop}
                            accept={config.accept}
                        />
                    ) : null}

                    {cloneElement(child)}
                </>
            );
        });
    }, [config.accept, config.children, config.onDrop, config.sort]);

    return { draggableEnhancedChildren };
};
