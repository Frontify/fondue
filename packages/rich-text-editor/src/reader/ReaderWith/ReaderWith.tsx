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
    styleSheetOf,
} from '#/model';
import { type ResolveAssetUrl, decodeToTree, canonicalJson, columnLayout, listDepths } from '#/model/internal';

import { readerContext } from '../helpers/context';
import { readerPlanOf, type ReaderOverrides } from '../helpers/plan';

import { message, renderDocument, type RenderState } from './helpers/render';

/** What the host decides about one reader output: its styles, colours and the resolvers it renders with. */
export type ReaderPresentation = {
    /** Brand style recipes by style ID, which `styleId` names. */
    styles: readonly PresentationStyle[];
    /** The colours a `tokenId` of `font_color` or `highlight` names. */
    colorTokens: readonly ColorToken[];
    /** Turns a stored asset ID into the URL the reader renders. */
    resolveAssetUrl?: ResolveAssetUrl;
    /** Synchronous, so the reader renders on the server in one pass. */
    resolveReference?: (resourceType: string, resourceId: string) => ReferenceResolution;
    /** A class the content root carries beside `fondue-rte-content`, for host rules. */
    contentClassName?: string;
    /** List markers by depth. */
    listLevels?: ListLevels;
    /**
     * Strikethrough and secondary colour on checked task items.
     * @default false
     */
    strikeCheckedTasks?: boolean;
    /** 1 to 6. */
    columns?: number;
    /**
     * `normal`, or a length in `px` or `rem`. With `normal` and a font size on `contentClassName` that differs from the
     * surrounding font, the reader's column thresholds use the surrounding font; a `px` or `rem` gap avoids it.
     */
    columnGap?: string;
};

/** The props of the reader: the document to show, its content model and how to present it. */
export type RichTextReaderProps = {
    /** JSON text or a parsed value; the reader decodes it. */
    document: unknown;
    /** The content model the document was written with. */
    model: ContentModel;
    /** The styles, colours and resolvers to render with. */
    presentation?: ReaderPresentation;
    /** The language of the reader's own messages. */
    locale?: RichTextLocale;
    /**
     * The limits the writing definition used, when a host loosened them through `limitOverrides`.
     * @default the default limits
     */
    limits?: Partial<ResourceLimits>;
    /** Runs once per callback with each problem found while decoding and rendering. */
    onDiagnostic?: (diagnostic: Diagnostic) => void;
};

/** The reader's props with the overrides of the shipped features it renders with. */
export type ReaderProps = RichTextReaderProps & { overrides: ReaderOverrides };

type Output = {
    element: ReactElement;
    diagnostics: readonly Diagnostic[];
    /** The callbacks that already received `diagnostics`, so a rerender reports nothing twice. */
    notified: WeakSet<object>;
};

const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };

/** A list the host passed, or none: plain JavaScript hosts may leave a member out. */
const listOf = <T,>(value: readonly T[] | undefined): readonly T[] => {
    if (value !== undefined && Array.isArray(value)) {
        return value as readonly T[];
    }

    return [];
};

/** Decodes and renders one document, or the message that stands in for a blocked one. */
const build = ({ document, model, presentation, locale = enUS, limits, overrides }: ReaderProps): Output => {
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

    // Without a presentation no style map is given, so no stored style is unknown.
    let unknownStyles: Set<string> | undefined;
    if (presentation !== undefined) {
        unknownStyles = new Set();
    }

    const state: RenderState = {
        plan: readerPlanOf(model, overrides),
        context,
        diagnostics,
        islands: 0,
        carried: 0,
        listLevels: resolvers.listLevels,
        depths: listDepths(),
        strikeCheckedTasks: resolvers.strikeCheckedTasks === true,
        styles: { styles, colorTokens: listOf<ColorToken>(resolvers.colorTokens), inline: false },
        unknownStyles,
        columns: columnLayout(resolvers.columns, resolvers.columnGap),
        breaks: 0,
    };
    const element = renderDocument(state, tree, resolvers.contentClassName, styleSheetOf(styles));

    return { element, diagnostics, notified };
};

type Slot = {
    objects: WeakMap<object, Output>;
    /** The last JSON text rendered, so a host that passes the same text each render decodes once. */
    text?: string;
    output?: Output;
};
type Level = WeakMap<object, Level | Map<string, Slot>>;
const outputs: Level = new WeakMap();
const NONE = {};
const MAX_LIMITS = 16;

/** One output per document, overrides, model, presentation, locale and limits (by value), so a rerender neither decodes nor builds again. */
const outputOf = (props: ReaderProps): Output => {
    const { document, model, presentation, locale, limits, overrides } = props;
    if (typeof document !== 'string' && (typeof document !== 'object' || document === null)) {
        return build(props);
    }

    let level = outputs;
    for (const key of [overrides, model, presentation ?? NONE]) {
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

/** The reader with `overrides` for the features that attach none, which an editor takes from its definition. */
export const ReaderWith = (props: ReaderProps): ReactElement => {
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

ReaderWith.displayName = 'ReaderWith';
