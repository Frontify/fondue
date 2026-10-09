/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { checkStories } from './check-stories';

const entry = (title: string, type = 'story') => [`${title}--${type}`, { title, type }] as const;

describe('checkStories', () => {
    it('SPEC-rich-text/AC-053 accepts a story titled Rich Text Editor/Features/<feature ID> for each feature', () => {
        const entries = Object.fromEntries([
            entry('Rich Text Editor/Features/core'),
            entry('Rich Text Editor/Features/marks.bold'),
            entry('Rich Text Editor/Playground'),
        ]);

        expect(checkStories(['core', 'marks.bold'], entries)).toEqual([]);
    });

    it('SPEC-rich-text/AC-053 fails a feature with no story, and counts no documentation entry as one', () => {
        const entries = Object.fromEntries([
            entry('Rich Text Editor/Features/core'),
            entry('Rich Text Editor/Features/marks.bold', 'docs'),
        ]);

        expect(checkStories(['core', 'marks.bold'], entries)).toEqual([
            'marks.bold has no story titled Rich Text Editor/Features/marks.bold in storybook-static/index.json',
        ]);
    });
});
