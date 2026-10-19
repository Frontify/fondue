/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Dialog } from '../Dialog';

type DialogWithCustomContainerProps = {
    containerTestId: string;
    contentTestId: string;
};

export const DialogWithCustomContainer = ({ containerTestId, contentTestId }: DialogWithCustomContainerProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <>
            <div ref={setContainer} data-test-id={containerTestId} />
            {container ? (
                <Dialog.Root open>
                    <Dialog.Content container={container} data-test-id={contentTestId}>
                        <Dialog.Body>Dialog Body</Dialog.Body>
                    </Dialog.Content>
                </Dialog.Root>
            ) : null}
        </>
    );
};
