/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Notice } from '@frontify/fondue-components';
import {
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react';

import {
    buildPluginRegistry,
    EDITOR_SHORTCUTS,
    emptyDocument,
    matchesHotkey,
    newerVersionOf,
    type PluginRegistry,
    type RteBlockNode,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';
import { RegistryRenderer } from '#/renderer';
import documentStyles from '#/renderer/document.module.scss';

import { EditorErrorBoundary } from './components/EditorErrorBoundary';
import { EditorFallback } from './components/EditorFallback';
import { FloatingToolbar } from './components/FloatingToolbar';
import { SlashMenu } from './components/SlashMenu';
import { Toolbar, type ToolbarPlacement } from './components/Toolbar';
import { commandsOf, turnIntoCommands } from './helpers/blockCommands';
import { useAnnouncer } from './hooks/useAnnouncer';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useFocusWithin } from './hooks/useFocusWithin';
import { useMouseDrag } from './hooks/useMouseDrag';
import { DEFAULT_LABELS, type RichTextEditorLabels } from './labels';
import styles from './richTextEditor.module.scss';
import { warnNewerVersion } from './warnings';

/**
 * `TBlock` is the document's block union. It defaults to the structural
 * skeleton here; the package root re-exports the component with the official
 * `RteBlock` union as default. Consumer plugins widen it:
 * `RichTextEditor<RteBlock | CalloutBlock>`.
 */
export type EditorShellProps<TBlock extends RteBlockNode = RteBlockNode> = {
    value?: RteDocumentOf<TBlock>;
    onChange?: (value: RteDocumentOf<TBlock>) => void;
    /**
     * The plugins to mount (e.g. `defaultPlugins`, extended or reduced as
     * needed). The toolbar draws them by `toolbarGroup` in the fixed group
     * order, list order within a group, ungrouped plugins last. Defaults to
     * `defaultPlugins` at the package root.
     *
     * Every plugin needs a unique `id`: ids key the toolbar and identify the
     * editor (duplicates are warned about in development).
     *
     * The editor is built when the set of ids changes, reading the schema,
     * hotkeys, typing rules and node rendering then. A new list with the same
     * ids (plugins rebuilt inline each render, or a changed option such as the
     * mention picker's `items`) only updates the toolbar items and the
     * content's class and custom properties. To apply any other changed
     * option, remount the editor with a new `key`.
     */
    plugins?: readonly RtePlugin[];
    /**
     * Where the toolbar goes.
     *
     * `'floating'` hangs it over the selected text, shown only while there is
     * a selection to act on.
     *
     * `'top'` puts it in an always-visible row above the content.
     *
     * Either way it is one tab stop, moved through with the arrow keys,
     * reached from the text with Alt+F10 (the floating bar while text is
     * selected); Escape goes back to the text.
     *
     * @default 'top'
     */
    toolbarPlacement?: ToolbarPlacement;
    /**
     * Show the content without allowing edits. The toolbar goes away with it.
     * A document from a newer format version is always shown this way, with no
     * `onChange` or `onBlur`, and with a notice saying why (`labels.newerVersion`)
     * unless this is set.
     */
    readonly?: boolean;
    /**
     * Draw the editor's own UI: the toolbar and the `/` menu. Off, only the
     * content is rendered, still editable unless `readonly` or the document is
     * from a newer format version.
     *
     * The editor draws no box either way — no border, background or inset;
     * a host that wants a field wraps the editor in one.
     *
     * @default true
     */
    showEditor?: boolean;
    /** Shown while the document is empty, and given to assistive technology as the field's placeholder. */
    placeholder?: string;
    /**
     * The editor's accessible name, when no visible label names it ("Comment",
     * "Description"). Without this or `aria-labelledby` it is called `labels.editor`.
     */
    'aria-label'?: string;
    /** The id of a visible element naming the editor — its label. Preferred over `aria-label`. */
    'aria-labelledby'?: string;
    /** The id of an element describing the editor further — help text, an error. */
    'aria-describedby'?: string;
    /**
     * The words the editor's own UI says (its default name, the toolbar's
     * name, the "Turn into" and `/` menus, the message and button shown when
     * it crashes) for a host that translates them. Each one left out stays English.
     */
    labels?: Partial<RichTextEditorLabels>;
    /**
     * The editor lost focus, handed the document as it stands: the hook to
     * commit on instead of every keystroke. Fires once focus has left the
     * editor: moving into its toolbar or a plugin's UI (the link flyout's
     * fields, a mention being typed) is still inside.
     */
    onBlur?: (value: RteDocumentOf<TBlock>) => void;
    /**
     * The editor crashed: something in it threw while rendering or mounting (a
     * toolbar item, a plugin's view, the engine). It now shows a message, a
     * way to try again and, when it can, its content read-only. Handed the
     * error, for the host to report; `onBlur` does not fire for a crash.
     * Fires for every crash, including one after Try again, and once until
     * Try again for the read-only view shown after a crash when that throws
     * too (never in a readonly editor, whose own view was the one that threw);
     * not for errors in event handlers, such as a key press or a paste, which
     * React does not route here.
     */
    onError?: (error: Error) => void;
};

/** Whether the editor was brought back by Try again, and whether the pressed button had focus. */
type RetryFocus = 'fresh' | 'focused' | 'unfocused';

/** What a freshly mounted shell focuses: nothing, the text to edit, or the readonly view. */
type MountFocusTarget = 'none' | 'text' | 'view';

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    plugins = [],
    labels: hostLabelOverrides,
    onError,
    ...shellProps
}: EditorShellProps<TBlock>): ReactNode => {
    // What the editor last showed: its own edits and the host documents it
    // applied, so an uncontrolled editor keeps its content across readonly
    // toggles and remounts, and a crash can show it. A `value` always wins.
    // A ref, not state: keeping it must not re-render on every keystroke.
    // It lives out here so it outlasts a crashed shell.
    const ownDocumentRef = useRef<RteDocumentOf>(value ?? emptyDocument());
    const document = value ?? ownDocumentRef.current;

    // Hosts usually pass an inline object; what it says is what matters.
    const labels = useLabels(hostLabelOverrides);
    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);

    // A new key mounts the boundary and the shell afresh.
    const [attempt, retry] = useReducer((count: number) => count + 1, 0);
    // The host's `value` when Try again was pressed: until it passes another, the editor mounts what the fallback showed.
    const [retriedValue, setRetriedValue] = useState<{ value: RteDocumentOf | undefined } | null>(null);
    let keepsOwnDocument = retriedValue !== null;
    if (retriedValue !== null && retriedValue.value !== value) {
        setRetriedValue(null);
        keepsOwnDocument = false;
    }

    // The fallback retries its view on every new document, which a host may pass on every render.
    const fallbackReportedRef = useRef(false);
    const onFallbackCatch = (error: Error): void => {
        // A readonly editor's view is the one that crashed, already reported.
        if (shellProps.readonly === true || newerVersionOf(document) !== null || fallbackReportedRef.current) {
            return;
        }
        fallbackReportedRef.current = true;
        onError?.(error);
    };

    // Whether focus is in the editor's UI, so a fallback takes it only when the crash took it away.
    const focusWithinRef = useRef(false);
    // Stable, so the fallback's and the shell's effects do not rerun on every render.
    const shownDocument = useCallback(() => ownDocumentRef.current, []);
    const onShown = useCallback((shown: RteDocumentOf): void => {
        ownDocumentRef.current = shown;
    }, []);
    const focusWasWithin = useCallback(() => focusWithinRef.current, []);
    const onFocusWithinChange = useCallback((focusWithin: boolean): void => {
        focusWithinRef.current = focusWithin;
    }, []);

    // The pressed Retry goes with the fallback, so the editor it brings back takes its focus.
    const [retryFocus, setRetryFocus] = useState<RetryFocus>('fresh');
    const onRetry = (hadFocus: boolean): void => {
        // What replaces the fallback inherits the focus the pressed Retry held.
        focusWithinRef.current = hadFocus;
        if (hadFocus) {
            setRetryFocus('focused');
        } else {
            setRetryFocus('unfocused');
        }
        fallbackReportedRef.current = false;
        setRetriedValue({ value });
        retry();
    };
    // The fallback keeps the host's name, as the readonly view does.
    const { hostLabels, isNamed } = hostLabelsOf({
        ariaLabel: shellProps['aria-label'],
        ariaLabelledBy: shellProps['aria-labelledby'],
        ariaDescribedBy: shellProps['aria-describedby'],
    });
    const fallbackGroupAttributes = groupAttributesOf(hostLabels, isNamed);
    let shellDocument = document;
    if (keepsOwnDocument) {
        shellDocument = ownDocumentRef.current;
    }

    return (
        <EditorErrorBoundary
            key={attempt}
            onCatch={onError}
            fallback={
                <EditorFallback
                    value={value}
                    shownDocument={shownDocument}
                    onShown={onShown}
                    registry={registry}
                    labels={labels}
                    onRetry={onRetry}
                    focusWasWithin={focusWasWithin}
                    groupAttributes={fallbackGroupAttributes}
                    onCatch={onFallbackCatch}
                />
            }
        >
            <Shell
                {...shellProps}
                retryFocus={retryFocus}
                onFocusWithinChange={onFocusWithinChange}
                document={shellDocument}
                onShown={onShown}
                registry={registry}
                labels={labels}
            />
        </EditorErrorBoundary>
    );
};

