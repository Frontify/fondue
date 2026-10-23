/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
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
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { createNodeViews, resyncSelection } from '#/bridge/node-views';
import { type PluginPresentation } from '#/bridge/plugin';
import { PortalHost } from '#/bridge/portal-host';
import { createPortalStore } from '#/bridge/portals';
import { SessionContext, useSessionValue } from '#/bridge/session';
import { enUS } from '#/locales/en-US';
import { type CapabilityRef, type DecodeResult, type Diagnostic, type RichTextDocument } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { codecContext, contentClasses } from '#/model/output';
import { randomId } from '#/model/random-id';
import { createSaveCoordinator } from '#/persistence/coordinator';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
import { readerContext } from '#/reader/context';
import { type ReaderPresentation } from '#/reader/reader';
import {
    createEditorRuntime,
    type EditorRuntime,
    type EditorRuntimeOptions,
    isEmpty,
    type RuntimeHandle,
} from '#/runtime/runtime';
import { type DocumentChange, type SessionToken, type ShippedCommands } from '#/runtime/types';

import { engineOf, readersOf, viewsOf } from './compile-editor';
import { usePluginHosts } from './plugin-hosts';
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
const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };
const SERVICE_MEMBERS = ['persistence', 'recovery'] as const;

const memberOf = <K extends (typeof SERVICE_MEMBERS)[number]>(
    services: EditorServices | undefined,
    member: K,
): EditorServices[K] | undefined => {
    if (services === undefined) {
        return undefined;
    }
    return services[member];
};

/** Whether a services member changed: added, removed, or holding another function under some name. */
const memberChanged = (previous: object | undefined, next: object | undefined) => {
    if (previous === undefined || next === undefined) {
        return previous !== next;
    }
    const names = new Set([...Object.keys(previous), ...Object.keys(next)]);
    return [...names].some((name) => Reflect.get(previous, name) !== Reflect.get(next, name));
};

/** What one mount keeps for its whole life: a changed `definition` needs a new mount. */
interface Mounted {
    readonly definition: CompiledEditorDefinition<object>;
    /** `undefined` for a blocked document, which gets no session. */
    readonly decoded: { readonly tree: TreeNode; readonly capabilities: readonly CapabilityRef[] } | undefined;
    readonly blocked: Extract<DecodeResult, { readonly status: 'blocked' }> | undefined;
    /** The document's own language and direction, which win over the theme's. */
    readonly lang: string | undefined;
    readonly dir: 'ltr' | 'rtl' | undefined;
}

const mountOf = (props: Defined, loaded: LoadedDocument): Mounted => {
    const { definition } = props;
    if (definition === undefined) {
        throw new Error('RichTextEditor needs a `definition`.');
    }
    const engine = engineOf(definition);
    const { result, tree } = decodeToTree(loaded.document, engine.model, { limits: definition.limits });
    const unset = { lang: undefined, dir: undefined };
    if (result.status === 'blocked') {
        return { definition, decoded: undefined, blocked: result, ...unset };
    }
    if (tree === undefined) {
        return { definition, decoded: undefined, blocked: undefined, ...unset };
    }
    // The surface spellchecks in the document's language when it declares one.
    let lang: string | undefined;
    let dir: Mounted['dir'];
    if (tree.attrs !== undefined && typeof tree.attrs.lang === 'string') {
        lang = tree.attrs.lang;
    }
    // `auto`, the default, sets no direction.
    if (tree.attrs !== undefined && (tree.attrs.dir === 'ltr' || tree.attrs.dir === 'rtl')) {
        dir = tree.attrs.dir;
    }
    const decoded = { tree, capabilities: result.document.requiredCapabilities };
    return { definition, decoded, blocked: undefined, lang, dir };
};

/** What the parts share of the chrome. */
interface Chrome {
    /** The surface element `id`. */
    readonly surfaceId: string | undefined;
    /** The language of the chrome's strings, which the root, node chrome and plugin labels take (WCAG 2.2 SC 3.1.2). */
    readonly lang: string;
}

