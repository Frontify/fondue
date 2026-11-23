/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Notice } from '@frontify/fondue-components';
import {
    type AriaAttributes,
    type AriaRole,
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
    type FocusPosition,
    type PluginRegistry,
    type RteBlockNode,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';
import { RegistryRenderer } from '#/renderer';
import documentStyles from '#/renderer/document.module.scss';
import {
    type EditorLabelContext,
    labelContextOf,
    resolveLabel,
    translatorFor,
    TranslationContext,
    useTranslate,
} from '#/ui/translation';

import { EditorErrorBoundary } from './components/EditorErrorBoundary';
import { EditorFallback, type GroupAttributes } from './components/EditorFallback';
import { FloatingToolbar } from './components/FloatingToolbar';
import { SlashMenu } from './components/SlashMenu';
import { Toolbar, type ToolbarPlacement } from './components/Toolbar';
import { commandsOf, turnIntoCommands } from './helpers/blockCommands';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useEditorStrings } from './hooks/useEditorStrings';
import { useFocusWithin } from './hooks/useFocusWithin';
import { useKeyboardFocus } from './hooks/useKeyboardFocus';
import { useMouseDrag } from './hooks/useMouseDrag';
import styles from './richTextEditor.module.scss';
import { warnNewerVersion } from './warnings';

type EditorStatus = 'neutral' | 'error';

type EditorAriaProps = Pick<
    AriaAttributes,
    'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-errormessage'
>;

/**
 * `TBlock` is the document's block union. It defaults to the structural
 * skeleton here; the package root re-exports the component with the official
 * `RteBlock` union as default. Consumer plugins widen it:
 * `RichTextEditor<RteBlock | CalloutBlock>`.
 */
export type EditorShellProps<TBlock extends RteBlockNode = RteBlockNode> = {
    /**
     * The id of the editable element, or of the read-only view's root while the
     * editor is read-only or shows its crash message: the target for a host's
     * `aria-*` references and a label's `htmlFor`. A label's `htmlFor` alone does
     * not name an editable `div`, so name the editor with `aria-labelledby`
     * pointing at the label.
     */
    id?: string;
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
     * `onChange` or `onBlur`, and with a notice saying why unless this is set.
     */
    readonly?: boolean;
    /**
     * Draw the editor's own UI: the toolbar and the `/` menu. Off, only the
     * content is rendered, still editable unless `readonly` or the document is
     * from a newer format version.
     *
     * The editor draws no box either way — no border, background or inset;
     * a host that wants a field wraps the editor in one, and draws the focus
     * ring while it `:has([data-keyboard-focus='true'])`.
     *
     * @default true
     */
    showEditor?: boolean;
    /**
     * Puts the caret before the first text or after the last when the editor first mounts, and scrolls to it.
     * Use it only when the person opened the editor (a Reply or Edit button), never on page load.
     * Left out, the editor takes no focus. Ignored while `readonly` and when editing turns on later.
     * A later `value` with other content moves the selection to the document's end.
     */
    autoFocus?: FocusPosition;
    /**
     * The most lines of body text the content shows before it scrolls inside
     * the editor. The toolbar stays above the content, not scrolled. Unset, the
     * content grows with the text.
     */
    maxRows?: number;
    /** Shown while the document is empty, and given to assistive technology as the field's placeholder. */
    placeholder?: string;
    /**
     * Sets `aria-required` on the editable element. The host's label draws the asterisk.
     *
     * @default false
     */
    required?: boolean;
    /**
     * `'error'` sets `aria-invalid`, and `aria-errormessage` when given, on the
     * editable element. The host draws the error border.
     *
     * @default 'neutral'
     */
    status?: EditorStatus;
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
    /**
     * The test id of the editor's root element.
     * @default 'fondue-rich-text-editor'
     */
    'data-test-id'?: string;
} & EditorAriaProps;

/** Whether the editor was brought back by Try again, and whether the pressed button had focus. */
type RetryFocus = 'fresh' | 'focused' | 'unfocused';

