/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-011: one half of a two-file cycle.
// expect-lint: import(no-cycle)
import { cycleB } from './cycle-b';

export const cycleA = (): string => cycleB();
