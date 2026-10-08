/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, Fragment, type ReactElement, type ReactNode } from 'react';

import { type Diagnostic, type JsonObject, type JsonValue } from '#/model';
import { isIsland, ISLAND_INLINE, type TreeMark, type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { canonicalJson } from '#/model/hash';
import { type HtmlTemplate, islandText, renderSpaces, resolveHtmlSpec } from '#/model/html-spec';

import { type ReaderContext, type ReaderNodeProps } from './define';
import { type NodePlan, type Plan } from './plan';

export interface RenderState {
    readonly plan: Plan;
    readonly context: ReaderContext;
    readonly diagnostics: Diagnostic[];
    /** Opaque islands met so far; the document gets one notice when this is not zero. */
    islands: number;
}

const VOID_TAGS = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
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
const ATTRIBUTE_NAME = /^[a-zA-Z][\w:.-]*$/;
const EVENT_HANDLER = /^on/i;

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
        if (!ATTRIBUTE_NAME.test(name) || EVENT_HANDLER.test(name)) {
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

/** The attributes a renderer may read: every declared one, and never `unknownAttributes` (SPEC-rich-text-format/AC-027). */
const attrsOf = (attrs: TreeNode['attrs']): JsonObject => {
    const known: Record<string, JsonValue> = {};
    if (attrs === undefined) {
        return known;
    }
    for (const [name, value] of Object.entries(attrs)) {
        if (name !== 'unknownAttributes') {
            known[name] = value as JsonValue;
        }
    }
    return known;
};

/** An opaque island or a failed override: its content in a labelled group, a `span` inside inline content, else a `div`. */
const fallback = (
    state: RenderState,
    tag: 'span' | 'div',
    feature: string | null,
    children: readonly ReactNode[],
): ReactElement => {
    const { t } = state.context;
    let label = t('RichTextEditor_readerIslandGeneric');
    if (feature !== null) {
        label = t('RichTextEditor_readerIslandFeature', { feature });
    }
    return createElement(tag, { role: 'group', 'aria-label': label, 'data-rte-island': '' }, ...children);
};

const textOf = (node: TreeNode): string => {
    if (isIsland(node)) {
        return islandText(node.attrs?.original);
    }
    let text = node.text ?? '';
    for (const child of node.content ?? []) {
        text += textOf(child);
    }
    return text;
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
const callOverride = (override: NonNullable<NodePlan['override']>, props: ReaderNodeProps): ReactNode => {
    const result = (override as unknown as (props: ReaderNodeProps) => ReactNode)(props);
    if (result === undefined) {
        return null;
    }
    return result;
};

interface Item {
    readonly node: TreeNode;
    readonly path: string;
    /** The known marks in rank order, each with its index among the node's marks. */
    readonly marks: readonly { readonly mark: TreeMark; readonly index: number }[];
}
type MarkEntry = Item['marks'][number];

const sameMark = (a: TreeMark, b: TreeMark) =>
    a.type === b.type && canonicalJson(attrsOf(a.attrs)) === canonicalJson(attrsOf(b.attrs));

const renderMark = (
    state: RenderState,
    items: readonly Item[],
    { mark, index }: MarkEntry,
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
            const first = items[0];
            let path = '';
            if (first !== undefined) {
                path = `${first.path}${pointer('marks', index)}`;
            }
            reportFailure(state, plan.featureId, path, mark.type);
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
        return renderSpaces(text);
    }
    if (isIsland(node)) {
        state.islands += 1;
        const feature = node.attrs?.feature;
        let tag: 'span' | 'div' = 'div';
        if (node.type === ISLAND_INLINE) {
            tag = 'span';
        }
        let featureId: string | null = null;
        if (typeof feature === 'string') {
            featureId = feature;
        }
        return fallback(state, tag, featureId, [islandText(node.attrs?.original)]);
    }
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        return null;
    }
    const children = renderChildren(state, node, path, plan.pre);
    const attrs = attrsOf(node.attrs);
    if (plan.override !== undefined) {
        try {
            const props = { attrs, children: createElement(Fragment, null, ...children), context: state.context };
            return callOverride(plan.override, props);
        } catch {
            reportFailure(state, plan.featureId, path, node.type);
            let tag: 'span' | 'div' = 'div';
            if (plan.inline) {
                tag = 'span';
            }
            return fallback(state, tag, plan.featureId, [textOf(node)]);
        }
    }
    return build(resolveHtmlSpec(plan.spec, attrs, plan.options, plan.shared), children);
};

const renderRun = (state: RenderState, items: readonly Item[], depth: number, pre: boolean): ReactNode[] => {
    const out: ReactNode[] = [];
    let index = 0;
    while (index < items.length) {
        const item = items[index];
        if (item === undefined) {
            break;
        }
        const entry = item.marks[depth];
        if (entry === undefined) {
            out.push(renderNode(state, item, pre));
            index += 1;
            continue;
        }
        // Neighbours that share this mark sit inside one element, so a partly bold link renders as one `a`.
        let end = index + 1;
        while (end < items.length) {
            const next = items[end]?.marks[depth];
            if (next === undefined || !sameMark(next.mark, entry.mark)) {
                break;
            }
            end += 1;
        }
        out.push(renderMark(state, items.slice(index, end), entry, depth, pre));
        index = end;
    }
    return out;
};

const renderChildren = (state: RenderState, node: TreeNode, path: string, pre: boolean): ReactNode[] => {
    const items = (node.content ?? []).map((child, index): Item => {
        const marks = (child.marks ?? []).flatMap((mark, markIndex) => {
            if (state.plan.marks.has(mark.type)) {
                return [{ mark, index: markIndex }];
            }
            return [];
        });
        return { node: child, path: `${path}${pointer('content', index)}`, marks };
    });
    return renderRun(state, items, 0, pre);
};

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
