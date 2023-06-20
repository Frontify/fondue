/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { OnTreeDropCallback, Tree, TreeItem } from '@components/Tree';
import { TreeItemMock, treeItemsMock } from '@components/Tree/utils';

const TreeComponent = ({
    onSelect,
    onExpand,
    onShrink,
    onDropTree,
    onDropTreeItem,
    selectedIds,
    expandedIds,
    draggable,
}: {
    onSelect?: (id: string) => void;
    onExpand?: (id: string) => void;
    onShrink?: (id: string) => void;
    onDropTree?: OnTreeDropCallback;
    onDropTreeItem?: OnTreeDropCallback;
    selectedIds?: string[];
    expandedIds?: string[];
    draggable?: boolean;
}) => {
    const treeItemSharedProps = {
        onDrop: onDropTreeItem,
    };

    return (
        <Tree
            id="treeId"
            onDrop={onDropTree}
            onSelect={onSelect}
            onExpand={onExpand}
            onShrink={onShrink}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            draggable={draggable}
        >
            {treeItemsMock.map(({ nodes, ...treeItem }: TreeItemMock) => (
                <TreeItem {...treeItem} {...treeItemSharedProps} key={treeItem.id} id={treeItem.id}>
                    {nodes?.map(({ nodes, ...treeItem }: TreeItemMock) => (
                        <TreeItem {...treeItem} {...treeItemSharedProps} key={treeItem.id} id={treeItem.id}>
                            {nodes?.map(({ nodes, ...treeItem }: TreeItemMock) => (
                                <TreeItem {...treeItem} {...treeItemSharedProps} key={treeItem.id} id={treeItem.id}>
                                    {nodes?.map(({ ...treeItem }: TreeItemMock) => (
                                        <TreeItem
                                            {...treeItem}
                                            {...treeItemSharedProps}
                                            key={treeItem.id}
                                            id={treeItem.id}
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

describe('Tree and TreeItem components', () => {
    it('renders the Tree with TreeItem correctly', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ID).should('be.visible');
        cy.get(TREE_ITEM_ID).should('be.visible').should('have.length', 3);
        cy.get(TREE_ITEM_TOGGLE_ID).first().should('be.visible');
        cy.get(TREE_ITEM_ID).first().should('have.attr', 'aria-selected', 'false');
    });

    it('renders the TreeItem with contentComponent correctly', () => {
        cy.mount(
            <Tree key="tree" id="tree">
                <TreeItem
                    key="tree-item"
                    id="tree-item"
                    contentComponent={
                        <div>
                            <button>Hello</button>
                        </div>
                    }
                />
            </Tree>,
        );

        cy.get(TREE_ITEM_ID).find('button').should('exist').contains('Hello');
    });

    it('should trigger onSelect as a controlled component when selecting an item', () => {
        const onSelectStub = cy.stub().as('onSelectStub');

        cy.mount(<TreeComponent onSelect={onSelectStub} />);

        cy.get(TREE_ITEM_ID).first().click();

        cy.get('@onSelectStub').should('have.been.calledOnce');
    });

    it('should trigger onSelect as a controlled component when deselecting an item', () => {
        const onSelectStub = cy.stub().as('onSelectStub');

        cy.mount(<TreeComponent onSelect={onSelectStub} selectedIds={['1']} />);

        cy.get(TREE_ITEM_ID).first().click();

        cy.get('@onSelectStub').should('have.been.calledOnce');
    });

    it('expands/shrinks the correct items as uncontrolled component', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(TREE_ITEM_ID).should('have.length', 8);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(TREE_ITEM_ID).should('have.length', 3);
    });

    it('should trigger onExpand as a controlled component', () => {
        const onExpandStub = cy.stub().as('onExpandStub');

        cy.mount(<TreeComponent onExpand={onExpandStub} />);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get('@onExpandStub').should('have.been.calledOnce');
    });

    it('should trigger onShrink as a controlled component', () => {
        const onShrinkStub = cy.stub().as('onShrinkStub');

        cy.mount(<TreeComponent onShrink={onShrinkStub} />);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click().click();
        cy.get('@onShrinkStub').should('have.been.calledOnce');
    });

    it('does not show the drag handle when not draggable', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_ID).first().realHover();
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).should('not.be.visible');
    });

    it('shows the drag handle and allows dragging when draggable', () => {
        cy.mount(<TreeComponent draggable />);

        cy.get(TREE_ITEM_ID).first().realHover();
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).should('be.visible');
        cy.get(TREE_ITEM_OVERLAY_ID).should('not.exist');
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).realMouseDown();
        cy.get(TREE_ITEM_OVERLAY_ID).should('be.visible');
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).first().realMouseUp();
        cy.get(TREE_ITEM_OVERLAY_ID).should('not.exist');
    });

    it('collapses expanded items when dragging', () => {
        cy.mount(<TreeComponent draggable />);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(TREE_ITEM_ID).should('have.length', 8);
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).first().realMouseDown();
        cy.get(TREE_ITEM_ID).should('have.length', 3);
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).first().realMouseUp();
    });

    it('should trigger onDrop with the keyboard as a controlled component', () => {
        const onDropStub = cy.stub().as('onDropStub');

        cy.mount(<TreeComponent draggable onDropTree={onDropStub} />);

        cy.get(TREE_ITEM_DRAG_HANDLE_ID)
            .first()
            .focus()
            .realPress('Space')
            .realPress('ArrowDown')
            .realPress('ArrowRight')
            .realPress('Space');

        cy.get('@onDropStub').should('have.been.calledOnce');
    });

    it('should trigger onDrop on the root item as a controlled component', () => {
        const onDropStub = cy.stub().as('onDropStub');

        cy.mount(<TreeComponent draggable onDropTreeItem={onDropStub} />);

        cy.get(TREE_ITEM_DRAG_HANDLE_ID).first().realMouseDown().realMouseMove(0, 40).realMouseUp();

        cy.get('@onDropStub').should('have.been.calledOnce');
    });

    it('should trigger onDrop on a level 1 item as a controlled component', () => {
        const onDropStub = cy.stub().as('onDropStub');

        cy.mount(<TreeComponent draggable onDropTreeItem={onDropStub} />);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();
        cy.get(TREE_ITEM_DRAG_HANDLE_ID).eq(4).realMouseDown().realMouseMove(0, -40).realMouseUp();

        cy.get('@onDropStub').should('have.been.calledOnce');
    });

    it('should not trigger onDrop when moving to an not allowed inside item', () => {
        const onDropStub = cy.stub().as('onDropStub');

        cy.mount(<TreeComponent draggable onDropTreeItem={onDropStub} />);

        cy.get(TREE_ITEM_TOGGLE_ID).first().click();

        cy.get(TREE_ITEM_DRAG_HANDLE_ID).eq(6).realMouseDown().realMouseMove(40, -40).realMouseUp();
        cy.get('@onDropStub').should('not.have.been.called');
    });

    it('navigates correctly with the keyboard', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ITEM_TOGGLE_ID)
            .first()
            .focus()
            .realPress('Space')
            .realPress('Tab')
            .realPress('Space')
            .realPress('ArrowDown')
            .realPress('ArrowDown')
            .realPress('ArrowDown')
            .realPress('ArrowDown')
            .realPress('ArrowRight')
            .realPress('ArrowUp');
        cy.get(TREE_ITEM_ID).should('have.length', 14);
        cy.get(TREE_ITEM_ID).eq(4).should('have.focus');
    });
});

describe('Adding / Removing item dynamically', () => {
    it('Allow adding an item dynamically to the Tree', () => {
        const newNode: TreeItemMock = {
            id: '4',
            label: 'New Added Item',
        };
        const rootItemsLength = treeItemsMock.length;

        cy.mount(<TreeComponent />)
            .then(({ rerender }) => {
                cy.get(TREE_ITEM_ID).should('have.length', rootItemsLength);
                treeItemsMock.push(newNode);
                rerender(<TreeComponent />);
                cy.get(TREE_ITEM_ID).should('have.length', rootItemsLength + 1);
            })
            .then(() => {
                // reset mock
                treeItemsMock.pop();
            });
    });

    it('Allow removing an item dynamically to the Tree', () => {
        const newNode: TreeItemMock = {
            id: '4',
            label: 'New Added Item',
        };
        treeItemsMock.push(newNode);
        const rootItemsLength = treeItemsMock.length;

        cy.mount(<TreeComponent />).then(({ rerender }) => {
            cy.get(TREE_ITEM_ID).should('have.length', rootItemsLength);
            treeItemsMock.pop();
            rerender(<TreeComponent />);
            cy.get(TREE_ITEM_ID).should('have.length', rootItemsLength - 1);
        });
    });
});
