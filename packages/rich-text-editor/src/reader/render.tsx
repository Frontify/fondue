/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, createElement, Fragment, type ReactElement, type ReactNode } from 'react';

import { type Diagnostic } from '#/model';
import { isIsland, type TreeNode } from '#/model/content';
import { type HtmlTemplate, resolveHtmlSpec } from '#/model/html-spec';
import {
    attrsOf,
    failedFallback,
    groupRun,
    islandFallback,
    islandLabel,
    type Item,
    itemsOf,
    markPath,
    spaced,
    type Spacing,
    VOID_TAGS,
    writesAttribute,
} from '#/model/output';

import { type ReaderContext, type ReaderNodeProps } from './define';
import { type Plan } from './plan';

/** The document gets one island notice when `islands` is not zero. */
export interface RenderState extends Spacing {
    readonly plan: Plan;
    readonly context: ReaderContext;
    readonly diagnostics: Diagnostic[];
}

// Every HTML attribute whose React prop is not its lowercase name; the rest pass through unchanged.
const PROP_NAMES: Readonly<Record<string, string>> = {
    class: 'className',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    srcset: 'srcSet',
    datetime: 'dateTime',
    tabindex: 'tabIndex',
    hreflang: 'hrefLang',
    usemap: 'useMap',
    crossorigin: 'crossOrigin',
    referrerpolicy: 'referrerPolicy',
};
/** React takes a style object, so the `style` text a spec writes becomes one: `text-align: right;` to `{ textAlign }`. */
const styleOf = (text: string): Readonly<Record<string, string>> => {
    const style: Record<string, string> = {};
    for (const declaration of text.split(';')) {
        const colon = declaration.indexOf(':');
        if (colon > 0) {
            const name = declaration.slice(0, colon).trim();
            let property = name;
            if (!name.startsWith('--')) {
                property = name.replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
            }
            style[property] = declaration.slice(colon + 1).trim();
        }
    }
    return style;
};

const propsOf = (attrs: Readonly<Record<string, string>>): Record<string, unknown> => {
    const props: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(attrs)) {
        // A name that React would read as an event handler never becomes a prop.
        if (!writesAttribute(name)) {
            continue;
        }
        if (name.toLowerCase() === 'style') {
            props.style = styleOf(value);
        } else if (Object.hasOwn(PROP_NAMES, name)) {
            props[PROP_NAMES[name] ?? name] = value;
        } else {
            props[name] = value;
        }
    }
    return props;
};

/** The elements of a resolved spec around `children`; a leaf spec, or a void element, drops them. */
const build = (template: HtmlTemplate, children: readonly ReactNode[]): ReactNode => {
    let content: readonly ReactNode[] = [];
    if (template.content) {
        content = children;
    }
    let element: ReactNode = null;
    for (let index = template.layers.length - 1; index >= 0; index -= 1) {
        const layer = template.layers[index];
        if (layer === undefined) {
            continue;
        }
        let inside = content;
        if (VOID_TAGS.has(layer.tag)) {
            inside = [];
        }
        element = createElement(layer.tag, propsOf(layer.attrs), ...inside);
        content = [element];
    }
    return element;
};

/** An opaque island or a failed override: its content in a labelled group, a `span` inside inline content, else a `div`. */
const fallback = (
    state: RenderState,
    tag: 'span' | 'div',
    feature: string | null,
    children: readonly ReactNode[],
): ReactElement => {
    const label = islandLabel(state.context, feature);
    return createElement(tag, { role: 'group', 'aria-label': label, 'data-rte-island': '' }, ...children);
};

const reportFailure = (state: RenderState, featureId: string, path: string, name: string): void => {
    state.diagnostics.push({
        code: 'reader.override-failed',
        severity: 'error',
        messageKey: 'reader.override-failed',
        path,
        featureId,
        details: { name },
    });
};

/** Called as a plain function so a throw is caught here; the rest of the output is host elements, which cannot throw. */
const callOverride = (override: ComponentType<ReaderNodeProps>, props: ReaderNodeProps): ReactNode => {
    const result = (override as unknown as (props: ReaderNodeProps) => ReactNode)(props);
    if (result === undefined) {
        return null;
    }
    return result;
};

