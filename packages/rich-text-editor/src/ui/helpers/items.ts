/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type ToolbarControlProps } from '#/bridge/pluginApi/plugin';
import { type JsonValue } from '#/model';
import { type EditorPort, endCompositionOf, selectedNodeNames } from '#/runtime/port';

/** One command of the presentation's toolbar, with the registry's label and icon unless `controls` replaced them. */
export type ToolbarItem = {
    /** The command and its payload, unique within one toolbar. */
    key: string;
    command: string;
    payload: JsonValue | undefined;
    /** A mark or block type toggle, which exposes `aria-pressed`. */
    toggle: boolean;
    label: string;
    /** A Fondue icon name. */
    icon: string;
    /** The compiled key bindings that run the command, of which the first for the platform shows. */
    bindings: readonly string[];
    /** Whether the item opens a presentation group, which a wider gap sets apart. */
    groupStart: boolean;
    /** Whether its group toggles a mark, which the bubble toolbar shows. */
    bubble: boolean;
    /** The rows of the text style picker, which the item is; a row it does not offer only names the active block type. */
    options?: readonly (ToolbarItem & { offered: boolean })[];
    /** Its command opens an overlay, which a More row runs only once the menu has closed. */
    opensControl?: boolean;
    /** The id of the panel the item toggles, so it shows pressed while that panel is open. */
    control?: string;
    /** A plugin's own control, which renders in place of the standard button. */
    component?: ComponentType<ToolbarControlProps>;
    /** The heading of the text style picker's brand style rows. */
    groupLabel?: string;
    /** A brand style row of the text style picker: the block types it applies to and the font it previews. */
    brand?: {
        /** The block types the style applies to. */
        appliesTo: readonly string[];
        /** The CSS properties that preview the style's font. */
        preview: Readonly<Record<string, string>>;
    };
    /** The node type a menu row acts on, which it shows only while such a node is selected or holds the caret. */
    node?: string;
};

/** The rows of `items` the selection offers: a node row only while its node type is selected and its command runs. */
export const offeredRows = (items: readonly ToolbarItem[], session: EditorPort | undefined): readonly ToolbarItem[] => {
    const types = selectedNodeNames(session);

    return items.filter(
        ({ node, command, payload }) =>
            node === undefined || (types.includes(node) && session?.handle.query(command, payload).enabled === true),
    );
};

/** The toolbar's own strings in the UI locale. */
export type ToolbarStrings = {
    /** The toolbar's accessible name. */
    label: string;
    /** The name of the More button. */
    more: string;
    /** Why a command cannot run, from its `disabledReason`. */
    reason: (code: string) => string;
};

/**
 * Runs an item's command through the one registered definition, as keys and input rules do. A press that took focus
 * from a composition ended it, and one that `keptFocus` in the surface ends it here, so the command then runs once
 * input has settled.
 */
export const runItem = async (
    runtime: EditorPort,
    { command, payload }: ToolbarItem,
    keptFocus: boolean,
): Promise<void> => {
    if (runtime.handle.getSnapshot().compositionActive) {
        if (keptFocus) {
            endCompositionOf(runtime);
        }

        await runtime.handle.enqueue(command, payload);

        return;
    }

    runtime.handle.execute(command, payload);
};

/**
 * Returns focus to the surface unless the author moved it elsewhere meanwhile: it may still sit on the control, on the
 * body where Firefox and Safari on macOS leave a click's focus, or inside one of `within`.
 */
export const returnFocus = (runtime: EditorPort, within: readonly (Element | null)[]): void => {
    const { activeElement, body } = document;
    if (activeElement === body || within.some((element) => element !== null && element.contains(activeElement))) {
        runtime.handle.focus();
    }
};

/** Runs `item` from its toolbar `control`, then returns focus to the surface unless the command moved it elsewhere. */
export const pressItem = async (
    runtime: EditorPort,
    item: ToolbarItem,
    control: HTMLElement,
    keepsFocus: boolean,
): Promise<void> => {
    // A control returns focus to its opener, which a click on macOS Safari or Firefox never focuses.
    if (item.opensControl === true && !keepsFocus) {
        control.focus();
    }

    await runItem(runtime, item, keepsFocus);
    returnFocus(runtime, [control.closest('[role="toolbar"]')]);
};

/**
 * Radix Toolbar sets each item's roving `tabIndex` unless a prop replaces it, so only an item out of the Tab order
 * passes one.
 */
export const tabStop = (outOfTabOrder: boolean): { tabIndex?: number } => {
    if (outOfTabOrder) {
        return { tabIndex: -1 };
    }

    return {};
};
