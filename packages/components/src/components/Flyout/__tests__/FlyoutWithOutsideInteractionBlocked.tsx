/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Button } from '#/components/Button/Button';

import { Flyout } from '../Flyout';

type FlyoutWithOutsideInteractionBlockedProps = {
    blockedCountTestId: string;
};

export const FlyoutWithOutsideInteractionBlocked = ({
    blockedCountTestId,
}: FlyoutWithOutsideInteractionBlockedProps) => {
    const [blockedCount, setBlockedCount] = useState(0);

    return (
        <>
            <span data-test-id={blockedCountTestId}>{blockedCount}</span>
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Flyout Trigger</Button>
                </Flyout.Trigger>
                <Flyout.Content
                    onInteractOutside={(event) => {
                        event.preventDefault();
                        setBlockedCount((count) => count + 1);
                    }}
                >
                    <Flyout.Body>Flyout Body</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        </>
    );
};
