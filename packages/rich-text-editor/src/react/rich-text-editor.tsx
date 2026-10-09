/* (c) Copyright Frontify Ltd., all rights reserved. */

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

import '#/styles/placeholder.css';
import { createMountCoordinator, type MountCoordinator } from '#/bridge/mount';
import { enUS } from '#/locales/en-US';
import { type CapabilityRef, type Diagnostic } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { browserEnvironment } from '#/runtime/environment';
import { createEditorRuntime } from '#/runtime/runtime';
import { type DocumentChange, type SessionToken, type ShippedCommands } from '#/runtime/types';

import { useClientLayoutEffect } from './client-layout-effect';
import { engineOf } from './define';
import { type EditorHandle, type RichTextEditorProps } from './types';

type Props = RichTextEditorProps<object>;
const DEFAULT_TEST_ID = 'fondue-rich-text-editor';

/** What one mount keeps for its whole life: a changed `definition` or `profile` needs a new mount (SPEC-rich-text-react/AC-071). */
interface Mounted {
    readonly definition: Props['definition'];
    readonly profile: Props['profile'];
    /** `undefined` for a blocked document, which gets no session. */
    readonly decoded: { readonly tree: TreeNode; readonly capabilities: readonly CapabilityRef[] } | undefined;
    readonly lang: string;
}

const mountOf = (props: Props): Mounted => {
    const { definition, profile, defaultValue } = props;
    if (definition === undefined) {
        throw new Error('RichTextEditor needs a `definition` until the profiles land with pair 37, TASK-rte-profiles.');
    }
    const engine = engineOf(definition);
    const { result, tree } = decodeToTree(defaultValue.document, engine.model, { limits: definition.limits });
    let lang = enUS.lang;
    if (props.locale !== undefined && props.locale.lang !== undefined) {
        lang = props.locale.lang;
    }
    if (result.status === 'blocked' || tree === undefined) {
        return { definition, profile, decoded: undefined, lang };
    }
    // The surface spellchecks in the document's language when it declares one (SPEC-rich-text-editing/AC-068).
    if (tree.attrs !== undefined && typeof tree.attrs.lang === 'string') {
        lang = tree.attrs.lang;
    }
    return { definition, profile, decoded: { tree, capabilities: result.document.requiredCapabilities }, lang };
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

const RootComponent = (
    { children, ...props }: Props & { readonly children: ReactNode },
    ref: ForwardedRef<EditorHandle<object>>,
) => {
    const [mounted] = useState(() => mountOf(props));
    const [coordinator] = useState(createMountCoordinator);
    const [ready, setReady] = useState(false);
    const latestRef = useRef(props);
    const handleRef = useRef<EditorHandle<object> | null>(null);

    useClientLayoutEffect(() => {
        latestRef.current = props;
    });

    // The view attaches in a layout effect, so the first frame painted after hydration shows the content (SPEC-rich-text-output/AC-034).
    useClientLayoutEffect(() => {
        const { definition, decoded } = mounted;
        if (definition === undefined || decoded === undefined) {
            return;
        }
        const { environment = browserEnvironment, defaultValue } = latestRef.current;
        const runtime = createEditorRuntime({
            definition: engineOf(definition),
            documentId: defaultValue.documentId,
            tree: decoded.tree,
            capabilities: decoded.capabilities,
            environment,
            mode: modeOf(latestRef.current),
        });
        // Each event calls the newest callback the host passed (SPEC-rich-text-react/AC-004).
        runtime.handle.subscribe('ready', (session: SessionToken) => {
            setReady(true);
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
    }, [mounted, coordinator]);

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

    const context = useMemo(() => ({ props, mounted, coordinator }), [props, mounted, coordinator]);
    const { 'data-test-id': testId = DEFAULT_TEST_ID } = props;
    return (
        <RootContext.Provider value={context}>
            <div data-test-id={testId} aria-busy={ready ? undefined : true}>
                {children}
            </div>
        </RootContext.Provider>
    );
};
const Root = forwardRef(RootComponent);
Root.displayName = 'RichTextEditor.Root';

/**
 * The editable surface: an empty container on the server and in the first client render, which the engine fills
 * after mount (SPEC-rich-text-output/AC-011, AC-033).
 */
const Surface = () => {
    const { props, mounted, coordinator } = useRoot('Surface');
    const { 'data-test-id': testId = DEFAULT_TEST_ID, spellCheck = true, placeholder } = props;
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
            aria-placeholder={placeholder}
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
