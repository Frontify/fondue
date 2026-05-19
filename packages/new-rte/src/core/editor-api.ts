/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FrontifyBlock,
    type FrontifyDocument,
    type FrontifyInline,
    type FrontifySelection,
    type LinkInline,
} from './document';

/**
 * The API exposed to plugins. This is the seam that hides the engine. If
 * the engine is swapped, this interface stays stable; only the adapter
 * changes. Plugin code never imports from the engine, only from this
 * module.
 */
export type EditorControlApi = {
    toggleMark(key: string, value?: unknown): void;
    isMarkActive(key: string): boolean;
    removeAllMarks(): void;

    setBlockType(type: string, attrs?: Record<string, unknown>): void;
    isBlockActive(type: string, attrs?: Record<string, unknown>): boolean;
    getCurrentBlock(): FrontifyBlock | null;

    insertInline(node: FrontifyInline): void;
    wrapSelection(inline: Omit<LinkInline, 'children'>): void;
    unwrapInline(type: string): void;

    getSelection(): FrontifySelection | null;
    setSelection(selection: FrontifySelection): void;
    isSelectionCollapsed(): boolean;
    isSelectionAcrossBlocks(): boolean;

    getDocument(): FrontifyDocument;
    replaceDocument(doc: FrontifyDocument): void;

    focus(): void;
    blur(): void;

    events: PluginEventBus;
};

export type PluginEventBus = {
    on(event: string, handler: (payload?: unknown) => void): () => void;
    emit(event: string, payload?: unknown): void;
};

export const createPluginEventBus = (): PluginEventBus => {
    const handlers = new Map<string, Set<(payload?: unknown) => void>>();
    return {
        on(event, handler) {
            let set = handlers.get(event);
            if (!set) {
                set = new Set();
                handlers.set(event, set);
            }
            set.add(handler);
            return () => set?.delete(handler);
        },
        emit(event, payload) {
            const set = handlers.get(event);
            if (!set) {
                return;
            }
            for (const handler of set) {
                handler(payload);
            }
        },
    };
};
