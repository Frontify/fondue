/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode, useId, useMemo, useRef } from 'react';

import { buildPluginRegistry, emptyDocument, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';
import { RegistryRenderer } from '#/renderer';
import documentStyles from '#/renderer/document.module.scss';

import { commandsOf } from './blockCommands';
import { FloatingToolbar } from './FloatingToolbar';
import { type EditorStateStore, useEditorHandle } from './hooks/useEditorHandle';
import { useFocusWithin } from './hooks/useFocusWithin';
import { useMouseDrag } from './hooks/useMouseDrag';
import { useExpectedAnnouncement, useStatusAnnouncement } from './hooks/useStatusAnnouncement';
import { useToolbarSummon } from './hooks/useToolbarSummon';
import { type EditorHandle } from './port';
import styles from './richTextEditor.module.scss';
import { SlashMenu } from './SlashMenu';
import { Toolbar, type ToolbarPlacement } from './Toolbar';

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
     * a selection to act on (Alt+F10 calls it up on a caret too).
     *
     * `'top'` puts it inside the frame as an always-visible strip above the content.
     *
     * Either way it is one tab stop after the text, moved through with the
     * arrow keys, reached from the text with Alt+F10; Escape goes back to the text.
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
     * "Description"). Without this or `aria-labelledby` it is called "Rich text editor".
     */
    'aria-label'?: string;
    /** The id of a visible element naming the editor — its label. Preferred over `aria-label`. */
    'aria-labelledby'?: string;
    /** The id of an element describing the editor further — help text, an error. */
    'aria-describedby'?: string;
    /**
     * The name of the formatting toolbar, for assistive technology.
     *
     * @default 'Formatting'
     */
    toolbarLabel?: string;
    /**
     * The editor lost focus, handed the document as it stands: the hook to
     * commit on instead of every keystroke. Fires whenever focus leaves the
     * editable element, including into plugin UI (the link flyout's fields).
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
    toolbarLabel = 'Formatting',
    onBlur,
}: EditorShellProps<TBlock>): ReactNode => {
    // What the editor last reported, so an uncontrolled editor keeps its
    // content across readonly toggles and remounts. A `value` always wins.
    // A ref, not state: keeping it must not re-render on every keystroke.
    const ownDocumentRef = useRef<RteDocumentOf | null>(null);
    ownDocumentRef.current ??= value ?? emptyDocument();
    const document = value ?? ownDocumentRef.current;

    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);
    const commands = useMemo(() => commandsOf(registry), [registry]);

    const editableId = useId();
    const { hostLabels, isNamed } = hostLabelsOf({ ariaLabel, ariaLabelledBy, ariaDescribedBy });
    const { expectedRef, expectAnnouncement } = useExpectedAnnouncement();

    const { containerRef, handle, editorState, viewPortals } = useEditorHandle({
        registry,
        document,
        placeholder,
        placeholderClassName: styles.placeholder ?? '',
        // Compared entry by entry by the editor, so a new object every render is fine.
        attributes: editableAttributes({
            id: editableId,
            className: [documentStyles.document, styles.content, ...registry.contentClassNames].join(' '),
            hostLabels,
            isNamed,
            placeholder,
        }),
        onDocChange: (doc) => {
            ownDocumentRef.current = doc;
            expectAnnouncement();
            onChange?.(doc as RteDocumentOf<TBlock>);
        },
        onBlur: (doc) => onBlur?.(doc as RteDocumentOf<TBlock>),
        enabled: !readOnly,
    });

    const { focusWithin, focusProps } = useFocusWithin();
    const toolbarSummon = useToolbarSummon(focusWithin);
    // A selection being dragged out with the mouse is not finished yet; the
    // floating bar waits for the button to come up rather than chasing the pointer.
    const { isDragging, startDragging } = useMouseDrag();

    const hasToolbar = handle !== null && !readOnly && showEditor && registry.toolbarItems.length > 0;
    const toolbarFloats = toolbarPlacement === 'floating';

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        if (isCommandKey(event)) {
            expectAnnouncement();
        }
        if (event.defaultPrevented || handle === null) {
            return;
        }
        if (isToolbarHotkey(event) && hasToolbar) {
            event.preventDefault();
            toolbarSummon.summon();
            return;
        }
        // Escape in the text gives the keyboard a way out that Tab is not —
        // Tab indents in a list. (The toolbar handles its own Escape.)
        const editable = containerRef.current;
        if (event.key === 'Escape' && editable !== null && editable.contains(event.target as Node)) {
            event.preventDefault();
            handle.api.blur();
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
            label={toolbarLabel}
            controls={editableId}
            focusRequestRef={toolbarSummon.focusRequestRef}
        />
    ) : null;

    return (
        // Not a control: it hears the keys, clicks and focus moving among the
        // controls inside it.
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            {...focusProps}
            onKeyDown={onKeyDown}
            onClick={(event) => {
                // A control clicked, in the toolbar or a flyout; a click in the
                // text only moves the caret.
                if (!containerRef.current?.contains(event.target as Node)) {
                    expectAnnouncement();
                }
            }}
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
            {/* After the text in the DOM, so the bar is the next tab stop after it. */}
            {toolbarFloats && toolbar !== null && handle !== null && focusWithin && !isDragging ? (
                <FloatingToolbar
                    handle={handle}
                    editorState={editorState}
                    editableRef={containerRef}
                    caret={toolbarSummon.isPinned}
                >
                    {/* Hears focus moving in and out of the toolbar inside. */}
                    {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        className={styles.toolbarFocus}
                        onFocus={toolbarSummon.pin}
                        onBlur={(event) => {
                            // Back in the text, a caret no longer holds the bar up.
                            if (containerRef.current?.contains(event.relatedTarget as Node | null)) {
                                toolbarSummon.unpin();
                            }
                        }}
                    >
                        {toolbar}
                    </div>
                </FloatingToolbar>
            ) : null}
            {/* The plugins' editing UI, portalled into the text but part of this tree, so it shares the host's context. */}
            {viewPortals}
            {readOnly ? null : (
                <StatusAnnouncer api={handle?.api ?? null} editorState={editorState} expectedRef={expectedRef} />
            )}
            {/* Only worth having when a plugin offers something beyond the built-in Text. */}
            {readOnly || !showEditor || handle === null || commands.length < 2 ? null : (
                <SlashMenu handle={handle} editorState={editorState} editableRef={containerRef} commands={commands} />
            )}
        </div>
    );
};

