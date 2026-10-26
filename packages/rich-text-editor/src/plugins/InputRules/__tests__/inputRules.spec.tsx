/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { codeBlock } from '#/plugins';
import { fixtureCodeBlock } from '#/plugins/__tests__/fixtures/code-block/feature';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const ALL_TYPOGRAPHY = [
    'typography.quotes',
    'typography.ellipsis',
    'typography.dashes',
    'typography.symbols',
    'typography.numeric',
] as const;
const ALLOW = { create: true, edit: true, remove: true, paste: true };
// The table's model: the text pair, its typography rules, and the code block the `code.fence` row needs.
const tableFeatures = () => [...textFeatures(ALL_TYPOGRAPHY), codeBlock()];

type Mounted = ReturnType<typeof mountText>;

/** The first block's type, then each child's text with its marks, such as `paragraph x[bold]`. */
const shapeOf = ({ handle }: Mounted) => {
    const [block] = handle.getSnapshot().document.content.content ?? [];
    if (block === undefined) {
        return '';
    }

    const runs = (block.content ?? []).map((child) => {
        const marks = (child.marks ?? []).map((mark) => `[${mark.type}]`).join('');

        return `${child.text ?? child.type}${marks}`;
    });

    return [block.type, ...runs].join(' ');
};

const typedIn = (typed: string, options: Parameters<typeof mountText>[0] = {}) => {
    const mounted = mountText(options);
    typeText(mounted.handle, typed);
    const shape = shapeOf(mounted);
    mounted.unmount();

    return shape;
};

// Each rule of the delivered features: its feature, what is typed, and the first block once it fired.
const RULES: readonly (readonly [string, string, string, string])[] = [
    ['heading.hashes', 'blocks.heading', '## ', 'heading'],
    ['quote.angle', 'blocks.quote', '> ', 'blockquote paragraph'],
    ['code.fence', 'blocks.code', '``` ', 'code_block'],
    ['bold.stars', 'marks.bold', '**x**', 'paragraph x[bold]'],
    ['bold.underscores', 'marks.bold', '__x__', 'paragraph x[bold]'],
    ['italic.star', 'marks.italic', '*x*', 'paragraph x[italic]'],
    ['italic.underscore', 'marks.italic', '_x_', 'paragraph x[italic]'],
    ['strike.tildes', 'marks.strike', '~~x~~', 'paragraph x[strike]'],
    ['code.backtick', 'marks.code', '`x`', 'paragraph x[code]'],
    ['typography.quotes.double', 'input-rules', '"x"', 'paragraph “x”'],
    ['typography.quotes.single', 'input-rules', "'y'", 'paragraph ‘y’'],
    ['typography.ellipsis', 'input-rules', 'Wait...', 'paragraph Wait…'],
    ['typography.dashes', 'input-rules', 'a -- b', 'paragraph a – b'],
    ['typography.symbols.copyright', 'input-rules', '(c)', 'paragraph ©'],
    ['typography.symbols.registered', 'input-rules', '(r)', 'paragraph ®'],
    ['typography.symbols.trademark', 'input-rules', '(tm)', 'paragraph ™'],
    ['typography.numeric.half', 'input-rules', '1/2 ', 'paragraph ½ '],
];

