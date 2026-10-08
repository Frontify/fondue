/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type Diagnostic, type HtmlSpec } from '#/model';
import { isIsland, ISLAND_INLINE, type TreeMark, type TreeNode } from '#/model/content';
import { type HtmlTemplate, islandText, renderSpaces, resolveHtmlSpec } from '#/model/html-spec';
import { isStyleAttribute } from '#/model/values';

import { attrsOf, type CodecPlan, Losses, type NodePlan, setShared } from './plan';
import { groupRun, type Item, itemsOf, textOf } from './walk';

interface HtmlState {
    readonly plan: CodecPlan;
    readonly context: CodecContext;
    readonly diagnostics: Diagnostic[];
    /** Uses of features whose `html` support is `lossy`. */
    readonly lossy: Losses;
    islands: number;
    /** The spaces that end the text written last in this block, so a run of spaces alternates across text nodes. */
    carried: number;
}

const VOID_TAGS = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
const ATTRIBUTE_NAME = /^[a-zA-Z][\w:.-]*$/;
const EVENT_HANDLER = /^on/i;
const ESCAPES: Readonly<Record<string, string>> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
};

/** Escapes text and attribute values as React's server renderer does, so the output equals the reader's markup. */
export const escapeHtml = (text: string): string => text.replaceAll(/[&<>"']/g, (char) => ESCAPES[char] ?? char);

/** The `style` text a spec writes, serialized as React serializes the reader's style object. */
const styleText = (text: string): string => {
    const style = new Map<string, string>();
    for (const declaration of text.split(';')) {
        const colon = declaration.indexOf(':');
        if (colon > 0) {
            const name = declaration.slice(0, colon).trim();
            let property = name;
            if (!name.startsWith('--')) {
                property = name
                    .replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
                    .replaceAll(/([A-Z])/g, '-$1')
                    .toLowerCase();
            }
            const value = declaration.slice(colon + 1).trim();
            style.delete(property);
            if (value !== '') {
                style.set(property, value);
            }
        }
    }
    return [...style].map(([property, value]) => `${property}:${value}`).join(';');
};

const attributes = (attrs: Readonly<Record<string, string>>): string => {
    let written = '';
    for (const [name, value] of Object.entries(attrs)) {
        // A name that would run as an event handler is never written.
        if (!ATTRIBUTE_NAME.test(name) || EVENT_HANDLER.test(name)) {
            continue;
        }
        let text = value;
        if (isStyleAttribute(name)) {
            text = styleText(value);
            if (text === '') {
                continue;
            }
        }
        written += ` ${name}="${escapeHtml(text)}"`;
    }
    return written;
};

/** The elements of a resolved spec around `inner`; a leaf spec, or a void element, drops it. */
const build = (template: HtmlTemplate, inner: string): string => {
    let html = '';
    if (template.content) {
        html = inner;
    }
    for (const layer of [...template.layers].reverse()) {
        if (VOID_TAGS.has(layer.tag)) {
            html = `<${layer.tag}${attributes(layer.attrs)}/>`;
        } else {
            html = `<${layer.tag}${attributes(layer.attrs)}>${html}</${layer.tag}>`;
        }
    }
    return html;
};

/** An override's spec may not bind a stored value to `style`, as compilation checks for declared specs (SPEC-rich-text-format/AC-027). */
const checkOverrideSpec = (spec: HtmlSpec): void => {
    const [, second, third] = spec;
    let content: unknown = second;
    if (typeof second === 'object' && !Array.isArray(second)) {
        content = third;
        for (const [name, value] of Object.entries(second)) {
            if (isStyleAttribute(name) && typeof value !== 'string') {
                throw new TypeError(`a codec override binds ${name}`);
            }
        }
    }
    if (Array.isArray(content)) {
        checkOverrideSpec(content as unknown as HtmlSpec);
    }
};

const fallback = (state: HtmlState, tag: 'span' | 'div', feature: string | null, inner: string): string => {
    const { t } = state.context;
    let label = t('RichTextEditor_readerIslandGeneric');
    if (feature !== null) {
        label = t('RichTextEditor_readerIslandFeature', { feature });
    }
    return `<${tag} role="group" aria-label="${escapeHtml(label)}" data-rte-island="">${inner}</${tag}>`;
};

const spaced = (state: HtmlState, text: string): string => {
    const carried = state.carried;
    let trailing = 0;
    while (trailing < text.length && text[text.length - 1 - trailing] === ' ') {
        trailing += 1;
    }
    if (trailing === text.length) {
        state.carried = carried + trailing;
    } else {
        state.carried = trailing;
    }
    return renderSpaces(text, carried);
};

const renderMark = (state: HtmlState, items: readonly Item[], mark: TreeMark, depth: number, pre: boolean): string => {
    const inner = renderRun(state, items, depth + 1, pre);
    const plan = state.plan.marks.get(mark.type);
    if (plan === undefined) {
        return inner;
    }
    return build(resolveHtmlSpec(plan.spec, attrsOf(mark.attrs), plan.options), inner);
};

const overrideFailed = (state: HtmlState, node: TreeNode, plan: NodePlan, path: string, before: number): string => {
    state.diagnostics.push({
        code: 'codecs.override-failed',
        severity: 'error',
        messageKey: 'codecs.override-failed',
        path,
        featureId: plan.featureId,
        details: { name: node.type, format: 'html' },
    });
    let text = textOf(node);
    if (plan.inline) {
        // The children already moved the run, so it restarts from where this node began.
        state.carried = before;
        if (!plan.pre) {
            text = spaced(state, text);
        }
        return fallback(state, 'span', plan.featureId, escapeHtml(text));
    }
    state.carried = 0;
    if (!plan.pre) {
        text = renderSpaces(text);
    }
    return fallback(state, 'div', plan.featureId, escapeHtml(text));
};

const renderNode = (state: HtmlState, { node, path }: Item, pre: boolean): string => {
    if (node.type === 'text') {
        const text = node.text ?? '';
        if (pre) {
            return escapeHtml(text);
        }
        return escapeHtml(spaced(state, text));
    }
    if (isIsland(node)) {
        state.islands += 1;
        const feature = node.attrs?.feature;
        let featureId: string | null = null;
        if (typeof feature === 'string') {
            featureId = feature;
        }
        const original = islandText(node.attrs?.original);
        if (node.type === ISLAND_INLINE) {
            return fallback(state, 'span', featureId, escapeHtml(spaced(state, original)));
        }
        state.carried = 0;
        return fallback(state, 'div', featureId, escapeHtml(renderSpaces(original)));
    }
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        state.carried = 0;
        return '';
    }
    if (plan.formats.html === 'lossy') {
        state.lossy.add(plan.featureId);
    }
    for (const shared of setShared(plan, node)) {
        if (state.plan.formats.get(shared.featureId)?.html === 'lossy') {
            state.lossy.add(shared.featureId);
        }
    }
    const before = state.carried;
    const inner = renderChildren(state, node, path, plan.pre);
    const attrs = attrsOf(node.attrs);
    let template: HtmlTemplate;
    if (plan.html === undefined) {
        template = resolveHtmlSpec(plan.spec, attrs, plan.options, plan.shared);
    } else {
        try {
            const spec = plan.html(attrs, state.context);
            checkOverrideSpec(spec);
            template = resolveHtmlSpec(spec, attrs, plan.options, plan.shared);
        } catch {
            return overrideFailed(state, node, plan, path, before);
        }
    }
    state.carried = 0;
    return build(template, inner);
};

const renderRun = (state: HtmlState, items: readonly Item[], depth: number, pre: boolean): string =>
    groupRun(
        items,
        depth,
        (item) => renderNode(state, item, pre),
        // Neighbours that share this mark sit inside one element, so a partly bold link renders as one `a`.
        (group, { mark }) => renderMark(state, group, mark, depth, pre),
    ).join('');

const renderChildren = (state: HtmlState, node: TreeNode, path: string, pre: boolean): string => {
    const keep = (mark: TreeMark) => {
        const plan = state.plan.marks.get(mark.type);
        if (plan === undefined) {
            return false;
        }
        if (plan.formats.html === 'lossy') {
            state.lossy.add(plan.featureId);
        }
        return true;
    };
    const items = itemsOf(node, path, keep);
    return renderRun(state, items, 0, pre);
};

/** An empty document (glossary): exactly one textblock with no content. */
export const isEmptyDocument = (plan: CodecPlan, root: TreeNode): boolean => {
    const blocks = root.content ?? [];
    const only = blocks[0];
    if (blocks.length !== 1 || only === undefined || (only.content ?? []).length > 0) {
        return false;
    }
    const node = plan.nodes.get(only.type);
    return node !== undefined && !node.leaf;
};

/** The reader's static markup as text: the `doc` node as one `div` with its `lang` and `dir`, its blocks, then the island notice. */
export const writeHtml = (
    plan: CodecPlan,
    root: TreeNode,
    context: CodecContext,
): { readonly html: string; readonly diagnostics: readonly Diagnostic[] } => {
    const state: HtmlState = { plan, context, diagnostics: [], lossy: new Losses(), islands: 0, carried: 0 };
    if (isEmptyDocument(plan, root)) {
        return { html: '', diagnostics: [] };
    }
    let html = renderChildren(state, root, '/content', false);
    let props = '';
    const lang = root.attrs?.lang;
    const dir = root.attrs?.dir;
    if (typeof lang === 'string') {
        props += ` lang="${escapeHtml(lang)}"`;
    }
    if (dir === 'ltr' || dir === 'rtl') {
        props += ` dir="${dir}"`;
    }
    if (state.islands > 0) {
        let langAttribute = '';
        if (context.locale.lang !== undefined) {
            langAttribute = ` lang="${escapeHtml(context.locale.lang)}"`;
        }
        html += `<div role="note" data-rte-message="islands"${langAttribute}>${escapeHtml(context.t('RichTextEditor_readerIslandNotice'))}</div>`;
    }
    const lossy = state.lossy.list().map(
        ({ featureId, count }): Diagnostic => ({
            code: 'codecs.lossy-output',
            severity: 'info',
            messageKey: 'codecs.lossy-output',
            featureId,
            details: { count },
        }),
    );
    return { html: `<div${props}>${html}</div>`, diagnostics: [...state.diagnostics, ...lossy] };
};
