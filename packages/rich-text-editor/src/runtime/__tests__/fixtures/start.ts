/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from 'vitest';

import { type EditorApi, type EditorPart } from '#/bridge/plugin';
import { type PersistenceService } from '#/index';
import {
    compileContentModel,
    type ContentModel,
    defineFeature,
    type Diagnostic,
    type JsonValue,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { decodeToTree, limitsOf } from '#/model/internal';
import { createSaveCoordinator } from '#/persistence/coordinator';
import { fixtureMention } from '#/plugins/__tests__/fixtures/features';
import { countingIds } from '#/plugins/__tests__/fixtures/notes';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { links } from '#/plugins/Link/feature';
import { extensionsOf } from '#/react/engine';
import { compileDefinition, type CompiledDefinition, countAppends, type EngineCommand } from '#/runtime/definition';
import { failNetworkInThisFile } from '#/testing/__tests__/fixtures/network';
import { stubStorage } from '#/testing/__tests__/fixtures/storage';

import { type AsyncRequest } from '../../async';
import { RUNTIME_PLUGINS } from '../../capabilities';
import { type UploadServiceLike } from '../../capabilities/media/uploads';
import { authoringOf } from '../../policy';
import { createEditorRuntime, type EditorRuntime, type EditorRuntimeOptions } from '../../runtime';
import {
    type AuthoringPolicy,
    type CaptureTargetOptions,
    type CommandResult,
    type DocumentChange,
    type FeaturePolicy,
    type ReplaceDocumentRequest,
} from '../../types';

export const started: EditorRuntime[] = [];

/** Installs the hooks every runtime spec runs under: fake timers, disposed sessions, and no storage or network. */
export const installRuntimeHooks = () => {
    const network = failNetworkInThisFile();
    // every browser storage API fails while this suite runs.
    let storage: ReturnType<typeof stubStorage> | undefined;
    beforeAll(() => {
        storage = stubStorage();
    });
    afterAll(() => {
        if (storage === undefined) {
            return;
        }

        const { accessed } = storage;
        storage.restore();
        expect(accessed).toEqual([]);
    });
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        for (const runtime of started.splice(0)) {
            runtime.handle.dispose();
        }

        document.body.replaceChildren();
        vi.useRealTimers();
    });

    return {
        network,
        storage: () => {
            if (storage === undefined) {
                throw new Error('storage is not stubbed');
            }

            return storage;
        },
    };
};

export const boldModel = compileContentModel([core(), bold()], { id: 'test.bold', version: 1 });
export const stored = (...blocks: readonly JsonValue[]) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'test.bold', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
});
export const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
export const strong = (value: string) => ({ type: 'text', text: value, marks: [{ type: 'bold' }] });
export const words = (value: string) => ({ type: 'text', text: value });
/** Inserts the payload's text, as `text.insert` does. */
export const TEXT_INSERT = {
    payload: { fields: { text: { type: 'string' } } },
    run: (api: EditorApi<'insert'>, { text }: { text: string }) => api.insert.text(text),
} as const;
export type Start = {
    model?: ContentModel;
    mode?: 'editable' | 'readonly';
    /** Adds plugins to the compiled definition, as the engine runs them after the definition's own. */
    plugins?: readonly Plugin[];
    /** Adds commands to the compiled definition's command map. */
    commands?: Readonly<Record<string, EngineCommand>>;
    policy?: Partial<AuthoringPolicy>;
    limits?: Partial<ResourceLimits>;
    generateId?: () => string;
    uploads?: UploadServiceLike;
    /** Makes the session managed, as a host's `services.persistence` does. */
    persistence?: PersistenceService;
    /** Editor parts beside the fixture features' own, as a host passes them. */
    parts?: readonly EditorPart[];
    pick?: (nodeId: string | undefined) => void;
};
/** The save coordinator of a session that mounts with `service`, none without one. */
export const saves = (model: ContentModel, service: PersistenceService | undefined): EditorRuntimeOptions['saves'] => {
    if (service === undefined) {
        return undefined;
    }

    return (runtime) =>
        createSaveCoordinator(runtime, {
            service: () => service,
            options: () => undefined,
            revision: null,
            unsavedOnMount: false,
            model,
            generateId: countingIds(),
        });
};

/** A runtime on an attached surface, `ready` after the first frame. */
export const start = (input: unknown, options: Start = {}) => {
    const { model = boldModel, mode = 'editable', plugins = [], commands = {}, generateId = countingIds() } = options;
    const { result, tree } = decodeToTree(input, model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error('expected an editable document');
    }

    const parts = unitsOf(model, options.parts);
    const compiled = compileDefinition(model, RUNTIME_PLUGINS, extensionsOf(model, parts));
    const definition: CompiledDefinition = {
        ...compiled,
        plugins: [...compiled.plugins, ...plugins],
        commands: new Map([...compiled.commands, ...Object.entries(commands)]),
    };

    const runtime = createEditorRuntime({
        definition,
        documentId: 'document-1',
        tree,
        capabilities: result.document.requiredCapabilities,
        generateId,
        mode,
        policy: authoringOf(model, options.policy),
        limits: limitsOf(options.limits),
        uploads: () => options.uploads,
        saves: saves(model, options.persistence),
        ...(options.pick === undefined ? {} : { pick: options.pick }),
    });
    started.push(runtime);
    const changes: DocumentChange[] = [];
    runtime.handle.subscribe('documentChange', (change: DocumentChange) => changes.push(change));
    const diagnostics: Diagnostic[] = [];
    runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
    const element = document.createElement('div');
    document.body.append(element);
    runtime.attach(element);
    vi.runAllTimers();
    const view = runtime.view;
    if (view === undefined) {
        throw new Error('no view');
    }

    return { runtime, handle: runtime.handle, changes, diagnostics, element, view };
};

