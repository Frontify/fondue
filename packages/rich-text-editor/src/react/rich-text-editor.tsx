/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Component, type ComponentType, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import '#/styles/content.css';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
import { type ShippedCommands } from '#/runtime/types';

import { useEditorLocale } from './locale';
import { useCoarsePointer, useProfile } from './profiles';
import { shellPropsOf } from './session/helpers';
import { BubbleToolbarPart, Panels, Status, Surface, Toolbar } from './session/parts';
import { Session } from './session/session';
import { DEFAULT_TEST_ID, type Defined, type Props, type RecoverySession } from './session/types';
import { LoadingShell, RecoveryShell } from './shells';
import { type EditorHandle, type RichTextEditorProps, type RichTextProfile } from './types';

interface RecoveryProps {
    readonly props: Defined & { readonly children: ReactNode };
    readonly editorRef: ForwardedRef<EditorHandle<object> | null>;
}
interface RecoveryState {
    readonly failed: boolean;
    /** The snapshot that Retry mounts the editor from, under the ID and revision it was loaded with. */
    readonly retried: LoadedDocument | undefined;
    /** Whether that snapshot holds changes the failed session never saved, which the remount then saves. */
    readonly unsavedOnMount: boolean;
    /** The write the failed session left with an unknown outcome, which the remount replays first. */
    readonly carried: SaveRequest | undefined;
    /** Counts Retries, so each mounts a new session even when no render error unmounted the last. */
    readonly retries: number;
}

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
        readonly retried: LoadedDocument;
        readonly unsavedOnMount: boolean;
        readonly carried: SaveRequest | undefined;
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

const Root = forwardRef(
    (props: Props & { readonly children: ReactNode }, ref: ForwardedRef<EditorHandle<object> | null>) => {
        const { definition } = props;
        const locale = useEditorLocale(props.locale);
        let profile: RichTextProfile | undefined;
        if (definition === undefined) {
            profile = props.profile ?? 'document';
        }
        const shipped = useProfile(profile);
        const coarse = useCoarsePointer();
        if (definition !== undefined) {
            return <Recovery props={{ ...props, definition, locale }} editorRef={ref} />;
        }
        // The profile's module loads through `import()`, and the editor renders once it has.
        if (shipped === undefined) {
            return (
                <LoadingShell
                    locale={locale}
                    testId={props['data-test-id'] ?? DEFAULT_TEST_ID}
                    contentClassName={props.presentation?.contentClassName}
                    multiline={profile !== 'inline'}
                    label={props['aria-label']}
                    labelledBy={props['aria-labelledby']}
                    spellCheck={props.spellCheck ?? true}
                />
            );
        }
        let resolved: Defined & { readonly children: ReactNode } = { ...props, definition: shipped.definition, locale };
        if (props.presentation === undefined) {
            let { presentation } = shipped;
            if (coarse && shipped.touchPresentation !== undefined) {
                presentation = shipped.touchPresentation;
            }
            resolved = { ...resolved, presentation };
        }
        return <Recovery props={resolved} editorRef={ref} />;
    },
);
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
}) as unknown as (<C extends object = ShippedCommands>(props: RichTextEditorProps<C>) => ReactNode) & {
    /** Takes the editor props and renders its own layout from the parts; `RichTextEditor` is Root with the default parts. */
    readonly Root: <C extends object = ShippedCommands>(
        props: RichTextEditorProps<C> & { readonly children: ReactNode },
    ) => ReactNode;
    readonly Surface: ComponentType<object>;
    readonly Toolbar: ComponentType<object>;
    readonly BubbleToolbar: ComponentType<object>;
    readonly Status: ComponentType<object>;
    readonly Panels: ComponentType<object>;
};
