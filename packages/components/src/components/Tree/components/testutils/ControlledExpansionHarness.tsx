/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Tree } from '../../Tree';

/**
 * Single-select folder with controlled expansion and no `onSelectChange` or `onChange`. By default its selection is
 * derived elsewhere and never taken from a click; `selectsOnClick` selects it from the row's `onClick` instead.
 */
export const ControlledExpansionHarness = ({ selectsOnClick = false }: { selectsOnClick?: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    return (
        <Tree.Root>
            <Tree.Folder
                id="f"
                isSelected={isSelected}
                isExpanded={isExpanded}
                onExpandChange={setIsExpanded}
                onClick={selectsOnClick ? () => setIsSelected(true) : undefined}
            >
                <Tree.FolderHeader>
                    <Tree.Label>Folder</Tree.Label>
                </Tree.FolderHeader>
                <Tree.Item id="child">
                    <Tree.Label>Child</Tree.Label>
                </Tree.Item>
            </Tree.Folder>
        </Tree.Root>
    );
};
