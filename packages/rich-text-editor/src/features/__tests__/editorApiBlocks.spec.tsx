/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type CommandOutcome, type EditorApi } from '#/entries/authoring';
import { align, bold, codeBlock, core, fontColor, heading, links, mediaImage } from '#/features';
import { fixtureCallout } from '#/features/__tests__/fixtures/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import {
    compileContentModel,
    type ContentNodeJSON,
    decodeDocument,
    type JsonObject,
    type RichTextDocument,
} from '#/model';
import { type CommandState } from '#/runtime/types';
import { setSelection } from '#/testing';

import {
    type Handle,
    model,
    paragraph,
    title,
    stored,
    blocksOf,
    attrsAt,
    childAt,
    selectAll,
    textsOf,
    probeHarness,
} from './fixtures/editorApi';

let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | CommandState | undefined;
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

describe('the blocks a plugin wraps through the editor API', () => {
    const callouts = compileContentModel(
        [core(), bold(), heading(), links(), mediaImage(), fixtureCallout(), spotlight()],
        {
            id: 'fixture.api',
            version: 1,
        },
    );

    it('wraps in a container whose required attribute it gives', () => {
        const { handle } = mount({ model: callouts });

        runIn(handle, 'Plain', (api) => api.blocks.wrap('callout', { tone: 'info' }));

        expect(blocksOf(handle)).toEqual([{ type: 'callout', attrs: { tone: 'info' }, content: [paragraph] }, title]);
    });
});

