/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { JSDOM } from 'jsdom';
import { describe, expect, it, vi } from 'vitest';

import { core } from '#/features/core/feature';
import { bold } from '#/features/marksBold/feature';
import { strike } from '#/features/marksStrike/feature';
import { underline } from '#/features/marksUnderline/feature';
import { compileContentModel, defaultLimits, type Feature } from '#/model';
import { compiledModel } from '#/model/internal';
import { buildSchema } from '#/runtime/definition/schema';
import { NO_COLORS } from '#/runtime/import/colors';
import { importHtml } from '#/runtime/import/html';

const { window } = new JSDOM('');

/** How many style reads the import of `depth` nested spans of `style` makes, with the function rules of `feature`. */
const readsAt = (feature: Feature, style: string, depth: number) => {
    const model = compileContentModel([core(), feature], { id: 'test.cost', version: 1 });
    const html = `<p>${`<span style="${style}">`.repeat(depth)}x${'</span>'.repeat(depth)}</p>`;
    const declaration = Object.getPrototypeOf(window.document.createElement('span').style) as CSSStyleDeclaration;
    const reads = vi.spyOn(declaration, 'getPropertyValue');
    importHtml(html, buildSchema(model), window as unknown as Window, {
        limits: { ...defaultLimits, maxDepth: 10_000 },
        headingLevels: undefined,
        depth: 2,
        colors: NO_COLORS,
        rules: compiledModel(model).parseRules,
    });
    const { length } = reads.mock.calls;
    reads.mockRestore();

    return length;
};

describe('the function parse rules that read the ancestors of an element', () => {
    it.each([
        ['underline', underline(), 'text-decoration:none'],
        ['strike', strike(), 'text-decoration:none'],
        ['bold', bold(), 'font-weight:inherit'],
    ])('cost no more than twice as much when the nesting of %s doubles', (_name, feature, style) => {
        const shallow = readsAt(feature, style, 100);
        const deep = readsAt(feature, style, 200);

        expect(deep / shallow).toBeLessThan(3);
    });
});
