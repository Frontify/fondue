/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-095: tests read no `input` or `domObserver` of the editor view either.
declare const view: { readonly input: unknown; readonly domObserver: unknown };

export const internals = [
    // expect-lint: rte-style(no-view-internals)
    view.input,
    // expect-lint: rte-style(no-view-internals)
    view.domObserver,
];
