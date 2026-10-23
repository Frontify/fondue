/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import fc from 'fast-check';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/features';
import { storedIn } from '#/features/__tests__/fixtures/documents';
import { fcSettings, seeded } from '#/features/__tests__/fixtures/generated';
import {
    type ContentNodeJSON,
    createEmptyDocument,
    decodeDocument,
    type JsonValue,
    type RichTextDocument,
} from '#/model';
import { canonicalize, type JsonNode, modelDocumentArb, TEXT_UNITS } from '#/model/__tests__/helpers/documents';
import { compiledModel } from '#/model/compile';
import { shipped as brandDocumentProfile } from '#/react/profiles/brand-document';
import { shipped as commentProfile } from '#/react/profiles/comment';
import { shipped as documentProfile } from '#/react/profiles/document';
import { shipped as inlineProfile } from '#/react/profiles/inline';

import { fromHTML } from '../index';

import { htmlArb, policyFaults, unsafeHtml, unsafeParts } from './helpers/hostile-html';

const { window } = new JSDOM('');
const domWindow = window as unknown as Window;
const settings = fcSettings(60);
const PROFILES = [
    ['inline', inlineModel, inlineProfile().definition],
    ['comment', commentModel, commentProfile().definition],
    ['document', documentModel, documentProfile().definition],
    ['brand-document', brandDocumentModel, brandDocumentProfile().definition],
] as const;

const canonical = (value: unknown) =>
    JSON.stringify(value, (key, item: unknown) => {
        if (key === 'nodeId') {
            return undefined;
        }
        return item;
    });

describe.each(PROFILES)(seeded('importing arbitrary HTML into the %s profile'), (_, model, definition) => {
    const codecs = createCodecs(model);

    it('never throws and returns a canonical document with no unsafe part, within the profile policy', () => {
        fc.assert(
            fc.property(fc.array(htmlArb, { maxLength: 4 }), fc.boolean(), (parts, withDefinition) => {
                const html = parts.join('');
                let options: Parameters<typeof fromHTML>[2] = { window: domWindow };
                if (withDefinition) {
                    options = { window: domWindow, definition };
                }
                const result = fromHTML(html, model, options);
                if (result.status !== 'editable') {
                    throw new Error(`fromHTML returned ${result.status} ${JSON.stringify(result.diagnostics)}`);
                }
                const { document } = result;
                const decoded = decodeDocument(document, model);
                expect(decoded).toMatchObject({ status: 'editable', diagnostics: [] });
                expect(unsafeParts(model, document.content)).toEqual([]);
                const output = codecs.toHTML(document);
                expect(unsafeHtml(output.html)).toEqual([]);
                if (withDefinition) {
                    expect(policyFaults(model, definition.authoring, document.content)).toEqual([]);
                }
            }),
            settings,
        );
    });
});

/** Text with no tab, newline or other control or format character, which HTML outside `pre` cannot keep. */
const flowText = fc.string({
    unit: fc.constantFrom(...TEXT_UNITS.filter((unit) => !/\p{C}/u.test(unit))),
    minLength: 1,
    maxLength: 6,
});

/**
 * The document with each U+00A0 right after a U+0020 replaced: AC-046 writes two spaces the same way, so paste reads
 * that U+00A0 as a space.
 */
const withHtmlSpaces = (stored: RichTextDocument): RichTextDocument => {
    const visit = (value: JsonValue): JsonValue => {
        const node = { ...(value as JsonNode) };
        if (node.content === undefined) {
            return node;
        }
        const children = (node.content as JsonNode[]).map((child) => visit(child) as JsonNode);
        if (node.type === 'code_block') {
            return { ...node, content: children };
        }
        let previous = '';
        const spaced = children.map((child) => {
            if (child.type !== 'text') {
                previous = '';
                return child;
            }
            let text = '';
            for (const char of child.text as string) {
                let kept = char;
                if (char === '\u00A0' && previous === ' ') {
                    kept = 'x';
                }
                text += kept;
                previous = kept;
            }
            return { ...child, text };
        });
        return { ...node, content: spaced };
    };
    const content = canonicalize(visit(stored.content as unknown as JsonValue)) as unknown as ContentNodeJSON;
    return { ...stored, content };
};

describe.each(PROFILES)(seeded('the HTML round trip of the %s profile'), (_, model) => {
    const codecs = createCodecs(model);
    const { features } = compiledModel(model);
    const lossless = new Set(
        features.filter(({ declaration }) => declaration.formats?.html !== 'lossy').map(({ id }) => id),
    );
    const literalColors = features.find(({ id }) => id === 'marks.font-color')?.options.literalColors === true;
    // Without `literalColors` paste drops a literal colour as removed formatting (DR-042).
    const attribute = (owner: string, name: string) => literalColors || owner !== 'font_color' || name !== 'value';
    const documents = modelDocumentArb(model, { feature: (id) => lossless.has(id), attribute, text: flowText }).map(
        withHtmlSpaces,
    );

    it('imports the toHTML output of a document of HTML-lossless features back to the same document, ignoring nodeIds', () => {
        fc.assert(
            fc.property(documents, (stored) => {
                const content = stored.content as unknown as JsonNode;
                const { html, diagnostics } = codecs.toHTML(stored);
                expect(diagnostics).toEqual([]);
                const result = fromHTML(html, model, { window: domWindow });
                expect(result.status).toBe('editable');
                const blocks = content.content as JsonNode[];
                // An empty document, one textblock with no content, writes the empty string (AC-050).
                if (blocks.length === 1 && blocks[0]?.content === undefined && html === '') {
                    expect(result).toMatchObject({ document: createEmptyDocument(model) });
                } else if (result.status === 'editable') {
                    // A paste inserts content and never sets the root's own `lang` and `dir`.
                    expect(canonical(result.document.content.content)).toBe(canonical(content.content));
                }
            }),
            settings,
        );
    });
});

describe('HTML round trip regressions', () => {
    it.each([
        ['language', { lang: 'en', dir: null }],
        ['font_color', { tokenId: 'brand.red', value: null }],
    ])('keeps the %s mark of a lone U+00A0 between two words', (type, attrs) => {
        const paragraph = {
            type: 'paragraph',
            attrs: { lang: null, align: null },
            content: [
                { type: 'text', text: 'a' },
                { type: 'text', text: '\u00A0', marks: [{ type, attrs }] },
                { type: 'text', text: 'b' },
            ],
        };
        const { html } = createCodecs(inlineModel).toHTML(storedIn(inlineModel, [paragraph as ContentNodeJSON]));

        const result = fromHTML(html, inlineModel, { window: domWindow });

        expect(result).toMatchObject({ status: 'editable', document: { content: { content: [paragraph] } } });
    });

    it('keeps the text of a refused link after a base element with an xlink:href, which makes jsdom matching throw', () => {
        const result = fromHTML('<base xlink:href=""><a href="javascript:alert(1)">x</a>', inlineModel, {
            window: domWindow,
        });

        expect(result).toMatchObject({
            status: 'editable',
            document: { content: { content: [{ type: 'paragraph', content: [{ type: 'text', text: 'x' }] }] } },
        });
    });
});
