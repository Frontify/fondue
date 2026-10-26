/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { COMPOSED_STORIES } from './fixtures/composedStories';

// Storybook links: `?path=/story/<id>` and `?path=/docs/<id>--documentation`, or `#<slug>` for a heading of the same description.
const LINK = /\[[^\]]*\]\(([^)\s]+)\)|href="([^"]+)"/g;
const HEADING = /^#{1,6}\s+(.+)$/gm;
const slugOf = (heading: string) =>
    heading
        .toLowerCase()
        .replaceAll(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replaceAll(/\s+/g, '-');

type Described = {
    title: string;
    text: string;
};

/** The relative links and anchors in `text` that resolve to no story, docs page or heading. */
const brokenLinks = ({ text }: Described, ids: ReadonlySet<string>): string[] => {
    const anchors = new Set([...text.matchAll(HEADING)].map(([, heading]) => slugOf(heading ?? '')));
    const broken: string[] = [];
    for (const [, markdown, html] of text.matchAll(LINK)) {
        const link = markdown ?? html;
        const href = link ?? '';
        if (/^[a-z][a-z\d+.-]*:/i.test(href)) {
            continue;
        }

        if (href.startsWith('#')) {
            if (!anchors.has(href.slice(1))) {
                broken.push(href);
            }

            continue;
        }

        const path = /^\.?\/?\?path=\/(story|docs)\/([^&#]+)/.exec(href);
        if (path === null || !ids.has(path[2] ?? '')) {
            broken.push(href);
        }
    }

    return broken;
};

const STORY_IDS = new Set(COMPOSED_STORIES.flatMap(({ id }) => [id, `${id.split('--')[0] ?? ''}--documentation`]));
const descriptions: readonly Described[] = COMPOSED_STORIES.map(({ file, name, parameters }) => {
    const docs = parameters.docs as { description?: { component?: string; story?: string } } | undefined;
    const description = docs?.description;
    let component = '';
    let story = '';
    if (description !== undefined) {
        component = description.component ?? '';
        story = description.story ?? '';
    }

    return { title: `${file} ${name}`, text: `${component}\n${story}` };
});

describe('the links of every story', () => {
    it('finds a link to no story, an anchor to no heading and a path outside Storybook', () => {
        const text = '# Keys\n[ok](#keys) [gone](#missing) [story](?path=/story/none--story) [up](../README.md)';

        expect(brokenLinks({ title: 'probe', text }, STORY_IDS)).toEqual([
            '#missing',
            '?path=/story/none--story',
            '../README.md',
        ]);
    });

    it.each(descriptions)('resolves every relative link and anchor in $title', (described) => {
        expect(brokenLinks(described, STORY_IDS)).toEqual([]);
    });
});
