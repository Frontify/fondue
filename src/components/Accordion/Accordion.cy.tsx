/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@components/TextInput/TextInput';
import { IconIcon } from '@foundation/Icon/Generated';
import { ReactElement, useState } from 'react';
import { AccordionHeaderProps } from '.';
import { Accordion, AccordionItem } from './Accordion';

const ACCORDION_ID = '[data-test-id=fondue-accordion]';
const ACCORDION_ITEM_ID = '[data-test-id=fondue-accordion-item]';
const ACCORDION_ITEM_CONTENT_ID = '[data-test-id="collapsible-wrap"]';
const TEXT_INPUT_ID = '[data-test-id=text-input]';
const TEST_HEADER_ID = '[data-test-id="test-header"]';

const itemClasses = ['tw-divide-y tw-divide-black-10'];
const accordionWithBorderClasses = ['tw-border-b', 'tw-border-t', 'tw-border-black-10'];
const accordionWithDividerClasses = ['tw-divide-y tw-divide-black-10'];

const TestHeader = ({ isOpen, disabled, children }: AccordionHeaderProps): ReactElement => (
    <div data-test-id="test-header" data-state={isOpen ? 'open' : 'closed'} data-disabled={disabled}>
        {children}
    </div>
);

describe('Accordion Component', () => {
    it('should not render any item', () => {
        cy.mount(
            <Accordion>
                <div data-test-id="invalid-item">Invalid Item</div>
            </Accordion>,
        );
        cy.get(ACCORDION_ITEM_CONTENT_ID).should('not.exist');
        cy.get('[data-test-id=invalid-item]').should('not.exist');
    });

    it('should render 3 items', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
                <AccordionItem header={{ children: '2' }}>2</AccordionItem>
                <AccordionItem header={{ children: '3' }}>2</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_ID).should('have.length', 3);
    });

    it('should open item 2', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
                <AccordionItem header={{ children: '2' }}>2</AccordionItem>
                <AccordionItem header={{ children: '3' }}>3</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_CONTENT_ID).should('not.exist');
        cy.get(ACCORDION_ITEM_ID).eq(1).click();
        cy.get(ACCORDION_ITEM_CONTENT_ID).should('exist');
    });

    it('should call header action', () => {
        const onClickStub = cy.stub().as('onClickStub');
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1', decorator: <IconIcon /> }}>1</AccordionItem>
                <AccordionItem header={{ children: '2' }}>2</AccordionItem>
                <AccordionItem header={{ children: '3', onClick: onClickStub }} />
            </Accordion>,
        );

        cy.get('@onClickStub').should('not.be.called');
        cy.get(ACCORDION_ITEM_ID).eq(2).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('should not have any open section by defaut', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
                <AccordionItem header={{ children: '2' }}>2</AccordionItem>
                <AccordionItem header={{ children: '3' }}>3</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_ID).should('have.length', 3);
        cy.get(ACCORDION_ITEM_CONTENT_ID).should('have.length', 0);
    });

    it('allows multiple sections to be open by default', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
                <AccordionItem header={{ children: '2', active: true }}>2</AccordionItem>
                <AccordionItem header={{ children: '3', active: true }}>3</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_ID).should('have.length', 3);
        cy.get(ACCORDION_ITEM_CONTENT_ID).should('have.length', 2);
        cy.get(ACCORDION_ITEM_ID).eq(0).siblings(ACCORDION_ITEM_CONTENT_ID).should('not.exist');
        cy.get(ACCORDION_ITEM_ID).eq(1).siblings(ACCORDION_ITEM_CONTENT_ID).should('exist');
        cy.get(ACCORDION_ITEM_ID).eq(2).siblings(ACCORDION_ITEM_CONTENT_ID).should('exist');
    });

    it('renders a custom header component', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }} headerComponent={TestHeader}>
                    1
                </AccordionItem>
                <AccordionItem header={{ children: '2', disabled: true }} headerComponent={TestHeader}>
                    2
                </AccordionItem>
                <AccordionItem header={{ children: '3', active: true }} headerComponent={TestHeader}>
                    3
                </AccordionItem>
            </Accordion>,
        );

        cy.get(TEST_HEADER_ID).should('have.length', 3);
        cy.get(TEST_HEADER_ID).first().should('have.text', '1');
        cy.get(TEST_HEADER_ID).eq(1).invoke('data', 'disabled').should('be.true');
        cy.get(TEST_HEADER_ID).eq(2).invoke('data', 'state').should('equal', 'open');
    });

    it('shows dividers when divider prop is set to true', () => {
        cy.mount(
            <Accordion divider>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
            </Accordion>,
        );

        cy.wrap(accordionWithDividerClasses).each(($class) => {
            cy.get(ACCORDION_ID).should('have.class', $class);
        });
    });

    it('does not show dividers between items when divider prop is set to false', () => {
        cy.mount(
            <Accordion divider={false}>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
            </Accordion>,
        );

        cy.wrap(accordionWithDividerClasses).each(($class) => {
            cy.get(ACCORDION_ID).should('not.have.class', $class);
        });
    });

    it('shows borders when border prop is set to true', () => {
        cy.mount(
            <Accordion border>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
            </Accordion>,
        );

        cy.wrap(accordionWithBorderClasses).each(($class) => {
            cy.get(ACCORDION_ID).should('have.class', $class);
        });
    });

    it('does not show borders when border prop is set to false', () => {
        cy.mount(
            <Accordion border={false}>
                <AccordionItem header={{ children: '1' }}>1</AccordionItem>
            </Accordion>,
        );

        cy.wrap(accordionWithBorderClasses).each(($class) => {
            cy.get(ACCORDION_ID).should('not.have.class', $class);
        });
    });

    it('shows divider on AccordionItem', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }} divider={true}>
                    1
                </AccordionItem>
            </Accordion>,
        );

        cy.wrap(itemClasses).each(($class) => {
            cy.get(ACCORDION_ITEM_ID).parent().should('have.class', $class);
        });
    });

    it('hides divider on AccordionItem', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }} divider={false}>
                    1
                </AccordionItem>
            </Accordion>,
        );

        cy.wrap(itemClasses).each(($class) => {
            cy.get(ACCORDION_ITEM_ID).parent().should('not.have.class', $class);
        });
    });

    it('should correctly navigate with keyboard', () => {
        cy.mount(
            <Accordion>
                <AccordionItem header={{ children: '1' }}>
                    <TextInput />
                </AccordionItem>
                <AccordionItem header={{ children: '2' }}>
                    <TextInput />
                </AccordionItem>
                <AccordionItem header={{ children: '3' }}>3</AccordionItem>
            </Accordion>,
        );

        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(ACCORDION_ITEM_ID).first().should('be.focused');
        cy.get(TEXT_INPUT_ID).should('not.exist');
        cy.get(ACCORDION_ITEM_ID).first().type('{enter}');
        cy.get(TEXT_INPUT_ID).should('not.be.focused');
        cy.get(ACCORDION_ITEM_ID).first().realPress('Tab');
        cy.get(TEXT_INPUT_ID).should('be.focused');
        cy.get(TEXT_INPUT_ID).realPress('Tab');
        cy.get(TEXT_INPUT_ID).should('not.be.focused');
        cy.get(ACCORDION_ITEM_ID).eq(1).should('be.focused');
        cy.get(ACCORDION_ITEM_ID).eq(1).type('{enter}');
        cy.get(ACCORDION_ITEM_ID).eq(1).realPress('Tab');
        cy.get(TEXT_INPUT_ID).eq(1).should('be.focused');
        cy.get(TEXT_INPUT_ID).eq(1).realPress('ArrowDown');
        cy.get(TEXT_INPUT_ID).eq(1).should('be.focused');
        cy.get(TEXT_INPUT_ID).eq(1).realPress('Tab');
        cy.get(ACCORDION_ITEM_ID).eq(1).should('not.be.focused');
        cy.get(ACCORDION_ITEM_ID).eq(2).should('be.focused');
        cy.get(ACCORDION_ITEM_ID).eq(2).realPress('ArrowUp');
        cy.get(ACCORDION_ITEM_ID).eq(1).should('be.focused');
    });

    it('Should add a new Item in open state', () => {
        cy.mount(<TestAccordion />);

        cy.get(ACCORDION_ITEM_ID).should('have.length', 2);
        cy.get(ACCORDION_ITEM_CONTENT_ID).should('have.length', 1);
        cy.get(ACCORDION_ITEM_ID).eq(0).siblings(ACCORDION_ITEM_CONTENT_ID).should('not.exist');
        cy.get(ACCORDION_ITEM_ID).eq(1).siblings(ACCORDION_ITEM_CONTENT_ID).should('exist');

        cy.get('#BUTTON_TEST_ID').click();
        cy.get(ACCORDION_ITEM_ID).should('have.length', 3);
        cy.get(ACCORDION_ITEM_ID).eq(2).siblings(ACCORDION_ITEM_CONTENT_ID).should('exist');
    });

    it('should render with custom data test ids', () => {
        cy.mount(
            <Accordion data-test-id="accordion-custom-test-id">
                <AccordionItem header={{ children: '1' }} data-test-id="accordion-item-custom-test-id-1">
                    1
                </AccordionItem>
                <AccordionItem header={{ children: '2' }} data-test-id="accordion-item-custom-test-id-2">
                    2
                </AccordionItem>
                <AccordionItem header={{ children: '3' }} data-test-id="accordion-item-custom-test-id-3">
                    2
                </AccordionItem>
            </Accordion>,
        );

        cy.get('[data-test-id="accordion-custom-test-id"]').should('have.length', 1);
        cy.get('[data-test-id="accordion-item-custom-test-id-1"]').should('have.length', 1);
        cy.get('[data-test-id="accordion-item-custom-test-id-2"]').should('have.length', 1);
        cy.get('[data-test-id="accordion-item-custom-test-id-3"]').should('have.length', 1);
    });
});

const TestAccordion = (): ReactElement => {
    const accordionItems = [
        <AccordionItem key={0} header={{ children: '1' }}>
            1
        </AccordionItem>,
        <AccordionItem key={1} header={{ children: '2', active: true }}>
            2
        </AccordionItem>,
    ];

    const additionalAccordionItem = [
        <AccordionItem key={2} header={{ children: '3', active: true }}>
            3
        </AccordionItem>,
    ];

    const [accordionData, setAccordionData] = useState(accordionItems);
    return (
        <>
            <Accordion>{[...accordionData]}</Accordion>
            <button
                onClick={() => {
                    setAccordionData([...accordionItems, ...additionalAccordionItem]);
                }}
                id={'BUTTON_TEST_ID'}
            >
                Add Element active
            </button>
        </>
    );
};
