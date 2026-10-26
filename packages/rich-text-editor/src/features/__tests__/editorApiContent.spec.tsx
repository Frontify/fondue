/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { Node } from 'prosemirror-model';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type CommandOutcome, type EditorApi, type WriteOutcome } from '#/entries/authoring';
import { bold, codeBlock, core, fontColor, heading, links, mediaImage } from '#/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { type AuthoringPolicy } from '#/index';
import { compileContentModel, type ContentNodeJSON, defineFeature, type RichTextDocument } from '#/model';
import { type CommandState } from '#/runtime/types';
import { setSelection, typeText } from '#/testing';

import {
    paragraph,
    title,
    stored,
    blocksOf,
    attrsAt,
    text,
    heading2,
    textsOf,
    probeHarness,
} from './fixtures/editorApi';

let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | CommandState | WriteOutcome | undefined;
let walked = 0;
let live: EditorApi | undefined;

const { mount, runIn } = probeHarness({
    script: () => script,
    setScript: (run) => {
        script = run;
    },
    setLive: (api) => {
        live = api;
    },
});

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

beforeEach(() => {
    script = () => false;
    seen = undefined;
    live = undefined;
});

describe('a write from plugin UI', () => {
    it('is a command of its own, which one undo reverts apart from the typing before it', () => {
        const { handle, changes } = mount();
        setSelection(handle, { text: 'Plain', from: 5, to: 5 });
        act(() => {
            typeText(handle, 'ly');
            live?.insert.text('1');
            live?.insert.text('2');
        });

        expect(changes.at(-1)?.origin).toBe('command');
        const text = () => blocksOf(handle)?.[0]?.content?.[0]?.text;
        expect(text()).toBe('Plainly12 ');
        act(() => {
            handle.execute('history.undo');
        });
        expect(text()).toBe('Plainly1 ');
        act(() => {
            handle.execute('history.undo');
        });
        expect(text()).toBe('Plainly ');
    });
});

