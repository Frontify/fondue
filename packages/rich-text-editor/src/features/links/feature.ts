/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, markRule, openControl, removeMark, setMark } from '#/model';

const SCHEMES = ['https', 'http', 'mailto', 'tel'] as const;
// An absolute URL after a space, a bracket, a quote or the block start, without the punctuation that ends a sentence.
const AUTOLINK = /(?<=^|[\s([{<"'])(?<href>(?:https?:\/\/|mailto:|tel:)[^\s<>]*[^\s<>.,;:!?'")\]}])\s$/u;

/**
 * Links as the `link` mark, which typing at its end does not extend. `link.edit` opens the link popover, `link.set`
 * sets a link over the selection, the whole link at a caret inside one, or inserts its visible text at a caret outside
 * one, and `link.remove` removes the whole link and keeps its text. `allowedSchemes` and `allowedHosts` narrow the URL
 * check everywhere the feature stores a link; `resourceTypes` names what the popover searches.
 */
export const links = defineFeature({
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
    commands: {
        'link.edit': openControl('link'),
        'link.set': setMark(
            'link',
            {
                fields: {
                    href: { type: 'url' },
                    text: { type: 'string', optional: true },
                    openInNewWindow: { type: 'boolean' },
                    styleId: { type: 'id', nullable: true },
                },
            },
            { extendToMarkRange: true },
        ),
        'link.remove': removeMark('link', { extendToMarkRange: true }),
    },
    keys: { 'Mod-k': 'link.edit' },
    inputRules: [markRule({ id: 'link.autolink', match: AUTOLINK, mark: 'link', on: ['input', 'enter'] })],
    toolbar: [{ kind: 'button', command: 'link.edit', labelKey: 'RichTextEditor_link', icon: 'IconLink' }],
});
