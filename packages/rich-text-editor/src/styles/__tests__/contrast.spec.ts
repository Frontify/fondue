/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

import { composite, contrastOf, parseColor } from '#/model';

import { insideAtRule, literalColorsIn, withoutVars } from '../../__tests__/css';

const packageRoot = fileURLToPath(new URL('../../..', import.meta.url)).replace(/\/$/, '');

type Rgba = NonNullable<ReturnType<typeof parseColor>>;

/** A background, laid over each surface it can sit on when it is translucent, or over the page when it names none. */
type Backdrop = { readonly background: string; readonly grounds: readonly string[] };

/** The foreground tokens of one box, each on each of its backdrops. */
type Group = {
    readonly where: string;
    readonly opacity: number;
    readonly foregrounds: ReadonlySet<string>;
    readonly backdrops: readonly Backdrop[];
};

/** A box a selector names in one stylesheet, with every token its rest and state rules set on it. */
type Element = {
    readonly where: string;
    readonly content: boolean;
    readonly chrome: boolean;
    texts: Set<string>;
    restBackgrounds: Set<string>;
    stateBackgrounds: Set<string>;
    borders: Set<string>;
    focusIndicators: Set<string>;
    pressed: boolean;
    selection: boolean;
    sized: boolean;
    control: boolean;
    opacity: number;
};

const stylesheetsOf = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === '__tests__') {
                return [];
            }
            return stylesheetsOf(full);
        }
        if (/\.s?css$/.test(entry.name) && !entry.name.startsWith('_')) {
            return [full];
        }
        return [];
    });

const STYLESHEETS = stylesheetsOf(join(packageRoot, 'src')).map((file) => {
    let css = readFileSync(file, 'utf8');
    if (file.endsWith('.scss')) {
        css = compile(file, { style: 'expanded' }).css;
    }
    return { file: relative(packageRoot, file), root: postcss.parse(css) };
});

// Forced colours and print set no token colours, and keyframes style no box.
const SKIPPED = /^keyframes|forced-colors|print/;

// Every definition of each `--rte-*` property the package sets, since a host-facing default may differ per root.
const CUSTOM = new Map<string, string[]>();
for (const { root } of STYLESHEETS) {
    root.walkDecls(/^--/, (declaration) => {
        if (!insideAtRule(declaration, SKIPPED)) {
            CUSTOM.set(declaration.prop, [...(CUSTOM.get(declaration.prop) ?? []), declaration.value]);
        }
    });
}

const COLOR_PROPERTY =
    /^(color|background|background-color|box-shadow|caret-color|accent-color|text-decoration-color|(border|outline)(-[a-z]+)*)$/;

