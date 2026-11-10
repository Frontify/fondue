/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Transaction } from 'prosemirror-state';

/**
 * The one way a command changes the editor, so a group can see every transaction.
 */
export type Dispatch = (transaction: Transaction) => void;
