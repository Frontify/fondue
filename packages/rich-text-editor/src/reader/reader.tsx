/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { enUS } from '#/locales/en-US';
import {
    type ContentModel,
    decodeDocument,
    type DecodeOptions,
    type Diagnostic,
    type ReferenceResolution,
    type ResourceLimits,
    type RichTextLocale,
} from '#/model';
import { checkContent } from '#/model/content';

import { readerContext } from './context';
import { planOf } from './plan';
import { message, renderDocument, type RenderState } from './render';

/** What the host decides about one reader output: the resolvers it renders with. */
export interface ReaderPresentation {
    readonly resolveAssetUrl?: (assetId: string, options: { readonly width?: number }) => string | null;
    /** Synchronous, so the reader renders on the server in one pass. */
    readonly resolveReference?: (resourceType: string, resourceId: string) => ReferenceResolution;
}

export interface RichTextReaderProps {
    /** JSON text or a parsed value; the reader decodes it. */
    readonly document: unknown;
    readonly model: ContentModel;
    readonly presentation?: ReaderPresentation;
    readonly locale?: RichTextLocale;
    /** The limits the writing definition used, when a host loosened them through `limitOverrides`; default the Limits table. */
    readonly limits?: Partial<ResourceLimits>;
    readonly onDiagnostic?: (diagnostic: Diagnostic) => void;
}

interface Output {
    readonly element: ReactElement;
    readonly diagnostics: readonly Diagnostic[];
    /** The callbacks that already received `diagnostics`, so a rerender reports nothing twice. */
    readonly notified: WeakSet<object>;
}

const build = ({ document, model, presentation, locale = enUS, limits }: RichTextReaderProps): Output => {
    let resolvers: ReaderPresentation = {};
    if (presentation !== undefined) {
        resolvers = presentation;
    }
    const context = readerContext(locale, resolvers);
    const diagnostics: Diagnostic[] = [];
    const notified = new WeakSet<object>();
    let options: DecodeOptions = {};
    if (limits !== undefined) {
        options = { limits };
    }
    const decoded = decodeDocument(document, model, options);
    let reason: 'unsupported' | 'invalid' = 'invalid';
    if (decoded.status === 'blocked') {
        if (decoded.reason === 'unsupported') {
            reason = 'unsupported';
        }
        return { element: message(context, reason), diagnostics, notified };
    }
    // `decodeDocument` returns the migrated JSON, not the islands it found, so the content is checked once more for them.
    const { tree } = checkContent(decoded.document.content, model);
    if (tree === undefined) {
        return { element: message(context, 'invalid'), diagnostics, notified };
    }
    const state: RenderState = { plan: planOf(model), context, diagnostics, islands: 0 };
    return { element: renderDocument(state, tree), diagnostics, notified };
};

type Level = WeakMap<object, Level | Output>;
const outputs: Level = new WeakMap();
const NONE = {};

/** One output per document object, model, presentation, locale and limits, so a rerender neither decodes nor builds again. */
const outputOf = (props: RichTextReaderProps): Output => {
    const { document, model, presentation, locale, limits } = props;
    if (typeof document !== 'object' || document === null) {
        return build(props);
    }
    const presented = presentation ?? NONE;
    const localized = locale ?? NONE;
    let level = outputs;
    for (const key of [document, model, presented, localized]) {
        let next = level.get(key) as Level | undefined;
        if (next === undefined) {
            next = new WeakMap();
            level.set(key, next);
        }
        level = next;
    }
    const last = limits ?? NONE;
    let output = level.get(last) as Output | undefined;
    if (output === undefined) {
        output = build(props);
        level.set(last, output);
    }
    return output;
};

/** Renders a document as semantic HTML with no engine, hook, context or DOM access, on the server or in the browser. */
export const RichTextReader = (props: RichTextReaderProps): ReactElement => {
    const output = outputOf(props);
    const { onDiagnostic } = props;
    if (onDiagnostic !== undefined && !output.notified.has(onDiagnostic)) {
        output.notified.add(onDiagnostic);
        for (const diagnostic of output.diagnostics) {
            onDiagnostic(diagnostic);
        }
    }
    return output.element;
};