describe('the attributes a plugin writes through the editor API', () => {
    it('sets an attribute only on the listed types that declare it, and refuses one that none declares', () => {
        const aligned = compileContentModel(
            [core(), bold(), heading(), align(), links(), fontColor(), codeBlock(), mediaImage(), spotlight()],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: aligned });

        expect(runIn(handle, 'Plain', (api) => api.attributes.set('textblocks', { missing: 1 }))?.status).toBe(
            'rejected',
        );
        expect(runIn(handle, 'Plain', (api) => api.attributes.set('textblocks', { align: 'center' }))?.status).toBe(
            'applied',
        );
        expect(attrsAt(handle, 0)?.align).toBe('center');
    });

    it('changes nothing when no selected node of the listed types declares the attribute', () => {
        const { handle } = mount();

        const result = runIn(handle, 'Plain', (api) => api.attributes.set(['paragraph', 'heading'], { level: 3 }));

        expect(result?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('refuses a mark that sets both attributes of which exactly one is set', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('font_color', { tokenId: 'brand.blue', value: '#ff0000' });

        expect(handle.execute('fixture.api.run').status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        script = (api) => api.marks.set('font_color', { tokenId: 'brand.blue' });
        expect(handle.execute('fixture.api.run').status).toBe('applied');
    });

    it('refuses a mark without an attribute that has no default', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { openInNewWindow: true });

        expect(handle.execute('fixture.api.run').status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('refuses an attribute longer than the definition allows', () => {
        const { handle } = mount({ limits: { maxAttributeLength: 50 } });
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { href: 'https://frontify.com/brand', styleId: 'a'.repeat(100) });

        expect(handle.execute('fixture.api.run').status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        script = (api) => api.marks.set('link', { href: 'https://frontify.com/brand' });
        expect(handle.execute('fixture.api.run').status).toBe('applied');
    });

    it('sets a link longer than the attribute limit, which decode leaves to the URL check', () => {
        const { handle } = mount({ limits: { maxAttributeLength: 100 } });
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { href: `https://frontify.com/${'a'.repeat(300)}` });

        expect(handle.execute('fixture.api.run').status).toBe('applied');
    });

    it('inserts a block with the attributes given, and refuses ones its type does not take', () => {
        const { handle } = mount();

        const insert = (attrs: JsonObject) =>
            runIn(handle, 'Plain', (api) => api.insert.node('heading', attrs).status === 'applied');

        expect(insert({ level: 9 })?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        expect(insert({ level: 3 })?.status).toBe('applied');
        expect(blocksOf(handle)?.map((block) => block.attrs?.level ?? null)).toEqual([null, 3, 2]);
    });

    it('refuses a heading level that the policy does not offer, by every write that makes one', () => {
        const { handle } = mount({ policy: { creatableHeadingLevels: [1, 2] } });

        const results = [
            runIn(handle, 'Plain', (api) => api.blocks.set('heading', { level: 3 })),
            runIn(handle, 'Title', (api) => api.attributes.set('heading', { level: 3 })),
            runIn(handle, 'Plain', (api) => api.insert.node('heading', { level: 3 }).status === 'applied'),
        ];

        expect(results.map((result) => result?.status)).toEqual(['rejected', 'rejected', 'rejected']);
        expect(blocksOf(handle)).toEqual([paragraph, title]);
        expect(runIn(handle, 'Plain', (api) => api.blocks.set('heading', { level: 2 }))?.status).toBe('applied');
    });
});

describe('the selection of the editor API', () => {
    const quoted = (...content: ContentNodeJSON[]): ContentNodeJSON => ({ type: 'blockquote', attrs: {}, content });
    const line = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
        type: 'paragraph',
        attrs: { lang: null },
        content,
    });
    const code: ContentNodeJSON = {
        type: 'code_block',
        attrs: { languageId: null },
        content: [{ type: 'text', text: 'let x' }],
    };

    it('reads the caret context: the nodes around it, its place in its textblock, the node before it and verbatim text', () => {
        const blocks = [
            quoted(line({ type: 'text', text: 'first' }), line({ type: 'text', text: 'Quoted' })),
            line({ type: 'text', text: 'one' }, { type: 'hard_break' }, { type: 'text', text: 'two' }),
            code,
        ];
        const document = { ...stored, content: { ...stored.content, content: blocks } };
        const { handle } = mount({ document: document as unknown as RichTextDocument });

        setSelection(handle, { text: 'Quoted', from: 6, to: 6 });
        const quote = live?.selection();
        setSelection(handle, { text: 'two', from: 0, to: 0 });
        const broken = live?.selection();
        setSelection(handle, { text: 'let x', from: 0, to: 0 });
        const verbatim = live?.selection();

        expect(quote).toMatchObject({
            kind: 'text',
            blockType: 'paragraph',
            ancestors: [
                { type: 'blockquote', attrs: {}, nodeId: null, index: 0, childCount: 2, last: false, empty: false },
                {
                    type: 'paragraph',
                    attrs: { lang: null },
                    nodeId: null,
                    index: 1,
                    childCount: 1,
                    last: true,
                    empty: false,
                },
            ],
            atStart: false,
            atEnd: true,
            verbatim: false,
        });
        expect(broken).toMatchObject({
            atStart: false,
            atEnd: false,
            nodeBefore: { type: 'hard_break', attrs: {}, nodeId: null },
        });
        expect(verbatim).toMatchObject({
            blockType: 'code_block',
            ancestors: [{ type: 'code_block', index: 2, last: true }],
            atStart: true,
            verbatim: true,
            nodeBefore: null,
        });
    });
});

describe('the active state of the editor API', () => {
    it('answers for a container around the selection, not only for textblocks', () => {
        const quoted: ContentNodeJSON = { type: 'blockquote', attrs: {}, content: [paragraph] };
        const document = { ...stored, content: { ...stored.content, content: [quoted, title] } };
        const { handle } = mount({ document: document as unknown as RichTextDocument });

        setSelection(handle, { text: 'Plain' });
        const inside = live?.blocks.active('blockquote');
        setSelection(handle, { text: 'Title' });
        const outside = live?.blocks.active('blockquote');
        selectAll(handle);
        const spanning = live?.blocks.active('blockquote');

        expect([inside, outside, spanning]).toEqual([true, false, 'mixed']);
    });

    it('reads the attributes of the selected nodes of the listed types as all, some or none', () => {
        const aligned = compileContentModel(
            [core(), bold(), heading(), align(), links(), fontColor(), codeBlock(), mediaImage(), spotlight()],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: aligned });
        runIn(handle, 'Plain', (api) => api.attributes.set('textblocks', { align: 'center' }));
        const read = () => [
            live?.attributes.active('textblocks', { align: 'center' }),
            live?.attributes.active('heading', { align: 'center' }),
            live?.attributes.active('textblocks', { align: 'center' }, { nodeId: 'heading-1' }),
        ];

        setSelection(handle, { text: 'Plain' });
        const one = read();
        selectAll(handle);
        const both = read();

        expect(one).toEqual([true, false, false]);
        expect(both).toEqual(['mixed', false, false]);
    });
});

