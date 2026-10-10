/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useRef } from 'react';

import { Dropdown } from '../Dropdown';

type DropdownWithScrollingAnchorProps = {
    scrollContainerTestId: string;
    anchorTestId: string;
};

export const DropdownWithScrollingAnchor = ({
    scrollContainerTestId,
    anchorTestId,
}: DropdownWithScrollingAnchorProps) => {
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
            <Dropdown.Root open virtualAnchor={virtualAnchor}>
                <Dropdown.Content>
                    <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
        </>
    );
};
