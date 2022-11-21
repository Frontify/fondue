/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import {
    BasicMenuComponent,
    ITEMS,
    ITEMS_WITH_LINKS,
    ITEMS_WITHOUT_ITERACTION,
    NoTriggerMenuComponent,
} from './utils/componentMocks';

const COMPONENT_TEST_ID = '[data-test-id=menu]';
const ITEM_TEST_ID = '[data-test-id=menu-item]';

const verifyButtonItem = (value = 1) => {
    cy.focused().should('have.attr', 'type', 'button');
    cy.focused().realPress('Enter');
    cy.get('@onButtonClick').should('have.been.calledWith', value);
};

const COMPONENT_NAME = 'Menu';
const MENU_SELECTOR = `@${COMPONENT_NAME}`;

describe('Menu component', () => {
    describe('With Links and Trigger', () => {
        beforeEach(() => {
            cy.mount(<BasicMenuComponent items={ITEMS_WITH_LINKS} />);
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
        });

        it('renders the component with links', () => {
            cy.get(MENU_SELECTOR).should('be.visible', 1);
        });

        it('opens the menu and checks if the links are correct', () => {
            cy.get(MENU_SELECTOR).find('button').click();
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index, item] of ITEMS_WITH_LINKS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('a').should('have.attr', 'href', item.link);
            }
        });

        it('navigates using the keyboard', () => {
            cy.get(MENU_SELECTOR).find('button').focus().realPress('Enter');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[2].link);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[2].link);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
            // Close the menu and focus the three dots button and re-open it
            cy.focused().realPress(['Shift', 'Tab']);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
            cy.focused().realPress('Enter');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[2].link);
            // Close the menu
            cy.focused().realPress('Tab');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
        });
    });
    describe('With Buttons and Trigger', () => {
        beforeEach(() => {
            const onClickSpy = cy.spy().as('onButtonClick');
            cy.mount(
                <BasicMenuComponent
                    items={ITEMS.map((item, index) => ({
                        ...item,
                        onClick: () => onClickSpy(index + 1),
                    }))}
                />,
            );
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
        });

        it('renders the component with links', () => {
            cy.get(MENU_SELECTOR).should('be.visible', 1);
        });

        it('opens the menu and checks if the buttons are present and the onClick callback is called', () => {
            cy.get(MENU_SELECTOR).find('button').eq(0).click();
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index] of ITEMS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> button').should('have.length', 1);
                cy.get(ITEM_TEST_ID).eq(index).find('> button').click();
                cy.get('@onButtonClick').should('have.been.calledWith', index + 1);
            }
        });

        it('navigates using the keyboard', () => {
            cy.get(MENU_SELECTOR).find('button').eq(0).focus().realPress('Enter');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
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
            // Close the menu and focus the three dots button and re-open it
            cy.focused().realPress(['Shift', 'Tab']);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
            cy.focused().realPress('Enter');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Tab' });
            verifyButtonItem(2);
            cy.focused().trigger('keydown', { key: 'Tab' });
            verifyButtonItem(3);
            // Close the menu
            cy.focused().realPress('Tab');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
        });

        it('jumps disabled button on keyboard navigation', () => {
            const onClickSpy = cy.spy().as('onButtonClick');
            cy.mount(
                <BasicMenuComponent
                    items={ITEMS.map((item, index) => ({
                        ...item,
                        onClick: () => onClickSpy(index + 1),
                        disabled: index === 1,
                    }))}
                />,
            );
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
            cy.get(MENU_SELECTOR).find('button').eq(0).focus().realPress('Enter');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            verifyButtonItem(3);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            verifyButtonItem(1);
        });

        it('closes the menu when pressing Esc key', () => {
            cy.get(MENU_SELECTOR).find('button').eq(0).focus().realPress('Enter');
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Escape' });
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
        });
    });
    describe('With Spans and Trigger', () => {
        beforeEach(() => {
            cy.mount(<BasicMenuComponent items={ITEMS_WITHOUT_ITERACTION} />);
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
        });

        it('renders the component with links', () => {
            cy.get(MENU_SELECTOR).should('be.visible', 1);
        });

        it('opens the menu and checks if the spans are present', () => {
            cy.get(MENU_SELECTOR).find('button').click();
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index] of ITEMS_WITHOUT_ITERACTION.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> span').should('have.length', 1);
            }
        });
    });

    describe('With Links without Trigger', () => {
        beforeEach(() => {
            cy.mount(<NoTriggerMenuComponent items={ITEMS_WITH_LINKS} />);
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
        });

        it('renders the component with links already open', () => {
            cy.get(MENU_SELECTOR).should('be.visible', 1);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index, item] of ITEMS_WITH_LINKS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('a').should('have.attr', 'href', item.link);
            }
        });

        it('navigates using the keyboard', () => {
            cy.get('body').trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[2].link);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab' });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[2].link);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
            cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
            cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);

            // Keep the menu open
            cy.focused().realPress(['Shift', 'Tab']);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
        });
    });
    describe('With Buttons without Trigger', () => {
        beforeEach(() => {
            const onClickSpy = cy.spy().as('onButtonClick');
            cy.mount(
                <NoTriggerMenuComponent
                    items={ITEMS.map((item, index) => ({
                        ...item,
                        onClick: () => onClickSpy(index + 1),
                    }))}
                />,
            );
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
        });

        it('renders the component with buttons and the onClick callback is called', () => {
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index] of ITEMS.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> button').should('have.length', 1);
                cy.get(ITEM_TEST_ID).eq(index).find('> button').click();
                cy.get('@onButtonClick').should('have.been.calledWith', index + 1);
            }
        });

        it('navigates using the keyboard', () => {
            cy.get('body').trigger('keydown', { key: 'Tab' });
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

            // Keep the menu open
            cy.focused().realPress(['Shift', 'Tab']);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
        });

        it('jumps disabled button on keyboard navigation', () => {
            const onClickSpy = cy.spy().as('onButtonClick');
            cy.mount(
                <NoTriggerMenuComponent
                    items={ITEMS.map((item, index) => ({
                        ...item,
                        onClick: () => onClickSpy(index + 1),
                        disabled: index === 1,
                    }))}
                />,
            );
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            verifyButtonItem(3);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            verifyButtonItem(1);
        });

        it('keeps the menu open when pressing Esc key', () => {
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Escape' });
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
        });
    });

    describe('With Spans without Trigger', () => {
        beforeEach(() => {
            cy.mount(<NoTriggerMenuComponent items={ITEMS_WITHOUT_ITERACTION} />);
            cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);
        });

        it('renders the component with links', () => {
            cy.get(MENU_SELECTOR).should('be.visible', 1);
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index] of ITEMS_WITHOUT_ITERACTION.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> span').should('have.length', 1);
            }
        });
    });
});
