/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import {
    currentNodesChanged,
    findIndexById,
    getCurrentChildrenForNewNodesIfExpanded,
    getNodeChildrenIds,
    updateNodeWithNewChildren,
} from './reducer';

const Component = ({
    id,
    parentId,
}: {
    id?: string;
    parentId?: string;
    props1?: unknown;
    contentComponent?: ReactNode;
}) => <div id={id} data-parent-id={parentId}></div>;

const ContentComponent = ({
    id,
    document,
}: {
    id: string;
    document: { id: string; targets: number[]; visibility: string };
}) => (
    <div id={id} data-id={`content-${id}`}>
        document {document.id}
    </div>
);

describe('reducer', () => {
    describe('findIndexById', () => {
        const nodes = [<Component key="1" id="foo" />, <Component key="2" id="bar" />, <Component key="3" id="baz" />];

        it('should return the correct index when the ID exists in the nodes array', () => {
            const index = findIndexById(nodes, 'bar');
            expect(index).to.equal(1);
        });

        it('should return -1 when the ID does not exist in the nodes array', () => {
            const index = findIndexById(nodes, 'does not exist');
            expect(index).to.equal(-1);
        });
    });

    describe('getNodeChildrenIds', () => {
        const nodes = [
            <Component key="1" id="root" />,
            <Component key="6" id="foo" parentId="root" />,
            <Component key="3" id="baz" parentId="foo" />,
            <Component key="4" id="qux" parentId="foo" />,
            <Component key="2" id="bar" parentId="root" />,
            <Component key="5" id="childless" parentId="bar" />,
        ];

        it('should return the correct array of children IDs for a given node with a child', () => {
            const childrenIds = getNodeChildrenIds(nodes, 'bar');
            expect(childrenIds).to.deep.equal(['childless']);
        });

        it('should return the correct array of children IDs for a given node with children', () => {
            const childrenIds = getNodeChildrenIds(nodes, 'foo');
            expect(childrenIds).to.deep.equal(['baz', 'qux']);
        });

        it('should return an empty array when the node has no children', () => {
            const childrenIds = getNodeChildrenIds(nodes, 'childless');
            expect(childrenIds).to.deep.equal([]);
        });

        it('should return an empty array when the node has no matching parent ID', () => {
            const childrenIds = getNodeChildrenIds(nodes, 'not matching');
            expect(childrenIds).to.deep.equal([]);
        });
    });

    describe('updateNodeWithNewChildren', () => {
        it('should return a new array with the children inserted at the correct parent', () => {
            const nodes = [
                <Component key="1" id="foo" parentId="root" />,
                <Component key="3" id="baz" parentId="foo" />,
                <Component key="4" id="qux" parentId="foo" />,
                <Component key="2" id="bar" parentId="root" />,
            ];

            const newChildren = [
                <Component key="5" id="quux" parentId="baz" />,
                <Component key="6" id="corge" parentId="baz" />,
            ];

            const updatedNodes = updateNodeWithNewChildren(nodes, 'baz', newChildren);
            expect(updatedNodes).to.deep.equal([nodes[0], nodes[1], ...newChildren, nodes[2], nodes[3]]);
        });

        it("should return the original array with no children added if the parent doesn't exist", () => {
            const nodes = [
                <Component key="1" id="foo" parentId="root" />,
                <Component key="3" id="baz" parentId="foo" />,
                <Component key="4" id="qux" parentId="foo" />,
                <Component key="2" id="bar" parentId="root" />,
            ];

            const newChildren = [
                <Component key="5" id="quux" parentId="bar" />,
                <Component key="6" id="corge" parentId="bar" />,
            ];

            const updatedNodes = updateNodeWithNewChildren(nodes, 'i-do-not-exist', newChildren);
            expect(updatedNodes).to.deep.equal([nodes[0], nodes[1], nodes[2], nodes[3]]);
        });

        it('should return a new array with the children added after an opened item', () => {
            const nodes = [
                <Component key="1" id="foo" parentId="root" />,
                <Component key="5" id="var" parentId="foo" />,
                <Component key="6" id="tar" parentId="foo" />,
                <Component key="3" id="baz" parentId="root" />,
                <Component key="4" id="qux" parentId="root" />,
                <Component key="2" id="bar" parentId="root" />,
            ];

            const newChildren = [
                <Component key="7" id="quux" parentId="baz" />,
                <Component key="8" id="corge" parentId="baz" />,
            ];

            const updatedNodes = updateNodeWithNewChildren(nodes, 'baz', newChildren);
            expect(updatedNodes).to.deep.equal([
                nodes[0],
                nodes[1],
                nodes[2],
                nodes[3],
                ...newChildren,
                nodes[4],
                nodes[5],
            ]);
        });
    });

    describe('getCurrentChildrenForNewNodesIfExpanded', () => {
        it('should return the new nodes with old children of the expanded id', () => {
            const children = [
                <Component key="5" id="var" parentId="foo" />,
                <Component key="6" id="tar" parentId="foo" />,
            ];

            const nodes = [
                <Component key="1" id="foo" parentId="root" />,
                <Component key="3" id="baz" parentId="root" />,
                <Component key="4" id="qux" parentId="root" />,
                <Component key="2" id="bar" parentId="root" />,
            ];

            const oldNodes = [nodes[0], ...children, nodes[1], nodes[2]];

            expect(getCurrentChildrenForNewNodesIfExpanded(oldNodes, new Set(['foo']), nodes)).to.deep.equal([
                nodes[0],
                ...children,
                nodes[1],
                nodes[2],
                nodes[3],
            ]);
        });
    });

    describe('currentNodesChanged', () => {
        it('should return true if new nodes contentComponent props changed', () => {
            const contentComponent = (
                    <ContentComponent id="content1" document={{ id: '1', targets: [], visibility: 'EDITOR' }} />
                ),
                newContentComponent = (
                    <ContentComponent id="content1" document={{ id: '1', targets: [1], visibility: 'EDITOR' }} />
                );
            const currentNodes = [
                <Component key="1" id="1" contentComponent={contentComponent} />,
                <Component key="3" id="3" contentComponent={contentComponent} />,
                <Component key="4" id="4" contentComponent={contentComponent} />,
            ];

            const newNodes = [
                <Component key="1" id="1" contentComponent={contentComponent} />,
                <Component key="3" id="3" contentComponent={newContentComponent} />,
                <Component key="4" id="4" contentComponent={contentComponent} />,
            ];

            expect(currentNodesChanged(['1', '3', '4'], currentNodes, newNodes)).to.be.true;
        });

        it('should return false if new nodes contentComponent props do not changed', () => {
            const contentComponent = (
                <ContentComponent id="content1" document={{ id: '1', targets: [], visibility: 'EDITOR' }} />
            );
            const currentNodes = [
                <Component key="1" id="1" contentComponent={contentComponent} />,
                <Component key="3" id="3" contentComponent={contentComponent} />,
                <Component key="4" id="4" contentComponent={contentComponent} />,
            ];

            const newNodes = [
                <Component key="1" id="1" contentComponent={contentComponent} />,
                <Component key="3" id="3" contentComponent={contentComponent} />,
                <Component key="4" id="4" contentComponent={contentComponent} />,
            ];

            expect(currentNodesChanged(['1', '3', '4'], currentNodes, newNodes)).to.be.false;
        });

        it('should return true if new nodes with no contentComponent but props changed', () => {
            const currentNodes = [
                <Component key="1" id="1" props1="1" />,
                <Component key="3" id="3" />,
                <Component key="4" id="4" />,
            ];

            const newNodes = [
                <Component key="1" id="1" props1="2" />,
                <Component key="3" id="3" />,
                <Component key="4" id="4" />,
            ];

            expect(currentNodesChanged(['1', '3', '4'], currentNodes, newNodes)).to.be.true;
        });

        it('should return false if new nodes with no contentComponent but no props changed, excluding functions', () => {
            const currentNodes = [
                <Component key="1" id="1" props1={() => void 0} />,
                <Component key="3" id="3" />,
                <Component key="4" id="4" />,
            ];

            const newNodes = [
                <Component key="1" id="1" props1={() => void 0} />,
                <Component key="3" id="3" />,
                <Component key="4" id="4" />,
            ];

            expect(currentNodesChanged(['1', '3', '4'], currentNodes, newNodes)).to.be.false;
        });
    });
});