describe('input rules', () => {
    for (const [id, featureId, typed, fired] of RULES) {
        it(`applies ${id} only while it is on, its feature is installed and the policy allows creation`, () => {
            const model = textModel(tableFeatures());
            const missing = textModel(tableFeatures().filter((feature) => feature.id !== featureId));
            const forbidden = { features: { [featureId]: { ...ALLOW, create: false } } };

            expect([
                typedIn(typed, { model }),
                typedIn(typed, { model, inputRules: { exclude: [id] } }),
                typedIn(typed, { model: missing }),
                typedIn(typed, { model, policy: forbidden }),
            ]).toEqual([fired, `paragraph ${typed}`, `paragraph ${typed}`, `paragraph ${typed}`]);
        });

        it(`fires no shipped ${id} inside inline code`, () => {
            const mounted = mountText({
                model: textModel(tableFeatures()),
                blocks: [para(text('..', 'code'))],
            });
            setSelection(mounted.handle, { text: '..', from: 1, to: 1 });
            typeText(mounted.handle, typed);

            expect(shapeOf(mounted)).toBe(`paragraph .${typed}.[code]`);
        });
    }

    it('leaves a paragraph as it is for the level 1 shortcut and "# " with levels 2 and 3 creatable', () => {
        const mounted = mountText({ blocks: [para(text('Title'))], policy: { creatableHeadingLevels: [2, 3] } });
        setSelection(mounted.handle, { text: 'Title', from: 0, to: 0 });
        pressKey(mounted.handle, 'Ctrl-Shift-1');
        const afterShortcut = shapeOf(mounted);
        typeText(mounted.handle, '# ');
        const afterRule = shapeOf(mounted);
        // The same rule and shortcut make a level 2 heading, so the refusal is the level's alone.
        const allowed = mountText({ blocks: [para(text('Title'))], policy: { creatableHeadingLevels: [2, 3] } });
        setSelection(allowed.handle, { text: 'Title', from: 0, to: 0 });
        typeText(allowed.handle, '## ');

        expect([afterShortcut, afterRule, shapeOf(allowed)]).toEqual([
            'paragraph Title',
            'paragraph # Title',
            'heading Title',
        ]);
    });

    it('fires no heading, quote or numeric rule at the start of a code block or after a numeric token in code-marked text', () => {
        const model = textModel([...textFeatures(ALL_TYPOGRAPHY), fixtureCodeBlock()]);
        const codeBlock = (value: string) => ({
            type: 'chrome_code',
            attrs: { nodeId: 'code-1', language: 'plain' },
            content: [text(value)],
        });
        const inBlock = ['## ', '> ', '1/2 '].map((typed) => {
            const mounted = mountText({ model, blocks: [codeBlock('x')] });
            setSelection(mounted.handle, { text: 'x', from: 0, to: 0 });
            typeText(mounted.handle, typed);
            const shape = shapeOf(mounted);
            mounted.unmount();

            return shape;
        });
        // The caret sits inside a code run, so the typed space is code-marked and a whole token comes before it.
        const inCode = mountText({ model, blocks: [para(text('1/2x', 'code'))] });
        setSelection(inCode.handle, { text: '1/2x', from: 3, to: 3 });
        typeText(inCode.handle, ' ');

        expect(inBlock).toEqual(['chrome_code ## x', 'chrome_code > x', 'chrome_code 1/2 x']);
        expect(shapeOf(inCode)).toBe('paragraph 1/2 x[code]');
    });

    it('turns every rule off and on through the inputRules prop with the same view and plugins', () => {
        const mounted = mountText({ model: textModel(textFeatures(ALL_TYPOGRAPHY)) });
        const { view } = mounted;
        const plugins = view.state.plugins;
        mounted.rerenderWith(false);
        typeText(mounted.handle, '**x** -- ');
        const off = shapeOf(mounted);
        mounted.rerenderWith(undefined);
        typeText(mounted.handle, '**y**');
        const current = runtimeOf(mounted.handle)?.view;

        expect([off, shapeOf(mounted)]).toEqual(['paragraph **x** -- ', 'paragraph **x** --  y[bold]']);
        expect(current).toBe(view);
        expect(current?.state.plugins).toEqual(plugins);
        expect(current?.state.plugins.every((plugin, index) => plugin === plugins[index])).toBe(true);
    });

    it('stops only italic.underscore through the inputRules exclude list, with the same view', () => {
        const mounted = mountText({ inputRules: { exclude: ['italic.underscore'] } });
        const { view } = mounted;
        typeText(mounted.handle, '_x_ *y*');

        expect(shapeOf(mounted)).toBe('paragraph _x_  y[italic]');
        expect(runtimeOf(mounted.handle)?.view).toBe(view);
    });

    it('fires no italic.underscore inside snake_case words', () => {
        const typed = ['snake_case_name', 'a_b_c', 'file_name.ts'].map((word) => typedIn(word));

        expect([...typed, typedIn('see _x_')]).toEqual([
            'paragraph snake_case_name',
            'paragraph a_b_c',
            'paragraph file_name.ts',
            'paragraph see  x[italic]',
        ]);
    });

    it('keeps dates and numbers as typed while typography.numeric is off, the default', () => {
        const off = ['1/2/2026 ', '3x4 ', '2^2 '].map((typed) => typedIn(typed));
        const on = typedIn('3x4 ', { model: textModel(textFeatures(['typography.numeric'])) });

        expect([...off, on]).toEqual(['paragraph 1/2/2026 ', 'paragraph 3x4 ', 'paragraph 2^2 ', 'paragraph 3×4 ']);
    });

    it('replaces only a whole numeric token followed by a space', () => {
        const model = textModel(textFeatures(['typography.numeric']));
        const typed = ['1/2/2026 ', '10/12 ', '3x4x5 ', '1/2 ', '3^2 ', '3x4 '].map((token) =>
            typedIn(token, { model }),
        );

        expect(typed).toEqual([
            'paragraph 1/2/2026 ',
            'paragraph 10/12 ',
            'paragraph 3x4x5 ',
            'paragraph ½ ',
            'paragraph 3² ',
            'paragraph 3×4 ',
        ]);
    });

    it('runs only the typography rules listed, so dashes alone leave symbols, ellipsis, fractions and quotes as typed', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect(typedIn('(c) ... 1/2 "x"', { model })).toBe('paragraph (c) ... 1/2 "x"');
    });

    it('keeps 11/2, 13/4 and a1/2 as typed, because a fraction needs a space or the block start before it', () => {
        const model = textModel(textFeatures(['typography.numeric']));
        const typed = ['11/2 ', '13/4 ', 'a1/2 '].map((token) => typedIn(token, { model }));

        expect(typed).toEqual(['paragraph 11/2 ', 'paragraph 13/4 ', 'paragraph a1/2 ']);
    });

    it('keeps the hyphens of a CSS custom property name while typography.dashes is on', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect([typedIn('--brand-color', { model }), typedIn('a -- b', { model })]).toEqual([
            'paragraph --brand-color',
            'paragraph a – b',
        ]);
    });

    it('keeps a longer dash run and an arrow while typography.dashes is on', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect([typedIn('a --- b', { model }), typedIn('a --> b', { model })]).toEqual([
            'paragraph a --- b',
            'paragraph a --> b',
        ]);
    });

    it('opens a quote typed right after a line break', () => {
        const mounted = mountText({ model: textModel(textFeatures(['typography.quotes'])) });
        typeText(mounted.handle, 'a');
        pressKey(mounted.handle, 'Shift-Enter');
        typeText(mounted.handle, '"x"');

        expect(shapeOf(mounted)).toBe('paragraph a hard_break “x”');
    });

    it('quotes Portuguese with “ ” and European Portuguese with « »', () => {
        const model = textModel(textFeatures(['typography.quotes']));
        const typed = ['pt', 'pt-PT'].map((lang) =>
            typedIn('"x"', { model, blocks: [{ type: 'paragraph', attrs: { lang }, content: [] }] }),
        );

        expect(typed).toEqual(['paragraph “x”', 'paragraph «x»']);
    });

    it('closes a quote typed after a closing inner quote, in en, pt and es', () => {
        const model = textModel(textFeatures(['typography.quotes']));
        const typed = ['en', 'pt', 'es'].map((lang) =>
            typedIn(`"He said 'yes'"`, { model, blocks: [{ type: 'paragraph', attrs: { lang }, content: [] }] }),
        );

        expect(typed).toEqual(['paragraph “He said ‘yes’”', 'paragraph “He said ‘yes’”', 'paragraph “He said ‘yes’”']);
    });

    it('closes an open inner quote after a letter in de, fr and ja, and keeps the apostrophe in a word', () => {
        const model = textModel(textFeatures(['typography.quotes']));
        const typedAs = (lang: string, value: string) =>
            typedIn(value, { model, blocks: [{ type: 'paragraph', attrs: { lang }, content: [] }] });

        expect([
            typedAs('de', `"Er sagte 'ja'"`),
            typedAs('fr', `"Il dit 'oui'"`),
            typedAs('ja', `"彼は 'はい'"`),
            typedAs('de', "Geht's"),
            typedAs('fr', `"l'eau"`),
        ]).toEqual([
            'paragraph „Er sagte ‚ja‘“',
            'paragraph «Il dit «oui»»',
            'paragraph 「彼は 『はい』」',
            'paragraph Geht’s',
            'paragraph «l’eau»',
        ]);
    });

    it('turns _text_ italic and replaces an arrow, a service mark, plus-minus, inequality, a guillemet, one half and a subscript digit', () => {
        const model = textModel(textFeatures(ALL_TYPOGRAPHY));
        const typed = ['_text_', '->', '(sm)', '+/-', '!=', '<<', '1/2 ', '~2 '].map((value) =>
            typedIn(value, { model }),
        );

        expect(typed).toEqual([
            'paragraph text[italic]',
            'paragraph →',
            'paragraph ℠',
            'paragraph ±',
            'paragraph ≠',
            'paragraph «',
            'paragraph ½ ',
            'paragraph ₂ ',
        ]);
    });

    it('replaces the other arrows and guillemet, and leaves --> and a subscript digit with no space as typed', () => {
        const model = textModel(textFeatures(['typography.symbols', 'typography.dashes', 'typography.numeric']));

        expect(
            ['-->', '->', '<->', '<- ', '>>', '~2', '~2 ', 'a~2 '].map((value) => typedIn(value, { model })),
        ).toEqual([
            'paragraph -->',
            'paragraph →',
            'paragraph ↔',
            'paragraph ← ',
            'paragraph »',
            'paragraph ~2',
            'paragraph ₂ ',
            'paragraph a~2 ',
        ]);
    });

    it('keeps <!-- and <-- as typed while typography.dashes is on', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect([typedIn('<!-- x', { model }), typedIn('a <-- b', { model })]).toEqual([
            'paragraph <!-- x',
            'paragraph a <-- b',
        ]);
    });
});
