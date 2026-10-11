/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view';

import { type PluginImplementation } from '#/definition';
import { CODE_SYNTAX_PLUGIN } from '#/model/capabilities';

interface HastChild {
    readonly type: string;
    readonly value?: string;
    readonly children?: readonly HastChild[];
    readonly properties?: { readonly className?: readonly string[] | string };
}

interface Highlighter {
    highlight: (language: string, value: string) => { readonly children: readonly HastChild[] };
    registered: (language: string) => boolean;
}

interface TokenRange {
    readonly from: number;
    readonly to: number;
    readonly className: string;
}

const key = new PluginKey<DecorationSet>(CODE_SYNTAX_PLUGIN.id);
const cache = new WeakMap<ProseMirrorNode, readonly TokenRange[]>();
let highlighter: Highlighter | undefined;
let loading: Promise<Highlighter> | undefined;

/** One shared highlighter, loaded the first time a code block names a language. */
const loadHighlighter = (): Promise<Highlighter> => {
    if (highlighter !== undefined) {
        return Promise.resolve(highlighter);
    }
    if (loading === undefined) {
        loading = import('lowlight').then(({ common, createLowlight }) => {
            const created = createLowlight(common);
            highlighter = created;
            return created;
        });
    }
    return loading;
};

const classNameOf = (properties: HastChild['properties']): string | undefined => {
    const value = properties?.className;
    if (typeof value === 'string') {
        return value === '' ? undefined : value;
    }
    if (value === undefined) {
        return undefined;
    }
    const names = value.filter((name) => name !== '');
    if (names.length === 0) {
        return undefined;
    }
    return names.join(' ');
};

/** Text nodes advance the offset. An element with classes decorates its whole text, and so do nested elements. */
const walk = (nodes: readonly HastChild[], offset: number, ranges: TokenRange[]): number => {
    let at = offset;
    for (const node of nodes) {
        if (node.type === 'text') {
            at += node.value?.length ?? 0;
            continue;
        }
        if (node.type !== 'element') {
            continue;
        }
        const start = at;
        at = walk(node.children ?? [], at, ranges);
        const className = classNameOf(node.properties);
        if (className !== undefined && at > start) {
            ranges.push({ from: start, to: at, className });
        }
    }
    return at;
};

const tokensOf = (node: ProseMirrorNode, hl: Highlighter): readonly TokenRange[] => {
    const cached = cache.get(node);
    if (cached !== undefined) {
        return cached;
    }
    const { languageId } = node.attrs;
    const ranges: TokenRange[] = [];
    if (typeof languageId === 'string' && hl.registered(languageId)) {
        walk(hl.highlight(languageId, node.textContent).children, 0, ranges);
    }
    const kept = ranges.filter((range) => range.from < range.to && range.to <= node.content.size);
    cache.set(node, kept);
    return kept;
};

const decorate = (doc: ProseMirrorNode): DecorationSet => {
    const hl = highlighter;
    if (hl === undefined) {
        return DecorationSet.empty;
    }
    const found: Decoration[] = [];
    doc.descendants((node, pos) => {
        if (!node.isTextblock || node.type.spec.code !== true) {
            return;
        }
        const start = pos + 1;
        for (const range of tokensOf(node, hl)) {
            found.push(Decoration.inline(start + range.from, start + range.to, { class: range.className }));
        }
        return false;
    });
    if (found.length === 0) {
        return DecorationSet.empty;
    }
    return DecorationSet.create(doc, found);
};

const needsLoad = (doc: ProseMirrorNode): boolean => {
    let named = false;
    doc.descendants((node) => {
        named ||= node.type.spec.code === true && typeof node.attrs.languageId === 'string';
        return !named;
    });
    return named;
};

/** Decorations for `spec.code` textblocks whose `languageId` lowlight has registered. An unknown id stays plain. */
export const codeSyntaxPlugin: PluginImplementation = () =>
    new Plugin<DecorationSet>({
        key,
        state: {
            init: (_config, state) => decorate(state.doc),
            apply: (transaction, decorations, _old, state) => {
                if (!transaction.docChanged && transaction.getMeta(key) !== 'loaded') {
                    return decorations.map(transaction.mapping, transaction.doc);
                }
                return decorate(state.doc);
            },
        },
        props: {
            decorations: (state) => key.getState(state) ?? DecorationSet.empty,
        },
        view: (editorView) => {
            let current: EditorView | undefined = editorView;
            let pending = false;
            const start = () => {
                const view = current;
                if (view === undefined || highlighter !== undefined || pending || !needsLoad(view.state.doc)) {
                    return;
                }
                pending = true;
                loadHighlighter()
                    .then(() => {
                        pending = false;
                        const live = current;
                        if (live !== undefined) {
                            live.dispatch(live.state.tr.setMeta(key, 'loaded').setMeta('addToHistory', false));
                        }
                        return undefined;
                    })
                    .catch(() => {
                        pending = false;
                        return undefined;
                    });
            };
            start();
            return {
                update: (next) => {
                    current = next;
                    start();
                },
                destroy: () => {
                    current = undefined;
                },
            };
        },
    });
