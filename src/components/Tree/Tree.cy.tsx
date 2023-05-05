/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { OnTreeDropCallback, Tree, TreeItem } from '@components/Tree';
import { treeItemsMock } from '@components/Tree/utils';

const TreeComponent = ({
    onSelect,
    onExpand,
    onShrink,
    onDrop,
    selectedIds,
    expandedIds,
    draggable,
}: {
    onSelect?: (id: string) => void;
    onExpand?: (id: string) => void;
    onShrink?: (id: string) => void;
    onDrop?: OnTreeDropCallback;
    selectedIds?: string[];
    expandedIds?: string[];
    draggable?: boolean;
}) => {
    return (
        <Tree
            id="treeId"
            onSelect={onSelect}
            onExpand={onExpand}
            onShrink={onShrink}
            onDrop={onDrop}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            draggable={draggable}
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
const TREE_ITEM_DRAG_HANDLE_ID = '[data-test-id="tree-item-drag-handle"]';
const TREE_ITEM_OVERLAY_ID = '[data-test-id="tree-item-overlay"]';

describe('Tree component with uncontrolled onSelect', () => {
    beforeEach(() => {
        cy.mount(
            <Tree key="tree-id" id="tree-id">
                <TreeItem key="item-id" id="item-id" label="Tree Item" />
            </Tree>,
        );
    });

    it('renders the Tree with TreeItem correctly', () => {
        cy.get(TREE_ID).should('be.visible');
        cy.get(TREE_ITEM_ID).should('be.visible').should('have.length', 1);
        cy.get(TREE_ITEM_TOGGLE_ID).should('not.be.visible');
        cy.get(TREE_ITEM_ID).should('have.attr', 'aria-selected', 'false');
    });

    it('selects the correct items', () => {
        cy.get(TREE_ITEM_ID).click();

        cy.get(TREE_ITEM_ID).should('have.attr', 'aria-selected', 'true');
    });
});

describe('Tree component with uncontrolled onExpand and onShrink', () => {
    beforeEach(() => {
        cy.mount(
            <Tree id="tree-id">
                <TreeItem key="item-id" id="item-id" label="Tree Item">
                    <TreeItem key="child-item-id" id="child-item-id" label="Child Tree Item" />
                </TreeItem>
            </Tree>,
        );
    });

    it('renders the Tree with TreeItem correctly', () => {
        cy.get(TREE_ID).should('be.visible');
        cy.get(TREE_ITEM_ID).should('be.visible').should('have.length', 1);
        cy.get(TREE_ITEM_TOGGLE_ID).should('be.visible');
    });

    it('expands and shrinks the correct items', () => {
        cy.get(TREE_ITEM_TOGGLE_ID).click();
        cy.get(TREE_ITEM_ID).should('have.length', 2);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(TREE_ITEM_ID).should('have.length', 1);
    });
});

describe('Tree component with controlled onSelect', () => {
    beforeEach(() => {
        const onSelectStub = cy.stub().as('onSelectStub');

        cy.mount(<TreeComponent onSelect={onSelectStub} selectedIds={['2']} />);
    });

    it('calls onSelect on the Tree when selecting', () => {
        cy.get(TREE_ITEM_ID).eq(0).click();
        cy.get('@onSelectStub').should('have.been.calledOnce');
    });

    it('calls onSelect on the Tree when deselecting', () => {
        cy.get(TREE_ITEM_ID).eq(1).click();
        cy.get('@onSelectStub').should('have.been.calledOnce');
    });
});

describe('Tree component with controlled onExpand and onShrink', () => {
    it('calls onExpand on the Tree', () => {
        const onExpandStub = cy.stub().as('onExpandStub');

        cy.mount(<TreeComponent onExpand={onExpandStub} />);

        cy.get(TREE_ITEM_TOGGLE_ID).eq(0).click();
        cy.get('@onExpandStub').should('have.been.calledOnce');
    });

    it('calls onShrink the Tree', () => {
        const onShrinkStub = cy.stub().as('onShrinkStub');

        cy.mount(<TreeComponent onShrink={onShrinkStub} expandedIds={['1']} />);

        cy.get(TREE_ITEM_TOGGLE_ID).eq(0).click();
        cy.get('@onShrinkStub').should('have.been.calledOnce');
    });
});

describe('Tree component with controlled onDrop', () => {
    it('calls onDrop on the Tree', () => {
        const onDropStub = cy.stub().as('onDropStub');

        cy.mount(<TreeComponent draggable onDrop={onDropStub} />);

        cy.get(TREE_ITEM_DRAG_HANDLE_ID)
            .eq(0)
            .focus()
            .realPress('Space')
            .realPress('ArrowDown')
            .realPress('ArrowRight')
            .realPress('Space');

        cy.get('@onDropStub').should('have.been.calledOnce');
    });
});
