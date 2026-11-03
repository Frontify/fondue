/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Tree } from '../../Tree';

/** Single-select folder with controlled expansion and a selection the consumer derives elsewhere and never takes from a click. */
export const ControlledExpansionHarness = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Tree.Root>
            <Tree.Folder id="f" isSelected={false} isExpanded={isExpanded} onExpandChange={setIsExpanded}>
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
