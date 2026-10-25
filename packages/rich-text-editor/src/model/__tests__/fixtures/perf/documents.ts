/* (c) Copyright Frontify Ltd., all rights reserved. */

import { brandDocumentModel } from '#/features/profiles/brandDocument';
import { type ContentModel, type ContentNodeJSON, type MarkJSON, type RichTextDocument } from '#/model';

/** The feature IDs a perf fixture needs, which every fixture shares so one model decodes them all. */
export const PERF_FEATURES = [
    'core',
    'marks.bold',
    'marks.italic',
    'marks.underline',
    'marks.strike',
    'marks.code',
    'links',
    'blocks.heading',
    'blocks.quote',
    'lists.item',
    'lists.bullet',
    'lists.ordered',
    'lists.task',
    'mentions',
    'media.image',
    'styles.brand',
] as const;

/** The model every perf fixture decodes in: the Brand document profile's, the only shipped profile with brand styles. */
export const perfModel = brandDocumentModel;

export type PerfFixtureName = 'small' | 'typical' | 'large' | 'words10k';

const WORDS = [
    'brand',
    'guideline',
    'colour',
    'palette',
    'logo',
    'clear',
    'space',
    'asset',
    'template',
    'voice',
    'tone',
    'grid',
    'layout',
    'type',
    'scale',
    'icon',
    'motion',
    'photo',
    'campaign',
    'review',
    'approve',
    'update',
    'share',
    'export',
    'archive',
    'rule',
    'detail',
    'sample',
    'usage',
    'pattern',
];

/** Plain words joined by single spaces, exactly `length` graphemes long, from the same `seed` every time. */
const wordsOf = (seed: number, length: number): string => {
    let value = '';
    for (let index = 0; value.length <= length; index += 1) {
        value += `${WORDS[(seed * 7 + index * 13) % WORDS.length]} `;
    }
    value = value.slice(0, length);
    // Whitespace at a run's edge would merge or trim, so the edge letters stay letters.
    return value.replace(/^ /, 'a').replace(/ $/, 'a');
};

const BOLD: MarkJSON = { type: 'bold' };
const ITALIC: MarkJSON = { type: 'italic' };
const UNDERLINE: MarkJSON = { type: 'underline' };
const LINK: MarkJSON = {
    type: 'link',
    attrs: { href: 'https://frontify.com/guidelines', openInNewWindow: false, styleId: null },
} as MarkJSON;

type Run = readonly MarkJSON[];

const PLAIN: Run = [];

/** `total` split over `count` parts, the last taking the remainder, so the parts add up to `total`. */
const shares = (total: number, count: number): number[] => {
    const each = Math.floor(total / count);
    return Array.from({ length: count }, (_, index) => {
        if (index === count - 1) {
            return total - each * (count - 1);
        }
        return each;
    });
};

/** Adjacent runs differ in their marks, so the editor never merges two of them into one text node. */
const runsOf = (seed: number, total: number, marks: readonly Run[]): ContentNodeJSON[] =>
    shares(total, marks.length).map((length, index) => {
        const run = marks[index] ?? PLAIN;
        const value = wordsOf(seed + index, length);
        if (run.length === 0) {
            return { type: 'text', text: value } as ContentNodeJSON;
        }
        return { type: 'text', text: value, marks: [...run] } as ContentNodeJSON;
    });

/** Alternating plain and marked runs, `count` of them. */
const alternating = (count: number, mark: MarkJSON): readonly Run[] =>
    Array.from({ length: count }, (_, index) => {
        if (index % 2 === 0) {
            return PLAIN;
        }
        return [mark];
    });

let identity = 0;
const nextId = (kind: string) => {
    identity += 1;
    return `${kind}-${identity}`;
};

const paragraph = (content: readonly ContentNodeJSON[], styleId: string | null = null): ContentNodeJSON =>
    ({ type: 'paragraph', attrs: { lang: null, styleId }, content }) as ContentNodeJSON;

const mentionOf = (): ContentNodeJSON =>
    ({
        type: 'mention',
        attrs: {
            nodeId: nextId('mention'),
            resourceType: 'user',
            resourceId: 'user-42',
            labelSnapshot: 'Ada Lovelace',
        },
    }) as ContentNodeJSON;

