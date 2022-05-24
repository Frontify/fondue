/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableItem, DropZonePosition } from '@utilities/dnd/types';
import { moveItems } from '@utilities/dnd/moveItems';

const items: DraggableItem<any> = [
    {
        id: '1',
        sort: null,
    },
    {
        id: '2',
        sort: null,
    },
    {
        id: '3',
        sort: null,
    },
];

describe('moveItems', () => {
    it('adds correct sort property for dropping after', () => {
        const result = moveItems(items[0], items[2], DropZonePosition.After, items);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(items[0].id);
        expect(result[1].id).to.equal(items[2].id);

        expect(result[0].sort).to.equal(0);
        expect(result[1].sort).to.equal(1);
    });

    it('adds correct sort property for dropping before', () => {
        const result = moveItems(items[0], items[2], DropZonePosition.Before, items);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(items[2].id);

        expect(result[0].sort).to.equal(0);
    });

    it('adds correct sort property for dropping after last item', () => {
        const result = moveItems(items[2], items[0], DropZonePosition.After, items);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(3);
        expect(result[0].id).to.equal(items[1].id);
        expect(result[1].id).to.equal(items[2].id);
        expect(result[2].id).to.equal(items[0].id);

        expect(result[0].sort).to.equal(0);
        expect(result[1].sort).to.equal(1);
        expect(result[2].sort).to.equal(2);
    });
});
