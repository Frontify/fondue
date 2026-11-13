/* (c) Copyright Frontify Ltd., all rights reserved. */

import { warnOnce } from '#/core';

import { withoutControlCharacters } from '../../shared/helpers/text';
import {
    MENTION_KINDS,
    type MentionHref,
    type MentionKind,
    type MentionResolution,
    type MentionResolve,
    type MentionValue,
} from '../types';

import { DEFAULT_MENTION_CONTENT_LABELS, type MentionContentLabels } from './labels';
import { safeMentionHref } from './mention';

/**
 * What a mention shows. Every view draws this and nothing else, so they cannot
 * disagree. `label` is the trigger and the username, or a name for the kind when
 * there is no username; `title` is shown on hover. A mention links only when the
 * app gives a safe target; an unavailable one never links, and only views for
 * reading say its `note` after it, so exports keep `@` and the label.
 */
export type MentionDisplay =
    | { status: 'linked'; label: string; title: string; href: string }
    | { status: 'text'; label: string; title: string }
    | { status: 'unavailable'; label: string; title: string; note: string };

type MentionDisplayOptions = {
    resolve?: MentionResolve;
    href?: MentionHref;
    trigger: string;
    labels?: MentionContentLabels;
};

type MentionNames = { username: string; name: string };

/**
 * Stored documents are not validated: a field that is not a string reads as empty.
 */
const storedString = (field: unknown): string => {
    if (typeof field !== 'string') {
        return '';
    }
    return field;
};

/**
 * A stored or pasted kind as this version knows it: an unknown kind or a non-string reads as none.
 */
export const storedKind = (value: unknown): MentionKind | undefined => MENTION_KINDS.find((known) => known === value);

/**
 * The `data-mention-*` attributes that let copied markup paste back as a mention.
 * They carry the stored value, so the shown name never flows back into the document on paste.
 */
export const mentionAttributes = (mention: MentionValue) => ({
    'data-mention-id': storedString(mention.id),
    'data-mention-username': storedString(mention.username),
    'data-mention-name': storedString(mention.name),
    'data-mention-kind': storedKind(mention.kind),
});

/**
 * A stored field as shown: control and bidirectional characters removed.
 */
const storedText = (field: unknown): string => withoutControlCharacters(storedString(field));

/**
 * The names to show for a person the app still knows: the current ones. A
 * username that is not text or is empty once cleaned keeps both stored names;
 * a name that is not text keeps the stored name.
 */
const currentNames = (stored: MentionNames, current: MentionNames): MentionNames => {
    if (typeof current.username !== 'string') {
        return stored;
    }
    const username = withoutControlCharacters(current.username);
    if (username === '') {
        return stored;
    }
    if (typeof current.name !== 'string') {
        return { username, name: stored.name };
    }
    return { username, name: withoutControlCharacters(current.name) };
};

/** Shown in place of a stored username that is empty or not text. */
const unknownLabel = (kind: MentionKind | undefined, labels: MentionContentLabels): string => {
    switch (kind) {
        case undefined:
        case 'user':
            return labels.unknownPerson;
        case 'group':
            return labels.unknownGroup;
        case 'all':
            return labels.unknownMention;
        default:
            // Adding a kind fails to compile here until it is handled.
            throw new Error(`Unhandled mention kind: ${JSON.stringify(kind satisfies never)}`);
    }
};

/**
 * The trigger and the username, or a named label when there is no username to show.
 */
const labelOf = (
    username: string,
    trigger: string,
    kind: MentionKind | undefined,
    labels: MentionContentLabels,
): string => {
    if (username === '') {
        return unknownLabel(kind, labels);
    }
    return `${trigger}${username}`;
};

/**
 * Dev-only warning, once per mention id, for a resolver that answered with no
 * known status; that mention shows its stored value.
 */
const warnUnknownAnswer = (mention: MentionValue, answer: unknown): void => {
    const id = storedString(mention.id);
    warnOnce(
        `mention-resolve-unknown-answer:${id}`,
        `[RichTextEditor] The mention resolver answered with no known status for "${id}", so its stored name is shown.`,
        answer,
    );
};

/** Every status a resolution can have; a status added to `MentionResolution` fails to compile until it is listed. */
const RESOLUTION_STATUSES: Record<MentionResolution['status'], true> = {
    current: true,
    unavailable: true,
    unknown: true,
};

/**
 * A resolver written in JS can answer anything: only an object with a known status is a resolution.
 */
const isResolution = (answer: unknown): answer is MentionResolution =>
    typeof answer === 'object' &&
    answer !== null &&
    'status' in answer &&
    typeof answer.status === 'string' &&
    Object.prototype.hasOwnProperty.call(RESOLUTION_STATUSES, answer.status);

/**
 * What the app knows now about a mention: an answer with no known status means
 * it does not know, so only that mention falls back to its stored value and the
 * others still resolve. A throw from `resolve` is not caught: it is the app's
 * error, and reaches the editor's `onError` where the mention is drawn.
 */
const resolutionOf = (mention: MentionValue, resolve: MentionResolve | undefined): MentionResolution | undefined => {
    if (resolve === undefined) {
        return undefined;
    }
    const answer: unknown = resolve(mention);
    if (!isResolution(answer)) {
        warnUnknownAnswer(mention, answer);
        return { status: 'unknown' };
    }
    return answer;
};

/**
 * What a mention shows, from the stored value and what the app knows now: the
 * current username and name, or the stored ones when the person is unavailable.
 * The stored value is never changed. A throw from `resolve` or `href` is not caught.
 */
export const mentionDisplay = (
    mention: MentionValue,
    { resolve, href, trigger, labels = DEFAULT_MENTION_CONTENT_LABELS }: MentionDisplayOptions,
): MentionDisplay => {
    const resolution = resolutionOf(mention, resolve);
    const kind = storedKind(mention.kind);
    const stored = { username: storedText(mention.username), name: storedText(mention.name) };
    let shown = stored;
    switch (resolution?.status) {
        case undefined:
        case 'unknown':
            break;
        case 'current':
            shown = currentNames(stored, resolution);
            break;
        case 'unavailable':
            return {
                status: 'unavailable',
                label: labelOf(stored.username, trigger, kind, labels),
                title: stored.name,
                note: labels.unavailable,
            };
        default:
            // Unreachable: `resolutionOf` lets only known statuses through.
            throw new Error(`Unhandled mention resolution: ${JSON.stringify(resolution satisfies never)}`);
    }
    const label = labelOf(shown.username, trigger, kind, labels);
    const target = safeMentionHref(href, mention);
    if (target === undefined) {
        return { status: 'text', label, title: shown.name };
    }
    return { status: 'linked', label, title: shown.name, href: target };
};

/**
 * Where a shown mention links to: only a linked one has a target.
 */
export const linkTarget = (display: MentionDisplay): string | undefined => {
    switch (display.status) {
        case 'linked':
            return display.href;
        case 'text':
        case 'unavailable':
            return undefined;
        default:
            // Adding a display status fails to compile here until it is handled.
            throw new Error(`Unhandled mention display: ${JSON.stringify(display satisfies never)}`);
    }
};
