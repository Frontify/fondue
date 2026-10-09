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

import '#/styles/placeholder.css';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { createNodeViews, resyncSelection } from '#/bridge/node-views';
import { PortalHost } from '#/bridge/portal-host';
import { createPortalStore } from '#/bridge/portals';
import { enUS } from '#/locales/en-US';
import {
    type CapabilityRef,
    type DecodeResult,
    type Diagnostic,
    type RichTextDocument,
    type RuntimeEnvironment,
} from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { readerContext } from '#/reader/context';
import { type ReaderPresentation } from '#/reader/reader';
import { browserEnvironment } from '#/runtime/environment';
import { createEditorRuntime, type EditorRuntime, isEmpty, type RuntimeHandle } from '#/runtime/runtime';
import { type DocumentChange, type SessionToken, type ShippedCommands } from '#/runtime/types';

import { engineOf, viewsOf } from './define';
import { BlockedShell, RecoveryShell } from './shells';
import { type CompiledEditorDefinition, type EditorHandle, type RichTextEditorProps } from './types';

type Props = RichTextEditorProps<object>;
/** The props once `definition` is known to be set. */
type Defined = Props & { readonly definition: CompiledEditorDefinition<object> };
const DEFAULT_TEST_ID = 'fondue-rich-text-editor';
const NO_PRESENTATION: ReaderPresentation = {};

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

/** Whether the editor's React tree renders or runs effects now, which `Phase` marks (SPEC-rich-text-react/AC-102). */
interface ReactWork {
    active: boolean;
}

/**
 * Marks the render, layout effects and effects of the parts between an opening and a closing `Phase`, which React runs
 * in tree order; a render that never commits closes at the next microtask, so no event handler finds it open.
 */
const Phase = ({
    work,
    open,
    scheduler,
}: {
    readonly work: ReactWork;
    readonly open: boolean;
    readonly scheduler: RuntimeEnvironment['scheduler'];
}) => {
    work.active = open;
    if (open) {
        scheduler.microtask(() => {
            work.active = false;
        });
    }
    useClientLayoutEffect(() => {
        work.active = open;
    });
    useEffect(() => {
        work.active = open;
    });
    return null;
};

/** The accessible name of a surface: the text its `aria-labelledby` elements hold, else its `aria-label`. */
const nameOf = (surface: Element): string => {
    const labelledBy = surface.getAttribute('aria-labelledby');
    if (labelledBy === null) {
        return (surface.getAttribute('aria-label') ?? '').trim();
    }
    const document = surface.ownerDocument;
    return labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent)
        .join(' ')
        .trim();
};

/** Whether a surface earlier in the document has the same accessible name (SPEC-rich-text-react/AC-080). */
const sharesName = (surface: Element): boolean => {
    const name = nameOf(surface);
    const surfaces = [...surface.ownerDocument.querySelectorAll('[data-rte-surface]')];
    return surfaces.slice(0, surfaces.indexOf(surface)).some((other) => nameOf(other) === name);
};

type SessionProps = Defined & {
    readonly children: ReactNode;
    /** Receives the handle of each session it runs, whose snapshot the recovery shell reads. */
    readonly onSession: (handle: RuntimeHandle) => void;
};

