/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useRef, useState } from 'react';
import { Menu, MenuProps } from '../Menu';
import { MenuItem } from '@components/MenuItem';
import { Button } from '@components/Button';

export interface Item {
    label: string;
    link?: string;
    onClick?: () => void;
    disabled?: boolean;
}
export const ITEMS: Item[] = [
    { label: 'Button Item 1', onClick: () => void 0 },
    { label: 'Button Item 2', onClick: () => void 0 },
    { label: 'Button Item 3', onClick: () => void 0 },
];

export const ITEMS_WITH_LINKS: Item[] = [
    { label: 'Some first label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some second label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some third label', link: '/?path=/docs/components-menu--docs' },
];

export const ITEMS_WITHOUT_ITERACTION = [{ label: 'Span Item 1' }, { label: 'Span Item 2' }, { label: 'Span Item 3' }];

const getMenuItem = (item: Item, index?: number) => (
    <MenuItem link={item.link} onClick={item.onClick} disabled={item.disabled} key={`item-${index}`}>
        {item.label}
    </MenuItem>
);

export const ComponentStructure = () => (
    <Menu>
        <MenuItem link="/?path=/docs/components-menu--docs">Item 1</MenuItem>
        <MenuItem link="/?path=/docs/components-menu--docs">Item 2</MenuItem>
        <MenuItem link="/?path=/docs/components-menu--docs">Item 3</MenuItem>
    </Menu>
);

export const NoTriggerMenuComponent = (props: MenuProps & { items: Item[] }) => {
    return (
        <div data-test-id="menu-container">
            <Menu {...props}>{props.items.map(getMenuItem)}</Menu>
        </div>
    );
};

export const BasicMenuComponent = (props: MenuProps & { items: Item[] }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const handleOnClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div data-test-id="menu-container">
            <Button ref={triggerRef} onClick={handleTriggerClick}>
                Open menu
            </Button>
            <Menu {...props} triggerRef={triggerRef} open={isMenuOpen} onClose={handleOnClose}>
                {props.items.map(getMenuItem)}
            </Menu>
        </div>
    );
};

const GET_MENU_ITEM_CODE_SNIPPET = `
const getMenuItem = (item: Item, index?: number) => (
    <MenuItem link={item.link} onClick={item.onClick} disabled={item.disabled} key={\`item-\${index}\`}>
        {item.label}
    </MenuItem>
);
`;

const BASIC_MENU_CODE_SNIPPET = `
${GET_MENU_ITEM_CODE_SNIPPET}
export const BasicMenuComponent = (props: MenuProps & { items: Item[] }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const handleOnClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div data-test-id="menu-container">
            <Button ref={triggerRef} onClick={handleTriggerClick}>
                Open menu
            </Button>
            <Menu {...props} triggerRef={triggerRef} open={isMenuOpen} onClose={handleOnClose}>
                {props.items.map(getMenuItem)}
            </Menu>
        </div>
    );
};
`;
export const BASIC_MENU_WITH_ONCLICK_CODE_SNIPPET = `
${BASIC_MENU_CODE_SNIPPET}
// Usage Example

<BasicMenuComponent
    items={[
    { label: 'Button Item 1', onClick: () => void 0 },
    { label: 'Button Item 2', onClick: () => void 0 },
    { label: 'Button Item 3', onClick: () => void 0 },
  ]}
/>
`;

export const BASIC_MENU_WITH_LINKS_CODE_SNIPPET = `
${BASIC_MENU_CODE_SNIPPET}
// Usage Example

<BasicMenuComponent
    items={[
    { label: 'Some first label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some second label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some third label', link: '/?path=/docs/components-menu--docs' },
  ]}
/>
`;

export const COMPONENT_STRUCTURE_CODE_SNIPPET = `
<Menu>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 1</MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 2</MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 3</MenuItem>
</Menu>
`;
