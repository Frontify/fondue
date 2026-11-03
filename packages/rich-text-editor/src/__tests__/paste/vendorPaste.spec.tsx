/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Driven through the package's public API, the way a host does: what a paste
// from another application leaves in the document the host is told about.
import { defaultPlugins, RichTextEditor, type RteDocument } from '../../index';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// happy-dom's stylesheets have `cssRules` only; the engine reads `rules` to apply the pasted `<style>` as browsers do.
Object.defineProperty(window.CSSStyleSheet.prototype, 'rules', {
    get(this: CSSStyleSheet) {
        return this.cssRules;
    },
});

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');

type Node = { type?: string; text?: string; style?: string; children?: Node[]; [key: string]: unknown };

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

/** What the host is holding after `html` is pasted into an empty editor. */
const pasted = (html: string): RteDocument => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChange = vi.fn<(doc: RteDocument) => void>();
    act(() => {
        root.render(
            <RichTextEditor
                value={{ version: 1, blocks: [{ type: 'paragraph', children: [{ text: '' }] }] }}
                onChange={onChange}
                plugins={defaultPlugins}
            />,
        );
    });
    teardown.push(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
    });
    const editable = container.querySelector('[contenteditable]');
    if (!editable) {
        throw new Error('the editor never became editable');
    }
    const data = new DataTransfer();
    data.setData('text/html', html);
    data.setData('text/plain', 'plain text fallback');
    act(() => {
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
    const stored = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    if (!stored) {
        throw new Error('the paste never reached the host');
    }
    return stored;
};

const fixture = (name: string): string => readFileSync(join(FIXTURES, `${name}.html`), 'utf8');

const nodesOf = (doc: RteDocument): Node[] => doc.blocks as Node[];

const textOf = (children: Node[] = []): string => {
    let text = '';
    for (const child of children) {
        if (child.type === 'break') {
            text += '\n';
        } else {
            text += child.text ?? '';
        }
    }
    return text;
};

/** One line per text block, `bullet`/`number` for list items, two spaces per nesting level. */
const outline = (blocks: Node[], depth = 0): string[] =>
    blocks.flatMap((block) => {
        const pad = '  '.repeat(depth);
        if (block.type === 'bulletList' || block.type === 'numberedList') {
            let kind = 'number';
            if (block.type === 'bulletList') {
                kind = 'bullet';
            }
            return (block.children ?? []).flatMap((item) => {
                const [first, ...rest] = item.children ?? [];
                return [`${pad}${kind}: ${textOf(first?.children)}`.trimEnd(), ...outline(rest, depth + 1)];
            });
        }
        let label = block.type ?? '';
        if (block.type === 'textStyle') {
            label = block.style ?? '';
        }
        return [`${pad}${label}: ${textOf(block.children)}`.trimEnd()];
    });

/** The blocks that hold text itself, at any depth. */
const textBlocks = (blocks: Node[]): Node[] =>
    blocks.flatMap((block) => {
        const nested = block.children?.filter((child) => child.children);
        if (nested?.length) {
            return textBlocks(nested);
        }
        return [block];
    });

/** The marks on the text run holding `word`, without its text. */
const marksOn = (doc: RteDocument, word: string): Record<string, unknown> => {
    const run = textBlocks(nodesOf(doc))
        .flatMap((block) => block.children ?? [])
        .find((inline) => inline.text?.includes(word));
    if (!run) {
        throw new Error(`no text run holds "${word}"`);
    }
    const { text: _text, ...marks } = run;
    return marks;
};

/** Text blocks that are a lone break, which is what Docs' `<br>` between blocks used to leave. */
const soleBreaks = (doc: RteDocument): Node[] =>
    textBlocks(nodesOf(doc)).filter((block) => block.children?.length === 1 && block.children[0]?.type === 'break');

/** Everything a clean paste has none of, whatever the vendor. */
const expectNoJunk = (doc: RteDocument): void => {
    // A block of one space is what `<o:p>&nbsp;</o:p>` used to leave; an empty block is a real blank line.
    expect(textBlocks(nodesOf(doc)).filter((block) => /^\s+$/.test(textOf(block.children)))).toEqual([]);
    const emitted = JSON.stringify(doc);
    for (const trace of ['mso-', 'o:p', 'docs-internal', 'font-weight', 'font-family', '<']) {
        expect(emitted).not.toContain(trace);
    }
    // A marker glyph or number from the source list left at the start of an item or heading.
    expect(outline(nodesOf(doc)).filter((line) => /: (?:[·o§•]\s|\d+[.)]\s)/.test(line))).toEqual([]);
};

