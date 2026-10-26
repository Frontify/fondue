/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';

import fc from 'fast-check';
import { JSDOM } from 'jsdom';
import { type Node as EngineNode, DOMParser as SchemaParser } from 'prosemirror-model';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { NO_COLORS } from '#/clipboard/import/colors';
import { cleanGoogleDocs } from '#/clipboard/import/googleDocs';
import { importHtml } from '#/clipboard/import/html';
import { removeEmptySpans, removeItemBreaks, removeMarkup } from '#/clipboard/import/markup';
import { rebuildOfficeLists, removeOfficeMarkup } from '#/clipboard/import/office';
import { buildSchema } from '#/definition/schema';
import { htmlFeatures, htmlModel } from '#/features/__tests__/fixtures/html';
import { core } from '#/features/core/feature';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { orderedList } from '#/features/listsOrdered/feature';
import { taskList } from '#/features/listsTask/feature';
import { compileContentModel, type ContentModel, defaultLimits, defineFeature } from '#/model';
import { compiledModel } from '#/model/internal';

import { fromHTML } from '../index';

const { window } = new JSDOM('');
const host = window as unknown as Window;
const fixtures = new URL('../../clipboard/__tests__/fixtures/vendor/', import.meta.url);
const readFixture = (name: string) => readFileSync(new URL(name, fixtures), 'utf8');
// Without literal colours, as `marks.font-color` ships, so the colour every Google Docs run sets stays out.
const vendorModel = compileContentModel(
    [...htmlFeatures().filter((feature) => feature.id !== 'marks.font-color'), taskList()],
    { id: 'fixture.vendor', version: 1 },
);
const withoutNodeIds = (value: unknown): unknown =>
    JSON.parse(JSON.stringify(value, (key, item: unknown) => (key === 'nodeId' ? undefined : item)));

/** The content of the document that `fromHTML` makes of `html`, which must decode as `editable`. */
const contentOf = (
    html: string,
    options: Omit<Parameters<typeof fromHTML>[2], 'window'> = {},
    model: ContentModel = vendorModel,
) => {
    const result = fromHTML(html, model, { window: host, ...options });
    if (result.status !== 'editable') {
        throw new Error(`fromHTML returned ${result.status}`);
    }

    return withoutNodeIds(result.document.content.content ?? []) as readonly object[];
};

const paragraph = (...content: readonly object[]) => ({
    type: 'paragraph',
    attrs: { lang: null, align: null },
    content,
});
const plain = (value: string) => paragraph({ type: 'text', text: value });
const item = (...content: readonly object[]) => ({ type: 'list_item', content });
const bullets = (...items: readonly object[]) => ({ type: 'bullet_list', content: items });

/** The text of each textblock with the marks of each run, which a cleanup must keep. */
const runsOf = (node: EngineNode) => {
    const blocks: string[][] = [];
    node.descendants((child) => {
        if (child.isTextblock) {
            blocks.push(
                child.content.content.map((run) => `${run.text ?? `<${run.type.name}>`}|${JSON.stringify(run.marks)}`),
            );
        }
    });

    return blocks.map((runs) => runs.filter((run) => !run.startsWith('<hard_break>')).join(''));
};

afterEach(() => {
    vi.restoreAllMocks();
});

