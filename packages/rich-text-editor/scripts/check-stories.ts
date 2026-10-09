/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

type Entry = { readonly title: string; readonly type: string };

const FEATURES = 'Rich Text Editor/Features/';

/** Each registered feature needs a story titled `Rich Text Editor/Features/<feature ID>` (SPEC-rich-text/AC-053). */
export const checkStories = (featureIds: readonly string[], entries: Readonly<Record<string, Entry>>): string[] => {
    const titles = new Set(
        Object.values(entries)
            .filter(({ type }) => type === 'story')
            .map(({ title }) => title),
    );
    return featureIds
        .filter((id) => !titles.has(`${FEATURES}${id}`))
        .map((id) => `${id} has no story titled ${FEATURES}${id} in storybook-static/index.json`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    // The registry imports through the `#/` alias, which `tsx` resolves and the node typecheck project does not.
    const { registry } = (await import(new URL('../src/features/registry.ts', import.meta.url).href)) as {
        readonly registry: Readonly<Record<string, unknown>>;
    };
    const { entries } = JSON.parse(
        readFileSync(new URL('../storybook-static/index.json', import.meta.url), 'utf8'),
    ) as {
        entries: Readonly<Record<string, Entry>>;
    };
    const ids = Object.keys(registry);
    const violations = checkStories(ids, entries);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(`check-stories: each of the ${ids.length} registered features has its story.`);
}
