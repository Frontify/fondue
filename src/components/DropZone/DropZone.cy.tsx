/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropZone, DropZoneProps } from '@components/DropZone/DropZone';
import { DraggableItem as DraggableItemProp, DropZonePosition } from '@utilities/dnd';
import React from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LIST_ID = 'list-id';
const DROP_ZONE_DATA = {
    targetItem: { id: '1', sort: null },
    position: DropZonePosition.After,
};
const SOURCE_ITEM = { id: '2', sort: null };
const DRAGGABLE_ITEM_ID = '[data-test-id=draggable-item]';
const DROP_ZONE_ID = '[data-test-id=drop-zone]';

const DraggableItem = ({ id, sort }: DraggableItemProp<unknown>) => {
    const [, drag] = useDrag({
        item: { id, sort },
        type: LIST_ID,
        canDrag: true,
    });

    return (
        <div data-test-id={'draggable-item'} ref={drag}>
            TEST DIV
        </div>
    );
};

const DropZoneWithDefaultProps = ({ onDrop }: Partial<DropZoneProps<unknown>>) => {
    return <DropZone data={DROP_ZONE_DATA} accept={LIST_ID} onDrop={onDrop} />;
};
describe('DropZone', () => {
    it('can receive item', () => {
        const dataTransfer = new DataTransfer();
        const onDropStub = cy.stub().as('onDrop');

        cy.mount(
            <DndProvider backend={HTML5Backend}>
                <DraggableItem id={SOURCE_ITEM.id} sort={SOURCE_ITEM.sort} />
                <DropZoneWithDefaultProps onDrop={onDropStub} />
            </DndProvider>,
        );

        cy.get(DRAGGABLE_ITEM_ID).first().trigger('dragstart', { dataTransfer }).trigger('drag');
        cy.get(DROP_ZONE_ID).first().trigger('dragenter', { dataTransfer }).trigger('dragover', { dataTransfer });
        cy.get(DROP_ZONE_ID).first().trigger('drop', { dataTransfer });
        cy.get('@onDrop').should('have.been.calledWith', DROP_ZONE_DATA.targetItem, SOURCE_ITEM);
    });

    it("can't receive item with same id", () => {
        const dataTransfer = new DataTransfer();
        const onDropStub = cy.stub().as('onDrop');

        cy.mount(
            <DndProvider backend={HTML5Backend}>
                <DraggableItem id={DROP_ZONE_DATA.targetItem.id} sort={SOURCE_ITEM.sort} />
                <DropZoneWithDefaultProps onDrop={onDropStub} />
            </DndProvider>,
        );

        cy.get(DRAGGABLE_ITEM_ID).first().trigger('dragstart', { dataTransfer }).trigger('drag');
        cy.get(DROP_ZONE_ID).first().trigger('dragenter', { dataTransfer }).trigger('dragover', { dataTransfer });
        cy.get(DROP_ZONE_ID).first().trigger('drop', { dataTransfer });
        cy.get('@onDrop').should('not.have.been.called');
    });
});
