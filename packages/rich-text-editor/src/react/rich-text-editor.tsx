/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Component,
    type ComponentType,
    createContext,
    forwardRef,
    type ForwardedRef,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import '#/styles/content.css';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { createReactWork, inReactWork, Phase, ReactWorkContext, sharesName } from '#/bridge/dev-checks';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { createNodeViews, resyncSelection } from '#/bridge/node-views';
import { PortalHost } from '#/bridge/portal-host';
import { createPortalStore } from '#/bridge/portals';
import { enUS } from '#/locales/en-US';
import { type CapabilityRef, type DecodeResult, type Diagnostic } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { contentClasses } from '#/model/output';
import { createSaveCoordinator } from '#/persistence/coordinator';
import { type LoadedDocument } from '#/persistence/types';
import { readerContext } from '#/reader/context';
import { type ReaderPresentation } from '#/reader/reader';
import { browserEnvironment } from '#/runtime/environment';
import {
    createEditorRuntime,
    type EditorRuntime,
    type EditorRuntimeOptions,
    isEmpty,
    type RuntimeHandle,
} from '#/runtime/runtime';
import { type DocumentChange, type SessionToken, type ShippedCommands } from '#/runtime/types';

import { engineOf, viewsOf } from './define';
import { BlockedShell, RecoveryShell } from './shells';
import {
    type CompiledEditorDefinition,
    type EditorHandle,
    type EditorServices,
    type RichTextEditorProps,
} from './types';

type Props = RichTextEditorProps<object>;
/** The props once `definition` is known to be set. */
type Defined = Props & { readonly definition: CompiledEditorDefinition<object> };
const DEFAULT_TEST_ID = 'fondue-rich-text-editor';
const NO_PRESENTATION: ReaderPresentation = {};
const SERVICE_MEMBERS = ['persistence', 'recovery', 'references', 'uploads', 'assets'] as const;

const memberOf = <K extends (typeof SERVICE_MEMBERS)[number]>(
    services: EditorServices | undefined,
    member: K,
): EditorServices[K] | undefined => {
    if (services === undefined) {
        return undefined;
    }
    return services[member];
};

/** Whether a services member changed: added, removed, or holding another function under some name (DR-074). */
const memberChanged = (previous: object | undefined, next: object | undefined) => {
    if (previous === undefined || next === undefined) {
        return previous !== next;
    }
    const names = new Set([...Object.keys(previous), ...Object.keys(next)]);
    return [...names].some((name) => Reflect.get(previous, name) !== Reflect.get(next, name));
};

/** What one mount keeps for its whole life: a changed `definition` or `profile` needs a new mount (SPEC-rich-text-react/AC-071). */
interface Mounted {
    readonly definition: CompiledEditorDefinition<object>;
    readonly profile: Props['profile'];
    /** `undefined` for a blocked document, which gets no session. */
    readonly decoded: { readonly tree: TreeNode; readonly capabilities: readonly CapabilityRef[] } | undefined;
    readonly blocked: Extract<DecodeResult, { readonly status: 'blocked' }> | undefined;
    readonly lang: string;
}

const mountOf = (props: Defined): Mounted => {
    const { definition, profile, defaultValue } = props;
    const engine = engineOf(definition);
    const { result, tree } = decodeToTree(defaultValue.document, engine.model, { limits: definition.limits });
    let lang = enUS.lang;
    if (props.locale !== undefined && props.locale.lang !== undefined) {
        lang = props.locale.lang;
    }
    if (result.status === 'blocked') {
        return { definition, profile, decoded: undefined, blocked: result, lang };
    }
    if (tree === undefined) {
        return { definition, profile, decoded: undefined, blocked: undefined, lang };
    }
    // The surface spellchecks in the document's language when it declares one (SPEC-rich-text-editing/AC-068).
    if (tree.attrs !== undefined && typeof tree.attrs.lang === 'string') {
        lang = tree.attrs.lang;
    }
    const decoded = { tree, capabilities: result.document.requiredCapabilities };
    return { definition, profile, decoded, blocked: undefined, lang };
};

interface RootContextValue {
    readonly props: Props;
    readonly mounted: Mounted;
    readonly coordinator: MountCoordinator;
}
const RootContext = createContext<RootContextValue | null>(null);
RootContext.displayName = 'RichTextEditorRootContext';

const useRoot = (part: string): RootContextValue => {
    const context = useContext(RootContext);
    if (context === null) {
        throw new Error(`RichTextEditor.${part} must be rendered inside RichTextEditor.Root.`);
    }
    return context;
};

