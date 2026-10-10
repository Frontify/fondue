/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { fixtureCodeBlock } from '#/features/__fixtures__/code-block/feature';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection, typeText } from '#/testing';

import { mountText, para, text, textFeatures, textModel } from '../../../fixtures/editor/text';

const ALL_TYPOGRAPHY = [
    'typography.quotes',
    'typography.ellipsis',
    'typography.dashes',
    'typography.symbols',
    'typography.numeric',
] as const;
const ALLOW = { create: true, edit: true, remove: true, paste: true };

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
    ['bold.stars', 'marks.bold', '**x**', 'paragraph x[bold]'],
    ['bold.underscores', 'marks.bold', '__x__', 'paragraph x[bold]'],
    ['italic.star', 'marks.italic', '*x*', 'paragraph x[italic]'],
    ['italic.underscore', 'marks.italic', '_x_', 'paragraph x[italic]'],
    ['strike.tildes', 'marks.strike', '~~x~~', 'paragraph x[strike]'],
    ['code.backtick', 'marks.code', '`x`', 'paragraph x[code]'],
    ['typography.quotes', 'input-rules', '"x" \'y\'', 'paragraph “x” ‘y’'],
    ['typography.ellipsis', 'input-rules', 'Wait...', 'paragraph Wait…'],
    ['typography.dashes', 'input-rules', 'a -- b', 'paragraph a – b'],
    ['typography.symbols', 'input-rules', '(c) (r) (tm)', 'paragraph © ® ™'],
    ['typography.numeric', 'input-rules', '1/2 ', 'paragraph ½ '],
];

describe('input rules', () => {
    for (const [id, featureId, typed, fired] of RULES) {
        it(`SPEC-rich-text-editing/AC-037 applies ${id} only while it is on, its feature is installed and the policy allows creation`, () => {
            const model = textModel(textFeatures(ALL_TYPOGRAPHY));
            const missing = textModel(textFeatures(ALL_TYPOGRAPHY).filter((feature) => feature.id !== featureId));
            const forbidden = { features: { [featureId]: { ...ALLOW, create: false } } };

            expect([
                typedIn(typed, { model }),
                typedIn(typed, { model, inputRules: { exclude: [id] } }),
                typedIn(typed, { model: missing }),
                typedIn(typed, { model, policy: forbidden }),
            ]).toEqual([fired, `paragraph ${typed}`, `paragraph ${typed}`, `paragraph ${typed}`]);
        });

        it(`SPEC-rich-text-editing/AC-039 fires no shipped ${id} inside inline code`, () => {
            const mounted = mountText({
                model: textModel(textFeatures(ALL_TYPOGRAPHY)),
                blocks: [para(text('..', 'code'))],
            });
            setSelection(mounted.handle, { text: '..', from: 1, to: 1 });
            typeText(mounted.handle, typed);

            expect(shapeOf(mounted)).toBe(`paragraph .${typed}.[code]`);
        });
    }

    it('SPEC-rich-text-editing/AC-013 and AC-037 leave a paragraph as it is for the level 1 shortcut and "# " with levels 2 and 3 creatable', () => {
        const mounted = mountText({ blocks: [para(text('Title'))], policy: { creatableHeadingLevels: [2, 3] } });
        setSelection(mounted.handle, { text: 'Title', from: 0, to: 0 });
        const event = new KeyboardEvent('keydown', {
            key: '1',
            ctrlKey: true,
            shiftKey: true,
            bubbles: true,
            cancelable: true,
        });
        mounted.view.dom.dispatchEvent(event);
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

    it('SPEC-rich-text-editing/AC-039 fires no heading, quote or numeric rule at the start of a code block or after a numeric token in code-marked text', () => {
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

    it('SPEC-rich-text-editing/AC-042 turns every rule off and on through the inputRules prop with the same view and plugins', () => {
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

    it('SPEC-rich-text-editing/AC-101 stops only italic.underscore through the inputRules exclude list, with the same view', () => {
        const mounted = mountText({ inputRules: { exclude: ['italic.underscore'] } });
        const { view } = mounted;
        typeText(mounted.handle, '_x_ *y*');

        expect(shapeOf(mounted)).toBe('paragraph _x_  y[italic]');
        expect(runtimeOf(mounted.handle)?.view).toBe(view);
    });

    it('SPEC-rich-text-editing/AC-043 fires no italic.underscore inside snake_case words', () => {
        const typed = ['snake_case_name', 'a_b_c', 'file_name.ts'].map((word) => typedIn(word));

        expect([...typed, typedIn('see _x_')]).toEqual([
            'paragraph snake_case_name',
            'paragraph a_b_c',
            'paragraph file_name.ts',
            'paragraph see  x[italic]',
        ]);
    });

    it('SPEC-rich-text-editing/AC-045 keeps dates and numbers as typed while typography.numeric is off, the default', () => {
        const off = ['1/2/2026 ', '3x4 ', '2^2 '].map((typed) => typedIn(typed));
        const on = typedIn('3x4 ', { model: textModel(textFeatures(['typography.numeric'])) });

        expect([...off, on]).toEqual(['paragraph 1/2/2026 ', 'paragraph 3x4 ', 'paragraph 2^2 ', 'paragraph 3×4 ']);
    });

    it('SPEC-rich-text-editing/AC-077 replaces only a whole numeric token followed by a space', () => {
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

    it('SPEC-rich-text-editing/AC-045 runs only the typography rules listed, so dashes alone leave symbols, ellipsis, fractions and quotes as typed', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect(typedIn('(c) ... 1/2 "x"', { model })).toBe('paragraph (c) ... 1/2 "x"');
    });

    it('SPEC-rich-text-editing/AC-077 keeps 11/2, 13/4 and a1/2 as typed, because a fraction needs a space or the block start before it', () => {
        const model = textModel(textFeatures(['typography.numeric']));
        const typed = ['11/2 ', '13/4 ', 'a1/2 '].map((token) => typedIn(token, { model }));

        expect(typed).toEqual(['paragraph 11/2 ', 'paragraph 13/4 ', 'paragraph a1/2 ']);
    });

    it('SPEC-rich-text-editing/AC-102 keeps the hyphens of a CSS custom property name while typography.dashes is on', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect([typedIn('--brand-color', { model }), typedIn('a -- b', { model })]).toEqual([
            'paragraph --brand-color',
            'paragraph a – b',
        ]);
    });

    it('SPEC-rich-text-editing/AC-102 keeps a longer dash run and an arrow while typography.dashes is on', () => {
        const model = textModel(textFeatures(['typography.dashes']));

        expect([typedIn('a --- b', { model }), typedIn('a --> b', { model })]).toEqual([
            'paragraph a --- b',
            'paragraph a --> b',
        ]);
    });

    it('SPEC-rich-text-editing/AC-044 opens a quote typed right after a line break', () => {
        const mounted = mountText({ model: textModel(textFeatures(['typography.quotes'])) });
        typeText(mounted.handle, 'a');
        mounted.view.dom.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true, cancelable: true }),
        );
        typeText(mounted.handle, '"x"');

        expect(shapeOf(mounted)).toBe('paragraph a hard_break “x”');
    });

    it('SPEC-rich-text-editing/AC-044 quotes Portuguese with “ ” and European Portuguese with « »', () => {
        const model = textModel(textFeatures(['typography.quotes']));
        const typed = ['pt', 'pt-PT'].map((lang) =>
            typedIn('"x"', { model, blocks: [{ type: 'paragraph', attrs: { lang }, content: [] }] }),
        );

        expect(typed).toEqual(['paragraph “x”', 'paragraph «x»']);
    });
});
