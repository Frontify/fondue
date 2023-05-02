/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Tree, TreeItem } from '@components/Tree';
import { treeItemsMock } from '@components/Tree/utils';

const TreeComponent = ({ onSelect }: { onSelect?: (id: Nullable<string>) => void }) => {
    return (
        <Tree id="treeId" onSelect={onSelect}>
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

describe('Tree Component', () => {
    it('renders tree structure with children', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ID).should('be.visible');
    });

    it('expands and shrinks the tree on toggle click (uncontrolled)', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_ID).should('have.length', 3);
        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(TREE_ITEM_ID).should('have.length', 8);
    });

    it('renders all tree items', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_TOGGLE_ID).eq(0).click();
        cy.get(TREE_ITEM_TOGGLE_ID).eq(2).click();
        cy.get(TREE_ITEM_TOGGLE_ID).eq(1).click();

        cy.get(TREE_ITEM_ID).should('have.length', 14);
    });

    it('calls the onSelect callback', () => {
        const onSelectStub = cy.stub().as('onSelectStub');
        cy.mount(<TreeComponent onSelect={onSelectStub} />);

        cy.get(TREE_ITEM_ID).eq(0).click();
        cy.get('@onSelectStub').should('have.been.called');
    });
});
