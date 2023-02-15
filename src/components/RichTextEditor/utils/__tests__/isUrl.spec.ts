/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isUrl } from '../isUrl';

describe('Valid urls', () => {
    it('http://google.com', () => {
        expect(isUrl('http://google.com')).to.be.true;
    });

    it('https://google.com', () => {
        expect(isUrl('https://google.com')).to.be.true;
    });

    it('ftp://google.com', () => {
        expect(isUrl('ftp://google.com')).to.be.true;
    });

    it('http://www.google.com', () => {
        expect(isUrl('http://www.google.com')).to.be.true;
    });

    it('http://google.com/something', () => {
        expect(isUrl('http://google.com/something')).to.be.true;
    });

    it('http://google.com?q=query', () => {
        expect(isUrl('http://google.com?q=query')).to.be.true;
    });

    it('http://google.com#hash', () => {
        expect(isUrl('http://google.com#hash')).to.be.true;
    });

    it('http://google.com/something?q=query#hash', () => {
        expect(isUrl('http://google.com/something?q=query#hash')).to.be.true;
    });

    it('mailto:hello@frontify.com', () => {
        expect(isUrl('mailto:hello@frontify.com')).to.be.true;
    });
});

describe('Invalid urls', () => {
    it('//google.com', () => {
        expect(isUrl('//google.com')).to.be.false;
    });

    it('http://', () => {
        expect(isUrl('http://')).to.be.false;
    });

    it('google', () => {
        expect(isUrl('google')).to.be.false;
    });

    it('google.com', () => {
        expect(isUrl('google.com')).to.be.false;
    });

    it('empty', () => {
        expect(isUrl('')).to.be.false;
    });
});
