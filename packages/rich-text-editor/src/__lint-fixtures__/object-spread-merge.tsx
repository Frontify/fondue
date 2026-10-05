/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-087: merging objects fails; one spread with named fields, JSX, rest, array and call spreads pass.
import { type ComponentProps } from 'react';

declare const first: { readonly a: number };
declare const second: { readonly b: number };
declare const node: { readonly attrs: { readonly level: number } };
declare const documentFeatures: readonly string[];
declare const align: string;
declare const record: (...values: number[]) => number;
declare const args: number[];

// expect-lint: rte-style(no-object-spread-merge)
export const spread = { ...first, ...second };
// expect-lint: rte-style(no-object-spread-merge)
export const assigned = Object.assign({}, first, second);

export const withAlign = { ...node.attrs, align };
export const Element = ({ title, ...rest }: ComponentProps<'span'>) => <span title={title} {...rest} />;
export const features = [...documentFeatures, 'marks.strike'];
export const total = record(...args);
