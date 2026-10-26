/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { featuresById, registry } from '#/features/registry';
import { compileContentModel } from '#/model';
import { compiledModel } from '#/model/internal';
import { COMPOSED_STORIES } from '#/react/__tests__/fixtures/composedStories';
import { type CompiledEditorDefinition } from '#/react/types';

// Every shipped feature in one model, which holds each one's declared `requires`.
const requires = new Map(
    compiledModel(
        compileContentModel(featuresById(Object.keys(registry)), { id: 'test.stories', version: 1 }),
    ).features.map(({ id, declaration }) => [id, (declaration.requires ?? []).map((required) => required.id)]),
);

/** The feature's ID and every ID it requires, directly or not, which a story of the feature may install. */
const installable = (id: string): ReadonlySet<string> => {
    const found = new Set<string>();
    const visit = (next: string) => {
        if (found.has(next)) {
            return;
        }

        found.add(next);
        for (const required of requires.get(next) ?? []) {
            visit(required);
        }
    };

    visit(id);
    found.add('core');

    return found;
};

// Features whose purpose is to act on other features' content, so their stories install those too.
const ALLOWANCES: Readonly<Record<string, readonly string[]>> = {
    'format.clear': ['marks.bold', 'blocks.align', 'lists.item', 'lists.bullet', 'blocks.heading'],
    'nav.outline': ['blocks.heading'],
    'a11y.content-checks': ['blocks.heading', 'links', 'media.image', 'marks.font-color'],
};

describe('the feature stories', () => {
    it.each(Object.keys(registry))('install only core, %s and its requires', (feature) => {
        const prefix = `rich-text-editor-features-${feature.replaceAll(/[^a-z0-9]+/g, '-')}--`;
        const stories = COMPOSED_STORIES.filter(({ id }) => id.startsWith(prefix));

        expect(stories.length).toBeGreaterThan(0);
        for (const { args } of stories) {
            const { capabilities } = args.definition as CompiledEditorDefinition;
            const installed = capabilities.map(({ id }) => id).sort();

            expect(installed).toEqual([...installable(feature), ...(ALLOWANCES[feature] ?? [])].sort());
        }
    });
});
