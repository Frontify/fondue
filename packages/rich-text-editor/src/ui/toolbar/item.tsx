/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';
import { type ComponentType } from 'react';

import { endComposition } from '#/bridge/chrome-view';
import { type JsonValue } from '#/model';
import { type EditorRuntime } from '#/runtime/runtime';
import { ariaShortcut, bindingHere, shortcutText, useApplePlatform } from '#/ui/shortcuts';

/** One command of the presentation's toolbar, with the registry's label and icon unless `controls` replaced them. */
export interface ToolbarItem {
    /** The command and its payload, unique within one toolbar. */
    readonly key: string;
    readonly command: string;
    readonly payload: JsonValue | undefined;
    /** A mark or block type toggle, which exposes `aria-pressed` (SPEC-rich-text-react/AC-037). */
    readonly toggle: boolean;
    readonly label: string;
    /** A Fondue icon name. */
    readonly icon: string;
    /** The compiled key bindings that run the command, of which the first for the platform shows (SPEC-rich-text-react/AC-039). */
    readonly bindings: readonly string[];
    /** Whether the item opens a presentation group, which a wider gap sets apart. */
    readonly groupStart: boolean;
    /** Whether its group toggles a mark, which the bubble toolbar shows (SPEC-rich-text-react, Default toolbars). */
    readonly bubble: boolean;
    /** The rows of the text style picker, which the item is; a row it does not offer only names the active block type. */
    readonly options?: readonly (ToolbarItem & { readonly offered: boolean })[];
}

export interface ToolbarStrings {
    readonly label: string;
    readonly more: string;
    /** Why a command cannot run, from its `disabledReason` (SPEC-rich-text-react/AC-038). */
    readonly reason: (code: string) => string;
}

const ICONS = icons as Readonly<
    Record<string, ComponentType<{ readonly size?: 16 | 20; readonly 'aria-hidden'?: boolean }>>
>;

export const Icon = ({ name }: { readonly name: string }) => {
    const Found = ICONS[name];
    if (Found === undefined) {
        return null;
    }
    return <Found size={20} aria-hidden />;
};

/**
 * Runs an item's command through the one registered definition, as keys and input rules do. A press that took focus
 * from a composition ended it, and one that `keptFocus` in the surface ends it here, so the command then runs once
 * input has settled (SPEC-rich-text-runtime/AC-032, AC-037, SPEC-rich-text-react/AC-096).
 */
export const runItem = async (
    runtime: EditorRuntime,
    { command, payload }: ToolbarItem,
    keptFocus: boolean,
): Promise<void> => {
    if (runtime.handle.getSnapshot().compositionActive) {
        if (keptFocus) {
            endComposition(runtime.view);
        }
        await runtime.handle.enqueue(command, payload);
        return;
    }
    runtime.handle.execute(command, payload);
};

/**
 * Returns focus to the surface unless the author moved it elsewhere meanwhile: it may still sit on the control, on the
 * body where Firefox and Safari on macOS leave a click's focus, or inside one of `within` (SPEC-rich-text-react/AC-036).
 */
export const returnFocus = (runtime: EditorRuntime, within: readonly (Element | null)[]): void => {
    const { activeElement, body } = document;
    if (activeElement === body || within.some((element) => element !== null && element.contains(activeElement))) {
        runtime.handle.focus();
    }
};

/** Radix Toolbar sets each item's roving `tabIndex` unless a prop replaces it, so only an item out of the Tab order passes one. */
export const tabStop = (outOfTabOrder: boolean): { readonly tabIndex?: number } => {
    if (outOfTabOrder) {
        return { tabIndex: -1 };
    }
    return {};
};

/**
 * A press that keeps focus and the on-screen keyboard in the surface (SPEC-rich-text-accessibility/AC-027). It
 * prevents the `mousedown` that moves focus, since WebKit drops the click of a touch whose `pointerdown` was prevented.
 */
export const keepFocus = (event: { preventDefault(): void }): void => event.preventDefault();

/** The item's shortcut as its tooltip or menu row shows it and as `aria-keyshortcuts`, on the author's platform. */
export const useShortcut = ({ bindings }: ToolbarItem) => {
    const apple = useApplePlatform();
    const binding = bindingHere(bindings, apple);
    if (binding === undefined) {
        return { shortcut: undefined, keyshortcuts: undefined };
    }
    return { shortcut: shortcutText(binding, apple), keyshortcuts: ariaShortcut(binding, apple) };
};
