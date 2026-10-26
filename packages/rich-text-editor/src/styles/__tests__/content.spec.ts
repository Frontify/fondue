/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

import { KEYFRAMES_ALLOWLIST } from '../keyframes.allowlist';

const content = readFileSync(new URL('../content.css', import.meta.url), 'utf8');
const installed = readFileSync(
    createRequire(import.meta.url).resolve('prosemirror-gapcursor/style/gapcursor.css'),
    'utf8',
);

const installedView = readFileSync(
    createRequire(import.meta.url).resolve('prosemirror-view/style/prosemirror.css'),
    'utf8',
);

/** The stylesheet without comments, so a word in a comment never reads as a rule. */
const code = (css: string) => css.replaceAll(/\/\*[\s\S]*?\*\//g, '');

/** Each rule's selector and declarations, at any nesting depth. */
const rules = (css: string) =>
    [...code(css).matchAll(/([^{};]+)\{([^{}]*)\}/g)].map(([, selector = '', body = '']) => ({
        selector: selector.trim(),
        declarations: body
            .split(';')
            .map((declaration) => declaration.trim().replaceAll(/\s+/g, ' '))
            .filter((declaration) => declaration !== ''),
    }));

// The installed declarations as the package writes them: logical properties, and the text token for black.
const AS_WRITTEN: Readonly<Record<string, string>> = {
    'top: -2px': 'inset-block-start: -2px',
    'width: 20px': 'inline-size: 20px',
    'border-top: 1px solid black': 'border-block-start: 1px solid var(--rte-content-text-color)',
    'content: ""': "content: ''",
};

// The installed view declarations as the package writes them: the selected node colour token and logical offsets.
const VIEW_AS_WRITTEN: Readonly<Record<string, string>> = {
    'outline: 2px solid #8cf': 'outline: 2px solid var(--rte-content-selected-node-color)',
    'border: 2px solid #8cf': 'border: 2px solid var(--rte-content-selected-node-color)',
    'left: -32px': 'inset-inline-start: -32px',
    'right: -2px': 'inset-inline-end: -2px',
    'top: -2px': 'inset-block-start: -2px',
    'bottom: -2px': 'inset-block-end: -2px',
};
/** A selector without the surface scope, `:where` wrappers, quotes and pseudo-element colons, so both files compare. */
const unscoped = (selector: string) =>
    selector
        .replaceAll('.fondue-rte-content[data-rte-surface]', '.ProseMirror')
        .replaceAll('.fondue-rte-content', '.ProseMirror')
        .replaceAll(/:where\(|\)/g, '')
        .replaceAll(/^\.ProseMirror(?![-\w])\s*/g, '')
        .replaceAll("'", '')
        .replaceAll('::', ':')
        .replaceAll(/\s+/g, ' ')
        .trim();
const quotesAligned = (declaration: string) => declaration.replaceAll('"', "'");

describe('package content stylesheet', () => {
    it('puts every rule in the one fondue-rte cascade layer', () => {
        const stripped = code(content).trim();

        expect(stripped.startsWith('@layer fondue-rte {')).toBe(true);
        expect(stripped.endsWith('}')).toBe(true);
        expect(stripped.match(/@layer\b/g)).toHaveLength(1);
        // The layer's block closes only at the end, so no rule sits outside it.
        let depth = 0;
        let closedAt = -1;
        for (const [index, character] of [...stripped].entries()) {
            if (character === '{') {
                depth += 1;
            } else if (character === '}') {
                depth -= 1;
                if (depth === 0) {
                    closedAt = index;
                    break;
                }
            }
        }

        expect(closedAt).toBe(stripped.length - 1);
    });

    it('carries every gap cursor declaration of the installed prosemirror-gapcursor stylesheet, scoped to the surface', () => {
        const ours = rules(content).filter(({ selector }) => selector.includes('.ProseMirror-gapcursor'));
        const declared = new Set(ours.flatMap(({ declarations }) => declarations));
        const theirs = rules(installed)
            .filter(({ selector }) => selector.includes('.ProseMirror-gapcursor'))
            .flatMap(({ declarations }) => declarations)
            .filter((declaration) => !declaration.startsWith('animation'));

        expect(theirs.length > 0).toBe(true);
        expect(
            theirs.map((declaration) => AS_WRITTEN[declaration] ?? declaration).filter((d) => !declared.has(d)),
        ).toEqual([]);
        expect(ours.every(({ selector }) => selector.startsWith(':where(.fondue-rte-content[data-rte-surface]'))).toBe(
            true,
        );
    });

    it('carries every declaration of the installed prosemirror-view stylesheet, scoped to the surface, with tokens and logical offsets', () => {
        const ours = rules(content).map(({ selector, declarations }) => ({
            raw: selector,
            selector: unscoped(selector),
            declarations: declarations.map(quotesAligned),
        }));
        const missing = rules(installedView).flatMap(({ selector, declarations }) =>
            declarations
                .map((declaration) => quotesAligned(VIEW_AS_WRITTEN[declaration] ?? declaration))
                .filter(
                    (written) =>
                        !ours.some(
                            (rule) => rule.selector === unscoped(selector) && rule.declarations.includes(written),
                        ),
                )
                .map((written) => `${selector} { ${written} }`),
        );
        const fromView = new Set(rules(installedView).map(({ selector }) => unscoped(selector)));
        const matching = ours.filter(({ selector }) => fromView.has(selector));
        const written = matching.flatMap(({ declarations }) => declarations);

        expect(rules(installedView).length > 0).toBe(true);
        expect(matching.length > 0).toBe(true);
        expect(
            matching.filter(({ raw }) => !raw.startsWith(':where(.fondue-rte-content')).map(({ raw }) => raw),
        ).toEqual([]);
        expect(missing).toEqual([]);
        expect(written.filter((declaration) => /#[0-9a-f]{3,8}\b/i.test(declaration))).toEqual([]);
        expect(written.filter((declaration) => /^(left|right):/.test(declaration))).toEqual([]);
    });

    it('blinks the gap cursor only under prefers-reduced-motion: no-preference, with an allowed keyframes name', () => {
        const motion = /@media \(prefers-reduced-motion: no-preference\) \{([^{}]*\{[^{}]*\})\s*\}/g;
        const allowed = [...code(content).matchAll(motion)].map(([, inner = '']) => inner).join('');
        const animated = rules(content).filter(({ declarations }) =>
            declarations.some((declaration) => declaration.startsWith('animation')),
        );
        const keyframes = [...code(content).matchAll(/@keyframes ([\w-]+)/g)].map(([, name]) => name);

        expect(animated.length > 0).toBe(true);
        expect(animated.every(({ selector }) => allowed.includes(selector))).toBe(true);
        expect(keyframes.filter((name) => name === undefined || !KEYFRAMES_ALLOWLIST.includes(name))).toEqual([]);
    });

    it('writes no colour literal and no physical left or right offset in the gap cursor rules', () => {
        const declarations = rules(content)
            .filter(({ selector }) => selector.includes('.ProseMirror-gapcursor'))
            .flatMap(({ declarations: written }) => written);

        expect(declarations.filter((declaration) => /#[0-9a-f]{3,8}\b|\bblack\b|\bwhite\b/i.test(declaration))).toEqual(
            [],
        );
        expect(declarations.filter((declaration) => /^(left|right):/.test(declaration))).toEqual([]);
    });

    it('draws the editor column break with the border width token, never a pixel literal', () => {
        const breaks = rules(content).filter(({ selector }) => selector.includes('[data-rte-column-break]'));
        const borders = breaks
            .flatMap(({ declarations }) => declarations)
            .filter((declaration) => declaration.startsWith('border'));

        expect(borders).toContain('border-block-start: var(--border-width-default) dashed var(--color-line-strong)');
        expect(borders.filter((declaration) => /\dpx\b/.test(declaration))).toEqual([]);
    });

    it('draws a horizontal rule in the editor and the reader as one top border in the rule colour alias', () => {
        const aliases = rules(content).find(({ selector }) => selector === ':where(.fondue-rte-content)');
        const hr = rules(content).filter(({ selector }) => /\bhr\b/.test(selector));

        expect(aliases?.declarations).toContain('--rte-content-rule-color: var(--color-line-strong)');
        expect(hr).toEqual([
            {
                selector: ':where(.fondue-rte-content hr)',
                declarations: [
                    'margin-block: var(--rte-content-paragraph-spacing)',
                    'border: none',
                    'border-block-start: var(--border-width-default) solid var(--rte-content-rule-color)',
                ],
            },
        ]);
    });

    it('starts every emitted selector with :where(.fondue-rte-content, so a host rule wins without !important', () => {
        const unscopedRules = rules(content)
            .map(({ selector }) => selector.replaceAll(/\s+/g, ' ').replace(':where( ', ':where('))
            .filter(
                (selector) => !selector.startsWith(':where(.fondue-rte-content') && !/^(from|to|\d+%)$/.test(selector),
            );

        expect(unscopedRules).toEqual([]);
    });
});
