/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { Dropdown } from '../Dropdown';

type DropdownWithVirtualAnchorProps = {
    left: number;
    top: number;
    width: number;
    height: number;
    open?: boolean;
    forceMount?: boolean;
};

export const DropdownWithVirtualAnchor = ({
    left,
    top,
    width,
    height,
    open = true,
    forceMount = false,
}: DropdownWithVirtualAnchorProps) => {
    const virtualAnchor = useMemo(
        () => ({ getBoundingClientRect: () => new DOMRect(left, top, width, height) }),
        [left, top, width, height],
    );

    return (
        <Dropdown.Root open={open} virtualAnchor={virtualAnchor}>
            <Dropdown.Content forceMount={forceMount}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