export const contentOf = (change: DocumentChange | undefined) => change?.readDocument().content;
/** Starts an operation through the coordinator whose service call resolves when the test resolves it. */
export const pending = (runtime: EditorRuntime, request: Partial<AsyncRequest> = {}) => {
    let settle: (result: unknown) => void = () => undefined;
    const call = new Promise<unknown>((resolve) => {
        settle = resolve;
    });
    const operation = runtime.startAsync({
        key: 'upload',
        service: 'uploads',
        featureId: 'core',
        action: 'create',
        command: 'text.insert',
        run: () => call,
        ...request,
    });

    return {
        operation,
        resolve: async (result: unknown) => {
            settle(result);
            await call;
        },
    };
};

/** Runs `history.undo` until it no longer applies, and returns how many steps it undid. */
export const undoSteps = (handle: EditorRuntime['handle']) => {
    let steps = 0;
    while (handle.execute('history.undo').status === 'applied') {
        steps += 1;
    }

    return steps;
};

/** A request that replaces the session's document by `document`, discarding unsaved changes unless `unsaved` says otherwise. */
export const replacing = (
    handle: EditorRuntime['handle'],
    document: unknown,
    unsaved: ReplaceDocumentRequest['unsaved'] = { action: 'discard', confirmed: true },
): ReplaceDocumentRequest => ({
    expected: handle.getSnapshot().stamp,
    next: { documentId: 'document-2', revision: null, document: document as RichTextDocument },
    unsaved,
    selection: 'start',
    history: 'reset',
});
export const discarded = (reason: string) => ({
    code: 'runtime.async-discarded',
    severity: 'info',
    messageKey: 'runtime.async-discarded',
    details: { reason },
});
export const ALLOW: FeaturePolicy = { create: true, edit: true, remove: true, paste: true };
export const forbid = (featureId: string, action: 'create' | 'edit' | 'remove'): Partial<AuthoringPolicy> => ({
    features: { [featureId]: { ...ALLOW, [action]: false } },
});
export const mention = (nodeId: string) => ({ type: 'mention', attrs: { nodeId } });
export const heading = (level: number, ...content: readonly JsonValue[]) => ({
    type: 'heading',
    attrs: { nodeId: 'h-1', level },
    content,
});
/** The document's text, with `@` for each inline node. */
export const textOf = (doc: Node) => doc.textBetween(0, doc.content.size, '', '@');
export const applied = (result: CommandResult) => result.status === 'applied' || result.status === 'no-op';
/** A plugin that appends a transaction to every batch that holds one it did not append itself, forever. */
export const appendForever = (featureId: string, capability: string) =>
    countAppends(
        new Plugin({
            appendTransaction: (transactions, _old, state) => {
                if (transactions.every((transaction) => transaction.getMeta('appendedBy') === featureId)) {
                    return null;
                }

                return state.tr.setMeta('appendedBy', featureId);
            },
        }),
        { featureId, capability },
    );
/** Drops `html` from outside the editor at the start of the first block, as a browser does after the pointer release. */
export const dropHTML = (view: EditorView, html: string) => {
    vi.spyOn(view, 'posAtCoords').mockReturnValue({ pos: 1, inside: 0 });
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/html', html);
    const event = new DragEvent('drop', { bubbles: true, cancelable: true });
    // happy-dom's DragEvent ignores the `dataTransfer` init.
    Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
    view.dom.dispatchEvent(event);
};

/** An inline atom of another type that carries a `nodeId`, as a mention does. */
export const chip = defineFeature({
    id: 'fixture.chip',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        chip: {
            group: 'inline',
            atom: true,
            attrs: { nodeId: { type: 'string', required: true } },
            html: ['span'],
            parse: [],
        },
    },
});
export const targetModel = compileContentModel([core(), bold(), links(), fixtureMention(), chip()], {
    id: 'test.bold',
    version: 1,
});
export const capture = (handle: EditorRuntime['handle'], options: CaptureTargetOptions) => {
    const result = handle.captureTarget(options);
    if (result.status !== 'captured') {
        throw new Error('expected a captured target');
    }

    return result.target;
};

/** The text of every run that carries `mark`. */
export const markedText = (doc: Node, mark: string) => {
    let text = '';
    doc.descendants((node) => {
        if (node.isText && node.marks.some(({ type }) => type.name === mark)) {
            text += node.text;
        }
    });

    return text;
};

/** Starts a composition as the browser does, so ProseMirror's own handler sets `view.composing`, and composes `text`. */
export const compose = ({ view }: ReturnType<typeof start>, text: string) => {
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    // ProseMirror marks the composed text it reads from the DOM with its composition ID.
    view.dispatch(view.state.tr.insertText(text).setMeta('composition', 1));
};

export const endComposition = ({ view }: ReturnType<typeof start>) =>
    view.dom.dispatchEvent(new CompositionEvent('compositionend'));
/** Runs the microtask, then the 20 ms timer after which input has settled. */
export const settleInput = async () => {
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(20);
};

export const NOT_EDITABLE_CORE: Partial<AuthoringPolicy> = {
    features: { core: { create: true, edit: false, remove: true, paste: true } },
};
