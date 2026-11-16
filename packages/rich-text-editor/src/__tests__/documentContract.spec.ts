/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { DOCUMENT_GAP_VARIABLES, OWN_MARGIN_VARIABLES } from '../core/documentContract';
import { type RteDocument } from '../documentFormat';
import { textStylePlugin } from '../plugins/TextStyle';
import { TEXT_STYLE_ATTRIBUTE } from '../renderer/inlineLooks';
import { serializeToHtml } from '../renderer/serializeToHtml';

// Stylesheets cannot import core's names, so these read the stylesheets as text and compare.

const SOURCE_DIRECTORY = fileURLToPath(new URL('..', import.meta.url));
const DOCUMENT_STYLESHEET = join(SOURCE_DIRECTORY, 'renderer', 'document.module.scss');

/** Whatever a stylesheet spells as a block variable: the gap the document hands a block, or a misspelling of one. */
const GAP_VARIABLE = /--rte-block-[a-z0-9-]+/g;

/** Whatever a stylesheet spells as an own-margin variable, or a misspelling of one. */
const OWN_MARGIN_VARIABLE = /--rte-own-[a-z0-9-]+/g;

/** An attribute selector on a `data-` attribute, such as `[data-text-style]`. */
const DATA_ATTRIBUTE_SELECTOR = /\[data-[a-z-]+/g;

/** A `@property` rule: the name it registers and the body that says how. */
const PROPERTY_RULE = /@property\s+(--[a-z0-9-]+)\s*\{([^}]*)\}/g;

/** The declaration that stops a registered custom property from inheriting. */
const NOT_INHERITED = /inherits:\s*false\s*;/;

const stylesheetTexts = (): string[] =>
    readdirSync(SOURCE_DIRECTORY, { recursive: true, encoding: 'utf8' })
        .filter((file) => file.endsWith('.scss'))
        .map((file) => readFileSync(join(SOURCE_DIRECTORY, file), 'utf8'));

describe('the gap variable of the document', () => {
    it('is the one core names, in every stylesheet that writes or reads it', () => {
        const spelled = stylesheetTexts().flatMap((text) => text.match(GAP_VARIABLE) ?? []);

        expect([...new Set(spelled)].sort()).toEqual(Object.values(DOCUMENT_GAP_VARIABLES).sort());
    });
});

describe('the own-margin variables', () => {
    const documentStylesheet = readFileSync(DOCUMENT_STYLESHEET, 'utf8');

    it('are the ones core names, in every stylesheet that spells one', () => {
        const spelled = stylesheetTexts().flatMap((text) => text.match(OWN_MARGIN_VARIABLE) ?? []);

        expect([...new Set(spelled)].sort()).toEqual(Object.values(OWN_MARGIN_VARIABLES).sort());
    });

    it('are registered by the document stylesheet as not inherited', () => {
        const rules = [...documentStylesheet.matchAll(PROPERTY_RULE)];
        const registered = rules.filter(([, , body = '']) => NOT_INHERITED.test(body)).map(([, name]) => name);

        expect([...registered].sort()).toEqual(Object.values(OWN_MARGIN_VARIABLES).sort());
    });

    it('leave the document stylesheet selecting on no data attribute, so it knows no plugin', () => {
        expect(documentStylesheet.match(DATA_ATTRIBUTE_SELECTOR) ?? []).toEqual([]);
    });
});

describe('the text style attribute the inline export reads', () => {
    it('is the one the text style plugin writes on its paragraphs', () => {
        const doc: RteDocument = {
            version: 1,
            blocks: [{ type: 'textStyle', style: 'custom1', children: [{ text: 'Styled' }] }],
        };

        const html = serializeToHtml(doc, { plugins: [textStylePlugin()], wrap: false });

        expect(html).toMatch(new RegExp(`^<p [^>]*${TEXT_STYLE_ATTRIBUTE}="custom1"`));
    });
});
