/* (c) Copyright Frontify Ltd., all rights reserved. */

import { draggableItemCompareFn } from '@utilities/dnd/draggableItemCompareFn';
import { type DraggableItem } from '@utilities/dnd/types';

describe('draggableItemCompareFn', () => {
    const firstItem: DraggableItem = { id: '1', sort: 1 };
    const secondItem: DraggableItem = { id: '2', sort: 2 };

    it('Should return 1 when one of the items has sort set to null', () => {
        const expected = 1;

        firstItem.sort = null;

        const result = draggableItemCompareFn(firstItem, secondItem);
        expect(result).equal(expected);
    });

    it('Should return 1 when both items have sort set to null', () => {
        const expected = 1;

        firstItem.sort = null;
        secondItem.sort = null;

        const result = draggableItemCompareFn(firstItem, secondItem);
        expect(result).equal(expected);
    });

    it('Should return positive number when both items have sort set to number and first is bigger', () => {
        const expected = 3;

        firstItem.sort = 7;
        secondItem.sort = 4;

        const result = draggableItemCompareFn(firstItem, secondItem);
        expect(result).equal(expected);
    });

    it('Should return negative number when both items have sort set to number and second is bigger', () => {
        const expected = -3;

        firstItem.sort = 4;
        secondItem.sort = 7;

        const result = draggableItemCompareFn(firstItem, secondItem);
        expect(result).equal(expected);
    });
});
