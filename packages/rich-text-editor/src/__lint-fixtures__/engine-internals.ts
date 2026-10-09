/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-095: a public export of `prosemirror-tables` passes; no read of the view's `input` or `domObserver`.
import { tableEditing } from 'prosemirror-tables';

type View = { readonly input: unknown; readonly domObserver: unknown; readonly composing: boolean };
declare const view: View;
declare const attached: View;
declare const runtime: { readonly view: View };
declare const name: 'composing';

const alias = attached;
// expect-lint: rte-style(no-view-internals)
const { input } = view;
// expect-lint: rte-style(no-view-internals)
const { domObserver: observer } = runtime.view;

export const internals = [
    tableEditing,
    view.composing,
    view[name],
    input,
    observer,
    // expect-lint: rte-style(no-view-internals)
    view.input,
    // expect-lint: rte-style(no-view-internals)
    view.domObserver,
    // expect-lint: rte-style(no-view-internals)
    attached.input,
    // expect-lint: rte-style(no-view-internals)
    runtime.view.input,
    // expect-lint: rte-style(no-view-internals)
    alias.input,
    // expect-lint: rte-style(no-view-internals)
    // expect-lint: typescript(dot-notation)
    view['input'],
];