type ShellProps<TBlock extends RteBlockNode> = Omit<
    EditorShellProps<TBlock>,
    'value' | 'plugins' | 'labels' | 'onError'
> & {
    /** The document to show: the host's `value`, else what the editor last reported. */
    document: RteDocumentOf;
    /** Told what the editor shows, for the fallback a crash puts in its place. */
    onShown: (document: RteDocumentOf) => void;
    registry: PluginRegistry;
    labels: RichTextEditorLabels;
    /** How the editor came to be mounted, which decides what takes focus once it has. */
    retryFocus: RetryFocus;
    /** Told when focus enters or leaves the editor, for the fallback a crash puts in its place. */
    onFocusWithinChange: (focusWithin: boolean) => void;
};

const Shell = <TBlock extends RteBlockNode = RteBlockNode>({
    document,
    onShown,
    registry,
    labels,
    retryFocus,
    onFocusWithinChange,
    onChange,
    toolbarPlacement = 'top',
    readonly: readonlyProp = false,
    showEditor = true,
    placeholder = '',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    onBlur,
}: ShellProps<TBlock>): ReactNode => {
    // A document from a newer format may hold what this editor would drop on save, so it is only shown.
    const newerVersion = newerVersionOf(document);
    const readOnly = readonlyProp || newerVersion !== null;
    useEffect(() => {
        if (newerVersion !== null) {
            warnNewerVersion(newerVersion);
        }
    }, [newerVersion]);

    const commands = useMemo(() => commandsOf(registry, labels.text), [registry, labels.text]);

    const editableId = useId();
    const descriptionId = useId();
    const { message: announcement, announce } = useAnnouncer();
    const hasDescriptions = registry.descriptions.length > 0;
    let pluginDescriptionId: string | undefined;
    if (hasDescriptions) {
        pluginDescriptionId = descriptionId;
    }
    const { hostLabels, isNamed } = hostLabelsOf({
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy: describedByOf(ariaDescribedBy, pluginDescriptionId),
    });
    const className = [documentStyles.document, styles.content, ...registry.contentClassNames].join(' ');
    const attributes = useMemo(
        () =>
            editableAttributes({
                id: editableId,
                className,
                hostLabels,
                isNamed,
                placeholder,
                defaultLabel: labels.editor,
            }),
        // `hostLabels` is rebuilt every render; the props it is built from are the deps.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
        [
            editableId,
            className,
            ariaLabel,
            ariaLabelledBy,
            ariaDescribedBy,
            placeholder,
            labels.editor,
            hasDescriptions,
            descriptionId,
        ],
    );

    const { containerRef, handle, editorState, viewPortals } = useEditorHandle({
        registry,
        document,
        placeholder,
        placeholderClassName: styles.placeholder ?? '',
        attributes,
        onDocChange: (doc) => {
            onShown(doc);
            onChange?.(doc as RteDocumentOf<TBlock>);
        },
        onDocApplied: onShown,
        announce,
        enabled: !readOnly,
    });
    // The readonly view has no engine to report what it shows.
    useEffect(() => {
        if (readOnly) {
            onShown(document);
        }
    }, [readOnly, document, onShown]);

    // A pending focus request is spent once, never claiming focus when editing is turned on later.
    // A readonly retry has no text to focus, so the view takes the focus the pressed Retry held.
    const [mountFocus] = useState(() => mountFocusTarget(retryFocus, readOnly));
    const focusPendingRef = useRef(mountFocus === 'text');
    const readonlyViewRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (mountFocus === 'view') {
            readonlyViewRef.current?.focus();
        }
    }, [mountFocus]);
    useEffect(() => {
        if (focusPendingRef.current && handle !== null) {
            focusPendingRef.current = false;
            handle.focusAtEnd();
        }
    }, [handle]);

    const { focusWithin, focusProps } = useFocusWithin();
    // Blur as the host hears it: focus leaving the whole editor — text,
    // toolbar and the flyouts they portal out — not just the editable element.
    const hadFocusRef = useRef(false);
    useEffect(() => {
        // The handle can outlive a switch to a newer document by one render; its document would overwrite that one.
        if (hadFocusRef.current && !focusWithin && handle !== null && newerVersion === null) {
            onBlur?.(handle.document() as RteDocumentOf<TBlock>);
        }
        // Changes only: the mount must not overwrite the focus a pressed Retry handed over.
        if (hadFocusRef.current !== focusWithin) {
            onFocusWithinChange(focusWithin);
        }
        hadFocusRef.current = focusWithin;
        // Only the change of focus is the event; the callback is read when it happens.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [focusWithin]);
    // The notice takes the focus the removed text dropped onto the page, and says why; `focusWithin` lags a blur.
    const noticeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const { activeElement, body } = window.document;
        if (newerVersion !== null && focusWithin && (activeElement === null || activeElement === body)) {
            noticeRef.current?.focus();
        }
        // Only the switch is the event; focus is read when it happens.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [newerVersion]);
    // Alt+F10 asks the toolbar to take focus; it reads and clears the request
    // once it has rendered, which for a floating bar may be its first render.
    const focusRequestRef = useRef(false);
    const [, renderForFocusRequest] = useReducer((count: number) => count + 1, 0);
    // A selection being dragged out with the mouse is not finished yet; the
    // floating bar waits for the button to come up rather than chasing the pointer.
    const { isDragging, startDragging } = useMouseDrag();

    const toolbarFloats = toolbarPlacement === 'floating';
    // The floating bar holds Turn into (more than the built-in Text) and the
    // inline items; with neither there is no bar to draw.
    const hasToolbarContent = toolbarFloats
        ? turnIntoCommands(commands).length > 1 || registry.toolbarItems.some((item) => item.floating === 'inline')
        : registry.toolbarItems.length > 0;
    const hasToolbar = handle !== null && !readOnly && showEditor && hasToolbarContent;

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        if (handle === null) {
            return;
        }
        // Escape in the text gives the keyboard a way out that Tab is not —
        // Tab indents in a list. ProseMirror prevents Escape's default itself,
        // so `defaultPrevented` says nothing here: the UI that takes an Escape
        // (the `/` menu, a mention draft) stops it from reaching this handler,
        // and the toolbar and its menus sit outside the editable element.
        const editable = containerRef.current;
        if (event.key === 'Escape' && editable !== null && editable.contains(event.target as Node)) {
            event.preventDefault();
            handle.api.blur();
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        // The floating bar only exists over selected text.
        if (isToolbarHotkey(event) && hasToolbar && !(toolbarFloats && handle.api.selection.get().isCollapsed)) {
            event.preventDefault();
            focusRequestRef.current = true;
            renderForFocusRequest();
        }
    };

    const onFrameMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
        if (event.button !== 0 || handle === null) {
            return;
        }
        // The editor's own space outside the text — between the toolbar and
        // the content — puts the caret back in the text rather than nowhere.
        if (event.target === event.currentTarget) {
            event.preventDefault();
            handle.api.focus();
            return;
        }
        startDragging();
    };

    // Nothing here reads the editor state: the toolbar and the floating bar
    // subscribe to it themselves, so a keystroke re-renders them, not this.
    const toolbar = hasToolbar ? (
        <Toolbar
            items={registry.toolbarItems}
            commands={commands}
            api={handle.api}
            editorState={editorState}
            placement={toolbarPlacement}
            labels={labels}
            controls={editableId}
            focusRequestRef={focusRequestRef}
        />
    ) : null;

    // The readonly view is not a field, but a host's name for the editor still
    // applies, so a labelled editor keeps its name when it turns readonly.
    let readonlyViewAttributes: Record<string, string> = {};
    if (readOnly) {
        readonlyViewAttributes = groupAttributesOf(hostLabels, isNamed);
    }
    let readonlyViewTabIndex: number | undefined;
    if (mountFocus === 'view') {
        readonlyViewTabIndex = FOCUSABLE_BY_SCRIPT_ONLY;
    }

    return (
        // Not a control: it hears the keys, clicks and focus moving among the
        // controls inside it.
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            {...focusProps}
            onKeyDown={onKeyDown}
            className={styles.root}
            style={registry.contentProperties as CSSProperties}
        >
            {/* Its mousedown is for the text inside: a drag starting, or a click beside it. */}
            {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                onMouseDown={readOnly ? undefined : onFrameMouseDown}
                // No default name: the readonly view reads as text.
                {...readonlyViewAttributes}
                ref={readonlyViewRef}
                // To take a pressed Retry's focus.
                tabIndex={readonlyViewTabIndex}
            >
                {toolbarFloats ? null : toolbar}
                {/* A host that shows it read-only anyway offered no editing to explain. */}
                {newerVersion === null || readonlyProp ? null : (
                    <div ref={noticeRef} tabIndex={-1} className={styles.notice}>
                        <Notice variant="warning" emphasis="weak">
                            {labels.newerVersion}
                        </Notice>
                    </div>
                )}
                {readOnly ? (
                    // The renderer adds the document and plugin classes itself.
                    <RegistryRenderer value={document} registry={registry} className={styles.content} />
                ) : (
                    <div ref={containerRef} className={styles.mount} />
                )}
            </div>
            {toolbarFloats && toolbar !== null && handle !== null && focusWithin && !isDragging ? (
                <FloatingToolbar
                    handle={handle}
                    editorState={editorState}
                    editableRef={containerRef}
                    label={labels.toolbar}
                >
                    {toolbar}
                </FloatingToolbar>
            ) : null}
            {/* Read with the editor through its `aria-describedby`: what each plugin says about its keys. */}
            {readOnly || !hasDescriptions ? null : (
                <div id={descriptionId} className={styles.visuallyHidden}>
                    {registry.descriptions.join(' ')}
                </div>
            )}
            {/* What `api.announce` says. The role is written out on purpose: the specs and the notice lookup find the region by it. */}
            <output // NOSONAR
                role="status"
                className={styles.visuallyHidden}
            >
                {announcement}
            </output>
            {/* The plugins' editing UI, portalled into the text but part of this tree, so it shares the host's context. */}
            {viewPortals}
            {/* Only worth having when a plugin offers something beyond the built-in Text. */}
            {readOnly || !showEditor || handle === null || commands.length < 2 ? null : (
                <SlashMenu
                    handle={handle}
                    editorState={editorState}
                    editableRef={containerRef}
                    commands={commands}
                    labels={labels}
                />
            )}
        </div>
    );
};

// Helpers

/** The key that moves focus from the text to the toolbar, the usual one for rich text editors. */
const isToolbarHotkey = (event: KeyboardEvent): boolean => matchesHotkey(EDITOR_SHORTCUTS.focusToolbar.key, event);

/** The tabindex that makes an element focusable by script but not by Tab. */
const FOCUSABLE_BY_SCRIPT_ONLY = -1;

const GROUP_ROLE = 'group';

/**
 * What a named editor shows where it is not a field (the readonly view, the
 * crash fallback): a group carrying the host's labels. Nothing when unnamed.
 */
const groupAttributesOf = (hostLabels: Record<string, string>, isNamed: boolean): Record<string, string> => {
    if (!isNamed) {
        return {};
    }
    return { role: GROUP_ROLE, ...hostLabels };
};

/** What the first render of a shell focuses, given how the editor came to be mounted. */
const mountFocusTarget = (retryFocus: RetryFocus, readOnly: boolean): MountFocusTarget => {
    switch (retryFocus) {
        case 'fresh':
            return 'none';
        case 'focused':
            if (readOnly) {
                return 'view';
            }
            return 'text';
        case 'unfocused':
            if (readOnly) {
                return 'none';
            }
            return 'text';
    }
};

/** The host's description of the editor, then the element holding what the plugins say about their keys. */
const describedByOf = (hostId: string | undefined, pluginId: string | undefined): string | undefined => {
    if (pluginId === undefined) {
        return hostId;
    }
    if (hostId === undefined || hostId === '') {
        return pluginId;
    }
    return `${hostId} ${pluginId}`;
};

/** What the host named and described the editor with, and whether it gave a name. */
const hostLabelsOf = ({
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: {
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    ariaDescribedBy: string | undefined;
}): { hostLabels: Record<string, string>; isNamed: boolean } => ({
    hostLabels: {
        ...(ariaLabel === undefined ? {} : { 'aria-label': ariaLabel }),
        ...(ariaLabelledBy === undefined ? {} : { 'aria-labelledby': ariaLabelledBy }),
        ...(ariaDescribedBy === undefined ? {} : { 'aria-describedby': ariaDescribedBy }),
    },
    isNamed: ariaLabel !== undefined || ariaLabelledBy !== undefined,
});

/** The attributes of the editable element: a textbox, named by the host or else by `defaultLabel`. */
const editableAttributes = ({
    id,
    className,
    hostLabels,
    isNamed,
    placeholder,
    defaultLabel,
}: {
    id: string;
    className: string;
    hostLabels: Record<string, string>;
    isNamed: boolean;
    placeholder: string;
    defaultLabel: string;
}): Record<string, string> => ({
    id,
    class: className,
    role: 'textbox',
    'aria-multiline': 'true',
    ...(isNamed ? {} : { 'aria-label': defaultLabel }),
    ...hostLabels,
    ...(placeholder === '' ? {} : { 'aria-placeholder': placeholder }),
});

/**
 * The host's labels over the English defaults, kept the same object while the
 * host's say the same, however often it builds them anew.
 */
const useLabels = (overrides: Partial<RichTextEditorLabels> | undefined): RichTextEditorLabels => {
    const merged = { ...DEFAULT_LABELS, ...overrides };
    const ref = useRef(merged);
    const previous = ref.current;
    if ((Object.keys(merged) as (keyof RichTextEditorLabels)[]).some((key) => merged[key] !== previous[key])) {
        ref.current = merged;
    }
    return ref.current;
};
