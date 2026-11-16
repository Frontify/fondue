/* (c) Copyright Frontify Ltd., all rights reserved. */

import { warnOnce } from '#/core';

import {
    MENTION_KINDS,
    type MentionHref,
    type MentionKind,
    type MentionResolution,
    type MentionResolve,
    type MentionValue,
} from '../types';

import { safeMentionHref } from './mention';
import { MENTION_STRINGS } from './strings';
import { withoutControlCharacters } from './text';

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

/** An unknown kind or a non-string reads as none. */
export const storedKind = (value: unknown): MentionKind | undefined => MENTION_KINDS.find((known) => known === value);

/** The `data-mention-*` attributes that paste back as a mention; they carry the stored value, never the shown one. */
export const mentionAttributes = (mention: MentionValue) => ({
    'data-mention-id': storedString(mention.id),
    'data-mention-username': storedString(mention.username),
    'data-mention-name': storedString(mention.name),
    'data-mention-kind': storedKind(mention.kind),
});

const storedText = (field: unknown): string => withoutControlCharacters(storedString(field));

/** The current names; the stored ones where the current username is not text or is empty once cleaned. */
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
const unknownLabel = (kind: MentionKind | undefined): string => {
    switch (kind) {
        case undefined:
        case 'user':
            return MENTION_STRINGS.unknownPerson;
        case 'group':
            return MENTION_STRINGS.unknownGroup;
        case 'all':
            return MENTION_STRINGS.unknownMention;
        default:
            // Adding a kind fails to compile here until it is handled.
            throw new Error(`Unhandled mention kind: ${JSON.stringify(kind satisfies never)}`);
    }
};

const labelOf = (username: string, trigger: string, kind: MentionKind | undefined): string => {
    if (username === '') {
        return unknownLabel(kind);
    }
    return `${trigger}${username}`;
};

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
 * An answer with no known status means the app does not know: only that mention shows its stored value. A throw is
 * the app's error and is not caught.
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
 * What a mention shows from the stored value and what the app knows now; the stored value never changes. A throw from
 * `resolve` or `href` is not caught.
 */
export const mentionDisplay = (
    mention: MentionValue,
    { resolve, href, trigger }: MentionDisplayOptions,
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
                label: labelOf(stored.username, trigger, kind),
                title: stored.name,
                note: MENTION_STRINGS.unavailable,
            };
        default:
            // Unreachable: `resolutionOf` lets only known statuses through.
            throw new Error(`Unhandled mention resolution: ${JSON.stringify(resolution satisfies never)}`);
    }
    const label = labelOf(shown.username, trigger, kind);
    const target = safeMentionHref(href, mention);
    if (target === undefined) {
        return { status: 'text', label, title: shown.name };
    }
    return { status: 'linked', label, title: shown.name, href: target };
};

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
