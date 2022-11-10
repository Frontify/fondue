/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { useFloatingLinkSelectors } from '@udecode/plate';
import { FloatingLink } from './FloatingLink';
import { EditModal } from './EditLinkModal';
import { InsertLinkModal } from './InsertLinkModal/InsertLinkModal';

export const CustomFloatingLink = () => {
    const isEditing = useFloatingLinkSelectors().isEditing();

    const input = <InsertLinkModal />;
    const editContent = isEditing ? input : <EditModal />;

    return (
        <>
            <FloatingLink.InsertRoot>{input}</FloatingLink.InsertRoot>

            <FloatingLink.EditRoot>{editContent}</FloatingLink.EditRoot>
        </>
    );
};
