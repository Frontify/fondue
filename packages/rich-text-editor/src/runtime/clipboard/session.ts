/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type ContentModel, type RichTextLocale, type TranslationStrings } from '#/model';
import {
    type ResolveAssetUrl,
    diagnostic,
    codecContext,
    randomId,
    exceedsBytes,
    type ResolveReference,
} from '#/model/internal';
import { type EditorRuntime, runtimeOfView } from '#/runtime/runtime';

import { type PasteSettings, type Payload } from './paste';

/** What the host side of a session gives its clipboard handlers. */
export type ClipboardSession = {
    /** The Inline profile's field, whose paste keeps one paragraph. */
    singleLine?: boolean;
    /** The presentation's `sliceContext`, read at each copy and paste. */
    sliceContext: () => string | null;
    /** The locale of the announcements and of the island labels in copied HTML. */
    locale: () => RichTextLocale;
    announce: (message: string) => void;
    /** The presentation's `resolveReference`, read at each copy, so copied mentions name whom the chip shows. */
    resolveReference?: () => ResolveReference | undefined;
    /** The presentation's `resolveAssetUrl`, read at each copy, so a copied image keeps the URL the editor shows. */
    resolveAssetUrl?: () => ResolveAssetUrl | undefined;
};

const sessions = new WeakMap<EditorRuntime, ClipboardSession>();

/** Gives the clipboard handlers of `runtime`'s view what they read from the host. */
export const connectClipboard = (runtime: EditorRuntime, session: ClipboardSession): void => {
    sessions.set(runtime, session);
};

export const connectedOf = (view: EditorView) => {
    const runtime = runtimeOfView(view);
    if (runtime === undefined) {
        return undefined;
    }

    const session = sessions.get(runtime);
    if (session === undefined) {
        return undefined;
    }

    return { runtime, session };
};

export type Connected = NonNullable<ReturnType<typeof connectedOf>>;

let pageContext: string | undefined;

/** The presentation's slice context, else the package's value for this page load. */
export const contextOf = (session: ClipboardSession) => {
    const context = session.sliceContext();
    if (context !== null) {
        return context;
    }

    if (pageContext === undefined) {
        pageContext = randomId();
    }

    return pageContext;
};

export const announce = (
    session: ClipboardSession,
    key: keyof TranslationStrings,
    vars?: Readonly<Record<string, number>>,
) => {
    const locale = session.locale();
    session.announce(codecContext(locale, locale).t(key, vars));
};

export const reject = ({ runtime }: Connected, reason: string) =>
    runtime.report(diagnostic('clipboard.paste-rejected', undefined, { reason }));

/** A flavor over `maxPasteBytes` stops the paste before anything parses it. */
export const rejectsSize = (connected: Connected, payload: Payload) => {
    const { runtime, session } = connected;
    const max = runtime.limits.maxPasteBytes;
    if (![payload.text, payload.html, payload.slice].some((flavor) => exceedsBytes(flavor, max))) {
        return false;
    }

    reject(connected, 'maxPasteBytes');
    announce(session, 'RichTextEditor_pasteTooLarge');

    return true;
};

export const settingsOf = (
    model: ContentModel,
    view: EditorView,
    { runtime, session }: Connected,
    plain: boolean,
): PasteSettings => ({
    model,
    limits: runtime.limits,
    policy: runtime.policy.features,
    context: contextOf(session),
    plain,
    headingLevels: runtime.policy.creatableHeadingLevels,
    window: view.dom.ownerDocument.defaultView ?? window,
    singleLine: session.singleLine === true,
});
