/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-011: the other half of a two-file cycle.
// expect-lint: import(no-cycle)
import { cycleA } from './cycle-a';

export const cycleB = (): string => typeof cycleA;
