/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { type PortalStore } from '#/bridge/nodeViews/helpers/portals';
import { createNodeViews } from '#/bridge/nodeViews/nodeViews';
import { type InteractionScope } from '#/bridge/overlays/helpers/interactionScope';
import { type EditorHosts } from '#/bridge/pluginApi/plugin';
import { type Announcer } from '#/bridge/session/helpers/announcer';
import { inReactWork, type ReactWork, sharesName } from '#/bridge/session/helpers/devChecks';
import { prefetchPartsOnIdle } from '#/bridge/session/helpers/lazyPart';
import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { enUS } from '#/locales/en-US';
import { type ContentCheckOptions, type Diagnostic, type RichTextDocument } from '#/model';
import { codecContext, randomId } from '#/model/internal';
import { createSaveCoordinator } from '#/persistence/coordinator';
import { type LoadedDocument } from '#/persistence/types';
import { connectClipboardTo, createPort, type EditorRuntimeOptions } from '#/runtime/assembly';
import { type CompiledDefinition } from '#/runtime/definition';
import {
    type DocumentChange,
    type EditorPort,
    mediaOf,
    type SelectionSummary,
    type SessionToken,
    surfaceElement,
    type UploadPlace,
} from '#/runtime/port';

import { compiledOf, profileOf, viewsOf } from '../../compile/compileEditor';
import { registerFormField } from '../../helpers/formField';
import { validityOf } from '../../helpers/validity';
import { type EditorHandle } from '../../types';
import { pickAsset } from '../helpers/assetPicker';
import { backgroundOf, columnsAtMount, memberOf, modeOf, shellPropsOf } from '../helpers/sessionHelpers';
import { registerSaveCauses } from '../helpers/status';
import { uploadMessage } from '../helpers/uploadMessages';
import { type Choosing, type Mounted, type RecoverySession, type SessionRest } from '../types';

type SessionWiring = {
    mounted: Mounted;
    loaded: LoadedDocument;
    coordinator: MountCoordinator;
    portals: PortalStore;
    work: ReactWork | undefined;
    announcer: Announcer;
    hosts: EditorHosts;
    scope: InteractionScope;
    latestRef: MutableRefObject<SessionRest>;
    chooserRef: MutableRefObject<HTMLInputElement | null>;
    choosingRef: MutableRefObject<Choosing | undefined>;
    handleRef: MutableRefObject<EditorHandle<object> | null>;
    setLive: (runtime: EditorPort | undefined) => void;
    setFaulted: (document: RichTextDocument) => void;
    onSession: (session: RecoverySession) => void;
};

type Decoded = NonNullable<Mounted['decoded']>;
type SaveCoordinator = ReturnType<typeof createSaveCoordinator>;

/** The host asset picker, else the file chooser, for a new figure or for the image `nodeId`. */
const pickerOf =
    ({ latestRef, chooserRef, choosingRef, announcer }: SessionWiring) =>
    (session: EditorPort, nodeId: string | undefined) => {
        const picker = memberOf(latestRef.current.services, 'assets');
        // Without a host picker the file chooser opens, whose files upload through `services.uploads`.
        if (picker === undefined) {
            const chooser = chooserRef.current;
            const accepts = mediaOf(session)?.uploads.accepts;
            const hasUploads = memberOf(latestRef.current.services, 'uploads') !== undefined;
            if (chooser === null || accepts === undefined || !hasUploads) {
                return;
            }

            let place: UploadPlace = { kind: 'insert', origin: 'command' };
            if (nodeId !== undefined) {
                place = { kind: 'replace', nodeId };
            }

            choosingRef.current = { place, session: session.handle.getSummary().session };
            chooser.accept = accepts.join(',');
            chooser.multiple = nodeId === undefined;
            chooser.value = '';
            chooser.click();

            return;
        }

        const pickerOptions: { nodeId?: string; removed: (kind: 'target' | 'image') => void } = {
            removed: (kind) => {
                const { locale } = shellPropsOf(latestRef.current);
                const key =
                    kind === 'target' ? 'RichTextEditor_imageTargetRemoved' : 'RichTextEditor_imageReplaceRemoved';
                announcer.announce(codecContext(locale, enUS).translate(key));
            },
        };
        if (nodeId !== undefined) {
            pickerOptions.nodeId = nodeId;
        }

        pickAsset(session, picker, pickerOptions);
    };

