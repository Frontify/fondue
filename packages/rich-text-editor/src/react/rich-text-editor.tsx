/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import {
    type ComponentType,
    createContext,
    forwardRef,
    type ForwardedRef,
    type ReactNode,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { type PluginPresentation } from '#/bridge/plugin';
import { enUS } from '#/locales/en-US';
import { type CapabilityRef, type DecodeResult, type Diagnostic } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { codecContext } from '#/model/output';
import { randomId } from '#/model/random-id';
import { type LoadedDocument } from '#/persistence/types';
import { readerContext } from '#/reader/context';
import { type ReaderPresentation } from '#/reader/reader';
import { createEditorRuntime, type EditorRuntime } from '#/runtime/runtime';
import { type DocumentChange, type SessionToken, type ShippedCommands } from '#/runtime/types';

import { engineOf } from './compile-editor';
import { usePluginHosts } from './plugin-hosts';
import { type CompiledEditorDefinition, type EditorHandle, type RichTextEditorProps } from './types';

type Props = RichTextEditorProps<object>;
/** The props once `definition` is known to be set. */
type Defined = Props & { readonly definition: CompiledEditorDefinition<object> };
const DEFAULT_TEST_ID = 'fondue-rich-text-editor';
const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };

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

/** What the session reads the document with, from the editor props and their defaults. */
const shellPropsOf = (props: Defined) => {
    const { locale = enUS, presentation = NO_PRESENTATION, 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    return {
        presentation,
        locale,
        testId,
    };
};

type SessionProps = Defined & {
    readonly children: ReactNode;
};

const SessionComponent = ({ children, ...props }: SessionProps, ref: ForwardedRef<EditorHandle<object>>) => {
    // The record this session loads, which a later `defaultValue` never replaces.
    const [loaded] = useState(() => props.defaultValue);
    const [mounted] = useState(() => mountOf(props, loaded));
    const [coordinator] = useState(createMountCoordinator);
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
        const runtime = createEditorRuntime({
            definition: engine,
            documentId: loaded.documentId,
            tree: decoded.tree,
            capabilities: decoded.capabilities,
            mode: modeOf(latestRef.current),
            policy: definition.authoring,
            limits: definition.limits,
            generateId: ids,
            commandHost: hosts,
        });
        // Each event calls the newest callback the host passed.
        runtime.handle.subscribe('ready', (session: SessionToken) => {
            setLive(runtime);
            latestRef.current.onReady?.(session);
        });
        runtime.handle.subscribe('documentChange', (change: DocumentChange) =>
            latestRef.current.onDocumentChange?.(change),
        );
        runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) =>
            latestRef.current.onDiagnostic?.(diagnostic),
        );
        handleRef.current = runtime.handle;
        coordinator.start(runtime);
        return () => {
            coordinator.stop();
            runtime.handle.dispose();
        };
    }, [mounted, loaded, coordinator, hosts]);

    // A blocked document gets no session and so no handle.
    useImperativeHandle(ref, () => handleRef.current as EditorHandle<object>, []);

    const mode = modeOf(props);
    useClientLayoutEffect(() => {
        handleRef.current?.setMode(mode);
    }, [mode]);

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
        return null;
    }
    return (
        <RootContext.Provider value={context}>
            <div lang={lang} data-test-id={testId} aria-busy={live === undefined ? true : undefined}>
                {children}
            </div>
        </RootContext.Provider>
    );
};
const Session = forwardRef(SessionComponent);
Session.displayName = 'RichTextEditor.Session';

const Root = forwardRef((props: Props & { readonly children: ReactNode }, ref: ForwardedRef<EditorHandle<object>>) => {
    const { definition } = props;
    if (definition !== undefined) {
        return <Session {...props} definition={definition} ref={ref} />;
    }
    return null;
});
Root.displayName = 'RichTextEditor.Root';

/**
 * The editable surface: an empty container on the server and in the first client render, which the engine fills
 * after mount.
 */
const Surface = () => {
    const { props, mounted, coordinator, chrome } = useRoot('Surface');
    const { 'data-test-id': testId = DEFAULT_TEST_ID, spellCheck = true } = props;
    const theme = useFondueTheme();
    // The document's language and direction, else the theme's, while the chrome keeps its own.
    let lang = mounted.lang ?? theme.lang;
    if (lang === undefined) {
        lang = chrome.lang;
    }
    const dir = mounted.dir ?? theme.dir;
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
            aria-disabled={props.disabled === true ? true : undefined}
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