describe('the nearest node of the editor API', () => {
    it('reads the node of a type around the selection, or none', () => {
        const { handle } = mount();

        runIn(handle, 'Title', (api) => {
            const found = api.nearest('heading');
            seen = { status: found?.nodeId === 'heading-1' && found.attrs.level === 2 ? 'applied' : 'no-op' };
            return api.nearest('paragraph') === undefined;
        });

        expect(seen).toEqual({ status: 'applied' });
    });

    it('reads the node with `nodeId`, or its nearest ancestor of the type, whatever the selection', () => {
        const image = (nodeId: string): ContentNodeJSON =>
            ({
                type: 'asset_image',
                attrs: {
                    nodeId,
                    assetId: 'asset-logo',
                    labelSnapshot: 'logo.png',
                    altIntent: 'meaningful',
                    altText: 'Logo',
                    width: 40,
                    height: 30,
                    displayWidth: null,
                    mediaType: 'image/png',
                },
            }) as unknown as ContentNodeJSON;
        const figures = (['left', 'right'] as const).map((side, index) => ({
            type: 'figure',
            attrs: { nodeId: `figure-${index}`, align: side },
            content: [image(`image-${index}`)],
        })) as unknown as ContentNodeJSON[];
        const { handle } = mount({
            document: {
                ...stored,
                content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph, title, ...figures] },
            } as unknown as RichTextDocument,
        });
        let found: unknown[] = [];

        runIn(handle, 'Title', (api) => {
            const rightAlign = api.nearest('figure', 'image-1')?.attrs.align;
            const figureId = api.nearest('figure', 'image-1')?.nodeId;
            const imageId = api.nearest('asset_image', 'image-1')?.nodeId;
            const leftAlign = api.nearest('figure', 'figure-0')?.attrs.align;
            const headingFigure = api.nearest('figure', 'heading-1');
            const missing = api.nearest('figure', 'missing');
            const headingId = api.nearest('heading')?.nodeId;
            found = [rightAlign, figureId, imageId, leftAlign, headingFigure, missing, headingId];
            return true;
        });

        expect(found).toEqual(['right', 'figure-1', 'image-1', 'left', undefined, undefined, 'heading-1']);
    });
});

describe('the clearing of blocks in the editor API', () => {
    it('refuses the attribute name nodeId and changes nothing', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Title', from: 1, to: 1 });
        script = (api) => api.blocks.clear(['nodeId']);

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.run');
        });

        expect(result?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('applies a clear of an unknown attribute name and turns the heading into a paragraph', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Title', from: 1, to: 1 });
        script = (api) => api.blocks.clear(['unknown']);

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.run');
        });

        expect(result?.status).toBe('applied');
        expect(blocksOf(handle)?.map(({ type }) => type)).toEqual(['paragraph', 'paragraph']);
    });
});

describe('the blocks of the editor API in a container', () => {
    const quoted = (...content: ContentNodeJSON[]): ContentNodeJSON => ({ type: 'blockquote', attrs: {}, content });

    it('lists the blocks of a type that sit inside another block of that type', () => {
        const nested = { ...stored, content: { ...stored.content, content: [quoted(quoted(paragraph)), title] } };
        const { handle } = mount({ document: nested as unknown as RichTextDocument });

        runIn(handle, 'Plain', (api) => {
            const found = api.blocks.list('blockquote');
            seen = { status: found.length === 2 && found[1]?.text === 'Plain bold' ? 'applied' : 'no-op' };
            return false;
        });

        expect(seen).toEqual({ status: 'applied' });
    });

    it('inserts a container with the content its model requires', () => {
        const { handle } = mount();

        const result = runIn(handle, 'Plain', (api) => api.insert.node('blockquote').status === 'applied');

        const document = handle.getSnapshot().document;
        const inserted = blocksOf(handle)?.find(({ type }) => type === 'blockquote');
        expect(result?.status).toBe('applied');
        const insertedContent = inserted?.content;
        expect(insertedContent?.length).toBeGreaterThan(0);
        expect(decodeDocument(document, model)).toMatchObject({ status: 'editable', diagnostics: [] });
    });
});

