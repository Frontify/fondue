/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentRepair, defineFeature } from '#/model';

const SCHEMES = ['https', 'http', 'mailto', 'tel'] as const;
const LINK_REPAIR: ContentRepair = { command: 'link.edit', feature: 'links' };
const LINK = { marks: ['link'] } as const;

/**
 * Links as the `link` mark, which typing at its end does not extend. `allowedSchemes` and `allowedHosts` narrow the
 * URL check everywhere the feature stores a link; `resourceTypes` names what its editor part's popover searches.
 */
export const link = defineFeature({
    id: 'links',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: {
        allowedSchemes: {
            type: 'list',
            items: { type: 'enum', values: SCHEMES },
            nullable: true,
            default: null,
        },
        allowedHosts: { type: 'list', items: { type: 'string', minLength: 1 }, nullable: true, default: null },
        resourceTypes: { type: 'list', items: { type: 'id' }, default: [] },
    },
    marks: {
        link: {
            attrs: {
                href: { type: 'url', required: true },
                openInNewWindow: { type: 'boolean', default: false },
                styleId: { type: 'id', nullable: true, default: null },
            },
            html: ['a', { href: { attr: 'href' }, rel: 'noopener' }, 0],
            parse: [
                {
                    tag: 'a[href]',
                    attrs: {
                        href: { from: 'href' },
                        openInNewWindow: { from: 'target', equals: '_blank' },
                        styleId: { from: 'data-rte-style' },
                    },
                },
            ],
            rank: -2,
            inclusive: false,
        },
    },
    // Plain text keeps the text; Markdown keeps the URL and drops the new window and the style.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    contentRules: [
        {
            id: 'link.text-empty',
            kind: 'automatic',
            severity: 'error',
            subject: LINK,
            repair: LINK_REPAIR,
            check: ({ text }) => (text.trim() === '' ? { payload: null } : undefined),
        },
        {
            id: 'link.text-vague',
            kind: 'automatic',
            severity: 'warning',
            subject: LINK,
            repair: LINK_REPAIR,
            check: ({ text }, { vagueTexts }) =>
                vagueTexts.has(text.trim().toLowerCase()) ? { payload: null } : undefined,
        },
        { id: 'link.purpose-review', kind: 'manual', severity: 'review', subject: LINK, check: () => true },
    ],
});
