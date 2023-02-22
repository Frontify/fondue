/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Tree, TreeItem } from '@components/Tree';
import { treeNodesMock } from '@components/Tree/utils/mocks';

const TreeComponent = ({ onSelect }: { onSelect?: (id: Nullable<string>) => void }) => {
    return (
        <Tree id="treeId">
            {treeNodesMock.map((node) => (
                <TreeItem
                    key={node.id}
                    id={node.id}
                    sort={node.sort}
                    contentComponent={() => <span>{node.name}</span>}
                    onSelect={onSelect}
                >
                    {node.nodes &&
                        node.nodes.map((node) => (
                            <TreeItem
                                key={node.id}
                                id={node.id}
                                sort={node.sort}
                                contentComponent={() => <span>{node.name}</span>}
                            >
                                {node.nodes &&
                                    node.nodes.map((node) => (
                                        <TreeItem
                                            key={node.id}
                                            id={node.id}
                                            sort={node.sort}
                                            contentComponent={() => <span>{node.name}</span>}
                                        />
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

    it('expands and shrinks the tree on toggle click', () => {
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

        cy.get(TREE_ITEM_ID).should('have.length', 9);
    });

    it('calls the onSelect callback', () => {
        const onSelectStub = cy.stub().as('onSelectStub');
        cy.mount(<TreeComponent onSelect={onSelectStub} />);

        cy.get(TREE_ITEM_ID).click();
        cy.get('@onSelectStub').should('have.been.called');
    });
});
