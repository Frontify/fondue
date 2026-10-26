/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { defineReactPresentation } from '#/entries/authoring';
import { corePlugin, defineEditor, mentionPlugin, modelOf, RichTextEditor } from '#/index';
import { type ReferenceResolution } from '#/model';
import { createFakeReferenceService } from '#/testing';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), mentionPlugin()] as const;
const model = modelOf(plugins, { id: 'story.mentions', version: 1 });

const people = createFakeReferenceService([
    { resourceType: 'user', resourceId: 'user-ada', labelSnapshot: 'Ada Lovelace', kind: 'user' },
    { resourceType: 'user', resourceId: 'user-grace', labelSnapshot: 'Grace Hopper', kind: 'user' },
    { resourceType: 'user', resourceId: 'user-layla', labelSnapshot: 'ليلى حسن', kind: 'user' },
    { resourceType: 'group', resourceId: 'group-design', labelSnapshot: 'Design team', kind: 'group' },
    { resourceType: 'group', resourceId: 'group-all', labelSnapshot: 'Everyone', kind: 'everyone' },
]);

// Ada was renamed, and Lin's account is gone, as a host's directory reports them.
const resolveReference = (_type: string, id: string): ReferenceResolution => {
    if (id === 'user-ada') {
        return { status: 'current', label: 'Ada King' };
    }

    if (id === 'user-lin') {
        return { status: 'unavailable', code: 'deleted' };
    }

    return { status: 'unknown' };
};

const mention = (nodeId: string, resourceId: string, labelSnapshot: string) => ({
    type: 'mention',
    attrs: { nodeId, resourceType: 'user', resourceId, labelSnapshot },
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins/Mention',
    component: RichTextEditor,
    tags: ['autodocs', 'documents-behavior', 'feature:mentions', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Mentions of host resources. Type \`@\` at a word start to open suggestions from \`services.references\`, which the editor asks 200 ms after the last keystroke with the query and the feature's \`resourceTypes\`. ArrowUp and ArrowDown move the active option, Enter or Tab inserts it as a mention followed by a space, Escape closes the list and keeps what was typed, and one undo restores the query. A page with a next cursor ends with Load more, and a failed search offers Retry. The Mention toolbar button opens the same search in a dialog, which inserts at the selection it opened from. Without a service, \`@\` stays text.

A mention stores its resource type and ID and the label it was chosen with (\`labelSnapshot\`); the presentation's \`resolveReference\` shows the current label, or an unavailable note, without changing the document. The editor never notifies anyone: \`diffReferences(before, after, model)\` from \`./model\` tells a host which mentions a change added or removed.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`mentions\` | \`reference.insert\` \`ReferenceValue\`, \`mention.search.open\` | none | \`@\` suggestions; Mention button and its search dialog | none | Replaces the trigger and query with one \`mention\` and a space |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.mentions', model, plugins }),
        presentation: defineReactPresentation({ toolbar: [['mention.search.open']], resolveReference }),
        services: { references: people },
        defaultValue: {
            documentId: 'story-mentions',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'mentions', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'Ask ' },
                                mention('mention-1', 'user-ada', 'Ada Lovelace'),
                                { type: 'text', text: ' or ' },
                                mention('mention-2', 'user-lin', 'Lin Wu'),
                                { type: 'text', text: ', or type @ to mention someone.' },
                            ],
                        },
                    ],
                },
            },
        },
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        presentation: { control: false },
        services: { control: false },
    },
};
export default meta;

/** Typing @ lists the matching people, and Enter inserts the active one. */
export const Default: StoryObj<typeof RichTextEditor> = {
    play: async ({ canvasElement }) => {
        const timeout = { timeout: 10_000 };
        const page = within(canvasElement.ownerDocument.body);
        // The surface takes focus only once the editor is ready, so typing before that is lost.
        const surface = await waitFor(async () => {
            const live = within(canvasElement).getByRole('textbox', { name: 'Notes' });
            await expect(live).toHaveAttribute('contenteditable', 'true');

            return live;
        }, timeout);
        await userEvent.type(surface, ' @Gra');
        await expect(await page.findByRole('option', { name: /Grace Hopper/ }, timeout)).toBeVisible();
        await userEvent.keyboard('{Enter}');

        await waitFor(() => expect(page.queryByRole('listbox', { name: 'Mention suggestions' })).toBeNull(), timeout);
        await expect(surface).toHaveTextContent('Grace Hopper');
    },
};
