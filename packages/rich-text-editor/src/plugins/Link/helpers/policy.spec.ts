/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { resolveLinkLabels } from './labels';
import { allowsHref, describeAllowed, type LinkPolicy } from './policy';

const describeWithDefaults = (policy: LinkPolicy): string => describeAllowed(policy, resolveLinkLabels());

describe('allowsHref', () => {
    it('allows every safe link when the policy names nothing', () => {
        for (const href of ['https://a.com', 'http://a.com', 'mailto:a@b.com', 'tel:+4912345', '/x', '#x', '?x']) {
            expect(allowsHref({}, href)).toBe(true);
        }
    });

    it('refuses what is not safe, whatever the policy', () => {
        for (const href of ['javascript:alert(1)', 'data:text/html,x', 1, null, undefined]) {
            expect(allowsHref({}, href)).toBe(false);
        }
    });

    it('limits the schemes', () => {
        const policy = { allowedSchemes: ['https', 'mailto'] } as const;

        expect(allowsHref(policy, 'https://a.com')).toBe(true);
        expect(allowsHref(policy, 'mailto:a@b.com')).toBe(true);
        expect(allowsHref(policy, 'http://a.com')).toBe(false);
        expect(allowsHref(policy, 'tel:+4912345')).toBe(false);
    });

    it('matches an exact host, and with a wildcard the host and its subdomains', () => {
        expect(allowsHref({ allowedHosts: ['frontify.com'] }, 'https://frontify.com/x')).toBe(true);
        expect(allowsHref({ allowedHosts: ['frontify.com'] }, 'https://app.frontify.com')).toBe(false);
        expect(allowsHref({ allowedHosts: ['*.frontify.com'] }, 'https://app.frontify.com')).toBe(true);
        expect(allowsHref({ allowedHosts: ['*.frontify.com'] }, 'https://a.b.frontify.com')).toBe(true);
        expect(allowsHref({ allowedHosts: ['*.frontify.com'] }, 'https://frontify.com')).toBe(true);
        expect(allowsHref({ allowedHosts: ['*.frontify.com'] }, 'https://evilfrontify.com')).toBe(false);
    });

    it('does not take a look-alike host for the allowed one', () => {
        const policy = { allowedHosts: ['frontify.com', '*.frontify.com'] };

        expect(allowsHref(policy, 'https://evilfrontify.com')).toBe(false);
        expect(allowsHref(policy, 'https://frontify.com.evil.com')).toBe(false);
        expect(allowsHref(policy, 'https://frontify.com@evil.com')).toBe(false);
    });

    it('reads hosts without regard to case', () => {
        expect(allowsHref({ allowedHosts: ['Frontify.com'] }, 'HTTPS://FRONTIFY.COM/x')).toBe(true);
    });

    it('applies hosts to every link that names one, and keeps mail, phone and relative links', () => {
        const policy = { allowedHosts: ['frontify.com'] };

        expect(allowsHref(policy, 'mailto:a@elsewhere.com')).toBe(true);
        expect(allowsHref(policy, 'tel:+41445000000')).toBe(true);
        expect(allowsHref(policy, 'mailto://evil.example/x')).toBe(false);
        expect(allowsHref(policy, 'tel://evil.example/x')).toBe(false);
        expect(allowsHref(policy, 'mailto://frontify.com/x')).toBe(true);
        expect(allowsHref(policy, '/x')).toBe(true);
        expect(allowsHref(policy, '#x')).toBe(true);
        expect(allowsHref(policy, './x')).toBe(true);
    });

    it('judges a link that leaves the site without a scheme by its host', () => {
        const policy = { allowedHosts: ['frontify.com'] };

        expect(allowsHref(policy, '//evil.com/x')).toBe(false);
        expect(allowsHref(policy, '/\\evil.com/x')).toBe(false);
        expect(allowsHref(policy, '//frontify.com/x')).toBe(true);
    });

    it('refuses a link it cannot read', () => {
        expect(allowsHref({ allowedHosts: ['frontify.com'] }, 'https://')).toBe(false);
    });
});

describe('describeAllowed', () => {
    it('names the hosts', () => {
        expect(describeWithDefaults({ allowedHosts: ['frontify.com', '*.frontify.com'] })).toBe(
            'Enter a link to frontify.com (or a subdomain).',
        );
        expect(describeWithDefaults({ allowedHosts: ['frontify.com'] })).toBe('Enter a link to frontify.com.');
        expect(describeWithDefaults({ allowedHosts: [] })).toBe('Enter a link within this site.');
        expect(describeWithDefaults({ allowedHosts: ['*.frontify.com'] })).toBe(
            'Enter a link to frontify.com (or a subdomain).',
        );
        expect(describeWithDefaults({ allowedHosts: ['a.com', 'b.com'] })).toBe('Enter a link to a.com or b.com.');
        expect(describeWithDefaults({ allowedHosts: ['*.frontify.com', 'b.com'] })).toBe(
            'Enter a link to frontify.com (or a subdomain) or b.com.',
        );
    });

    it('names the schemes', () => {
        expect(describeWithDefaults({ allowedSchemes: ['https', 'mailto'] })).toBe('Links may use https or mailto.');
    });

    it('names both', () => {
        expect(describeWithDefaults({ allowedHosts: ['frontify.com'], allowedSchemes: ['https'] })).toBe(
            'Enter a link to frontify.com. Links may use https.',
        );
    });

    it('says it with the labels a host passes', () => {
        const labels = resolveLinkLabels({
            hostsAllowed: (hosts) => `Nur ${hosts.join(' oder ')}.`,
            hostAndSubdomains: (host) => `${host} und Unterdomänen`,
            schemesAllowed: (schemes) => `Erlaubt: ${schemes.join(', ')}.`,
        });

        expect(describeAllowed({ allowedHosts: ['*.a.com', 'b.com'], allowedSchemes: ['https'] }, labels)).toBe(
            'Nur a.com und Unterdomänen oder b.com. Erlaubt: https.',
        );
    });

    it('names nothing when nothing is limited', () => {
        expect(describeWithDefaults({})).toBe('');
        expect(describeWithDefaults({ allowedSchemes: ['https', 'http', 'mailto', 'tel'] })).toBe('');
    });
});
