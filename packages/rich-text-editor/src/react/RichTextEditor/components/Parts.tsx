/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useScopedFocus } from '#/bridge/overlays';
import { useApplePlatform } from '#/bridge/platform';
import { useSessionValue } from '#/bridge/session';
import { lazyPart } from '#/bridge/session/helpers/lazyPart';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { contentClasses } from '#/model/internal';
import { type EditorPort, isEmptyDocument } from '#/runtime/port';
import { type BubbleMore } from '#/ui/BubbleToolbar/BubbleToolbar';
import { shortcutText } from '#/ui/helpers/shortcuts';
import { usePanelController } from '#/ui/hooks/usePanelController';
import { FixedToolbar } from '#/ui/Toolbar/Toolbar';

import { panelsOf, profileOf } from '../../compile/compileEditor';
import { useRoot } from '../../session/rootContext';
import { SaveStatusText } from '../../status';
import { type CompiledEditorDefinition } from '../../types';
import { toolbarShortcutOf } from '../helpers/sessionHelpers';
import { type Chrome, DEFAULT_TEST_ID } from '../types';

import { PanelFrame } from './PanelFrame';

const BubbleToolbar = lazyPart(() => import('#/ui/BubbleToolbar/BubbleToolbar').then((loaded) => loaded.BubbleToolbar));

/** The host's class tokens the surface may add and remove: never the package's root class nor one of ProseMirror's own. */
const hostClassNames = (contentClassName: string) =>
    contentClassName
        .split(/\s+/)
        .filter((name) => name !== '' && contentClasses() !== name && !/^ProseMirror(-|$)/.test(name));

/** The surface's instruction that names the submit key and the new line key, when the editor has a submit key. */
const submitHint = (submits: boolean, definition: CompiledEditorDefinition<object>, t: Chrome['t'], apple: boolean) => {
    if (!submits) {
        return undefined;
    }

    const profile = profileOf(definition);
    const key = (binding: string) => shortcutText(binding, apple);
    if (definition.authoring.enterBehavior === 'submit' && profile === 'inline') {
        return t('RichTextEditor_submitHintSingleLine', { submit: key('Enter') });
    }

    if (definition.authoring.enterBehavior === 'submit') {
        return t('RichTextEditor_submitHint', { submit: key('Enter'), newLine: key('Shift-Enter') });
    }

    if (profile === 'comment') {
        return t('RichTextEditor_submitHint', { submit: key('Mod-Enter'), newLine: key('Enter') });
    }

    return undefined;
};

const emptiness = (runtime: EditorPort | undefined) => {
    if (runtime === undefined) {
        return undefined;
    }

    return isEmptyDocument(runtime);
};

/**
 * The editable surface: an empty container on the server and in the first client render, which the engine fills
 * after mount.
 */
