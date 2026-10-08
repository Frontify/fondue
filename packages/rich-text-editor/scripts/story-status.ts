/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

type Entry = { readonly id: string; readonly type: string; readonly tags?: readonly string[] };

// The statuses of `.storybook/manager.ts`, as Storybook tags (SPEC-rich-text/AC-094).
const STATUSES = ['inProgress', 'released'];
const IN_PROGRESS = 'inProgress';

/** Every story must carry a status tag, and `inProgress` before the 1.0 release (SPEC-rich-text/AC-094). */
export const checkStoryStatus = (entries: Readonly<Record<string, Entry>>, version: string): string[] => {
    const [major = 0] = version.split('.').map(Number);
    const violations: string[] = [];
    const stories = Object.values(entries).filter(({ type }) => type === 'story');
    if (stories.length === 0) {
        violations.push('storybook-static/index.json lists no story');
    }
    for (const { id, tags = [] } of stories) {
        if (major < 1 && !tags.includes(IN_PROGRESS)) {
            violations.push(`${id} is not tagged ${IN_PROGRESS}, which every story is until the 1.0 release`);
        } else if (!tags.some((tag) => STATUSES.includes(tag))) {
            violations.push(`${id} has no status tag (${STATUSES.join(', ')})`);
        }
    }
    return violations;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = new URL('..', import.meta.url);
    const { version } = JSON.parse(readFileSync(new URL('package.json', root), 'utf8')) as { version: string };
    const { entries } = JSON.parse(readFileSync(new URL('storybook-static/index.json', root), 'utf8')) as {
        entries: Readonly<Record<string, Entry>>;
    };
    const violations = checkStoryStatus(entries, version);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(`story-status: every one of ${Object.keys(entries).length} entries carries a status tag.`);
}
