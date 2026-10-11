/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useRef } from 'react';

import { Flyout } from '../Flyout';

type FlyoutWithScrollingAnchorProps = {
    scrollContainerTestId: string;
    anchorTestId: string;
};

export const FlyoutWithScrollingAnchor = ({ scrollContainerTestId, anchorTestId }: FlyoutWithScrollingAnchorProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const virtualAnchor = useMemo(
        () => ({ getBoundingClientRect: () => anchorRef.current?.getBoundingClientRect() ?? new DOMRect() }),
        [],
    );

    return (
        <>
            <div data-test-id={scrollContainerTestId} style={{ height: 200, overflow: 'auto' }}>
                <div style={{ height: 1000, paddingTop: 100 }}>
                    <div ref={anchorRef} data-test-id={anchorTestId} style={{ width: 40, height: 20 }} />
                </div>
            </div>
            <Flyout.Root open virtualAnchor={virtualAnchor}>
                <Flyout.Content>
                    <Flyout.Body>Flyout Body</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        </>
    );
};
