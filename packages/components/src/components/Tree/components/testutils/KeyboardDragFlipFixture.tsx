/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Tree } from '../../Tree';

/** Mounts reorderable, then turns it off without remounting the tree. */
export const KeyboardDragFlipFixture = () => {
    const [reorderable, setReorderable] = useState(true);
    return (
        <div>
            <button type="button" onClick={() => setReorderable(false)}>
                Stop reorder
            </button>
            <Tree.Root reorderable={reorderable}>
                <Tree.Item id="A" isSelected>
                    <Tree.Label>A</Tree.Label>
                </Tree.Item>
                <Tree.Item id="B">
                    <Tree.Label>B</Tree.Label>
                </Tree.Item>
                <Tree.Item id="C">
                    <Tree.Label>C</Tree.Label>
                </Tree.Item>
            </Tree.Root>
        </div>
    );
};
