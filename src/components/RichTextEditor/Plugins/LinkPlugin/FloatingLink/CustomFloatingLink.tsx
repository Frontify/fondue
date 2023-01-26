/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEditableProps, useFloatingLinkSelectors } from '@udecode/plate';
import React from 'react';
import { EditModal } from './EditLinkModal';
import { FloatingLink } from './FloatingLink';
import { InsertLinkModal } from './InsertLinkModal/InsertLinkModal';

export const CustomFloatingLink = ({ readOnly }: TEditableProps) => {
    const isEditing = useFloatingLinkSelectors().isEditing();

    if (readOnly) {
        return null;
    }

    const input = <InsertLinkModal />;
    const editContent = isEditing ? input : <EditModal />;

    return (
        <>
            <FloatingLink.InsertRoot>{input}</FloatingLink.InsertRoot>

            <FloatingLink.EditRoot>{editContent}</FloatingLink.EditRoot>
        </>
    );
};