describe('vendor cleanups', () => {
    it.each([
        [
            'the Google Docs wrapper, and its id on the first block of a Firefox capture',
            ['google-docs-chrome.html', 'google-docs-firefox.html'],
        ],
        ['the styled runs of Google Docs', ['google-docs-runs.html']],
        [
            'the mso-list paragraphs, headings and items of Word and Outlook',
            ['word-windows-lists.html', 'word-mac-headings.html', 'outlook-lists.html'],
        ],
        ['the breaks between Google Docs blocks and in its empty items', ['google-docs-empty.html']],
        [
            'the conditional comments, o:p, Mso classes and mso- properties of Office',
            ['word-windows-paragraphs.html', 'excel.html'],
        ],
        [
            'the meta, style, script, link, comments and empty spans of any source',
            ['libreoffice.html', 'word-online.html'],
        ],
        ['the images of any source', ['word-windows-image.html']],
    ] as const)('cleans %s', (_row, names) => {
        for (const name of names) {
            expect(contentOf(readFixture(name))).toMatchSnapshot(name);
        }
    });

    it('unwraps the Google Docs wrapper without making its text bold, and keeps its bold runs bold', () => {
        const content = JSON.stringify(contentOf(readFixture('google-docs-chrome.html')));

        expect(content).toContain('{"type":"text","text":"The "}');
        expect(content).toContain('{"type":"text","text":"brand refresh","marks":[{"type":"bold"}]}');
        expect(content).toContain('{"type":"text","text":" and type"}');
    });

    it('keeps a normal weight inside a bold element of a Google Docs capture normal', () => {
        const html =
            '<b style="font-weight:normal" id="docs-internal-guid-1"><p><b>bold <span style="font-weight:400">normal</span></b><span style="font-weight:700">heavy <span style="font-weight:normal">light</span></span></p></b>';

        expect(contentOf(html)).toEqual([
            paragraph(
                { type: 'text', text: 'bold ', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'normal' },
                { type: 'text', text: 'heavy ', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'light' },
            ),
        ]);
    });

    it('leaves a b with a docs-internal-guid id but no normal weight bold', () => {
        expect(contentOf('<b id="docs-internal-guid-1">kept bold</b>')).toEqual([
            paragraph({ type: 'text', text: 'kept bold', marks: [{ type: 'bold' }] }),
        ]);
    });

    it('drops the image of a Word capture and counts it, keeping its alt text', () => {
        const schema = buildSchema(vendorModel);
        const imported = importHtml(readFixture('word-windows-image.html'), schema, host, {
            limits: defaultLimits,
            headingLevels: undefined,
            depth: 2,
            colors: NO_COLORS,
            rules: [],
        });

        expect(imported.droppedImages).toBe(2);
        expect(imported.content.textBetween(0, imported.content.size, '|')).toBe('Our logo:|Frontify logo|End');
    });

    it('hands the cleaned inert body straight to the schema parser, parsing the HTML once', () => {
        const parseFromString = vi.spyOn(window.DOMParser.prototype, 'parseFromString');
        let parsed: { readonly node: unknown; readonly html: string } | undefined;
        const original = SchemaParser.prototype.parse;
        vi.spyOn(SchemaParser.prototype, 'parse').mockImplementation(function (this: SchemaParser, node, options) {
            parsed = { node, html: (node as HTMLElement).outerHTML };

            return original.call(this, node, options);
        });

        contentOf(readFixture('word-windows-lists.html'));

        expect(parseFromString).toHaveBeenCalledTimes(1);
        const inert = parseFromString.mock.results[0]?.value as Document;
        expect(parsed?.node).toBe(inert.body);
        expect(parsed?.html).toMatch(/<ul><li>\s*Brief the team/);
        expect(parsed?.html).not.toMatch(/<!--|o:p|Mso|mso-|<meta|<style|<link/);
    });
});

describe('the Office lists', () => {
    /** A Word list paragraph of list `list` at `level` in list instance `lfo`, its bullet in the `mso-list:Ignore` span. */
    const wordItem = (value: string, level: number, lfo = 'lfo1', list = 'l0') =>
        `<p class="MsoListParagraph" style="margin-left:.5in;text-indent:-.25in;mso-list:${list} level${level} ${lfo}"><![if !supportLists]><span style="font-family:Symbol"><span style="mso-list:Ignore">·<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>${value}<o:p></o:p></p>`;

    it('keeps a Word list paragraph at level0 as a paragraph with its text', () => {
        const content = contentOf(wordItem('Zero', 0));

        expect(content.map((block) => (block as { readonly type: string }).type)).toEqual(['paragraph']);
        expect(JSON.stringify(content)).toContain('Zero');
    });

    it('imports a list paragraph with 140,000 empty child elements without throwing', () => {
        const html = `<p class="MsoListParagraph" style="mso-list:l0 level1 lfo1">${'<i></i>'.repeat(140_000)}Item</p>`;

        expect(contentOf(html)).toEqual([bullets(item(plain('Item')))]);
        // jsdom alone takes about a second to build and parse the 140,000 elements; the whole test about 15 s under load.
    }, 45_000);

    it('keeps the list paragraphs as paragraphs without markers when maxDepth fits no list level, without rejecting', () => {
        const html = wordItem('One', 1) + wordItem('Two', 2);

        expect(contentOf(html, { limits: { maxDepth: 4 } })).toEqual([plain('One'), plain('Two')]);
    });

    it('keeps two adjacent lists of one template with lfo1 and lfo2 apart, and nests the levels of one lfo', () => {
        const apart = wordItem('First', 1, 'lfo1') + wordItem('Second', 1, 'lfo2');
        const nested = wordItem('Outer', 1, 'lfo1') + wordItem('Inner', 2, 'lfo1');

        expect(contentOf(apart)).toEqual([bullets(item(plain('First'))), bullets(item(plain('Second')))]);
        expect(contentOf(nested)).toEqual([bullets(item(plain('Outer'), bullets(item(plain('Inner')))))]);
    });

    it('continues the numbering of a Word list that resumes after a paragraph', () => {
        const numbered = (value: string, marker: string) => wordItem(value, 1).replace('·', marker);
        const html = `${numbered('One', '1.')}${numbered('Two', '2.')}<p class="MsoNormal">Between</p>${numbered('Three', '3.')}`;

        expect(contentOf(html)).toEqual([
            { type: 'ordered_list', attrs: { start: 1 }, content: [item(plain('One')), item(plain('Two'))] },
            plain('Between'),
            { type: 'ordered_list', attrs: { start: 3 }, content: [item(plain('Three'))] },
        ]);
    });
});

