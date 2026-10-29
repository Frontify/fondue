/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { type PluginKey, type Transaction } from 'prosemirror-state';
import { AttrStep, StepMap } from 'prosemirror-transform';
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view';

import { type BlockDecoration, type Diagnostic } from '#/model';
import { type BlockDecorationSource, OBJECT_REPLACEMENT } from '#/model/internal';
import { NodeIdsStep } from '#/runtime/definition';

import { valuesOf } from '../api/shared';
import { pluginError } from '../reporting/events';

const REFRESH = 'refresh';

/**
 * The block-decoration sources of one definition, the blocks they have derived, and the editors that show them.
 */
type DecorationContext = {
    sources: readonly BlockDecorationSource[];
    names: Set<string>;
    // Keyed by node, which a change replaces only for the blocks it touched.
    derived: Map<BlockDecorationSource, WeakMap<ProseMirrorNode, readonly BlockDecoration[]>>;
    views: Set<EditorView>;
    scheduled: boolean;
    key: PluginKey<DecorationSet>;
    report: (found: Diagnostic) => void;
};

/** The sources of one definition, sharing the plugin key every editor of that definition uses. */
export const createDecorationContext = (
    sources: readonly BlockDecorationSource[],
    key: PluginKey<DecorationSet>,
    report: (found: Diagnostic) => void,
): DecorationContext => ({
    sources,
    names: new Set(sources.flatMap((source) => source.nodes)),
    derived: new Map(sources.map((source) => [source, new WeakMap<ProseMirrorNode, readonly BlockDecoration[]>()])),
    views: new Set(),
    scheduled: false,
    key,
    report,
});

/** The stretches of the final document that `transaction`'s steps wrote, and the node an attribute step set. */
const touchedRanges = (transaction: Transaction): { from: number; to: number }[] => {
    const { mapping } = transaction;
    const ranges: { from: number; to: number }[] = [];
    for (const [index, map] of mapping.maps.entries()) {
        const rest = mapping.slice(index + 1);
        // oxlint-disable-next-line unicorn/no-array-for-each -- a step map gives its ranges only through `forEach`.
        map.forEach((_oldStart, _oldEnd, start, end) => {
            ranges.push({ from: rest.map(start, -1), to: rest.map(end, 1) });
        });
        // An attribute step maps no range, yet the attribute may change what a source derives.
        const step = transaction.steps[index];
        if (step instanceof AttrStep) {
            ranges.push({ from: rest.map(step.pos, -1), to: rest.map(step.pos + 1, 1) });
        }

        if (step instanceof NodeIdsStep) {
            for (const [pos] of step.ids) {
                ranges.push({ from: rest.map(pos, -1), to: rest.map(pos + 1, 1) });
            }
        }
    }

    return ranges;
};

// Every editor of one definition shares this plugin, so a settled promise redraws each of them.
const scheduleRedraw = (context: DecorationContext) => {
    if (context.scheduled) {
        return;
    }

    context.scheduled = true;
    queueMicrotask(() => {
        context.scheduled = false;
        for (const view of [...context.views]) {
            view.dispatch(view.state.tr.setMeta(context.key, REFRESH).setMeta('addToHistory', false));
        }
    });
};

const rangesOf = (context: DecorationContext, source: BlockDecorationSource, node: ProseMirrorNode) => {
    const cache = context.derived.get(source);
    const known = cache?.get(node);
    if (known !== undefined) {
        return known;
    }

    let nodeId: string | null = null;
    if (typeof node.attrs.nodeId === 'string') {
        nodeId = node.attrs.nodeId;
    }

    const text = node.textBetween(0, node.content.size, undefined, OBJECT_REPLACEMENT);
    const result = source.derive({ nodeId, attrs: valuesOf(node.attrs), text });
    if (!('then' in result)) {
        cache?.set(node, result);

        return result;
    }

    cache?.set(node, []);
    result
        .then((ranges) => {
            cache?.set(node, ranges);
            scheduleRedraw(context);

            return undefined;
        })
        .catch((error: unknown) => {
            context.report(pluginError(error, undefined));

            return undefined;
        });

    return [];
};

const decorationsOf = (context: DecorationContext, node: ProseMirrorNode, pos: number): Decoration[] => {
    const found: Decoration[] = [];
    const size = node.content.size;
    for (const source of context.sources) {
        if (!source.nodes.includes(node.type.name)) {
            continue;
        }

        for (const { from, to, className, attributes } of rangesOf(context, source, node)) {
            if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to > size || from >= to) {
                continue;
            }

            const attrs: Record<string, string> = { ...attributes };
            if (className !== undefined) {
                attrs.class = className;
            }

            found.push(Decoration.inline(pos + 1 + from, pos + 1 + to, attrs));
        }
    }

    return found;
};

/** The inline decorations of every text block a source names. */
export const buildBlockDecorations = (context: DecorationContext, doc: ProseMirrorNode): DecorationSet => {
    const found: Decoration[] = [];
    doc.descendants((node, pos) => {
        if (!node.isTextblock) {
            return true;
        }

        if (context.names.has(node.type.name)) {
            found.push(...decorationsOf(context, node, pos));
        }

        return false;
    });
    if (found.length === 0) {
        return DecorationSet.empty;
    }

    return DecorationSet.create(doc, found);
};

/** Maps a transaction onto the decoration set, deriving again only the blocks it replaced. */
export const applyBlockDecorations = (
    context: DecorationContext,
    transaction: Transaction,
    decorations: DecorationSet,
): DecorationSet => {
    if (transaction.getMeta(context.key) === REFRESH) {
        return buildBlockDecorations(context, transaction.doc);
    }

    if (!transaction.docChanged) {
        return decorations;
    }

    const { doc, mapping } = transaction;
    const touched: { node: ProseMirrorNode; pos: number }[] = [];
    const redone = new Set<number>();
    for (const { from, to } of touchedRanges(transaction)) {
        doc.nodesBetween(from, to, (node, pos) => {
            if (!node.isTextblock) {
                return true;
            }

            if (context.names.has(node.type.name) && !redone.has(pos)) {
                redone.add(pos);
                touched.push({ node, pos });
            }

            return false;
        });
    }

    // Deleting and reinserting a touched block's text empties its decorations, which `remove` would cost quadratically.
    const clearing = mapping.slice(0);
    const added: Decoration[] = [];
    for (const { node, pos } of touched) {
        clearing.appendMap(new StepMap([pos + 1, node.content.size, 0]));
        clearing.appendMap(new StepMap([pos + 1, 0, node.content.size]));
        added.push(...decorationsOf(context, node, pos));
    }

    return decorations.map(clearing, doc).add(doc, added);
};

/** Registers `editorView` so a settled decoration redraws it, and drops it when the view closes. */
export const trackDecorationView = (context: DecorationContext, editorView: EditorView) => {
    context.views.add(editorView);

    return {
        destroy: () => {
            context.views.delete(editorView);
        },
    };
};