interface RootContextValue {
    readonly props: Props;
    readonly mounted: Mounted;
    readonly coordinator: MountCoordinator;
    readonly chrome: Chrome;
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

/** The presentation as plugins read it. */
const pluginPresentationOf = (presentation: ReaderPresentation | undefined): PluginPresentation => {
    let styles: PluginPresentation['styles'] = [];
    let colorTokens: PluginPresentation['colorTokens'] = [];
    if (presentation !== undefined) {
        styles = presentation.styles ?? [];
        colorTokens = presentation.colorTokens ?? [];
    }
    return { styles, colorTokens };
};

/** What both shells read the document with, from the editor props and their defaults. */
const shellPropsOf = (props: Defined) => {
    const {
        definition,
        locale = enUS,
        presentation = NO_PRESENTATION,
        'data-test-id': testId = DEFAULT_TEST_ID,
    } = props;
    return {
        model: engineOf(definition).model,
        readers: readersOf(definition),
        limits: definition.limits,
        presentation,
        locale,
        testId,
    };
};

/** A running session and the write its coordinator left with an unknown outcome, which Retry hands on. */
interface RecoverySession {
    readonly handle: RuntimeHandle;
    readonly unresolved: () => SaveRequest | undefined;
}

type SessionProps = Defined & {
    readonly children: ReactNode;
    /** The snapshot Retry mounts this session from, in place of `defaultValue`. */
    readonly retried: LoadedDocument | undefined;
    /** Receives the handle of each session it runs, whose snapshot the recovery shell reads. */
    readonly onSession: (session: RecoverySession) => void;
    /** The document holds changes the failed session before Retry never saved. */
    readonly unsavedOnMount: boolean;
    /** The write the failed session left unresolved, which this one replays first. */
    readonly carried: SaveRequest | undefined;
    /** Mounts the editor again from this session's snapshot. */
    readonly onRetry: () => void;
};

const SessionComponent = (
    { children, onSession, onRetry, retried, ...props }: SessionProps,
    ref: ForwardedRef<EditorHandle<object>>,
) => {
    // The record this session loads, which a later `defaultValue` never replaces.
    const [loaded] = useState(() => retried ?? props.defaultValue);
    const [mounted] = useState(() => mountOf(props, loaded));
    // The snapshot of a session that entered `faulted`, which the recovery shell shows.
    const [faulted, setFaulted] = useState<RichTextDocument>();
    const [coordinator] = useState(createMountCoordinator);
    // One portal store per mount, so no session shares chrome state with another.
    const [portals] = useState(createPortalStore);
    // A production build marks no React work, so `execute` never asks.
    const [work] = useState(() => {
        if (process.env.NODE_ENV === 'production') {
            return undefined;
        }
        return createReactWork();
    });
    // The session once it is ready, which the parts and hooks read.
    const [live, setLive] = useState<EditorRuntime>();
    const latestRef = useRef(props);
    // The shown locale's language, which plugins read when they run.
    const langRef = useRef<string>(enUS.lang);
    const handleRef = useRef<EditorHandle<object> | null>(null);
    // The chrome's strings, which plugins read when they run.
    const tRef = useRef(codecContext(enUS, enUS).t);
    const { hosts } = usePluginHosts({
        coordinator,
        t: () => tRef.current,
        lang: () => langRef.current,
        presentation: () => pluginPresentationOf(latestRef.current.presentation),
        testId: () => latestRef.current['data-test-id'] ?? DEFAULT_TEST_ID,
    });

    useClientLayoutEffect(() => {
        latestRef.current = props;
    });

    // The view attaches in a layout effect, so the first frame painted after hydration shows the content.
    useClientLayoutEffect(() => {
        const { definition, decoded } = mounted;
        if (decoded === undefined) {
            return;
        }
        const { generateId } = latestRef.current;
        const engine = engineOf(definition);
        const ids = generateId ?? randomId;
        // A session is managed for its whole life when it mounts with `services.persistence`.
        const persistence = memberOf(latestRef.current.services, 'persistence');
        let saves: EditorRuntimeOptions['saves'];
        let created: ReturnType<typeof createSaveCoordinator> | undefined;
        if (persistence !== undefined) {
            saves = (session) => {
                created = createSaveCoordinator(session, {
                    // A host that drops the member later keeps the service the session mounted with.
                    service: () => memberOf(latestRef.current.services, 'persistence') ?? persistence,
                    options: () => latestRef.current.persistenceOptions,
                    revision: loaded.revision,
                    unsavedOnMount: latestRef.current.unsavedOnMount,
                    carried: latestRef.current.carried,
                    model: engine.model,
                    generateId: ids,
                });
                return created;
            };
        }
        const runtime = createEditorRuntime({
            definition: engine,
            documentId: loaded.documentId,
            tree: decoded.tree,
            capabilities: decoded.capabilities,
            mode: modeOf(latestRef.current),
            policy: definition.authoring,
            limits: definition.limits,
            generateId: ids,
            nodeViews: (session) => createNodeViews(viewsOf(definition), { portals, runtime: session }),
            inRender: () => inReactWork(work),
            revision: loaded.revision,
            saves,
            recovery: () => memberOf(latestRef.current.services, 'recovery'),
            commandHost: hosts,
        });
        // Each event calls the newest callback the host passed.
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
        // A fault reports a diagnostic, so the shell shows once the host heard why. The session stays mounted, so its
        // handle still reads and saves the last snapshot.
        runtime.handle.subscribe('diagnostic', () => {
            if (runtime.handle.getSummary().phase === 'faulted') {
                setFaulted(runtime.handle.getSnapshot().document);
            }
        });
        handleRef.current = runtime.handle;
        onSession({ handle: runtime.handle, unresolved: () => created?.unresolved() });
        coordinator.start(runtime);
        return () => {
            coordinator.stop();
            runtime.handle.dispose();
        };
    }, [mounted, loaded, coordinator, portals, work, onSession, hosts]);

    // A blocked document gets no session and so no handle.
    useImperativeHandle(ref, () => handleRef.current as EditorHandle<object>, []);

    const mode = modeOf(props);
    useClientLayoutEffect(() => {
        handleRef.current?.setMode(mode);
    }, [mode]);

    // A changed `services` member aborts the operations it started, with no rebuild.
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

    const { definition } = props;
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        if (definition === mounted.definition) {
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
    }, [definition, mounted, coordinator]);