const item = (content: readonly ContentNodeJSON[]): ContentNodeJSON =>
    ({ type: 'list_item', content }) as ContentNodeJSON;

const bullet = (items: readonly ContentNodeJSON[]): ContentNodeJSON =>
    ({ type: 'bullet_list', attrs: { marker: null }, content: items }) as ContentNodeJSON;

const ordered = (items: readonly ContentNodeJSON[]): ContentNodeJSON =>
    ({ type: 'ordered_list', attrs: { start: 1, marker: null }, content: items }) as ContentNodeJSON;

const task = (items: readonly ContentNodeJSON[]): ContentNodeJSON =>
    ({
        type: 'task_list',
        content: items.map((entry) => ({
            type: 'task_item',
            attrs: { nodeId: nextId('task'), checked: false },
            content: entry.content,
        })),
    }) as ContentNodeJSON;

const heading = (seed: number, total: number): ContentNodeJSON =>
    ({
        type: 'heading',
        attrs: { nodeId: nextId('heading'), level: 2, lang: null, styleId: null },
        content: runsOf(seed, total, [PLAIN]),
    }) as ContentNodeJSON;

const quote = (seed: number, total: number, paragraphs: number): ContentNodeJSON =>
    ({
        type: 'blockquote',
        attrs: { styleId: 'brand.quote' },
        content: shares(total, paragraphs).map((share, index) =>
            paragraph(runsOf(seed + index, share, alternating(2, ITALIC))),
        ),
    }) as ContentNodeJSON;

const figure = (): ContentNodeJSON =>
    ({
        type: 'figure',
        attrs: { nodeId: nextId('figure'), align: 'center' },
        content: [
            {
                type: 'asset_image',
                attrs: {
                    nodeId: nextId('image'),
                    assetId: 'asset-palette',
                    labelSnapshot: 'palette.png',
                    altIntent: 'meaningful',
                    altText: 'Five swatches from deep blue to sand',
                    width: 1200,
                    height: 600,
                    displayWidth: 75,
                    mediaType: 'image/png',
                },
            },
        ],
    }) as ContentNodeJSON;

/** A list of `count` items that each hold one paragraph of `runs` runs and `total` graphemes in all. */
const items = (seed: number, total: number, count: number, runs: number): ContentNodeJSON[] =>
    shares(total, count).map((share, index) => item([paragraph(runsOf(seed + index, share, alternating(runs, BOLD)))]));

/** One block of the cycle, built from `seed`, holding `total` graphemes in `runs` text runs where it has runs to spare. */
type Pattern = (seed: number, total: number, runs?: number) => ContentNodeJSON;

const PATTERNS = {
    heading,
    marked: (seed, total, runs = 6) => paragraph(runsOf(seed, total, alternating(runs, BOLD))),
    mention: (seed, total) =>
        paragraph([
            ...runsOf(seed, Math.floor(total / 2), [PLAIN]),
            mentionOf(),
            ...runsOf(seed + 1, total - Math.floor(total / 2), alternating(2, ITALIC)),
        ]),
    brand: (seed, total, runs = 3) => paragraph(runsOf(seed, total, alternating(runs, UNDERLINE)), 'brand.lead'),
    link: (seed, total, runs = 3) => paragraph(runsOf(seed, total, alternating(runs, LINK))),
    bullets: (seed, total) => {
        const nested = bullet(items(seed + 5, Math.floor(total / 3), 2, 1));
        const first = item([paragraph(runsOf(seed, Math.floor(total / 3), alternating(2, BOLD))), nested]);
        const rest = items(seed + 9, total - 2 * Math.floor(total / 3), 2, 2);
        return bullet([first, ...rest]);
    },
    ordered: (seed, total) => ordered(items(seed, total, 3, 2)),
    tasks: (seed, total) => task(items(seed, total, 2, 1)),
    quote: (seed, total) => quote(seed, total, 2),
    figure,
} as const satisfies Record<string, Pattern>;

type PatternName = keyof typeof PATTERNS;

