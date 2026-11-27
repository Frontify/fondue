/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteInlineNode } from '../../core';
import { type RteDocument } from '../../index';

// Inlines a plugin set the test mounts does not define, as another plugin or a newer version stored them.
// The stored JSON is not validated, so each is cast from `unknown`.

/** Keeps its text in a child run and carries keys no plugin declares. */
export const UNKNOWN_WITH_EXTRA_KEYS = {
    type: 'externalLink',
    url: 'https://example.com',
    target: '_blank',
    children: [{ text: 'Read more' }],
} as unknown as RteInlineNode;

/** Wraps an inline that a plugin set holding `mentionPlugin` does define. */
export const UNKNOWN_AROUND_MENTION = {
    type: 'externalLink',
    url: 'https://example.com',
    children: [{ type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' }],
} as unknown as RteInlineNode;

/** Keeps a child that is not an object beside its text run. */
export const UNKNOWN_WITH_NULL_CHILD = {
    type: 'externalLink',
    children: [null, { text: 'Read more' }],
} as unknown as RteInlineNode;

/** Keeps its text on itself, with no children. */
export const UNKNOWN_WITH_TEXT = {
    type: 'widget',
    text: 'Fallback text',
} as unknown as RteInlineNode;

export const UNKNOWN_INLINE_CASES = [
    ['text in its children', UNKNOWN_WITH_EXTRA_KEYS, 'Read more'],
    ['a known inline in its children', UNKNOWN_AROUND_MENTION, '@jane'],
    ['text of its own', UNKNOWN_WITH_TEXT, 'Fallback text'],
] as const;

export const documentWith = (inline: RteInlineNode): RteDocument => {
    const stored = {
        version: 1,
        blocks: [{ type: 'paragraph', children: [{ text: 'Before ' }, inline, { text: ' after' }] }],
    };

    // A host passes stored JSON as the official document, unknown inlines included.
    return stored as RteDocument;
};
