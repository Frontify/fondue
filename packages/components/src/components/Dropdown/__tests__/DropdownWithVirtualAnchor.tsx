/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { Dropdown } from '../Dropdown';

type DropdownWithVirtualAnchorProps = { left: number; top: number; width: number; height: number };

export const DropdownWithVirtualAnchor = ({ left, top, width, height }: DropdownWithVirtualAnchorProps) => {
    const virtualAnchor = useMemo(
        () => ({ getBoundingClientRect: () => new DOMRect(left, top, width, height) }),
        [left, top, width, height],
    );

    return (
        <Dropdown.Root open virtualAnchor={virtualAnchor}>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
