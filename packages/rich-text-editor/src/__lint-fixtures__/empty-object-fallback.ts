/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-086: destructuring from an empty-object fallback fails, an `if` test passes.
type Options = { readonly label?: string };

export const nullish = (options: Options | undefined) => {
    // expect-lint: rte-style(no-empty-object-fallback)
    const { label } = options ?? {};
    return label;
};

export const or = (options: Options | null) => {
    // expect-lint: rte-style(no-empty-object-fallback)
    const { label } = options || {};
    return label;
};

// expect-lint: rte-style(no-empty-object-fallback)
export function withDefault({ label }: Options = {}) {
    return label;
}

export const tested = (options: Options | undefined) => {
    if (options === undefined) {
        return undefined;
    }
    const { label } = options;
    return label;
};
