/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CodecContext,
    type Diagnostic,
    type ListLevels,
    figureAlign,
    imageOutput,
    type Unavailable,
    mentionLabel,
    unavailableNote,
} from '#/model';
import {
    ASSET_IMAGE,
    FIGURE,
    IMAGE_FEATURE,
    leavesOutUnresolved,
    isIsland,
    type TreeMark,
    type TreeNode,
    type HtmlTemplate,
    passageDirection,
    resolveHtmlSpec,
    treeRuns,
    withAutoDirection,
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
    listDepths,
    type ListDepths,
    type OutputStyles,
    spaced,
    type Spacing,
    styleOfNode,
    withActiveBreak,
    withColor,
    withListLevel,
    withStyle,
    withStyleId,
    type ResolveReference,
} from '#/model/internal';

import { build, checkOverrideSpec, checkOverrideTags, escapeHtml } from './htmlMarkup';
import { type CodecPlan, Losses } from './plan';
import { keepMark, noteNode, reportFailure } from './walk';

interface HtmlState extends Spacing {
    readonly plan: CodecPlan;
    readonly context: CodecContext;
    readonly diagnostics: Diagnostic[];
    /** Uses of features whose `html` support is `lossy`. */
    readonly losses: Losses;
    readonly listLevels: ListLevels | undefined;
    readonly depths: ListDepths;
    readonly styles: OutputStyles;
    readonly columns: ColumnLayout | undefined;
    readonly resolveReference: ResolveReference | undefined;
    /** The column breaks written so far, whose first `count - 1` are active. */
    breaks: number;
}

const NO_STYLES: OutputStyles = { styles: [], colorTokens: [], inline: false };

/** What `writeHtml` writes around and into the blocks; every field is optional. */
export interface HtmlWriteOptions {
    readonly contentClassName?: string | undefined;
    readonly listLevels?: ListLevels | undefined;
    readonly columns?: ColumnLayout | undefined;
    readonly styles?: OutputStyles | undefined;
    /** Mention labels as the reader shows them; without it, each mention's stored label. */
    readonly resolveReference?: ResolveReference | undefined;
}

const NO_OPTIONS: HtmlWriteOptions = Object.freeze({});

export { escapeHtml };

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
    const attrs = attrsOf(mark.attrs);
    const { styles, colorTokens, inline } = state.styles;
    let template = resolveHtmlSpec(plan.spec, attrs, plan.options);
    if (mark.type === 'link' && plan.featureId === 'links') {
        const [anchor] = template.layers;
        // A link whose `href` failed the check is its text alone, as in the reader.
        if (anchor === undefined || anchor.attrs.href === undefined) {
            return inner;
        }
        // The reader's out-of-sight "opens in a new window" text would become content when the output is pasted.
        if (attrs.openInNewWindow === true) {
            const opened = { ...anchor.attrs, rel: 'noopener noreferrer', target: '_blank' };
            template = { ...template, layers: [{ ...anchor, attrs: opened }, ...template.layers.slice(1)] };
        }
    }
    template = withStyleId(template, attrs);
    template = withStyle(template, styleOfNode(styles, mark.type, attrs).style, inline);
    template = withColor(template, mark.type, attrs, colorTokens);
    return build(template, inner);
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
    if (leavesOutUnresolved(state, plan.featureId, node, path)) {
        state.carried = 0;
        return '';
    }
    noteNode(state, node, 'html');
    if (plan.featureId === IMAGE_FEATURE && (node.type === FIGURE || node.type === ASSET_IMAGE)) {
        state.carried = 0;
        return imageMarkup(state, node, path);
    }
    const before = state.carried;
    const { inner, entered } = state.depths.within(node.type, (level) => {
        let content: string;
        if (node.type === 'task_item' && plan.featureId === 'lists.task') {
            content = taskItemInner(state, node, path, plan.pre);
        } else if (isMention(node, plan.featureId)) {
            content = mentionInner(state, node);
        } else {
            content = renderChildren(state, node, path, plan.pre);
        }
        return { inner: content, entered: level };
    });
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
    if (entered !== undefined) {
        template = withListLevel(template, attrs, entered.kind, entered.depth, state.listLevels);
    }
    if (!plan.inline) {
        template = withAutoDirection(template, passageDirection(treeRuns(node.content)));
    }
    if (isMention(node, plan.featureId)) {
        template = { ...template, content: true };
    }
    template = withStyle(template, styleOfNode(state.styles.styles, node.type, attrs).style, state.styles.inline);
    if (node.type === COLUMN_BREAK) {
        // Stored HTML has no package styles, so an active break carries its own.
        if (state.columns !== undefined && state.breaks < state.columns.count - 1) {
            template = withActiveBreak(template, 'break-after: column');
        }
        state.breaks += 1;
    }
    return build(template, inner);
};