describe('task lists of other editors', () => {
    it('pastes a Google Docs or Lexical checklist as a task list with Done checked and Open unchecked', () => {
        const html =
            '<ul><li role="checkbox" aria-checked="true"><p>Done</p></li><li role="checkbox" aria-checked="false"><p>Open</p></li></ul>';

        expect(contentOf(html)).toEqual([
            {
                type: 'task_list',
                content: [
                    { type: 'task_item', attrs: { checked: true }, content: [plain('Done')] },
                    { type: 'task_item', attrs: { checked: false }, content: [plain('Open')] },
                ],
            },
        ]);
    });
});

describe('a model without the feature whose markup a cleanup read', () => {
    // A host feature that reads `em` and a two-line decoration, as a model without the shipped marks may.
    const hostMarks = defineFeature({
        id: 'fixture.host-marks',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: {
            host_emphasis: { attrs: {}, html: ['em', 0], parse: [{ tag: 'em' }] },
            host_double: {
                attrs: {},
                html: ['span', 0],
                parse: [{ style: 'text-decoration', value: 'underline line-through' }],
            },
        },
    });
    /** The import of `html` with the model's function rules, and the plain parse of the same HTML. */
    const importedAndPlain = (html: string, model: ContentModel) => {
        const schema = buildSchema(model);
        const imported = importHtml(html, schema, host, {
            limits: defaultLimits,
            headingLevels: undefined,
            depth: 2,
            colors: NO_COLORS,
            rules: compiledModel(model).parseRules,
        });
        const body = new window.DOMParser().parseFromString(html, 'text/html').body;

        return {
            imported: schema.topNodeType.create(null, imported.content).toJSON() as unknown,
            plain: SchemaParser.fromSchema(schema).parse(body).toJSON() as unknown,
        };
    };

    const hostModel = compileContentModel([core(), hostMarks()], { id: 'fixture.host-marks', version: 1 });

    it('reads the italic style of a Google Docs run as the plain parse does without marks.italic', () => {
        const { imported, plain } = importedAndPlain(
            '<b style="font-weight:normal" id="docs-internal-guid-1"><p><span style="font-style:italic">slanted</span></p></b>',
            hostModel,
        );

        expect(imported).toEqual(plain);
    });

    it('reads a two-line decoration as the plain parse does without marks.underline and marks.strike', () => {
        const { imported, plain } = importedAndPlain(
            '<p><span style="text-decoration: underline line-through">both</span></p>',
            hostModel,
        );

        expect(imported).toEqual(plain);
        expect(JSON.stringify(imported)).toContain('"type":"host_double"');
    });

    it('reads the task lists of other editors as the plain parse does without lists.task', () => {
        const model = compileContentModel([core(), listItem(), bulletList(), orderedList()], {
            id: 'fixture.no-tasks',
            version: 1,
        });
        const { imported, plain } = importedAndPlain(
            '<ul class="contains-task-list"><li class="task-list-item"><input type="checkbox" checked> Done</li></ul>' +
                '<ul><li aria-checked="true"><p>Open</p></li></ul>',
            model,
        );

        expect(imported).toEqual(plain);
        expect(JSON.stringify(imported)).not.toContain('task');
    });
});

