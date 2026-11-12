/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { DOCUMENT_GAP_VARIABLES, OWN_MARGINS_ATTRIBUTE } from '../core/documentContract';

// Stylesheets cannot import core's names, so these read the stylesheets as text and compare.

const SOURCE_DIRECTORY = fileURLToPath(new URL('..', import.meta.url));
const DOCUMENT_STYLESHEET = join(SOURCE_DIRECTORY, 'renderer', 'document.module.scss');

/** Whatever a stylesheet spells as a block variable: the gap the document hands a block, or a misspelling of one. */
const GAP_VARIABLE = /--rte-block-[a-z0-9-]+/g;

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

describe('the margin marker', () => {
    const documentStylesheet = readFileSync(DOCUMENT_STYLESHEET, 'utf8');

    it('is the attribute the document stylesheet leaves alone', () => {
        expect(documentStylesheet).toContain(`:not([${OWN_MARGINS_ATTRIBUTE}])`);
    });

    it('is not a text style attribute, which the document stylesheet must not know', () => {
        expect(documentStylesheet).not.toContain('data-text-style');
    });
});
