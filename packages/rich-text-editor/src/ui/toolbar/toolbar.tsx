/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, Tooltip, useFondueTheme } from '@frontify/fondue-components';
import { IconCheckMark, IconDotsHorizontal, icons } from '@frontify/fondue-icons';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type ComponentType, type MutableRefObject, type RefObject, useContext, useId, useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext, useCommandQuery } from '#/bridge/hooks';
import { type JsonValue } from '#/model';
import { type EditorRuntime } from '#/runtime/runtime';
import { ariaShortcut, bindingHere, shortcutText, useApplePlatform } from '#/ui/shortcuts';

import styles from './styles/toolbar.module.scss';

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

const Icon = ({ name }: { readonly name: string }) => {
    const Found = ICONS[name];
    if (Found === undefined) {
        return null;
    }
    return <Found size={20} aria-hidden />;
};

/**
 * Runs an item's command through the one registered definition, as keys and input rules do. A press that took focus
 * from a composition ended it, so the command then runs once input has settled (SPEC-rich-text-runtime/AC-032, AC-037).
 */
const runItem = async (runtime: EditorRuntime, { command, payload }: ToolbarItem): Promise<void> => {
    if (runtime.handle.getSnapshot().compositionActive) {
        await runtime.handle.enqueue(command, payload);
        return;
    }
    runtime.handle.execute(command, payload);
};

/** The item's shortcut as its tooltip or menu row shows it and as `aria-keyshortcuts`, on the author's platform. */
const useShortcut = ({ bindings }: ToolbarItem) => {
    const apple = useApplePlatform();
    const binding = bindingHere(bindings, apple);
    if (binding === undefined) {
        return { shortcut: undefined, keyshortcuts: undefined };
    }
    return { shortcut: shortcutText(binding, apple), keyshortcuts: ariaShortcut(binding, apple) };
};

const Item = ({
    item,
    disabled,
    strings,
}: {
    readonly item: ToolbarItem;
    readonly disabled: boolean;
    readonly strings: ToolbarStrings;
}) => {
    const runtime = useContext(SessionContext);
    const state = useCommandQuery(item.command, item.payload);
    let pressed: boolean | 'mixed' | undefined;
    if (item.toggle) {
        pressed = state.active;
    }
    // A command the editor cannot run now keeps its item focusable, with the reason in the tooltip (SPEC-rich-text-react/AC-038).
    let unavailable: true | undefined;
    let reason: string | undefined;
    if (!disabled && !state.enabled) {
        unavailable = true;
        reason = strings.reason(state.disabledReason ?? '');
    }
    const { shortcut, keyshortcuts } = useShortcut(item);
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <RadixToolbar.Button
                    type="button"
                    className={styles.item}
                    aria-label={item.label}
                    aria-pressed={pressed}
                    aria-keyshortcuts={keyshortcuts}
                    aria-disabled={unavailable}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onClick={async (event) => {
                        const button = event.currentTarget;
                        if (runtime === undefined || unavailable) {
                            return;
                        }
                        await runItem(runtime, item);
                        // Focus returns to the surface unless the author moved it meanwhile; Firefox and Safari on macOS leave
                        // a click's focus on the toolbar or the body (SPEC-rich-text-react/AC-036).
                        const { activeElement, body } = button.ownerDocument;
                        const toolbar = button.closest('[role="toolbar"]');
                        if (activeElement === body || (toolbar !== null && toolbar.contains(activeElement))) {
                            runtime.handle.focus();
                        }
                    }}
                >
                    <Icon name={item.icon} />
                </RadixToolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact">
                <span className={styles.tooltip}>
                    <span data-rte-tooltip-label="">{item.label}</span>
                    {shortcut !== undefined && <kbd>{shortcut}</kbd>}
                </span>
                {reason !== undefined && <span className={styles.reason}>{reason}</span>}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};

