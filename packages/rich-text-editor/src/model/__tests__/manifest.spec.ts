/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import Ajv2020 from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';

import { core } from '#/features/core/feature';
import {
    compileContentModel,
    defineFeature,
    DefinitionError,
    featureFromManifest,
    featureManifestSchema,
    type JsonValue,
} from '#/model';

type Manifest = Record<string, unknown>;

const parseJson = (text: string): unknown => JSON.parse(text);

/** The `acme.pull-quote` manifest. */
const pullQuote = (): Manifest =>
    JSON.parse(`{
        "id": "acme.pull-quote", "version": 1, "requires": [{ "id": "core", "version": 1 }],
        "nodes": {
            "acme_pull_quote": {
                "group": "block", "content": "inline*",
                "attrs": { "tone": { "type": "enum", "values": ["neutral", "brand"], "default": "neutral" } },
                "html": ["blockquote", { "class": "acme-pull-quote", "data-tone": { "attr": "tone" } }, 0],
                "parse": [{ "tag": "blockquote.acme-pull-quote", "attrs": { "tone": { "from": "data-tone" } } }]
            }
        },
        "formats": { "html": "lossless", "text": "lossy", "markdown": "unsupported" },
        "commands": { "acme.pull-quote.set": { "capability": "setBlock", "node": "acme_pull_quote", "toggle": true } },
        "keys": { "mac:Mod-Alt-q": "acme.pull-quote.set", "other:Ctrl-Shift-q": "acme.pull-quote.set" },
        "inputRules": [{ "id": "acme.pull-quote.marker", "kind": "line-start", "markers": [">>"], "command": "acme.pull-quote.set" }],
        "toolbar": [{ "kind": "toggle", "command": "acme.pull-quote.set", "label": { "en-US": "Pull quote" }, "icon": "IconSpeechBubbleQuote" }]
    }`) as Manifest;

const nodeOf = (manifest: Manifest) =>
    (manifest.nodes as Record<string, Record<string, unknown>>).acme_pull_quote as Record<string, unknown>;
const toolbarOf = (manifest: Manifest) => (manifest.toolbar as Record<string, unknown>[])[0] as Record<string, unknown>;
const withChange = (change: (manifest: Manifest) => void) => {
    const manifest = pullQuote();
    change(manifest);
    return manifest;
};
const compile = (manifest: unknown, options?: Readonly<Record<string, JsonValue>>) =>
    compileContentModel([core(), featureFromManifest(manifest)(options)], { id: 'acme.model', version: 1 });

const failureOf = (run: () => unknown) => {
    try {
        run();
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }
        throw error;
    }
    throw new Error('expected a DefinitionError');
};
const invalidAt = (path: string) => ({ code: 'definition.invalid-manifest', details: { path } });
const html = '/nodes/acme_pull_quote/html';