/**
 * A task item's disabled checkbox labelled by its first block, then its other blocks, as the `lists.task` reader
 * override renders them, which no `HtmlSpec` can express.
 */
const taskItemInner = (state: HtmlState, node: TreeNode, path: string, pre: boolean): string => {
    // A task item's children are blocks, which carry no mark to group them by.
    const blocks = itemsOf(node, path, keepMark(state, 'html')).map((item) => renderNode(state, item, pre));
    const [first = '', ...rest] = blocks;
    let nodeId = '';
    if (typeof node.attrs?.nodeId === 'string') {
        nodeId = node.attrs.nodeId;
    }
    const label = escapeHtml(`rte-task-${encodeURIComponent(nodeId)}`);
    // React writes `checked` last on an input, so the reader's markup does too.
    let checked = '';
    if (node.attrs?.checked === true) {
        checked = ' checked=""';
    }
    const checkbox = `<input type="checkbox" disabled="" aria-labelledby="${label}"${checked}/>`;
    return `${checkbox}<div id="${label}">${first}</div>${rest.join('')}`;
};

const isMention = (node: TreeNode, featureId: string) => node.type === 'mention' && featureId === 'mentions';

/**
 * A figure on its side, or its image from `resolveAssetUrl` with the `alt` its intent gives, else the unavailable
 * placeholder, as the `media.image` reader overrides render them: the `src` is resolved at render time, never stored.
 */
const imageMarkup = (state: HtmlState, node: TreeNode, path: string): string => {
    const attrs = attrsOf(node.attrs);
    if (node.type === FIGURE) {
        const inner = renderChildren(state, node, path, false);
        return `<figure dir="auto" style="text-align:${figureAlign(attrs)}">${inner}</figure>`;
    }
    const shown = imageOutput(attrs, state.context);
    if (shown.kind === 'unavailable') {
        return unavailableMarkup(shown, false);
    }
    let written = ` src="${escapeHtml(shown.src)}"`;
    if (shown.alt !== undefined) {
        written += ` alt="${escapeHtml(shown.alt)}"`;
    }
    if (shown.width !== undefined) {
        written += ` width="${shown.width}"`;
    }
    if (shown.height !== undefined) {
        written += ` height="${shown.height}"`;
    }
    if (shown.cssWidth !== undefined) {
        written += ` style="width:${shown.cssWidth}"`;
    }
    return `<img${written}/>${unavailableMarkup(shown.unavailable, true)}`;
};

/** The reader's `ImageUnavailable` as text, which no `HtmlSpec` can express: a message, then the label in `bdi`. */
const unavailableMarkup = ({ message, label }: Unavailable, hidden: boolean): string => {
    let text = escapeHtml(message);
    if (label !== '') {
        text += ` <bdi>${escapeHtml(label)}</bdi>`;
    }
    return `<span data-rte-image-unavailable="" data-rte-message="image-unavailable"${hidden ? ' hidden=""' : ''}>${text}</span>`;
};

/**
 * A mention's `@` and its label isolated for bidirectional text, then its unavailable note, as the `mentions` reader
 * override renders it, which no `HtmlSpec` can express: the label is text, never a resource ID.
 */
const mentionInner = (state: HtmlState, node: TreeNode): string => {
    const shown = mentionLabel(attrsOf(node.attrs), { t: state.context.t, resolveReference: state.resolveReference });
    return `@<bdi>${escapeHtml(shown.label)}</bdi>${escapeHtml(unavailableNote(shown, state.context.t))}`;
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

/**
 * The reader's static markup as text: the `doc` node as one `div` with the content classes, its `lang` and `dir`, its
 * blocks, then the island notice; with `columns`, an inline `columns` and `column-gap` on that root. The count stays
 * fixed, since an active break forces a column that a narrower count would push out of the box. `styles` adds recipe
 * classes, inline recipes and token colours.
 */
export const writeHtml = (
    plan: CodecPlan,
    root: TreeNode,
    context: CodecContext,
    { contentClassName, listLevels, columns, styles = NO_STYLES, resolveReference }: HtmlWriteOptions = NO_OPTIONS,
): { readonly html: string; readonly diagnostics: readonly Diagnostic[] } => {
    const state: HtmlState = {
        plan,
        context,
        diagnostics: [],
        losses: new Losses(),
        islands: 0,
        carried: 0,
        listLevels,
        depths: listDepths(),
        styles,
        columns,
        resolveReference,
        breaks: 0,
    };
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
    // On the content root itself, so a `normal` gap resolves against the content font, as in the editor.
    if (columns !== undefined) {
        props += ` style="columns:${columns.count};column-gap:${escapeHtml(columns.gap)}"`;
    }
    html = `<div${props}>${html}</div>`;
    return { html, diagnostics: [...state.diagnostics, ...lossy] };
};
