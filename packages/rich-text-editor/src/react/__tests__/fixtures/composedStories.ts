/* (c) Copyright Frontify Ltd., all rights reserved. */

import { composeStories, setProjectAnnotations } from '@storybook/react-vite';
import { type ComponentType } from 'react';

import { ThemeProviderWrapper } from '#storybook/components/StoryWithTheme';

type StoriesModule = Parameters<typeof composeStories>[0];
type Glob = (patterns: readonly string[], options: { readonly eager: true }) => Record<string, StoriesModule>;

/** A story of the package as `composeStories` composes it. */
export type ComposedStory = {
    /** The story file's path under `src`. */
    readonly file: string;
    readonly name: string;
    readonly id: string;
    readonly tags: readonly string[];
    readonly args: Readonly<Record<string, unknown>>;
    readonly parameters: Readonly<Record<string, unknown>>;
    readonly play: ((context: { readonly canvasElement: HTMLElement }) => Promise<void>) | undefined;
    readonly Story: ComponentType;
};

// The root preview's decorator, without its MDX docs page and global CSS that the test builds cannot load.
setProjectAnnotations({ decorators: [ThemeProviderWrapper] });

// A root-absolute glob misses in the component test build, whose root is its `playwright` folder, so the keys are relative to this folder.
const FOLDER = 'file:///react/__tests__/fixtures/';
const modules = (import.meta as unknown as { readonly glob: Glob }).glob(['../../../**/*.stories.tsx'], {
    eager: true,
});

/** Every story of the package, in the order of its file path. */
export const COMPOSED_STORIES: readonly ComposedStory[] = Object.entries(modules)
    .sort(([left], [right]) => left.localeCompare(right))
    .flatMap(([path, module]) =>
        Object.entries(composeStories(module)).map(([name, story]) => {
            const { id, tags, args, parameters, play } = story as Omit<ComposedStory, 'file' | 'name' | 'Story'>;

            return {
                file: new URL(path, FOLDER).pathname.slice(1),
                name,
                id,
                tags,
                args,
                parameters,
                play,
                Story: story as ComponentType,
            };
        }),
    );
