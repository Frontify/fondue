/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type EditorControlApi,
    PARAGRAPH,
    type RtePlugin,
    type RteSelectionSnapshot,
    type SelectedNode,
    type ToolbarItemProps,
} from '#/core';

/**
 * What a plugin's `toolbarItem` is handed, composed from the control API — so it holds for any engine.
 */

/** The type a plugin's toolbar item is about: the first one it declares. */
type OwnType =
    | { kind: 'mark'; type: string }
    | { kind: 'list'; type: string }
    | { kind: 'textBlock'; type: string }
    | { kind: 'voidBlock'; type: string }
    | { kind: 'none' };

const ownTypeOf = (plugin: RtePlugin): OwnType => {
    const mark = Object.keys(plugin.marks ?? {})[0];
    if (mark !== undefined) {
        return { kind: 'mark', type: mark };
    }
    const [type, block] = Object.entries(plugin.blocks ?? {})[0] ?? [];
    if (type === undefined || block === undefined) {
        return { kind: 'none' };
    }
    if (block.content === undefined) {
        return { kind: 'voidBlock', type };
    }
    if (block.content !== 'text' && 'items' in block.content) {
        return { kind: 'list', type };
    }
    return { kind: 'textBlock', type };
};

const attributesOf = (block: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(block).filter(([name]) => name !== 'type' && name !== 'children'));

const selectedNodeOf = (own: OwnType, api: EditorControlApi, selection: RteSelectionSnapshot): SelectedNode | null => {
    if (own.kind === 'mark') {
        const run = api.marks.getRun(own.type);
        return run === null ? null : { type: own.type, value: run.value, text: run.text };
    }
    if (own.kind === 'none') {
        return null;
    }
    // Innermost first, so a list nested in a list finds the inner one.
    const block = selection.blocks.find((candidate) => candidate.type === own.type);
    return block ? { type: own.type, value: attributesOf(block), text: selection.text } : null;
};

/** Grow a caret to the whole run, then clear the mark — what re-setting and removing both start with. */
const clearMark = (api: EditorControlApi, type: string): void => {
    api.marks.select(type);
    if (type in api.selection.get().marks) {
        api.marks.toggle(type);
    }
};

export const toolbarItemProps = (
    plugin: RtePlugin,
    api: EditorControlApi,
    selection: RteSelectionSnapshot,
): ToolbarItemProps => {
    const own = ownTypeOf(plugin);
    const selectedNode = selectedNodeOf(own, api, selection);
    const isActive = own.kind === 'mark' ? own.type in selection.marks : selectedNode !== null;

    const toggle = (value?: Record<string, unknown>): void => {
        switch (own.kind) {
            case 'mark':
                api.marks.toggle(own.type, value);
                break;
            case 'list':
                api.lists.toggle(own.type);
                break;
            case 'textBlock':
                api.blocks.setType(isActive ? PARAGRAPH : own.type, value);
                break;
            case 'voidBlock':
                api.insert(own.type, value);
                break;
            case 'none':
                break;
        }
    };

    return {
        api,
        selectedNode,
        selection,
        isActive,
        toggle,
        setValue: (value) => {
            if (own.kind === 'mark') {
                clearMark(api, own.type);
                api.marks.toggle(own.type, value);
            } else {
                api.blocks.updateAttributes(value);
            }
        },
        setText: (text) => {
            if (own.kind === 'mark') {
                api.marks.select(own.type);
            }
            api.selection.replaceWithText(text);
        },
        remove: () => {
            if (own.kind === 'mark') {
                clearMark(api, own.type);
            } else if (isActive && (own.kind === 'list' || own.kind === 'textBlock')) {
                toggle();
            }
        },
        openEditor: () => {
            if (own.kind !== 'none') {
                api.editors.open(own.type);
            }
        },
    };
};
