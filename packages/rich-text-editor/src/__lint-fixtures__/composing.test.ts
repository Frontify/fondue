/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-quality/AC-012: tests never set `composing`.
declare const view: { composing: boolean };

export const fakeComposition = () => {
    // expect-lint: rte-style(no-composing-assignment)
    view.composing = true;
    // expect-lint: rte-style(no-composing-assignment)
    Object.defineProperty(view, 'composing', { value: true });
};