/** What a new shell focuses: nothing, the text at a caret position, or the readonly view. */
type MountFocusTarget = { kind: 'none' } | { kind: 'text'; position: FocusPosition } | { kind: 'view' };

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    plugins = [],
    onError,
    'data-test-id': dataTestId = 'fondue-rich-text-editor',
    ...shellProps
}: EditorShellProps<TBlock>): ReactNode => {
    // What the editor last showed: its own edits and the host documents it
    // applied, so an uncontrolled editor keeps its content across readonly
    // toggles and remounts, and a crash can show it. A `value` always wins.
    // A ref, not state: keeping it must not re-render on every keystroke.
    // It lives out here so it outlasts a crashed shell.
    const ownDocumentRef = useRef<RteDocumentOf>(value ?? emptyDocument());
    const document = value ?? ownDocumentRef.current;

    // The language comes with the components' strings, in the `ThemeProvider`'s `locale`.
    const { lang, strings } = useEditorStrings();
    const translate = useMemo(() => translatorFor(strings), [strings]);
    const labelContext = useMemo(() => labelContextOf(lang, translate), [lang, translate]);
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
        <TranslationContext.Provider value={translate}>
            <EditorErrorBoundary
                key={attempt}
                onCatch={onError}
                fallback={
                    <EditorFallback
                        value={value}
                        shownDocument={shownDocument}
                        onShown={onShown}
                        registry={registry}
                        onRetry={onRetry}
                        focusWasWithin={focusWasWithin}
                        groupAttributes={fallbackGroupAttributes}
                        id={shellProps.id}
                        dataTestId={dataTestId}
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
                    labelContext={labelContext}
                    dataTestId={dataTestId}
                />
            </EditorErrorBoundary>
        </TranslationContext.Provider>
    );
};

type ShellProps<TBlock extends RteBlockNode> = Omit<
    EditorShellProps<TBlock>,
    'value' | 'plugins' | 'onError' | 'data-test-id'
> & {
    /** The document to show: the host's `value`, else what the editor last reported. */
    document: RteDocumentOf;
    /** Told what the editor shows, for the fallback a crash puts in its place. */
    onShown: (document: RteDocumentOf) => void;
    registry: PluginRegistry;
    /** What a plugin's label function is called with: the shown language, and the translator. */
    labelContext: EditorLabelContext;
    /** How the editor came to be mounted, which decides what takes focus once it has. */
    retryFocus: RetryFocus;
    /** Told when focus enters or leaves the editor, for the fallback a crash puts in its place. */
    onFocusWithinChange: (focusWithin: boolean) => void;
    /** The test id of the editor's root element. */
    dataTestId: string;
};

