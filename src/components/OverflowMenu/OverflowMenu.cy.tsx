/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { OverflowMenu } from './OverflowMenu';

const COMPONENT_TEST_ID = '[data-test-id=overflow-menu]';
const ITEM_TEST_ID = '[data-test-id=overflow-menu-item]';
const ITEMS_LINKS = [
    { label: 'Some first label', link: '/some-first-link' },
    { label: 'Some second label', link: '/some-second-link' },
    { label: 'Some third label', link: '/some-third-link' },
];

describe('OverflowMenu component', () => {
    describe('With Links', () => {
        beforeEach(() => {
            cy.mount(<OverflowMenu items={ITEMS_LINKS} />);
            cy.get(COMPONENT_TEST_ID).as('OverflowMenu');
        });

        it('renders the component with links', () => {
            cy.get('@OverflowMenu').should('be.visible', 1);
        });

        it('opens the menu and checks if the links are correct', () => {
            cy.get('@OverflowMenu').find('button').click();
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            ITEMS_LINKS.forEach((item, index) => {
                cy.get(ITEM_TEST_ID).eq(index).find('a').should('have.attr', 'href', item.link);
            });
        });
    });
});
