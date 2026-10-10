/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Component,
    type ComponentType,
    createContext,
    type CSSProperties,
    forwardRef,
    type ForwardedRef,
    type KeyboardEvent,
    type MutableRefObject,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useId,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import '#/styles/content.css';
import { AnnouncerContext, createAnnouncer } from '#/bridge/announcer';
import { nodeChromeAt } from '#/bridge/chrome-view';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { createReactWork, inReactWork, Phase, ReactWorkContext, sharesName } from '#/bridge/dev-checks';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { createNodeViews, resyncSelection } from '#/bridge/node-views';
import { PortalHost } from '#/bridge/portal-host';
import { createPortalStore } from '#/bridge/portals';
import { enUS } from '#/locales/en-US';
import { type CapabilityRef, type DecodeResult, type Diagnostic, type RichTextDocument } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { contentClasses } from '#/model/output';
import { createSaveCoordinator } from '#/persistence/coordinator';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
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
import { pressesBinding } from '#/ui/shortcuts';
import { FixedToolbar, type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/toolbar';

import { engineOf, viewsOf } from './define';
import { BlockedShell, RecoveryShell } from './shells';
import { toolbarItems } from './toolbar-items';
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
const DEFAULT_TOOLBAR_SHORTCUT = 'Alt-F10';
// Read by screen readers and never seen (SPEC-rich-text-accessibility/AC-037).
const VISUALLY_HIDDEN: CSSProperties = {
    position: 'absolute',
    inlineSize: 1,
    blockSize: 1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
};

/** Why a toolbar item's command cannot run, by its `disabledReason` (SPEC-rich-text-react/AC-038). */
const REASON_KEYS: Readonly<Record<string, `RichTextEditor_${string}`>> = {
    'not-allowed': 'RichTextEditor_unavailableNotAllowed',
    readonly: 'RichTextEditor_unavailableReadOnly',
};

/** The key that moves focus to the toolbars, Alt+F10 unless the presentation sets another (SPEC-rich-text-react/AC-079). */
const toolbarShortcutOf = ({ presentation }: Props) => {
    if (presentation === undefined || presentation.toolbarShortcut === undefined) {
        return DEFAULT_TOOLBAR_SHORTCUT;
    }
    return presentation.toolbarShortcut;
};

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

/** What the parts share for the toolbar and focus moves between the surface and the chrome (SPEC-rich-text-react, Overlay focus). */
interface Chrome {
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    /** The surface element `id`, generated when a toolbar's `aria-controls` needs one and the host set none. */
    readonly surfaceId: string | undefined;
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
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

/** A running session and the write its coordinator left with an unknown outcome, which Retry hands on. */
interface RecoverySession {
    readonly handle: RuntimeHandle;
    readonly unresolved: () => SaveRequest | undefined;
}

type SessionProps = Defined & {
    readonly children: ReactNode;
    /** Receives the handle of each session it runs, whose snapshot the recovery shell reads. */
    readonly onSession: (session: RecoverySession) => void;
    /** The document holds changes the failed session before Retry never saved. */
    readonly unsavedOnMount: boolean;
    /** The write the failed session left unresolved, which this one replays first (SPEC-rich-text-persistence/AC-012). */
    readonly carried: SaveRequest | undefined;
    /** Mounts the editor again from this session's snapshot. */
    readonly onRetry: () => void;
};

const SessionComponent = (
    { children, onSession, onRetry, ...props }: SessionProps,
    ref: ForwardedRef<EditorHandle<object>>,
) => {
    const [mounted] = useState(() => mountOf(props));
    // The snapshot of a session that entered `faulted`, which the recovery shell shows (DR-078).
    const [faulted, setFaulted] = useState<RichTextDocument>();
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
    const [announcer] = useState(() => {
        const { environment = browserEnvironment } = props;
        return createAnnouncer(environment.clock);
    });
    useEffect(() => () => announcer.dispose(), [announcer]);
    const generatedId = useId();
    const toolbarRef = useRef<HTMLDivElement | null>(null);
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
        let created: ReturnType<typeof createSaveCoordinator> | undefined;
        if (persistence !== undefined) {
            saves = (session) => {
                created = createSaveCoordinator(session, {
                    // A host that drops the member later keeps the service the session mounted with.
                    service: () => memberOf(latestRef.current.services, 'persistence') ?? persistence,
                    options: () => latestRef.current.persistenceOptions,
                    revision: defaultValue.revision,
                    unsavedOnMount: latestRef.current.unsavedOnMount,
                    carried: latestRef.current.carried,
                    model: engine.model,
                    environment,
                });
                return created;
            };
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
            recovery: () => memberOf(latestRef.current.services, 'recovery'),
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
        // A fault reports a diagnostic, so the shell shows once the host heard why. The session stays mounted, so its
        // handle still reads and saves the last snapshot (SPEC-rich-text-runtime/AC-016).
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
    }, [mounted, coordinator, portals, work, onSession]);

    // A blocked document gets no session and so no handle.
    useImperativeHandle(ref, () => handleRef.current as EditorHandle<object>, []);

    const mode = modeOf(props);
    const { disabled } = props;
    // A change of `disabled` alone keeps the mode, and setting it again makes the runtime read the surface's `aria-disabled`.
    useClientLayoutEffect(() => {
        handleRef.current?.setMode(mode);
    }, [mode, disabled]);

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

    // The on-screen keyboard covers the bottom of the layout viewport, which the caret scrolls clear of (SPEC-rich-text-accessibility/AC-024).
    useEffect(() => {
        // Some test DOMs have no `visualViewport` at all.
        const viewport: VisualViewport | null | undefined = window.visualViewport;
        if (viewport === null || viewport === undefined) {
            return undefined;
        }
        const measure = () =>
            coordinator.chrome.setBottomInset(Math.max(0, window.innerHeight - viewport.offsetTop - viewport.height));
        measure();
        viewport.addEventListener('resize', measure);
        return () => viewport.removeEventListener('resize', measure);
    }, [coordinator]);

    /**
     * Alt+F10 moves to the most specific toolbar present, node chrome before the fixed toolbar, and on to the next one,
     * wrapping around; Escape in one returns to the surface with its selection (SPEC-rich-text-react/AC-034, AC-035, AC-069).
     */
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const runtime = coordinator.runtime;
        // A tooltip or menu that closed on this Escape keeps focus where it is.
        if (event.defaultPrevented || event.nativeEvent.isComposing || runtime === undefined) {
            return;
        }
        const { view } = runtime;
        if (view === undefined) {
            return;
        }
        const stops: HTMLElement[] = [];
        const nodeChrome = nodeChromeAt(view);
        if (nodeChrome !== null) {
            stops.push(nodeChrome);
        }
        if (toolbarRef.current !== null && props.disabled !== true) {
            stops.push(toolbarRef.current);
        }
        const target = event.target as Node;
        const inside = stops.findIndex((stop) => stop.contains(target));
        if (pressesBinding(event.nativeEvent, toolbarShortcutOf(props))) {
            const next = stops[(inside + 1) % stops.length];
            if (next === undefined) {
                return;
            }
            event.preventDefault();
            // Node chrome opens on its first enabled control; Radix Toolbar sends focus to the last focused item.
            const first = next.querySelector<HTMLElement>('button:not([disabled])');
            if (next === nodeChrome && first !== null) {
                first.focus();
                return;
            }
            next.focus();
            return;
        }
        if (event.key === 'Escape' && inside >= 0) {
            event.preventDefault();
            runtime.handle.focus();
        }
    };

    const shell = shellPropsOf(props);
    const { locale, presentation, testId } = shell;
    // Chrome reads the newest presentation and locale with no view rebuild (SPEC-rich-text-react/AC-065).
    const chromeContext = useMemo(() => readerContext(locale, presentation), [locale, presentation]);
    const items = useMemo(
        () =>
            toolbarItems(
                engineOf(mounted.definition),
                mounted.definition.authoring,
                props.presentation,
                chromeContext.t,
            ),
        [mounted.definition, props.presentation, chromeContext],
    );
    const chrome = useMemo(() => {
        const { t } = chromeContext;
        let surfaceId = props.id;
        if (surfaceId === undefined && items.length > 0) {
            surfaceId = generatedId;
        }
        const strings = {
            label: t('RichTextEditor_toolbar'),
            more: t('RichTextEditor_more'),
            reason: (code: string) => t(REASON_KEYS[code] ?? 'RichTextEditor_unavailable'),
        };
        return { items, strings, surfaceId, toolbarRef };
    }, [items, chromeContext, props.id, generatedId]);

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
                    <AnnouncerContext.Provider value={announcer}>
                        {/* Focus in the chrome keeps the selection visible until it returns (SPEC-rich-text-accessibility/AC-067). */}
                        {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- the root only hears keys and focus that bubble from the surface and chrome. */}
                        <div
                            data-test-id={testId}
                            aria-busy={live === undefined ? true : undefined}
                            onKeyDown={onKeyDown}
                            onFocus={(event) =>
                                coordinator.chrome.showSelection(event.target.getAttribute('data-rte-surface') === null)
                            }
                            onBlur={() => coordinator.chrome.showSelection(false)}
                        >
                            {work !== undefined && <Phase work={work} open />}
                            {children}
                            <PortalHost store={portals} context={chromeContext} onFlush={onFlush} />
                            <div
                                ref={announcer.setRegion}
                                aria-live="polite"
                                style={VISUALLY_HIDDEN}
                                data-test-id={`${testId}-announcer`}
                            />
                            {work !== undefined && <Phase work={work} open={false} />}
                        </div>
                    </AnnouncerContext.Provider>
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
    /** The write the failed session left with an unknown outcome, which the remount replays first. */
    readonly carried: SaveRequest | undefined;
    /** Counts Retries, so each mounts a new session even when no render error unmounted the last. */
    readonly retries: number;
}

