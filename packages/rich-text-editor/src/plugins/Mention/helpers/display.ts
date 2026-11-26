/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    MENTION_KINDS,
    type MentionHref,
    type MentionKind,
    type MentionUnknownLabels,
    type MentionValue,
} from '../types';

import { safeMentionHref } from './mention';
import { withoutControlCharacters } from './text';

/**
 * What a mention shows. Every view draws this and nothing else, so they cannot
 * disagree. `label` is the trigger and the username, or a name for the kind when
 * there is no username; `title` is shown on hover. `href` is set only when the
 * app gives a safe target.
 */
export type MentionDisplay = { label: string; title: string; href?: string };

type MentionDisplayOptions = {
    href?: MentionHref;
    trigger: string;
    unknownLabels: ResolvedUnknownLabels;
};

/**
 * Stored documents are not validated: a field that is not a string reads as empty.
 */
const storedString = (field: unknown): string => {
    if (typeof field !== 'string') {
        return '';
    }
    return field;
};

/** An unknown kind or a non-string reads as none. */
export const storedKind = (value: unknown): MentionKind | undefined => MENTION_KINDS.find((known) => known === value);

/** The `data-mention-*` attributes that name the mentioned person in exported markup. */
export const mentionAttributes = (mention: MentionValue) => ({
    'data-mention-id': storedString(mention.id),
    'data-mention-username': storedString(mention.username),
    'data-mention-kind': storedKind(mention.kind),
});

const storedText = (field: unknown): string => withoutControlCharacters(storedString(field));

/**
 * Names a mention the document stores without a username. They belong to the content,
 * whose language the editor does not know, so the host can give its own and these are the default.
 */
export const ENGLISH_UNKNOWN_LABELS = {
    user: 'Unknown person',
    group: 'Unknown group',
    all: 'Unknown mention',
} as const satisfies Record<MentionKind, string>;

/** A label for every kind, the host's or the English one. */
export type ResolvedUnknownLabels = Readonly<Required<MentionUnknownLabels>>;

/** Each kind the host left out keeps its English label. */
export const resolvedUnknownLabels = (labels: MentionUnknownLabels = {}): ResolvedUnknownLabels => {
    const resolved: Required<MentionUnknownLabels> = { ...ENGLISH_UNKNOWN_LABELS };
    for (const kind of MENTION_KINDS) {
        const given = labels[kind];
        if (given !== undefined) {
            resolved[kind] = given;
        }
    }

    return resolved;
};

/** Shown in place of a stored username that is empty or not text. */
const unknownLabel = (kind: MentionKind | undefined, unknownLabels: ResolvedUnknownLabels): string => {
    // A stored mention without a kind is a person.
    return unknownLabels[kind ?? 'user'];
};

const labelOf = (
    username: string,
    trigger: string,
    kind: MentionKind | undefined,
    unknownLabels: ResolvedUnknownLabels,
): string => {
    if (username === '') {
        return unknownLabel(kind, unknownLabels);
    }
    return `${trigger}${username}`;
};

/** What a mention shows from its stored value. A throw from `href` is not caught. */
export const mentionDisplay = (
    mention: MentionValue,
    { href, trigger, unknownLabels }: MentionDisplayOptions,
): MentionDisplay => {
    const kind = storedKind(mention.kind);
    const label = labelOf(storedText(mention.username), trigger, kind, unknownLabels);
    const title = storedText(mention.name);
    return { label, title, href: safeMentionHref(href, mention) };
};
