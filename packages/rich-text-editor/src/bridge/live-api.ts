/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DocumentApi } from '#/runtime/document-api';
import { type CommandContext, type CommandSession, liveDocumentApi } from '#/runtime/editor-api';
import { type EditorPort } from '#/runtime/port';
import { engineOf } from '#/runtime/port-engine';

import { type EditorApi, type EditorHosts } from './plugin';

const apis = new WeakMap<EditorPort, WeakMap<EditorHosts, EditorApi>>();
const documents = new WeakMap<EditorPort, DocumentApi>();

const withHosts = (document: DocumentApi, hosts: EditorHosts): EditorApi => Object.assign({ ...document }, hosts);

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
