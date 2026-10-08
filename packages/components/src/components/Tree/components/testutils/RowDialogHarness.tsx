/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Dialog } from '#/components/Dialog/Dialog';

import { Tree } from '../../Tree';

/** A row action opens a Dialog whose Save button is swapped out by state held above `Tree.Root`. */
export const RowDialogHarness = ({ modal = false }: { modal?: boolean }) => {
    const [isSaving, setIsSaving] = useState(false);
    return (
        <Tree.Root>
            <Tree.Item id="1" isSelected>
                <Tree.Label>Row1</Tree.Label>
            </Tree.Item>
            <Tree.Item id="2">
                <Tree.Label>Row2</Tree.Label>
                <Tree.Action>
                    <Dialog.Root modal={modal}>
                        <Dialog.Trigger>
                            <button type="button">Row2 settings</button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Body>
                                <input aria-label="Name" />
                                {isSaving ? (
                                    <span>Saving</span>
                                ) : (
                                    <button type="button" onClick={() => setIsSaving(true)}>
                                        Save
                                    </button>
                                )}
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Root>
                </Tree.Action>
            </Tree.Item>
        </Tree.Root>
    );
};
