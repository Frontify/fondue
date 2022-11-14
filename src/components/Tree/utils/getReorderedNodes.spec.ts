/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeFlatListItem } from '@components/Tree';
import { DraggableItem } from '@utilities/dnd';
import { getReorderedNodes } from '@components/Tree/utils/getReorderedNodes';

const nodes = [
    {
        id: '1',
        sort: null,
        parentId: null,
    },
    {
        id: '2',
        sort: null,
        parentId: null,
    },
    {
        id: '3',
        sort: null,
        parentId: '1',
    },
    {
        id: '4',
        sort: null,
        parentId: '2',
    },
] as DraggableItem<TreeFlatListItem>[];

describe('getReorderedItems', () => {
    it('handles moving items between different parents after', () => {
        const result = getReorderedNodes(nodes[3].id, nodes[2].parentId, null, nodes);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(nodes[2].id);
        expect(result[1].id).to.equal(nodes[3].id);
        expect(result[0].parentId).to.equal('1');
        expect(result[0].sort).to.equal(0);
        expect(result[1].sort).to.equal(1);
    });

    it('handles moving items between different parents before', () => {
        const result = getReorderedNodes(nodes[3].id, nodes[2].parentId, nodes[2].id, nodes);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(nodes[3].id);
        expect(result[0].parentId).to.equal('1');
        expect(result[0].sort).to.equal(0);
    });

    it('handles moving items between different parents within', () => {
        const result = getReorderedNodes(nodes[3].id, nodes[0].id, null, nodes);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(nodes[2].id);
        expect(result[1].id).to.equal(nodes[3].id);
        expect(result[0].parentId).to.equal('1');
        expect(result[0].sort).to.equal(0);
        expect(result[1].parentId).to.equal('1');
        expect(result[1].sort).to.equal(1);
    });
});
