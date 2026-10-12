/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Button } from '#/components/Button/Button';

import { Flyout } from '../Flyout';

type FlyoutWithCustomContainerProps = {
    containerTestId: string;
    contentTestId: string;
};

export const FlyoutWithCustomContainer = ({ containerTestId, contentTestId }: FlyoutWithCustomContainerProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <>
            <div ref={setContainer} data-test-id={containerTestId} />
            {container ? (
                <Flyout.Root open>
                    <Flyout.Trigger>
                        <Button>Flyout Trigger</Button>
                    </Flyout.Trigger>
                    <Flyout.Content container={container} data-test-id={contentTestId}>
                        <Flyout.Body>Flyout Body</Flyout.Body>
                    </Flyout.Content>
                </Flyout.Root>
            ) : null}
        </>
    );
};