/** The save coordinator of a session that mounts with `services.persistence`, which a session keeps for its whole life. */
const savesOf = (
    { latestRef, loaded }: SessionWiring,
    engine: CompiledDefinition,
    ids: NonNullable<EditorRuntimeOptions['generateId']>,
) => {
    const persistence = memberOf(latestRef.current.services, 'persistence');
    const result: { saves: EditorRuntimeOptions['saves']; created: SaveCoordinator | undefined } = {
        saves: undefined,
        created: undefined,
    };
    if (persistence !== undefined) {
        result.saves = (session) => {
            result.created = createSaveCoordinator(session, {
                // A host that drops the member later keeps the service the session mounted with.
                service: () => memberOf(latestRef.current.services, 'persistence') ?? persistence,
                options: () => latestRef.current.persistenceOptions,
                revision: loaded.revision,
                unsavedOnMount: latestRef.current.unsavedOnMount,
                carried: latestRef.current.carried,
                model: engine.model,
                generateId: ids,
            });

            return result.created;
        };
    }

    return result;
};

const buildRuntime = (
    wiring: SessionWiring,
    decoded: Decoded,
    saves: EditorRuntimeOptions['saves'],
    ids: NonNullable<EditorRuntimeOptions['generateId']>,
): EditorPort => {
    const { mounted, loaded, coordinator, portals, work, announcer, hosts, latestRef } = wiring;
    const { definition } = mounted;
    const { translate } = codecContext(shellPropsOf(latestRef.current).locale, enUS);
    const engine = compiledOf(definition);
    const profile = profileOf(definition);
    const openPicker = pickerOf(wiring);

    const runtime: EditorPort = createPort({
        definition: engine,
        documentId: loaded.documentId,
        tree: decoded.tree,
        capabilities: decoded.capabilities,
        mode: modeOf(latestRef.current),
        policy: definition.authoring,
        limits: definition.limits,
        generateId: ids,
        nodeViews: (session) => createNodeViews(viewsOf(definition), { portals, runtime: session }),
        markViews: () => coordinator.chrome.markViews(engine.schema),
        inRender: () => inReactWork(work),
        revision: loaded.revision,
        saves,
        recovery: () => memberOf(latestRef.current.services, 'recovery'),
        inputRules: () => latestRef.current.inputRules,
        tabMovesFocus: () => latestRef.current.tabMovesFocus,
        enterKeys: {
            singleLine: profile === 'inline',
            modSubmits: profile === 'comment',
            submits: () => latestRef.current.onSubmit !== undefined,
            submit: () => {
                const { onSubmit, required } = latestRef.current;
                if (onSubmit === undefined) {
                    return;
                }

                if (!validityOf(runtime, required).valid) {
                    const { locale } = shellPropsOf(latestRef.current);
                    announcer.announce(codecContext(locale, enUS).translate('RichTextEditor_submitEmpty'));

                    return;
                }

                onSubmit(runtime.handle.getSnapshot());
            },
        },
        scrollSelectionIntoView: () => latestRef.current.scrollSelectionIntoView,
        commandHost: hosts,
        uploads: () => memberOf(latestRef.current.services, 'uploads'),
        pick: (nodeId) => openPicker(runtime, nodeId),
        uploadEvent: (event) => {
            const { locale, limits } = shellPropsOf(latestRef.current);
            const { translate } = codecContext(locale, enUS);
            const lang = locale.lang ?? enUS.lang;
            const accepts = mediaOf(runtime)?.uploads.accepts ?? [];
            announcer.announce(uploadMessage(event, translate, lang, limits, accepts));
        },
        styles: () => latestRef.current.presentation?.styles ?? [],
        columns: columnsAtMount(latestRef.current.presentation, translate),
        contentChecks: () => {
            const background = backgroundOf(runtime);
            const tokens = latestRef.current.presentation?.colorTokens;
            const checks: Pick<ContentCheckOptions, 'locale' | 'colorTokens' | 'background'> = {
                locale: shellPropsOf(latestRef.current).locale,
                colorTokens: tokens ?? [],
            };
            if (background !== undefined) {
                checks.background = background;
            }

            return checks;
        },
    });

    return runtime;
};