const modeOf = ({ readOnly, disabled }: Props) => {
    if (readOnly === true || disabled === true) {
        return 'readonly';
    }
    return 'editable';
};

/** What both shells read the document with, from the editor props and their defaults. */
const shellPropsOf = (props: Defined) => {
    const {
        definition,
        locale = enUS,
        presentation = NO_PRESENTATION,
        'data-test-id': testId = DEFAULT_TEST_ID,
    } = props;
    return { model: engineOf(definition).model, limits: definition.limits, presentation, locale, testId };
};

/** A running session and the document it was loaded from. */
interface RecoverySession {
    readonly handle: RuntimeHandle;
    readonly loaded: LoadedDocument;
}

type SessionProps = Defined & {
    readonly children: ReactNode;
    /** Receives the handle of each session it runs, whose snapshot the recovery shell reads. */
    readonly onSession: (session: RecoverySession) => void;
    /** The document holds changes the failed session before Retry never saved. */
    readonly unsavedOnMount: boolean;
};

const SessionComponent = ({ children, onSession, ...props }: SessionProps, ref: ForwardedRef<EditorHandle<object>>) => {
    const [mounted] = useState(() => mountOf(props));
    const [coordinator] = useState(createMountCoordinator);
    // One portal store per mount, so no session shares chrome state with another (SPEC-rich-text/AC-014).
    const [portals] = useState(() => {
        const { environment = browserEnvironment } = props;
        return createPortalStore(environment.scheduler);
    });
    // A production build marks no React work, so `execute` never asks (SPEC-rich-text-react/AC-102).
    const [work] = useState(() => {
        if (process.env.NODE_ENV === 'production') {
            return undefined;
        }
        const { environment = browserEnvironment } = props;
        return createReactWork(environment.scheduler);
    });
    // The session once it is ready, which the parts and hooks read.
    const [live, setLive] = useState<EditorRuntime>();
    const latestRef = useRef(props);
    const handleRef = useRef<EditorHandle<object> | null>(null);

    useClientLayoutEffect(() => {
        latestRef.current = props;
    });

    // The view attaches in a layout effect, so the first frame painted after hydration shows the content (SPEC-rich-text-output/AC-034).
    useClientLayoutEffect(() => {
        const { definition, decoded } = mounted;
        if (decoded === undefined) {
            return;
        }
        const { environment = browserEnvironment, defaultValue } = latestRef.current;
        const engine = engineOf(definition);
        // A session is managed for its whole life when it mounts with `services.persistence` (SPEC-rich-text-persistence/AC-001).
        const persistence = memberOf(latestRef.current.services, 'persistence');
        let saves: EditorRuntimeOptions['saves'];
        if (persistence !== undefined) {
            saves = (session) =>
                createSaveCoordinator(session, {
                    // A host that drops the member later keeps the service the session mounted with.
                    service: () => memberOf(latestRef.current.services, 'persistence') ?? persistence,
                    options: () => latestRef.current.persistenceOptions,
                    revision: defaultValue.revision,
                    unsavedOnMount: latestRef.current.unsavedOnMount,
                    model: engine.model,
                    environment,
                });
        }
        const runtime = createEditorRuntime({
            definition: engine,
            documentId: defaultValue.documentId,
            tree: decoded.tree,
            capabilities: decoded.capabilities,
            environment,
            mode: modeOf(latestRef.current),
            policy: definition.authoring,
            limits: definition.limits,
            nodeViews: (session) => createNodeViews(viewsOf(definition), { portals, runtime: session }),
            inRender: () => inReactWork(work),
            revision: defaultValue.revision,
            saves,
        });
        // Each event calls the newest callback the host passed (SPEC-rich-text-react/AC-004).
        runtime.handle.subscribe('ready', (session: SessionToken) => {
            setLive(runtime);
            const { view } = runtime;
            if (process.env.NODE_ENV !== 'production' && view !== undefined && sharesName(view.dom)) {
                runtime.report({
                    code: 'react.duplicate-accessible-name',
                    severity: 'warning',
                    messageKey: 'react.duplicate-accessible-name',
                });
            }
            latestRef.current.onReady?.(session);
        });
        runtime.handle.subscribe('documentChange', (change: DocumentChange) =>
            latestRef.current.onDocumentChange?.(change),
        );
        runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) =>
            latestRef.current.onDiagnostic?.(diagnostic),
        );
        handleRef.current = runtime.handle;
        onSession({ handle: runtime.handle, loaded: defaultValue });
        coordinator.start(runtime);
        return () => {
            coordinator.stop();
            runtime.handle.dispose();
        };
    }, [mounted, coordinator, portals, work, onSession]);

    // A blocked document gets no session and so no handle.
    useImperativeHandle(ref, () => handleRef.current as EditorHandle<object>, []);

    const mode = modeOf(props);
    useClientLayoutEffect(() => {
        handleRef.current?.setMode(mode);
    }, [mode]);

    // A changed `services` member aborts the operations it started, with no rebuild (SPEC-rich-text-runtime/AC-073, DR-074).
    const { services } = props;
    const servicesRef = useRef(services);
    useEffect(() => {
        const previous = servicesRef.current;
        servicesRef.current = services;
        const changed = SERVICE_MEMBERS.filter((member) =>
            memberChanged(memberOf(previous, member), memberOf(services, member)),
        );
        if (changed.length > 0) {
            coordinator.runtime?.changeServices(changed);
        }
    }, [services, coordinator]);

    const { definition, profile } = props;
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        if (definition === mounted.definition && profile === mounted.profile) {
            return;
        }
        const runtime = coordinator.runtime;
        if (runtime !== undefined) {
            runtime.report({
                code: 'react.definition-changed',
                severity: 'warning',
                messageKey: 'react.definition-changed',
            });
        }
    }, [definition, profile, mounted, coordinator]);

    const onFlush = useCallback(() => resyncSelection(coordinator.runtime?.view), [coordinator]);

    const shell = shellPropsOf(props);
    const { locale, presentation, testId } = shell;
    // Chrome reads the newest presentation and locale with no view rebuild (SPEC-rich-text-react/AC-065).
    const chromeContext = useMemo(() => readerContext(locale, presentation), [locale, presentation]);

    const context = useMemo(() => ({ props, mounted, coordinator }), [props, mounted, coordinator]);
    if (mounted.blocked !== undefined) {
        return <BlockedShell result={mounted.blocked} {...shell} />;
    }
    return (
        <RootContext.Provider value={context}>
            <SessionContext.Provider value={live}>
                <ReactWorkContext.Provider value={work}>
                    <div data-test-id={testId} aria-busy={live === undefined ? true : undefined}>
                        {work !== undefined && <Phase work={work} open />}
                        {children}
                        <PortalHost store={portals} context={chromeContext} onFlush={onFlush} />
                        {work !== undefined && <Phase work={work} open={false} />}
                    </div>
                </ReactWorkContext.Provider>
            </SessionContext.Provider>
        </RootContext.Provider>
    );
};
const Session = forwardRef(SessionComponent);
Session.displayName = 'RichTextEditor.Session';

