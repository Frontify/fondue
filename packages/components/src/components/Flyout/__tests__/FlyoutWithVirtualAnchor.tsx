/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { Flyout } from '../Flyout';

type FlyoutWithVirtualAnchorProps = { left: number; top: number; width: number; height: number };

export const FlyoutWithVirtualAnchor = ({ left, top, width, height }: FlyoutWithVirtualAnchorProps) => {
    const virtualAnchor = useMemo(
        () => ({ getBoundingClientRect: () => new DOMRect(left, top, width, height) }),
        [left, top, width, height],
    );

    return (
        <Flyout.Root open virtualAnchor={virtualAnchor}>
            <Flyout.Content>
                <Flyout.Body>Flyout Body</Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
