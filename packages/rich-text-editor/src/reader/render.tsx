/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    cloneElement,
    type ComponentType,
    createElement,
    Fragment,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from 'react';

import { checkHref, type Diagnostic, type JsonObject, type ListLevels } from '#/model';
import { isIsland, type TreeNode } from '#/model/content';
import { type HtmlTemplate, passageDirection, resolveHtmlSpec, treeRuns, withAutoDirection } from '#/model/html-spec';
import {
    attrsOf,
    COLUMN_BREAK,
    type ColumnLayout,
    contentClasses,
    failedFallback,
    groupRun,
    islandFallback,
    islandLabel,
    type Item,
    itemsOf,
    type ListDepths,
    markPath,
    type OutputStyles,
    spaced,
    type Spacing,
    styleOfNode,
    unknownStyle,
    VOID_TAGS,
    withActiveBreak,
    withColor,
    withListLevel,
    withStyle,
    withStyleId,
    writesAttribute,
} from '#/model/output';
import { isRecord } from '#/model/values';

import { type ReaderContext, type ReaderNodeProps } from './define';
import { type Plan } from './plan';

/** The document gets one island notice when `islands` is not zero. */
export interface RenderState extends Spacing {
    readonly plan: Plan;
    readonly context: ReaderContext;
    readonly diagnostics: Diagnostic[];
    readonly listLevels: ListLevels | undefined;
    readonly depths: ListDepths;
    readonly strikeCheckedTasks: boolean;
    readonly styles: OutputStyles;
    /** The stored style IDs reported unknown, once each; `undefined` when the render reports none, with no presentation. */
    readonly unknownStyles: Set<string> | undefined;
    /** The presentation's columns, or `undefined` for one column. */
    readonly columns: ColumnLayout | undefined;
    /** The column breaks rendered so far, whose first `count - 1` are active. */
    breaks: number;
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

/**
 * An override's output with what the declared path writes on its outer element: the style ID, the recipe class and the
 * colour, on its own root when that is a host element, else, for a mark, on a `span` around it. A node's other output
 * stays as it is, since a wrapper could break the structure its parent needs.
 */
const decorated = (
    rendered: ReactNode,
    wraps: boolean,
    decorate: (template: HtmlTemplate) => HtmlTemplate,
): ReactNode => {
    const outer = decorate({ layers: [{ tag: 'span', attrs: {} }], content: true }).layers[0];
    if (outer === undefined || Object.keys(outer.attrs).length === 0) {
        return rendered;
    }
    const props = propsOf(outer.attrs);
    if (!isValidElement<Record<string, unknown>>(rendered) || typeof rendered.type !== 'string') {
        if (!wraps) {
            return rendered;
        }
        return createElement('span', props, rendered);
    }
    const own = rendered.props;
    if (typeof own.className === 'string' && typeof props.className === 'string') {
        props.className = `${own.className} ${props.className}`;
    }
    if (isRecord(own.style) && isRecord(props.style)) {
        props.style = Object.assign({ ...own.style }, props.style);
    }
    if (own['data-rte-style'] !== undefined) {
        delete props['data-rte-style'];
    }
    // oxlint-disable-next-line @eslint-react/no-clone-element -- the override's own root takes what the declared path writes on it.
    return cloneElement(rendered, props);
};

/** The recipe a node or mark renders with, reporting an unknown stored `styleId` once per render. */
const styled = (state: RenderState, type: string, attrs: JsonObject, path: string) => {
    const { style, unknown } = styleOfNode(state.styles.styles, type, attrs);
    const { unknownStyles } = state;
    if (unknown && unknownStyles !== undefined && typeof attrs.styleId === 'string') {
        if (!unknownStyles.has(attrs.styleId)) {
            unknownStyles.add(attrs.styleId);
            state.diagnostics.push(unknownStyle(path));
        }
    }
    return style;
};

const textOf = (value: unknown): string => (typeof value === 'string' ? value : '');

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
    // A link whose `href` fails the check is its text alone, with no link style, as `toHTML` and the editor show it.
    if (mark.type === 'link' && plan.featureId === 'links' && !checkHref(textOf(attrs.href)).ok) {
        return createElement(Fragment, null, ...children);
    }
    const style = styled(state, mark.type, attrs, markPath(items, index));
    const decorate = (template: HtmlTemplate) =>
        withColor(withStyle(withStyleId(template, attrs), style, false), mark.type, attrs, state.styles.colorTokens);
    if (plan.override !== undefined) {
        try {
            const props = { attrs, children: createElement(Fragment, null, ...children), context: state.context };
            return decorated(callOverride(plan.override, props), true, decorate);
        } catch {
            reportFailure(state, plan.featureId, markPath(items, index), mark.type);
            return fallback(state, 'span', plan.featureId, children);
        }
    }
    return build(decorate(resolveHtmlSpec(plan.spec, attrs, plan.options)), children);
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
    const { children, entered } = state.depths.within(node.type, (level) => ({
        children: renderChildren(state, node, path, plan.pre),
        entered: level,
    }));
    const attrs = attrsOf(node.attrs);
    if (plan.override !== undefined) {
        try {
            const props = { attrs, children: createElement(Fragment, null, ...children), context: state.context };
            const rendered = callOverride(plan.override, props);
            state.carried = 0;
            const style = styled(state, node.type, attrs, path);
            return decorated(rendered, false, (template) => withStyle(withStyleId(template, attrs), style, false));
        } catch {
            reportFailure(state, plan.featureId, path, node.type);
            const { tag, text } = failedFallback(state, node, plan, before);
            return fallback(state, tag, plan.featureId, [text]);
        }
    }
    state.carried = 0;
    let template = resolveHtmlSpec(plan.spec, attrs, plan.options, plan.shared);
    if (entered !== undefined) {
        template = withListLevel(template, attrs, entered.kind, entered.depth, state.listLevels);
    }
    if (!plan.inline) {
        template = withAutoDirection(template, passageDirection(treeRuns(node.content)));
    }
    template = withStyle(template, styled(state, node.type, attrs, path), false);
    if (node.type === COLUMN_BREAK) {
        if (state.columns !== undefined && state.breaks < state.columns.count - 1) {
            template = withActiveBreak(template);
        }
        state.breaks += 1;
    }
    return build(template, children);
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

/**
 * The reader root: the `doc` node as one `div` with the content classes, its `lang` and `dir`, its blocks, then the
 * island notice, after one `style` element with the presentation's recipe stylesheet when it has one; with columns,
 * inside the container whose width decides, through the package styles, whether they show.
 */
export const renderDocument = (
    state: RenderState,
    root: TreeNode,
    contentClassName?: string,
    styleSheet = '',
): ReactElement => {
    const children = renderChildren(state, root, '/content', false);
    const props: Record<string, unknown> = { className: contentClasses(contentClassName) };
    const lang = root.attrs?.lang;
    const dir = root.attrs?.dir;
    if (typeof lang === 'string') {
        props.lang = lang;
    }
    if (dir === 'ltr' || dir === 'rtl') {
        props.dir = dir;
    }
    if (state.strikeCheckedTasks) {
        props['data-rte-strike-checked-tasks'] = '';
    }
    if (state.islands > 0) {
        children.push(message(state.context, 'islands'));
    }
    const content = createElement('div', props, ...children);
    const laidOut = withColumns(state.columns, content);
    if (styleSheet === '') {
        return laidOut;
    }
    // The stylesheet holds only checked declarations, so it can never close its element.
    // oxlint-disable-next-line react/no-danger -- DR-128: React 18 escapes a text child of `<style>` on the server.
    const sheet = createElement('style', { 'data-rte-styles': '', dangerouslySetInnerHTML: { __html: styleSheet } });
    return createElement(Fragment, null, sheet, laidOut);
};

/** The container whose width decides, through the package styles, whether the columns show. */
const withColumns = (columns: ColumnLayout | undefined, content: ReactElement): ReactElement => {
    if (columns === undefined) {
        return content;
    }
    const style = {
        '--rte-columns': String(columns.count),
        '--rte-column-gap': columns.length,
        container: 'fondue-rte-columns / inline-size',
        paddingInlineEnd: 'calc((var(--rte-columns) - 1) * var(--rte-column-gap))',
    };
    return createElement(
        'div',
        { className: 'fondue-rte-columns', 'data-rte-columns': String(columns.count), style },
        content,
    );
};
