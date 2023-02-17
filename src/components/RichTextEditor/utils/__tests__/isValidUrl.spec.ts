/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '../isValidUrl';

describe('Validate urls correctly', () => {
    it('https://frontify.com', () => {
        expect(isValidUrl('https://frontify.com')).to.be.true;
    });

    it('https://frontify.com/something?q=query#hash', () => {
        expect(isValidUrl('https://frontify.com/something?q=query#hash')).to.be.true;
    });

    it('mailto:hello@frontify.com', () => {
        expect(isValidUrl('mailto:hello@frontify.com')).to.be.true;
    });

    it('https://', () => {
        expect(isValidUrl('https://')).to.be.false;
    });

    it('loremipsumdolorsitamet', () => {
        expect(isValidUrl('loremipsumdolorsitamet')).to.be.false;
    });

    it('empty string', () => {
        expect(isValidUrl('')).to.be.false;
    });
});