describe('vendor cleanups on HTML from other sources', () => {
    const word = fc.constantFrom('Plan', 'brand', 'Office', 'docs', 'mso', 'list', 'level1', 'note', '1.', '·');
    const words = fc.array(word, { minLength: 1, maxLength: 3 }).map((values) => values.join(' '));
    const attributes = fc
        .record({
            className: fc.option(fc.constantFrom('note', 'lead', 'Apple-style-span', 'MsoQuote', 'docs-title')),
            style: fc.option(
                fc.constantFrom(
                    'color:red',
                    'margin-left:4px',
                    'font-weight:bold',
                    'font-weight:700',
                    'font-weight:400',
                    'font-style:italic',
                    'text-decoration:underline',
                    'vertical-align:super',
                    'mso-bidi-font-weight:normal',
                    'font-size:11pt;mso-ansi-language:EN-US',
                ),
            ),
            id: fc.option(fc.constantFrom('intro', 'docs-internal', 'guid-docs-internal')),
        })
        .map(({ className, style, id }) => {
            let value = '';
            if (className !== null) {
                value += ` class="${className}"`;
            }

            if (style !== null) {
                value += ` style="${style}"`;
            }

            if (id !== null) {
                value += ` id="${id}"`;
            }

            return value;
        });
    const { inline } = fc.letrec<{ inline: string }>((tie) => ({
        inline: fc.oneof(
            { depthSize: 'small', withCrossShrink: true },
            words,
            fc.constant('<br>'),
            fc.constant('<span></span>'),
            fc
                .tuple(
                    fc.constantFrom('b', 'strong', 'i', 'em', 'u', 's', 'sub', 'sup', 'code', 'span'),
                    attributes,
                    fc.array(tie('inline'), { minLength: 1, maxLength: 3 }),
                )
                .map(([tag, attrs, children]) => `<${tag}${attrs}>${children.join('')}</${tag}>`),
            fc
                .array(tie('inline'), { minLength: 1, maxLength: 2 })
                .map((children) => `<a href="https://frontify.com">${children.join('')}</a>`),
        ),
    }));
    const runs = fc.array(inline, { minLength: 1, maxLength: 3 }).map((values) => values.join(''));
    const listItem = fc.oneof(
        runs.map((value) => `<li>${value}</li>`),
        runs.map((value) => `<li><p>${value}</p></li>`),
        fc.constant('<li><br></li>'),
    );
    const block = fc.oneof(
        fc.tuple(attributes, runs).map(([attrs, value]) => `<p${attrs}>${value}</p>`),
        fc
            .tuple(fc.constantFrom('h1', 'h2', 'h3'), attributes, runs)
            .map(([tag, attrs, value]) => `<${tag}${attrs}>${value}</${tag}>`),
        fc
            .tuple(fc.constantFrom('ul', 'ol'), fc.array(listItem, { minLength: 1, maxLength: 3 }))
            .map(([tag, items]) => `<${tag}>${items.join('')}</${tag}>`),
        fc.constant('<br>'),
    );
    const html = fc.array(block, { minLength: 1, maxLength: 5 }).map((blocks) => blocks.join(''));

    const schema = buildSchema(htmlModel());
    const parser = SchemaParser.fromSchema(schema);
    const bodyOf = (value: string) => new window.DOMParser().parseFromString(value, 'text/html').body;
    const cleanups: readonly (readonly [string, (body: HTMLElement) => void])[] = [
        ['removeMarkup', removeMarkup],
        ['cleanGoogleDocs', cleanGoogleDocs],
        ['rebuildOfficeLists', (body) => rebuildOfficeLists(body, defaultLimits.maxDepth, 2)],
        ['removeOfficeMarkup', removeOfficeMarkup],
        ['removeItemBreaks', removeItemBreaks],
        ['removeEmptySpans', removeEmptySpans],
    ];

    it.each(cleanups)(
        '%s keeps the text and marks of a plain parse',
        (_name, cleanup) => {
            fc.assert(
                fc.property(html, (value) => {
                    const cleaned = bodyOf(value);
                    cleanup(cleaned);

                    expect(runsOf(parser.parse(cleaned))).toEqual(runsOf(parser.parse(bodyOf(value))));
                }),
                { numRuns: 150 },
            );
            // A hang guard: in the full suite, with coverage and every worker busy, it takes up to six times its cost alone.
        },
        30_000,
    );

    it('keeps the text and marks of a plain parse through the whole import', () => {
        fc.assert(
            fc.property(html, (value) => {
                const imported = importHtml(value, schema, host, {
                    limits: defaultLimits,
                    headingLevels: undefined,
                    depth: 2,
                    colors: NO_COLORS,
                    rules: [],
                });

                expect(runsOf(schema.topNodeType.create(null, imported.content))).toEqual(
                    runsOf(parser.parse(bodyOf(value))),
                );
            }),
            { numRuns: 150 },
        );
    }, 30_000);
});

