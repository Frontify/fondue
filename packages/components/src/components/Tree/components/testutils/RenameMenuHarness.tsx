/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, type MouseEvent } from 'react';

import { Dropdown } from '#/components/Dropdown/Dropdown';
import { Tooltip } from '#/components/Tooltip/Tooltip';

import { Tree } from '../../Tree';

/**
 * Row 1 renames while row 2 holds a controlled Dropdown whose trigger toggles from `onClick` inside a
 * Tooltip trigger, the way consumers build row action menus.
 */
export const RenameMenuHarness = ({ onRename }: { onRename: (newName: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <Tree.Root>
            <Tree.Item id="1" isRenaming onRename={onRename}>
                <Tree.Label>Document</Tree.Label>
            </Tree.Item>
            <Tree.Item id="2">
                <Tree.Label>Other</Tree.Label>
                <Tree.Action>
                    <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
                        <Tooltip.Root enterDelay={300}>
                            <Dropdown.Trigger asChild>
                                <Tooltip.Trigger asChild>
                                    <button type="button" onClick={handleClick}>
                                        Other actions
                                    </button>
                                </Tooltip.Trigger>
                            </Dropdown.Trigger>
                            <Tooltip.Content>Other actions</Tooltip.Content>
                        </Tooltip.Root>
                        <Dropdown.Content preventTriggerFocusOnClose>
                            <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Tree.Action>
            </Tree.Item>
        </Tree.Root>
    );
};
