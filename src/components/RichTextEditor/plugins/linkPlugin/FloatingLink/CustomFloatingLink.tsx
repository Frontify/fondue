/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFloatingLinkSelectors } from '@udecode/plate';
import React from 'react';
import { FloatingLink } from './FloatingLink';

export const CustomFloatingLink = () => {
    const isEditing = useFloatingLinkSelectors().isEditing();

    const input = <FloatingLink.InsertModal />;
    const editContent = !isEditing ? <FloatingLink.EditModal /> : input;

    return (
        <>
            <FloatingLink.InsertRoot>{input}</FloatingLink.InsertRoot>

            <FloatingLink.EditRoot>{editContent}</FloatingLink.EditRoot>
        </>
    );
};
