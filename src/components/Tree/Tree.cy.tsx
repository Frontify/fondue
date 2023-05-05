/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Tree, TreeItem } from '@components/Tree';
import { treeItemsMock } from '@components/Tree/utils';

const TreeComponent = ({
    onSelect,
    onExpand,
    onShrink,
    selectedIds,
    expandedIds,
}: {
    onSelect?: (id: string) => void;
    onExpand?: (id: string) => void;
    onShrink?: (id: string) => void;
    selectedIds?: string[];
    expandedIds?: string[];
}) => {
    return (
        <Tree
            id="treeId"
            onSelect={onSelect}
            onExpand={onExpand}
            onShrink={onShrink}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
        >
            {treeItemsMock.map((node) => (
                <TreeItem key={node.id} id={node.id} contentComponent={<span>{node.label}</span>}>
                    {node.nodes?.map((node) => (
                        <TreeItem key={node.id} id={node.id} contentComponent={<span>{node.label}</span>}>
                            {node.nodes?.map((node) => (
                                <TreeItem key={node.id} id={node.id} contentComponent={<span>{node.label}</span>}>
                                    {node.nodes?.map((node) => (
                                        <TreeItem
                                            key={node.id}
                                            id={node.id}
                                            contentComponent={<span>{node.label}</span>}
                                        />
                                    ))}
                                </TreeItem>
                            ))}
                        </TreeItem>
                    ))}
                </TreeItem>
            ))}
        </Tree>
    );
};

const TREE_ID = '[data-test-id=fondue-tree]';
const TREE_ITEM_ID = '[data-test-id=fondue-tree-item]';
const TREE_ITEM_TOGGLE_ID = '[data-test-id=tree-item-toggle]';

// describe('Tree component with uncontrolled onSelect', () => {
//     beforeEach(() => {
//         const onSelectTreeStub = cy.stub().as('onSelectTreeStub');
//         const onSelectTreeItemStub = cy.stub().as('onSelectTreeItemStub');

//         cy.mount(
//             <Tree key="tree-id" id="tree-id">
//                 <TreeItem key="item-id" id="item-id" label="Tree Item" onSelect={onSelectTreeItemStub} />
//             </Tree>,
//         );
//     });

//     it('renders the Tree with TreeItem correctly', () => {
//         cy.get(TREE_ID).should('be.visible');
//         cy.get(TREE_ITEM_ID).should('be.visible').should('have.length', 1);
//         cy.get(TREE_ITEM_TOGGLE_ID).should('not.be.visible');
//         cy.get(TREE_ITEM_ID).should('have.attr', 'aria-selected', 'false');
//     });

//     it('calls the onSelect of the TreeItem', () => {
//         cy.get(TREE_ITEM_ID).click();

//         // Figure why this doesn't work
//         // cy.get('@onSelectTreeItemStub').should('have.been.called');

//         cy.get(TREE_ITEM_ID).should('have.attr', 'aria-selected', 'true');
//     });
// });

// describe('Tree component with uncontrolled onExpand and onShrink', () => {
//     beforeEach(() => {
//         const onExpandTreeStub = cy.stub().as('onExpandTreeStub');
//         const onExpandTreeItemStub = cy.stub().as('onExpandTreeItemStub');
//         const onShrinkTreeStub = cy.stub().as('onShrinkTreeStub');
//         const onShrinkTreeItemStub = cy.stub().as('onShrinkTreeItemStub');

//         cy.mount(
//             <Tree id="tree-id" onExpand={onExpandTreeStub} onShrink={onShrinkTreeStub}>
//                 <TreeItem
//                     key="item-id"
//                     id="item-id"
//                     label="Tree Item"
//                     // onExpand={onExpandTreeItemStub}
//                     // onShrink={onShrinkTreeItemStub}
//                 >
//                     <TreeItem key="child-item-id" id="child-item-id" label="Child Tree Item" />
//                 </TreeItem>
//             </Tree>,
//         );
//     });

//     it('renders the Tree with TreeItem correctly', () => {
//         cy.get(TREE_ID).should('be.visible');
//         cy.get(TREE_ITEM_ID).should('be.visible').should('have.length', 1);
//         cy.get(TREE_ITEM_TOGGLE_ID).should('be.visible');
//     });

//     it('calls the onExpand and onShrink of the TreeItem', () => {
//         cy.get(TREE_ITEM_TOGGLE_ID).click();

//         // Figure why this doesn't work
//         // cy.get('@onExpandTreeItemStub').should('have.been.called');

//         cy.get(TREE_ITEM_ID).should('have.length', 2);

//         cy.get(TREE_ITEM_TOGGLE_ID).first().click();

//         // Figure why this doesn't work
//         // cy.get('@onShrinkTreeItemStub').should('have.been.called');

//         cy.get(TREE_ITEM_ID).should('have.length', 1);
//     });
// });

describe('Tree component with controlled onSelect', () => {
    beforeEach(() => {
        const onSelectStub = cy.stub().as('onSelectStub');

        cy.mount(<TreeComponent onSelect={onSelectStub} selectedIds={['2']} />);
    });

    it('selects the correct items', () => {
        cy.get(TREE_ITEM_ID).eq(0).click();
        cy.get('@onSelectStub').should('have.been.calledOnce');
    });

    it('deselects the correct items', () => {
        cy.get(TREE_ITEM_ID).eq(1).click();
        cy.get('@onSelectStub').should('have.been.calledOnce');
    });
});

describe('Tree component with controlled onExpand and onShrink', () => {
    it('expands the correct items', () => {
        const onExpandStub = cy.stub().as('onExpandStub');

        cy.mount(<TreeComponent onExpand={onExpandStub} />);

        cy.get(TREE_ITEM_TOGGLE_ID).eq(0).click();
        cy.get('@onExpandStub').should('have.been.calledOnce');
    });

    it('shrinks the correct items', () => {
        const onShrinkStub = cy.stub().as('onShrinkStub');

        cy.mount(<TreeComponent onShrink={onShrinkStub} expandedIds={['1']} />);

        cy.get(TREE_ITEM_TOGGLE_ID).eq(0).click();
        cy.get('@onShrinkStub').should('have.been.calledOnce');
    });
});
