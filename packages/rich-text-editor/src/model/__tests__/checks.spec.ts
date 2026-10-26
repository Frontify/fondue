/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { deCH } from '#/locales/de-CH';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    type ContentCheckOptions,
    type ContentNodeJSON,
    type ContentRuleId,
    findContentIssues,
    type RichTextDocument,
} from '#/model';
import { GENERIC_IMAGE_WORDS, VAGUE_LINK_TEXTS } from '#/model/checks';
import { contentChecks, core, fontColor, heading, language, link, image } from '#/plugins';
import { CONTENT_RULE_IDS } from '#/plugins/__tests__/fixtures/contentRules';

const stored = (blocks: readonly ContentNodeJSON[]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: 'test.checks', version: 1 },
        requiredCapabilities: [],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

const text = (value: string, marks: ContentNodeJSON['marks'] = undefined): ContentNodeJSON =>
    marks === undefined ? { type: 'text', text: value } : { type: 'text', text: value, marks };
const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content,
});
const headingBlock = (nodeId: string, level: number, value = ''): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId, level, lang: null },
    ...(value === '' ? {} : { content: [text(value)] }),
});
const imageNode = (nodeId: string, attrs: Record<string, unknown>): ContentNodeJSON => ({
    type: 'figure',
    attrs: { nodeId: `figure-${nodeId}`, align: 'center' },
    content: [
        {
            type: 'asset_image',
            attrs: {
                nodeId,
                assetId: 'asset-1',
                labelSnapshot: 'Team.jpg',
                altIntent: 'missing',
                altText: '',
                ...attrs,
            },
        },
    ],
});
const linkMark = (value: string, href = 'https://example.com/a') => text(value, [{ type: 'link', attrs: { href } }]);
const colored = (value: string, attrs: Record<string, unknown>, mark = 'font_color') =>
    text(value, [{ type: mark, attrs: { tokenId: null, value: null, ...attrs } }]);

// Every shipped feature that declares rules, and no language feature, which the language repair needs.
const shippedModel = compileContentModel([core(), heading(), image(), link(), fontColor()], {
    id: 'test.checks',
    version: 1,
});

const options: ContentCheckOptions = {
    locale: enUS,
    model: shippedModel,
    background: '#ffffff',
    colorTokens: [
        { id: 'pale', label: 'Pale', value: '#cccccc', usage: ['font_color', 'highlight'] },
        { id: 'ink', label: 'Ink', value: '#1a1a1a', usage: ['font_color'] },
        { id: 'navy', label: 'Navy', value: '#002266', usage: ['font_color'] },
    ],
};

const idsOf = (blocks: readonly ContentNodeJSON[], ruleId: ContentRuleId, given: ContentCheckOptions = options) =>
    findContentIssues(stored(blocks), given)
        .filter((issue) => issue.ruleId === ruleId)
        .map(({ id }) => id);

/** One fixture that the rule must report, and one it must not. */
const CASES: readonly {
    ruleId: ContentRuleId;
    positive: readonly ContentNodeJSON[];
    negative: readonly ContentNodeJSON[];
    options?: ContentCheckOptions;
}[] = [
    {
        ruleId: 'image.alt-missing',
        positive: [imageNode('a', {})],
        negative: [imageNode('a', { altIntent: 'decorative' })],
    },
    {
        ruleId: 'image.alt-suspicious',
        positive: [imageNode('a', { altIntent: 'meaningful', altText: 'IMG_2044.JPG' })],
        negative: [imageNode('a', { altIntent: 'meaningful', altText: 'Three people at a whiteboard' })],
    },
    { ruleId: 'image.content-review', positive: [imageNode('a', { altIntent: 'decorative' })], negative: [para()] },
    { ruleId: 'link.text-empty', positive: [para(linkMark('  '))], negative: [para(linkMark('Pricing'))] },
    { ruleId: 'link.text-vague', positive: [para(linkMark(' Click Here '))], negative: [para(linkMark('click_here'))] },
    { ruleId: 'link.purpose-review', positive: [para(linkMark('Pricing'))], negative: [para(text('Pricing'))] },
    { ruleId: 'heading.empty', positive: [headingBlock('h', 2, ' ')], negative: [headingBlock('h', 2, 'Title')] },
    {
        ruleId: 'heading.skipped-level',
        positive: [headingBlock('first', 3, 'First'), headingBlock('deep', 5, 'Deep')],
        negative: [headingBlock('first', 3, 'First'), headingBlock('next', 4, 'Next')],
    },
    { ruleId: 'heading.descriptive-review', positive: [headingBlock('h', 1, 'Title')], negative: [para(text('x'))] },
    {
        ruleId: 'contrast.low',
        positive: [para(colored('Pale', { tokenId: 'pale' }))],
        negative: [para(colored('Ink', { tokenId: 'ink' }))],
    },
    {
        ruleId: 'contrast.unknown',
        positive: [para(colored('Named', { value: null, tokenId: 'missing-token' }))],
        negative: [para(colored('Ink', { value: '#1a1a1a' }))],
    },
    {
        ruleId: 'color.meaning-review',
        positive: [para(colored('Marked', { tokenId: 'pale' }, 'highlight'))],
        negative: [para(text('Plain'))],
    },
];