describe('pasting from other applications', () => {
    describe('Word', () => {
        it('rebuilds mso-list paragraphs as nested bullet and numbered lists', async () => {
            const doc = pasted(fixture('word-windows-lists'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Launch checklist',
                'bullet: Brief the team',
                '  bullet: Share the brand book',
                '    bullet: Agree on the palette',
                'bullet: Book the room',
                'paragraph:',
                'number: Draft the copy',
                'number: Review it with Legal',
                'paragraph: Legal signs off before anything is published.',
                'number: Publish',
            ]);
            expect(marksOn(doc, 'Launch checklist')).toEqual({ bold: true });
            expect(marksOn(doc, 'brand book')).toEqual({ italic: true });
            expect(marksOn(doc, 'Legal')).toEqual({ bold: true });
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/word-windows-lists.document.json',
            );
        });

        it('keeps numbered headings as headings, without their numbers', async () => {
            const doc = pasted(fixture('word-mac-headings'));

            expect(outline(nodesOf(doc))).toEqual([
                'heading1: Introduction',
                'paragraph: Why the brand moves to one system.',
                'heading2: Scope',
                'paragraph: Logos, colours and type.',
                'heading2: Out of scope',
                'heading1: Timeline',
            ]);
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/word-mac-headings.document.json',
            );
        });

        it('keeps marks, links and colours, and the blank lines as empty paragraphs', async () => {
            const doc = pasted(fixture('word-windows-paragraphs'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Brand review',
                'paragraph:',
                'paragraph: The new palette is warmer, see the guidelines.',
                'paragraph: Due Friday',
                'paragraph:',
            ]);
            expect(marksOn(doc, 'new palette')).toEqual({ bold: true });
            expect(marksOn(doc, 'warmer')).toEqual({ italic: true });
            expect(marksOn(doc, 'the guidelines')).toMatchObject({ link: { href: 'https://www.frontify.com/brand' } });
            expect(marksOn(doc, 'Friday')).toEqual({ underline: true, fontColor: { color: '#c00000' } });
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/word-windows-paragraphs.document.json',
            );
        });

        it('leaves no trace of a picture in the text around it', async () => {
            const doc = pasted(fixture('word-windows-image'));

            expect(outline(nodesOf(doc))).toEqual(['paragraph: Our logo:', 'paragraph:', 'paragraph: End']);
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/word-windows-image.document.json',
            );
        });

        it('reads Word for the web as it is', async () => {
            const doc = pasted(fixture('word-online'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Quarterly update',
                'paragraph: Numbers follow\nnext week',
            ]);
            expect(marksOn(doc, 'update')).toEqual({ bold: true });
            expect(marksOn(doc, 'Numbers')).toEqual({ italic: true });
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/word-online.document.json',
            );
        });
    });

    describe('Outlook', () => {
        it('rebuilds mso-list paragraphs and keeps the lists Outlook wrote as lists', async () => {
            const doc = pasted(fixture('outlook-lists'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Hi all,',
                'paragraph:',
                'bullet: Logos are final',
                '  bullet: Dark and light',
                'bullet: Fonts need a licence',
                'bullet: Icons are next',
                'paragraph:',
                'bullet: Ship the kit',
                '  bullet: Templates',
                '  bullet:',
                'bullet: Announce it',
                'paragraph:',
                'paragraph: Best,',
                'paragraph: Ada',
            ]);
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/outlook-lists.document.json',
            );
        });
    });

    describe('Google Docs', () => {
        it('turns the headings, marks, lists and links of a Chrome copy into blocks', async () => {
            const doc = pasted(fixture('google-docs-chrome'));

            expect(outline(nodesOf(doc))).toEqual([
                'heading2: Launch plan',
                'paragraph: The brand refresh ships in May.',
                'paragraph:',
                'bullet: Logo',
                'bullet: Colours and type',
                'paragraph:',
                'paragraph: Frontify',
            ]);
            expect(marksOn(doc, 'brand refresh')).toEqual({ bold: true });
            expect(marksOn(doc, 'Colours')).toEqual({ bold: true });
            expect(marksOn(doc, 'Frontify')).toMatchObject({ link: { href: 'https://www.frontify.com/' } });
            expect(soleBreaks(doc)).toEqual([]);
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/google-docs-chrome.document.json',
            );
        });

        it('turns each empty line into one empty paragraph, and keeps an empty bullet', async () => {
            const doc = pasted(fixture('google-docs-empty'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Agenda',
                'paragraph:',
                'paragraph:',
                'bullet: Welcome',
                'bullet:',
                'bullet: Questions',
                'paragraph:',
                'paragraph: Thanks',
            ]);
            expect(soleBreaks(doc)).toEqual([]);
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/google-docs-empty.document.json',
            );
        });

        it('turns an empty line at the start or end of the copy into one empty paragraph', () => {
            const doc = pasted(
                '<meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-1">' +
                    '<br><h1>Title</h1><br><p>Text</p><br></b>',
            );

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph:',
                'heading1: Title',
                'paragraph:',
                'paragraph: Text',
                'paragraph:',
            ]);
            expect(soleBreaks(doc)).toEqual([]);
        });

        it('reads a Firefox copy, where the id is on the first block', async () => {
            const doc = pasted(fixture('google-docs-firefox'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Meeting notes, Tuesday',
                'paragraph:',
                'paragraph: Attendees: Ada, Grace',
            ]);
            expect(marksOn(doc, 'Tuesday')).toEqual({ bold: true });
            expect(marksOn(doc, 'Attendees')).toEqual({ italic: true });
            expect(soleBreaks(doc)).toEqual([]);
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/google-docs-firefox.document.json',
            );
        });

        it('reads bold, underline and strikethrough from the styles of each run', async () => {
            const doc = pasted(fixture('google-docs-runs'));

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: Normal bold semibold medium extrabold italic',
                'paragraph: under struck both',
                'paragraph: H2O and E=mc2',
            ]);
            expect(marksOn(doc, 'bold semibold')).toEqual({ bold: true });
            expect(marksOn(doc, 'struck')).toEqual({ strikethrough: true });
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/google-docs-runs.document.json',
            );
        });
    });

    describe('LibreOffice', () => {
        it('keeps the heading, marks and list, and drops the script', async () => {
            const doc = pasted(fixture('libreoffice'));

            expect(outline(nodesOf(doc))).toEqual([
                'heading2: Release notes',
                'paragraph: This release is faster and simpler.',
                'number: Faster export',
                'number: Fewer clicks',
                'paragraph: Danke',
            ]);
            expect(marksOn(doc, 'faster')).toEqual({ bold: true });
            expect(marksOn(doc, 'simpler')).toEqual({ italic: true });
            expect(JSON.stringify(doc)).not.toContain('alert');
            expectNoJunk(doc);
            await expect(`${JSON.stringify(doc, null, 4)}\n`).toMatchFileSnapshot(
                './fixtures/libreoffice.document.json',
            );
        });
    });

    describe('multi-level numbering', () => {
        it('keeps `1.`, `1.1.` and `2.` items in one nested numbered list', () => {
            const item = (level: number, marker: string, text: string): string =>
                `<p class="MsoListParagraph" style="mso-list: l0 level${level} lfo1">` +
                `<span style="mso-list: Ignore">${marker}</span>${text}<o:p></o:p></p>`;
            const doc = pasted(
                item(1, '1.', 'Scope') +
                    item(2, '1.1.', 'Logos') +
                    item(2, '1.2.', 'Colours') +
                    item(1, '2.', 'Timeline'),
            );

            expect(outline(nodesOf(doc))).toEqual([
                'number: Scope',
                '  number: Logos',
                '  number: Colours',
                'number: Timeline',
            ]);
        });
    });

    describe('list data in the class rule of a Word list style', () => {
        const styled = (style: string, text: string): string =>
            `<p class="MsoListNumber"${style}><span style="mso-list: Ignore">1.</span>${text}<o:p></o:p></p>`;
        const withRule = (body: string): string =>
            // No `<!-- -->` around the rule as Word writes it: Chrome skips those, happy-dom reads them into the selector.
            `<style>p.MsoListNumber { mso-list: l0 level1 lfo1; }</style>${body}`;

        it('lists a paragraph that has only the rule', () => {
            const doc = pasted(withRule(styled('', 'Scope')));

            expect(outline(nodesOf(doc))).toEqual(['number: Scope']);
        });

        it('takes the level and list a paragraph writes itself over the rule', () => {
            const doc = pasted(
                withRule(
                    styled('', 'Scope') +
                        styled(' style="mso-list: l0 level2 lfo1"', 'Logos') +
                        styled(' style="mso-list: l0 level1 lfo3"', 'Timeline'),
                ),
            );

            expect(outline(nodesOf(doc))).toEqual(['number: Scope', '  number: Logos', 'number: Timeline']);
            expect(nodesOf(doc)).toHaveLength(2);
        });

        it('keeps a paragraph that writes `mso-list: none` out of the list', () => {
            const doc = pasted(withRule(styled(' style="mso-list: none"', 'Note')));

            expect(outline(nodesOf(doc))).toEqual(['paragraph: Note']);
        });
    });

    describe('a bold element that only carries the Google Docs id', () => {
        it('stays bold, as it is no Docs wrapper', () => {
            const doc = pasted('<p>a <b id="docs-internal-guid-1">bold</b></p>');

            expect(JSON.stringify(doc.blocks)).toContain('"bold":true');
        });

        it('leaves the breaks of the paste alone when the id is on neither the wrapper nor the first block', () => {
            const html = '<p>a</p><br><p>b <span id="docs-internal-guid-1">c</span></p>';

            expect(pasted(html)).toEqual(pasted(html.replace(' id="docs-internal-guid-1"', '')));
        });

        it('leaves the breaks of the paste alone when the bold element comes first', () => {
            const html = '<b id="docs-internal-guid-1">x</b><p>a</p><br><p>b</p>';

            expect(pasted(html)).toEqual(pasted(html.replace(' id="docs-internal-guid-1"', '')));
        });
    });

    describe('a soft break inside the Google Docs wrapper', () => {
        it('stays a line break when no block is beside it', () => {
            const doc = pasted(
                '<b style="font-weight:normal;" id="docs-internal-guid-1"><span>a</span><br><span>b</span></b>',
            );

            expect(outline(nodesOf(doc))).toEqual(['paragraph: a\nb']);
        });
    });

    describe('an `<o:p>` marker that holds text', () => {
        it('pastes the text in place, with no trace of the marker', () => {
            const doc = pasted('<p class="MsoNormal">a<o:p>kept <b>bold</b></o:p> end</p>');

            expect(outline(nodesOf(doc))).toEqual(['paragraph: akept bold end']);
            expect(marksOn(doc, 'bold')).toEqual({ bold: true });
            expectNoJunk(doc);
        });
    });

    describe('text that mentions Office styles', () => {
        it('keeps `mso-list: l0` verbatim in a paste from elsewhere', () => {
            const doc = pasted("<p>the style mso-list: l0 level1 lfo1 is Word's</p>");

            expect(outline(nodesOf(doc))).toEqual(["paragraph: the style mso-list: l0 level1 lfo1 is Word's"]);
        });

        it('keeps `mso-list: l0` verbatim in the text of an Office paste', () => {
            const doc = pasted(
                '<p class="MsoNormal">write <i>mso-list: l0</i> as a style<o:p></o:p></p>' +
                    '<p class="MsoNormal">or style="mso-list: l0 level1 lfo1" in text<o:p></o:p></p>',
            );

            expect(outline(nodesOf(doc))).toEqual([
                'paragraph: write mso-list: l0 as a style',
                'paragraph: or style="mso-list: l0 level1 lfo1" in text',
            ]);
        });
    });

    describe('hostile input dressed as Office', () => {
        it('never lets a script, an event handler or a javascript: link through', () => {
            const doc = pasted(
                '<p class="MsoNormal" onclick="alert(1)">Hi <a href="javascript:alert(1)" onclick="alert(2)">click</a>' +
                    '<o:p></o:p></p>' +
                    '<p class="MsoListParagraph" style="mso-list: l0 level1 lfo1" onmouseover="alert(3)">' +
                    '<span style="mso-list: Ignore">·</span>item <a href="javascript:alert(4)">there</a><o:p></o:p></p>' +
                    '<script>alert(5)</script>',
            );

            expect(outline(nodesOf(doc))).toEqual(['paragraph: Hi click', 'bullet: item there']);
            const emitted = JSON.stringify(doc);
            for (const trace of ['javascript:', 'onclick', 'onmouseover', 'alert', 'script']) {
                expect(emitted).not.toContain(trace);
            }
        });

        it('drops a bullet span with markup in it whole, never into the item', () => {
            const doc = pasted(
                '<p class="MsoListParagraph" style="mso-list: l0 level1 lfo1">' +
                    '<span style="mso-list: Ignore"><b>·</b><a href="https://evil.example">o</a>' +
                    '<img src="x" onerror="alert(1)"></span>Item<o:p></o:p></p>',
            );

            expect(outline(nodesOf(doc))).toEqual(['bullet: Item']);
            const emitted = JSON.stringify(doc);
            for (const trace of ['evil.example', 'onerror', 'alert', '"bold"', '"link"']) {
                expect(emitted).not.toContain(trace);
            }
        });
    });
});
