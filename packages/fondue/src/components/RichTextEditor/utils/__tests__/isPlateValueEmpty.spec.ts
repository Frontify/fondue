/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isPlateValueEmpty } from '../isPlateValueEmpty';

const emptyValue = [{ type: 'something', children: [{ text: '' }] }];

describe('Plate value is Empty', () => {
    it('should be empty on null value', () => {
        expect(isPlateValueEmpty(null)).to.equal(true);
    });

    it('should be empty on empty array', () => {
        expect(isPlateValueEmpty([])).to.equal(true);
    });

    it('should be empty', () => {
        expect(isPlateValueEmpty(emptyValue)).to.equal(true);
    });
});

const notEmptyValue_1 = [
    { type: 'something', children: [{ text: '' }] },
    { type: 'something', children: [{ text: '' }] },
];
const notEmptyValue_2 = [{ type: '', children: [] }];
const notEmptyValue_3 = [{ type: 'something', children: [] }];
const notEmptyValue_4 = [{ type: 'something', children: [{ text: 'full of text' }] }];

describe('Plate value is Not Empty', () => {
    it('should exist multiple children', () => {
        expect(isPlateValueEmpty(notEmptyValue_1)).to.equal(false);
    });

    it('should be missing type', () => {
        expect(isPlateValueEmpty(notEmptyValue_2)).to.equal(false);
    });

    it('should be missing children', () => {
        expect(isPlateValueEmpty(notEmptyValue_3)).to.equal(false);
    });

    it('should be text in children', () => {
        expect(isPlateValueEmpty(notEmptyValue_4)).to.equal(false);
    });
});