/**
 * The outer boundary: a render error, or a session that enters `faulted`, shows the recovery shell with the last
 * published snapshot (SPEC-rich-text-react/AC-022, DR-078).
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
                    defaultValue={this.defaultValue()}
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
    const { props, mounted, coordinator, chrome } = useRoot('Surface');
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
            aria-disabled={props.disabled === true ? true : undefined}
            aria-placeholder={shownPlaceholder}
            data-placeholder={placeholder}
            id={chrome.surfaceId}
            lang={mounted.lang}
            spellCheck={spellCheck}
            data-test-id={`${testId}-surface`}
            data-rte-surface=""
            // Native focus events of the surface itself, so a move into chrome or an overlay blurs it (SPEC-rich-text-react/AC-090).
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

/** The fixed toolbar the presentation configures; with no item it renders nothing. */
const Toolbar = () => {
    const { props, coordinator, chrome } = useRoot('Toolbar');
    const { disabled = false, 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    const { items, strings, surfaceId, toolbarRef } = chrome;
    // The caret scrolls clear of the sticky toolbar's measured height (SPEC-rich-text-accessibility/AC-024).
    const shown = items.length > 0;
    useEffect(() => {
        const element = toolbarRef.current;
        if (element === null) {
            return undefined;
        }
        const observer = new ResizeObserver(() =>
            coordinator.chrome.setTopInset(element.getBoundingClientRect().height),
        );
        observer.observe(element);
        return () => {
            observer.disconnect();
            coordinator.chrome.setTopInset(0);
        };
    }, [toolbarRef, coordinator, shown]);
    if (!shown || surfaceId === undefined) {
        return null;
    }
    return (
        <FixedToolbar
            items={items}
            strings={strings}
            disabled={disabled}
            surfaceId={surfaceId}
            shortcut={toolbarShortcutOf(props)}
            testId={testId}
            toolbarRef={toolbarRef}
        />
    );
};
Toolbar.displayName = 'RichTextEditor.Toolbar';

const Editor = forwardRef((props: Props, ref: ForwardedRef<EditorHandle<object>>) => (
    <Root {...props} ref={ref}>
        <Toolbar />
        <Surface />
    </Root>
));
Editor.displayName = 'RichTextEditor';

/** Generic, so a definition compiled from any model types its handle (SPEC-rich-text/AC-062). */
export const RichTextEditor = Object.assign(Editor, { Root, Surface, Toolbar }) as unknown as (<
    C extends object = ShippedCommands,
>(
    props: RichTextEditorProps<C>,
) => ReactNode) & {
    /** Takes the editor props and renders its own layout from the parts; `RichTextEditor` is Root with the default parts. */
    readonly Root: <C extends object = ShippedCommands>(
        props: RichTextEditorProps<C> & { readonly children: ReactNode },
    ) => ReactNode;
    readonly Surface: ComponentType<object>;
    readonly Toolbar: ComponentType<object>;
};
