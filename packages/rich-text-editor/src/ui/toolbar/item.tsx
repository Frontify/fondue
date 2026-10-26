/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';
import { type ComponentType } from 'react';

import { useApplePlatform } from '#/bridge/platform';
import { type ToolbarControlProps } from '#/bridge/plugin';
import { useSessionValue } from '#/bridge/session';
import { type JsonValue } from '#/model';
import { keyOn } from '#/model/internal';
import { type EditorPort, endCompositionOf, selectedNodeNames } from '#/runtime/port';
import { ariaShortcut, bindingHere, shortcutText } from '#/ui/helpers/shortcuts';

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
        appliesTo: readonly string[];
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

const sameRows = (previous: readonly ToolbarItem[], next: readonly ToolbarItem[]) =>
    previous.length === next.length && previous.every((row, index) => row === next[index]);

/** The rows of `items` the session's selection offers now, kept up to date as it changes. */
export const useOfferedRows = (items: readonly ToolbarItem[]): readonly ToolbarItem[] =>
    useSessionValue((session) => offeredRows(items, session), sameRows);

export type ToolbarStrings = {
    label: string;
    more: string;
    /** Why a command cannot run, from its `disabledReason`. */
    reason: (code: string) => string;
};

const ICONS = icons as Readonly<Record<string, ComponentType<{ size?: 16 | 20; 'aria-hidden'?: boolean }>>>;

export const Icon = ({ name }: { name: string }) => {
    const Found = ICONS[name];
    if (Found === undefined) {
        return null;
    }

    return <Found size={20} aria-hidden />;
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

/** Radix Toolbar sets each item's roving `tabIndex` unless a prop replaces it, so only an item out of the Tab order passes one. */
export const tabStop = (outOfTabOrder: boolean): { tabIndex?: number } => {
    if (outOfTabOrder) {
        return { tabIndex: -1 };
    }

    return {};
};

/** The item's shortcut as its tooltip or menu row shows it and as `aria-keyshortcuts`, on the author's platform. */
export const useShortcut = ({ bindings }: ToolbarItem) => {
    const apple = useApplePlatform();
    const behavior = useSessionValue((runtime) => runtime?.policy.enterBehavior, Object.is);
    // Shift+Enter runs as Enter while Enter submits, and the policy can change after the keymap compiles.
    const binding = bindingHere(
        bindings.filter((candidate) => behavior !== 'submit' || keyOn(candidate, apple) !== 'Shift-Enter'),
        apple,
    );
    if (binding === undefined) {
        return { shortcut: undefined, keyshortcuts: undefined };
    }

    return { shortcut: shortcutText(binding, apple), keyshortcuts: ariaShortcut(binding, apple) };
};
