/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    blockquote,
    bulletList,
    cell,
    codeBlock,
    heading,
    link,
    listItem,
    mark,
    mention,
    node,
    paragraph,
    row,
    rule,
    table,
    taskItem,
    taskList,
    text,
} from '#/features/__fixtures__/documents';
import { type JsonValue } from '#/model';

import { semanticCodecs, stored } from '../../fixtures/codecs/helpers';

const codecs = semanticCodecs();
const plain = (...blocks: readonly JsonValue[]) => codecs.toPlainText(stored(...blocks)).text;
const image = (altIntent: string, altText: string) =>
    node(
        'figure',
        { nodeId: 'f-1', align: 'center' },
        node('asset_image', {
            nodeId: 'i-1',
            assetId: 'a-1',
            labelSnapshot: 'Photo',
            altIntent,
            altText,
            width: null,
            height: null,
            displayWidth: null,
            mediaType: null,
        }),
    );
const embed = (title: string | null) =>
    node('embed', { nodeId: 'e-1', url: 'https://www.youtube.com/watch?v=x', provider: 'youtube', title });
const ordered = (start: number, ...items: readonly JsonValue[]) =>
    node('ordered_list', { start, marker: null }, ...items);

describe('toPlainText rules', () => {
    it.each<readonly [string, readonly JsonValue[], string]>([
        [
            'block separation: one blank line between top-level blocks, one newline between list items and table rows',
            [
                paragraph(text('One')),
                bulletList(listItem(paragraph(text('a'))), listItem(paragraph(text('b')))),
                table('t-1', row(cell({}, paragraph(text('r1')))), row(cell({}, paragraph(text('r2'))))),
            ],
            'One\n\n- a\n- b\n\nr1\nr2',
        ],
        ['hard_break: a newline', [paragraph(text('a'), node('hard_break'), text('b'))], 'a\nb'],
        [
            'bullet items, two spaces of indent per level',
            [bulletList(listItem(paragraph(text('a')), bulletList(listItem(paragraph(text('b'))))))],
            '- a\n  - b',
        ],
        [
            'ordered items, numbered from start',
            [ordered(3, listItem(paragraph(text('a'))), listItem(paragraph(text('b'))))],
            '3. a\n4. b',
        ],
        [
            'task items',
            [
                taskList(
                    taskItem('t-1', paragraph(text('open'))),
                    node('task_item', { nodeId: 't-2', checked: true }, paragraph(text('done'))),
                ),
            ],
            '- [ ] open\n- [x] done',
        ],
        ['heading: its text', [heading('h-1', text('Title'))], 'Title'],
        [
            'link: its text, then the href when different',
            [paragraph(text('Frontify', link('https://frontify.com')))],
            'Frontify (https://frontify.com)',
        ],
        [
            'link whose text is its href: the text once',
            [paragraph(text('https://frontify.com', link('https://frontify.com')))],
            'https://frontify.com',
        ],
        [
            'link to a heading of the document: its text only',
            [heading('h-1', text('Plan')), paragraph(text('see plan', link('#h-1')))],
            'Plan\n\nsee plan',
        ],
        ['mention: @ and the label', [paragraph(text('Hi '), mention('m-1'))], 'Hi @Ada'],
        ['image with a meaningful alt text: the alt text', [image('meaningful', 'A cat')], 'A cat'],
        [
            'decorative image: nothing',
            [paragraph(text('a')), image('decorative', 'ignored'), paragraph(text('b'))],
            'a\n\nb',
        ],
        ['embed: its title, then the URL', [embed('Talk')], 'Talk (https://www.youtube.com/watch?v=x)'],
        ['embed with no title: the URL alone', [embed(null)], 'https://www.youtube.com/watch?v=x'],
        [
            'table cells joined by a tab',
            [table('t-1', row(cell({}, paragraph(text('a'))), cell({}, paragraph(text('b')))))],
            'a\tb',
        ],
        ['code block: its text exactly', [codeBlock(text('  const a = 1;\n\tb();  '))], '  const a = 1;\n\tb();  '],
        ['column_break: nothing', [paragraph(text('a')), node('column_break'), paragraph(text('b'))], 'a\n\nb'],
        ['horizontal_rule: --- on its own line', [paragraph(text('a')), rule(), paragraph(text('b'))], 'a\n\n---\n\nb'],
        ['quote: its blocks', [blockquote(paragraph(text('q1')), paragraph(text('q2')))], 'q1\n\nq2'],
        [
            'marks: the text',
            [paragraph(text('bold', mark('bold')), text(' and '), text('code', mark('code')))],
            'bold and code',
        ],
    ])('SPEC-rich-text-output/AC-019 %s', (_, blocks, expected) => {
        expect(plain(...blocks)).toBe(expected);
    });

    it('SPEC-rich-text-output/AC-019 writes the text of an opaque island and reports it by its decode diagnostic', () => {
        const output = codecs.toPlainText(
            stored(paragraph(text('a')), { type: 'callout', content: [{ type: 'text', text: 'Island' }] }),
        );

        expect(output.text).toBe('a\n\nIsland');
        expect(output.diagnostics).toEqual([
            expect.objectContaining({ code: 'format.unknown-node', path: '/content/content/1' }),
        ]);
    });
});

describe('toPlainText list items', () => {
    it('SPEC-rich-text-output/AC-019 indents the later lines and blocks of an item, and writes an empty item as its marker', () => {
        expect(
            plain(
                bulletList(
                    listItem(
                        paragraph(text('a'), node('hard_break'), text('b')),
                        blockquote(paragraph(text('x')), paragraph(text('y'))),
                    ),
                    listItem(paragraph()),
                ),
            ),
        ).toBe('- a\n  b\n  x\n\n  y\n-');
    });
});
