/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ItemDragState,
    LegacyDragProperties,
    LegacyOrderableList,
    LegacyOrderableListItem,
    LegacyOrderableListProps,
} from '.';

const LIST_ID = '[data-test-id=orderable-list]';
const DRAGGABLE_ITEM = '[data-test-id=draggable-item]';
const DROP_ZONE = '[data-test-id=drop-zone]';

const ITEM_HEIGHT = 20;

type TestItem = {
    text: string;
};

const testItems: LegacyOrderableListItem<TestItem>[] = [
    { id: '1', alt: '1', text: 'Item 1', sort: 1 },
    { id: '2', alt: '2', text: 'Item 2', sort: 2 },
    { id: '3', alt: '3', text: 'Item 3', sort: 3 },
    { id: '4', alt: '4', text: 'Item 4', sort: 4 },
    { id: '5', alt: '5', text: 'Item 5', sort: 5 },
    { id: '6', alt: '6', text: 'Item 6', sort: 6 },
];

const renderDefaultTestItems = ({ text }: LegacyOrderableListItem<TestItem>) => (
    <div style={{ height: `${ITEM_HEIGHT}px` }}>{text}</div>
);

const renderWithFocusableItems = (
    _item: LegacyOrderableListItem<TestItem>,
    { isFocusVisible }: LegacyDragProperties,
) => (
    <div
        style={{ height: `${ITEM_HEIGHT}px` }}
        className="tw-flex tw-justify-around"
        data-focus-visible={isFocusVisible}
    >
        <button data-test-id="focusable-item">Button</button>
        <input data-test-id="focusable-item" value="Input"></input>
        <textarea data-test-id="focusable-item">Textarea</textarea>
    </div>
);

const OrderableListWithDefaultProps = ({
    renderContent = renderDefaultTestItems,
    items = testItems,
    dragDisabled = false,
    onMove = cy.stub(),
}: Partial<LegacyOrderableListProps<TestItem>>) => (
    <LegacyOrderableList renderContent={renderContent} dragDisabled={dragDisabled} items={items} onMove={onMove} />
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
        const dataTransfer = new DataTransfer();
        const targetDropZone = 4;
        const dragAnimationDelay = 50;

        cy.mount(<OrderableListWithDefaultProps onMove={stubbedOnMove} />);

        cy.get(DRAGGABLE_ITEM).first().trigger('dragstart', { dataTransfer }).trigger('drag');
        cy.get(DROP_ZONE).eq(targetDropZone).as('fourthDropZone');
        cy.get('@fourthDropZone')
            .trigger('dragenter', { dataTransfer, force: true })
            .trigger('dragover', { dataTransfer, force: true })
            .wait(dragAnimationDelay);
        cy.get(DROP_ZONE).each(($el, i) => {
            if (i === targetDropZone) {
                expect($el).to.have.class('tw-border-violet-60');
            } else {
                expect($el).not.to.have.class('tw-border-violet-60');
            }
        });
        cy.get('@fourthDropZone').trigger('drop', { dataTransfer, force: true });
        cy.get('@onMove').should('have.been.called');
    });

    it('Hides insertion indicator if position change is original index', () => {
        cy.mount(<OrderableListWithDefaultProps />);

        cy.get(DRAGGABLE_ITEM).each(($el, index) => {
            const dataTransfer = new DataTransfer();
            cy.wrap($el).trigger('dragstart', { dataTransfer }).trigger('drag');
            cy.get(DROP_ZONE)
                .eq(index)
                .as('targetDropZone')
                .trigger('dragenter', { dataTransfer })
                .trigger('dragover', { dataTransfer });
            cy.get('@targetDropZone').should('not.have.class', 'tw-border-violet-60');
            cy.get('@targetDropZone').should('have.attr', 'aria-hidden').and('equal', 'true');
        });
    });

    it('Passes on correct drag state to each item', () => {
        const renderWithDragState = (_item: TestItem, { componentDragState }: LegacyDragProperties) => (
            <div style={{ height: `${ITEM_HEIGHT}px` }}>{componentDragState}</div>
        );

        cy.mount(<OrderableListWithDefaultProps renderContent={renderWithDragState} />);

        cy.get(DRAGGABLE_ITEM).each(($el) => {
            const dataTransfer = new DataTransfer();
            cy.wrap($el).should('have.text', ItemDragState.Idle).trigger('dragstart', { dataTransfer }).trigger('drag');
            cy.wrap($el).should('have.text', ItemDragState.Dragging);
            cy.get(LIST_ID).trigger('dragenter', { dataTransfer }).trigger('dragover', { dataTransfer });
            cy.get(DROP_ZONE).should('exist').and('have.length', 7);
            cy.get(LIST_ID).trigger('drop', { dataTransfer, force: true });
            cy.wrap($el).trigger('dragend', { dataTransfer, force: true });
            cy.wrap($el).should('have.text', ItemDragState.Idle);
        });
    });

    it('Should disable drag events if dragDisabled prop is true, but maintain focus for navigation', () => {
        cy.mount(<OrderableListWithDefaultProps dragDisabled={true} renderContent={renderWithFocusableItems} />);
        cy.get(DRAGGABLE_ITEM).each(($el) => {
            const disabled = $el.attr('aria-disabled');
            expect(disabled).to.equal('true');
        });
    });

    it('Should not allow drag into other orderable list', () => {
        const dataTransfer = new DataTransfer();

        cy.mount(
            <>
                <OrderableListWithDefaultProps />
                <OrderableListWithDefaultProps />
            </>,
        );

        cy.get(LIST_ID).should('have.length', 2);
        cy.get(LIST_ID).eq(1).find(DRAGGABLE_ITEM).first().trigger('dragstart', { dataTransfer }).trigger('drag');
        cy.get(LIST_ID)
            .first()
            .get(DROP_ZONE)
            .as('targetDropZone')
            .first()
            .trigger('dragenter', { dataTransfer })
            .trigger('dragover', { dataTransfer });
        cy.get('@targetDropZone').should('not.have.class', 'tw-border-violet-60');
        cy.get('@targetDropZone').should('have.attr', 'aria-hidden').and('equal', 'true');
    });
});