const SessionComponent = ({ children, onSession, ...props }: SessionProps, ref: ForwardedRef<EditorHandle<object>>) => {
    const [mounted] = useState(() => mountOf(props));
    const [coordinator] = useState(createMountCoordinator);
    // One portal store per mount, so no session shares chrome state with another (SPEC-rich-text/AC-014).
    const [portals] = useState(() => {
        const { environment = browserEnvironment } = props;
        return createPortalStore(environment.scheduler);
    });
    const [work] = useState<ReactWork>(() => ({ active: false }));
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
        let inRender: (() => boolean) | undefined;
        if (process.env.NODE_ENV !== 'production') {
            inRender = () => work.active;
        }
        const runtime = createEditorRuntime({
            definition: engineOf(definition),
            documentId: defaultValue.documentId,
            tree: decoded.tree,
            capabilities: decoded.capabilities,
            environment,
            mode: modeOf(latestRef.current),
            policy: definition.authoring,
            limits: definition.limits,
            nodeViews: (session) => createNodeViews(viewsOf(definition), { portals, runtime: session }),
            ...(inRender === undefined ? {} : { inRender }),
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
        onSession(runtime.handle);
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

    // Chrome reads the newest presentation and locale with no view rebuild (SPEC-rich-text-react/AC-065).
    const { locale = enUS, presentation = NO_PRESENTATION, environment = browserEnvironment } = props;
    const chromeContext = useMemo(() => readerContext(locale, presentation), [locale, presentation]);

    const context = useMemo(() => ({ props, mounted, coordinator }), [props, mounted, coordinator]);
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    if (mounted.blocked !== undefined) {
        return (
            <BlockedShell
                result={mounted.blocked}
                model={engineOf(definition).model}
                limits={definition.limits}
                presentation={presentation}
                locale={locale}
                testId={testId}
            />
        );
    }
    const phase = { work, scheduler: environment.scheduler };
    return (
        <RootContext.Provider value={context}>
            <SessionContext.Provider value={live}>
                <div data-test-id={testId} aria-busy={live === undefined ? true : undefined}>
                    <Phase {...phase} open />
                    {children}
                    <PortalHost store={portals} context={chromeContext} onFlush={onFlush} />
                    <Phase {...phase} open={false} />
                </div>
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
    /** The snapshot that Retry mounts the editor from (SPEC-rich-text-react/AC-085). */
    readonly retried: RichTextDocument | undefined;
}

/** The outer boundary: a render error shows the recovery shell with the last published snapshot (SPEC-rich-text-react/AC-022). */
class Recovery extends Component<RecoveryProps, RecoveryState> {
    state: RecoveryState = { failed: false, retried: undefined };
    // The last session, whose snapshot stays readable after it is disposed.
    private session: RuntimeHandle | undefined;

    static getDerivedStateFromError() {
        return { failed: true };
    }

    private readonly onSession = (handle: RuntimeHandle) => {
        this.session = handle;
    };

    render() {
        const { props, editorRef } = this.props;
        let { defaultValue } = props;
        if (this.state.retried !== undefined) {
            defaultValue = { ...defaultValue, document: this.state.retried };
        }
        if (!this.state.failed) {
            return <Session {...props} defaultValue={defaultValue} onSession={this.onSession} ref={editorRef} />;
        }
        let document = defaultValue.document;
        if (this.session !== undefined) {
            document = this.session.getSnapshot().document;
        }
        const {
            definition,
            locale = enUS,
            presentation = NO_PRESENTATION,
            'data-test-id': testId = DEFAULT_TEST_ID,
        } = props;
        return (
            <RecoveryShell
                document={document}
                model={engineOf(definition).model}
                limits={definition.limits}
                presentation={presentation}
                locale={locale}
                testId={testId}
                onRetry={() => this.setState({ failed: false, retried: document })}
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

/**
 * The editable surface: an empty container on the server and in the first client render, which the engine fills
 * after mount (SPEC-rich-text-output/AC-011, AC-033).
 */
const emptiness = (runtime: EditorRuntime | undefined) => {
    if (runtime === undefined) {
        return undefined;
    }
    return isEmpty(runtime.state);
};

const Surface = () => {
    const { props, mounted, coordinator } = useRoot('Surface');
    const { 'data-test-id': testId = DEFAULT_TEST_ID, spellCheck = true, placeholder } = props;
    // A document that is not empty shows no placeholder; before the session is ready the container is empty, as on the server (SPEC-rich-text-react/AC-093).
    let shownPlaceholder = placeholder;
    if (useSessionValue(emptiness, Object.is) === false) {
        shownPlaceholder = undefined;
    }
    return (
        <div
            ref={coordinator.setSurface}
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