export const Surface = () => {
    const { props, onFocus, onBlur, submits, mounted, coordinator, chrome } = useRoot('Surface');
    const { 'data-test-id': testId = DEFAULT_TEST_ID, spellCheck = true, placeholder, presentation } = props;
    const contentClassName = presentation?.contentClassName;
    const strikeCheckedTasks = presentation?.strikeCheckedTasks === true;
    const theme = useFondueTheme();
    // The document's language and direction, else the theme's, while the chrome keeps its own.
    let lang = mounted.lang ?? theme.lang;
    if (lang === undefined) {
        lang = chrome.lang;
    }

    const dir = mounted.dir ?? theme.dir;
    const hintId = useId();
    const hint = submitHint(submits, mounted.definition, chrome.t, useApplePlatform());
    const describedBy = [props['aria-describedby'], hint === undefined ? undefined : hintId].filter(
        (id) => id !== undefined,
    );
    // React writes the first classes only: ProseMirror adds its own to this element with `classList`, which a rewritten attribute would drop.
    const [className] = useState(() => contentClasses(contentClassName));
    const surfaceRef = useRef<HTMLElement | null>(null);
    const setSurface = useCallback(
        (element: HTMLElement | null) => {
            surfaceRef.current = element;
            coordinator.setSurface(element);
        },
        [coordinator],
    );
    // A later host class swaps in with `classList`, as ProseMirror's own class changes do.
    useClientLayoutEffect(() => {
        const surface = surfaceRef.current;
        if (surface === null || contentClassName === undefined) {
            return undefined;
        }

        const names = hostClassNames(contentClassName);
        surface.classList.add(...names);

        return () => surface.classList.remove(...names);
    }, [contentClassName]);
    // A document that is not empty shows no placeholder; before the session is ready the container is empty, as on the server.
    let shownPlaceholder = placeholder;
    if (useSessionValue(emptiness, Object.is) === false) {
        shownPlaceholder = undefined;
    }

    return (
        <>
            <div
                ref={setSurface}
                className={className}
                role="textbox"
                aria-multiline={profileOf(mounted.definition) !== 'inline'}
                aria-label={props['aria-label']}
                aria-labelledby={props['aria-labelledby']}
                aria-describedby={describedBy.length > 0 ? describedBy.join(' ') : undefined}
                aria-invalid={props.status === 'error' ? true : undefined}
                aria-errormessage={props['aria-errormessage']}
                aria-required={props.required === true ? true : undefined}
                aria-disabled={props.disabled === true ? true : undefined}
                aria-placeholder={shownPlaceholder}
                data-placeholder={placeholder}
                id={chrome.surfaceId}
                lang={lang}
                dir={dir}
                spellCheck={spellCheck}
                data-test-id={`${testId}-surface`}
                data-rte-surface=""
                data-rte-strike-checked-tasks={strikeCheckedTasks ? '' : undefined}
                // Native focus events of the surface itself, so a move into chrome or an overlay blurs it.
                onFocus={(event) => {
                    if (event.target === event.currentTarget) {
                        onFocus(event);
                    }
                }}
                onBlur={(event) => {
                    if (event.target === event.currentTarget) {
                        onBlur(event);
                    }
                }}
            />
            {hint !== undefined && (
                <span id={hintId} hidden>
                    {hint}
                </span>
            )}
        </>
    );
};

Surface.displayName = 'RichTextEditor.Surface';

