/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey, type Transaction } from 'prosemirror-state';
import { AttrStep, StepMap } from 'prosemirror-transform';
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view';

import { type PluginImplementation } from '#/definition';
import { BLOCK_DECORATIONS_PLUGIN } from '#/model/capabilities';
import { type BlockDecoration, type BlockDecorationSource, type JsonObject } from '#/model/declarations';
import { OBJECT_REPLACEMENT, snapshot } from '#/model/values';

const key = new PluginKey<DecorationSet>(BLOCK_DECORATIONS_PLUGIN.id);
const REFRESH = 'refresh';

/** The stretches of the final document that `transaction`'s steps wrote, and the node an attribute step set. */
const touchedRanges = (transaction: Transaction): { readonly from: number; readonly to: number }[] => {
    const { mapping } = transaction;
    const ranges: { readonly from: number; readonly to: number }[] = [];
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
    }
    return ranges;
};

/** The decorations of every block decoration source, which derives a block again only once a change replaced it. */
export const blockDecorationsPlugin: PluginImplementation = ({ decorations: sources }) => {
    const names = new Set(sources.flatMap((source) => source.nodes));
    // Keyed by node, which a change replaces only for the blocks it touched.
    const derived = new Map(
        sources.map((source) => [source, new WeakMap<ProseMirrorNode, readonly BlockDecoration[]>()]),
    );
    // Every editor of one definition shares this plugin, so a settled promise redraws each of them.
    const views = new Set<EditorView>();
    let scheduled = false;
    const redraw = () => {
        if (scheduled) {
            return;
        }
        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            for (const view of [...views]) {
                view.dispatch(view.state.tr.setMeta(key, REFRESH).setMeta('addToHistory', false));
            }
        });
    };

    const rangesOf = (source: BlockDecorationSource, node: ProseMirrorNode): readonly BlockDecoration[] => {
        const cache = derived.get(source);
        const known = cache?.get(node);
        if (known !== undefined) {
            return known;
        }
        let nodeId: string | null = null;
        if (typeof node.attrs.nodeId === 'string') {
            nodeId = node.attrs.nodeId;
        }
        const text = node.textBetween(0, node.content.size, undefined, OBJECT_REPLACEMENT);
        const result = source.derive({ nodeId, attrs: snapshot(node.attrs) as JsonObject, text });
        if (!('then' in result)) {
            cache?.set(node, result);
            return result;
        }
        cache?.set(node, []);
        result
            .then((ranges) => {
                cache?.set(node, ranges);
                redraw();
                return undefined;
            })
            .catch(() => undefined);
        return [];
    };

    const decorationsOf = (node: ProseMirrorNode, pos: number): Decoration[] => {
        const found: Decoration[] = [];
        const size = node.content.size;
        for (const source of sources) {
            if (!source.nodes.includes(node.type.name)) {
                continue;
            }
            for (const { from, to, className, attributes } of rangesOf(source, node)) {
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

    const build = (doc: ProseMirrorNode): DecorationSet => {
        const found: Decoration[] = [];
        doc.descendants((node, pos) => {
            if (!node.isTextblock) {
                return true;
            }
            if (names.has(node.type.name)) {
                found.push(...decorationsOf(node, pos));
            }
            return false;
        });
        if (found.length === 0) {
            return DecorationSet.empty;
        }
        return DecorationSet.create(doc, found);
    };

    return new Plugin<DecorationSet>({
        key,
        state: {
            init: (_config, state) => build(state.doc),
            apply: (transaction, decorations) => {
                if (transaction.getMeta(key) === REFRESH) {
                    return build(transaction.doc);
                }
                if (!transaction.docChanged) {
                    return decorations;
                }
                const { doc, mapping } = transaction;
                const touched: { readonly node: ProseMirrorNode; readonly pos: number }[] = [];
                const redone = new Set<number>();
                for (const { from, to } of touchedRanges(transaction)) {
                    doc.nodesBetween(from, to, (node, pos) => {
                        if (!node.isTextblock) {
                            return true;
                        }
                        if (names.has(node.type.name) && !redone.has(pos)) {
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
                    added.push(...decorationsOf(node, pos));
                }
                return decorations.map(clearing, doc).add(doc, added);
            },
        },
        props: {
            decorations: (state) => key.getState(state) ?? DecorationSet.empty,
        },
        view: (editorView) => {
            views.add(editorView);
            return {
                destroy: () => {
                    views.delete(editorView);
                },
            };
        },
    });
};
