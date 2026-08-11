/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect, useReducer, useRef } from 'react';

import { classNames } from '../helpers/classNames';
import { createEditor, type EditorHandle } from '../prosemirror';
import styles from '../richTextEditor.module.scss';
import { emptyDocument, type RteDocumentOf, type RtePlugin } from '#/domain';

/**
 * Owns the live editor: creates it once per plugin set, carries later prop
 * changes into it, and re-renders the component whenever the editor state moves
 * — the toolbar and the panels read their state straight off the handle.
 */

type UseEditorHandleOptions = {
    plugins: RtePlugin[];
    value: RteDocumentOf | undefined;
    readOnly: boolean;
    placeholder: string;
    onDocChange: (doc: RteDocumentOf) => void;
    onBlur: (doc: RteDocumentOf) => void;
};

export const useEditorHandle = ({
    plugins,
    value,
    readOnly,
    placeholder,
    onDocChange,
    onBlur,
}: UseEditorHandleOptions): {
    /** Where the editable element is mounted. */
    containerRef: MutableRefObject<HTMLDivElement | null>;
    /** Null until the editor exists, i.e. for the first render only. */
    handle: EditorHandle | null;
} => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    // Read through refs so a changed callback never re-creates the editor.
    const onDocChangeRef = useRef(onDocChange);
    onDocChangeRef.current = onDocChange;
    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;
    // The editor is created once per plugin set, so these reach it as starting
    // values; the effects below carry every later change.
    const initialRef = useRef({ readOnly, placeholder });

    // The toolbar reads its state straight off the editor, so it has to
    // re-render whenever the editor state changes.
    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    // A plugin that lays out the whole content (columns) styles the editable
    // element rather than anything it renders itself.
    const contentClassName = classNames(styles.content, ...plugins.map((plugin) => plugin.contentClassName));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handle = createEditor({
            container,
            initialDoc: value ?? emptyDocument(),
            plugins,
            readOnly: initialRef.current.readOnly,
            placeholder: initialRef.current.placeholder,
            contentClassName,
            placeholderClassName: classNames(styles.placeholder),
            onDocChange: (doc) => onDocChangeRef.current(doc),
            onStateChange: force,
            onBlur: (doc) => onBlurRef.current(doc),
        });
        handleRef.current = handle;
        force();

        return () => {
            handle.destroy();
            handleRef.current = null;
        };
        // Intentional: re-create the editor only when the plugin set changes.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey]);

    // Push externally-driven doc updates into the editor.
    useEffect(() => {
        if (value) {
            handleRef.current?.setDoc(value);
        }
    }, [value]);

    useEffect(() => {
        handleRef.current?.setReadOnly(readOnly);
    }, [readOnly]);

    useEffect(() => {
        handleRef.current?.setPlaceholder(placeholder);
    }, [placeholder]);

    return { containerRef, handle: handleRef.current };
};