/** The fixed toolbar the presentation configures; with no item, or in bubble mode, it renders nothing. */
export const Toolbar = () => {
    const { props, coordinator, chrome } = useRoot('Toolbar');
    const { disabled = false, 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    const { items, menu, strings, labels, surfaceId, toolbarRef, mode, setMode, keyboard } = chrome;
    const focus = useScopedFocus();
    // A focused editor on a touch device docks its toolbar above the on-screen keyboard.
    let docked: number | undefined;
    if (keyboard > 0 && focus !== null && !disabled) {
        docked = keyboard;
    }

    // The caret scrolls clear of the sticky or docked toolbar's measured height.
    const shown = items.length > 0 && mode === 'fixed';
    useEffect(() => {
        const element = toolbarRef.current;
        if (element === null) {
            return undefined;
        }

        const observer = new ResizeObserver(() => {
            const { height } = element.getBoundingClientRect();
            if (docked === undefined) {
                coordinator.chrome.setTopInset(height);
                coordinator.chrome.setDockedInset(0);

                return;
            }

            coordinator.chrome.setTopInset(0);
            coordinator.chrome.setDockedInset(height);
        });
        observer.observe(element);

        return () => {
            observer.disconnect();
            coordinator.chrome.setTopInset(0);
            coordinator.chrome.setDockedInset(0);
        };
    }, [toolbarRef, coordinator, shown, docked]);
    if (!shown || surfaceId === undefined) {
        return null;
    }

    return (
        <FixedToolbar
            items={items}
            menu={menu}
            strings={strings}
            disabled={disabled}
            surfaceId={surfaceId}
            shortcut={toolbarShortcutOf(props)}
            testId={testId}
            toolbarRef={toolbarRef}
            modeSwitch={{ label: labels.toBubble, onSelect: () => setMode('bubble') }}
            docked={docked}
        />
    );
};

Toolbar.displayName = 'RichTextEditor.Toolbar';

/** The bubble toolbar, with the rest of the toolbar in its More menu in bubble mode. */
export const Bubble = () => {
    const { props, chrome } = useRoot('BubbleToolbar');
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    const { items, menu, strings, labels, bubbleRef, showBubbleRef, mode, setMode } = chrome;
    const bubbleItems = useMemo(
        () =>
            items
                .filter((item) => item.bubble)
                .map((item, index) => ({ ...item, groupStart: index > 0 && item.groupStart })),
        [items],
    );
    // A request to open the toolbar made before its chunk loads waits here and runs once the loaded toolbar registers.
    const loadedShowRef = useRef<(() => void) | null>(null);
    const requestedRef = useRef(false);
    const registry = useMemo(
        () => ({
            get current() {
                return loadedShowRef.current;
            },
            set current(show: (() => void) | null) {
                loadedShowRef.current = show;
                if (show !== null && requestedRef.current) {
                    requestedRef.current = false;
                    show();
                }
            },
        }),
        [],
    );
    useClientLayoutEffect(() => {
        if (mode !== 'bubble') {
            return undefined;
        }

        showBubbleRef.current = () => {
            if (loadedShowRef.current === null) {
                requestedRef.current = true;

                return;
            }

            loadedShowRef.current();
        };

        return () => {
            showBubbleRef.current = null;
            requestedRef.current = false;
        };
    }, [mode, showBubbleRef]);
    let more: BubbleMore | undefined;
    let showRef: typeof showBubbleRef | undefined;
    if (mode === 'bubble') {
        more = {
            items: [...items.filter((item) => !item.bubble), ...menu],
            modeSwitch: { label: labels.toFixed, onSelect: () => setMode('fixed') },
        };
        showRef = registry;
    }

    if (bubbleItems.length === 0 && more === undefined) {
        return null;
    }

    return (
        <BubbleToolbar
            items={bubbleItems}
            more={more}
            label={labels.bubble}
            strings={strings}
            shortcut={toolbarShortcutOf(props)}
            testId={testId}
            toolbarRef={bubbleRef}
            showRef={showRef}
        />
    );
};

Bubble.displayName = 'RichTextEditor.Bubble';

/** The bubble toolbar of a fixed toolbar mode, near a text selection; bubble mode shows its own. */
export const BubbleToolbarPart = () => {
    const { chrome } = useRoot('BubbleToolbar');
    if (chrome.mode === 'bubble') {
        return null;
    }

    return <Bubble />;
};

BubbleToolbarPart.displayName = 'RichTextEditor.BubbleToolbar';

/** The session's save state. */
export const Status = () => {
    const { props, mounted, chrome } = useRoot('Status');
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    // An unmanaged session has no save state to show.
    if (!mounted.managed) {
        return null;
    }

    return <SaveStatusText t={chrome.t} testId={testId} />;
};

Status.displayName = 'RichTextEditor.Status';

/** The open panel, between the toolbar and the surface unless a host places this part elsewhere. */
export const Panels = () => {
    const { props, mounted, chrome } = useRoot('Panels');
    const panels = usePanelController();
    const id = panels?.id;
    const declaration = id === undefined ? undefined : panelsOf(mounted.definition).get(id);
    const Panel = declaration?.component;
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    if (panels === null || id === undefined || Panel === undefined) {
        return null;
    }

    return (
        <PanelFrame
            id={id}
            panel={Panel}
            t={chrome.t}
            requested={panels.requested}
            testId={testId}
            onClose={() => panels.close()}
        />
    );
};

Panels.displayName = 'RichTextEditor.Panels';
