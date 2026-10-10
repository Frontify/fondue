/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
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
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { createReactWork, inReactWork, Phase, ReactWorkContext, sharesName } from '#/bridge/dev-checks';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { createNodeViews, resyncSelection } from '#/bridge/node-views';
import { OverlayContext, useScopedFocus } from '#/bridge/overlays';
import { PortalHost } from '#/bridge/portal-host';
import { createPortalStore } from '#/bridge/portals';
import { connectClipboard } from '#/clipboard/plugin';
import { enUS } from '#/locales/en-US';
import { type CapabilityRef, type DecodeResult, type Diagnostic, hashDocument, type RichTextDocument } from '#/model';
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
import { type BubbleMore, BubbleToolbar } from '#/ui/bubble-toolbar/bubble-toolbar';
import { FixedToolbar, type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/toolbar';

import { moveChromeFocus, useEscapeToSurface } from './chrome-focus';
import { engineOf, viewsOf } from './define';
import { registerFormField } from './form-field';
import { useKeyboardInset } from './keyboard-inset';
import { useEditorLocale } from './locale';
import { useOverlayRoot } from './overlay-root';
import { BlockedShell, RecoveryShell } from './shells';
import { registerSaveCauses, SaveStatusText } from './status';
import { menuItems, toolbarItems } from './toolbar-items';
import {
    type CompiledEditorDefinition,
    type EditorHandle,
    type EditorServices,
    type RichTextEditorProps,
    type ToolbarMode,
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
    /** The document's own language and direction, which win over the theme's (SPEC-rich-text-react/AC-061). */
    readonly lang: string | undefined;
    readonly dir: 'ltr' | 'rtl' | undefined;
    /** Mounted with `services.persistence`, which keeps the session managed for its whole life (SPEC-rich-text-persistence/AC-001). */
    readonly managed: boolean;
}

const mountOf = (props: Defined, loaded: LoadedDocument): Mounted => {
    const { definition, profile } = props;
    const engine = engineOf(definition);
    const { result, tree } = decodeToTree(loaded.document, engine.model, { limits: definition.limits });
    const managed = memberOf(props.services, 'persistence') !== undefined;
    const unset = { lang: undefined, dir: undefined, managed };
    if (result.status === 'blocked') {
        return { definition, profile, decoded: undefined, blocked: result, ...unset };
    }
    if (tree === undefined) {
        return { definition, profile, decoded: undefined, blocked: undefined, ...unset };
    }
    // The surface spellchecks in the document's language when it declares one (SPEC-rich-text-editing/AC-068).
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
    return { definition, profile, decoded, blocked: undefined, lang, dir, managed };
};

/** What the parts share for the toolbars and focus moves between the surface and the chrome (SPEC-rich-text-react, Overlay focus). */
interface Chrome {
    readonly items: readonly ToolbarItem[];
    /** The rows that only the More menus hold. */
    readonly menu: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    /** The bubble toolbar's name and the More rows that switch the toolbar mode. */
    readonly labels: { readonly bubble: string; readonly toBubble: string; readonly toFixed: string };
    /** The surface element `id`, generated when a toolbar's `aria-controls` needs one and the host set none. */
    readonly surfaceId: string | undefined;
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    readonly bubbleRef: MutableRefObject<HTMLDivElement | null>;
    /** Opens the bubble toolbar of bubble mode at the selection and focuses it. */
    readonly showBubbleRef: MutableRefObject<(() => void) | null>;
    readonly mode: ToolbarMode;
    /** Switches the toolbar and reports the new mode to the host (SPEC-rich-text-react/AC-095). */
    readonly setMode: (mode: ToolbarMode) => void;
    /** The height the on-screen keyboard of a touch device covers, which a focused editor docks its toolbar above (SPEC-rich-text-react/AC-096). */
    readonly keyboard: number;
    /** The language of the chrome's strings, which the root, node chrome and data manifest labels take (WCAG 2.2 SC 3.1.2). */
    readonly lang: string;
    /** The chrome's strings in the shown locale. */
    readonly t: ReturnType<typeof readerContext>['t'];
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
    /** The snapshot Retry mounts this session from, in place of `defaultValue` (SPEC-rich-text-react/AC-085). */
    readonly retried: LoadedDocument | undefined;
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
    { children, onSession, onRetry, retried, ...props }: SessionProps,
    ref: ForwardedRef<EditorHandle<object>>,
) => {
    // The record this session loads, which a later `defaultValue` never replaces (SPEC-rich-text-persistence/AC-038).
    const [loaded] = useState(() => retried ?? props.defaultValue);
    const [mounted] = useState(() => mountOf(props, loaded));
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
    const bubbleRef = useRef<HTMLDivElement | null>(null);
    const showBubbleRef = useRef<(() => void) | null>(null);
    const {
        rootRef,
        overlayRoot,
        overlayRootRef,
        scope,
        element: overlayRootElement,
    } = useOverlayRoot(coordinator, props.portalContainer);
    const [toolbarMode, setToolbarMode] = useState<ToolbarMode>(() => props.defaultToolbarMode ?? 'fixed');
    const switchToolbar = useCallback((next: ToolbarMode) => {
        setToolbarMode(next);
        latestRef.current.onToolbarModeChange?.(next);
    }, []);
    const keyboard = useKeyboardInset(rootRef, coordinator);

    useClientLayoutEffect(() => {
        latestRef.current = props;
    });

    useEscapeToSurface(rootRef, toolbarRef, overlayRootRef, coordinator);

    // The view attaches in a layout effect, so the first frame painted after hydration shows the content (SPEC-rich-text-output/AC-034).
    useClientLayoutEffect(() => {
        const { definition, decoded } = mounted;
        if (decoded === undefined) {
            return;
        }
        const { environment = browserEnvironment } = latestRef.current;
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
                    revision: loaded.revision,
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
            documentId: loaded.documentId,
            tree: decoded.tree,
            capabilities: decoded.capabilities,
            environment,
            mode: modeOf(latestRef.current),
            policy: definition.authoring,
            limits: definition.limits,
            nodeViews: (session) => createNodeViews(viewsOf(definition), { portals, runtime: session }),
            inRender: () => inReactWork(work),
            revision: loaded.revision,
            saves,
            recovery: () => memberOf(latestRef.current.services, 'recovery'),
            inputRules: () => latestRef.current.inputRules,
        });
        connectClipboard(runtime, {
            limits: definition.limits,
            sliceContext: () => {
                const { presentation } = latestRef.current;
                if (presentation === undefined) {
                    return null;
                }
                return presentation.sliceContext;
            },
            locale: () => shellPropsOf(latestRef.current).locale,
            announce: (message) => announcer.announce(message),
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
        if (created !== undefined) {
            registerSaveCauses(runtime.handle, created);
        }
        registerFormField(runtime.handle, () => latestRef.current);
        onSession({ handle: runtime.handle, unresolved: () => created?.unresolved() });
        coordinator.start(runtime);
        return () => {
            coordinator.stop();
            runtime.handle.dispose();
        };
    }, [mounted, loaded, coordinator, portals, work, onSession]);

    // A blocked document gets no session and so no handle.
    useImperativeHandle(ref, () => handleRef.current as EditorHandle<object>, []);

    const mode = modeOf(props);
    useClientLayoutEffect(() => {
        handleRef.current?.setMode(mode);
    }, [mode]);
    const disabled = props.disabled === true;
    useClientLayoutEffect(() => {
        coordinator.runtime?.setDisabled(disabled);
    }, [coordinator, disabled]);

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

    // A changed `defaultValue` replaces nothing, so a development build says so once per change (SPEC-rich-text-persistence/AC-039).
    const { defaultValue } = props;
    const defaultValueRef = useRef(defaultValue);
    useEffect(() => {
        const previous = defaultValueRef.current;
        defaultValueRef.current = defaultValue;
        if (process.env.NODE_ENV === 'production' || previous === defaultValue) {
            return;
        }
        // A host that builds an equal record on each render changes nothing.
        if (
            previous.documentId === defaultValue.documentId &&
            hashDocument(previous.document) === hashDocument(defaultValue.document)
        ) {
            return;
        }
        coordinator.runtime?.report({
            code: 'react.default-value-changed',
            severity: 'warning',
            messageKey: 'react.default-value-changed',
        });
    }, [defaultValue, coordinator]);

    const onFlush = useCallback(() => resyncSelection(coordinator.runtime?.view), [coordinator]);

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        // A disabled editor's toolbar takes no focus.
        let toolbar = toolbarRef.current;
        if (props.disabled === true) {
            toolbar = null;
        }
        let showBubble: (() => void) | null = null;
        if (toolbarMode === 'bubble') {
            showBubble = showBubbleRef.current;
        }
        moveChromeFocus(event, {
            runtime: coordinator.runtime,
            toolbar,
            bubble: bubbleRef.current,
            showBubble,
            shortcut: toolbarShortcutOf(props),
        });
    };

    const shell = shellPropsOf(props);
    const { locale, presentation, testId } = shell;
    const theme = useFondueTheme();
    // The shown locale's language, else the theme's.
    let lang = locale.lang ?? theme.lang;
    if (lang === undefined) {
        lang = enUS.lang;
    }
    // Chrome reads the newest presentation and locale with no view rebuild (SPEC-rich-text-react/AC-065).
    const chromeContext = useMemo(() => readerContext(locale, presentation), [locale, presentation]);
    const items = useMemo(
        () =>
            toolbarItems(
                engineOf(mounted.definition),
                mounted.definition.authoring,
                props.presentation,
                chromeContext.t,
                lang,
            ),
        [mounted.definition, props.presentation, chromeContext, lang],
    );
    const menu = useMemo(
        () => menuItems(engineOf(mounted.definition), mounted.definition.authoring, items, chromeContext.t),
        [mounted.definition, items, chromeContext],
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
        const labels = {
            bubble: t('RichTextEditor_bubbleToolbar'),
            toBubble: t('RichTextEditor_toolbarOnSelection'),
            toFixed: t('RichTextEditor_toolbarAlways'),
        };
        return {
            items,
            menu,
            strings,
            labels,
            surfaceId,
            toolbarRef,
            bubbleRef,
            showBubbleRef,
            mode: toolbarMode,
            setMode: switchToolbar,
            keyboard,
            lang,
            t,
        };
    }, [items, menu, chromeContext, props.id, generatedId, toolbarMode, switchToolbar, keyboard, lang]);

    const { environment = browserEnvironment } = props;
    const overlays = useMemo(
        () => ({ container: overlayRoot, scope, scheduler: environment.scheduler }),
        [overlayRoot, scope, environment],
    );

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
                        <OverlayContext.Provider value={overlays}>
                            {/* Focus in the chrome keeps the selection visible until it returns (SPEC-rich-text-accessibility/AC-067). */}
                            {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- the root only hears keys and focus that bubble from the surface and chrome. */}
                            <div
                                ref={rootRef}
                                lang={lang}
                                data-test-id={testId}
                                aria-busy={live === undefined ? true : undefined}
                                onKeyDown={onKeyDown}
                                onFocus={(event) =>
                                    coordinator.chrome.showSelection(
                                        event.target.getAttribute('data-rte-surface') === null,
                                    )
                                }
                                onBlur={() => coordinator.chrome.showSelection(false)}
                            >
                                {work !== undefined && <Phase work={work} open />}
                                {children}
                                {toolbarMode === 'bubble' && <Bubble />}
                                <PortalHost store={portals} context={chromeContext} lang={lang} onFlush={onFlush} />
                                <div
                                    ref={announcer.setRegion}
                                    aria-live="polite"
                                    style={VISUALLY_HIDDEN}
                                    data-test-id={`${testId}-announcer`}
                                />
                                {overlayRootElement}
                                {work !== undefined && <Phase work={work} open={false} />}
                            </div>
                        </OverlayContext.Provider>
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
    const locale = useEditorLocale(props.locale);
    // A host mistake, which no recovery shell can show without a model.
    if (definition === undefined) {
        throw new Error('RichTextEditor needs a `definition` until the profiles land with pair 37, TASK-rte-profiles.');
    }
    return <Recovery props={{ ...props, definition, locale }} editorRef={ref} />;
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
    const theme = useFondueTheme();
    // The document's language and direction, else the theme's, while the chrome keeps its own (SPEC-rich-text-react/AC-060, AC-061).
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
            lang={lang}
            dir={dir}
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

