/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';

import { DropZone, OnDropCallback } from '@components/DropZone';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';

type Configuration<T> = {
    onDrop?: OnDropCallback<T>;
    accept: string | string[];
    children?: ReactNode;
};

export const useDraggableEnhancedChildren = <T extends object>(config: Configuration<T>) => {
    const draggableEnhancedChildren = React.Children.map(config.children, (child, index) => {
        if (!child) {
            return <></>;
        }

        return React.cloneElement(
            <>
                {index === 0 && React.isValidElement(child) && (
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
