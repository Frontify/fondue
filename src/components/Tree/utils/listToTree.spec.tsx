/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeFlatListItem, TreeNodeItem } from '@components/Tree';
import { DraggableItem } from '@utilities/dnd';
import { listToTree } from '@components/Tree/utils/listToTree';
import { mockNodesFlat, mockNodesTree } from '@components/Tree/utils/mocks';

describe('listToTree', () => {
    let data: DraggableItem<TreeFlatListItem>[] = [];
    let expected: DraggableItem<TreeNodeItem>[] = [];

    it('Should return empty array on an empty array', () => {
        const result = listToTree(data);
        expect(result).to.deep.eq(expected);
    });

    it('Should return tree data structure on an flat data structure', () => {
        data = mockNodesFlat();
        expected = mockNodesTree;

        const result = listToTree(data);
        expect(result[0]).to.have.property('nodes');
        expect(result[0].nodes).to.be.instanceOf(Array);
        expect(result[0].nodes?.[0]).to.have.property('nodes');
        expect(result[0].nodes?.[0].nodes).to.be.instanceOf(Array);
        expect(result[0].nodes?.[1]).to.have.property('nodes');
        expect(result[0].nodes?.[1].nodes).to.be.instanceOf(Array);
        expect(result[0].nodes?.[1].nodes?.[0].nodes).to.be.undefined;
    });

    it('Should have item without children', () => {
        data = mockNodesFlat();
        expected = [];

        const result = listToTree(data);
        expect(result[0].nodes?.[0].nodes?.[0].nodes).to.be.undefined;
    });
});
