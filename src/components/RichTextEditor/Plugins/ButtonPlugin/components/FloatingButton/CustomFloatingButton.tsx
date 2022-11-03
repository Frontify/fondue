/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { EditModal } from './EditButtonModal/EditModal';
import { FloatingButton } from './FloatingButton';
import { useFloatingButtonSelectors } from './floatingButtonStore';
import { InsertModal } from './InserButtontModal/InsertModal';

export const CustomFloatingButton = () => {
    const isEditing = useFloatingButtonSelectors().isEditing();

    const input = <InsertModal />;
    const editContent = !isEditing ? <EditModal /> : input;

    return (
        <>
            <FloatingButton.InsertRoot>{input}</FloatingButton.InsertRoot>

            <FloatingButton.EditRoot>{editContent}</FloatingButton.EditRoot>
        </>
    );
};
