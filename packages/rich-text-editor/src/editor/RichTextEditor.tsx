/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
    useEffect,
    useId,
    useMemo,
    useReducer,
    useRef,
} from 'react';

import { buildPluginRegistry, emptyDocument, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';
import { RegistryRenderer } from '#/renderer';
import documentStyles from '#/renderer/document.module.scss';

import { FloatingToolbar } from './components/FloatingToolbar';
import { SlashMenu } from './components/SlashMenu';
import { Toolbar, type ToolbarPlacement } from './components/Toolbar';
import { commandsOf, turnIntoCommands } from './helpers/blockCommands';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useFocusWithin } from './hooks/useFocusWithin';
import { useMouseDrag } from './hooks/useMouseDrag';
import { DEFAULT_LABELS, type RichTextEditorLabels } from './labels';
import styles from './richTextEditor.module.scss';

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
     * The plugins to mount, in toolbar order (e.g. `defaultPlugins`, extended
     * or reduced as needed). Defaults to `defaultPlugins` at the package root.
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
     * `'top'` puts it inside the frame as an always-visible strip above the content.
     *
     * Either way it is one tab stop, moved through with the arrow keys,
     * reached from the text with Alt+F10 (the floating bar while text is
     * selected); Escape goes back to the text.
     *
     * @default 'top'
     */
    toolbarPlacement?: ToolbarPlacement;
    /** Show the content without allowing edits. The toolbar goes away with it. */
    readonly?: boolean;
    /**
     * Draw the editor's chrome: the border, the background and the toolbar.
     * Off, only the content is rendered, without the editable surface's inset.
     * The pairing for `readonly`.
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
     * The words the editor's own UI says — its default name, the toolbar's
     * name, the "Turn into" and `/` menus — for a host that translates them.
     * Each one left out stays English.
     */
    labels?: Partial<RichTextEditorLabels>;
    /**
     * The editor lost focus, handed the document as it stands: the hook to
     * commit on instead of every keystroke. Fires once focus has left the
     * editor: moving into its toolbar or a plugin's UI (the link flyout's
     * fields, a mention being typed) is still inside.
     */
    onBlur?: (value: RteDocumentOf<TBlock>) => void;
};

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    onChange,
    plugins = [],
    toolbarPlacement = 'top',
    readonly: readOnly = false,
    showEditor = true,
    placeholder = '',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    labels: hostLabelOverrides,
    onBlur,
}: EditorShellProps<TBlock>): ReactNode => {
    // What the editor last reported, so an uncontrolled editor keeps its
    // content across readonly toggles and remounts. A `value` always wins.
    // A ref, not state: keeping it must not re-render on every keystroke.
    const ownDocumentRef = useRef<RteDocumentOf | null>(null);
    ownDocumentRef.current ??= value ?? emptyDocument();
    const document = value ?? ownDocumentRef.current;

    // Hosts usually pass an inline object; what it says is what matters.
    const labels = useLabels(hostLabelOverrides);
    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);
    const commands = useMemo(() => commandsOf(registry, labels.text), [registry, labels.text]);

    const editableId = useId();
    const { hostLabels, isNamed } = hostLabelsOf({ ariaLabel, ariaLabelledBy, ariaDescribedBy });
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
        [editableId, className, ariaLabel, ariaLabelledBy, ariaDescribedBy, placeholder, labels.editor],
    );

    const { containerRef, handle, editorState, viewPortals } = useEditorHandle({
        registry,
        document,
        placeholder,
        placeholderClassName: styles.placeholder ?? '',
        attributes,
        onDocChange: (doc) => {
            ownDocumentRef.current = doc;
            onChange?.(doc as RteDocumentOf<TBlock>);
        },
        enabled: !readOnly,
    });

    const { focusWithin, focusProps } = useFocusWithin();
    // Blur as the host hears it: focus leaving the whole editor — text,
    // toolbar and the flyouts they portal out — not just the editable element.
    const hadFocusRef = useRef(false);
    useEffect(() => {
        if (hadFocusRef.current && !focusWithin && handle !== null) {
            onBlur?.(handle.document() as RteDocumentOf<TBlock>);
        }
        hadFocusRef.current = focusWithin;
        // Only the change of focus is the event; the callback is read when it happens.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [focusWithin]);
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
        // The frame's empty space around the text — below a short document in
        // a tall editor — puts the caret back in the text rather than nowhere.
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
            {/* Its mousedown is for the text inside: a drag starting, or a click below it. */}
            {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className={styles.frame}
                data-chrome={String(showEditor)}
                onMouseDown={readOnly ? undefined : onFrameMouseDown}
                // The readonly view is not a field, but a host's name for the
                // editor still applies, so a labelled editor keeps its name
                // when it turns readonly. No default: it reads as text.
                {...(readOnly && isNamed ? { role: 'group', ...hostLabels } : {})}
            >
                {toolbarFloats ? null : toolbar}
                {readOnly ? (
                    // The renderer adds the document and plugin classes itself.
                    <RegistryRenderer value={document} registry={registry} className={styles.content} />
                ) : (
                    <div ref={containerRef} />
                )}
            </div>
            {toolbarFloats && toolbar !== null && handle !== null && focusWithin && !isDragging ? (
                <FloatingToolbar handle={handle} editorState={editorState} editableRef={containerRef}>
                    {toolbar}
                </FloatingToolbar>
            ) : null}
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
const isToolbarHotkey = (event: KeyboardEvent): boolean => event.altKey && event.key === 'F10';

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