const renderMark = (
    state: RenderState,
    items: readonly Item[],
    { mark, index }: Item['marks'][number],
    depth: number,
    pre: boolean,
): ReactNode => {
    const plan = state.plan.marks.get(mark.type);
    const children = renderRun(state, items, depth + 1, pre);
    if (plan === undefined) {
        return createElement(Fragment, null, ...children);
    }
    const attrs = attrsOf(mark.attrs);
    if (plan.override !== undefined) {
        try {
            const props = { attrs, children: createElement(Fragment, null, ...children), context: state.context };
            return callOverride(plan.override, props);
        } catch {
            reportFailure(state, plan.featureId, markPath(items, index), mark.type);
            return fallback(state, 'span', plan.featureId, children);
        }
    }
    return build(resolveHtmlSpec(plan.spec, attrs, plan.options), children);
};

const renderNode = (state: RenderState, { node, path }: Item, pre: boolean): ReactNode => {
    if (node.type === 'text') {
        const text = node.text ?? '';
        if (pre) {
            return text;
        }
        return spaced(state, text);
    }
    if (isIsland(node)) {
        const { tag, featureId, text } = islandFallback(state, node);
        return fallback(state, tag, featureId, [text]);
    }
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        state.carried = 0;
        return null;
    }
    const before = state.carried;
    const children = renderChildren(state, node, path, plan.pre);
    const attrs = attrsOf(node.attrs);
    if (plan.override !== undefined) {
        try {
            const props = { attrs, children: createElement(Fragment, null, ...children), context: state.context };
            const rendered = callOverride(plan.override, props);
            state.carried = 0;
            return rendered;
        } catch {
            reportFailure(state, plan.featureId, path, node.type);
            const { tag, text } = failedFallback(state, node, plan, before);
            return fallback(state, tag, plan.featureId, [text]);
        }
    }
    state.carried = 0;
    return build(resolveHtmlSpec(plan.spec, attrs, plan.options, plan.shared), children);
};

const renderRun = (state: RenderState, items: readonly Item[], depth: number, pre: boolean): ReactNode[] =>
    groupRun(
        items,
        depth,
        (item) => renderNode(state, item, pre),
        // Neighbours that share this mark sit inside one element, so a partly bold link renders as one `a`.
        (group, entry) => renderMark(state, group, entry, depth, pre),
    );

const renderChildren = (state: RenderState, node: TreeNode, path: string, pre: boolean): ReactNode[] =>
    renderRun(
        state,
        itemsOf(node, path, (mark) => state.plan.marks.has(mark.type)),
        0,
        pre,
    );

const MESSAGE_KEYS = {
    islands: 'RichTextEditor_readerIslandNotice',
    unsupported: 'RichTextEditor_readerBlockedUnsupported',
    invalid: 'RichTextEditor_readerBlockedInvalid',
} as const;

/** A localized message, in the locale's own language since the document's `lang` does not apply to it. */
export const message = ({ locale, t }: ReaderContext, kind: keyof typeof MESSAGE_KEYS): ReactElement => {
    const props: Record<string, unknown> = { role: 'note', 'data-rte-message': kind };
    if (locale.lang !== undefined) {
        props.lang = locale.lang;
    }
    return createElement('div', props, t(MESSAGE_KEYS[kind]));
};

/** The reader root: the `doc` node as one `div` that carries its `lang` and `dir`, its blocks, then the island notice. */
export const renderDocument = (state: RenderState, root: TreeNode): ReactElement => {
    const children = renderChildren(state, root, '/content', false);
    const props: Record<string, unknown> = {};
    const lang = root.attrs?.lang;
    const dir = root.attrs?.dir;
    if (typeof lang === 'string') {
        props.lang = lang;
    }
    if (dir === 'ltr' || dir === 'rtl') {
        props.dir = dir;
    }
    if (state.islands > 0) {
        children.push(message(state.context, 'islands'));
    }
    return createElement('div', props, ...children);
};
