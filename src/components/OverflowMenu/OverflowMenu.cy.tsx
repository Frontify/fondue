/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { OverflowMenu } from './OverflowMenu';

const COMPONENT_TEST_ID = '[data-test-id=overflow-menu]';
const ITEM_TEST_ID = '[data-test-id=menu-item]';
const LINK_ITEMS = [
    { label: 'Some first label', link: '/some-first-link' },
    { label: 'Some second label', link: '/some-second-link' },
    { label: 'Some third label', link: '/some-third-link' },
];

describe('OverflowMenu component', () => {
    beforeEach(() => {
        cy.mount(<OverflowMenu items={LINK_ITEMS} />);
        cy.get(COMPONENT_TEST_ID).as('OverflowMenu');
    });

    it('renders the component', () => {
        cy.get('@OverflowMenu').should('be.visible', 1);
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-hidden');
    });

    it('opens the menu and closes the menu', () => {
        cy.get('@OverflowMenu').find('button').eq(0).click();
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-block');
        for (const [index, item] of LINK_ITEMS.entries()) {
            cy.get(ITEM_TEST_ID).eq(index).find('a').should('have.attr', 'href', item.link);
        }
        cy.get('@OverflowMenu').find('button').eq(0).click();
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-hidden');
    });

    it('opens the menu and closes the menu using the keyboard', () => {
        cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-block');
        cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-hidden');
    });

    it('opens the menu, navigates with the keyboard and closes the menu after leaving the items with Tab or Shift+Tab', () => {
        cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-block');
        cy.focused().should('have.attr', 'href', LINK_ITEMS[0].link);
        cy.focused().realPress(['Shift', 'Tab']);
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-hidden');
        cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
        cy.focused().realPress(['ArrowDown']);
        cy.focused().realPress(['ArrowDown']);
        cy.focused().realPress(['Tab']);
        cy.get(COMPONENT_TEST_ID).find('nav').should('have.class', 'tw-hidden');
    });
});
