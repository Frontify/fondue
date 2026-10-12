/* (c) Copyright Frontify Ltd., all rights reserved. */

import { composeStories } from '@storybook/react-vite';
import { act, render } from '@testing-library/react';
import { type ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';

type StoriesModule = Parameters<typeof composeStories>[0];
type Glob = (patterns: readonly string[], options: { readonly eager: true }) => Record<string, StoriesModule>;

/** Announcements reach the one polite region: no assertive region, no alert and no live surface. */
const liveRegionFaults = (root: ParentNode): string[] => {
    const faults: string[] = [];
    for (const element of root.querySelectorAll('[aria-live="assertive"]')) {
        faults.push(`a live region is assertive: ${element.outerHTML}`);
    }
    for (const element of root.querySelectorAll('[role="alert"]')) {
        faults.push(`a live region is an alert: ${element.outerHTML}`);
    }
    for (const element of root.querySelectorAll('[data-rte-surface][aria-live]')) {
        faults.push(`the surface is a live region: ${element.outerHTML}`);
    }
    return faults;
};

// Every story file of the package, as the Storybook test runner renders them.
const modules = (import.meta as unknown as { readonly glob: Glob }).glob(['../../**/*.stories.tsx'], { eager: true });
const stories = Object.entries(modules).flatMap(([path, module]) =>
    Object.entries(composeStories(module)).map(([name, Story]) => ({
        title: `${path} ${name}`,
        Story: Story as ComponentType,
    })),
);

describe('the live regions of every story', () => {
    it('fails on an assertive region, an alert and a live region on the surface', () => {
        const element = document.createElement('div');
        element.innerHTML =
            '<p aria-live="assertive"></p><p role="alert"></p><div role="textbox" data-rte-surface="" aria-live="polite"></div>';

        expect(liveRegionFaults(element)).toEqual([
            'a live region is assertive: <p aria-live="assertive"></p>',
            'a live region is an alert: <p role="alert"></p>',
            'the surface is a live region: <div role="textbox" data-rte-surface="" aria-live="polite"></div>',
        ]);
    });

    it.each(stories)('renders no assertive or surface live region in $title', ({ Story, title }) => {
        // A reader story renders content or a blocked notice, every other story an editor or its blocked shell.
        let rendered = '[data-test-id^="fondue-rich-text"]';
        if (title.includes('/reader/')) {
            rendered = '*';
        }
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const { container, unmount } = render(<Story />);
        act(() => undefined);

        // Portals render under the body, outside the story's container, so the scan covers the whole document.
        expect(container.querySelector(rendered)).not.toBeNull();
        expect(liveRegionFaults(document.body)).toEqual([]);
        unmount();
        vi.restoreAllMocks();
    });
});
