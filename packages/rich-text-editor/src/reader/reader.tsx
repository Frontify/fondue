/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { enUS } from '#/locales/en-US';
import {
    type ColorToken,
    type ContentModel,
    type DecodeOptions,
    type Diagnostic,
    type JsonValue,
    type ListLevels,
    type PresentationStyle,
    type ReferenceResolution,
    type ResourceLimits,
    type RichTextLocale,
} from '#/model';
import { type ResolveAssetUrl } from '#/model/declarations';
import { decodeToTree } from '#/model/decode';
import { canonicalJson } from '#/model/hash';
import { columnLayout, listDepths, styleSheetOf } from '#/model/output';

import { readerContext } from './context';
import { planOf } from './plan';
import { message, renderDocument, type RenderState } from './render';

/** What the host decides about one reader output: its styles, colours and the resolvers it renders with. */
export interface ReaderPresentation {
    /** Brand style recipes by style ID, which `styleId` names. */
    readonly styles: readonly PresentationStyle[];
    /** The colours a `tokenId` of `font_color` or `highlight` names. */
    readonly colorTokens: readonly ColorToken[];
    readonly resolveAssetUrl?: ResolveAssetUrl;
    /** Synchronous, so the reader renders on the server in one pass. */
    readonly resolveReference?: (resourceType: string, resourceId: string) => ReferenceResolution;
    /** A class the content root carries beside `fondue-rte-content`, for host rules. */
    readonly contentClassName?: string;
    /** List markers by depth. */
    readonly listLevels?: ListLevels;
    /** 1 to 6. */
    readonly columns?: number;
    /**
     * `normal`, or a length in `px` or `rem`. With `normal` and a font size on `contentClassName` that differs from the
     * surrounding font, the reader's column thresholds use the surrounding font; a `px` or `rem` gap avoids it.
     */
    readonly columnGap?: string;
}

export interface RichTextReaderProps {
    /** JSON text or a parsed value; the reader decodes it. */
    readonly document: unknown;
    readonly model: ContentModel;
    readonly presentation?: ReaderPresentation;
    readonly locale?: RichTextLocale;
    /** The limits the writing definition used, when a host loosened them through `limitOverrides`. Omitted means the default limits. */
    readonly limits?: Partial<ResourceLimits>;
    readonly onDiagnostic?: (diagnostic: Diagnostic) => void;
}

interface Output {
    readonly element: ReactElement;
    readonly diagnostics: readonly Diagnostic[];
    /** The callbacks that already received `diagnostics`, so a rerender reports nothing twice. */
    readonly notified: WeakSet<object>;
}

const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };

/** A list the host passed, or none: plain JavaScript hosts may leave a member out. */
const listOf = <T,>(value: readonly T[] | undefined): readonly T[] => {
    if (value !== undefined && Array.isArray(value)) {
        return value as readonly T[];
    }
    return [];
};

const build = ({ document, model, presentation, locale = enUS, limits }: RichTextReaderProps): Output => {
    let resolvers: ReaderPresentation = NO_PRESENTATION;
    if (presentation !== undefined) {
        resolvers = presentation;
    }
    const styles = listOf<PresentationStyle>(resolvers.styles);
    const context = readerContext(locale, resolvers);
    const notified = new WeakSet<object>();
    let options: DecodeOptions = {};
    if (limits !== undefined) {
        options = { limits };
    }
    const { result, tree } = decodeToTree(document, model, options);
    // The decode diagnostics come first, as the codecs report them.
    const diagnostics: Diagnostic[] = [...result.diagnostics];
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
    const state: RenderState = {
        plan: planOf(model),
        context,
        diagnostics,
        islands: 0,
        carried: 0,
        listLevels: resolvers.listLevels,
        depths: listDepths(),
        styles: { styles, colorTokens: listOf<ColorToken>(resolvers.colorTokens), inline: false },
        // Without a presentation no style map is given, so no stored style is unknown.
        unknownStyles: presentation === undefined ? undefined : new Set(),
        columns: columnLayout(resolvers.columns, resolvers.columnGap),
        breaks: 0,
    };
    const element = renderDocument(state, tree, resolvers.contentClassName, styleSheetOf(styles));
    return { element, diagnostics, notified };
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
const MAX_LIMITS = 16;

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
        if (slots.size >= MAX_LIMITS) {
            // Per-document limits must not grow this map forever; the oldest value goes.
            slots.delete(slots.keys().next().value as string);
        }
    } else {
        slots.delete(limitsKey);
    }
    slots.set(limitsKey, slot);
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
