/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { getReactNodeIdsInFlatArray, getReactNodesInFlatArray, removeReactNodesFromFlatArray } from './nodes';

const Node = (props: { id: string; parentId?: string; children?: ReactNode }) => <div {...props} />;

const FLAT_ARRAY_OF_NODES = [
    <Node key="1" id="1" />,
    <Node key="2" id="2" />,
    <Node key="3" id="3" parentId="2" />,
    <Node key="4" id="4" />,
    <Node key="5" id="5" parentId="4" />,
    <Node key="6" id="6" parentId="5" />,
    <Node key="7" id="7" />,
    <Node key="8" id="8" parentId="4" />,
];

describe('nodes', () => {
    describe('removeNodesFromFlatArray', () => {
        it('returns empty array if no nodes and filters are passed', () => {
            const result = removeReactNodesFromFlatArray([], []);
            cy.wrap(result).should('deep.equal', []);
        });

        it('returns empty array if no nodes are passed', () => {
            const result = removeReactNodesFromFlatArray([], ['1']);
            cy.wrap(result).should('deep.equal', []);
        });

        it('should returns the same tree if no filter is passed', () => {
            const result = removeReactNodesFromFlatArray(FLAT_ARRAY_OF_NODES, []);
            cy.wrap(result).should('deep.equal', FLAT_ARRAY_OF_NODES);
        });

        it('removes nodes from tree', () => {
            const nodeIdsToRemove: string[] = ['1', '2', '5'];
            const expectedTree = [
                <Node key="3" id="3" parentId="2" />,
                <Node key="4" id="4" />,
                <Node key="6" id="6" parentId="5" />,
                <Node key="7" id="7" />,
                <Node key="8" id="8" parentId="4" />,
            ];

            const result = removeReactNodesFromFlatArray(FLAT_ARRAY_OF_NODES, nodeIdsToRemove);

            cy.wrap(result).should('deep.equal', expectedTree);
        });

        it('should returns an empty tree if all items are filtered', () => {
            const nodeIdsToRemove = ['1', '2', '3', '4', '5', '6', '7', '8'];
            const result = removeReactNodesFromFlatArray(FLAT_ARRAY_OF_NODES, nodeIdsToRemove);
            cy.wrap(result).should('deep.equal', []);
        });
    });

    describe('getReactNodeIdsInFlatArray', () => {
        it('should return the IDs of all nodes in the branch of the specified node', () => {
            const result = getReactNodeIdsInFlatArray(FLAT_ARRAY_OF_NODES, '4');

            cy.wrap(result).should('deep.equal', ['5', '6', '8']);
        });

        it('should return an empty array if the node has no child', () => {
            const result = getReactNodeIdsInFlatArray(FLAT_ARRAY_OF_NODES, '7');

            cy.wrap(result).should('deep.equal', []);
        });

        it('should return an empty array when the specified node is not found in the tree', () => {
            const result = getReactNodeIdsInFlatArray(FLAT_ARRAY_OF_NODES, '-1');

            cy.wrap(result).should('deep.equal', []);
        });
    });

    describe('getReactNodesInFlatArray', () => {
        it('should return all nodes in the branch of the specified node', () => {
            const result = getReactNodesInFlatArray(FLAT_ARRAY_OF_NODES, '4');

            cy.wrap(result).should('deep.equal', [
                <Node key="5" id="5" parentId="4" />,
                <Node key="6" id="6" parentId="5" />,
                <Node key="8" id="8" parentId="4" />,
            ]);
        });

        it('should return an empty array if the node has no child', () => {
            const result = getReactNodesInFlatArray(FLAT_ARRAY_OF_NODES, '7');

            cy.wrap(result).should('deep.equal', []);
        });

        it('should return an empty array when the specified node is not found in the tree', () => {
            const result = getReactNodesInFlatArray(FLAT_ARRAY_OF_NODES, '-1');

            cy.wrap(result).should('deep.equal', []);
        });
    });
});
