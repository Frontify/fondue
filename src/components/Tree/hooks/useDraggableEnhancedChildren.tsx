/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

import { DropZone } from '@components/DropZone';
import { DropZonePosition } from '@utilities/dnd';

import { TreeItemProps } from '../types';

type Configuration = {
    onDrop: any;
    accept: string | string[];
    children?: ReactElement<TreeItemProps> | ReactElement<TreeItemProps>[];
};

export const useDraggableEnhancedChildren = (config: Configuration) => {
    const draggableEnhancedChildren = React.Children.map(config.children, (child, index) => {
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
                        onDrop={config.onDrop}
                        accept={config.accept}
                        // isDragging={isDragging}
                    />
                )}

                {child}
            </>,
        );
    });

    return { draggableEnhancedChildren };
};
