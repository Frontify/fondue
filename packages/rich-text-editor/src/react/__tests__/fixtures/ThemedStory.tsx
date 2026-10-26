/* (c) Copyright Frontify Ltd., all rights reserved. */

import { composeStory } from '@storybook/react-vite';

import * as links from '#/plugins/Link/Link.stories';
import { ThemeProviderWrapper } from '#storybook/components/StoryWithTheme';

const Links = composeStory(links.Default, links.default);

type ThemedStoryProps = {
    theme: 'light' | 'dark' | 'both';
    direction: 'ltr' | 'rtl';
    locale: string;
};

/** The links story's definition and arguments, wrapped as the root Storybook's preview wraps every story. */
export const ThemedStory = (globals: ThemedStoryProps) => (
    <div data-test-id="themed-story">{ThemeProviderWrapper(Links, { globals })}</div>
);
