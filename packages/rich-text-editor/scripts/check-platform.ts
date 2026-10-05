/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

type JsDetector = {
    readonly identifiers?: readonly string[];
    readonly members?: readonly string[];
    readonly attributes?: readonly string[];
    readonly qualified?: readonly string[];
    readonly strings?: RegExp;
    readonly iteratorHelpers?: boolean;
    readonly topLevelAwait?: boolean;
};
type Detector = {
    readonly js?: JsDetector;
    readonly css?: RegExp;
    readonly nesting?: boolean;
    readonly unprefixed?: string;
};
type Finding = { readonly feature: string; readonly line: number };

// One detector per floor-missing row of PLATFORM.md.
export const DETECTORS: Record<string, Detector> = {
    'composed-ranges': { js: { members: ['getComposedRanges'] } },
    'edit-context': { js: { identifiers: ['EditContext'] } },
    'clipboard-custom-format': { js: { strings: /^web / } },
    sanitizer: { js: { identifiers: ['Sanitizer'], members: ['setHTML', 'setHTMLUnsafe'] } },
    'trusted-types': { js: { identifiers: ['trustedTypes'] } },
    popover: {
        js: { members: ['showPopover', 'hidePopover', 'togglePopover'], attributes: ['popover', 'popoverTarget'] },
        css: /:popover-open/,
    },
    'anchor-positioning': {
        css: /\b(anchor-name|position-anchor|position-area|position-try(-fallbacks)?)\s*:|\banchor\(/,
    },
    'invoker-commands': { js: { members: ['commandForElement'], attributes: ['commandfor', 'commandFor'] } },
    requestidlecallback: { js: { identifiers: ['requestIdleCallback', 'cancelIdleCallback'] } },
    'abortsignal-any': { js: { qualified: ['AbortSignal.any'] } },
    'abortsignal-timeout': { js: { qualified: ['AbortSignal.timeout'] } },
    'array-by-copy': { js: { members: ['toSorted', 'toReversed', 'toSpliced', 'with'] } },
    'array-group': { js: { qualified: ['Object.groupBy', 'Map.groupBy'] } },
    'set-methods': {
        js: {
            members: [
                'union',
                'intersection',
                'difference',
                'symmetricDifference',
                'isSubsetOf',
                'isSupersetOf',
                'isDisjointFrom',
            ],
        },
    },
    'iterator-methods': { js: { qualified: ['Iterator.from', 'Iterator.prototype'], iteratorHelpers: true } },
    'promise-withresolvers': { js: { qualified: ['Promise.withResolvers'] } },
    'url-canparse': { js: { qualified: ['URL.canParse'] } },
    urlpattern: { js: { identifiers: ['URLPattern'] } },
    nesting: { nesting: true },
    'color-mix': { css: /\bcolor-mix\(/ },
    'light-dark': { css: /\blight-dark\(/ },
    'content-visibility': { css: /\bcontent-visibility\s*:/ },
    'field-sizing': { css: /\bfield-sizing\s*:/ },
    'text-wrap-pretty': { css: /\btext-wrap(-style)?\s*:\s*pretty\b/ },
    'user-select': { unprefixed: 'user-select' },
    'top-level-await': { js: { topLevelAwait: true } },
    'string-wellformed': { js: { members: ['isWellFormed', 'toWellFormed'] } },
    webcodecs: { js: { identifiers: ['ImageDecoder'] } },
};

// Floor-missing APIs used only inside their fallback helper, as built paths under `dist`.
export const GUARDED_HELPERS: Record<string, readonly string[]> = {
    requestidlecallback: ['runtime/environment.js'],
    'string-wellformed': [],
    webcodecs: [],
};

const ITERATOR_SOURCES = new Set(['entries', 'keys', 'values', 'matchAll']);
const ITERATOR_HELPERS = new Set([
    'drop',
    'every',
    'filter',
    'find',
    'flatMap',
    'forEach',
    'map',
    'reduce',
    'some',
    'take',
    'toArray',
]);

/** Feature IDs that PLATFORM.md marks as missing at the browser floor. */
export const floorMissingFeatures = (platform: string): string[] =>
    platform
        .split('\n')
        .map((line) => /^\| `([a-z0-9-]+)` .*\| no\b[^|]*\|$/.exec(line))
        .flatMap((match) => (match?.[1] === undefined ? [] : [match[1]]));

const isInsideFunction = (node: ts.Node) => {
    for (let current = node.parent; current !== undefined; current = current.parent) {
        if (ts.isFunctionLike(current) || ts.isClassStaticBlockDeclaration(current)) {
            return true;
        }
    }
    return false;
};

const isPropertyName = (node: ts.Identifier) => {
    const { parent } = node;
    return (
        (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
        (ts.isPropertyAssignment(parent) && parent.name === node) ||
        ts.isMethodDeclaration(parent) ||
        ts.isPropertyDeclaration(parent)
    );
};

const memberName = (node: ts.Node) => (ts.isPropertyAccessExpression(node) ? node.name.text : undefined);

// Compiled JSX passes attributes as object keys.
const attributeName = (node: ts.Node) =>
    ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name))
        ? node.name.text
        : undefined;

const scanJs = (path: string, source: string): Finding[] => {
    const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const findings: Finding[] = [];
    const report = (feature: string, node: ts.Node) =>
        findings.push({ feature, line: file.getLineAndCharacterOfPosition(node.getStart()).line + 1 });

    const visit = (node: ts.Node): void => {
        const member = memberName(node);
        const attribute = attributeName(node);
        for (const [feature, { js }] of Object.entries(DETECTORS)) {
            if (js === undefined) {
                continue;
            }
            if (ts.isIdentifier(node) && !isPropertyName(node) && js.identifiers?.includes(node.text)) {
                report(feature, node);
            }
            if (member !== undefined && js.members?.includes(member)) {
                report(feature, node);
            }
            if (attribute !== undefined && js.attributes?.includes(attribute)) {
                report(feature, node);
            }
            if (ts.isPropertyAccessExpression(node) && js.qualified?.includes(node.getText().replaceAll(/\s/g, ''))) {
                report(feature, node);
            }
            if (ts.isStringLiteralLike(node) && js.strings?.test(node.text)) {
                report(feature, node);
            }
            const isAwait =
                ts.isAwaitExpression(node) || (ts.isForOfStatement(node) && node.awaitModifier !== undefined);
            if (js.topLevelAwait && isAwait && !isInsideFunction(node)) {
                report(feature, node);
            }
            const helperOnIterator =
                ts.isPropertyAccessExpression(node) &&
                ITERATOR_HELPERS.has(node.name.text) &&
                ts.isCallExpression(node.expression) &&
                ITERATOR_SOURCES.has(memberName(node.expression.expression) ?? '');
            if (js.iteratorHelpers && helperOnIterator) {
                report(feature, node);
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(file);
    return findings;
};

const scanCss = (source: string): Finding[] => {
    const css = source.replaceAll(/\/\*[\s\S]*?\*\//g, (comment) => comment.replaceAll(/[^\n]/g, ' '));
    const lineAt = (index: number) => css.slice(0, index).split('\n').length;
    const findings: Finding[] = [];

    for (const [feature, { css: pattern }] of Object.entries(DETECTORS)) {
        if (pattern === undefined) {
            continue;
        }
        for (const match of css.matchAll(new RegExp(pattern.source, 'g'))) {
            findings.push({ feature, line: lineAt(match.index) });
        }
    }

    // A style rule inside a style rule is native nesting; at-rules may hold rules.
    const blocks: { readonly isStyleRule: boolean; readonly body: number }[] = [];
    let preludeStart = 0;
    for (let index = 0; index < css.length; index += 1) {
        const character = css[index];
        if (character === '{') {
            const prelude = css.slice(preludeStart, index).trim();
            const parent = blocks.at(-1);
            if (parent?.isStyleRule && !prelude.startsWith('@')) {
                findings.push({ feature: 'nesting', line: lineAt(index) });
            }
            blocks.push({
                isStyleRule: !prelude.startsWith('@') && !/^(from|to|[\d.]+%)/.test(prelude),
                body: index + 1,
            });
            preludeStart = index + 1;
        } else if (character === '}') {
            const block = blocks.pop();
            if (
                block?.isStyleRule &&
                /(^|[;{\s])user-select\s*:/.test(css.slice(block.body, index)) &&
                !/-webkit-user-select\s*:/.test(css.slice(block.body, index))
            ) {
                findings.push({ feature: 'user-select', line: lineAt(block.body) });
            }
            preludeStart = index + 1;
        } else if (character === ';') {
            preludeStart = index + 1;
        }
    }
    return findings;
};

/** Reports each floor-missing feature that the built file at `path` (relative to `dist`) uses outside its guarded helper. */
export const scanFile = (path: string, source: string): string[] => {
    const findings = path.endsWith('.css') ? scanCss(source) : scanJs(path, source);
    return findings
        .filter(({ feature }) => !(GUARDED_HELPERS[feature] ?? []).includes(path))
        .map(({ feature, line }) => `${path}:${line} uses ${feature}`);
};

export const checkPlatform = async (distDirectory: string, platform: string): Promise<string[]> => {
    const undetected = floorMissingFeatures(platform)
        .filter((feature) => DETECTORS[feature] === undefined)
        .map(
            (feature) =>
                `PLATFORM.md marks ${feature} as missing at the floor and check-platform has no detector for it`,
        );
    const files = globSync('**/*.{js,css}', { cwd: distDirectory });
    if (files.length === 0) {
        return [...undetected, `${distDirectory} holds no built file; run the build first`];
    }
    const results = await Promise.all(
        files.sort().map(async (file) => scanFile(file, await readFile(join(distDirectory, file), 'utf8'))),
    );
    return [...undetected, ...results.flat()];
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const packageRoot = fileURLToPath(new URL('..', import.meta.url));
    const violations = await checkPlatform(
        join(packageRoot, 'dist'),
        await readFile(join(packageRoot, 'PLATFORM.md'), 'utf8'),
    );
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log('check-platform: dist uses no feature missing at the browser floor outside its fallback.');
}
