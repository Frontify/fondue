/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { parseHtml, type RteDocument, type RteDocumentWith, serializeToHtml } from '../index';
import { columnBreakPlugin, defaultPlugins, mentionPlugin } from '../plugins';

// A host that stores HTML opens it with `parseHtml` and saves it with
// `serializeToHtml`: each save and open must give back the document it saved.

const plugins = [
    ...defaultPlugins,
    mentionPlugin({ items: [], href: (mention) => (mention.kind === 'all' ? undefined : `/people/${mention.id}`) }),
    columnBreakPlugin(),
];

/** Every block, mark and inline the shipped plugins write, as the editor hands them to the host. */
const doc: RteDocumentWith<{ block: { type: 'columnBreak' } }> = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading2', children: [{ text: 'A heading' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'A caption' }] },
        {
            type: 'paragraph',
            align: 'center',
            children: [
                { text: 'bold', bold: true },
                { text: 'italic', italic: true },
                { text: 'underline', underline: true },
                { text: 'struck', strikethrough: true },
                { text: 'code', code: true },
                { text: 'sub', subscript: true },
                { text: 'sup', superscript: true },
                { text: 'red', fontColor: { color: '#ff0000' } },
                { text: 'link', link: { href: 'https://example.com', openInNewTab: true } },
                { type: 'break' },
                { text: 'after the break' },
            ],
        },
        { type: 'paragraph', children: [] },
        { type: 'paragraph', children: [{ text: 'Ends with a break' }, { type: 'break' }] },
        { type: 'quote', children: [{ text: 'A quote' }] },
        {
            type: 'numberedList',
            start: 3,
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'One' }] }] }],
        },
        {
            type: 'bulletList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Dot' }] }] }],
        },
        {
            type: 'checkList',
            children: [
                { type: 'checkItem', checked: true, children: [{ type: 'paragraph', children: [{ text: 'Done' }] }] },
                {
                    type: 'checkItem',
                    checked: 'inProgress',
                    children: [{ type: 'paragraph', children: [{ text: 'Started' }] }],
                },
            ],
        },
        { type: 'columnBreak' },
    ],
};

describe('parseHtml', () => {
    it('gives back the document serializeToHtml wrote', () => {
        expect(parseHtml(serializeToHtml(doc, { plugins }), { plugins })).toEqual(doc);
    });

    it('reads a mention as its text, linked when it carries a link, as a paste does', () => {
        const withMentions: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' },
                        { text: ' and ' },
                        { type: 'mention', id: 'all', username: 'all', name: 'Everyone', kind: 'all' },
                    ],
                },
            ],
        };

        expect(parseHtml(serializeToHtml(withMentions, { plugins }), { plugins }).blocks).toEqual([
            { type: 'paragraph', children: [{ text: '@jane', link: { href: '/people/jane' } }, { text: ' and @all' }] },
        ]);
    });

    it('reads with the shipped content when given no plugins', () => {
        const shipped: RteDocument = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Plain ' }, { text: 'bold', bold: true }] }],
        };

        expect(parseHtml(serializeToHtml(shipped))).toEqual(shipped);
    });
});