    const onFlush = useCallback(() => resyncSelection(coordinator.runtime?.view), [coordinator]);

    const shell = shellPropsOf(props);
    const { locale, presentation, testId } = shell;
    const theme = useFondueTheme();
    // The shown locale's language, else the theme's.
    let lang = locale.lang ?? theme.lang;
    if (lang === undefined) {
        lang = enUS.lang;
    }
    const shownLang = lang;
    useClientLayoutEffect(() => {
        langRef.current = shownLang;
    });
    // Chrome reads the newest presentation and locale with no view rebuild.
    const chromeContext = useMemo(() => readerContext(locale, presentation), [locale, presentation]);
    useClientLayoutEffect(() => {
        tRef.current = chromeContext.t;
    });
    const chrome = useMemo(() => {
        const surfaceId = props.id;
        return {
            surfaceId,
            lang,
        };
    }, [props.id, lang]);

    const context = useMemo(() => ({ props, mounted, coordinator, chrome }), [props, mounted, coordinator, chrome]);
    if (mounted.blocked !== undefined) {
        return <BlockedShell result={mounted.blocked} {...shell} />;
    }
    if (faulted !== undefined) {
        return <RecoveryShell document={faulted} {...shell} onRetry={onRetry} />;
    }
    return (
        <RootContext.Provider value={context}>
            <SessionContext.Provider value={live}>
                <ReactWorkContext.Provider value={work}>
                    <div lang={lang} data-test-id={testId} aria-busy={live === undefined ? true : undefined}>
                        {work !== undefined && <Phase work={work} open />}
                        {children}
                        <PortalHost store={portals} context={chromeContext} lang={lang} onFlush={onFlush} />
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

const Root = forwardRef((props: Props & { readonly children: ReactNode }, ref: ForwardedRef<EditorHandle<object>>) => {
    const { definition } = props;
    if (definition !== undefined) {
        return <Recovery props={{ ...props, definition }} editorRef={ref} />;
    }
    return null;
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
 * after mount.
 */
const Surface = () => {
    const { props, mounted, coordinator, chrome } = useRoot('Surface');
    const { 'data-test-id': testId = DEFAULT_TEST_ID, spellCheck = true, placeholder, presentation } = props;
    const contentClassName = presentation?.contentClassName;
    const theme = useFondueTheme();
    // The document's language and direction, else the theme's, while the chrome keeps its own.
    let lang = mounted.lang ?? theme.lang;
    if (lang === undefined) {
        lang = chrome.lang;
    }
    const dir = mounted.dir ?? theme.dir;
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
    // A later host class swaps in with `classList`, as ProseMirror's own class changes do.
    useClientLayoutEffect(() => {
        const surface = surfaceRef.current;
        if (surface === null || contentClassName === undefined) {
            return undefined;
        }
        const names = hostClassNames(contentClassName);
        surface.classList.add(...names);
        return () => surface.classList.remove(...names);
    }, [contentClassName]);
    // A document that is not empty shows no placeholder; before the session is ready the container is empty, as on the server.
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
            aria-disabled={props.disabled === true ? true : undefined}
            aria-placeholder={shownPlaceholder}
            data-placeholder={placeholder}
            id={chrome.surfaceId}
            lang={lang}
            dir={dir}
            spellCheck={spellCheck}
            data-test-id={`${testId}-surface`}
            data-rte-surface=""
            // Native focus events of the surface itself, so a move into chrome or an overlay blurs it.
            onFocus={(event) => {
                if (event.target === event.currentTarget) {
                    props.onFocus?.(event);
                }
            }}
            onBlur={(event) => {
                if (event.target === event.currentTarget) {
                    props.onBlur?.(event);
                }
            }}
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

/** Generic, so a definition compiled from any model types its handle. */
export const RichTextEditor = Object.assign(Editor, {
    Root,
    Surface,
}) as unknown as (<C extends object = ShippedCommands>(props: RichTextEditorProps<C>) => ReactNode) & {
    /** Takes the editor props and renders its own layout from the parts; `RichTextEditor` is Root with the default parts. */
    readonly Root: <C extends object = ShippedCommands>(
        props: RichTextEditorProps<C> & { readonly children: ReactNode },
    ) => ReactNode;
    readonly Surface: ComponentType<object>;
};
