/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

import { type CssRule, literalColors, parseCss, scanCss } from './check-css';

const read = (path: string) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8');
const fixture = (name: string) => read(`../fixtures/css/${name}`);
const content = parseCss(read('../src/styles/content.css'));

describe('check-css', () => {
    it('SPEC-rich-text-react/AC-050 fails on a content rule outside the root class', () => {
        expect(scanCss('unscoped.css', fixture('unscoped.css'))).toEqual([
            'unscoped.css:1 selector p is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-050 passes chrome rules from a CSS Module and fails on a lookalike or one that reaches content', () => {
        expect(scanCss('module.css', fixture('module.css'))).toEqual([
            'module.css:7 selector .root_16wik_2 is not inside :where(.fondue-rte-content)',
            'module.css:10 selector ._root_16wik_2 .fondue-rte-content p is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-067 fails on a content selector that is not wrapped in :where', () => {
        expect(scanCss('specific.css', fixture('specific.css'))).toEqual([
            'specific.css:1 selector .fondue-rte-content p is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-050 fails on a sibling of the root or of a content element', () => {
        expect(scanCss('sibling.css', fixture('sibling.css'))).toEqual([
            'sibling.css:1 selector :where(.fondue-rte-content) + p is not inside :where(.fondue-rte-content)',
            'sibling.css:5 selector :where(.fondue-rte-content p) ~ ul is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-067 fails on a selector that continues after the :where, which adds specificity', () => {
        expect(scanCss('descendant-tail.css', fixture('descendant-tail.css'))).toEqual([
            'descendant-tail.css:1 selector :where(.fondue-rte-content) .x is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-050 passes ~ and + inside an attribute value and a pseudo-class argument', () => {
        expect(scanCss('combinator-lookalikes.css', fixture('combinator-lookalikes.css'))).toEqual([]);
    });

    it('SPEC-rich-text-react/AC-050 fails from the command line on the stylesheet it is given', () => {
        const run = spawnSync(
            process.execPath,
            ['--import', 'tsx', 'scripts/check-css.ts', 'fixtures/css/unscoped.css'],
            {
                cwd: fileURLToPath(new URL('..', import.meta.url)),
                encoding: 'utf8',
            },
        );

        expect(run.status).toBe(1);
        expect(run.stderr).toContain(
            'fixtures/css/unscoped.css:1 selector p is not inside :where(.fondue-rte-content)',
        );
    });

    it('SPEC-rich-text-react/AC-050 fails on a :where list that reaches outside the root', () => {
        expect(scanCss('selector-list.css', fixture('selector-list.css'))).toEqual([
            'selector-list.css:1 selector :where(.fondue-rte-content, p) is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-050 fails on a class that only starts with the root class', () => {
        expect(scanCss('prefix.css', fixture('prefix.css'))).toEqual([
            'prefix.css:1 selector :where(.fondue-rte-contentx) is not inside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-050 fails on an at-rule other than media and keyframes that carries declarations', () => {
        expect(scanCss('at-rule-declarations.css', fixture('at-rule-declarations.css'))).toEqual([
            'at-rule-declarations.css:1 at-rule @page carries declarations outside :where(.fondue-rte-content)',
        ]);
    });

    it('SPEC-rich-text-react/AC-052 fails on the CSS Color 4 colour functions and system colours', () => {
        expect(scanCss('color-functions.css', fixture('color-functions.css'))).toEqual([
            'color-functions.css:1 color sets the literal colour hwb(',
            'color-functions.css:1 background-color sets the literal colour lab(',
            'color-functions.css:1 border-color sets the literal colour lch(',
            'color-functions.css:1 outline-color sets the literal colour oklab(',
            'color-functions.css:1 caret-color sets the literal colour oklch(',
            'color-functions.css:1 text-decoration-color sets the literal colour color(',
            'color-functions.css:1 column-rule-color sets the literal colour Canvas',
        ]);
    });

    it('SPEC-rich-text-react/AC-052 fails on hex, rgb, hsl and named colours', () => {
        expect(scanCss('literal-colors.css', fixture('literal-colors.css'))).toEqual([
            'literal-colors.css:1 color sets the literal colour #8cf',
            'literal-colors.css:1 background sets the literal colour rgb(',
            'literal-colors.css:1 border-color sets the literal colour hsl(',
            'literal-colors.css:1 outline-color sets the literal colour Black',
        ]);
    });

    it('SPEC-rich-text-accessibility/AC-020 fails on keyframes outside the allowlist', () => {
        expect(scanCss('keyframes.css', fixture('keyframes.css'))).toEqual([
            'keyframes.css:1 keyframes ProseMirror-cursor-blink is not in src/styles/keyframes.allowlist.ts',
        ]);
    });

    it('SPEC-rich-text-react/AC-052 SPEC-rich-text-accessibility/AC-020 passes var() fallbacks, keywords, strings and allowlisted keyframes', () => {
        expect(scanCss('allowed.css', fixture('allowed.css'), ['blink'])).toEqual([]);
        expect(scanCss('allowed.css', fixture('allowed.css'))).toEqual([
            'allowed.css:14 keyframes blink is not in src/styles/keyframes.allowlist.ts',
        ]);
    });

    it('SPEC-rich-text-react/AC-050 SPEC-rich-text-react/AC-052 passes the package content stylesheet', () => {
        expect(scanCss('content.css', read('../src/styles/content.css'))).toEqual([]);
    });
});

const SURFACE = '.fondue-rte-content[data-rte-surface]';
const require = createRequire(import.meta.url);
const { dependencies } = JSON.parse(read('../package.json')) as { readonly dependencies: Record<string, string> };
// The engine stylesheets AC-092 names; each one counts once its package is a dependency, which no global import loads.
const ENGINE_STYLESHEETS = [
    'prosemirror-view/style/prosemirror.css',
    'prosemirror-gapcursor/style/gapcursor.css',
    'prosemirror-tables/style/tables.css',
];
const PHYSICAL_OFFSETS: Readonly<Record<string, string>> = {
    left: 'inset-inline-start',
    right: 'inset-inline-end',
    top: 'inset-block-start',
    bottom: 'inset-block-end',
};

// Quotes are optional in attribute selectors and interchangeable in strings.
const normalize = (text: string) => text.replaceAll(/['"]/g, '').replaceAll(/\s+/g, ' ').trim();

/** The package selector for an engine selector: on the surface itself for the classes the engine puts there, else inside it. */
const scoped = (selector: string) => {
    const [, base = selector, pseudo = ''] = /^(.*?)((?:::?)(?:[\w-]*selection|after|before))?$/.exec(selector) ?? [];
    let inside = `${SURFACE} ${base}`;
    if (/^\.ProseMirror(?![\w-])/.test(base)) {
        inside = base.replace(/^\.ProseMirror/, SURFACE);
    } else if (base.startsWith('.ProseMirror-hideselection')) {
        inside = `${SURFACE}${base}`;
    }
    return normalize(`:where(${inside})${pseudo.replace(/^:(?=[a-z])/, '::')}`);
};

/** Whether the package declares `value` for `property`, with each colour literal of the engine's value replaced by a variable. */
const declares = (rule: CssRule, property: string, value: string) => {
    let pattern = normalize(value).replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const color of literalColors(value)) {
        pattern = pattern.replace(color.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'var\\(--rte-content-[\\w-]+\\)');
    }
    const matcher = new RegExp(`^${pattern}$`);
    return rule.declarations.some(([name, given]) => name === property && matcher.test(normalize(given)));
};

describe('content stylesheet', () => {
    const installed = ENGINE_STYLESHEETS.filter((path) => dependencies[path.split('/')[0] ?? ''] !== undefined);

    it('SPEC-rich-text-react/AC-092 carries the engine stylesheets of the installed dependencies only', () => {
        expect(installed).toEqual(['prosemirror-view/style/prosemirror.css']);
    });

    for (const path of installed) {
        it(`SPEC-rich-text-react/AC-092 carries every structural declaration of ${path} under the surface scope`, () => {
            const missing: string[] = [];
            const visited: string[] = [];
            for (const rule of parseCss(readFileSync(require.resolve(path), 'utf8')).rules) {
                for (const selector of rule.selectors) {
                    const target = scoped(selector);
                    // A rule on every content root reaches the surface too, since the surface is one.
                    const targets = [target, target.replace('[data-rte-surface]', '')];
                    const ours = content.rules.filter(({ selectors }) =>
                        selectors.map(normalize).some((selector) => targets.includes(selector)),
                    );
                    for (const [property, value] of rule.declarations) {
                        visited.push(`${property}: ${value}`);
                        const expected = PHYSICAL_OFFSETS[property] ?? property;
                        if (!ours.some((candidate) => declares(candidate, expected, value))) {
                            missing.push(`${target} { ${expected}: ${value} }`);
                        }
                    }
                }
            }

            // An empty or unparsed engine stylesheet would leave nothing to miss.
            expect(visited.length).toBeGreaterThan(0);
            expect(visited).toContain('white-space: break-spaces');
            expect(missing).toEqual([]);
        });
    }

    it('SPEC-rich-text-react/AC-092 sets no literal colour, no physical offset and no animation outside reduced motion no-preference', () => {
        const faults = content.rules.flatMap(({ selectors, declarations, atRules }) =>
            declarations.flatMap(([property, value]) => {
                const found: string[] = literalColors(value).map((color) => `${selectors[0]} ${property}: ${color}`);
                if (PHYSICAL_OFFSETS[property] !== undefined) {
                    found.push(`${selectors[0]} ${property}`);
                }
                const reducible = atRules.some((prelude) => /prefers-reduced-motion:\s*no-preference/.test(prelude));
                if (property.startsWith('animation') && !reducible) {
                    found.push(`${selectors[0]} ${property}`);
                }
                return found;
            }),
        );

        expect(faults).toEqual([]);
    });
});

type Rgba = readonly [number, number, number, number];
// The module runner has no `import.meta.resolve`, so the theme file comes from the installed package's export map.
const tokens = new URL('../node_modules/@frontify/fondue-tokens/', import.meta.url);
const { exports: tokenExports } = JSON.parse(readFileSync(new URL('package.json', tokens), 'utf8')) as {
    readonly exports: Record<string, { readonly import?: string }>;
};
const themes = parseCss(readFileSync(new URL(tokenExports['./themes']?.import ?? '', tokens), 'utf8'));
const variablesOf = (selector: string) =>
    new Map(themes.rules.find(({ selectors }) => selectors.includes(selector))?.declarations ?? []);
const base = variablesOf('.base');
const rootDefaults = new Map(
    content.rules.find(({ selectors }) => selectors.includes(':where(.fondue-rte-content)'))?.declarations ?? [],
);

const REFERENCE = /^var\((--[\w-]+)\)$/;
/** The token value `variable`, of the content root or a Fondue token, resolves to in `theme`. */
const resolve = (variable: string, theme: Map<string, string>): string => {
    let value = rootDefaults.get(variable) ?? `var(${variable})`;
    let reference = REFERENCE.exec(value)?.[1];
    while (reference !== undefined) {
        value = theme.get(reference) ?? base.get(reference) ?? '';
        reference = REFERENCE.exec(value)?.[1];
    }
    return value;
};
const rgbaOf = (value: string): Rgba => {
    const [red = 0, green = 0, blue = 0, alpha = 1] = (value.match(/[\d.]+/g) ?? []).map(Number);
    return [red, green, blue, alpha];
};
const linear = (channel: number) => {
    const ratio = channel / 255;
    if (ratio <= 0.040_45) {
        return ratio / 12.92;
    }
    return ((ratio + 0.055) / 1.055) ** 2.4;
};
const luminance = ([red, green, blue]: Rgba) => 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
/** The WCAG ratio of `text` drawn at `opacity` over the opaque `background`. */
const contrast = (text: Rgba, opacity: number, background: Rgba) => {
    const alpha = text[3] * opacity;
    const blend = (over: number, under: number) => over * alpha + under * (1 - alpha);
    const shown: Rgba = [
        blend(text[0], background[0]),
        blend(text[1], background[1]),
        blend(text[2], background[2]),
        1,
    ];
    const lighter = Math.max(luminance(shown), luminance(background));
    const darker = Math.min(luminance(shown), luminance(background));
    return (lighter + 0.05) / (darker + 0.05);
};

describe('content contrast', () => {
    it('SPEC-rich-text-accessibility/AC-008 measures black on white at 21:1, #767676 at 4.54:1 and a lighter grey below 4.5:1', () => {
        const white: Rgba = [255, 255, 255, 1];

        expect(contrast([0, 0, 0, 1], 1, white)).toBeCloseTo(21, 5);
        expect(contrast([150, 150, 150, 1], 1, white)).toBeLessThan(4.5);
        // #767676 is the lightest grey that passes on white, at 4.54:1.
        expect(contrast([118, 118, 118, 1], 1, white)).toBeCloseTo(4.54, 2);
    });

    const pairs = [
        { text: '--rte-content-text-color', opacity: undefined },
        { text: '--rte-content-link-color', opacity: undefined },
        { text: '--rte-content-placeholder-color', opacity: '--rte-content-placeholder-opacity' },
    ];
    for (const theme of ['light', 'dark']) {
        for (const { text, opacity } of pairs) {
            it(`SPEC-rich-text-accessibility/AC-008 keeps ${text} on the surface background at 4.5:1 in the ${theme} theme`, () => {
                const variables = variablesOf(`.${theme}`);
                let shownOpacity = 1;
                if (opacity !== undefined) {
                    shownOpacity = Number(resolve(opacity, variables));
                }
                const background = rgbaOf(resolve('--rte-content-surface-background', variables));
                const color = resolve(text, variables);

                expect(color).toMatch(/^rgba?\(/);
                expect(background[3]).toBe(1);
                expect(contrast(rgbaOf(color), shownOpacity, background)).toBeGreaterThanOrEqual(4.5);
            });
        }
    }
});

/** `color` drawn over the opaque `background`, as its alpha blends it. */
const over = ([red, green, blue, alpha]: Rgba, [underRed, underGreen, underBlue]: Rgba): Rgba => {
    const blend = (top: number, under: number) => top * alpha + under * (1 - alpha);
    return [blend(red, underRed), blend(green, underGreen), blend(blue, underBlue), 1];
};
const toolbar = parseCss(
    compile(fileURLToPath(new URL('../src/ui/toolbar/styles/toolbar.module.scss', import.meta.url))).css,
);
/** The colour variable the toolbar rule `selector` sets `property` to; `currentcolor` reads the rule's `color`. */
const toolbarColor = (selector: string, property: string): string => {
    const rule = toolbar.rules.find(({ selectors }) => selectors.includes(selector));
    const value = rule?.declarations.find(([name]) => name === property)?.[1] ?? '';
    if (/\bcurrentcolor\b/.test(value)) {
        return toolbarColor('.item', 'color');
    }
    return /var\((--[\w-]+)\)/.exec(value)?.[1] ?? '';
};
const PRESSED = '.item[aria-pressed=true]';

describe('chrome contrast', () => {
    const TOOLBAR = { variable: toolbarColor('.root', 'background-color'), over: undefined };
    const SURFACE = { variable: '--rte-content-surface-background', over: undefined };
    const PRESSED_FILL = { variable: toolbarColor(PRESSED, 'background-color'), over: TOOLBAR.variable };
    const HOVER_FILL = { variable: toolbarColor('.item:hover', 'background-color'), over: TOOLBAR.variable };
    const surfaceBorder =
        /var\((--color-[\w-]+)\)/.exec(rootDefaults.get('--rte-content-surface-border') ?? '')?.[1] ?? '';
    // SPEC-rich-text-accessibility/AC-012 at 3:1 against the colour next to each, and AC-008 at 4.5:1 for chrome text.
    const pairs = [
        {
            id: 'AC-012',
            part: 'the toolbar focus outline',
            color: toolbarColor('.item:focus-visible', 'outline'),
            next: TOOLBAR,
            ratio: 3,
        },
        {
            id: 'AC-012',
            part: 'the surface focus outline',
            color: '--rte-content-focus-color',
            next: SURFACE,
            ratio: 3,
        },
        {
            id: 'AC-012',
            part: 'the pressed bar on its fill',
            color: toolbarColor(PRESSED, 'border-block-end'),
            next: PRESSED_FILL,
            ratio: 3,
        },
        {
            id: 'AC-012',
            part: 'the pressed bar on the toolbar',
            color: toolbarColor(PRESSED, 'border-block-end'),
            next: TOOLBAR,
            ratio: 3,
        },
        { id: 'AC-012', part: 'the surface border', color: surfaceBorder, next: SURFACE, ratio: 3 },
        { id: 'AC-008', part: 'a toolbar item', color: toolbarColor('.item', 'color'), next: TOOLBAR, ratio: 4.5 },
        {
            id: 'AC-008',
            part: 'a hovered toolbar item',
            color: toolbarColor('.item', 'color'),
            next: HOVER_FILL,
            ratio: 4.5,
        },
        {
            id: 'AC-008',
            part: 'a pressed toolbar item',
            color: toolbarColor('.item', 'color'),
            next: PRESSED_FILL,
            ratio: 4.5,
        },
    ];
    for (const theme of ['light', 'dark']) {
        for (const { id, part, color, next, ratio } of pairs) {
            it(`SPEC-rich-text-accessibility/${id} keeps ${part} at ${ratio}:1 in the ${theme} theme`, () => {
                const variables = variablesOf(`.${theme}`);
                const shade = (variable: string, under: string | undefined) => {
                    const own = rgbaOf(resolve(variable, variables));
                    if (under === undefined) {
                        return own;
                    }
                    return over(own, rgbaOf(resolve(under, variables)));
                };
                const background = shade(next.variable, next.over);

                expect([color, next.variable].every((variable) => resolve(variable, variables).startsWith('rgb'))).toBe(
                    true,
                );
                expect(background[3]).toBe(1);
                expect(contrast(rgbaOf(resolve(color, variables)), 1, background)).toBeGreaterThanOrEqual(ratio);
            });
        }
    }
});
