/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, type MouseEvent } from 'react';

import { Dropdown, type DropdownVirtualAnchor } from '../Dropdown';

type DropdownWithContextMenuProps = {
    inputTestId: string;
    ariaLabel?: string;
};

export const DropdownWithContextMenu = ({ inputTestId, ariaLabel }: DropdownWithContextMenuProps) => {
    const [virtualAnchor, setVirtualAnchor] = useState<DropdownVirtualAnchor>();

    const handleContextMenu = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        const rect = new DOMRect(event.clientX, event.clientY, 0, 0);
        setVirtualAnchor({ getBoundingClientRect: () => rect });
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setVirtualAnchor(undefined);
        }
    };

    return (
        <>
            <input aria-label="Text" data-test-id={inputTestId} onContextMenu={handleContextMenu} />
            <Dropdown.Root
                open={virtualAnchor !== undefined}
                onOpenChange={handleOpenChange}
                virtualAnchor={virtualAnchor}
            >
                <Dropdown.Content aria-label={ariaLabel}>
                    <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
        </>
    );
};
