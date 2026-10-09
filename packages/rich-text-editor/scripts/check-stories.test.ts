/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type FeatureDeclaration } from '../src/model/declarations.ts';

import { checkStories } from './check-stories';

const declarations: FeatureDeclaration[] = [
    { id: 'core', version: 1 },
    { id: 'lists.item', version: 1, requires: [{ id: 'core', version: 1 }] },
    { id: 'lists.bullet', version: 1, requires: [{ id: 'lists.item', version: 1 }] },
];

const story = (title: string, features: readonly string[], type = 'story') => {
    const id = `${title}--${type}`;
    return [id, { id, title, type, tags: ['inProgress', ...features.map((feature) => `feature:${feature}`)] }] as const;
};

describe('checkStories', () => {
    it('SPEC-rich-text/AC-053 accepts a story per feature that installs the feature, its requires and core', () => {
        const entries = Object.fromEntries([
            story('Rich Text Editor/Features/core', ['core']),
            story('Rich Text Editor/Features/lists.item', ['core', 'lists.item']),
            story('Rich Text Editor/Features/lists.bullet', ['lists.bullet', 'lists.item', 'core']),
            story('Rich Text Editor/Playground', []),
        ]);

        expect(checkStories(declarations, entries)).toEqual([]);
    });

    it('SPEC-rich-text/AC-053 fails a feature with no story, and counts no documentation entry as one', () => {
        const entries = Object.fromEntries([
            story('Rich Text Editor/Features/core', ['core']),
            story('Rich Text Editor/Features/lists.item', ['core', 'lists.item'], 'docs'),
            story('Rich Text Editor/Features/lists.bullet', ['core', 'lists.bullet', 'lists.item']),
        ]);

        expect(checkStories(declarations, entries)).toEqual([
            'lists.item has no story titled Rich Text Editor/Features/lists.item in storybook-static/index.json',
        ]);
    });

    it('SPEC-rich-text/AC-053 fails a feature story that installs more or less than its feature, requires and core', () => {
        const entries = Object.fromEntries([
            story('Rich Text Editor/Features/core', ['core', 'lists.item']),
            story('Rich Text Editor/Features/lists.item', []),
            story('Rich Text Editor/Features/lists.bullet', ['core', 'lists.bullet']),
        ]);

        expect(checkStories(declarations, entries)).toEqual([
            'Rich Text Editor/Features/core--story installs core, lists.item, not core',
            'Rich Text Editor/Features/lists.item--story installs no tagged feature, not core, lists.item',
            'Rich Text Editor/Features/lists.bullet--story installs core, lists.bullet, not core, lists.bullet, lists.item',
        ]);
    });
});
