/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-088: two of `?.` and `??` in one full expression fail; one, or one per callback, passes.
type Item = { readonly label?: string; readonly child?: Item };

declare const a: Item | undefined;
declare const b: string | undefined;
declare const c: string;
declare const d: string | undefined;
declare const list: readonly (Item | undefined)[];

// expect-lint: rte-style(one-optional-per-expression)
export const chain = a?.child?.label;
// expect-lint: rte-style(one-optional-per-expression)
export const chainAndNullish = a?.label ?? c;
// prettier-ignore
// expect-lint: rte-style(one-optional-per-expression)
export const twoNullish = (b ?? d) ?? c;

export const one = a?.label;
export const fallback = b ?? c;
export const labels = list.map((item) => item?.label);
