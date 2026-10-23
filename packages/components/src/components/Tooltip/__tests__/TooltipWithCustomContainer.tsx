/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Tooltip } from '../Tooltip';

type TooltipWithCustomContainerProps = {
    containerTestId: string;
    contentTestId: string;
};

export const TooltipWithCustomContainer = ({ containerTestId, contentTestId }: TooltipWithCustomContainerProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <>
            <div ref={setContainer} data-test-id={containerTestId} />
            {container ? (
                <Tooltip.Root open>
                    <Tooltip.Trigger>Tooltip Trigger</Tooltip.Trigger>
                    <Tooltip.Content container={container} data-test-id={contentTestId}>
                        Tooltip Content
                    </Tooltip.Content>
                </Tooltip.Root>
            ) : null}
        </>
    );
};
