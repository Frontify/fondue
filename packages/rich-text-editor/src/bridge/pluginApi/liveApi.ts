/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DocumentApi } from '#/runtime/api/documentApi';
import { type CommandContext, type CommandSession, liveDocumentApi } from '#/runtime/api/editorApi';
import { type EditorPort } from '#/runtime/port';
import { engineOf } from '#/runtime/portEngine';

import { type EditorApi, type EditorFacet, type EditorHosts, type EditorPart } from '../plugin';

const apis = new WeakMap<EditorPort, WeakMap<EditorHosts, EditorApi>>();
const documents = new WeakMap<EditorPort, DocumentApi>();

const views = new WeakMap<EditorApi, Map<string, EditorApi>>();

/** What a part's functions get of `api`: its control members and the facets in `needs`, one object per part, which in development throws on a facet left out. */
export const facetsOf = (api: EditorApi, needs: readonly EditorFacet[] | undefined, featureId: string): EditorApi => {
    let byFeature = views.get(api);
    if (byFeature === undefined) {
        byFeature = new Map();
        views.set(api, byFeature);
    }

    let view = byFeature.get(featureId);
    if (view === undefined) {
        view = {} as EditorApi;
        for (const [name, value] of Object.entries(api)) {
            // A facet is the one kind of member that is an object, as `EditorFacet` defines it.
            if (typeof value !== 'object' || needs?.some((need) => need === name) === true) {
                Reflect.set(view, name, value);
            } else if (process.env.NODE_ENV !== 'production') {
                Object.defineProperty(view, name, {
                    get: () => {
                        throw new Error(`${featureId} reads api.${name} without declaring it in needs.`);
                    },
                });
            }
        }

        for (const need of needs ?? []) {
            // `uploads` is the one facet a session may lack, when its model does not install `media.image`.
            if (!(need in api) && process.env.NODE_ENV !== 'production') {
                Object.defineProperty(view, need, {
                    get: () => {
                        throw new Error(`${featureId} needs api.${need}, which this editor does not install.`);
                    },
                });
            }
        }

        byFeature.set(featureId, view);
    }

    return view;
};

// A session without `media.image` has no `uploads`, which only a part that declares it would read.
const withHosts = (document: DocumentApi, hosts: EditorHosts): EditorApi =>
    Object.assign({ ...document }, hosts) as EditorApi;

/** The live API of `runtime` with `hosts`, one per pair. */
export const editorApiOf = (runtime: EditorPort, hosts: EditorHosts): EditorApi => {
    let byHosts = apis.get(runtime);
    if (byHosts === undefined) {
        byHosts = new WeakMap();
        apis.set(runtime, byHosts);
    }

    let api = byHosts.get(hosts);
    if (api === undefined) {
        // One document API per session, so its members keep their identity when the hosts change with the locale.
        let document = documents.get(runtime);
        if (document === undefined) {
            document = liveDocumentApi(engineOf(runtime));
            documents.set(runtime, document);
        }

        api = withHosts(document, hosts);
        byHosts.set(hosts, api);
    }

    return api;
};

const INERT: EditorHosts = {
    t: (key) => key,
    locale: () => 'en-US',
    services: {
        presentation: () => ({ styles: [], colorTokens: [], columns: 1, columnGap: undefined }),
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
};

/**
 * The API a running plugin command gets: the document API over its state, and the session's hosts, whose actions wait
 * until the command has run; a query drops them.
 */
export const commandApiOf = (
    document: DocumentApi,
    context: CommandContext | undefined,
    session: CommandSession | undefined,
): EditorApi => {
    const given = session?.host as EditorHosts | undefined;
    const hosts = given ?? INERT;
    const later = (action: () => void): void => {
        context?.defer(action);
    };

    return {
        ...withHosts(document, hosts),
        overlays: {
            open: (component, props, anchor) => later(() => hosts.overlays.open(component, props, anchor)),
            close: () => later(() => hosts.overlays.close()),
            isOpen: () => hosts.overlays.isOpen(),
        },
        panels: {
            open: (id) => later(() => hosts.panels.open(id)),
            toggle: (id) => later(() => hosts.panels.toggle(id)),
            close: () => later(() => hosts.panels.close()),
            isOpen: (id) => hosts.panels.isOpen(id),
        },
        announce: (message, key) => later(() => hosts.announce(message, key)),
        focus: () => later(() => hosts.focus()),
    };
};

/** `commandApiOf` as a part's functions get it: only the facets the part declares. */
export const partCommandApiOf =
    ({ feature, needs }: Pick<EditorPart, 'feature' | 'needs'>): typeof commandApiOf =>
    (document, context, session) =>
        facetsOf(commandApiOf(document, context, session), needs, feature);