describe('the writer of the editor API', () => {
    it('replaces, inserts and deletes stored nodes by range or node ID', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => {
            const run = api.blocks.list('heading')[0];
            if (run === undefined) {
                return false;
            }

            seen = api.content.replace(run.range, [heading2('Renamed')]);

            return seen.status === 'applied';
        });
        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Renamed']);

        const renamed = () => blocksOf(handle)?.[1]?.attrs?.nodeId as string;
        expect(renamed()).not.toBe('heading-1');

        const nodeId = renamed();
        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId, at: 'before' }, [heading2('Before')]);

            return true;
        });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Before', 'Renamed']);

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId, at: 'end' }, [text('!')]);

            return true;
        });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Before', 'Renamed!']);

        runIn(handle, 'Plain', (api) => {
            seen = api.content.delete({ nodeId });

            return true;
        });
        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Before']);
    });

    it.each([
        ['a node the vocabulary does not hold', [{ type: 'table' }]],
        ['a mark the vocabulary does not hold', [text('x', [{ type: 'highlight' }])]],
        ['an attribute its type does not take', [{ type: 'heading', attrs: { level: 9 }, content: [text('x')] }]],
        ['a block where only text fits', [heading2('x')]],
    ])('refuses %s as invalid and changes nothing', (_name, nodes) => {
        const { handle, changes } = mount();

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert(api.selectedRange(), nodes);

            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'invalid' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
        expect(changes).toEqual([]);
    });

    it('refuses bold text in a code block as invalid, where paste would drop the mark', () => {
        const { handle } = mount();

        runIn(handle, 'Title', (api) => {
            api.blocks.set('code_block');
            seen = api.content.insert(api.selectedRange(), [text('x', [{ type: 'bold' }])]);

            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'invalid' });
    });

    it.each([
        [
            'a feature that may not be pasted',
            { features: { 'marks.bold': { create: true, edit: true, remove: true, paste: false } } },
            [text('x', [{ type: 'bold' }])],
        ],
        [
            'a feature that may not be created',
            { features: { 'blocks.heading': { create: false, edit: true, remove: true, paste: true } } },
            [heading2('x')],
        ],
        ['a heading level the policy does not offer', { creatableHeadingLevels: [1] }, [heading2('x')]],
    ] as const)('refuses %s as policy and changes nothing', (_name, policy, nodes) => {
        const { handle } = mount({ policy: policy as Partial<AuthoringPolicy> });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at: 'after' }, nodes as unknown as ContentNodeJSON[]);

            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'policy' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it.each([
        ['text longer than the limit', { maxTextLength: 20 }, 'end', [text('x'.repeat(30))]],
        ['more nodes than the limit', { maxDocumentNodes: 8 }, 'after', [heading2('a'), heading2('b'), heading2('c')]],
        [
            'a nesting deeper than the limit',
            { maxDepth: 3 },
            'after',
            [
                {
                    type: 'quote',
                    content: [
                        {
                            type: 'quote',
                            content: [{ type: 'paragraph', attrs: { lang: null }, content: [text('x')] }],
                        },
                    ],
                },
            ],
        ],
    ] as const)('refuses %s as limit and changes nothing', (_name, limits, at, nodes) => {
        const { handle } = mount({ limits });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at }, nodes as unknown as ContentNodeJSON[]);

            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'limit' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('checks the structure of the written content only, not of a document of 20,000 nodes', () => {
        const filler = Array.from({ length: 10_000 }, (_value, index) => ({
            type: 'paragraph',
            attrs: { lang: null },
            content: [text(`Filler ${index}`)],
        }));
        const large = {
            ...stored,
            content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph, title, ...filler] },
        } as unknown as RichTextDocument;
        const { handle } = mount({ document: large });
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });
        script = (api) =>
            api.content.insert({ nodeId: 'heading-1', at: 'after' }, [heading2('Warm')]).status === 'applied';
        // The first write measures the document size, which later writes read from a cache.
        act(() => {
            handle.execute('fixture.api.run');
        });
        script = (api) => {
            const children = vi.spyOn(Node.prototype, 'children', 'get');
            seen = api.content.insert({ nodeId: 'heading-1', at: 'after' }, [heading2('Added')]);
            // The spy counts every read of a node's children during the write, which 20,000 nodes would make 20,000.
            walked = children.mock.calls.length;
            children.mockRestore();

            return true;
        };

        act(() => {
            handle.execute('fixture.api.run');
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(walked).toBeLessThan(1000);
    });

    it("refuses a link the host's URL policy refuses as policy and changes nothing", () => {
        const narrowed = compileContentModel(
            [
                core(),
                bold(),
                heading(),
                links({ allowedHosts: ['frontify.com'] }),
                fontColor(),
                codeBlock(),
                mediaImage(),
                spotlight(),
            ],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: narrowed });
        const link = [{ type: 'link', attrs: { href: 'https://evil.example/' } }];

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1' }, [{ type: 'paragraph', content: [text('x', link)] }]);

            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'policy' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('writes inline nodes where the paragraph carries a node ID', () => {
        const paragraphIds = defineFeature({
            id: 'fixture.paragraph-ids',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            attributes: { nodeId: { on: ['paragraph'], value: { type: 'string', required: true } } },
            formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
        });
        const identified = compileContentModel(
            [core(), bold(), heading(), links(), fontColor(), codeBlock(), mediaImage(), spotlight(), paragraphIds()],
            { id: 'fixture.api', version: 1 },
        );
        const content = [{ ...paragraph, attrs: { nodeId: 'paragraph-1', lang: null } }, title];
        const document = {
            ...stored,
            requiredCapabilities: identified.capabilities,
            content: { ...stored.content, content },
        } as RichTextDocument;
        const { handle } = mount({ model: identified, document });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert(api.selectedRange(), [text('x')]);

            return true;
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['Pxlain bold', 'Title']);
    });

    it('makes each write from plugin UI one undo step', () => {
        const { handle } = mount();
        act(() => {
            live?.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('1')]);
            live?.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('2')]);
        });
        expect(textsOf(handle)?.[1]).toBe('Title12');

        act(() => {
            handle.execute('history.undo');
        });
        expect(textsOf(handle)?.[1]).toBe('Title1');
    });

    it('makes the writes of one command part of its one undo step', () => {
        const { handle } = mount();
        runIn(handle, 'Plain', (api) => {
            api.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('1')]);
            api.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('2')]);

            return true;
        });
        expect(textsOf(handle)?.[1]).toBe('Title12');

        act(() => {
            handle.execute('history.undo');
        });
        expect(textsOf(handle)?.[1]).toBe('Title');
    });

    it('reads the stored nodes under a range, marks and a nested list included, which a command writes back changed', () => {
        const listModel = compileContentModel([core(), bold(), listItem(), bulletList(), spotlight()], {
            id: 'fixture.api',
            version: 1,
        });
        const item = (...content: ContentNodeJSON[]): ContentNodeJSON => ({ type: 'list_item', content });
        const list = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
            type: 'bullet_list',
            attrs: { marker: null },
            content,
        });
        const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
            type: 'paragraph',
            attrs: { lang: null },
            content,
        });
        const withoutMarks = (node: ContentNodeJSON): ContentNodeJSON => {
            const copy: Record<string, unknown> = { ...node };
            delete copy.marks;
            if (node.content !== undefined) {
                copy.content = node.content.map(withoutMarks);
            }

            return copy as unknown as ContentNodeJSON;
        };

        const nested = list(
            item(
                para(text('One '), text('bold', [{ type: 'bold' }])),
                list(item(para(text('Two', [{ type: 'bold' }])))),
            ),
        );
        const document = {
            ...stored,
            model: listModel.ref,
            requiredCapabilities: listModel.capabilities,
            content: { ...stored.content, content: [para(text('Before')), nested] },
        } as unknown as RichTextDocument;
        const { handle } = mount({ model: listModel, document });
        let read: readonly ContentNodeJSON[] | undefined;

        runIn(handle, 'Before', (api) => {
            const [outer] = api.blocks.list('bullet_list');
            const [first] = api.blocks.list('paragraph');
            if (outer === undefined || first === undefined) {
                return false;
            }

            api.content.replace(first.range, [para(text('A longer first paragraph'))]);
            read = api.content.read(outer.range);
            seen = api.content.replace(outer.range, (read ?? []).map(withoutMarks));

            return true;
        });

        expect(read).toEqual([nested]);
        expect(seen).toMatchObject({ status: 'applied' });
        expect(blocksOf(handle)).toEqual([
            para(text('A longer first paragraph')),
            list(item(para(text('One bold')), list(item(para(text('Two')))))),
        ]);
    });
});

