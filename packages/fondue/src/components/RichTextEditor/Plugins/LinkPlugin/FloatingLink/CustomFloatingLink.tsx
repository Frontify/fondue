/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UseVirtualFloatingOptions, flip, offset } from '@udecode/plate';
import {
    LinkFloatingToolbarState,
    useFloatingLinkEdit,
    useFloatingLinkEditState,
    useFloatingLinkInsert,
    useFloatingLinkInsertState,
} from '@udecode/plate';
import { EditModal } from './EditLinkModal';
import { InsertLinkModal } from './InsertLinkModal/InsertLinkModal';

const floatingOptions: UseVirtualFloatingOptions = {
    placement: 'bottom-start',
    strategy: 'fixed',
    middleware: [
        offset(12),
        flip({
            padding: 12,
            fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
        }),
    ],
};

export interface LinkFloatingToolbarProps {
    state?: LinkFloatingToolbarState;
}

export function CustomFloatingLink() {
    const insertState = useFloatingLinkInsertState({
        floatingOptions,
    });
    const { props: insertProps, ref: insertRef, hidden } = useFloatingLinkInsert(insertState);

    const editState = useFloatingLinkEditState({
        floatingOptions,
    });

    const { props: editProps, ref: editRef, editButtonProps, unlinkButtonProps } = useFloatingLinkEdit(editState);

    if (hidden) {
        return null;
    }

    const input = <InsertLinkModal />;
    const editContent = editState.isEditing ? (
        input
    ) : (
        <EditModal editButtonProps={editButtonProps} unlinkButtonProps={unlinkButtonProps} />
    );

    return (
        <>
            {insertState.isOpen && !editState.isOpen && (
                <div ref={insertRef} {...insertProps}>
                    {input}
                </div>
            )}

            {editState.isOpen && (
                <div ref={editRef} {...editProps}>
                    {editContent}
                </div>
            )}
        </>
    );
}
