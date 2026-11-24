/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Component, type ReactNode } from 'react';

import { warnEditorCrashed } from '../warnings';

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
        warnEditorCrashed(thrown);
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