describe('a range of the editor API', () => {
    it('maps through the writes its command made since it was read', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => {
            const [first] = api.blocks.list('paragraph');
            const [second] = api.blocks.list('heading');
            if (first === undefined || second === undefined) {
                return false;
            }

            api.content.replace(first.range, [{ type: 'paragraph', content: [text('A much longer paragraph')] }]);
            seen = api.content.replace(second.range, [heading2('Second')]);

            return true;
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['A much longer paragraph', 'Second']);
    });

    it('is refused once the document it was read from changed outside a command', () => {
        const { handle } = mount();
        const headings = live?.blocks.list('heading');
        const firstHeading = headings?.[0];
        const range = firstHeading?.range;
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        act(() => {
            typeText(handle, 'More ');
        });
        if (range === undefined || live === undefined) {
            throw new Error('The editor API did not mount.');
        }

        expect(live.content.replace(range, [heading2('Stale')])).toEqual({
            status: 'rejected',
            code: 'target-invalid',
        });
        expect(live.content.read(range)).toBeUndefined();
        expect(live.select(range)).toBe(false);
        expect(live.targets.capture(range)).toBeUndefined();
        expect(textsOf(handle)).toEqual(['More Plain bold', 'Title']);
    });

    it('captures a target that maps through later changes', () => {
        const { handle } = mount();
        const headings = live?.blocks.list('heading');
        const firstHeading = headings?.[0];
        const range = firstHeading?.range;
        const target = live?.targets.capture(range);
        if (target === undefined) {
            throw new Error('The target was not captured.');
        }

        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        act(() => {
            typeText(handle, 'More ');
        });

        expect(handle.execute('text.insert', { text: 'New ' }, { target }).status).toBe('applied');
        expect(textsOf(handle)).toEqual(['More Plain bold', 'New ']);
    });
});