describe('featureFromManifest', () => {
    it('compiles the acme.pull-quote manifest like a code feature', () => {
        const model = compile(pullQuote());
        expect(model.manifest.nodes).toEqual(['doc', 'paragraph', 'text', 'hard_break', 'acme_pull_quote']);
        expect(model.manifest.commands).toEqual(['text.insert', 'history.undo', 'history.redo', 'acme.pull-quote.set']);
        expect(model.manifest.plugins).toEqual(['history', 'keymap:core', 'keymap:acme.pull-quote', 'input-rules']);
        expect(model.manifest.keys).toEqual([
            { key: 'Mod-z', command: 'history.undo', payload: null },
            { key: 'Mod-Shift-z', command: 'history.redo', payload: null },
            { key: 'mac:Mod-Alt-q', command: 'acme.pull-quote.set', payload: null },
            { key: 'other:Ctrl-Shift-q', command: 'acme.pull-quote.set', payload: null },
        ]);
        expect(featureManifestSchema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
    });

    const hostile: readonly (readonly [string, (manifest: Manifest) => void, string])[] = [
        ['a function', (manifest) => (nodeOf(manifest).html = () => 'x'), html],
        [
            'a regular expression',
            (manifest) => (((manifest.inputRules as Manifest[])[0] as Manifest).markers = [/>>/]),
            '/inputRules/0/markers/0',
        ],
        [
            'a component',
            (manifest) => (toolbarOf(manifest).icon = { $$typeof: Symbol.for('react.element'), type: 'svg' }),
            '/toolbar/0/icon/$$typeof',
        ],
        [
            'CSS text',
            (manifest) => (nodeOf(manifest).html = ['blockquote', { style: 'color: red' }, 0]),
            `${html}/1/style`,
        ],
        [
            'a __proto__ label key',
            (manifest) => (toolbarOf(manifest).label = parseJson('{ "en-US": "Quote", "__proto__": { "x": 1 } }')),
            '/toolbar/0/label/__proto__',
        ],
        [
            'a constructor key',
            (manifest) =>
                (nodeOf(manifest).attrs = parseJson('{ "constructor": { "type": "string", "default": "" } }')),
            '/nodes/acme_pull_quote/attrs/constructor',
        ],
        [
            'a prototype key',
            (manifest) => (manifest.options = parseJson('{ "prototype": { "type": "string", "default": "" } }')),
            '/options/prototype',
        ],
        ['a base tag', (manifest) => (nodeOf(manifest).html = ['base', { href: { attr: 'tone' } }]), `${html}/0`],
        ['a meta tag', (manifest) => (nodeOf(manifest).html = ['meta', { 'data-x': 'y' }]), `${html}/0`],
        ['an iframe tag', (manifest) => (nodeOf(manifest).html = ['div', ['iframe', 0]]), `${html}/1/0`],
        [
            'a bound style attribute',
            (manifest) => (nodeOf(manifest).html = ['blockquote', { style: { attr: 'tone' } }, 0]),
            `${html}/1/style`,
        ],
        [
            'a bound class attribute',
            (manifest) => (nodeOf(manifest).html = ['blockquote', { class: { attr: 'tone' } }, 0]),
            `${html}/1/class`,
        ],
        [
            'an id attribute',
            (manifest) => (nodeOf(manifest).html = ['blockquote', { id: { attr: 'tone' } }, 0]),
            `${html}/1/id`,
        ],
        [
            'an onclick attribute',
            (manifest) => (nodeOf(manifest).html = ['blockquote', { onclick: 'alert(1)' }, 0]),
            `${html}/1/onclick`,
        ],
        [
            'a parse rule for a script tag',
            (manifest) => (nodeOf(manifest).parse = [{ tag: 'script' }]),
            '/nodes/acme_pull_quote/parse/0/tag',
        ],
        [
            'a shared attribute written as CSS',
            (manifest) =>
                (manifest.attributes = {
                    acme_tone: { on: ['paragraph'], value: { type: 'string', default: '' }, html: { style: 'color' } },
                }),
            '/attributes/acme_tone/html',
        ],
        ...(['html', 'parse'] as const).map(
            (key) =>
                [
                    `a shared attribute ${key} binding of class`,
                    (manifest: Manifest) =>
                        (manifest.attributes = {
                            acme_tone: {
                                on: 'textblocks',
                                value: { type: 'string', default: '' },
                                [key]: { attr: 'class' },
                            },
                        }),
                    `/attributes/acme_tone/${key}`,
                ] as const,
        ),
        [
            'a shared attribute binding with both attr and style',
            (manifest) =>
                (manifest.attributes = {
                    acme_tone: {
                        on: ['paragraph'],
                        value: { type: 'string', default: '' },
                        html: { attr: 'data-tone', style: 'color' },
                    },
                }),
            '/attributes/acme_tone/html',
        ],
        [
            'a label with no en-US entry',
            (manifest) => (toolbarOf(manifest).label = { de: 'Zitat' }),
            '/toolbar/0/label/en-US',
        ],
        [
            'an icon that is no Fondue icon',
            (manifest) => (toolbarOf(manifest).icon = '<svg onload="alert(1)">'),
            '/toolbar/0/icon',
        ],
        [
            'a capability the package does not accept',
            (manifest) =>
                ((manifest.commands as Record<string, Manifest>)['acme.pull-quote.set'] = { capability: 'eval' }),
            '/commands/acme.pull-quote.set/capability',
        ],
        ['a member outside the schema', (manifest) => (manifest.script = 'alert(1)'), '/script'],
        ['a feature ID without a vendor', (manifest) => (manifest.id = 'pull-quote'), '/id'],
        ['a feature ID with a shipped namespace', (manifest) => (manifest.id = 'marks.pull-quote'), '/id'],
        [
            'a node without the vendor prefix',
            (manifest) => (manifest.nodes = { pull_quote: nodeOf(manifest) }),
            '/nodes/pull_quote',
        ],
        [
            'a command without the vendor prefix',
            (manifest) => (manifest.commands = { 'other.set': { capability: 'setBlock', node: 'acme_pull_quote' } }),
            '/commands/other.set',
        ],
        [
            'a list option without items',
            (manifest) => (manifest.options = { sizes: { type: 'list', default: [1] } }),
            '/options/sizes/items',
        ],
        [
            'an enum option without values',
            (manifest) => (manifest.options = { tone: { type: 'enum', default: 'a' } }),
            '/options/tone/values',
        ],
        ['a menu without items', (manifest) => (toolbarOf(manifest).kind = 'menu'), '/toolbar/0/items'],
        [
            'a line-start rule without markers',
            (manifest) => delete ((manifest.inputRules as Manifest[])[0] as Manifest).markers,
            '/inputRules/0/markers',
        ],
        [
            'a line-start rule without a command',
            (manifest) => delete ((manifest.inputRules as Manifest[])[0] as Manifest).command,
            '/inputRules/0/command',
        ],
        ...['p, iframe', 'div iframe', '*', '[onclick]', 'blockquote[onclick]'].map(
            (tag) =>
                [
                    `the parse selector ${tag}`,
                    (manifest: Manifest) => (nodeOf(manifest).parse = [{ tag }]),
                    '/nodes/acme_pull_quote/parse/0/tag',
                ] as const,
        ),
        [
            'a parse rule without a tag or style',
            (manifest) => (nodeOf(manifest).parse = [{ attrs: {} }]),
            '/nodes/acme_pull_quote/parse/0',
        ],
        [
            'attributes after a content hole',
            (manifest) => (nodeOf(manifest).html = ['blockquote', 0, { onclick: 'x' }]),
            `${html}/2`,
        ],
        ['content after content', (manifest) => (nodeOf(manifest).html = ['blockquote', ['span', 0], 0]), html],
        [
            'html nested 5000 levels deep',
            (manifest) => {
                let spec: unknown = 0;
                for (let depth = 0; depth < 5000; depth += 1) {
                    spec = ['div', spec];
                }
                nodeOf(manifest).html = spec;
            },
            `${html}${'/1'.repeat(62)}`,
        ],
        [
            'markdown that sets both a prefix and a fence',
            (manifest) => (nodeOf(manifest).markdown = { prefix: '> ', fence: '```' }),
            '/nodes/acme_pull_quote/markdown',
        ],
        [
            'markdown that sets neither a prefix nor a fence',
            (manifest) => (nodeOf(manifest).markdown = {}),
            '/nodes/acme_pull_quote/markdown',
        ],
        [
            'a markdown prefix longer than four characters',
            (manifest) => (nodeOf(manifest).markdown = { prefix: '#####' }),
            '/nodes/acme_pull_quote/markdown/prefix',
        ],
        [
            'a markdown prefix containing <',
            (manifest) => (nodeOf(manifest).markdown = { prefix: '<' }),
            '/nodes/acme_pull_quote/markdown/prefix',
        ],
        [
            'a markdown fence that starts with three tildes',
            (manifest) => (nodeOf(manifest).markdown = { fence: '~~~#' }),
            '/nodes/acme_pull_quote/markdown/fence',
        ],
        [
            'a markdown opening delimiter containing <',
            (manifest) =>
                (manifest.marks = {
                    acme_note: {
                        attrs: {},
                        html: ['em', 0],
                        parse: [{ tag: 'em' }],
                        markdown: { open: '<', close: '~~' },
                    },
                }),
            '/marks/acme_note/markdown/open',
        ],
    ];
    it.each(hostile)('rejects %s with its JSON Pointer', (_kind, change, path) => {
        expect(failureOf(() => featureFromManifest(withChange(change)))).toEqual(invalidAt(path));
    });

    it('accepts a block prefix, a code fence and mark delimiters', () => {
        const prefixed = withChange((manifest) => {
            nodeOf(manifest).markdown = { prefix: '> ' };
        });
        const fenced = withChange((manifest) => {
            nodeOf(manifest).markdown = { fence: '```' };
        });
        const marked = withChange((manifest) => {
            manifest.marks = {
                acme_note: {
                    attrs: {},
                    html: ['em', 0],
                    parse: [{ tag: 'em' }],
                    markdown: { open: '~~', close: '~~' },
                },
            };
        });
        expect(compile(prefixed).manifest.nodes).toContain('acme_pull_quote');
        expect(compile(fenced).manifest.nodes).toContain('acme_pull_quote');
        expect(compile(marked).manifest.marks).toContain('acme_note');
    });

    it('rejects a function, a regular expression or a prototype key in option values', () => {
        const withOption = withChange(
            (manifest) => (manifest.options = { tone: { type: 'json', nullable: true, default: null } }),
        );
        for (const [value, path] of [
            [() => 1, '/options/tone'],
            [/x/, '/options/tone'],
            [JSON.parse('{ "constructor": 1 }'), '/options/tone/constructor'],
        ] as const) {
            const run = () => compile(withOption, { tone: value as unknown as JsonValue });
            expect(failureOf(run)).toEqual({
                code: 'definition.invalid-manifest',
                details: { feature: 'acme.pull-quote', path },
            });
        }
    });

    it('rejects a binding of the attribute constructor on a node without it', () => {
        const manifest = withChange(
            (value) => (nodeOf(value).html = ['blockquote', { 'data-x': { attr: 'constructor' } }, 0]),
        );
        expect(failureOf(() => compile(manifest))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'acme.pull-quote', path: `${html}/1/data-x` },
        });
    });

    it('rejects a manifest that binds href to a string attribute', () => {
        const manifest = withChange((value) => {
            nodeOf(value).attrs = { label: { type: 'string', default: '' } };
            nodeOf(value).html = ['a', { href: { attr: 'label' } }, 0];
        });
        expect(failureOf(() => compile(manifest))).toEqual({
            code: 'definition.unsafe-url-binding',
            details: { feature: 'acme.pull-quote', path: `${html}/1/href` },
        });
    });

    it('rejects a wrong option type passed to a manifest feature', () => {
        const manifest = withChange((value) => (value.options = { size: { type: 'integer', default: 1 } }));
        expect(compile(manifest, { size: 2 }).manifest.features).toContainEqual({
            id: 'acme.pull-quote',
            version: 1,
            options: { size: 2 },
        });
        expect(failureOf(() => compile(manifest, { size: 'big' }))).toEqual({
            code: 'definition.invalid-option',
            details: { feature: 'acme.pull-quote', path: '/options/size' },
        });
    });

    it('rejects a javascript: URL in an insertNode attribute, a url default and a parse literal', () => {
        const card = (href: string, insert: string, parsed = '/z') =>
            withChange((manifest) => {
                manifest.nodes = {
                    acme_card: {
                        group: 'block',
                        attrs: { href: { type: 'url', default: href } },
                        html: ['a', { href: { attr: 'href' } }],
                        parse: [{ tag: 'a', attrs: { href: { value: parsed } } }],
                    },
                };
                manifest.commands = {
                    'acme.card.insert': { capability: 'insertNode', node: 'acme_card', attrs: { href: insert } },
                };
                manifest.keys = {};
                manifest.inputRules = [];
                manifest.toolbar = [];
            });
        expect(compile(card('/x', '/y')).manifest.commands).toEqual([
            'text.insert',
            'history.undo',
            'history.redo',
            'acme.card.insert',
        ]);
        expect(failureOf(() => compile(card('/x', 'javascript:alert(1)')))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'acme.pull-quote', path: '/commands/acme.card.insert/attrs/href' },
        });
        expect(failureOf(() => compile(card('javascript:alert(1)', '/y')))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'acme.pull-quote', path: '/nodes/acme_card/attrs/href/default' },
        });
        expect(failureOf(() => compile(card('/x', '/y', 'javascript:alert(1)')))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'acme.pull-quote', path: '/nodes/acme_card/parse/0/attrs/href/value' },
        });
    });

    it.each([
        ['prefix', '<b>', '/nodes/acme_pull_quote/markdown/prefix'],
        ['prefix', '[x](', '/nodes/acme_pull_quote/markdown/prefix'],
        ['prefix', '\\', '/nodes/acme_pull_quote/markdown/prefix'],
        ['open', '&lt;', '/marks/acme_glow/markdown/open'],
        ['close', ')', '/marks/acme_glow/markdown/close'],
        ['open', 'ab', '/marks/acme_glow/markdown/open'],
    ])('rejects the Markdown %s form %j, which could open HTML or a link', (form, value, path) => {
        const manifest = withChange((changed) => {
            nodeOf(changed).markdown = { prefix: '> ' };
            changed.marks = {
                acme_glow: { attrs: {}, html: ['mark', 0], parse: [], markdown: { open: '==', close: '==' } },
            };
            if (form === 'prefix') {
                nodeOf(changed).markdown = { prefix: value };
            } else {
                const marks = changed.marks as Record<string, Record<string, Record<string, string>>>;
                (marks.acme_glow as Record<string, Record<string, string>>).markdown = {
                    open: '==',
                    close: '==',
                    [form]: value,
                };
            }
        });

        expect(failureOf(() => compile(manifest))).toEqual(invalidAt(path));
    });

    const withFence = (markdown: Readonly<Record<string, string>>) =>
        withChange((changed) => {
            nodeOf(changed).markdown = markdown;
        });

    it.each(['~~~ ', '``` ', '$$ ', '`', '``', '```~', '~~~$', '$`$'])(
        'rejects the fence form %j, which would open a code fence or span that the body cannot read back from',
        (fence) => {
            expect(failureOf(() => compile(withFence({ fence })))).toEqual(
                invalidAt('/nodes/acme_pull_quote/markdown/fence'),
            );
        },
    );

    it.each([{}, { prefix: '> ', fence: '$$' }])(
        'rejects the node Markdown form %j, which needs exactly one of prefix or fence',
        (markdown) => {
            expect(failureOf(() => compile(withFence(markdown)))).toEqual(invalidAt('/nodes/acme_pull_quote/markdown'));
        },
    );

    it.each(['```', '````', '~~~', '~~~~', '$$', '~~'])('accepts the fence form %j', (fence) => {
        expect(() => compile(withFence({ fence }))).not.toThrow();
    });

    it('makes the published schema reject every Markdown form that featureFromManifest rejects, and accept the rest', () => {
        const validate = new Ajv2020({ strict: false }).compile(featureManifestSchema);
        const nodeForms = [
            ...['~~~ ', '``` ', '$$ ', '`', '``', '```~', '~~~$', '$`$', '```', '~~~~', '$$'].map((fence) => ({
                fence,
            })),
            ...['<b>', '[x](', '\\', '> ', '>'].map((prefix) => ({ prefix })),
            {},
            { prefix: '> ', fence: '$$' },
        ];
        const markForms = [
            { open: '&lt;', close: '==' },
            { open: '==', close: ')' },
            { open: 'ab', close: '==' },
            { open: '==', close: '==' },
        ];
        const manifests = [
            ...nodeForms.map(withFence),
            ...markForms.map((markdown) =>
                withChange((changed) => {
                    changed.marks = { acme_glow: { attrs: {}, html: ['mark', 0], parse: [], markdown } };
                }),
            ),
        ];

        for (const manifest of manifests) {
            let accepted = true;
            try {
                compile(manifest);
            } catch {
                accepted = false;
            }
            expect(validate(manifest), JSON.stringify(manifest.nodes ?? manifest.marks)).toBe(accepted);
        }
    });

    it('accepts Markdown punctuation forms in a manifest', () => {
        const manifest = withChange((changed) => {
            nodeOf(changed).markdown = { prefix: '> ' };
            changed.marks = {
                acme_glow: { attrs: {}, html: ['mark', 0], parse: [], markdown: { open: '==', close: '==' } },
            };
        });

        expect(() => compile(manifest)).not.toThrow();
    });

    it.each([
        [
            {
                marks: {
                    code_glow: { attrs: {}, html: ['mark', 0], parse: [], markdown: { open: '<b>', close: '==' } },
                },
            },
            '/marks/code_glow/markdown/open',
        ],
        [
            {
                nodes: {
                    code_box: {
                        group: 'block',
                        content: 'inline*',
                        attrs: {},
                        html: ['div', 0],
                        parse: [],
                        markdown: { fence: '~~~ ' },
                    },
                },
            },
            '/nodes/code_box/markdown/fence',
        ],
        [
            {
                nodes: {
                    code_box: {
                        group: 'block',
                        content: 'inline*',
                        attrs: {},
                        html: ['div', 0],
                        parse: [],
                        markdown: {},
                    },
                },
            },
            '/nodes/code_box/markdown',
        ],
    ])('applies the same form rule to a code feature: %j fails at %s', (members, path) => {
        const codeFeature = defineFeature({
            id: 'acme.code',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            ...members,
        } as never);

        expect(failureOf(() => compileContentModel([core(), codeFeature()], { id: 'acme.model', version: 1 }))).toEqual(
            {
                code: 'definition.invalid-declaration',
                details: { feature: 'acme.code', path },
            },
        );
    });

    it('compiles a code feature whose forms pass the form rule', () => {
        const codeFeature = defineFeature({
            id: 'acme.code',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                code_box: {
                    group: 'block',
                    content: 'inline*',
                    attrs: {},
                    html: ['div', 0],
                    parse: [],
                    markdown: { fence: '~~~' },
                },
            },
            marks: { code_glow: { attrs: {}, html: ['mark', 0], parse: [], markdown: { open: '==', close: '==' } } },
        });

        expect(() => compileContentModel([core(), codeFeature()], { id: 'acme.model', version: 1 })).not.toThrow();
    });
});
