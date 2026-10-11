/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, type MouseEvent } from 'react';

import { Button } from '#/components/Button/Button';

import { Flyout, type FlyoutVirtualAnchor } from '../Flyout';

type FlyoutWithContextMenuProps = {
    inputTestId: string;
};

export const FlyoutWithContextMenu = ({ inputTestId }: FlyoutWithContextMenuProps) => {
    const [virtualAnchor, setVirtualAnchor] = useState<FlyoutVirtualAnchor>();

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
            <Flyout.Root
                open={virtualAnchor !== undefined}
                onOpenChange={handleOpenChange}
                virtualAnchor={virtualAnchor}
            >
                <Flyout.Content>
                    <Flyout.Body>
                        <Button>Action</Button>
                    </Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        </>
    );
};
