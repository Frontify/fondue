/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeNodeItem, treeNodesMock } from '@components/Tree/utils/mocks';
import React from 'react';

import { Tree, TreeItem } from '@components/Tree';
import { TreeContentComponent } from './TreeContentComponent';

const TreeComponent = () => {
    const contentComponent = (node: TreeNodeItem, selected: boolean, hovered: boolean) => {
        return (
            <TreeContentComponent
                title={node.name}
                icon={node.icon || <></>}
                label={node.label || ''}
                badge={node.badge}
                tooltipContent={node.tooltipContent}
                actions={node.actions}
                selected={selected}
                hovered={hovered}
            />
        );
    };

    return (
        <Tree id="treeId">
            {treeNodesMock.map((node) => (
                <TreeItem
                    key={node.id}
                    id={node.id}
                    sort={node.sort}
                    contentComponent={({ selected, hovered }) => contentComponent(node, selected, hovered)}
                >
                    {node.nodes &&
                        node.nodes.map((node) => (
                            <TreeItem
                                key={node.id}
                                id={node.id}
                                sort={node.sort}
                                contentComponent={({ selected, hovered }) => contentComponent(node, selected, hovered)}
                            >
                                {node.nodes &&
                                    node.nodes.map((node) => (
                                        <TreeItem
                                            key={node.id}
                                            id={node.id}
                                            sort={node.sort}
                                            contentComponent={({ selected, hovered }) =>
                                                contentComponent(node, selected, hovered)
                                            }
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

describe('Tree Component', () => {
    it('renders tree', () => {
        cy.mount(<TreeComponent />);

        cy.get(TREE_ID).should('be.visible');
    });
});
