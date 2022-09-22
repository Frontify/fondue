/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { OverflowMenu } from './OverflowMenu';

const COMPONENT_TEST_ID = '[data-test-id=overflow-menu]';
const ITEM_TEST_ID = '[data-test-id=overflow-menu-item]';
const LINK_ITEMS = [
    { label: 'Some first label', link: '/some-first-link' },
    { label: 'Some second label', link: '/some-second-link' },
    { label: 'Some third label', link: '/some-third-link' },
];
const BUTTON_ITEMS = [
    { label: 'Button Item 1', onClick: () => void 0 },
    { label: 'Button Item 2', onClick: () => void 0 },
    { label: 'Button Item 3', onClick: () => void 0 },
];

const SPAN_ITEMS = [{ label: 'Span Item 1' }, { label: 'Span Item 2' }, { label: 'Span Item 3' }];

const verifyButtonItem = (value = 1) => {
    cy.focused().should('have.attr', 'type', 'button');
    cy.focused().realPress('Enter');
    cy.get('@onButtonClick').should('have.been.calledWith', value);
};

describe('OverflowMenu component', () => {
    describe('With Links', () => {
        beforeEach(() => {
            cy.mount(<OverflowMenu items={LINK_ITEMS} />);
            cy.get(COMPONENT_TEST_ID).as('OverflowMenu');
        });

        it('renders the component with links', () => {
            cy.get('@OverflowMenu').should('be.visible', 1);
        });

        it('opens the menu and checks if the links are correct', () => {
            cy.get('@OverflowMenu').find('button').click();
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            for (const [index, item] of LINK_ITEMS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('a').should('have.attr', 'href', item.link);
            }
        });

        it('navigates using the keyboard', () => {
            cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            cy.focused().should('have.attr', 'href', LINK_ITEMS[0].link);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[1].link);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[2].link);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[1].link);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[0].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[2].link);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[0].link);
            // Close the overflow menu and focus the three dots button and re-open it
            cy.focused().realPress(['Shift', 'Tab']);
            cy.get(ITEM_TEST_ID).should('have.length', 0);
            cy.focused().realPress('Enter');
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            cy.focused().should('have.attr', 'href', LINK_ITEMS[0].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', LINK_ITEMS[2].link);
            // Close the overflow menu
            cy.focused().realPress('Tab');
            cy.get(ITEM_TEST_ID).should('have.length', 0);
        });
    });
    describe('With Buttons', () => {
        beforeEach(() => {
            const onClickSpy = cy.spy().as('onButtonClick');
            cy.mount(
                <OverflowMenu
                    items={BUTTON_ITEMS.map((item, index) => ({
                        ...item,
                        onClick: () => onClickSpy(index + 1),
                    }))}
                />,
            );
            cy.get(COMPONENT_TEST_ID).as('OverflowMenu');
        });

        it('renders the component with links', () => {
            cy.get('@OverflowMenu').should('be.visible', 1);
        });

        it('opens the menu and checks if the buttons are present and the onClick callback is called', () => {
            cy.get('@OverflowMenu').find('button').click();
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            for (const [index] of BUTTON_ITEMS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> button').should('have.length', 1);
                cy.get(ITEM_TEST_ID).eq(index).find('> button').click();
                cy.get('@onButtonClick').should('have.been.calledWith', index + 1);
            }
        });

        it('navigates using the keyboard', () => {
            cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            verifyButtonItem(2);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            verifyButtonItem(3);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            verifyButtonItem(2);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Tab' });
            verifyButtonItem(2);
            cy.focused().trigger('keydown', { key: 'Tab' });
            verifyButtonItem(3);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            verifyButtonItem(2);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            verifyButtonItem(1);
            // Close the overflow menu and focus the three dots button and re-open it
            cy.focused().realPress(['Shift', 'Tab']);
            cy.get(ITEM_TEST_ID).should('have.length', 0);
            cy.focused().realPress('Enter');
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Tab' });
            verifyButtonItem(2);
            cy.focused().trigger('keydown', { key: 'Tab' });
            verifyButtonItem(3);
            // Close the overflow menu
            cy.focused().realPress('Tab');
            cy.get(ITEM_TEST_ID).should('have.length', 0);
        });
        it('jumps disabled button on keyboard navigation', () => {
            const onClickSpy = cy.spy().as('onButtonClick');
            cy.mount(
                <OverflowMenu
                    items={BUTTON_ITEMS.map((item, index) => ({
                        ...item,
                        onClick: () => onClickSpy(index + 1),
                        disabled: index === 1,
                    }))}
                />,
            );
            cy.get(COMPONENT_TEST_ID).as('OverflowMenu');
            cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            verifyButtonItem(3);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            verifyButtonItem(1);
        });
        it('closes the menu when pressing Esc key', () => {
            cy.get('@OverflowMenu').find('button').focus().realPress('Enter');
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Escape' });
            cy.get(ITEM_TEST_ID).should('have.length', 0);
        });
    });
    describe('With Spans', () => {
        beforeEach(() => {
            cy.mount(<OverflowMenu items={SPAN_ITEMS} />);
            cy.get(COMPONENT_TEST_ID).as('OverflowMenu');
        });

        it('renders the component with links', () => {
            cy.get('@OverflowMenu').should('be.visible', 1);
        });

        it('opens the menu and checks if the spans are present', () => {
            cy.get('@OverflowMenu').find('button').click();
            cy.get(ITEM_TEST_ID).should('have.length', 3);
            for (const [index] of SPAN_ITEMS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> span').should('have.length', 1);
            }
        });
    });
});