interface RecoveryProps {
    readonly props: Defined & { readonly children: ReactNode };
    readonly editorRef: ForwardedRef<EditorHandle<object>>;
}
interface RecoveryState {
    readonly failed: boolean;
    /** The snapshot that Retry mounts the editor from, under the ID and revision it was loaded with (SPEC-rich-text-react/AC-085). */
    readonly retried: LoadedDocument | undefined;
    /** Whether that snapshot holds changes the failed session never saved, which the remount then saves. */
    readonly unsavedOnMount: boolean;
}

/** The outer boundary: a render error shows the recovery shell with the last published snapshot (SPEC-rich-text-react/AC-022). */
class Recovery extends Component<RecoveryProps, RecoveryState> {
    state: RecoveryState = { failed: false, retried: undefined, unsavedOnMount: false };
    // The last session, whose snapshot stays readable after it is disposed.
    private session: RecoverySession | undefined;

    static getDerivedStateFromError() {
        return { failed: true };
    }

    private readonly onSession = (session: RecoverySession) => {
        this.session = session;
    };

    render() {
        const { props, editorRef } = this.props;
        let { defaultValue } = props;
        if (this.state.retried !== undefined) {
            defaultValue = this.state.retried;
        }
        if (!this.state.failed) {
            return (
                <Session
                    {...props}
                    defaultValue={defaultValue}
                    unsavedOnMount={this.state.unsavedOnMount}
                    onSession={this.onSession}
                    ref={editorRef}
                />
            );
        }
        // A host rerender with another document must not take this session's content under its ID.
        let loaded = defaultValue;
        let { document, revision } = defaultValue;
        let unsavedOnMount = false;
        if (this.session !== undefined) {
            loaded = this.session.loaded;
            const snapshot = this.session.handle.getSnapshot();
            document = snapshot.document;
            // The acknowledged revision is the base of the next write, so a session that saved does not conflict with itself.
            revision = snapshot.acknowledgedRevision;
            const status = this.session.handle.getSaveStatus();
            // Every managed state but `clean` holds changes the server has not acknowledged, a carried edit included.
            unsavedOnMount = status.state !== 'clean' && status.state !== 'unmanaged';
        }
        return (
            <RecoveryShell
                document={document}
                {...shellPropsOf(props)}
                onRetry={() =>
                    this.setState({ failed: false, retried: { ...loaded, revision, document }, unsavedOnMount })
                }
            />
        );
    }
}

