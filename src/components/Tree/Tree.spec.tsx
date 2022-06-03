/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from 'react';
import { Tree, TreeFlatListItem } from './Tree';
import { mount } from '@cypress/react';
import { DraggableItem } from '@utilities/dnd';
import { mockNodesFlat } from '@components/Tree/utils';

type ComponentProps = {
    nodes: DraggableItem<TreeFlatListItem>[];
    onDrop?: (sourceItemId: string, parentId: NullableString, positionBeforeId: NullableString) => void;
    onEditableSave?: (itemId: string, value: string) => void;
};
const Component: FC<ComponentProps> = ({ nodes, onDrop, onEditableSave }) => {
    const [selectedIds, setSelectedIds] = useState<NullableString[]>([]);
    const onDropDefault = (sourceItemId: string, parentId: NullableString, positionBeforeId: NullableString) => {
        console.log(sourceItemId);
        console.log(parentId);
        console.log(positionBeforeId);
    };

    return (
        <Tree
            nodes={nodes}
            activeNodeIds={selectedIds}
            onSelect={(ids: NullableString[]) => setSelectedIds(ids)}
            onDragAndDrop={onDrop || onDropDefault}
            onEditableSave={onEditableSave}
        />
    );
};

const TREE_ID = '[data-test-id=tree]';
const NODE_ID = '[data-test-id=node]';
const NODE_LINK_ID = '[data-test-id=node-link]';
const NODE_LINK_NAME_ID = '[data-test-id=node-link-name]';
const TOGGLE_ID = '[data-test-id=toggle]';
const SUB_TREE_ID = '[data-test-id=sub-tree]';
const DROP_ZONE_ID = '[data-test-id=drop-zone]';
const BADGE_ID = '[data-test-id=node-badge]';
const NODE_EDITABLE_ID = '[data-test-id=node-editable]';

describe('Tree Component', () => {
    // TODO check if DropZones are not present when no onDrop props is provided. Refactoring needed first
    it('renders tree', () => {
        mount(<Component nodes={mockNodesFlat()} />);

        cy.get(TREE_ID).should('be.visible');
        cy.get(NODE_ID).should('have.length', 1);
    });

    it('toggles node on click', () => {
        mount(<Component nodes={mockNodesFlat()} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).as('Toggle');
        cy.get('@Toggle').click();
        cy.get(NODE_ID).should('have.length', 4);

        cy.get('@Toggle').click();
        cy.get(NODE_ID).should('have.length', 1);
    });

    it('selects a node with a value on click', () => {
        mount(<Component nodes={mockNodesFlat()} />);

        cy.get(NODE_LINK_NAME_ID).click();
        cy.get(NODE_LINK_ID).should('have.attr', 'aria-selected', 'true');
    });

    it("doesn't select a node without a value", () => {
        mount(<Component nodes={mockNodesFlat()} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first a`).should('have.attr', 'aria-selected', 'false');
    });

    it('deselects all the other nodes when selecting a new one', () => {
        mount(<Component nodes={mockNodesFlat()} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:last ${NODE_LINK_ID}`).as('InitiallySelectedItem');
        cy.get(`${SUB_TREE_ID} ${NODE_LINK_NAME_ID}:last`).click();
        cy.get('@InitiallySelectedItem').should('have.attr', 'aria-selected', 'true');

        cy.get(`${NODE_ID}:first ${NODE_LINK_ID}:first`).as('NextSelectedItem');
        cy.get(`${NODE_ID}:first ${NODE_LINK_NAME_ID}:first`).click();
        cy.get('@InitiallySelectedItem').should('have.attr', 'aria-selected', 'false');
        cy.get('@NextSelectedItem').should('have.attr', 'aria-selected', 'true');
    });
});

describe('Draggable Tree Component', () => {
    it('renders correct drop zones on the top level', () => {
        mount(
            <Component
                nodes={mockNodesFlat()}
                onDrop={() => {
                    console.log('drop');
                }}
            />,
        );

        cy.get(DROP_ZONE_ID).should('have.length', 3);
    });

    it('renders correct drop zones on the second level', () => {
        mount(
            <Component
                nodes={mockNodesFlat()}
                onDrop={() => {
                    console.log('drop');
                }}
            />,
        );

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} ${DROP_ZONE_ID}`).should('have.length', 7);
        cy.get(`${SUB_TREE_ID} ${DROP_ZONE_ID}`).each(($dropZone, index) => {
            const expectedClass = index % 2 === 0 ? 'tw-h-[10px]' : 'tw-h-auto';
            expect($dropZone).to.have.class(expectedClass);
        });
    });
});

describe('Badge Tree Component', () => {
    beforeEach(() => {
        mount(<Component nodes={mockNodesFlat()} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
    });

    it('does not render badge', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first ${BADGE_ID}`).should('not.exist');
    });

    it('renders icon', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(2) ${BADGE_ID}`).should('exist');
    });

    it('renders badge', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(2) ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(2) ${BADGE_ID}`).should('exist');
    });
});

describe('Editable Tree Component', () => {
    beforeEach(() => {
        const onEditableSaveStub = cy.stub().as('onEditableSaveStub');
        mount(<Component nodes={mockNodesFlat()} onEditableSave={onEditableSaveStub} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(2) ${TOGGLE_ID}`).click();
    });

    it('does not render the editable input on double click when props are not set', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:last ${NODE_LINK_NAME_ID}`).dblclick();
        cy.get(`${NODE_EDITABLE_ID}`).should('not.exist');
    });

    it('renders the editable input on double click', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) ${NODE_LINK_NAME_ID}`).dblclick();
        cy.get(`${NODE_EDITABLE_ID}`).should('exist');
    });

    it('exits the editable input on enter', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) ${NODE_LINK_NAME_ID}`).dblclick();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) input`).type('{enter}');
        cy.get(`${NODE_EDITABLE_ID}`).should('not.exist');
    });

    it('exits the editable input on blur', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) ${NODE_LINK_NAME_ID}`).dblclick();
        cy.get(`${SUB_TREE_ID}  > ${NODE_ID}:first`).click();
        cy.get(`${NODE_EDITABLE_ID}`).should('not.exist');
    });

    it('calls the onEditableSave on enter', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) ${NODE_LINK_NAME_ID}`).dblclick();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) input`).type('{enter}');
        cy.get('@onEditableSaveStub').should('be.called');
    });

    it('calls the onEditableSave on blue', () => {
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:nth-last-of-type(3) ${NODE_LINK_NAME_ID}`).dblclick();
        cy.get(`${SUB_TREE_ID}  > ${NODE_ID}:first`).click();
        cy.get('@onEditableSaveStub').should('be.called');
    });
});
