/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { type ContentMatch, Fragment, type Node, type NodeType } from 'prosemirror-model';
import { EditorState, Selection, TextSelection, Transaction } from 'prosemirror-state';
import { type NodeView, type NodeViewConstructor } from 'prosemirror-view';
import { createElement } from 'react';
import { expect, type it as runnerIt, vi } from 'vitest';

import { createNodeViews } from '#/bridge/nodeViews';
import {
    type EditorApi,
    type EditorCommand,
    type EditorFacet,
    type EditorHosts,
    type EditorPart,
    partWithOptions,
} from '#/bridge/plugin';
import { PortalHost } from '#/bridge/PortalHost';
import { createPortalStore, type PortalStore } from '#/bridge/portals';
import { compileDefinition, type Normalizer, NORMALIZERS } from '#/definition';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { pluginIds, pluginsById } from '#/features/plugins';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    createEmptyDocument,
    defaultLimits,
    type Feature,
    type RichTextDocument,
    findInvalidPayload,
} from '#/model';
import { compiledModel, decodeToTree } from '#/model/internal';
import { engineOf, viewsOf } from '#/react/compileEditor';
import { defineEditor } from '#/react/define';
import { extensionsOf } from '#/react/engine';
import { readerContext } from '#/reader/context';
import { RUNTIME_PLUGINS } from '#/runtime/capabilities';
import { SLOT_START_META, uploadSlotsPlugin } from '#/runtime/capabilities/media/uploadSlots';
import { createEditorRuntime, type EditorRuntime } from '#/runtime/runtime';
import { featureFixtures } from '#/testing/conformance/fixtures';

import { countingIds } from './notes';

