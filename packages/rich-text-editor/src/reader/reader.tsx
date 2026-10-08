/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { enUS } from '#/locales/en-US';
import {
    type ContentModel,
    type DecodeOptions,
    type Diagnostic,
    type JsonValue,
    type ReferenceResolution,
    type ResourceLimits,
    type RichTextLocale,
} from '#/model';
import { decodeToTree } from '#/model/decode';
import { canonicalJson } from '#/model/hash';

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
    const { result, tree } = decodeToTree(document, model, options);
    let reason: 'unsupported' | 'invalid' = 'invalid';
    if (result.status === 'blocked') {
        if (result.reason === 'unsupported') {
            reason = 'unsupported';
        }
        return { element: message(context, reason), diagnostics, notified };
    }
    if (tree === undefined) {
        return { element: message(context, 'invalid'), diagnostics, notified };
    }
    const state: RenderState = { plan: planOf(model), context, diagnostics, islands: 0, carried: 0 };
    return { element: renderDocument(state, tree), diagnostics, notified };
};

interface Slot {
    readonly objects: WeakMap<object, Output>;
    /** The last JSON text rendered, so a host that passes the same text each render decodes once. */
    text?: string;
    output?: Output;
}
type Level = WeakMap<object, Level | Map<string, Slot>>;
const outputs: Level = new WeakMap();
const NONE = {};

/** One output per document, model, presentation, locale and limits (by value), so a rerender neither decodes nor builds again. */
const outputOf = (props: RichTextReaderProps): Output => {
    const { document, model, presentation, locale, limits } = props;
    if (typeof document !== 'string' && (typeof document !== 'object' || document === null)) {
        return build(props);
    }
    let level = outputs;
    for (const key of [model, presentation ?? NONE]) {
        let next = level.get(key) as Level | undefined;
        if (next === undefined) {
            next = new WeakMap();
            level.set(key, next);
        }
        level = next;
    }
    const localized = locale ?? NONE;
    let slots = level.get(localized) as Map<string, Slot> | undefined;
    if (slots === undefined) {
        slots = new Map();
        level.set(localized, slots);
    }
    const limitsKey = canonicalJson((limits ?? {}) as JsonValue);
    let slot = slots.get(limitsKey);
    if (slot === undefined) {
        slot = { objects: new WeakMap() };
        slots.set(limitsKey, slot);
    }
    if (typeof document === 'string') {
        if (slot.output === undefined || slot.text !== document) {
            slot.output = build(props);
            slot.text = document;
        }
        return slot.output;
    }
    let output = slot.objects.get(document);
    if (output === undefined) {
        output = build(props);
        slot.objects.set(document, output);
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
