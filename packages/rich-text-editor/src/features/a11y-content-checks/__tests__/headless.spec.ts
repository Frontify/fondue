/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { afterEach, describe, expect, it } from 'vitest';

import { compileDefinition } from '#/definition';
import { bold, contentChecks, core, fontColor, heading, language, links, mediaImage } from '#/features';
import { fixtureHighlight } from '#/features/__tests__/fixtures/highlight';
import { fixtureEmbed } from '#/features/__tests__/fixtures/media/embed';
import { fixtureTable } from '#/features/__tests__/fixtures/table/feature';
import { deCH } from '#/locales/de-CH';
import {
    type ColorToken,
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    findContentIssues,
    type RichTextDocument,
} from '#/model';
import { decodeToTree, limitsOf } from '#/model/decode';
import { RUNTIME_PLUGINS } from '#/runtime/capabilities';
import { contentChecksOf } from '#/runtime/content-issues';
import { authoringOf } from '#/runtime/policy';
import { createEditorRuntime, type EditorRuntime } from '#/runtime/runtime';

const model = compileContentModel(
    [
        core(),
        bold(),
        heading(),
        links(),
        language(),
        fontColor(),
        fixtureHighlight(),
        mediaImage(),
        fixtureTable(),
        fixtureEmbed(),
        contentChecks({ enclosingHeadingLevel: 1 }),
    ],
    { id: 'test.checks', version: 1 },
);

const colorTokens: readonly ColorToken[] = [
    { id: 'pale', label: 'Pale', value: '#cccccc', usage: ['font_color', 'highlight'] },
    { id: 'ink', label: 'Ink', value: '#1a1a1a', usage: ['font_color'] },
];

const text = (value: string, marks?: ContentNodeJSON['marks']): ContentNodeJSON =>
    marks === undefined ? { type: 'text', text: value } : { type: 'text', text: value, marks };
const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content,
});

const blocks: readonly ContentNodeJSON[] = [
    { type: 'heading', attrs: { nodeId: 'first', level: 3, lang: null }, content: [text('Skipped from the page')] },
    { type: 'heading', attrs: { nodeId: 'empty', level: 4, lang: null } },
    para(text('Mehr '), text('hier klicken', [{ type: 'link', attrs: { href: 'https://example.com' } }])),
    para(text('Blass', [{ type: 'font_color', attrs: { tokenId: 'pale', value: null } }])),
    para(text('Markiert', [{ type: 'highlight', attrs: { tokenId: null, value: '#ffff0080' } }])),
    {
        type: 'figure',
        attrs: { nodeId: 'figure-photo', align: 'center' },
        content: [
            {
                type: 'asset_image',
                attrs: {
                    nodeId: 'photo',
                    assetId: 'asset-1',
                    labelSnapshot: 'Team.jpg',
                    altIntent: 'meaningful',
                    altText: 'Bild',
                },
            },
        ],
    },
    {
        type: 'table',
        attrs: { nodeId: 'grid' },
        content: [{ type: 'table_row', content: [{ type: 'table_cell', content: [para(text('Zelle'))] }] }],
    },
    { type: 'embed', attrs: { nodeId: 'clip', url: 'https://www.youtube.com/watch?v=1', title: null } },
];

const document = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
} as unknown as RichTextDocument;

const started: EditorRuntime[] = [];

afterEach(() => {
    for (const runtime of started.splice(0)) {
        runtime.handle.dispose();
    }
});

const startRuntime = (
    of: ContentModel = model,
    stored: RichTextDocument = document,
    policy: ReturnType<typeof authoringOf> = authoringOf(of),
) => {
    const { result, tree } = decodeToTree(stored, of, {});
    if (result.status === 'blocked' || tree === undefined) {
        throw new Error('The fixture does not decode.');
    }
    const runtime = createEditorRuntime({
        definition: compileDefinition(of, RUNTIME_PLUGINS),
        documentId: 'document-1',
        tree,
        capabilities: result.document.requiredCapabilities,
        mode: 'editable',
        policy,
        limits: limitsOf(undefined),
        contentChecks: () => ({ locale: deCH, colorTokens, background: '#ffffff' }),
    });
    started.push(runtime);
    return runtime;
};

describe('findContentIssues on a server', () => {
    it('runs without browser globals', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof globalThis.document).toBe('undefined');
    });

    it('returns the same issues and IDs as the editor holds for the same document, locale, colours and model', () => {
        const runtime = startRuntime();

        expect(runtime.runChecks()).toBe(true);

        const editor = contentChecksOf(runtime.state)?.issues.map(({ issue }) => issue);
        const host = findContentIssues(runtime.handle.getSnapshot().document, {
            locale: deCH,
            colorTokens,
            background: '#ffffff',
            model,
            enclosingHeadingLevel: 1,
        });
        expect(editor).toEqual(host);
        expect(host.map(({ ruleId }) => ruleId)).toEqual(
            expect.arrayContaining([
                'heading.skipped-level',
                'heading.empty',
                'link.text-vague',
                'contrast.low',
                'contrast.unknown',
                'image.alt-suspicious',
                'table.no-header',
                'embed.title-missing',
                'language.parts-review',
            ]),
        );
    });

    it('offers the repairs of the features the model installs, with no command set, as the editor does', () => {
        const small = compileContentModel([core(), language(), fontColor(), contentChecks()], {
            id: 'test.repairs',
            version: 1,
        });
        const stored = {
            format: 'frontify.rich-text',
            formatVersion: 1,
            model: small.ref,
            requiredCapabilities: small.capabilities,
            content: {
                type: 'doc',
                attrs: { lang: null, dir: 'auto' },
                content: [para(text('Blass', [{ type: 'font_color', attrs: { tokenId: 'pale', value: null } }]))],
            },
        } as unknown as RichTextDocument;
        const runtime = startRuntime(small, stored);

        expect(runtime.runChecks()).toBe(true);

        const editor = contentChecksOf(runtime.state)?.issues.map(({ issue }) => issue);
        const host = findContentIssues(stored, { locale: deCH, colorTokens, background: '#ffffff', model: small });
        expect(host.map(({ repairCommand }) => repairCommand).filter((command) => command !== null)).toEqual([
            'mark.language.edit',
            'mark.color.menu.open',
        ]);
        expect(editor).toEqual(host);
    });

    it('offers the heading level repair the editor offers when the options give the creatable levels', () => {
        const small = compileContentModel([core(), heading(), contentChecks()], { id: 'test.levels', version: 1 });
        const level = (value: number): ContentNodeJSON => ({
            type: 'heading',
            attrs: { nodeId: `h${value}`, level: value, lang: null },
            content: [text('Title')],
        });
        const stored = {
            format: 'frontify.rich-text',
            formatVersion: 1,
            model: small.ref,
            requiredCapabilities: small.capabilities,
            content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [level(1), level(3)] },
        } as unknown as RichTextDocument;
        const creatableHeadingLevels = [1, 3] as const;
        const runtime = startRuntime(small, stored, { ...authoringOf(small), creatableHeadingLevels });

        expect(runtime.runChecks()).toBe(true);

        const editor = contentChecksOf(runtime.state)?.issues.map(({ issue }) => issue);
        const host = findContentIssues(stored, { locale: deCH, model: small, creatableHeadingLevels });
        expect(host.find(({ ruleId }) => ruleId === 'heading.skipped-level')).toMatchObject({
            repairCommand: 'heading.set',
            repairPayload: { level: 1 },
        });
        expect(editor).toEqual(host);
    });
});
