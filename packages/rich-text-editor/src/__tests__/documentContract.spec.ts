/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { CHILD_SPACING_ATTRIBUTE, DOCUMENT_GAP_VARIABLES, OWN_MARGINS_ATTRIBUTE } from '../core/documentContract';
import { type ChildSpacing } from '../core/plugin';

// Stylesheets cannot import core's names, so these read the stylesheets as text and compare.

const SOURCE_DIRECTORY = fileURLToPath(new URL('..', import.meta.url));
const DOCUMENT_STYLESHEET = join(SOURCE_DIRECTORY, 'renderer', 'document.module.scss');

/** Whatever a stylesheet spells as a gap variable of the document, or a misspelling of one. */
const GAP_VARIABLE = /--rte-(?:block|leading)-[a-z0-9-]+/g;

/** Whatever a stylesheet spells as the child-spacing mark, or a misspelling of it. */
const CHILD_SPACING_MARK = /data-rte-child-[a-z0-9-]+/g;

/** The spacing whose children the document stylesheet holds together. */
const TIGHT: ChildSpacing = 'tight';

/** An attribute selector on a `data-` attribute, such as `[data-rte-own-margins]`. */
const DATA_ATTRIBUTE_SELECTOR = /\[data-[a-z-]+\]/g;

const stylesheetTexts = (): string[] =>
    readdirSync(SOURCE_DIRECTORY, { recursive: true, encoding: 'utf8' })
        .filter((file) => file.endsWith('.scss'))
        .map((file) => readFileSync(join(SOURCE_DIRECTORY, file), 'utf8'));

describe('the gap variables of the document', () => {
    it('are the ones core names, in every stylesheet that writes or reads them', () => {
        const spelled = stylesheetTexts().flatMap((text) => text.match(GAP_VARIABLE) ?? []);

        expect([...new Set(spelled)].sort()).toEqual(Object.values(DOCUMENT_GAP_VARIABLES).sort());
    });
});

describe('the margin marker', () => {
    const documentStylesheet = readFileSync(DOCUMENT_STYLESHEET, 'utf8');

    it('is the attribute the document stylesheet leaves alone', () => {
        expect(documentStylesheet).toContain(`:not([${OWN_MARGINS_ATTRIBUTE}])`);
    });

    it('is, with the child-spacing mark, the only data attribute the document stylesheet selects on, so it knows no plugin', () => {
        const attributes = documentStylesheet.match(DATA_ATTRIBUTE_SELECTOR) ?? [];

        expect(new Set(attributes)).toEqual(new Set([`[${OWN_MARGINS_ATTRIBUTE}]`, `[${CHILD_SPACING_ATTRIBUTE}]`]));
    });
});

describe('the child-spacing mark', () => {
    const documentStylesheet = readFileSync(DOCUMENT_STYLESHEET, 'utf8');

    it('is the attribute core names, in every stylesheet that reads it', () => {
        const spelled = stylesheetTexts().flatMap((text) => text.match(CHILD_SPACING_MARK) ?? []);

        expect([...new Set(spelled)]).toEqual([CHILD_SPACING_ATTRIBUTE]);
    });

    it('is the attribute, with its tight value, the document stylesheet spaces by', () => {
        expect(documentStylesheet).toContain(`:where([${CHILD_SPACING_ATTRIBUTE}]) > *`);
        expect(documentStylesheet).toContain(`[${CHILD_SPACING_ATTRIBUTE}='${TIGHT}'] > *`);
    });
});
