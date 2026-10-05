/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-085: a chained and a nested ternary fail, a single one passes.
declare const level: number;
declare const strong: boolean;

// expect-lint: eslint(no-nested-ternary)
export const chained = level === 1 ? 'h1' : level === 2 ? 'h2' : 'p';
// expect-lint: eslint(no-nested-ternary)
export const nested = level > 0 ? (strong ? 'strong' : 'em') : 'span';
export const single = strong ? 'strong' : 'span';