describe('the content check rules', () => {
    it.each(CASES)(
        '$ruleId finds its positive fixture and leaves its negative one',
        ({ ruleId, positive, negative }) => {
            expect(idsOf(positive, ruleId)).toHaveLength(1);
            expect(idsOf(negative, ruleId)).toEqual([]);
        },
    );

    it.each(['language.parts-review', 'sensory.review', 'structure.review'] as const)(
        'reports %s once per document, with no node',
        (ruleId) => {
            const issues = findContentIssues(stored([para(), para(text('More'))]), options).filter(
                (issue) => issue.ruleId === ruleId,
            );

            expect(issues).toEqual([expect.objectContaining({ id: ruleId, path: null, nodeId: null })]);
        },
    );

    it('has a case for every rule', () => {
        const covered = new Set([
            ...CASES.map(({ ruleId }) => ruleId),
            'language.parts-review',
            'sensory.review',
            'structure.review',
        ]);
        expect([...covered].sort()).toEqual([...CONTENT_RULE_IDS].sort());
    });

    it('compares a first heading at level 3 with the enclosing heading level only when the host sets it', () => {
        const blocks = [headingBlock('first', 3, 'First')];

        expect(idsOf(blocks, 'heading.skipped-level')).toEqual([]);
        expect(idsOf(blocks, 'heading.skipped-level', { ...options, enclosingHeadingLevel: 2 })).toEqual([]);
        expect(idsOf(blocks, 'heading.skipped-level', { ...options, enclosingHeadingLevel: 1 })).toEqual([
            'heading.skipped-level:first',
        ]);
    });

    it('repairs a skipped level with the level one below the previous heading', () => {
        const issue = findContentIssues(
            stored([headingBlock('first', 2, 'First'), headingBlock('deep', 5, 'Deep')]),
            options,
        ).find(({ ruleId }) => ruleId === 'heading.skipped-level');

        expect(issue).toMatchObject({ repairCommand: 'heading.set', repairPayload: { level: 3 } });
    });

    it('reads snake_case link text as written, so it matches no vague text', () => {
        expect(idsOf([para(linkMark('read_more'))], 'link.text-vague')).toEqual([]);
        expect(idsOf([para(linkMark('READ MORE'))], 'link.text-vague')).toEqual(['link.text-vague:0,0']);
    });

    it('reports a link split over several marks once, at its first text', () => {
        const href = 'https://example.com/here';
        const blocks = [
            para(
                text('See '),
                text('cl', [{ type: 'link', attrs: { href } }]),
                text('ick here', [{ type: 'bold' }, { type: 'link', attrs: { href } }]),
            ),
        ];

        expect(idsOf(blocks, 'link.text-vague')).toEqual(['link.text-vague:0,1']);
        expect(idsOf(blocks, 'link.purpose-review')).toEqual(['link.purpose-review:0,1']);
    });

    it('flags a meaningful alternative text equal to the label, ending in an image extension or a generic word', () => {
        const suspicious = ['team.jpg', 'Photo', 'banner.webp'];
        for (const altText of suspicious) {
            expect(idsOf([imageNode('a', { altIntent: 'meaningful', altText })], 'image.alt-suspicious')).toEqual([
                'image.alt-suspicious:a',
            ]);
        }

        expect(idsOf([imageNode('a', { altIntent: 'decorative', altText: 'photo' })], 'image.alt-suspicious')).toEqual(
            [],
        );
    });

    it('adds the locale lists to the en-US lists', () => {
        const german = { ...options, locale: deCH };

        expect(idsOf([para(linkMark('Hier klicken'))], 'link.text-vague', german)).toHaveLength(1);
        expect(idsOf([para(linkMark('click here'))], 'link.text-vague', german)).toHaveLength(1);
        expect(
            idsOf([imageNode('a', { altIntent: 'meaningful', altText: 'Bild' })], 'image.alt-suspicious', german),
        ).toHaveLength(1);
        expect(idsOf([para(linkMark('Hier klicken'))], 'link.text-vague')).toEqual([]);
    });

    it('composites a translucent colour over the background and uses 3:1 for large headings', () => {
        const translucent = [para(colored('Faint', { value: '#00000040' }))];
        const large = [
            {
                type: 'heading',
                attrs: { nodeId: 'big', level: 1, lang: null },
                content: [colored('Grey', { value: '#8a8a8a' })],
            },
        ];
        const small = [para(colored('Grey', { value: '#8a8a8a' }))];

        expect(idsOf(translucent, 'contrast.low')).toHaveLength(1);
        expect(idsOf(large, 'contrast.low')).toEqual([]);
        expect(idsOf(small, 'contrast.low')).toHaveLength(1);
    });

    it('offers the colour tokens that pass against the background as the contrast repair', () => {
        const issue = findContentIssues(stored([para(colored('Pale', { tokenId: 'pale' }))]), options).find(
            ({ ruleId }) => ruleId === 'contrast.low',
        );

        expect(issue).toMatchObject({
            repairCommand: 'mark.color.menu.open',
            repairPayload: { tokenIds: ['ink', 'navy'] },
        });
    });

    it('cannot measure coloured text without a known opaque background', () => {
        const blocks = [para(colored('Ink', { tokenId: 'ink' }))];
        const { background: _background, ...unknown } = options;

        expect(idsOf(blocks, 'contrast.unknown', unknown)).toHaveLength(1);
        expect(idsOf(blocks, 'contrast.low', unknown)).toEqual([]);
        expect(idsOf(blocks, 'contrast.unknown', { ...options, background: 'rgba(255, 255, 255, 0.5)' })).toHaveLength(
            1,
        );
    });

    it('reports an image whose alternative text is missing, as the reader writes it with no alt', () => {
        expect(findContentIssues(stored([imageNode('image-1', { altIntent: 'missing' })]), options)).toContainEqual({
            id: 'image.alt-missing:image-1',
            ruleId: 'image.alt-missing',
            kind: 'automatic',
            severity: 'error',
            path: [0, 0],
            nodeId: 'image-1',
            repairCommand: 'image.alt.edit',
            repairPayload: null,
            sequence: 0,
        });
    });

    it('lists issues in document order, document-level rules first, with IDs from nodeIds or paths', () => {
        const issues = findContentIssues(
            stored([headingBlock('top', 1, 'Top'), para(linkMark('here')), imageNode('pic', {})]),
            { ...options, sequence: 7 },
        );

        expect(issues.map(({ id }) => id)).toEqual([
            'language.parts-review',
            'sensory.review',
            'structure.review',
            'heading.descriptive-review:top',
            'link.text-vague:1,0',
            'link.purpose-review:1,0',
            'image.alt-missing:pic',
            'image.content-review:pic',
        ]);
        expect(new Set(issues.map(({ sequence }) => sequence))).toEqual(new Set([7]));
    });

    it('offers a repair only for a feature the model installs, and the language repair only with a model', () => {
        const model = compileContentModel([core(), heading(), link(), fontColor()], {
            id: 'test.checks',
            version: 1,
        });
        const withLanguage = compileContentModel([core(), language()], { id: 'test.checks', version: 1 });
        const document = stored([headingBlock('h', 2), imageNode('a', {})]);
        const repairOf = (given: ContentCheckOptions, ruleId: ContentRuleId) =>
            findContentIssues(document, given).find((issue) => issue.ruleId === ruleId)?.repairCommand;

        expect(repairOf(options, 'heading.empty')).toBe('paragraph.set');
        expect(repairOf({ ...options, model }, 'heading.empty')).toBe('paragraph.set');
        expect(repairOf(options, 'image.alt-missing')).toBe('image.alt.edit');
        expect(findContentIssues(document, { ...options, model }).map(({ ruleId }) => ruleId)).not.toContain(
            'image.alt-missing',
        );
        expect(repairOf(options, 'language.parts-review')).toBeNull();
        expect(repairOf({ ...options, model }, 'language.parts-review')).toBeNull();
        expect(repairOf({ ...options, model: withLanguage }, 'language.parts-review')).toBe('mark.language.edit');
    });

    it('skips the content of opaque islands', () => {
        const island = { type: 'unsupported_block', attrs: { original: {} }, content: [imageNode('lost', {})] };

        expect(idsOf([island as ContentNodeJSON], 'image.alt-missing')).toEqual([]);
    });

    it('reads no browser global', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
        expect(findContentIssues(stored([imageNode('a', {})]), options).length).toBeGreaterThan(0);
    });
});