describe('the inserts of the editor API', () => {
    const inQuote = {
        ...stored,
        content: { ...stored.content, content: [{ type: 'blockquote', attrs: {}, content: [paragraph] }, title] },
    } as unknown as RichTextDocument;
    const image = { type: 'asset_image', attrs: { assetId: 'asset-1', labelSnapshot: 'Photo' } };

    it('puts a block after the top-level block that holds the selection', () => {
        const { handle } = mount({ document: inQuote });

        runIn(handle, 'Plain', (api) => {
            seen = api.insert.node('heading', { level: 3 }, { place: 'after-top-level-block' });

            return seen.status === 'applied';
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(blocksOf(handle)?.map(({ type }) => type)).toEqual(['blockquote', 'heading', 'heading']);
        expect(attrsAt(handle, 1)?.level).toBe(3);
    });

    it('fills a block with the stored content given, and refuses content that does not fit it as it is', () => {
        const { handle } = mount();
        const outcomes: string[] = [];

        runIn(handle, 'Plain', (api) => {
            outcomes.push(
                api.insert.node('figure', {}, { content: [{ type: 'paragraph', content: [text('x')] }] }).status,
                api.insert.node('figure', {}, { content: [image] }).status,
            );

            return true;
        });

        const figure = blocksOf(handle)?.find(({ type }) => type === 'figure');
        expect(outcomes).toEqual(['rejected', 'applied']);
        const figureContent = figure?.content;
        expect(figureContent?.[0]).toMatchObject(image);
    });

    it('tells an `enabled` check whether a node has a spot at the selection', () => {
        const { handle } = mount({ document: inQuote });
        let answers: boolean[] = [];

        runIn(handle, 'Plain', (api) => {
            answers = [
                api.insert.allowed('figure'),
                api.insert.allowed('figure', { place: 'after-top-level-block' }),
                api.insert.allowed('asset_image'),
            ];

            return false;
        });

        expect(answers).toEqual([true, true, false]);
    });
});

describe('the range a write of the editor API wrote', () => {
    it('takes the caret into a paragraph a command added after a code block', () => {
        const { handle } = mount();

        runIn(handle, 'Title', (api) => {
            api.blocks.set('code_block');
            const code = api.nearest('code_block');
            if (code === undefined) {
                return false;
            }

            const written = api.content.insert(code.range, [{ type: 'paragraph' }]);

            return written.status === 'applied' && api.select(written.range);
        });
        act(() => {
            typeText(handle, 'x');
        });

        expect(textsOf(handle)).toEqual(['Plain bold', 'Title', 'x']);
    });

    it('selects the node a plugin UI inserted', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        let outcome: ReturnType<EditorApi['insert']['node']> | undefined;

        act(() => {
            outcome = live?.insert.node('heading', { level: 3 }, { content: [text('New')] });
            if (outcome?.status === 'applied') {
                live?.select(outcome.range);
            }
        });

        expect(live?.selectedText()).toBe('New');
    });
});

describe('the content writes of the editor API that change nothing or go too far', () => {
    const withImage = {
        ...stored,
        content: {
            ...stored.content,
            content: [
                paragraph,
                title,
                {
                    type: 'figure',
                    attrs: { nodeId: 'figure-1', align: 'left' },
                    content: [
                        {
                            type: 'asset_image',
                            attrs: {
                                nodeId: 'image-1',
                                assetId: 'asset-logo',
                                labelSnapshot: 'logo.png',
                                altIntent: 'meaningful',
                                altText: 'Logo',
                                width: 40,
                                height: 30,
                                displayWidth: null,
                                mediaType: 'image/png',
                            },
                        },
                    ],
                },
            ],
        },
    } as unknown as RichTextDocument;

    it('reports no-op for an empty insert and an empty replacement at a caret', () => {
        const { handle, changes } = mount();
        const outcomes: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            outcomes.push(api.content.insert(api.selectedRange(), []).status);
            outcomes.push(api.content.replace(api.selectedRange(), []).status);

            return true;
        });

        expect(outcomes).toEqual(['no-op', 'no-op']);
        expect(changes).toEqual([]);
    });

    it('refuses a write that takes the document past a resource limit', () => {
        const { handle, changes } = mount({ limits: { maxDocumentNodes: 8 } });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at: 'after' }, [
                { type: 'paragraph', content: [text('a')] },
                { type: 'paragraph', content: [text('b')] },
            ]);

            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'limit' });
        expect(changes).toEqual([]);
    });

    it('writes at the start of a node that holds content, and refuses it in a node that holds none', () => {
        const { handle } = mount({ document: withImage });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at: 'start' }, [text('>> ')]);

            return true;
        });
        expect(textsOf(handle)?.slice(0, 2)).toEqual(['Plain bold', '>> Title']);

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'image-1', at: 'start' }, [text('x')]);

            return true;
        });
        expect(seen).toEqual({ status: 'rejected', code: 'target-invalid' });
    });

    it('refuses a write from plugin UI in an editor that cannot be edited, with the rejection of the session', () => {
        const { handle } = mount({ readOnly: true });
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });
        let outcome: unknown;

        act(() => {
            outcome = live?.content.insert(live.selectedRange(), [text('x')]);
        });

        expect(outcome).toEqual({ status: 'rejected', code: 'readonly' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('an inline node inserted through the editor API', () => {
    it('is refused as invalid without its required attributes, and as not applicable where the paragraph cannot hold it', () => {
        const { handle } = mount();
        const answers: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            answers.push(
                api.insert.node('asset_image'),
                api.insert.node('asset_image', { assetId: 'asset-1', labelSnapshot: 'Photo' }),
            );

            return false;
        });

        expect(answers).toEqual([
            { status: 'rejected', code: 'invalid' },
            { status: 'rejected', code: 'not-applicable' },
        ]);
    });
});