/** The blocks of one cycle in order, each with its graphemes. */
type Cycle = readonly (readonly [PatternName, number, number?])[];

/** The `typical` cycle: 10 blocks of 100 nodes and 1,000 graphemes, repeated 20 times. */
const TYPICAL_CYCLE: Cycle = [
    ['heading', 40],
    ['marked', 120, 14],
    ['mention', 90],
    ['brand', 110, 5],
    ['bullets', 150],
    ['ordered', 120],
    ['tasks', 60],
    ['quote', 120],
    ['link', 90],
    ['marked', 100, 20],
];

/** The `large` cycle: 15 blocks of 200 nodes and 1,000 graphemes, repeated 100 times. */
const LARGE_CYCLE: Cycle = [
    ['heading', 40],
    ['marked', 90, 30],
    ['mention', 70],
    ['brand', 60, 14],
    ['bullets', 100],
    ['ordered', 80],
    ['tasks', 50],
    ['quote', 80],
    ['figure', 0],
    ['link', 60, 21],
    ['bullets', 90],
    ['ordered', 70],
    ['marked', 60, 30],
    ['mention', 50],
    ['tasks', 100],
];

const cycled = (cycle: Cycle, times: number): ContentNodeJSON[] => {
    identity = 0;
    return Array.from({ length: times }, (_, round) =>
        cycle.map(([name, total, runs], index) => PATTERNS[name](round * 31 + index, total, runs)),
    ).flat();
};

/** `small`: a Comment document of 2,000 graphemes in 20 blocks with marks, links and 5 mentions. */
const smallBlocks = (): ContentNodeJSON[] => {
    identity = 0;
    return Array.from({ length: 20 }, (_, index) => {
        if (index < 5) {
            return PATTERNS.mention(index, 100);
        }
        if (index % 4 === 0) {
            return PATTERNS.link(index, 100);
        }
        return PATTERNS.marked(index, 100);
    });
};

/** `words10k`: 10,000 words of paragraphs, lists and marks, in 200 blocks of 50 words. */
const wordsBlocks = (): ContentNodeJSON[] => {
    identity = 0;
    // A block of 50 words is 49 spaces and 50 words of 6.5 letters on average, so a length picks a word count.
    const block = (seed: number, shape: 'paragraph' | 'list'): ContentNodeJSON => {
        const fifty = (start: number, count: number) =>
            Array.from({ length: count }, (_, word) => WORDS[(seed * 5 + start + word * 3) % WORDS.length]).join(' ');
        if (shape === 'paragraph') {
            return paragraph([
                { type: 'text', text: `${fifty(0, 20)} ` } as ContentNodeJSON,
                { type: 'text', text: fifty(20, 10), marks: [BOLD] } as ContentNodeJSON,
                { type: 'text', text: ` ${fifty(30, 20)}` } as ContentNodeJSON,
            ]);
        }
        return bullet(
            Array.from({ length: 5 }, (_, entry) =>
                item([paragraph([{ type: 'text', text: fifty(entry * 10, 10) } as ContentNodeJSON])]),
            ),
        );
    };
    return Array.from({ length: 200 }, (_, index) => block(index, index % 4 === 3 ? 'list' : 'paragraph'));
};

/** The blocks of a perf fixture, for a test that builds its own envelope. */
export const perfBlocks = (name: PerfFixtureName): ContentNodeJSON[] => {
    if (name === 'small') {
        return smallBlocks();
    }
    if (name === 'typical') {
        return cycled(TYPICAL_CYCLE, 20);
    }
    if (name === 'large') {
        return cycled(LARGE_CYCLE, 100);
    }
    return wordsBlocks();
};

/** The stored document of a perf fixture, in `model`, which holds every feature of `PERF_FEATURES`. */
export const perfDocument = (name: PerfFixtureName, model: ContentModel): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: perfBlocks(name) },
    }) as unknown as RichTextDocument;

/** `many`: the 20 editors of the many-editors rows, each with a `small` document. */
export const manyDocuments = (model: ContentModel): readonly RichTextDocument[] =>
    Array.from({ length: 20 }, () => perfDocument('small', model));
