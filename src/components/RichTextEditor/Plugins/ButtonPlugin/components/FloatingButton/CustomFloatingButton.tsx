/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { EditModal } from './EditButtonModal/EditModal';
import { FloatingButton } from './FloatingButton';
import { useFloatingButtonSelectors } from './floatingButtonStore';
import { InsertButtonModal } from './InsertButtonModal/InsertButtonModal';

export const CustomFloatingButton = () => {
    const isEditing = useFloatingButtonSelectors().isEditing();

    const input = <InsertButtonModal />;
    const editContent = isEditing ? input : <EditModal />;

    return (
        <>
            <FloatingButton.InsertRoot>{input}</FloatingButton.InsertRoot>
            <FloatingButton.EditRoot>{editContent}</FloatingButton.EditRoot>
        </>
    );
};