// Helpers

/** The name of an editor the host did not name. */
const DEFAULT_LABEL = 'Rich text editor';

/** The key that moves focus from the text to the toolbar, the usual one for rich text editors. */
const isToolbarHotkey = (event: KeyboardEvent): boolean => event.altKey && event.key === 'F10';

/**
 * A key that runs a command rather than typing or moving the caret: what the
 * status region listens after. Enter counts — it is how a heading ends.
 */
const isCommandKey = (event: KeyboardEvent): boolean =>
    !/^(Arrow|Home|End|Page)/.test(event.key) &&
    (event.metaKey || event.ctrlKey || event.altKey || event.key === 'Enter');

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

/** The attributes of the editable element: a textbox, named by the host or else by `DEFAULT_LABEL`. */
const editableAttributes = ({
    id,
    className,
    hostLabels,
    isNamed,
    placeholder,
}: {
    id: string;
    className: string;
    hostLabels: Record<string, string>;
    isNamed: boolean;
    placeholder: string;
}): Record<string, string> => ({
    id,
    class: className,
    role: 'textbox',
    'aria-multiline': 'true',
    ...(isNamed ? {} : { 'aria-label': DEFAULT_LABEL }),
    ...hostLabels,
    ...(placeholder === '' ? {} : { 'aria-placeholder': placeholder }),
});

/** A visually hidden live region reading formatting changes out. */
const StatusAnnouncer = ({
    api,
    editorState,
    expectedRef,
}: {
    api: EditorHandle['api'] | null;
    editorState: EditorStateStore;
    expectedRef: { current: boolean };
}): ReactNode => {
    const message = useStatusAnnouncement({ api, editorState, expectedRef });
    return (
        <span role="status" className={styles.visuallyHidden}>
            {message}
        </span>
    );
};