/** Throws on a colour this test cannot read from tokens, such as a `color-mix()` it would read at full strength. */
const assertTokens = (value: string) => {
    if (literalColorsIn(value, false).length > 0 || /[\w-]+\(/.test(withoutVars(value))) {
        throw new Error(`"${value}" sets a colour that is not a var() chain of tokens`);
    }
};

/** Every colour token `value` names, through every definition of the package's own properties. */
const tokensOf = (value: string): string[] => {
    assertTokens(value);
    return [...value.matchAll(/var\((--[\w-]+)/g)].flatMap(([, name = '']) => {
        if (name.startsWith('--color-')) {
            return [name];
        }
        return (CUSTOM.get(name) ?? []).flatMap(tokensOf);
    });
};

const STATE =
    /:hover|:focus-visible|:focus-within|:focus\b|:active|:disabled|\[aria-(?:pressed|selected|disabled)=[^\]]*\]/g;

const FOCUS = /:focus-visible|:focus-within|:focus\b|ProseMirror-selectednode/;

const DISABLED = /:disabled|\[aria-disabled/;

const elementsOf = (): Element[] => {
    const elements = new Map<string, Element>();
    for (const { file, root } of STYLESHEETS) {
        root.walkRules((rule) => {
            if (insideAtRule(rule, SKIPPED)) {
                return;
            }
            for (const selector of rule.selectors) {
                const base = selector.replaceAll(STATE, '');
                const key = `${file} ${base}`;
                let element = elements.get(key);
                if (element === undefined) {
                    element = {
                        where: key,
                        content: selector.includes('fondue-rte-content'),
                        chrome: /\[data-rte-(node-)?chrome\]/.test(selector),
                        texts: new Set(),
                        restBackgrounds: new Set(),
                        stateBackgrounds: new Set(),
                        borders: new Set(),
                        focusIndicators: new Set(),
                        pressed: false,
                        selection: false,
                        sized: false,
                        control: false,
                        opacity: 1,
                    };
                    elements.set(key, element);
                }
                const isState = base !== selector;
                const focus = FOCUS.test(selector);
                const disabled = DISABLED.test(selector);
                for (const node of rule.nodes) {
                    if (node.type !== 'decl') {
                        continue;
                    }
                    const { prop: property, value } = node;
                    let tokens: string[] = [];
                    if (COLOR_PROPERTY.test(property)) {
                        tokens = tokensOf(value);
                    }
                    if (property === 'color' && !disabled) {
                        for (const token of tokens) {
                            element.texts.add(token);
                        }
                    }
                    if (property === 'background' || property === 'background-color') {
                        for (const token of tokens) {
                            if (isState) {
                                element.stateBackgrounds.add(token);
                            } else {
                                element.restBackgrounds.add(token);
                            }
                        }
                        element.selection ||= value.includes('--rte-content-selection-color');
                    }
                    const line = /^(border|outline)(-(block|inline)(-(start|end))?)?(-color)?$/.test(property);
                    if ((line || property === 'box-shadow') && focus) {
                        for (const token of tokens) {
                            element.focusIndicators.add(token);
                        }
                    } else if (line && selector.includes('aria-pressed') && /currentcolor/i.test(value)) {
                        element.pressed = true;
                    } else if (line && property.startsWith('border')) {
                        for (const token of tokens) {
                            element.borders.add(token);
                        }
                    }
                    element.sized ||= ['inline-size', 'block-size', 'width', 'height'].includes(property);
                    element.control ||= property === 'cursor' && value !== 'default';
                    if (property === 'opacity' && !disabled) {
                        // Only a generated box may fade, as the placeholder does, so no box's text fades with an ancestor.
                        if (!/::(before|after)/.test(selector)) {
                            throw new Error(`${selector} sets opacity on a box that may hold others`);
                        }
                        const name = /var\((--[\w-]+)/.exec(value)?.[1];
                        let values = [value];
                        if (name !== undefined) {
                            values = CUSTOM.get(name) ?? [];
                        }
                        element.opacity = Math.min(element.opacity, ...values.map(Number));
                    }
                }
            }
        });
    }
    return [...elements.values()];
};

const ELEMENTS = elementsOf();

const isSurface = (element: Element) =>
    // The selection fill shown while focus is in the chrome is a state, which the text contrast limits leave out.
    element.restBackgrounds.size > 0 && element.texts.size === 0 && !element.sized && !element.selection;

const SURFACES = ELEMENTS.filter(isSurface);

/** The surfaces a box can sit on: its layer's, and the content's too for chrome inside the content. */
const surfacesOf = (element: Element) =>
    SURFACES.filter(
        (surface) =>
            surface !== element && (surface.content === element.content || (element.chrome && surface.content)),
    );

const groundsOf = (element: Element) => [
    ...new Set(surfacesOf(element).flatMap((surface) => [...surface.restBackgrounds])),
];

const backdropsOf = (backgrounds: Iterable<string>, grounds: readonly string[]): Backdrop[] =>
    [...backgrounds].map((background) => ({ background, grounds }));

const TEXT_GROUPS = ELEMENTS.map((element): Group => {
    const grounds = groundsOf(element);
    let backdrops = backdropsOf([...element.restBackgrounds, ...element.stateBackgrounds], grounds);
    // A box that is see-through at rest shows the surfaces it sits on.
    if (element.restBackgrounds.size === 0) {
        const surfaces = surfacesOf(element).flatMap((surface) =>
            backdropsOf(surface.restBackgrounds, groundsOf(surface)),
        );
        backdrops = [...backdrops, ...surfaces];
    }
    return { where: element.where, opacity: element.opacity, foregrounds: element.texts, backdrops };
});

const NON_TEXT_GROUPS = ELEMENTS.flatMap((element) => {
    const grounds = groundsOf(element);
    const onSurfaces = backdropsOf(grounds, []);
    // A focus ring sits beside the box, on the surface around it.
    const groups: Group[] = [
        { where: `${element.where} focus`, opacity: 1, foregrounds: element.focusIndicators, backdrops: onSurfaces },
    ];
    // The pressed bar is in the box's text colour, on the pressed fill and on the surface below it.
    if (element.pressed) {
        const backdrops = [...backdropsOf(element.stateBackgrounds, grounds), ...onSurfaces];
        groups.push({ where: `${element.where} pressed`, opacity: 1, foregrounds: element.texts, backdrops });
    }
    // A control's border bounds its own fill, or the surface around it when it has none.
    if (element.control || (element.content && isSurface(element))) {
        let backdrops = backdropsOf(element.restBackgrounds, grounds);
        if (backdrops.length === 0) {
            backdrops = onSurfaces;
        }
        groups.push({ where: `${element.where} border`, opacity: 1, foregrounds: element.borders, backdrops });
    }
    return groups;
});

const THEMES = readFileSync(
    join(packageRoot, 'node_modules/@frontify/fondue-tokens/dist/themes/themes.module.css'),
    'utf8',
);

const blockOf = (name: string): Map<string, string> => {
    const found = new RegExp(`\\.${name} \\{([^}]*)\\}`).exec(THEMES)?.[1];
    const body = found ?? '';
    return new Map(
        [...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, property = '', value = '']) => [property, value]),
    );
};

const colorsOf = (theme: 'light' | 'dark') => {
    const values = new Map([...blockOf('base'), ...blockOf(theme)]);
    return (token: string): Rgba => {
        let value = values.get(token) ?? '';
        let reference = /^var\((--[\w-]+)\)$/.exec(value);
        while (reference !== null) {
            const referenced = values.get(reference[1] ?? '');
            value = referenced ?? '';
            reference = /^var\((--[\w-]+)\)$/.exec(value);
        }
        const color = parseColor(value);
        if (color === undefined) {
            throw new Error(`${token} has no colour value in the ${theme} theme`);
        }
        return color;
    };
};

/** The pairs below `minimum` in `theme`, each with its ratio. */
const belowOf = (groups: readonly Group[], theme: 'light' | 'dark', minimum: number): string[] => {
    const color = colorsOf(theme);
    const page = color('--color-surface-default');
    return groups.flatMap(({ where, opacity, foregrounds, backdrops }) =>
        [...foregrounds].flatMap((foreground) =>
            backdrops.flatMap(({ background, grounds }) => {
                let unders = grounds.map((ground) => composite(color(ground), page));
                if (unders.length === 0) {
                    unders = [page];
                }
                return unders.flatMap((under) => {
                    const behind = composite(color(background), under);
                    const ink = color(foreground);
                    const ratio = contrastOf(composite({ ...ink, alpha: ink.alpha * opacity }, behind), behind);
                    if (ratio >= minimum) {
                        return [];
                    }
                    return [`${foreground} on ${background}, ${where}: ${ratio.toFixed(2)}`];
                });
            }),
        ),
    );
};

const pairedIn = (groups: readonly Group[], ending: string) =>
    groups.some(
        ({ where, foregrounds, backdrops }) => where.endsWith(ending) && foregrounds.size * backdrops.length > 0,
    );

describe('token contrast of the package styles', () => {
    it('derives the pairs from the styles, the placeholder and the pressed bar included', () => {
        const placeholder = TEXT_GROUPS.find(({ where }) => where.includes('[data-placeholder]'));
        const shown = placeholder?.foregrounds;
        const foregrounds = shown ?? [];
        expect([...foregrounds]).toEqual(['--color-secondary-default']);
        expect(placeholder?.backdrops.map(({ background }) => background)).toContain('--color-surface-default');
        expect(pairedIn(NON_TEXT_GROUPS, 'pressed')).toBe(true);
        expect(pairedIn(NON_TEXT_GROUPS, 'focus')).toBe(true);
        expect(pairedIn(NON_TEXT_GROUPS, 'border')).toBe(true);
    });

    for (const theme of ['light', 'dark'] as const) {
        it(`gives every default text colour 4.5:1 on its backgrounds in the ${theme} theme`, () => {
            expect(belowOf(TEXT_GROUPS, theme, 4.5)).toEqual([]);
        });

        // The editor's table borders arrive with tables in 1.x.
        it(`gives focus indicators, pressed toggles and control borders 3:1 against adjacent colours in the ${theme} theme`, () => {
            expect(belowOf(NON_TEXT_GROUPS, theme, 3)).toEqual([]);
        });
    }
});
