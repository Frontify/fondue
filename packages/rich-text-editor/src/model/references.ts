/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReferenceResolution } from './declarations';

/** A host's lookup of a mentioned resource's current label. */
export type ResolveReference = (resourceType: string, resourceId: string) => ReferenceResolution;

const UNKNOWN: ReferenceResolution = { status: 'unknown' };
// Bidirectional marks, embeddings, overrides and isolates, which would reorder the text around a label.
const BIDI_CONTROLS = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu;

// C0 and C1 control characters, such as the escape that starts a terminal hyperlink.
const CONTROLS = /[\u0000-\u001F\u007F-\u009F]/gu;
const UNSAFE = /[\u0000-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/u;

/** `text` without bidirectional control characters; the letters of every script stay. */
export const withoutBidiControls = (text: string): string => text.replaceAll(BIDI_CONTROLS, '');

/** A label as it is shown and written: without bidirectional and C0 and C1 control characters. */
export const shownLabel = (text: string): string => withoutBidiControls(text).replaceAll(CONTROLS, '');

/** Whether `text` holds a bidirectional or control character, which no stored ID may. */
export const holdsControls = (text: string): boolean => UNSAFE.test(text);

/** `resolve`, or none, as a resolver that gives `unknown` where it has none or throws, for that call only. */
export const resolvingSafely =
    (resolve: ResolveReference | undefined): ResolveReference =>
    (resourceType, resourceId) => {
        if (resolve === undefined) {
            return UNKNOWN;
        }
        try {
            return resolve(resourceType, resourceId);
        } catch {
            return UNKNOWN;
        }
    };