/** Each event calls the newest callback the host passed. */
const subscribeSession = (
    runtime: EditorPort,
    { latestRef, announcer, setLive, setFaulted }: SessionWiring,
): (() => void) => {
    let cancelPrefetch: (() => void) | undefined;
    // A gap cursor shows no caret to a screen reader, so moving onto one is announced.
    let atGap = false;
    runtime.handle.subscribe('selectionChange', (selection: SelectionSummary) => {
        const entered = selection.kind === 'gap' && !atGap;
        atGap = selection.kind === 'gap';
        if (entered) {
            const { locale } = shellPropsOf(latestRef.current);
            announcer.announce(codecContext(locale, enUS).translate('RichTextEditor_gapCursor'));
        }
    });

    runtime.handle.subscribe('ready', (session: SessionToken) => {
        setLive(runtime);
        // Parts that load on first use are fetched while the page is idle, so a first open is instant.
        cancelPrefetch?.();
        cancelPrefetch = prefetchPartsOnIdle();
        const surface = surfaceElement(runtime);
        if (process.env.NODE_ENV !== 'production' && surface !== undefined && sharesName(surface)) {
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
    runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => latestRef.current.onDiagnostic?.(diagnostic));

    // A fault reports a diagnostic, so the shell shows once the host heard why. The session stays mounted, so its
    // handle still reads and saves the last snapshot.
    runtime.handle.subscribe('diagnostic', () => {
        if (runtime.handle.getSummary().phase === 'faulted') {
            setFaulted(runtime.handle.getSnapshot().document);
        }
    });

    return () => cancelPrefetch?.();
};

const startSession = (wiring: SessionWiring, decoded: Decoded) => {
    const { mounted, coordinator, latestRef, announcer, handleRef, onSession } = wiring;
    const engine = compiledOf(mounted.definition);
    const ids = latestRef.current.generateId ?? randomId;
    const saving = savesOf(wiring, engine, ids);
    const runtime = buildRuntime(wiring, decoded, saving.saves, ids);

    connectClipboardTo(runtime, {
        singleLine: profileOf(mounted.definition) === 'inline',
        sliceContext: () => {
            const { presentation } = latestRef.current;
            if (presentation === undefined) {
                return null;
            }

            return presentation.sliceContext;
        },
        locale: () => shellPropsOf(latestRef.current).locale,
        announce: (message) => announcer.announce(message),
        resolveReference: () => latestRef.current.presentation?.resolveReference,
        resolveAssetUrl: () => latestRef.current.presentation?.resolveAssetUrl,
    });

    const cancelPrefetch = subscribeSession(runtime, wiring);
    handleRef.current = runtime.handle;
    if (saving.created !== undefined) {
        registerSaveCauses(runtime.handle, saving.created);
    }

    registerFormField(runtime.handle, () => latestRef.current);
    onSession({ handle: runtime.handle, unresolved: () => saving.created?.unresolved() });
    coordinator.start(runtime);

    return () => {
        cancelPrefetch();
        coordinator.stop();
        runtime.handle.dispose();
        handleRef.current = null;
        wiring.setLive(undefined);
    };
};

/** Attaches the view in a layout effect, so the first frame painted after hydration shows the content. */
export const useSessionRuntime = (wiring: SessionWiring) => {
    const { mounted, loaded, coordinator, portals, work, onSession, scope, hosts } = wiring;

    useClientLayoutEffect(() => {
        const { decoded } = mounted;
        if (decoded === undefined) {
            return;
        }

        return startSession(wiring, decoded);
    }, [mounted, loaded, coordinator, portals, work, onSession, scope, hosts]);
};