describe('chrome copy markers', () => {
    it('drops the Apple-interchange-newline break Chrome adds around a copied range', () => {
        expect(
            contentOf('<br class="Apple-interchange-newline"><p>One</p><br class="Apple-interchange-newline">'),
        ).toEqual([plain('One')]);
    });
});

describe('decorations', () => {
    it('reads an underline and a line-through set in one decoration as both marks, from any source', () => {
        const content = JSON.stringify(
            contentOf('<p><span style="text-decoration: underline line-through">both</span></p>'),
        );

        expect(content).toContain('"text":"both"');
        expect(content).toContain('{"type":"underline"}');
        expect(content).toContain('{"type":"strike"}');
    });
});

describe('hostile vendor markers', () => {
    it('strips 80,000 Mso classes from one element in one write', () => {
        const classes = Array.from({ length: 80_000 }, (_, index) => `Mso${index}`).join(' ');
        const body = new window.DOMParser().parseFromString(`<p class="${classes} keep">x</p>`, 'text/html').body;
        const started = performance.now();

        removeOfficeMarkup(body);

        expect(performance.now() - started).toBeLessThan(500);
        expect(body.innerHTML).toBe('<p class="keep">x</p>');
    });

    it('ignores a docs-internal-guid id that is neither the wrapper nor the first block', () => {
        const html =
            '<p><b style="font-weight:normal">Keep</b> <span style="font-weight:650">Heavy</span></p><p>One</p><br><p>Two</p><span id="docs-internal-guid-x"></span>';

        expect(JSON.stringify(contentOf(html))).toBe(
            JSON.stringify(contentOf(html.replace('<span id="docs-internal-guid-x"></span>', ''))),
        );
    });

    it('reads no list from an mso-list inside a style comment or a quoted value', () => {
        const html =
            '<p style="color:red; /* mso-list: l0 level1 lfo1 */">Hello <span style="font-family: \'mso-list: Ignore\'">world</span></p>';

        expect(JSON.stringify(contentOf(html))).toContain('world');
        expect(JSON.stringify(contentOf(html))).not.toContain('bullet_list');
    });

    it('keeps a checklist item checked when it also carries an mso-list style', () => {
        const content = JSON.stringify(
            contentOf('<ul><li aria-checked="true" style="mso-list:l0 level1 lfo1"><p>Done</p></li></ul>'),
        );

        expect(content).toContain('"type":"task_list"');
        expect(content).toContain('"checked":true');
    });
});

describe('Word numbering formats', () => {
    // The shipped list features, whose ordered list keeps a `marker`.
    const listModel = compileContentModel([core(), listItem(), bulletList(), orderedList()], {
        id: 'fixture.vendor-lists',
        version: 1,
    });
    const wordItem = (level: number, marker: string, text: string) =>
        `<p class="MsoListParagraph" style="mso-list:l0 level${level} lfo1"><span style="mso-list:Ignore">${marker}<span style="font:7.0pt 'Times New Roman'">&nbsp;</span></span>${text}</p>`;
    const markersOf = (html: string) =>
        JSON.stringify(contentOf(html, {}, listModel))
            .match(/"marker":"[\w-]+"/g)
            ?.map((found) => found.slice(10, -1));

    it('keeps letter and roman numbering from the marker text, upper and lower case', () => {
        expect(markersOf(wordItem(1, 'a.', 'One') + wordItem(1, 'b.', 'Two'))).toEqual(['lower-alpha']);
        expect(markersOf(wordItem(1, 'A)', 'One'))).toEqual(['upper-alpha']);
        expect(markersOf(wordItem(1, 'i.', 'One') + wordItem(1, 'ii.', 'Two'))).toEqual(['lower-roman']);
        expect(markersOf(wordItem(1, 'I.', 'One'))).toEqual(['upper-roman']);
    });

    it('keeps a decimal list nested in a decimal list decimal', () => {
        expect(markersOf(wordItem(1, '1.', 'Outer') + wordItem(2, '1.', 'Inner'))).toEqual(['decimal', 'decimal']);
    });
});