const Root = forwardRef((props: Props & { readonly children: ReactNode }, ref: ForwardedRef<EditorHandle<object>>) => {
    const { definition } = props;
    // A host mistake, which no recovery shell can show without a model.
    if (definition === undefined) {
        throw new Error('RichTextEditor needs a `definition` until the profiles land with pair 37, TASK-rte-profiles.');
    }
    return <Recovery props={{ ...props, definition }} editorRef={ref} />;
});
Root.displayName = 'RichTextEditor.Root';

/** The host's class tokens the surface may add and remove: never the package's root class nor one of ProseMirror's own. */
const hostClassNames = (contentClassName: string) =>
    contentClassName
        .split(/\s+/)
        .filter((name) => name !== '' && contentClasses() !== name && !/^ProseMirror(-|$)/.test(name));

const emptiness = (runtime: EditorRuntime | undefined) => {
    if (runtime === undefined) {
        return undefined;
    }
    return isEmpty(runtime.state);
};

/**
 * The editable surface: an empty container on the server and in the first client render, which the engine fills
 * after mount (SPEC-rich-text-output/AC-011, AC-033).
 */
const Surface = () => {
    const { props, mounted, coordinator } = useRoot('Surface');
    const { 'data-test-id': testId = DEFAULT_TEST_ID, spellCheck = true, placeholder, presentation } = props;
    const contentClassName = presentation?.contentClassName;
    // React writes the first classes only: ProseMirror adds its own to this element with `classList`, which a rewritten attribute would drop.
    const [className] = useState(() => contentClasses(contentClassName));
    const surfaceRef = useRef<HTMLElement | null>(null);
    const setSurface = useCallback(
        (element: HTMLElement | null) => {
            surfaceRef.current = element;
            coordinator.setSurface(element);
        },
        [coordinator],
    );
    // A later host class swaps in with `classList`, as ProseMirror's own class changes do (SPEC-rich-text-react/AC-065, AC-066).
    useClientLayoutEffect(() => {
        const surface = surfaceRef.current;
        if (surface === null || contentClassName === undefined) {
            return undefined;
        }
        const names = hostClassNames(contentClassName);
        surface.classList.add(...names);
        return () => surface.classList.remove(...names);
    }, [contentClassName]);
    // A document that is not empty shows no placeholder; before the session is ready the container is empty, as on the server (SPEC-rich-text-react/AC-093).
    let shownPlaceholder = placeholder;
    if (useSessionValue(emptiness, Object.is) === false) {
        shownPlaceholder = undefined;
    }
    return (
        <div
            ref={setSurface}
            className={className}
            role="textbox"
            aria-multiline
            aria-label={props['aria-label']}
            aria-labelledby={props['aria-labelledby']}
            aria-describedby={props['aria-describedby']}
            aria-invalid={props.status === 'error' ? true : undefined}
            aria-errormessage={props['aria-errormessage']}
            aria-required={props.required === true ? true : undefined}
            aria-placeholder={shownPlaceholder}
            data-placeholder={placeholder}
            id={props.id}
            lang={mounted.lang}
            spellCheck={spellCheck}
            data-test-id={`${testId}-surface`}
            data-rte-surface=""
        />
    );
};
Surface.displayName = 'RichTextEditor.Surface';

const Editor = forwardRef((props: Props, ref: ForwardedRef<EditorHandle<object>>) => (
    <Root {...props} ref={ref}>
        <Surface />
    </Root>
));
Editor.displayName = 'RichTextEditor';

/** Generic, so a definition compiled from any model types its handle (SPEC-rich-text/AC-062). */
export const RichTextEditor = Object.assign(Editor, { Root, Surface }) as unknown as (<
    C extends object = ShippedCommands,
>(
    props: RichTextEditorProps<C>,
) => ReactNode) & {
    /** Takes the editor props and renders its own layout from the parts; `RichTextEditor` is Root with the default parts. */
    readonly Root: <C extends object = ShippedCommands>(
        props: RichTextEditorProps<C> & { readonly children: ReactNode },
    ) => ReactNode;
    readonly Surface: ComponentType<object>;
};
