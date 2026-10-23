/* (c) Copyright Frontify Ltd., all rights reserved. */

import { composeStory } from '@storybook/react-vite';

import * as links from '#/features/links/links.stories';
import { ThemeProviderWrapper } from '#storybook/components/StoryWithTheme';

const Links = composeStory(links.Default, links.default);

interface ThemedStoryProps {
    readonly theme: 'light' | 'dark' | 'both';
    readonly direction: 'ltr' | 'rtl';
    readonly locale: string;
}

/** The links story's definition and arguments, wrapped as the root Storybook's preview wraps every story. */
export const ThemedStory = (globals: ThemedStoryProps) => (
    <div data-test-id="themed-story">{ThemeProviderWrapper(Links, { globals })}</div>
);
