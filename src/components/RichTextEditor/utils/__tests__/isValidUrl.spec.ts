/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '../isValidUrl';

describe('Valid urls', () => {
    it('https://frontify.com', () => {
        expect(isValidUrl('https://frontify.com')).to.be.true;
    });

    it('https://frontify.com/something', () => {
        expect(isValidUrl('https://frontify.com/something')).to.be.true;
    });

    it('https://frontify.com/something?q=query#hash', () => {
        expect(isValidUrl('https://frontify.com/something?q=query#hash')).to.be.true;
    });

    it('mailto:hello@frontify.com', () => {
        expect(isValidUrl('mailto:hello@frontify.com')).to.be.true;
    });
});

describe('Invalid urls', () => {
    it('//this-could-be-a-long-domain.com', () => {
        expect(isValidUrl('//this-could-be-a-long-domain.com')).to.be.false;
    });

    it('https://', () => {
        expect(isValidUrl('https://')).to.be.false;
    });

    it('loremipsumdolorsitamet', () => {
        expect(isValidUrl('loremipsumdolorsitamet')).to.be.false;
    });

    it('anotherlongbranddomaintoinordertonetgetflaggedforcodeduplication.com', () => {
        expect(isValidUrl('anotherlongbranddomaintoinordertonetgetflaggedforcodeduplication.com')).to.be.false;
    });

    it('empty', () => {
        expect(isValidUrl('')).to.be.false;
    });
});
