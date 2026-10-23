/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Snapshot } from '#/persistence/types';
import { textOf } from '#/react/examples/records';

/** What the host of a probe hears: each submitted snapshot's text, and each keydown with whether it arrived prevented. */
export const heard = { submitted: [] as string[], keys: [] as (readonly [string, boolean])[] };

// A host listener on the document, which hears each key after the editor's own handlers.
document.addEventListener('keydown', (event) => {
    heard.keys.push([event.key, event.defaultPrevented]);
});

/** Records the text of a submitted snapshot, one line per block. */
export const recordSubmit = (snapshot: Snapshot) => {
    heard.submitted.push(textOf(snapshot.document.content));
};
