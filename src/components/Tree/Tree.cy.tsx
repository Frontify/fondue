/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Tree, TreeItem } from '@components/Tree';
import { treeNodesMock } from '@components/Tree/utils/mocks';

const TreeComponent = ({ onSelect }: { onSelect?: (id: Nullable<string>) => void }) => {
    return (
        <Tree id="treeId" onSelect={onSelect}>
            {treeNodesMock.map((node) => (
                <TreeItem key={node.id} id={node.id} contentComponent={() => <span>{node.label}</span>}>
                    {node.nodes?.map((node) => (
                        <TreeItem key={node.id} id={node.id} contentComponent={() => <span>{node.label}</span>}>
                            {node.nodes?.map((node) => (
                                <TreeItem key={node.id} id={node.id} contentComponent={() => <span>{node.label}</span>}>
                                    {node.nodes?.map((node) => (
                                        <TreeItem
                                            key={node.id}
                                            id={node.id}
                                            contentComponent={() => <span>{node.label}</span>}
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

const TREE_ID = '[data-test-id=tree]';
const TREE_ITEM_ID = '[data-test-id=tree-item]';
const TREE_ITEM_TOGGLE_ID = '[data-test-id=tree-item-toggle';
const SUB_TREE_ITEMS_ID = '[data-test-id=sub-tree-items]';

describe('Tree Component', () => {
    it('renders tree structure with children', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ID).should('be.visible');
    });

    it('expands and shrinks the tree on toggle click (uncontrolled)', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_TOGGLE_ID).click();
        cy.get(SUB_TREE_ITEMS_ID).should('be.visible');
        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(SUB_TREE_ITEMS_ID).should('not.exist');
    });

    it('renders all tree items', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_TOGGLE_ID).eq(0).click();
        cy.get(TREE_ITEM_TOGGLE_ID).eq(2).click();
        cy.get(TREE_ITEM_TOGGLE_ID).eq(1).click();

        cy.get(TREE_ITEM_ID).should('have.length', 10);
    });

    it('calls the onSelect callback', () => {
        const onSelectStub = cy.stub().as('onSelectStub');
        cy.mount(<TreeComponent onSelect={onSelectStub} />);

        cy.get(TREE_ITEM_ID).eq(0).click();
        cy.get('@onSelectStub').should('have.been.called');
    });

    it('calls the onExpand callback', () => {});

    it('expands and shrinks the tree on toggle click (controlled)', () => {});

    it('expands and shrinks the tree on toggle click after first rendering (controlled)', () => {});

    it('navigate correctly through the nodes with keyboard', () => {});

    it('navigate correctly through the nodes with keyboard when children are async', () => {});

    it('makes sure that first child have `id`', () => {});

    it('calls the TreeItem `onDrop` callback', () => {});

    it('calls the Tree `onDrop` callback', () => {});
});
