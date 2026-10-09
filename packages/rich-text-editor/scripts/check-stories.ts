/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { featureTagsOf } from '../.storybook/feature-tags.ts';
import { type FeatureDeclaration } from '../src/model/declarations.ts';

import { registeredDeclarations } from './registered-features.ts';

type Entry = { readonly id: string; readonly title: string; readonly type: string; readonly tags?: readonly string[] };

const FEATURES = 'Rich Text Editor/Features/';

/** The feature, everything it requires, and `core`. */
const installsOf = (id: string, declarations: ReadonlyMap<string, FeatureDeclaration>): string[] => {
    const installs = new Set(['core']);
    const visit = (feature: string) => {
        installs.add(feature);
        const declaration = declarations.get(feature);
        if (declaration === undefined) {
            return;
        }
        for (const required of declaration.requires ?? []) {
            visit(required.id);
        }
    };
    visit(id);
    return [...installs].sort();
};

/**
 * Each registered feature needs a story titled `Rich Text Editor/Features/<feature ID>` whose `feature:` tags name
 * exactly that feature, its declared `requires` and `core` (SPEC-rich-text/AC-053).
 */
export const checkStories = (
    declarations: readonly FeatureDeclaration[],
    entries: Readonly<Record<string, Entry>>,
): string[] => {
    const byId = new Map(declarations.map((declaration) => [declaration.id, declaration]));
    const stories = Object.values(entries).filter(({ type }) => type === 'story');
    const violations: string[] = [];
    for (const { id } of declarations) {
        const own = stories.filter(({ title }) => title === `${FEATURES}${id}`);
        if (own.length === 0) {
            violations.push(`${id} has no story titled ${FEATURES}${id} in storybook-static/index.json`);
        }
        const expected = installsOf(id, byId).join(', ');
        for (const story of own) {
            const tagged = featureTagsOf(story.tags ?? [])
                .sort()
                .join(', ');
            if (tagged !== expected) {
                violations.push(`${story.id} installs ${tagged || 'no tagged feature'}, not ${expected}`);
            }
        }
    }
    return violations;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const declarations = await registeredDeclarations();
    const { entries } = JSON.parse(
        readFileSync(new URL('../storybook-static/index.json', import.meta.url), 'utf8'),
    ) as {
        entries: Readonly<Record<string, Entry>>;
    };
    const violations = checkStories(declarations, entries);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(
        `check-stories: each of the ${declarations.length} registered features has its story, installing only what it requires.`,
    );
}