describe('the block moves of the editor API', () => {
    it('moves the selected block up and down, and refuses a move past the first block', () => {
        const { handle } = mount();

        const up = runIn(handle, 'Title', (api) => api.blocks.move('up'))?.status;
        const moved = textsOf(handle);
        const past = runIn(handle, 'Title', (api) => api.blocks.move('up'))?.status;
        const down = runIn(handle, 'Title', (api) => api.blocks.move('down'))?.status;

        expect([up, past, down]).toEqual(['applied', 'rejected', 'applied']);
        expect(moved).toEqual(['Title', 'Plain bold']);
        expect(textsOf(handle)).toEqual(['Plain bold', 'Title']);
    });
});

describe('the line indents of the editor API', () => {
    const source: ContentNodeJSON = {
        type: 'code_block',
        attrs: { languageId: null },
        content: [{ type: 'text', text: 'one\ntwo\nthree' }],
    };
    const codeOnly = { ...stored, content: { ...stored.content, content: [source, paragraph] } };

    it('indents and outdents the lines the selection touches in a code block, and refuses elsewhere', () => {
        const { handle } = mount({ document: codeOnly as unknown as RichTextDocument });
        const indent = (direction: 'indent' | 'outdent') => {
            script = (api) => api.blocks.indentLines(direction);
            let result: ReturnType<Handle['execute']> | undefined;
            act(() => {
                result = handle.execute('fixture.api.run');
            });
            return result?.status;
        };

        setSelection(handle, { text: 'two', from: 0, to: 3 });
        const indented = indent('indent');
        const afterIndent = childAt(handle, 0)?.text;
        const outdented = indent('outdent');
        const afterOutdent = childAt(handle, 0)?.text;
        const bare = indent('outdent');
        setSelection(handle, { text: 'Plain ', from: 0, to: 0 });
        const elsewhere = indent('indent');

        expect([indented, outdented, bare, elsewhere]).toEqual(['applied', 'applied', 'rejected', 'rejected']);
        expect(afterIndent).toBe('one\n  two\nthree');
        expect(afterOutdent).toBe('one\ntwo\nthree');
    });
});

describe('a name the model does not install, in the editor API', () => {
    it('is answered with false or nothing by every member that takes a mark, a node or a list item', () => {
        const { handle } = mount();
        const answers: Record<string, unknown> = {};

        runIn(handle, 'Plain', (api) => {
            answers.markActive = api.marks.active('missing');
            answers.markAttrs = api.marks.attrs('missing');
            answers.markAllowed = api.marks.allowed('missing');
            answers.markRun = api.marks.run('missing');
            answers.markToggle = api.marks.toggle('missing');
            answers.markSet = api.marks.set('missing', {});
            answers.markRemove = api.marks.remove(['missing']);
            answers.blockActive = api.blocks.active('missing');
            answers.blockSet = api.blocks.set('missing');
            answers.blockWrap = api.blocks.wrap('missing');
            answers.blockLift = api.blocks.lift('missing');
            answers.listToggle = api.lists.toggle('missing', 'missing');
            answers.listIndent = api.lists.indent('missing');
            answers.listOutdent = api.lists.outdent('missing');
            answers.listSplit = api.lists.split('missing');
            answers.insertAllowed = api.insert.allowed('missing');
            answers.insertNode = api.insert.node('missing');
            answers.nearest = api.nearest('missing');
            answers.select = api.select({ nodeId: 'missing' });
            return false;
        });

        expect(answers).toEqual({
            markActive: false,
            markAttrs: undefined,
            markAllowed: false,
            markRun: undefined,
            markToggle: false,
            markSet: false,
            markRemove: false,
            blockActive: false,
            blockSet: false,
            blockWrap: false,
            blockLift: false,
            listToggle: false,
            listIndent: false,
            listOutdent: false,
            listSplit: false,
            insertAllowed: false,
            insertNode: { status: 'rejected', code: 'invalid' },
            nearest: undefined,
            select: false,
        });
    });
});

describe('the attribute writes of the editor API that cannot be checked', () => {
    it('refuses an unknown node name, an attribute named nodeId and a link the URL policy refuses', () => {
        const { handle } = mount();
        const answers: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            answers.push(
                api.attributes.set('missing', { level: 1 }),
                api.attributes.set('textblocks', { nodeId: 'other' }),
                api.marks.set('link', { href: 'javascript:alert(1)' }),
            );
            return false;
        });

        expect(answers).toEqual([false, false, false]);
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});
