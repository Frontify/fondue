/* (c) Copyright Frontify Ltd., all rights reserved. */

import { makeIdGenerator } from './makeIdGenerator';

describe('makeIdGenerator()', () => {
    it('should generate unique IDs with different prefixes', () => {
        const generateId1 = makeIdGenerator('prefix1');
        const generateId2 = makeIdGenerator('prefix2');

        expect(generateId1()).to.equal('prefix1-0');
        expect(generateId2()).to.equal('prefix2-0');
        expect(generateId1()).to.equal('prefix1-1');
        expect(generateId2()).to.equal('prefix2-1');
    });

    it('should generate unique IDs without a prefixToken being passed based on current date', () => {
        const now = new Date();
        cy.clock(now.getTime());

        cy.window().then(() => {
            const generateId = makeIdGenerator();

            expect(generateId()).to.equal(`${+now}-0`);
            expect(generateId()).to.equal(`${+now}-1`);
        });
    });
});
