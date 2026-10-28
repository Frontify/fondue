/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Component,
    type ComponentType,
    type ForwardedRef,
    forwardRef,
    type ReactNode,
    useCallback,
    useRef,
} from 'react';

import '#/styles/content.css';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
import { type ShippedCommands } from '#/runtime/port';

import { useCoarsePointer, useProfile } from '../profiles';
import { type Defined, type EditorHandle, type RichTextEditorProps, type RichTextProfile } from '../types';

import { LoadingShell } from './components/LoadingShell';
import { BubbleToolbarPart, Panels, Status, Surface, Toolbar } from './components/Parts';
import { ProfileRetryShell } from './components/ProfileRetryShell';
import { RecoveryShell } from './components/RecoveryShell';
import { Session } from './components/Session';
import { shellPropsOf } from './helpers/sessionHelpers';
import { useEditorLocale } from './hooks/useEditorLocale';
import { DEFAULT_TEST_ID, type Props, type RecoverySession } from './types';

export type RecoveryProps = {
    props: Defined & { children: ReactNode };
    editorRef: ForwardedRef<EditorHandle<object> | null>;
};
type RecoveryState = {
    failed: boolean;
    /** The snapshot that Retry mounts the editor from, under the ID and revision it was loaded with. */
    retried: LoadedDocument | undefined;
    /** Whether that snapshot holds changes the failed session never saved, which the remount then saves. */
    unsavedOnMount: boolean;
    /** The write the failed session left with an unknown outcome, which the remount replays first. */
    carried: SaveRequest | undefined;
    /** Counts Retries, so each mounts a new session even when no render error unmounted the last. */
    retries: number;
};

/**
 * The outer boundary: a render error, or a session that enters `faulted`, shows the recovery shell with the last
 * published snapshot.
 */
class Recovery extends Component<RecoveryProps, RecoveryState> {
    state: RecoveryState = { failed: false, retried: undefined, unsavedOnMount: false, carried: undefined, retries: 0 };
    // The last session, whose snapshot stays readable after it is disposed.
    private session: RecoverySession | undefined;

    static getDerivedStateFromError() {
        return { failed: true };
    }

    private readonly onSession = (session: RecoverySession) => {
        this.session = session;
    };

    private defaultValue(): LoadedDocument {
        if (this.state.retried !== undefined) {
            return this.state.retried;
        }

        return this.props.props.defaultValue;
    }

    /** What the last session left: its snapshot under its own document ID and acknowledged revision, and what it never saved. */
    private left(): {
        retried: LoadedDocument;
        unsavedOnMount: boolean;
        carried: SaveRequest | undefined;
    } {
        let { documentId, document, revision } = this.defaultValue();
        let unsavedOnMount = false;
        let carried: SaveRequest | undefined;
        if (this.session !== undefined) {
            const snapshot = this.session.handle.getSnapshot();
            // The session's own document ID, which neither a host rerender nor a replacement leaves behind.
            documentId = snapshot.stamp.documentId;
            document = snapshot.document;
            // The acknowledged revision is the base of the next write, so a session that saved does not conflict with itself.
            revision = snapshot.acknowledgedRevision;
            const status = this.session.handle.getSaveStatus();
            // Every managed state but `clean` holds changes the server has not acknowledged, a carried edit included.
            unsavedOnMount = status.state !== 'clean' && status.state !== 'unmanaged';
            carried = this.session.unresolved();
        }

        return { retried: { documentId, revision, document }, unsavedOnMount, carried };
    }

    private readonly onRetry = () =>
        this.setState(({ retries }) => ({ ...this.left(), failed: false, retries: retries + 1 }));

    render() {
        const { props, editorRef } = this.props;
        if (!this.state.failed) {
            return (
                <Session
                    key={this.state.retries}
                    {...props}
                    retried={this.state.retried}
                    unsavedOnMount={this.state.unsavedOnMount}
                    carried={this.state.carried}
                    onSession={this.onSession}
                    onRetry={this.onRetry}
                    ref={editorRef}
                />
            );
        }

        return (
            <RecoveryShell document={this.left().retried.document} {...shellPropsOf(props)} onRetry={this.onRetry} />
        );
    }
}

type RootProps = Props & { children: ReactNode };

const Root = forwardRef((props: RootProps, ref: ForwardedRef<EditorHandle<object> | null>) => {
    const { definition } = props;
    const locale = useEditorLocale(props.locale);
    let profile: RichTextProfile | undefined;
    if (definition === undefined) {
        profile = props.profile ?? 'document';
    }

    const { shipped, failed, retry } = useProfile(profile, props.onDiagnostic);
    const handleRef = useRef<EditorHandle<object> | null>(null);
    const refocusRef = useRef(false);
    const mergedHandleRef = useCallback(
        (handle: EditorHandle<object> | null) => {
            handleRef.current = handle;
            if (typeof ref === 'function') {
                ref(handle);
            } else if (ref !== null) {
                ref.current = handle;
            }
        },
        [ref],
    );
    const coarse = useCoarsePointer();
    if (definition !== undefined) {
        return <Recovery props={{ ...props, definition, locale }} editorRef={ref} />;
    }

    // The profile's module loads through `import()`, and the editor renders once it has.
    if (shipped === undefined) {
        const shell = {
            locale,
            testId: props['data-test-id'] ?? DEFAULT_TEST_ID,
            contentClassName: props.presentation?.contentClassName,
            multiline: profile !== 'inline',
            label: props['aria-label'],
            labelledBy: props['aria-labelledby'],
            spellCheck: props.spellCheck ?? true,
        };
        if (failed) {
            return (
                <ProfileRetryShell
                    {...shell}
                    onRetry={(focused) => {
                        refocusRef.current = focused;
                        retry();
                    }}
                />
            );
        }

        return <LoadingShell {...shell} />;
    }

    const onReady: Props['onReady'] = (session) => {
        props.onReady?.(session);
        if (refocusRef.current) {
            refocusRef.current = false;
            handleRef.current?.focus();
        }
    };

    let resolved: Defined & { children: ReactNode } = { ...props, definition: shipped.definition, locale, onReady };
    if (props.presentation === undefined) {
        let { presentation } = shipped;
        if (coarse && shipped.touchPresentation !== undefined) {
            presentation = shipped.touchPresentation;
        }

        resolved = { ...resolved, presentation };
    }

    return <Recovery props={resolved} editorRef={mergedHandleRef} />;
});
Root.displayName = 'RichTextEditor.Root';

const Editor = forwardRef((props: Props, ref: ForwardedRef<EditorHandle<object> | null>) => (
    <Root {...props} ref={ref}>
        <Toolbar />
        <Panels />
        <Surface />
        <Status />
    </Root>
));
Editor.displayName = 'RichTextEditor';

/** Generic, so a definition compiled from any model types its handle. */
export const RichTextEditor = Object.assign(Editor, {
    Root,
    Surface,
    Toolbar,
    BubbleToolbar: BubbleToolbarPart,
    Status,
    Panels,
}) as (<Commands extends object = ShippedCommands>(props: RichTextEditorProps<Commands>) => ReactNode) & {
    /** Takes the editor props and renders its own layout from the parts; `RichTextEditor` is Root with the default parts. */
    Root: <Commands extends object = ShippedCommands>(
        props: RichTextEditorProps<Commands> & { children: ReactNode },
    ) => ReactNode;
    Surface: ComponentType<object>;
    Toolbar: ComponentType<object>;
    BubbleToolbar: ComponentType<object>;
    Status: ComponentType<object>;
    Panels: ComponentType<object>;
};