const MoreRow = ({
    item,
    strings,
    onRun,
}: {
    readonly item: ToolbarItem;
    readonly strings: ToolbarStrings;
    readonly onRun: (item: ToolbarItem) => Promise<void>;
}) => {
    const state = useCommandQuery(item.command, item.payload);
    const { shortcut, keyshortcuts } = useShortcut(item);
    const reasonId = useId();
    // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes through the spread.
    const semantics: Record<string, unknown> = { role: 'menuitemcheckbox', 'aria-checked': state.active };
    if (!item.toggle) {
        semantics.role = 'menuitem';
        semantics['aria-checked'] = undefined;
    }
    // An unavailable row stays focusable with its reason, as a toolbar item does (SPEC-rich-text-react/AC-038).
    let reason: string | undefined;
    if (!state.enabled) {
        reason = strings.reason(state.disabledReason ?? '');
        semantics['aria-disabled'] = true;
        semantics['aria-describedby'] = reasonId;
    }
    return (
        <Dropdown.Item
            {...semantics}
            aria-keyshortcuts={keyshortcuts}
            onSelect={async (event) => {
                if (reason !== undefined) {
                    event.preventDefault();
                    return;
                }
                await onRun(item);
            }}
        >
            <Dropdown.Slot name="left">
                <Icon name={item.icon} />
            </Dropdown.Slot>
            {item.label}
            {/* SPEC-rich-text-accessibility/AC-006: a check mark, not only a colour, shows a checked toggle. */}
            {state.active !== false && (
                <Dropdown.Slot name="right">
                    <IconCheckMark size={16} aria-hidden />
                </Dropdown.Slot>
            )}
            {shortcut !== undefined && <Dropdown.Shortcut>{shortcut}</Dropdown.Shortcut>}
            {reason !== undefined && (
                <span id={reasonId} aria-hidden className={styles.reason}>
                    {reason}
                </span>
            )}
        </Dropdown.Item>
    );
};

