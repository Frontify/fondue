/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import {
    Component,
    type MutableRefObject,
    type ReactNode,
    type RefObject,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';

import { type PluginRegistry, type RteDocumentOf } from '#/core';
import { RegistryRenderer } from '#/renderer';

import { type RichTextEditorLabels } from './labels';
import styles from './richTextEditor.module.scss';

type EditorErrorBoundaryProps = {
    children: ReactNode;
    /** Shown in place of `children` once one of them throws while rendering or mounting. */
    fallback: ReactNode;
    /** Called once when a child throws, after the fallback is chosen. */
    onCatch?: (error: Error) => void;
    /** A new value shows `children` again, as for a document that may render where the last one threw. */
    resetKey?: unknown;
};

type EditorErrorBoundaryState = { failed: boolean; resetKey: unknown };

/**
 * Keeps an error in the editor's tree (a toolbar item, a node view, the engine
 * mount) from unmounting the host's page section. Not caught, because React
 * does not route them here: errors in event handlers, including ProseMirror's own.
 */
export class EditorErrorBoundary extends Component<EditorErrorBoundaryProps, EditorErrorBoundaryState> {
    override state: EditorErrorBoundaryState = { failed: false, resetKey: this.props.resetKey };

    static getDerivedStateFromError(): Partial<EditorErrorBoundaryState> {
        return { failed: true };
    }

    static getDerivedStateFromProps(
        props: EditorErrorBoundaryProps,
        state: EditorErrorBoundaryState,
    ): Partial<EditorErrorBoundaryState> | null {
        if (props.resetKey !== state.resetKey) {
            return { failed: false, resetKey: props.resetKey };
        }
        return null;
    }

    override componentDidCatch(thrown: unknown): void {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[RichTextEditor] The editor crashed and was replaced by a read-only view.', thrown);
        }
        // React hands over whatever was thrown, which a plugin need not have made an Error.
        let error: Error;
        if (thrown instanceof Error) {
            error = thrown;
        } else {
            error = new Error(String(thrown));
        }
        // A host callback that throws here would escape the boundary and unmount the page section.
        try {
            this.props.onCatch?.(error);
        } catch (callbackError) {
            if (typeof globalThis.reportError === 'function') {
                globalThis.reportError(callbackError);
            } else {
                setTimeout(() => {
                    throw callbackError;
                });
            }
        }
    }

    override render(): ReactNode {
        if (this.state.failed) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

type EditorFallbackProps = {
    /** The host's document; one it passes after the crash is shown instead. */
    value: RteDocumentOf | undefined;
    /** What the editor showed, read now: it reported edits after the fallback was built. Set to what this shows, for Try again. */
    ownDocumentRef: MutableRefObject<RteDocumentOf>;
    registry: PluginRegistry;
    labels: RichTextEditorLabels;
    /** Told whether the pressed button had focus, which goes with it. */
    onRetry: (hadFocus: boolean) => void;
    /** Whether focus was in what this replaces: the editor, or a fallback whose Retry was pressed. */
    focusWithinRef: RefObject<boolean>;
    /** The host's name for the editor as a group, so the message and Retry say which editor failed. */
    groupAttributes: Record<string, string>;
    /** Told when the read-only view throws too, as a crash of its own. */
    onCatch?: (error: Error) => void;
};

/**
 * The document read-only, what went wrong, and the way to try again. It shows
 * the last document the editor showed, its own edit or a host's `value` it
 * applied. A `value` passed in the same render that crashed was never applied,
 * so it shows only once the host passes another.
 */
export const EditorFallback = ({
    value,
    ownDocumentRef,
    registry,
    labels,
    onRetry,
    focusWithinRef,
    groupAttributes,
    onCatch,
}: EditorFallbackProps): ReactNode => {
    const retryRef = useRef<HTMLButtonElement | null>(null);
    const messageId = useId();
    const onPress = (): void => {
        const button = retryRef.current;
        onRetry(button !== null && button.ownerDocument.activeElement === button);
    };
    useEffect(() => {
        const button = retryRef.current;
        if (!focusWithinRef.current || button === null) {
            return;
        }
        // Only when focus was lost with the element that held it, never taken from where the user moved it.
        const { activeElement, body } = button.ownerDocument;
        if (activeElement === null || activeElement === body) {
            button.focus();
        }
    }, [focusWithinRef]);
    const [crashValue] = useState(value);
    let document = ownDocumentRef.current;
    if (value !== undefined && value !== crashValue) {
        document = value;
    }
    useEffect(() => {
        ownDocumentRef.current = document;
    }, [ownDocumentRef, document]);
    return (
        <div className={styles.root} {...groupAttributes}>
            {/* A plugin whose readonly view throws too leaves just the message and Retry. */}
            <EditorErrorBoundary fallback={null} resetKey={document} onCatch={onCatch}>
                <RegistryRenderer value={document} registry={registry} className={styles.content} />
            </EditorErrorBoundary>
            <p id={messageId} role="alert">
                {labels.editorFailed}
            </p>
            <Button
                ref={retryRef}
                type="button"
                size="medium"
                emphasis="weak"
                aria-describedby={messageId}
                onPress={onPress}
            >
                {labels.retry}
            </Button>
        </div>
    );
};
