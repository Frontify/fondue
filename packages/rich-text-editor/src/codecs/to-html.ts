/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type Diagnostic, type HtmlSpec } from '#/model';
import { isIsland, type TreeMark, type TreeNode } from '#/model/content';
import { type HtmlTemplate, resolveHtmlSpec } from '#/model/html-spec';
import {
    attrsOf,
    contentClasses,
    failedFallback,
    groupRun,
    islandFallback,
    islandLabel,
    type Item,
    itemsOf,
    spaced,
    type Spacing,
    VOID_TAGS,
    writesAttribute,
} from '#/model/output';
import { isStyleAttribute } from '#/model/values';

import { type CodecPlan, Losses } from './plan';
import { keepMark, noteNode, reportFailure } from './walk';

interface HtmlState extends Spacing {
    readonly plan: CodecPlan;
    readonly context: CodecContext;
    readonly diagnostics: Diagnostic[];
    /** Uses of features whose `html` support is `lossy`. */
    readonly losses: Losses;
}

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
        if (!writesAttribute(name)) {
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

// Elements that run script, load a document or resource, or post data; an override may write none of them.
const UNSAFE_TAGS = new Set('script style iframe object embed template meta link base form'.split(' '));
const TAG_NAME = /^[a-z][a-z0-9-]*$/;

/** An override's elements must be plain HTML names outside `UNSAFE_TAGS`, which declared specs never reach unchecked. */
const checkOverrideTags = (template: HtmlTemplate): void => {
    for (const { tag } of template.layers) {
        if (!TAG_NAME.test(tag) || UNSAFE_TAGS.has(tag)) {
            throw new TypeError(`a codec override writes ${tag}`);
        }
    }
};

const fallback = (state: HtmlState, tag: 'span' | 'div', feature: string | null, inner: string): string => {
    const label = islandLabel(state.context, feature);
    return `<${tag} role="group" aria-label="${escapeHtml(label)}" data-rte-island="">${inner}</${tag}>`;
};

const renderMark = (state: HtmlState, items: readonly Item[], mark: TreeMark, depth: number, pre: boolean): string => {
    const inner = renderRun(state, items, depth + 1, pre);
    const plan = state.plan.marks.get(mark.type);
    if (plan === undefined) {
        return inner;
    }
    return build(resolveHtmlSpec(plan.spec, attrsOf(mark.attrs), plan.options), inner);
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
        const { tag, featureId, text } = islandFallback(state, node);
        return fallback(state, tag, featureId, escapeHtml(text));
    }
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        state.carried = 0;
        return '';
    }
    noteNode(state, node, 'html');
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
            checkOverrideTags(template);
        } catch {
            reportFailure(state, plan.featureId, path, node.type, 'html');
            const { tag, text } = failedFallback(state, node, plan, before);
            return fallback(state, tag, plan.featureId, escapeHtml(text));
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

const renderChildren = (state: HtmlState, node: TreeNode, path: string, pre: boolean): string =>
    renderRun(state, itemsOf(node, path, keepMark(state, 'html')), 0, pre);

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

/** The reader's static markup as text: the `doc` node as one `div` with the content classes, its `lang` and `dir`, its blocks, then the island notice. */
export const writeHtml = (
    plan: CodecPlan,
    root: TreeNode,
    context: CodecContext,
    contentClassName?: string,
): { readonly html: string; readonly diagnostics: readonly Diagnostic[] } => {
    const state: HtmlState = { plan, context, diagnostics: [], losses: new Losses(), islands: 0, carried: 0 };
    if (isEmptyDocument(plan, root)) {
        return { html: '', diagnostics: [] };
    }
    let html = renderChildren(state, root, '/content', false);
    let props = ` class="${escapeHtml(contentClasses(contentClassName))}"`;
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
    const lossy = state.losses.list().map(
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
