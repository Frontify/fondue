/* (c) Copyright Frontify Ltd., all rights reserved. */

import { composeStories } from '@storybook/react-vite';
import { act, render } from '@testing-library/react';
import { type ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { liveRegionFaults } from '../../.storybook/checks';

type StoriesModule = Parameters<typeof composeStories>[0];
type Glob = (patterns: readonly string[], options: { readonly eager: true }) => Record<string, StoriesModule>;

// Every story file of the package, as the Storybook test runner renders them.
const modules = (import.meta as unknown as { readonly glob: Glob }).glob(
    ['../**/*.stories.tsx', '!../**/__lint-fixtures__/**'],
    { eager: true },
);
const stories = Object.entries(modules).flatMap(([path, module]) =>
    Object.entries(composeStories(module)).map(([name, Story]) => ({
        title: `${path} ${name}`,
        Story: Story as ComponentType,
    })),
);

describe('the live regions of every story', () => {
    it('SPEC-rich-text-accessibility/AC-038 fails on an assertive region, an alert and a live region on the surface', () => {
        const element = document.createElement('div');
        element.innerHTML =
            '<p aria-live="assertive"></p><p role="alert"></p><div role="textbox" data-rte-surface="" aria-live="polite"></div>';

        expect(liveRegionFaults(element)).toEqual([
            'a live region is assertive: <p aria-live="assertive"></p>',
            'a live region is an alert: <p role="alert"></p>',
            'the surface is a live region: <div role="textbox" data-rte-surface="" aria-live="polite"></div>',
        ]);
    });

    it.each(stories)(
        'SPEC-rich-text-accessibility/AC-038 renders no assertive or surface live region in $title',
        ({ Story, title }) => {
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
        },
    );
});