describe('the content check rules after review', () => {
    it('gives each issue of a nodeId that repeats in the document a path-based ID', () => {
        const ids = findContentIssues(stored([headingBlock('twin', 2), para(), headingBlock('twin', 3)]), options)
            .filter(({ ruleId }) => ruleId === 'heading.empty')
            .map(({ id, nodeId }) => [id, nodeId]);

        expect(ids).toEqual([
            ['heading.empty:0', 'twin'],
            ['heading.empty:2', 'twin'],
        ]);
    });

    it('reads enclosingHeadingLevel from the model when the call gives none, and an explicit option wins', () => {
        const model = compileContentModel([core(), heading(), contentChecks({ enclosingHeadingLevel: 1 })], {
            id: 'test.checks',
            version: 1,
        });
        const blocks = [headingBlock('first', 3, 'First')];

        expect(idsOf(blocks, 'heading.skipped-level', { ...options, model })).toEqual(['heading.skipped-level:first']);
        expect(idsOf(blocks, 'heading.skipped-level', { ...options, model, enclosingHeadingLevel: 2 })).toEqual([]);
    });

    it('never counts subscript or superscript text in a large heading as large text', () => {
        const grey = (marks: readonly string[]) =>
            text('Grey', [
                ...marks.map((type) => ({ type })),
                { type: 'font_color', attrs: { tokenId: null, value: '#8a8a8a' } },
            ]);
        const headingWith = (marks: readonly string[]): ContentNodeJSON => ({
            type: 'heading',
            attrs: { nodeId: 'big', level: 1, lang: null },
            content: [grey(marks)],
        });

        expect(idsOf([headingWith([])], 'contrast.low')).toEqual([]);
        expect(idsOf([headingWith(['subscript'])], 'contrast.low')).toHaveLength(1);
        expect(idsOf([headingWith(['superscript'])], 'contrast.low')).toHaveLength(1);
    });

    it('finds a meaningful image whose alternative text is blank as missing, not as suspicious', () => {
        const blank = [imageNode('a', { altIntent: 'meaningful', altText: '   ' })];

        expect(idsOf(blank, 'image.alt-missing')).toEqual(['image.alt-missing:a']);
        expect(idsOf(blank, 'image.alt-suspicious')).toEqual([]);
        expect(idsOf([imageNode('a', { altIntent: 'meaningful', altText: 'A harbour' })], 'image.alt-missing')).toEqual(
            [],
        );
    });
});

describe('the en-US word lists', () => {
    it('are the ones the en-US locale holds', () => {
        expect(enUS.translationStrings.RichTextEditor_checkGenericImageWords).toBe(GENERIC_IMAGE_WORDS);
        expect(enUS.translationStrings.RichTextEditor_checkVagueLinkTexts).toBe(VAGUE_LINK_TEXTS);
    });
});
