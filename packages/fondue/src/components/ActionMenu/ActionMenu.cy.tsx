/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, useState } from 'react';

import { MenuItemContentSize } from '@components/MenuItem';

import { ActionMenu } from './ActionMenu';

const MENU_ITEM_ID = '[data-test-id=menu-item]';
const MENU_BLOCK_DIVIDER = '[data-test-id=menu-block-divider]';
const MENU_ITEM_LIST_ID = '[data-test-id=menu-item-list]';

const MENU_BLOCKS = [
    {
        id: 'small-block-1',
        menuItems: [
            {
                id: 'small1',
                title: 'Small first',
                size: MenuItemContentSize.Small,
                onClick: () => console.log('click'),
            },
            {
                id: 'small2',
                title: 'Small second',
                size: MenuItemContentSize.Small,
                onClick: () => console.log('click'),
            },
        ],
    },
    {
        id: 'small-block-2',
        menuItems: [
            {
                id: 'small3',
                title: 'Small third',
                size: MenuItemContentSize.Small,
                onClick: () => console.log('click'),
            },
            {
                id: 'small4',
                title: 'Small fourth',
                size: MenuItemContentSize.Small,
                onClick: () => console.log('click'),
            },
        ],
    },
];

const TestComponent = (): ReactElement => {
    const [menuBlocks, setMenuBlocks] = useState(MENU_BLOCKS);

    const addBlock = () =>
        setMenuBlocks([
            ...menuBlocks,
            {
                id: 'small-block-4',
                menuItems: [
                    {
                        id: 'small5',
                        title: 'Small first',
                        size: MenuItemContentSize.Small,
                        onClick: () => console.log('click'),
                    },
                    {
                        id: 'small6',
                        title: 'Small second',
                        size: MenuItemContentSize.Small,
                        onClick: () => console.log('click'),
                    },
                ],
            },
        ]);

    return (
        <div>
            <ActionMenu menuBlocks={menuBlocks} />
            <button data-test-id="add-block-button" onClick={addBlock}>
                Add Block
            </button>
        </div>
    );
};

describe('ActionMenu Component', () => {
    it('renders action menu with divider', () => {
        const onClickStub = cy.stub().as('onClickStub');
        const menuBlocks = MENU_BLOCKS.map((block) => ({
            ...block,
            menuItems: block.menuItems.map((item) => ({
                ...item,
                onClick: onClickStub,
            })),
        }));

        cy.mount(<ActionMenu menuBlocks={menuBlocks} />);

        cy.get(MENU_ITEM_LIST_ID).should('have.length', 2);
        cy.get(MENU_BLOCK_DIVIDER).should('have.length', 2);
        cy.get('@onClickStub').should('not.be.called');
        cy.get(MENU_ITEM_ID).first().click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('renders action menu with dynamic items', () => {
        cy.mount(<TestComponent />);

        cy.get(MENU_ITEM_LIST_ID).should('have.length', 2);

        cy.get('[data-test-id="add-block-button"]').first().click();
        cy.get(MENU_ITEM_LIST_ID).should('have.length', 3);
    });

    it('should fire both onClick events when touch-to-click is used', () => {
        const onClickStub = cy.stub().as('onClickStub');
        const menuOnClickStub = cy.stub().as('menuOnClickStub');

        const menuBlocks = MENU_BLOCKS.map((block) => ({
            ...block,
            menuItems: block.menuItems.map((item) => ({
                ...item,
                onClick: onClickStub,
            })),
        }));

        cy.mount(<ActionMenu menuBlocks={menuBlocks} onClick={menuOnClickStub} />);

        cy.get('@onClickStub').should('not.be.called');
        // Cypress .click() triggers other events that are not reflected by touch-to-click.
        cy.get(MENU_ITEM_ID).then(($item) => {
            $item[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        cy.get('@onClickStub').should('be.calledOnce');
        cy.get('@menuOnClickStub').should('be.calledOnce');
    });
});
