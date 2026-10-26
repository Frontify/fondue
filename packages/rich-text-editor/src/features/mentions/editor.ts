/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';
import { defineEditorPart } from '#/bridge/plugin';
import { type JsonObject } from '#/model';

import { mentions } from './feature';
import { resultOf } from './results';
import { mentionView } from './view';

const MentionSearchDialog = lazyPart(() =>
    import('./MentionSearchDialog').then((loaded) => loaded.MentionSearchDialog),
);

// No shown name is longer, as the suggestion list drops longer labels.
const MAX_LABEL = 256;
const KINDS = ['user', 'group', 'everyone'] as const;

type ReferencePayload = {
    resourceType: string;
    resourceId: string;
    labelSnapshot: string;
    href?: string;
    imageUrl?: string;
    kind?: (typeof KINDS)[number];
};

/**
 * The list the `trigger` option opens and the Mention button's search dialog, over the host's references of the
 * `resourceTypes` option, which insert a mention and a space after it as one undo step.
 */
export const mentionsEditor = defineEditorPart(mentions, (options: JsonObject) => {
    let resourceTypes: readonly string[] = [];
    if (Array.isArray(options.resourceTypes)) {
        resourceTypes = options.resourceTypes.filter((type): type is string => typeof type === 'string');
    }

    return {
        needs: ['insert', 'overlays', 'services'],
        commands: {
            'reference.insert': {
                payload: {
                    fields: {
                        resourceType: { type: 'id' },
                        resourceId: { type: 'string', minLength: 1 },
                        labelSnapshot: { type: 'string', maxLength: MAX_LABEL },
                        href: { type: 'string', optional: true },
                        imageUrl: { type: 'string', optional: true },
                        kind: { type: 'enum', values: KINDS, optional: true },
                    },
                },
                run: (api, { resourceType, resourceId, labelSnapshot }: ReferencePayload) => {
                    const inserted = api.insert.node('mention', { resourceType, resourceId, labelSnapshot });
                    if (inserted.status !== 'applied') {
                        return false;
                    }

                    return api.insert.text(' ');
                },
            },
            'mention.search.open': {
                // The selection's start sits in text that is not code.
                enabled: (api) => {
                    const { blockType, verbatim } = api.selection();

                    return blockType !== null && !verbatim;
                },
                run: (api) => {
                    api.overlays.open(MentionSearchDialog, { resourceTypes }, 'selection');

                    return true;
                },
            },
        },
        toolbar: [
            {
                id: 'mention',
                kind: 'button',
                command: 'mention.search.open',
                labelKey: 'RichTextEditor_mention',
                icon: 'IconPerson',
                opensOverlay: true,
            },
        ],
        views: [mentionView],
        suggestions: [
            {
                trigger: options.trigger as string,
                labelKey: 'RichTextEditor_mentionSuggestions',
                // Names hold spaces, and a mention often follows an opening bracket or quote.
                rules: { afterPunctuation: true, maxQuery: 50, spaces: true, leadingLetters: 0 },
                available: (api) => api.services.references() !== undefined,
                search: async (query, { api, signal, cursor }) => {
                    const service = api.services.references();
                    if (service === undefined) {
                        throw new Error('The host gives no reference search.');
                    }

                    const page = await service.search(query, resourceTypes, signal, cursor);

                    return { items: page.items.map(resultOf), nextCursor: page.nextCursor };
                },
                command: 'reference.insert',
            },
        ],
    };
});
