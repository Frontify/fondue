/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectGroupItem } from '@components/SelectGroupItem/SelectGroupItem';
import { Select } from './Select';
import { SelectItem, SelectItemProps } from '@components/SelectItem/SelectItem';

const SELECT_ID = '[data-test-id=fondue-select]';
const SELECT_MENU_ID = '[data-test-id=fondue-select-menu]';
const SELECT_GROUP_ID = '[data-test-id=fondue-select-group]';
const SELECT_ITEM_ID = '[data-test-id=fondue-select-item]';

const ITEMS: SelectItemProps[] = [
    { id: '1', value: 'value1' },
    { id: '2', value: 'value2' },
    { id: '3', value: 'value3' },
    { id: '4', value: 'value4' },
];

const ITEMS_2: SelectItemProps[] = [
    { id: '5', value: 'value5' },
    { id: '6', value: 'value6' },
    { id: '7', value: 'value7' },
];

const BASE_GROUP_COMPONENT = (
    <SelectGroupItem>
        {ITEMS.map((item) => (
            <SelectItem key={`${item.id}-key`} id={item.id} value={item.value} />
        ))}
    </SelectGroupItem>
);

const BASE_GROUP_2_COMPONENT = (
    <SelectGroupItem groupTitle="Group 2">
        {ITEMS_2.map((item) => (
            <SelectItem key={`${item.id}-key`} id={item.id} value={item.value} />
        ))}
    </SelectGroupItem>
);

describe('Select Component', () => {
    it('should render component', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).should('exist');
    });

    it('toggle button should be visible', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).should('be.visible');
    });

    it('toggle button clicks render menu and unmounts menu', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_MENU_ID).should('not.exist');
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_MENU_ID).as('DropdownMenu');
        cy.get('@DropdownMenu').should('be.exist');
        cy.get(SELECT_ID).realClick();
        cy.get('@DropdownMenu').should('not.exist');
    });

    it('toggle button click and menu should be visible', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_MENU_ID).should('be.visible');
    });

    it('toggle button click and menu should be visible', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_MENU_ID).should('be.visible');
    });

    it('menu should have correct number of children', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_GROUP_ID).first().children().should('have.length', ITEMS.length);
    });

    it('should render focus on mount', () => {
        cy.mount(<Select focusOnMount={true}>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).should('have.class', 'tw-ring-blue');
    });

    it('should render menu open on mount', () => {
        cy.mount(<Select open={true}>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).should('have.attr', 'aria-expanded').and('eq', 'true');
        cy.get(SELECT_MENU_ID).should('be.visible');
    });

    it('should focus toggle button with keyboard tab press', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.realPress('Tab');
        cy.get(SELECT_ID).should('have.class', 'tw-ring-blue');
    });

    it('should focus first item with keyboard tab press sequence', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.realPress('Tab');
        cy.get(SELECT_ID).realPress('{enter}').realPress('{downarrow}');
        cy.get(SELECT_GROUP_ID).first().children().should('have.class', 'tw-ring-blue');
    });

    it('should call onChange callback once on change', () => {
        const onChangeStub = cy.stub().as('onChange');
        cy.mount(<Select onChange={onChangeStub}>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_GROUP_ID).realMouseMove(0, 40).realMouseMove(40, 0).realClick();
        cy.get('@onChange').should('have.been.calledOnce');
    });

    it('should set the selected value as the displayed value', () => {
        const onChangeStub = cy.stub().as('onChange');
        cy.mount(<Select onChange={onChangeStub}>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_GROUP_ID).realMouseMove(0, 40).realMouseMove(40, 0).realClick();
        cy.get(SELECT_ID).find('span').children().first().should('have.text', ITEMS[2].value);
    });

    it('should render all items', () => {
        cy.mount(<Select>{BASE_GROUP_COMPONENT}</Select>);
        cy.get(SELECT_ID).realClick();
        cy.get(SELECT_ITEM_ID).should('have.length', ITEMS.length);
    });

    describe('should render multiple select groups', () => {
        it('should render two select groups', () => {
            cy.mount(
                <Select>
                    {BASE_GROUP_COMPONENT}
                    {BASE_GROUP_2_COMPONENT}
                </Select>,
            );
            cy.get(SELECT_ID).realClick();
            cy.get(SELECT_MENU_ID).find('ul').should('have.length', 2);
        });

        it('should render the first group with out a title', () => {
            cy.mount(
                <Select>
                    {BASE_GROUP_COMPONENT}
                    {BASE_GROUP_2_COMPONENT}
                </Select>,
            );
            cy.get(SELECT_ID).realClick();
            cy.get(SELECT_MENU_ID).find('ul').first().should('not.have.attr', 'title');
        });

        it('should render the second group with a title', () => {
            cy.mount(
                <Select>
                    {BASE_GROUP_COMPONENT}
                    {BASE_GROUP_2_COMPONENT}
                </Select>,
            );
            cy.get(SELECT_ID).realClick();
            cy.get(SELECT_MENU_ID).find('ul').last().should('have.attr', 'title').and('eq', 'Group 2');
        });

        it('should render the first group with correct number of items', () => {
            cy.mount(
                <Select>
                    {BASE_GROUP_COMPONENT}
                    {BASE_GROUP_2_COMPONENT}
                </Select>,
            );
            cy.get(SELECT_ID).realClick();
            cy.get(SELECT_MENU_ID).find('ul').first().children().should('have.length', ITEMS.length);
        });

        it('should render the second group with correct number of items', () => {
            cy.mount(
                <Select>
                    {BASE_GROUP_COMPONENT}
                    {BASE_GROUP_2_COMPONENT}
                </Select>,
            );
            cy.get(SELECT_ID).realClick();
            cy.get(SELECT_MENU_ID).find('ul').last().children().should('have.length', ITEMS_2.length);
        });

        it('should render all items in both groups', () => {
            cy.mount(
                <Select>
                    {BASE_GROUP_COMPONENT}
                    {BASE_GROUP_2_COMPONENT}
                </Select>,
            );
            cy.get(SELECT_ID).realClick();
            cy.get(SELECT_ITEM_ID).should('have.length', ITEMS.length + ITEMS_2.length);
        });
    });
});