/** The fixed toolbar the presentation configures; with no item, or in bubble mode, it renders nothing. */
const Toolbar = () => {
    const { props, coordinator, chrome } = useRoot('Toolbar');
    const { disabled = false, 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    const { items, menu, strings, labels, surfaceId, toolbarRef, mode, setMode, keyboard } = chrome;
    const focus = useScopedFocus();
    // A focused editor on a touch device docks its toolbar above the on-screen keyboard (SPEC-rich-text-react/AC-096).
    let docked: number | undefined;
    if (keyboard > 0 && focus !== null && !disabled) {
        docked = keyboard;
    }
    // The caret scrolls clear of the sticky or docked toolbar's measured height (SPEC-rich-text-accessibility/AC-024).
    const shown = items.length > 0 && mode === 'fixed';
    useEffect(() => {
        const element = toolbarRef.current;
        if (element === null) {
            return undefined;
        }
        const observer = new ResizeObserver(() => {
            const { height } = element.getBoundingClientRect();
            if (docked === undefined) {
                coordinator.chrome.setTopInset(height);
                coordinator.chrome.setDockedInset(0);
                return;
            }
            coordinator.chrome.setTopInset(0);
            coordinator.chrome.setDockedInset(height);
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
            coordinator.chrome.setTopInset(0);
            coordinator.chrome.setDockedInset(0);
        };
    }, [toolbarRef, coordinator, shown, docked]);
    if (!shown || surfaceId === undefined) {
        return null;
    }
    return (
        <FixedToolbar
            items={items}
            menu={menu}
            strings={strings}
            disabled={disabled}
            surfaceId={surfaceId}
            shortcut={toolbarShortcutOf(props)}
            testId={testId}
            toolbarRef={toolbarRef}
            modeSwitch={{ label: labels.toBubble, onSelect: () => setMode('bubble') }}
            docked={docked}
        />
    );
};
Toolbar.displayName = 'RichTextEditor.Toolbar';

/** The bubble toolbar, with the rest of the toolbar in its More menu in bubble mode (SPEC-rich-text-react/AC-095). */
const Bubble = () => {
    const { props, chrome } = useRoot('BubbleToolbar');
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    const { items, menu, strings, labels, bubbleRef, showBubbleRef, mode, setMode } = chrome;
    const bubbleItems = useMemo(
        () =>
            items
                .filter((item) => item.bubble)
                .map((item, index) => ({ ...item, groupStart: index > 0 && item.groupStart })),
        [items],
    );
    let more: BubbleMore | undefined;
    let showRef: typeof showBubbleRef | undefined;
    if (mode === 'bubble') {
        more = {
            items: [...items.filter((item) => !item.bubble), ...menu],
            modeSwitch: { label: labels.toFixed, onSelect: () => setMode('fixed') },
        };
        showRef = showBubbleRef;
    }
    if (bubbleItems.length === 0 && more === undefined) {
        return null;
    }
    return (
        <BubbleToolbar
            items={bubbleItems}
            more={more}
            label={labels.bubble}
            strings={strings}
            shortcut={toolbarShortcutOf(props)}
            testId={testId}
            toolbarRef={bubbleRef}
            showRef={showRef}
        />
    );
};
Bubble.displayName = 'RichTextEditor.Bubble';

/** The bubble toolbar of a fixed toolbar mode, near a text selection; bubble mode shows its own (SPEC-rich-text-react, Components). */
const BubbleToolbarPart = () => {
    const { chrome } = useRoot('BubbleToolbar');
    if (chrome.mode === 'bubble') {
        return null;
    }
    return <Bubble />;
};
BubbleToolbarPart.displayName = 'RichTextEditor.BubbleToolbar';

/** The session's save state (SPEC-rich-text-persistence/AC-046 to AC-048, AC-062). */
const Status = () => {
    const { props, mounted, chrome } = useRoot('Status');
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    // An unmanaged session has no save state to show.
    if (!mounted.managed) {
        return null;
    }
    return <SaveStatusText t={chrome.t} testId={testId} />;
};
Status.displayName = 'RichTextEditor.Status';

const Editor = forwardRef((props: Props, ref: ForwardedRef<EditorHandle<object>>) => (
    <Root {...props} ref={ref}>
        <Toolbar />
        <Surface />
        <Status />
    </Root>
));
Editor.displayName = 'RichTextEditor';

/** Generic, so a definition compiled from any model types its handle (SPEC-rich-text/AC-062). */
export const RichTextEditor = Object.assign(Editor, {
    Root,
    Surface,
    Toolbar,
    BubbleToolbar: BubbleToolbarPart,
    Status,
}) as unknown as (<C extends object = ShippedCommands>(props: RichTextEditorProps<C>) => ReactNode) & {
    /** Takes the editor props and renders its own layout from the parts; `RichTextEditor` is Root with the default parts. */
    readonly Root: <C extends object = ShippedCommands>(
        props: RichTextEditorProps<C> & { readonly children: ReactNode },
    ) => ReactNode;
    readonly Surface: ComponentType<object>;
    readonly Toolbar: ComponentType<object>;
    readonly BubbleToolbar: ComponentType<object>;
    readonly Status: ComponentType<object>;
};
