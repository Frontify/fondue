/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { isSafeHref, toHref } from './href';

describe('toHref', () => {
    it('completes a bare domain, and a local address with a port, to https', () => {
        expect(toHref('example.com')).toBe('https://example.com');
        expect(toHref('  example.com/path?q=1  ')).toBe('https://example.com/path?q=1');
        expect(toHref('localhost:3000')).toBe('https://localhost:3000');
    });

    it('keeps a web, mail or phone link as typed', () => {
        expect(toHref('http://example.com')).toBe('http://example.com');
        expect(toHref('mailto:ana@example.com')).toBe('mailto:ana@example.com');
        expect(toHref('tel:+41441234567')).toBe('tel:+41441234567');
    });

    it('turns an email address into a mail link', () => {
        expect(toHref('ana@example.com')).toBe('mailto:ana@example.com');
    });

    it('keeps relative paths and fragments', () => {
        expect(toHref('/docs/start')).toBe('/docs/start');
        expect(toHref('../up')).toBe('../up');
        expect(toHref('#section')).toBe('#section');
    });

    it('rejects what cannot be a link', () => {
        expect(toHref('')).toBeNull();
        expect(toHref('not a url')).toBeNull();
        expect(toHref('hello')).toBeNull();
        expect(toHref('javascript:alert(1)')).toBeNull();
        expect(toHref('data:text/html,hi')).toBeNull();
        expect(toHref('https://')).toBeNull();
        expect(toHref('javascript:0/alert(1)')).toBeNull();
        expect(toHref('javascript:1')).toBeNull();
    });
});

describe('isSafeHref', () => {
    it('allows web, mail, phone and relative links', () => {
        for (const href of [
            'https://example.com',
            'http://x.y',
            'mailto:a@b.c',
            'tel:1',
            '/a',
            '#b',
            'page.html',
            '',
        ]) {
            expect(isSafeHref(href)).toBe(true);
        }
    });

    it('refuses script and data URLs, however they are disguised', () => {
        for (const href of [
            'javascript:alert(1)',
            'JavaScript:alert(1)',
            ' java\tscript:alert(1)',
            'data:text/html,x',
            'vbscript:x',
            // A scheme followed by digits reads like a host and a port, but a browser runs it.
            'javascript:0/alert(1)',
            'javascript:1',
            'javascript:0?alert(1):0',
            'JAVASCRIPT:0#x',
        ]) {
            expect(isSafeHref(href)).toBe(false);
        }
    });

    it('refuses control characters and overlong links', () => {
        expect(isSafeHref('https://example.com/\u0000')).toBe(false);
        expect(isSafeHref('https://example.com/\u0085')).toBe(false);
        expect(isSafeHref(`https://example.com/${'a'.repeat(2048)}`)).toBe(false);
    });

    it('refuses what is not a string', () => {
        for (const href of [undefined, null, true, 1, {}, ['https://example.com']]) {
            expect(isSafeHref(href)).toBe(false);
        }
    });
});
