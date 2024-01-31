/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BasicMenuComponent,
    ITEMS,
    ITEMS_WITHOUT_ITERACTION,
    ITEMS_WITH_LINKS,
    Item,
    NoTriggerMenuComponent,
} from './utils/componentMocks';

const COMPONENT_TEST_ID = '[data-test-id=menu-container]';
const ITEM_TEST_ID = '[data-test-id=menu-item]';
const COMPONENT_NAME = 'Menu';
const MENU_SELECTOR = `@${COMPONENT_NAME}`;

const mountMenu = (Component: typeof BasicMenuComponent, items: Item[]) => {
    cy.mount(<Component items={items} />);
    cy.get(COMPONENT_TEST_ID).as(COMPONENT_NAME);

    cy.get(MENU_SELECTOR).should('be.visible', 1);
};

const openMenuWithMouse = () => {
    cy.get(MENU_SELECTOR).find('button').eq(0).click();
    cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
};

const closeMenuWithMouse = (hasTrigger = true, clickOutside = false) => {
    if (hasTrigger && !clickOutside) {
        cy.get(MENU_SELECTOR).find('button').eq(0).click();
    } else {
        cy.get('body').click(0, 0);
    }

    if (hasTrigger) {
        cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
    } else {
        cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
    }
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
        cy.get('body').focus();
    }

    cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
};

const verifyButtonItem = (value = 1) => {
    cy.focused().should('have.attr', 'type', 'button');
    cy.focused().realPress('Enter');
    cy.get('@onButtonClick').should('have.been.calledWith', value);
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

describe('Menu component', () => {
    describe('Basic mouse interaction with non interactive items and a Trigger', () => {
        beforeEach(() => {
            mountMenu(BasicMenuComponent, ITEMS_WITHOUT_ITERACTION);
        });

        it('opens the menu and checks if the spans are present', () => {
            openMenuWithMouse();

            for (const [index] of ITEMS_WITHOUT_ITERACTION.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> span').should('have.length', 1);
            }
        });

        it('opens the menu and close it by clicking on the Trigrer', () => {
            openMenuWithMouse();
            closeMenuWithMouse(true, true);
        });

        it('opens the menu and close it by clicking outside', () => {
            openMenuWithMouse();
            closeMenuWithMouse(true, true);
        });
    });

    describe('Basic mouse interaction with non interactive items without a Trigger', () => {
        beforeEach(() => {
            mountMenu(NoTriggerMenuComponent, ITEMS_WITHOUT_ITERACTION);
        });

        it('renders the component with links', () => {
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-block');
            for (const [index] of ITEMS_WITHOUT_ITERACTION.entries()) {
                cy.get(ITEM_TEST_ID).eq(index).find('> span').should('have.length', 1);
            }
        });

        it('keeps the menu open when clicking outside', () => {
            closeMenuWithMouse(false, true);
        });
    });

    describe('With Links and Trigger', () => {
        beforeEach(() => {
            mountMenu(BasicMenuComponent, ITEMS_WITH_LINKS);
        });

        it('checks if the links are correct', () => {
            openMenuWithMouse();
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
            mountMenu(
                BasicMenuComponent,
                ITEMS.map((item, index) => ({
                    ...item,
                    onClick: () => onClickSpy(index + 1),
                })),
            );
        });

        it('opens the menu and checks if the buttons are present and the onClick callback is called', () => {
            openMenuWithMouse();
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
            mountMenu(
                BasicMenuComponent,
                ITEMS.map((item, index) => ({
                    ...item,
                    onClick: () => onClickSpy(index + 1),
                    disabled: index === 1,
                })),
            );
            openWithKeyboard();

            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'ArrowDown' });
            verifyButtonItem(3);
            cy.focused().trigger('keydown', { key: 'ArrowUp' });
            verifyButtonItem(1);
        });

        it('closes the menu when pressing Esc key', () => {
            openWithKeyboard();

            verifyButtonItem(1);
            cy.focused().trigger('keydown', { key: 'Escape' });
            cy.get(MENU_SELECTOR).find('nav').should('have.class', 'tw-hidden');
        });
    });

    describe('With Links without Trigger', () => {
        beforeEach(() => {
            mountMenu(NoTriggerMenuComponent, ITEMS_WITH_LINKS);
        });

        it('renders the component with links already open', () => {
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
            mountMenu(
                NoTriggerMenuComponent,
                ITEMS.map((item, index) => ({
                    ...item,
                    onClick: () => onClickSpy(index + 1),
                })),
            );
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
});