/** The items that do not fit move into More, from the end (SPEC-rich-text-react/AC-040). */
const More = ({
    items,
    strings,
    disabled,
}: {
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    readonly disabled: boolean;
}) => {
    const runtime = useContext(SessionContext);
    // A row that ran its command sends focus to the surface rather than back to More (SPEC-rich-text-react, Overlay focus).
    const ranRef = useRef(false);
    // Radix opens a menu on pointer down; More opens on the click, so a press dragged away opens nothing (SPEC-rich-text-accessibility/AC-026).
    const [open, setOpen] = useState(false);
    const pointerRef = useRef(false);
    const openAtPressRef = useRef(false);
    const onRun = async (item: ToolbarItem) => {
        if (runtime === undefined) {
            return;
        }
        ranRef.current = true;
        await runItem(runtime, item);
        runtime.handle.focus();
    };
    return (
        <Dropdown.Root
            open={open}
            onOpenChange={(next) => {
                if (!next || !pointerRef.current) {
                    setOpen(next);
                }
            }}
        >
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Dropdown.Trigger asChild>
                        <RadixToolbar.Button
                            type="button"
                            className={styles.item}
                            aria-label={strings.more}
                            disabled={disabled}
                            data-rte-toolbar-more=""
                            onPointerDown={() => {
                                pointerRef.current = true;
                                openAtPressRef.current = open;
                            }}
                            onKeyDown={() => {
                                pointerRef.current = false;
                            }}
                            onClick={() => {
                                if (pointerRef.current && !openAtPressRef.current) {
                                    setOpen(true);
                                }
                            }}
                        >
                            <IconDotsHorizontal size={20} aria-hidden />
                        </RadixToolbar.Button>
                    </Dropdown.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content padding="compact">
                    <span data-rte-tooltip-label="">{strings.more}</span>
                </Tooltip.Content>
            </Tooltip.Root>
            <Dropdown.Content
                onCloseAutoFocus={(event) => {
                    if (ranRef.current) {
                        event.preventDefault();
                        ranRef.current = false;
                    }
                }}
            >
                {items.map((item) => (
                    <MoreRow key={item.key} item={item} strings={strings} onRun={onRun} />
                ))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

/** The inline-end edge of each item, measured from the toolbar's inline-start edge while every item shows. */
const inlineEnds = (root: HTMLElement, rtl: boolean): number[] => {
    const box = root.getBoundingClientRect();
    return [...root.querySelectorAll('[data-rte-toolbar-item]')].map((item) => {
        const rect = item.getBoundingClientRect();
        if (rtl) {
            return box.right - rect.left;
        }
        return rect.right - box.left;
    });
};

interface Fitting {
    readonly itemsKey: string;
    readonly shown: number;
}

/** How many of `count` items fit before More, measured whenever the item set changes and fitted again on each resize. */
const useFitting = (root: RefObject<HTMLDivElement | null>, count: number, itemsKey: string): number => {
    const [fitting, setFitting] = useState<Fitting>({ itemsKey, shown: count });
    const endsRef = useRef<readonly number[]>([]);
    const moreSizeRef = useRef(0);
    // A refit that moves the focused item into More sends focus to More, not to the body.
    const focusMoreRef = useRef(false);
    // A new item set shows every item once, so the layout effect measures them all.
    let { shown } = fitting;
    if (fitting.itemsKey !== itemsKey) {
        shown = count;
        setFitting({ itemsKey, shown });
    }
    useClientLayoutEffect(() => {
        const element = root.current;
        if (element === null) {
            return undefined;
        }
        const style = getComputedStyle(element);
        const ends = inlineEnds(element, style.direction === 'rtl');
        if (ends.length === count) {
            endsRef.current = ends;
        }
        const fit = () => {
            const measured = endsRef.current;
            const gap = Number.parseFloat(style.columnGap) || 0;
            // More is as wide as an item, and only shows once something overflows.
            const sample = element.querySelector('[data-rte-toolbar-more], [data-rte-toolbar-item]');
            if (sample !== null) {
                moreSizeRef.current = gap + sample.getBoundingClientRect().width;
            }
            const limit = element.getBoundingClientRect().width - Number.parseFloat(style.paddingInlineEnd);
            let next = 0;
            while (next < measured.length) {
                let needed = measured[next] ?? 0;
                if (next < measured.length - 1) {
                    needed += moreSizeRef.current;
                }
                // Subpixel layout rounds an exact fit either way.
                if (needed > limit + 0.5) {
                    break;
                }
                next += 1;
            }
            const focused = [...element.querySelectorAll('[data-rte-toolbar-item]')].indexOf(
                element.ownerDocument.activeElement as Element,
            );
            if (focused >= next) {
                focusMoreRef.current = true;
            }
            // Only the rendered items tell what fits, so the layout effect measures them before paint.
            // oxlint-disable-next-line @eslint-react/set-state-in-effect -- the state is the measured layout.
            setFitting((previous) => {
                if (previous.itemsKey === itemsKey && previous.shown === next) {
                    return previous;
                }
                return { itemsKey, shown: next };
            });
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(element);
        return () => observer.disconnect();
    }, [root, count, itemsKey]);
    useClientLayoutEffect(() => {
        if (!focusMoreRef.current) {
            return;
        }
        focusMoreRef.current = false;
        const more = root.current?.querySelector<HTMLElement>('[data-rte-toolbar-more]');
        if (more !== null && more !== undefined) {
            more.focus();
        }
    }, [root, shown]);
    return shown;
};

/**
 * The fixed toolbar on Radix Toolbar: one Tab stop whose items arrow, Home and End move between, in visual order under
 * `rtl` (SPEC-rich-text-react/AC-032, AC-033).
 */
export const FixedToolbar = ({
    items,
    strings,
    disabled,
    surfaceId,
    shortcut,
    testId,
    toolbarRef,
}: {
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    /** The editor is `disabled`: every item is disabled and the toolbar leaves the Tab order (SPEC-rich-text-react/AC-029). */
    readonly disabled: boolean;
    readonly surfaceId: string;
    /** The package key binding that moves focus here (SPEC-rich-text-react/AC-079). */
    readonly shortcut: string;
    readonly testId: string;
    /** The toolbar element, which Alt+F10 focuses (SPEC-rich-text-react/AC-034). */
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
}) => {
    const { dir } = useFondueTheme();
    const apple = useApplePlatform();
    const itemsKey = items.map(({ key }) => key).join(' ');
    const shown = useFitting(toolbarRef, items.length, itemsKey);
    return (
        <RadixToolbar.Root
            ref={toolbarRef}
            className={styles.root}
            dir={dir}
            aria-label={strings.label}
            aria-controls={surfaceId}
            aria-keyshortcuts={ariaShortcut(shortcut, apple)}
            data-test-id={`${testId}-toolbar`}
        >
            {items.slice(0, shown).map((item) => (
                <Item key={item.key} item={item} disabled={disabled} strings={strings} />
            ))}
            {shown < items.length && <More items={items.slice(shown)} strings={strings} disabled={disabled} />}
        </RadixToolbar.Root>
    );
};