// The most columns a presentation sets, so a column break has room in every fixture.
const COLUMNS = 6;
/** The session a command runs in: a presentation of the most columns, no policy and an editable editor. */
const SESSION = {
    runtime: {
        limits: defaultLimits,
        policy: { features: {}, creatableHeadingLevels: [], enterBehavior: 'none' },
        writeRefusal: () => undefined,
        refusal: () => undefined,
        handle: { getSummary: () => ({ mode: 'editable' }), releaseTarget: () => undefined },
    },
    host: {
        t: (key) => key,
        locale: () => 'en-US',
        services: {
            presentation: () => ({ styles: [], colorTokens: [], columns: COLUMNS, columnGap: undefined }),
            references: () => undefined,
            checks: () => undefined,
        },
        overlays: { open: () => undefined, close: () => undefined, isOpen: () => false },
        panels: { open: () => undefined, toggle: () => undefined, close: () => undefined, isOpen: () => false },
        announce: () => undefined,
        focus: () => undefined,
        anchor: () => ({ getBoundingClientRect: () => new DOMRect() }),
        surface: () => undefined,
        testId: () => 'fondue-rich-text-editor',
        report: () => undefined,
        generation: () => undefined,
    } satisfies EditorHosts,
};
/** A valid payload for each shipped command that declares one, so the case runs it for real. */
const PAYLOADS: Readonly<Record<string, unknown>> = {
    'text.insert': { text: 'a' },
    'slash.run': { command: 'text.insert', payload: { text: 'a' } },
    'heading.set': { level: 2 },
    'list.ordered.toggle': { start: 1 },
    'list.ordered.start.set': { start: 2 },
    'task.setChecked': { nodeId: 'task-1', checked: false },
    'code-block.toggle': { languageId: 'typescript' },
    'code-block.language.set': { languageId: 'javascript' },
    'code-block.indent': undefined,
    'code-block.outdent': undefined,
    'mark.font-color.set': { tokenId: 'brand.blue' },
    'block.style.set': { styleId: 'brand.body' },
    'block.align.set': { align: 'center' },
    'mark.language.set': { lang: 'de-CH', dir: null },
    'link.set': { href: 'https://frontify.com/brand', openInNewWindow: false, styleId: null },
    'reference.insert': { resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada' },
    'image.replace': { nodeId: 'image-1' },
    'image.size.set': { displayWidth: 50 },
    'image.align.set': { align: 'left' },
    'media.upload.cancel': { nodeId: 'slot-1' },
    'media.upload.retry': { nodeId: 'slot-1' },
};
// The globals through which a capability would reach the network or schedule work.
const FORBIDDEN = [
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'setTimeout',
    'setInterval',
    'setImmediate',
    'queueMicrotask',
    'requestAnimationFrame',
    'requestIdleCallback',
    'MessageChannel',
];

/** Replaces each forbidden global with a spy that throws, until `vi.unstubAllGlobals`, and returns the spies. */
const stubForbidden = (label: string) => {
    const failing = (name: string) =>
        vi.fn(() => {
            throw new Error(`${label} called ${name}.`);
        });
    // Only what the runner has; a global it lacks cannot be reached anyway.
    const stubs = FORBIDDEN.filter((name) => name in globalThis).map((name) => {
        const stub = failing(name);
        vi.stubGlobal(name, stub);
        return stub;
    });
    const { navigator: current } = globalThis;
    if (current !== undefined) {
        const sendBeacon = failing('navigator.sendBeacon');
        vi.stubGlobal('navigator', Object.create(current, { sendBeacon: { value: sendBeacon } }));
        stubs.push(sendBeacon);
    }
    return stubs;
};

const fixturesOf = (features: readonly Feature[]) =>
    features.flatMap((feature) => Object.values(featureFixtures[feature.id] ?? {}));

// A session whose every slot has an upload that runs and a file to send again, so Cancel and Retry apply.
const RUNNING_UPLOADS = uploadSlotsPlugin({ active: () => true, kept: () => true, retryable: () => true });

/**
 * The states with an upload slot `slot-1` after `state`, where the schema holds images: one that an insertion started
 * and one that a replacement of a stored image started.
 */
const slotStates = (state: EditorState): EditorState[] => {
    const { figure, asset_image: image } = state.schema.nodes;
    if (figure === undefined || image === undefined) {
        return [];
    }
    const attrs = (assetId: string | null) => ({
        nodeId: 'slot-1',
        assetId,
        labelSnapshot: 'logo.png',
        width: 40,
        height: 30,
    });
    const end = state.doc.content.size;
    const inserted = state.apply(
        state.tr
            .insert(end, figure.create({ nodeId: 'figure-1' }, image.create(attrs(null))))
            .setMeta(SLOT_START_META, { kind: 'insert', nodeIds: ['slot-1'] }),
    );
    const stored = state.apply(
        state.tr.insert(end, figure.create({ nodeId: 'figure-1' }, image.create(attrs('asset-1')))),
    );
    const pos = end + 1;
    const replaced = stored.apply(
        stored.tr
            .setNodeAttribute(pos, 'assetId', null)
            .setMeta(SLOT_START_META, { kind: 'replace', nodeId: 'slot-1', previous: attrs('asset-1') }),
    );
    return [inserted, replaced];
};

/**
 * Registers one case per command of `features`, which runs it over every fixture of those features, selected
 * whole and at a caret at either end, while the network and timers fail: the command returns a boolean, never a
 * promise, and dispatches at most one transaction before it returns.
 */
export const commandCases = (features: readonly Feature[], plugins?: readonly EditorPart[]): void => {
    // The runner's global `it`, as the contract suite takes it, so a stand-in runner collects these cases too.
    const { it } = globalThis as unknown as { readonly it: typeof runnerIt };
    const model = compileContentModel(features, { id: 'feature-contract', version: 1 });
    const installed = compiledModel(model).features;
    const given = plugins ?? [];
    // A given part extends the shipped part of its feature, so both parts' commands run.
    const parts = [...pluginsById(pluginIds).map(({ editor }) => editor), ...given].flatMap((part) => {
        const feature = installed.find(({ id }) => id === part.feature);
        if (feature === undefined) {
            return [];
        }
        return [partWithOptions(part, feature.options)];
    });
    for (const id of new Set(parts.flatMap((part) => Object.keys(part.commands ?? {})))) {
        it(`runs ${id} synchronously with no I/O or timer, dispatching at most once`, () => {
            // What `run` and `enabled` of this command return before the engine reads them as a truth value.
            const returned: unknown[] = [];
            const watched = (spec: EditorCommand<never>): EditorCommand<never> => {
                const watch =
                    (call: (api: EditorApi, payload: never) => boolean) => (api: EditorApi, payload: never) => {
                        const value: unknown = call(api, payload);
                        returned.push(value);
                        return value as boolean;
                    };
                const { enabled } = spec;
                if (enabled === undefined) {
                    return { ...spec, run: watch(spec.run) };
                }
                return { ...spec, run: watch(spec.run), enabled: watch(enabled) };
            };
            // One part per feature, over the commands of its shipped and given parts, with this command watched.
            const commandsOf = new Map<string, Record<string, EditorCommand<never>>>();
            const needsOf = new Map<string, readonly EditorFacet[]>();
            for (const part of parts) {
                const merged = { ...commandsOf.get(part.feature) };
                Object.assign(merged, part.commands);
                commandsOf.set(part.feature, merged);
                needsOf.set(part.feature, [...(needsOf.get(part.feature) ?? []), ...(part.needs ?? [])]);
            }
            const watching = [...commandsOf].map(([feature, commands]): EditorPart => {
                const needs = needsOf.get(feature) ?? [];
                const spec = commands[id];
                if (spec === undefined) {
                    return Object.freeze({ feature, needs, commands });
                }
                return Object.freeze({ feature, needs, commands: { ...commands, [id]: watched(spec) } });
            });
            const engine = compileDefinition(model, RUNTIME_PLUGINS, extensionsOf(model, unitsOf(model, watching)));
            const command = engine.commands.get(id);
            if (command === undefined) {
                throw new Error(`${id} is not installed.`);
            }
            const payload = PAYLOADS[id];
            expect(findInvalidPayload(command.payload, payload)).toBe(undefined);
            const states = [createEmptyDocument(model), ...fixturesOf(features)].flatMap((document) => {
                const { tree } = decodeToTree({ ...document, model: model.ref }, model);
                if (tree === undefined) {
                    throw new Error('A fixture of the features does not decode.');
                }
                const state = EditorState.create({
                    doc: engine.schema.nodeFromJSON(tree),
                    plugins: [...engine.plugins, RUNNING_UPLOADS],
                });
                const { doc } = state;
                const whole = TextSelection.between(doc.resolve(0), doc.resolve(doc.content.size));
                return [
                    state.apply(state.tr.setSelection(whole)),
                    state.apply(state.tr.setSelection(Selection.atEnd(doc))),
                    state.apply(state.tr.setSelection(Selection.atStart(doc))),
                    ...slotStates(state),
                ];
            });
            // An edit, and the same edit undone, so the history commands have a step to undo and one to redo.
            const [empty] = states;
            if (empty !== undefined) {
                const edited = empty.apply(empty.tr.insertText('a'));
                states.push(edited);
                engine.commands
                    .get('history.undo')
                    ?.run(edited, (transaction) => states.push(edited.apply(transaction)));
            }
            // A colour set and cleared again, so the reapply command has a last colour to set.
            const setColor = engine.commands.get('mark.font-color.set');
            if (setColor !== undefined) {
                for (const state of [...states]) {
                    setColor.run(
                        state,
                        (transaction) => {
                            const colored = state.apply(transaction);
                            setColor.run(colored, (cleared) => states.push(colored.apply(cleared)), null);
                        },
                        PAYLOADS['mark.font-color.set'],
                    );
                }
            }
            const stubs = stubForbidden(id);
            let changed = false;
            let opened = false;
            try {
                for (const state of states) {
                    const dispatched: Transaction[] = [];
                    const effects: (() => void)[] = [];
                    const context = { defer: (effect: () => void) => effects.push(effect), session: SESSION };
                    const result: unknown = command.run(
                        state,
                        (transaction) => dispatched.push(transaction),
                        payload,
                        context,
                    );
                    expect(typeof result).toBe('boolean');
                    // A command that applies dispatches exactly one transaction before it returns, and one that does not, none.
                    let expected = 0;
                    if (result === true) {
                        expected = 1;
                    }
                    // A command that only opens an overlay or a panel defers that and dispatches nothing.
                    if (result === true && dispatched.length === 0 && effects.length > 0) {
                        expected = 0;
                        opened = true;
                    }
                    expect(dispatched.length).toBe(expected);
                    changed ||= dispatched.some((transaction) => transaction.doc !== state.doc);
                }
            } finally {
                vi.unstubAllGlobals();
            }
            expect(stubs.filter((stub) => stub.mock.calls.length > 0)).toEqual([]);
            expect(returned.filter((value) => typeof value !== 'boolean')).toEqual([]);
            // At least one fixture state gives the command a document change to make, unless it only opens something.
            expect(changed || opened).toBe(true);
        });
    }
};

/** A node with every attribute that has an engine default set to it, so a `nodeId` is missing, as engine-made nodes start. */
const withDefaults = (node: Node): Node => {
    if (node.isText) {
        return node;
    }
    const attrs: Record<string, unknown> = { ...node.attrs };
    for (const [name, spec] of Object.entries(node.type.spec.attrs ?? {})) {
        if ('default' in spec) {
            attrs[name] = spec.default;
        }
    }
    return node.type.create(attrs, Fragment.fromArray(node.children.map(withDefaults)), node.marks);
};

const stepsOf = (transaction: Transaction | null) => {
    if (transaction === null) {
        return null;
    }
    return transaction.steps.map((step): unknown => step.toJSON());
};

/**
 * Registers two cases per normalizer that `features` install, over valid states generated from their fixtures, or
 * from `documents`: each document, its blocks twice over, and its nodes with every defaulted attribute at its
 * default. A normalizer returns the same steps for equal states and nothing on its own output,
 * and runs synchronously with no I/O or timer.
 */
export const normalizerCases = (features: readonly Feature[], documents?: readonly RichTextDocument[]): void => {
    const { it } = globalThis as unknown as { readonly it: typeof runnerIt };
    const model = compileContentModel(features, { id: 'feature-contract', version: 1 });
    const given = documents ?? fixturesOf(features);
    const statesOf = () => {
        const { schema } = compileDefinition(model);
        return given.flatMap((document) => {
            const { tree } = decodeToTree({ ...document, model: model.ref }, model);
            if (tree === undefined) {
                throw new Error('A fixture of the features does not decode.');
            }
            const doc = schema.nodeFromJSON(tree);
            const variants = [doc, doc.copy(doc.content.append(doc.content)), withDefaults(doc)];
            return variants.filter((variant) => {
                try {
                    variant.check();
                    return true;
                } catch {
                    return false;
                }
            });
        });
    };
    // Read at run time, so a case runs the normalizer that is registered then.
    const normalizerOf = (id: string) => (NORMALIZERS[id] as { readonly normalize: Normalizer }).normalize;
    for (const { id } of compiledModel(model).plugins) {
        if (NORMALIZERS[id] === undefined) {
            continue;
        }
        it(`runs the ${id} normalizer to equal steps on equal states and to nothing on its output`, () => {
            const normalize = normalizerOf(id);
            let repaired = false;
            for (const doc of statesOf()) {
                const ids = countingIds();
                const equal = doc.type.schema.nodeFromJSON(doc.toJSON());
                // Time moves between the two runs, so a normalizer that reads it gives equal states other steps.
                vi.useFakeTimers({ toFake: ['Date', 'performance'] });
                let first: Transaction | null;
                let second: Transaction | null;
                try {
                    first = normalize(EditorState.create({ doc }), ids);
                    vi.advanceTimersByTime(1000);
                    second = normalize(EditorState.create({ doc: equal }), countingIds());
                } finally {
                    vi.useRealTimers();
                }
                expect(stepsOf(second)).toEqual(stepsOf(first));
                if (first !== null) {
                    repaired = true;
                    expect(stepsOf(normalize(EditorState.create({ doc: first.doc }), ids))).toBe(null);
                }
            }
            // At least one generated state gives the normalizer something to repair.
            expect(repaired).toBe(true);
        });
        it(`runs the ${id} normalizer synchronously with no I/O or timer`, () => {
            const normalize = normalizerOf(id);
            const states = statesOf().map((doc) => EditorState.create({ doc }));
            const ids = countingIds();
            const stubs = stubForbidden(`The ${id} normalizer`);
            // A normalizer schedules no promise work either, which the command case allows for an upload hand-off.
            const then = vi.spyOn(Promise.prototype, 'then').mockImplementation(() => {
                throw new Error(`The ${id} normalizer called Promise.prototype.then.`);
            });
            let scheduled = 0;
            try {
                for (const state of states) {
                    const result: unknown = normalize(state, ids);
                    expect(result === null || result instanceof Transaction).toBe(true);
                }
            } finally {
                scheduled = then.mock.calls.length;
                then.mockRestore();
                vi.unstubAllGlobals();
            }
            expect(stubs.filter((stub) => stub.mock.calls.length > 0)).toEqual([]);
            expect(scheduled).toBe(0);
        });
    }
};

// HTML phrasing content, the only elements an inline view may hold.
const PHRASING = new Set(
    (
        'a abbr audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd ' +
        'label map mark math meter noscript object output picture progress q ruby s samp script select slot small span ' +
        'strong sub sup svg template textarea time u var video wbr'
    ).split(' '),
);
// The children a table element allows, so no element sits between `table`, `tr` and cells.
const TABLE_CHILDREN: Readonly<Record<string, readonly string[]>> = {
    table: ['caption', 'colgroup', 'thead', 'tbody', 'tfoot', 'tr'],
    thead: ['tr'],
    tbody: ['tr'],
    tfoot: ['tr'],
    tr: ['td', 'th'],
};
const ACTIONABLE = 'a[href], button, input, select, textarea, [tabindex], [role="button"], [contenteditable="true"]';

/** The node types whose content can hold `type` at some point, walking every content match state. */
const allowedParents = (type: NodeType): string[] =>
    Object.values(type.schema.nodes)
        .filter((parent) => {
            const seen = new Set<ContentMatch>();
            const queue: ContentMatch[] = [parent.contentMatch];
            for (let match = queue.shift(); match !== undefined; match = queue.shift()) {
                if (seen.has(match)) {
                    continue;
                }
                seen.add(match);
                for (let index = 0; index < match.edgeCount; index += 1) {
                    const edge = match.edge(index);
                    if (edge.type === type) {
                        return true;
                    }
                    queue.push(edge.next);
                }
            }
            return false;
        })
        .map(({ name }) => name);

interface BuiltView {
    readonly node: Node;
    readonly parent: string;
    readonly view: NodeView;
    readonly chrome: HTMLElement;
}

/**
 * Registers the cases of every node view that `features` attach, over `documents`, which hold each such node under
 * each parent its schema allows: each view is built through the bridge with the portal store paused, so no React
 * render has run when the DOM cases read it.
 */
export const nodeViewCases = (
    features: readonly Feature[],
    documents: readonly RichTextDocument[],
    plugins: readonly EditorPart[] = [],
): void => {
    const { it } = globalThis as unknown as { readonly it: typeof runnerIt };
    const model = compileContentModel(features, { id: 'feature-contract', version: 1 });
    const definition = defineEditor({ id: 'feature-contract', model, plugins: unitsOf(model, plugins) });
    const views = viewsOf(definition);

    /** Mounts every document with the bridge's views, then runs `check` on the views built, and unmounts. */
    const withViews = async (
        name: string,
        check: (built: readonly BuiltView[], render: () => Promise<void>) => void | Promise<void>,
    ) => {
        const runtimes: EditorRuntime[] = [];
        const stores: PortalStore[] = [];
        const built: BuiltView[] = [];
        /** The bridge's constructors, recording each view of `name` with its node and parent. */
        const capture = (constructors: Readonly<Record<string, NodeViewConstructor>>) => {
            const capturing: Record<string, NodeViewConstructor> = {};
            for (const [type, construct] of Object.entries(constructors)) {
                capturing[type] = (node, view, getPos, decorations, inner) => {
                    const created = construct(node, view, getPos, decorations, inner);
                    const pos = getPos();
                    if (type === name && pos !== undefined) {
                        const chrome = created.dom.querySelector(':scope > [data-rte-chrome]') as HTMLElement;
                        built.push({
                            node,
                            parent: view.state.doc.resolve(pos).parent.type.name,
                            view: created,
                            chrome,
                        });
                    }
                    return created;
                };
            }
            return capturing;
        };
        const elements: HTMLElement[] = [];
        // Every asset resolves, so an image view renders its image and the controls around it.
        const context = readerContext(enUS, {
            resolveAssetUrl: (assetId) => `https://assets.frontify.test/${assetId}`,
        });
        const hosts = [];
        for (const document of documents) {
            const { result, tree } = decodeToTree({ ...document, model: model.ref }, model);
            if (tree === undefined || result.status === 'blocked') {
                throw new Error('A node view document does not decode.');
            }
            const portals = createPortalStore();
            stores.push(portals);
            // The host mounts before the view, so its render does not flush the portal microtask the view queues.
            hosts.push(
                render(createElement(PortalHost, { store: portals, context, lang: 'en-US', onFlush: () => undefined })),
            );
            const runtime = createEditorRuntime({
                definition: engineOf(definition),
                documentId: 'document-1',
                tree,
                capabilities: result.document.requiredCapabilities,
                generateId: countingIds(),
                mode: 'editable',
                policy: definition.authoring,
                limits: definition.limits,
                nodeViews: (session) => capture(createNodeViews(views, { portals, runtime: session })),
            });
            runtimes.push(runtime);
            const element = globalThis.document.createElement('div');
            globalThis.document.body.append(element);
            elements.push(element);
            runtime.attach(element);
        }
        try {
            await check(built, () =>
                act(async () => {
                    await Promise.resolve();
                }),
            );
        } finally {
            for (const host of hosts) {
                host.unmount();
            }
            for (const runtime of runtimes) {
                runtime.handle.dispose();
            }
            for (const element of elements) {
                element.remove();
            }
        }
    };

    for (const [name] of views) {
        it(`builds dom and contentDOM of the ${name} view before its constructor returns, with React paused`, () =>
            withViews(name, (built) => {
                expect(built.length).toBeGreaterThan(0);
                for (const { node, view, chrome } of built) {
                    expect(view.dom).toBeInstanceOf(HTMLElement);
                    // Leaf and atom views have no `contentDOM`.
                    if (node.isAtom) {
                        expect(view.contentDOM ?? null).toBe(null);
                    } else {
                        expect(view.contentDOM).toBeInstanceOf(HTMLElement);
                        expect(view.dom.contains(view.contentDOM as HTMLElement)).toBe(true);
                    }
                    expect(chrome.childNodes).toHaveLength(0);
                }
            }));
        it(`puts the chrome slot of the ${name} view beside contentDOM, never around it`, () =>
            withViews(name, (built) => {
                for (const { view, chrome } of built) {
                    expect(chrome.getAttribute('contenteditable')).toBe('false');
                    const { contentDOM } = view;
                    if (contentDOM !== null && contentDOM !== undefined) {
                        expect(chrome.contains(contentDOM)).toBe(false);
                        expect(contentDOM.parentElement).toBe(chrome.parentElement);
                    }
                }
            }));
        it(`ignores only the chrome mutations of the ${name} view`, () =>
            withViews(name, (built) => {
                for (const { view, chrome } of built) {
                    const ignore = (record: object) => view.ignoreMutation?.(record as MutationRecord);
                    const inChrome = chrome.appendChild(globalThis.document.createElement('span'));
                    const chromeText = inChrome.appendChild(globalThis.document.createTextNode('chrome'));
                    const content = view.contentDOM ?? view.dom;
                    const contentText = content.appendChild(globalThis.document.createTextNode('content'));
                    expect([
                        ignore({ type: 'childList', target: chrome }),
                        ignore({ type: 'childList', target: inChrome }),
                        ignore({ type: 'characterData', target: chromeText }),
                        ignore({ type: 'attributes', target: inChrome, attributeName: 'class' }),
                    ]).toEqual([true, true, true, true]);
                    expect([
                        ignore({ type: 'selection', target: chrome }),
                        ignore({ type: 'selection', target: content }),
                        ignore({ type: 'childList', target: content }),
                        ignore({ type: 'characterData', target: contentText }),
                        // A browser that removed `contentDOM` mutates `dom` itself.
                        ignore({ type: 'childList', target: view.dom }),
                    ]).toEqual([false, false, false, false, false]);
                    inChrome.remove();
                    contentText.remove();
                }
            }));
        it(`stops key, mouse, drag and clipboard events only inside the chrome of the ${name} view`, () =>
            withViews(name, (built) => {
                const events = () => [
                    new KeyboardEvent('keydown', { bubbles: true }),
                    new MouseEvent('mousedown', { bubbles: true }),
                    new DragEvent('dragstart', { bubbles: true }),
                    new ClipboardEvent('paste', { bubbles: true }),
                ];
                for (const { view, chrome } of built) {
                    const stops = (target: HTMLElement) =>
                        events().map((event) => {
                            let stopped: boolean | undefined;
                            const listener = (received: Event) => {
                                stopped = view.stopEvent?.(received);
                            };
                            target.addEventListener(event.type, listener);
                            target.dispatchEvent(event);
                            target.removeEventListener(event.type, listener);
                            return stopped;
                        });
                    const inChrome = chrome.appendChild(globalThis.document.createElement('span'));
                    expect(stops(inChrome)).toEqual([true, true, true, true]);
                    expect(stops(view.contentDOM ?? view.dom)).toEqual([false, false, false, false]);
                    inChrome.remove();
                }
            }));
        it(`keeps valid HTML nesting for the ${name} view under each parent its schema allows`, () =>
            withViews(name, async (built, renderChrome) => {
                await renderChrome();
                const [first] = built;
                expect(first).toBeDefined();
                if (first === undefined) {
                    return;
                }
                expect(new Set(built.map(({ parent }) => parent))).toEqual(new Set(allowedParents(first.node.type)));
                for (const { node, view } of built) {
                    const elements = [view.dom, ...view.dom.querySelectorAll('*')];
                    if (node.isInline) {
                        expect(elements.map(({ localName }) => localName).filter((tag) => !PHRASING.has(tag))).toEqual(
                            [],
                        );
                    }
                    for (const element of elements) {
                        const { parentElement } = element;
                        if (parentElement === null) {
                            continue;
                        }
                        const allowed = TABLE_CHILDREN[parentElement.localName];
                        if (allowed !== undefined) {
                            expect(allowed).toContain(element.localName);
                        }
                    }
                }
            }));
        it(`names a command for every drag in the chrome of the ${name} view, which a node chrome control runs`, () =>
            withViews(name, async (built, renderChrome) => {
                await renderChrome();
                for (const { chrome } of built) {
                    for (const drag of chrome.querySelectorAll('[data-rte-drag]')) {
                        const command = drag.getAttribute('data-rte-drag') ?? '';
                        const control = chrome.querySelector(`button[data-rte-command="${CSS.escape(command)}"]`);
                        expect(engineOf(definition).commands.has(command)).toBe(true);
                        expect(control?.closest('[data-rte-node-chrome]')).toBeInstanceOf(HTMLElement);
                    }
                }
            }));
        it(`keeps every control in the chrome of the ${name} view out of aria-hidden`, () =>
            withViews(name, async (built, renderChrome) => {
                await renderChrome();
                for (const { chrome } of built) {
                    expect(chrome.childNodes.length).toBeGreaterThan(0);
                    const hidden = [...chrome.querySelectorAll(ACTIONABLE)].filter(
                        (control) => control.closest('[aria-hidden="true"]') !== null,
                    );
                    expect(hidden).toEqual([]);
                }
            }));
    }
};
