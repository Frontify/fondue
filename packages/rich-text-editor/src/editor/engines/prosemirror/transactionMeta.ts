/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Transaction meta marking a change that came from the host, not the user. */
export const HOST_DOC = 'rte-host-doc';

/** Transaction meta prosemirror-history reads: `false` keeps the change out of the undo history. */
export const ADD_TO_HISTORY = 'addToHistory';

/** Transaction meta prosemirror-state sets on a transaction a plugin appended, holding the one it follows. */
export const APPENDED_TRANSACTION = 'appendedTransaction';
