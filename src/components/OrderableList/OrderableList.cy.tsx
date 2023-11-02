/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OrderableList, OrderableListItem, OrderableListProps } from '.';

const LIST_ID = '[data-test-id=orderable-list]';
const DRAGGABLE_ITEM = '[data-test-id=orderable-list-item]';

const ITEM_HEIGHT = 20;

type TestItem = {
    text: string;
};

const testItems: OrderableListItem<TestItem>[] = [
    { id: '1', alt: '1', text: 'Item 1', sort: 1 },
    { id: '2', alt: '2', text: 'Item 2', sort: 2 },
    { id: '3', alt: '3', text: 'Item 3', sort: 3 },
    { id: '4', alt: '4', text: 'Item 4', sort: 4 },
    { id: '5', alt: '5', text: 'Item 5', sort: 5 },
    { id: '6', alt: '6', text: 'Item 6', sort: 6 },
];

const renderDefaultTestItems = ({ text }: OrderableListItem<TestItem>) => (
    <div style={{ height: `${ITEM_HEIGHT}px` }}>{text}</div>
);

const renderWithFocusableItems = () => (
    <div style={{ height: `${ITEM_HEIGHT}px` }} className="tw-flex tw-justify-around">
        <button data-test-id="focusable-item">Button</button>
        <input data-test-id="focusable-item" value="Input"></input>
        <textarea data-test-id="focusable-item">textarea</textarea>
    </div>
);

const OrderableListWithDefaultProps = ({
    renderContent = renderDefaultTestItems,
    items = testItems,
    dragDisabled = false,
    onMove = cy.stub(),
}: Partial<OrderableListProps<TestItem>>) => (
    <OrderableList renderContent={renderContent} dragDisabled={dragDisabled} items={items} onMove={onMove} />
);

describe('OrderableList Component', () => {
    it('renders correct number of list items', () => {
        cy.mount(<OrderableListWithDefaultProps />);
        cy.get(LIST_ID)
            .find(DRAGGABLE_ITEM)
            .should('have.length', testItems.length)
            .each(($el, index) => {
                cy.wrap($el).should('have.text', testItems[index].text);
            });
    });

    it('Does not crash if item list is empty', () => {
        cy.mount(<OrderableListWithDefaultProps items={[]} />);
        cy.get(LIST_ID).should('exist');
    });

    it('Fires a move event when item is dropped over an insertion indicator', () => {
        const stubbedOnMove = cy.stub().as('onMove');
        cy.mount(<OrderableListWithDefaultProps onMove={stubbedOnMove} />);
        cy.get(DRAGGABLE_ITEM).first().realMouseDown().realMouseMove(40, 40).realMouseUp();
        cy.get('@onMove').should('have.been.called');
    });

    it('Should disable drag events if dragDisabled prop is true, but maintain focus for navigation', () => {
        cy.mount(<OrderableListWithDefaultProps dragDisabled={true} renderContent={renderWithFocusableItems} />);
        cy.get(DRAGGABLE_ITEM).each(($el) => {
            const disabled = $el.attr('aria-disabled');
            expect(disabled).to.equal('true');
        });
    });

    it('Should not allow drag into other orderable list', () => {
        const stubbedOnMove = cy.stub().as('onMove');
        const stubbedOnMove2 = cy.stub().as('onMove2');

        cy.mount(
            <>
                <OrderableListWithDefaultProps onMove={stubbedOnMove} />
                <OrderableListWithDefaultProps onMove={stubbedOnMove2} />
            </>,
        );

        cy.get(LIST_ID).should('have.length', 2);
        cy.get(LIST_ID).eq(1).find(DRAGGABLE_ITEM).first().realMouseDown().realMouseMove(40, -80).realMouseUp();
        cy.get('@onMove').should('not.have.been.called');
        cy.get('@onMove2').should('have.been.called');
    });
});
