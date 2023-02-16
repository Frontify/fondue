/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '../isValidUrl';

describe('Valid urls', () => {
    it('http://frontify.com', () => {
        expect(isValidUrl('http://frontify.com')).to.be.true;
    });

    it('https://frontify.com', () => {
        expect(isValidUrl('https://frontify.com')).to.be.true;
    });

    it('ftp://frontify.com', () => {
        expect(isValidUrl('ftp://frontify.com')).to.be.true;
    });

    it('http://www.frontify.com', () => {
        expect(isValidUrl('http://www.frontify.com')).to.be.true;
    });

    it('http://frontify.com/something', () => {
        expect(isValidUrl('http://frontify.com/something')).to.be.true;
    });

    it('http://frontify.com?q=query', () => {
        expect(isValidUrl('http://frontify.com?q=query')).to.be.true;
    });

    it('http://frontify.com#hash', () => {
        expect(isValidUrl('http://frontify.com#hash')).to.be.true;
    });

    it('http://frontify.com/something?q=query#hash', () => {
        expect(isValidUrl('http://frontify.com/something?q=query#hash')).to.be.true;
    });

    it('mailto:hello@frontify.com', () => {
        expect(isValidUrl('mailto:hello@frontify.com')).to.be.true;
    });
});

describe('Invalid urls', () => {
    it('//google.com', () => {
        expect(isValidUrl('//google.com')).to.be.false;
    });

    it('http://', () => {
        expect(isValidUrl('http://')).to.be.false;
    });

    it('google', () => {
        expect(isValidUrl('google')).to.be.false;
    });

    it('google.com', () => {
        expect(isValidUrl('google.com')).to.be.false;
    });

    it('empty', () => {
        expect(isValidUrl('')).to.be.false;
    });
});
