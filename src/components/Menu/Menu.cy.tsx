/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import {
    BasicMenuComponent,
    ITEMS,
    ITEMS_WITHOUT_ITERACTION,
    ITEMS_WITH_LINKS,
    NoTriggerMenuComponent,
} from './utils/componentMocks';

const COMPONENT_TEST_ID = '[data-test-id=menu]';
const ITEM_TEST_ID = '[data-test-id=menu-item]';

const verifyButtonItem = (value = 1) => {
    cy.focused().should('have.attr', 'type', 'button');
    cy.focused().realPress('Enter');
    cy.get('@onButtonClick').should('have.been.calledWith', value);
};

/**
 *
 * @param keys we must use any here since cypress does not export the KeyOrShortcut type
 */
const closeMenuWithKeyboard = (keys: any, hasTrigger = true) => {
    // Close the menu
    if (hasTrigger) {
        cy.focused().realPress(keys);
        cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
    } else {
        cy.get('body').trigger('keydown', { key: 'Tab', shiftKey: keys.includes('Shift') });
        cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
    }
};

const openWithKeyboard = (hasTrigger = true) => {
    if (hasTrigger) {
        cy.get(MENU_SELECTOR).find('button').eq(0).focus().realPress('Enter');
    } else {
        cy.get('body').trigger('keydown', { key: 'Tab' });
    }

    cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
};

const linkItemsKeyboardNavigation = (hasTrigger = true) => {
    openWithKeyboard(hasTrigger);

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

    closeMenuWithKeyboard(['Shift', 'Tab'], hasTrigger);
    openWithKeyboard(hasTrigger);

    cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[0].link);
    cy.focused().trigger('keydown', { key: 'Tab' });
    cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[1].link);
    cy.focused().trigger('keydown', { key: 'Tab' });
    cy.focused().should('have.attr', 'href', ITEMS_WITH_LINKS[2].link);

    closeMenuWithKeyboard(['Tab'], hasTrigger);
};

const buttonItemsKeyboardNavigation = (hasTrigger = true) => {
    openWithKeyboard(hasTrigger);
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

    closeMenuWithKeyboard(['Shift', 'Tab'], hasTrigger);
    openWithKeyboard(hasTrigger);

    verifyButtonItem(1);
    cy.focused().trigger('keydown', { key: 'Tab' });
    verifyButtonItem(2);
    cy.focused().trigger('keydown', { key: 'Tab' });
    verifyButtonItem(3);

    closeMenuWithKeyboard(['Tab'], hasTrigger);
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
            linkItemsKeyboardNavigation();
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
            buttonItemsKeyboardNavigation();
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
            linkItemsKeyboardNavigation(false);
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
            buttonItemsKeyboardNavigation(false);
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
