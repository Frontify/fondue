/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { Component, type ErrorInfo, type ReactNode, type RefObject, useEffect, useRef } from 'react';

import { type PluginRegistry, type RteDocumentOf } from '#/core';
import { RegistryRenderer } from '#/renderer';

import { type RichTextEditorLabels } from './labels';
import styles from './richTextEditor.module.scss';

type EditorErrorBoundaryProps = {
    children: ReactNode;
    /** Shown in place of `children` once one of them throws while rendering or mounting. */
    fallback: ReactNode;
    /** Called once when a child throws, after the fallback is chosen. */
    onCatch?: () => void;
};

/**
 * Keeps an error in the editor's tree (a toolbar item, a node view, the engine
 * mount) from unmounting the host's page section. Not caught, because React
 * does not route them here: errors in event handlers, including ProseMirror's own.
 */
export class EditorErrorBoundary extends Component<EditorErrorBoundaryProps, { failed: boolean }> {
    override state = { failed: false };

    static getDerivedStateFromError(): { failed: boolean } {
        return { failed: true };
    }

    override componentDidCatch(error: Error, _info: ErrorInfo): void {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[RichTextEditor] The editor crashed and was replaced by a read-only view.', error);
        }
        // A host callback that throws here would escape the boundary and unmount the page section.
        try {
            this.props.onCatch?.();
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

/** The document read-only, what went wrong, and the way to try again. */
export const EditorFallback = ({
    value,
    ownDocumentRef,
    registry,
    labels,
    onRetry,
    focusOnMount,
}: {
    value: RteDocumentOf | undefined;
    /** Read now, not when the fallback was built: the editor reported edits after that. */
    ownDocumentRef: RefObject<RteDocumentOf | null>;
    registry: PluginRegistry;
    labels: RichTextEditorLabels;
    onRetry: () => void;
    /** Take focus on mount, as when Retry failed again and the button that had focus is gone. */
    focusOnMount: boolean;
}): ReactNode => {
    const retryRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        if (focusOnMount) {
            retryRef.current?.focus();
        }
    }, [focusOnMount]);
    // What the editor showed, which is what a crash reports: an echoed `value` can be older.
    const document = ownDocumentRef.current ?? value;
    if (document === undefined) {
        return null;
    }
    return (
        <div className={styles.root}>
            {/* A plugin whose readonly view throws too leaves just the message and Retry. */}
            <EditorErrorBoundary fallback={null}>
                <RegistryRenderer value={document} registry={registry} className={styles.content} />
            </EditorErrorBoundary>
            <p role="alert">{labels.editorFailed}</p>
            <Button ref={retryRef} type="button" size="medium" emphasis="weak" onPress={onRetry}>
                {labels.retry}
            </Button>
        </div>
    );
};
