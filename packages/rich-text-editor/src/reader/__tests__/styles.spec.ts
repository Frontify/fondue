/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { createElement, Fragment } from 'react';
import { describe, expect, it } from 'vitest';

import { compileContentModel, type Diagnostic, resolveStyle } from '#/model';
import { fixtureHighlight } from '#/plugins/__tests__/fixtures/highlight';
import {
    COLOR_TOKENS,
    linked,
    marked,
    plain,
    STYLE_MAP,
    styled,
    styledDocument,
    styledHeading,
    styleModel,
} from '#/plugins/__tests__/fixtures/styles';
import { brandStyles } from '#/plugins/BrandStyles/feature';
import { core } from '#/plugins/Core/feature';
import { fontColor } from '#/plugins/FontColor/feature';
import { heading } from '#/plugins/Heading/feature';
import { links } from '#/plugins/Link/feature';
import { quote } from '#/plugins/Quote/feature';

import { defineReaderFeature } from '../define';

import { renderReader } from './helpers/helpers';

const model = styleModel();
const presentation = { styles: STYLE_MAP, colorTokens: COLOR_TOKENS };
const classOf = (id: string | null, type = 'paragraph') => resolveStyle(STYLE_MAP, type, id).style?.className;

describe('the reader with brand styles', () => {
    it('applies the recipe of a known style ID and the default look for a deprecated or unknown one, keeping data-rte-style', () => {
        const document = styledDocument(model, [
            styled('brand.lead', plain('Known')),
            styled('brand.legacy', plain('Deprecated')),
            styled('brand.unknown', plain('Unknown')),
        ]);

        const html = renderReader(document, model, { presentation });

        expect(html).toContain(`<p data-rte-style="brand.lead" dir="auto" class="${classOf('brand.lead')}">Known</p>`);
        expect(html).toContain('<p data-rte-style="brand.legacy" dir="auto">Deprecated</p>');
        expect(html).toContain('<p data-rte-style="brand.unknown" dir="auto">Unknown</p>');
    });

    it('reports one styles.unknown-style warning per style ID and render, and renders with no onDiagnostic', () => {
        const document = styledDocument(model, [
            styled('brand.unknown', plain('One')),
            styledHeading('brand.unknown', 2, plain('Two')),
            styled('brand.legacy', plain('Three')),
        ]);
        const diagnostics: Diagnostic[] = [];

        renderReader(document, model, { presentation, onDiagnostic: (diagnostic) => diagnostics.push(diagnostic) });
        const silent = renderReader(document, model, { presentation });

        expect(diagnostics).toEqual([
            {
                code: 'styles.unknown-style',
                severity: 'warning',
                messageKey: 'styles.unknown-style',
                path: '/content/content/0',
                featureId: 'styles.brand',
            },
            {
                code: 'styles.unknown-style',
                severity: 'warning',
                messageKey: 'styles.unknown-style',
                path: '/content/content/2',
                featureId: 'styles.brand',
            },
        ]);
        expect(silent).toContain('Three');
    });

    it('renders the generated stylesheet once before its root, and the link underline the resolver adds', () => {
        const document = styledDocument(model, [styled(null, linked('basics', null))]);

        const html = renderReader(document, model, { presentation });

        expect(html.replaceAll(/rte-style-[0-9a-f]{12}/g, 'rte-style-*')).toMatchSnapshot();
        expect(html.match(/<style/g)).toHaveLength(1);
        expect(html).toContain(`.${classOf(null, 'link')}{text-decoration:none;text-decoration-line:underline}`);
    });

    it('writes data-rte-style on a link with a styleId beside its recipe class', () => {
        const document = styledDocument(model, [styled(null, linked('start', 'brand.button'))]);

        const html = renderReader(document, model, { presentation });

        expect(html).toContain(
            `<a href="https://frontify.com/" rel="noopener" data-rte-style="brand.button" class="${classOf('brand.button', 'link')}">start</a>`,
        );
    });

    it('applies the recipe, the colour and data-rte-style around a reader override, as toHTML does', () => {
        const overridden = compileContentModel(
            [
                defineReaderFeature(core(), {
                    paragraph: ({ children }) =>
                        createElement('p', { className: 'own', style: { margin: 0 } }, children),
                }),
                heading(),
                quote(),
                brandStyles(),
                defineReaderFeature(fontColor(), {
                    font_color: ({ children }) => createElement(Fragment, null, children),
                }),
                fixtureHighlight(),
                defineReaderFeature(links(), {
                    link: ({ attrs, children }) => createElement('a', { href: attrs.href }, children),
                }),
            ],
            { id: 'test.styles', version: 1 },
        );
        const document = styledDocument(overridden, [
            styled(
                'brand.lead',
                linked('start', 'brand.button'),
                marked('red', 'font_color', { tokenId: 'brand.red', value: null }),
            ),
        ]);

        const html = renderReader(document, overridden, { presentation });

        expect(html).toContain(`<p class="own ${classOf('brand.lead')}" style="margin:0" data-rte-style="brand.lead">`);
        expect(html).toContain(
            `<a href="https://frontify.com/" data-rte-style="brand.button" class="${classOf('brand.button', 'link')}">start</a>`,
        );
        expect(html).toContain('<span style="color:#c0392b">red</span>');
    });

    it('reports an unknown style for every stored style ID when the presentation has no styles, and nothing without a presentation', () => {
        const document = styledDocument(model, [
            styled('brand.lead', plain('One')),
            styled('brand.lead', plain('Two')),
        ]);
        const reported: Diagnostic[] = [];
        const silent: Diagnostic[] = [];

        renderReader(document, model, {
            presentation: { styles: [], colorTokens: [] },
            onDiagnostic: (diagnostic) => reported.push(diagnostic),
        });
        renderReader(document, model, { onDiagnostic: (diagnostic) => silent.push(diagnostic) });

        expect(reported.map(({ code, path }) => [code, path])).toEqual([
            ['styles.unknown-style', '/content/content/0'],
        ]);
        expect(silent).toEqual([]);
    });

    it('writes the token and literal colours of font_color and highlight inline, with data-rte-color naming the token', () => {
        const document = styledDocument(model, [
            styled(
                null,
                marked('token', 'font_color', { tokenId: 'brand.red', value: null }),
                marked('literal', 'highlight', { tokenId: null, value: '#fde68a80' }),
                marked('gone', 'highlight', { tokenId: 'brand.gone', value: null }),
            ),
        ]);

        const html = renderReader(document, model, { presentation });

        expect(html).toContain('<span data-rte-color="brand.red" style="color:#c0392b">token</span>');
        expect(html).toContain('<mark style="background-color:#fde68a80">literal</mark>');
        expect(html).toContain('<mark data-rte-color="brand.gone">gone</mark>');
    });
});
