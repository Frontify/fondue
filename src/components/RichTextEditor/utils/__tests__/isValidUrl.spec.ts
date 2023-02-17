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
    it('//xyz.com', () => {
        expect(isValidUrl('//xyz.com')).to.be.false;
    });

    it('https://', () => {
        expect(isValidUrl('https://')).to.be.false;
    });

    it('frontify', () => {
        expect(isValidUrl('frontify')).to.be.false;
    });

    it('brand.com', () => {
        expect(isValidUrl('brand.com')).to.be.false;
    });

    it('empty', () => {
        expect(isValidUrl('')).to.be.false;
    });
});
