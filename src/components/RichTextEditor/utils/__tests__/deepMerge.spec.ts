/* (c) Copyright Frontify Ltd., all rights reserved. */

import { deepMerge } from '../deepMerge';

const defaultObject: object = {
    option1: {
        id: 1,
        type: 'text',
    },
    option2: {
        id: 2,
        type: 'image',
    },
};

const customObject1: object = {
    option1: {
        text: 'right',
    },
};

const customObject2: object = {
    option3: {
        id: 3,
    },
};

describe('deepMerge', () => {
    it('sets default values on empty object', () => {
        const result = deepMerge(defaultObject, {});

        expect(result).to.deep.equal(defaultObject);
    });

    it('merges with the defaults', () => {
        const result = deepMerge(defaultObject, customObject1);

        expect(result).to.deep.equal({
            option1: {
                id: 1,
                type: 'text',
                text: 'right',
            },
            option2: {
                id: 2,
                type: 'image',
            },
        });
    });

    it('adds to the defaults', () => {
        const result = deepMerge(defaultObject, customObject2);

        expect(result).to.deep.equal({
            option1: {
                id: 1,
                type: 'text',
            },
            option2: {
                id: 2,
                type: 'image',
            },
            option3: {
                id: 3,
            },
        });
    });
});