const Shell = <TBlock extends RteBlockNode = RteBlockNode>({
    id,
    document,
    onShown,
    registry,
    labelContext,
    retryFocus,
    onFocusWithinChange,
    onChange,
    toolbarPlacement = 'top',
    readonly: readonlyProp = false,
    showEditor = true,
    autoFocus,
    maxRows,
    placeholder = '',
    required = false,
    status = 'neutral',
    onBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    dataTestId,
}: ShellProps<TBlock>): ReactNode => {
    // A document from a newer format may hold what this editor would drop on save, so it is only shown.
    const newerVersion = newerVersionOf(document);
    const readOnly = readonlyProp || newerVersion !== null;
    useEffect(() => {
        if (newerVersion !== null) {
            warnNewerVersion(newerVersion);
        }
    }, [newerVersion]);

    const translate = useTranslate();
    // A label function is called here, once per language, for every menu and toolbar.
    const commands = useMemo(
        () => commandsOf(registry).map((command) => ({ ...command, label: resolveLabel(command.label, labelContext) })),
        [registry, labelContext],
    );
    const toolbarItems = useMemo(
        () => registry.toolbarItems.map((item) => ({ ...item, label: resolveLabel(item.label, labelContext) })),
        [registry, labelContext],
    );
    const editorName = translate('RichTextEditor_editor');

    const generatedId = useId();
    const editableId = id ?? generatedId;
    const { hostLabels, isNamed } = hostLabelsOf({ ariaLabel, ariaLabelledBy, ariaDescribedBy });
    // Read-only renders without the engine, so this editor always takes edits.
    const className = [documentStyles.document, styles.content, styles.editable, ...registry.contentClassNames].join(
        ' ',
    );
    const attributes = useMemo(
        () =>
            editableAttributes({
                id: editableId,
                className,
                placeholder,
                defaultLabel: editorName,
                isNamed,
                required,
                status,
                ariaLabel,
                ariaLabelledBy,
                ariaDescribedBy,
                ariaErrorMessage,
            }),
        [
            editableId,
            className,
            placeholder,
            editorName,
            isNamed,
            required,
            status,
            ariaLabel,
            ariaLabelledBy,
            ariaDescribedBy,
            ariaErrorMessage,
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
    const [mountFocus] = useState(() => mountFocusTarget({ retryFocus, readOnly, autoFocus }));
    const focusPendingRef = useRef(mountFocus.kind === 'text');
    const readonlyViewRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (mountFocus.kind === 'view') {
            readonlyViewRef.current?.focus();
        }
    }, [mountFocus]);
    useEffect(() => {
        if (!focusPendingRef.current) {
            return;
        }

        // Turning editing off cancels the request, so editing that comes back takes no focus.
        if (readOnly) {
            focusPendingRef.current = false;
            return;
        }

        if (handle === null) {
            return;
        }

        // The newer handle from the same commit takes the focus.
        if (handle.isDestroyed()) {
            return;
        }

        if (mountFocus.kind !== 'text') {
            return;
        }

        focusPendingRef.current = false;
        handle.api.focus(mountFocus.position);
    }, [handle, mountFocus, readOnly]);

    const { focusWithin, focusProps } = useFocusWithin();
    useKeyboardFocus({ elementRef: containerRef, isMounted: !readOnly });
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
    // Alt+F10 asks the toolbar to take focus; the toolbar clears the request once
    // it has taken focus, which for a floating bar may be on its first render.
    const [toolbarFocusPending, setToolbarFocusPending] = useState(false);
    const onToolbarFocusTaken = useCallback((): void => setToolbarFocusPending(false), []);
    // A selection being dragged out with the mouse is not finished yet; the
    // floating bar waits for the button to come up rather than chasing the pointer.
    const { isDragging, startDragging } = useMouseDrag();

    const toolbarFloats = toolbarPlacement === 'floating';
    // The floating bar holds Turn into (more than the built-in Text) and the
    // inline items; with neither there is no bar to draw.
    const hasToolbarContent = toolbarFloats
        ? turnIntoCommands(commands).length > 1 || toolbarItems.some((item) => item.floating === 'inline')
        : toolbarItems.length > 0;
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
            setToolbarFocusPending(true);
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
            items={toolbarItems}
            commands={commands}
            api={handle.api}
            editorState={editorState}
            placement={toolbarPlacement}
            controls={editableId}
            focusPending={toolbarFocusPending}
            onFocusTaken={onToolbarFocusTaken}
        />
    ) : null;

    // The readonly view is not a field, but a host's name for the editor still
    // applies, so a labelled editor keeps its name when it turns readonly.
    let readonlyViewAttributes: GroupAttributes = {};
    let readonlyViewId: string | undefined;
    if (readOnly) {
        readonlyViewAttributes = groupAttributesOf(hostLabels, isNamed);
        readonlyViewId = editableId;
    }
    let readonlyViewTabIndex: number | undefined;
    if (mountFocus.kind === 'view') {
        readonlyViewTabIndex = FOCUSABLE_BY_SCRIPT_ONLY;
    }

    let bodyStyle: MaxRowsStyle | undefined;
    if (maxRows !== undefined) {
        bodyStyle = { [MAX_ROWS_PROPERTY]: String(maxRows) };
    }

    return (
        // Not a control: it hears the keys, clicks and focus moving among the
        // controls inside it.
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            {...focusProps}
            onKeyDown={onKeyDown}
            className={styles.root}
            data-test-id={dataTestId}
            style={registry.contentProperties as CSSProperties}
        >
            {/* Its mousedown is for the text inside: a drag starting, or a click beside it. */}
            {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                id={readonlyViewId}
                onMouseDown={readOnly ? undefined : onFrameMouseDown}
                // No default name: the readonly view reads as text.
                {...readonlyViewAttributes}
                ref={readonlyViewRef}
                // To take a pressed Retry's focus.
                tabIndex={readonlyViewTabIndex}
                className={styles.body}
                data-max-rows={maxRows !== undefined}
                style={bodyStyle}
            >
                {toolbarFloats ? null : toolbar}
                {/* A host that shows it read-only anyway offered no editing to explain. */}
                {newerVersion === null || readonlyProp ? null : (
                    <div ref={noticeRef} tabIndex={-1} className={styles.notice}>
                        <Notice variant="warning" emphasis="weak">
                            {translate('RichTextEditor_newerVersion')}
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
                    label={translate('RichTextEditor_toolbar')}
                >
                    {toolbar}
                </FloatingToolbar>
            ) : null}
            {/* The plugins' editing UI, portalled into the text but part of this tree, so it shares the host's context. */}
            {viewPortals}
            {/* Only worth having when a plugin offers something beyond the built-in Text. */}
            {readOnly || !showEditor || handle === null || commands.length < 2 ? null : (
                <SlashMenu handle={handle} editorState={editorState} editableRef={containerRef} commands={commands} />
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

/** The custom property the stylesheet turns into the content's maximum height. */
const MAX_ROWS_PROPERTY = '--max-rows';

/** The body's style: `CSSProperties` has no custom properties, so the one key is added. */
type MaxRowsStyle = CSSProperties & Record<typeof MAX_ROWS_PROPERTY, string>;

/**
 * What a named editor shows where it is not a field (the readonly view, the
 * crash fallback): a group carrying the host's labels. Nothing when unnamed.
 */
const groupAttributesOf = (hostLabels: HostLabels, isNamed: boolean): GroupAttributes => {
    if (!isNamed) {
        return {};
    }
    return { role: GROUP_ROLE, ...hostLabels };
};

type MountFocusTargetParams = {
    retryFocus: RetryFocus;
    readOnly: boolean;
    autoFocus: EditorShellProps['autoFocus'];
};

/** What the first render of a shell focuses, given how the editor came to be mounted. */
const mountFocusTarget = ({ retryFocus, readOnly, autoFocus }: MountFocusTargetParams): MountFocusTarget => {
    switch (retryFocus) {
        case 'fresh':
            if (readOnly || autoFocus === undefined) {
                return { kind: 'none' };
            }
            return { kind: 'text', position: autoFocus };
        case 'focused':
            if (readOnly) {
                return { kind: 'view' };
            }
            return { kind: 'text', position: 'end' };
        case 'unfocused':
            if (readOnly) {
                return { kind: 'none' };
            }
            return { kind: 'text', position: 'end' };
    }
};

/** The names and description the host gave the editor. */
type HostLabels = Omit<GroupAttributes, 'role'>;

type HostLabelsOfOptions = {
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    ariaDescribedBy: string | undefined;
};

type HostNaming = {
    hostLabels: HostLabels;
    /** Whether the host gave a name, by `aria-label` or `aria-labelledby`. */
    isNamed: boolean;
};

/** What the host named and described the editor with, and whether it gave a name. */
const hostLabelsOf = ({ ariaLabel, ariaLabelledBy, ariaDescribedBy }: HostLabelsOfOptions): HostNaming => {
    const hostLabels: HostLabels = {};

    if (ariaLabel !== undefined) {
        hostLabels['aria-label'] = ariaLabel;
    }
    if (ariaLabelledBy !== undefined) {
        hostLabels['aria-labelledby'] = ariaLabelledBy;
    }
    if (ariaDescribedBy !== undefined) {
        hostLabels['aria-describedby'] = ariaDescribedBy;
    }

    return { hostLabels, isNamed: ariaLabel !== undefined || ariaLabelledBy !== undefined };
};

const TEXTBOX_ROLE: AriaRole = 'textbox';

type EditableAriaAttributes = Pick<
    AriaAttributes,
    keyof EditorAriaProps | 'aria-multiline' | 'aria-placeholder' | 'aria-required' | 'aria-invalid'
>;

type EditableElementAttributes = { id: string; class: string; role: AriaRole } & {
    [Name in keyof EditableAriaAttributes]?: Extract<EditableAriaAttributes[Name], string>;
};

type EditableElementAttributesOptions = {
    id: string;
    className: string;
    placeholder: string;
    defaultLabel: string;
    isNamed: boolean;
    required: boolean;
    status: EditorStatus;
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    ariaDescribedBy: string | undefined;
    ariaErrorMessage: string | undefined;
};

const isInvalidStatus = (status: EditorStatus): boolean => {
    switch (status) {
        case 'neutral':
            return false;
        case 'error':
            return true;
    }
};

/** The attributes of the editable element: a textbox, named by the host or else by `defaultLabel`. */
const editableAttributes = ({
    id,
    className,
    placeholder,
    defaultLabel,
    isNamed,
    required,
    status,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaErrorMessage,
}: EditableElementAttributesOptions): EditableElementAttributes => {
    const isInvalid = isInvalidStatus(status);

    return {
        id,
        class: className,
        role: TEXTBOX_ROLE,
        'aria-multiline': 'true',
        'aria-placeholder': placeholder === '' ? undefined : placeholder,
        'aria-required': required ? 'true' : undefined,
        'aria-invalid': isInvalid ? 'true' : undefined,
        'aria-label': isNamed ? ariaLabel : defaultLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-errormessage': isInvalid ? ariaErrorMessage : undefined,
    };
};
