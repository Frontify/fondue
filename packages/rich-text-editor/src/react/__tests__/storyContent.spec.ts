/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { documentModel } from '#/features';
import { type RichTextProfile } from '#/index';
import { enUS } from '#/locales/en-US';
import { type ContentModel, createEmptyDocument, findContentIssues, type RichTextDocument } from '#/model';
import { engineOf } from '#/react/compileEditor';
import { PROFILE_MODELS } from '#/react/examples/records';
import { type CompiledEditorDefinition, type ReactPresentation } from '#/react/types';

import { COMPOSED_STORIES } from './fixtures/composedStories';

interface StoryArgs {
    readonly definition?: CompiledEditorDefinition<object>;
    readonly model?: ContentModel;
    readonly profile?: RichTextProfile;
    readonly presentation?: ReactPresentation;
}

// Stories that show what the content checks find, whose content has issues on purpose.
const NAMED_FOR_A_CHECK = /a11yContentChecks\//;

const modelOf = (args: StoryArgs): ContentModel | undefined => {
    if (args.definition !== undefined) {
        return engineOf(args.definition).model;
    }
    if (args.model !== undefined) {
        return args.model;
    }
    if (args.profile !== undefined) {
        return PROFILE_MODELS[args.profile];
    }
    return undefined;
};

const automaticIssues = (document: RichTextDocument, model: ContentModel | undefined, args: StoryArgs) => {
    const tokens = args.presentation?.colorTokens;
    return findContentIssues(document, {
        locale: enUS,
        // A story with no model of its own is checked against every shipped rule.
        model: model ?? documentModel,
        colorTokens: tokens ?? [],
        // Stories render on the light theme's white surface.
        background: '#ffffff',
    })
        .filter(({ kind }) => kind === 'automatic')
        .map(({ id }) => id);
};

const isDocument = (value: unknown): value is RichTextDocument =>
    typeof value === 'object' &&
    value !== null &&
    (value as { readonly format?: unknown }).format === 'frontify.rich-text';

/** The documents a story's args hold, as a document or as the `document` of a stored record. */
const documentsOf = (args: StoryArgs): RichTextDocument[] =>
    Object.values(args).flatMap((value) => {
        if (isDocument(value)) {
            return [value];
        }
        const record = value as { readonly document?: unknown } | null | undefined;
        const document = record?.document;
        if (isDocument(document)) {
            return [document];
        }
        return [];
    });

// The playground Profile story ignores its args and renders the empty document of its profile.
const PROFILE_EDITOR = 'react/playground.stories.tsx Profile';

const stories = COMPOSED_STORIES.filter(({ file }) => !NAMED_FOR_A_CHECK.test(file)).flatMap(({ file, name, args }) => {
    const title = `${file} ${name}`;
    const storyArgs = args as StoryArgs;
    let documents = documentsOf(storyArgs);
    if (title === PROFILE_EDITOR && storyArgs.profile !== undefined) {
        documents = [createEmptyDocument(PROFILE_MODELS[storyArgs.profile])];
    }
    // A story whose content its component builds, such as the persistence story, has none to check.
    if (documents.length === 0) {
        return [];
    }
    return [{ title, documents, args: storyArgs }];
});

describe('the content of every story', () => {
    it('checks the playground Profile story, each profile story and each example story', () => {
        expect(stories.map(({ title }) => title)).toEqual(
            expect.arrayContaining([
                PROFILE_EDITOR,
                ...['Inline', 'Comment', 'Document', 'BrandDocument'].map(
                    (name) => `react/examples/profiles.stories.tsx ${name}`,
                ),
                ...[
                    'InitialLoad',
                    'SubmitSnapshot',
                    'SaveFailure',
                    'ExternalReplacement',
                    'ReadonlyAndReader',
                    'TwoEditors',
                    'PopupInHostDialog',
                    'FormField',
                ].map((name) => `react/examples/examples.stories.tsx ${name}`),
            ]),
        );
    });

    it.each(stories)('has no automatic content issue in $title', ({ documents, args }) => {
        for (const document of documents) {
            expect(automaticIssues(document, modelOf(args), args)).toEqual([]);
        }
    });
});
