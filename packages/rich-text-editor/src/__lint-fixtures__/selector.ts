/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-react/AC-026: selectors passed to the package hooks read no geometry and dispatch nothing.
type Handle = { execute(id: string): void; enqueue(id: string): void };

declare const useEditorSelection: <T>(select: (selection: { readonly empty: boolean }) => T) => T;
declare const useEditorSummary: <T>(select: (summary: { readonly blocks: number }) => T) => T;
declare const element: HTMLElement;
declare const handle: Handle;
declare const enqueue: (id: string) => void;

export const useProbe = () => {
    const width = useEditorSelection(() => {
        // expect-lint: rte-style(no-effects-in-selector)
        return element.getBoundingClientRect().width;
    });
    const empty = useEditorSelection((selection) => {
        // expect-lint: rte-style(no-effects-in-selector)
        handle.execute('mark.bold.toggle');
        return selection.empty;
    });
    const blocks = useEditorSummary((summary) => {
        // expect-lint: rte-style(no-effects-in-selector)
        enqueue('mark.bold.toggle');
        return summary.blocks;
    });
    return { width, empty, blocks, height: element.getBoundingClientRect().height };
};
