/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '../isValidUrl';

describe('Validate urls correctly', () => {
    it('https://frontify.com', () => {
        expect(isValidUrl('https://frontify.com')).to.equal(true);
    });

    it('https://frontify.com/something?q=query#hash', () => {
        expect(isValidUrl('https://frontify.com/something?q=query#hash')).to.equal(true);
    });

    it('mailto:hello@frontify.com', () => {
        expect(isValidUrl('mailto:hello@frontify.com')).to.equal(true);
    });

    it('tel:079', () => {
        expect(isValidUrl('tel:079')).to.equal(true);
    });

    it('https://', () => {
        expect(isValidUrl('https://')).to.equal(false);
    });

    it('textwithcolon:', () => {
        expect(isValidUrl('textwithcolon:')).to.equal(false);
    });

    it('loremipsumdolorsitamet', () => {
        expect(isValidUrl('loremipsumdolorsitamet')).to.equal(false);
    });

    it('empty string', () => {
        expect(isValidUrl('')).to.equal(false);
    });
});
