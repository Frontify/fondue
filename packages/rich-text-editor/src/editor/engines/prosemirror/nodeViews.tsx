/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark as PmMark, type Node as PmNode } from 'prosemirror-model';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import {
    type EditorView,
    type MarkView,
    type MarkViewConstructor,
    type NodeView,
    type NodeViewConstructor,
    type ViewMutationRecord,
} from 'prosemirror-view';
import { type ComponentType, type ReactNode, useCallback } from 'react';
import { createPortal } from 'react-dom';

import {
    attributeEntries,
    type BlockDefinition,
    blockHtml,
    blockValueOf,
    type EditorControlApi,
    type EditProps,
    type PluginRegistry,
} from '#/core';
import { type ViewPortals } from '#/editor/port';

import { type OpenEditors } from './controlApi';
import { markValueOf, VALUE_ATTR } from './documentConversion';

/**
 * The React-hosted views: the editing UI a plugin draws with `render.edit`.
 * Anything without one is drawn by the engine from `toHtml`, without React.
 *
 * Lifecycle of a view (`ReactEditView` and its subclasses):
 *   construct  build the DOM synchronously, register with `LiveViews`, paint.
 *   portal     `paint` hands the plugin's component to the shell as a portal
 *              into the view's container (`ViewPortals`). No view owns a React
 *              root: the shell renders all portals in one commit and the
 *              components see the host app's context providers.
 *   update     the engine calls `update` on a new node; `LiveViews.repaint`
 *              offers every view each state change, for focus, selection
 *              and openness.
 *   destroy    the view drops its portal; React unmounts it on its next render.
 *
 * Two rules every view follows:
 * (1) The engine never waits on React. The editable content (`contentDOM`) is
 *     built up front, outside React, and is in the page the moment the view
 *     is, so typing that creates a view goes on at once. No `flushSync`: inside
 *     the engine's dispatch (often itself inside React work) React warns about
 *     it and drops it. Once the component has rendered, `ContentHole` moves the
 *     content to where the component placed `{children}`.
 * (2) A view only hands React work over, never does it: the engine destroys
 *     views in the middle of its own update, which may be in the middle of
 *     React's.
 */

// --- Entry points ---

/** Only marks with editing UI get a view; the rest are drawn from `toHtml`, as in the readonly view and export. */
export const createMarkViews = (
    registry: PluginRegistry,
    api: EditorControlApi,
    live: LiveViews,
    openEditors: OpenEditors,
): Record<string, MarkViewConstructor> => {
    const views: Record<string, MarkViewConstructor> = {};
    for (const [type, { render }] of registry.marks) {
        const edit = render?.edit;
        if (edit) {
            views[type] = (mark, view) => new ReactMarkView(mark, view, edit, api, live, openEditors);
        }
    }
    return views;
};

export const createNodeViews = (
    registry: PluginRegistry,
    api: EditorControlApi,
    live: LiveViews,
    openEditors: OpenEditors,
): Record<string, NodeViewConstructor> => {
    const views: Record<string, NodeViewConstructor> = {};
    for (const [type, definition] of registry.blocks) {
        const edit = definition.render?.edit;
        if (edit) {
            views[type] = (node, view, getPos) =>
                new ReactBlockView(node, view, getPos, registry, definition, edit, api, live, openEditors);
        }
    }
    for (const [type, { render }] of registry.inlines) {
        const edit = render?.edit;
        if (edit) {
            views[type] = (node, view, getPos) => new ReactInlineView(node, view, getPos, edit, api, live, openEditors);
        }
    }
    return views;
};

// --- LiveViews: which views a state change can concern ---

/** A plugin's `render.edit`, for any kind of node; `TCurrent` is what its value can be right now. */
type EditComponent<TCurrent = Record<string, unknown>> = ComponentType<EditProps<Record<string, unknown>, TCurrent>>;

/** What a live view last handed its component; the callbacks are stable, so this is all that changes. */
type Painted = { focused: boolean; selected: boolean; open: boolean; value: unknown };

const samePaint = (a: Painted | null, b: Painted): boolean =>
    a !== null && a.focused === b.focused && a.selected === b.selected && a.open === b.open && a.value === b.value;

/** What a repaint reports: the view's type, and whether the selection is in it. */
type PaintResult = { type: string; focused: boolean };

/** A view whose props follow the selection (focus, selection, openness); `LiveViews.repaint` offers it changes. */
type Repaintable = { paint(): PaintResult };

/**
 * The React-hosted views of one editor. Every state change offers each of them
 * a repaint; a view re-renders only when what it hands its component changed.
 */
export class LiveViews {
    private readonly views = new Set<Repaintable>();

    constructor(readonly portals: ViewPortals) {}

    add(view: Repaintable): void {
        this.views.add(view);
    }

    remove(view: Repaintable): void {
        this.views.delete(view);
    }

    /** Repaint every view. Reports whether one of `openType` is still focused — when none is, its editing UI closes. */
    repaint(openType: string | null): boolean {
        let openStillFocused = false;
        for (const view of this.views) {
            const { type, focused } = view.paint();
            openStillFocused ||= focused && type === openType;
        }
        return openStillFocused;
    }
}

// --- View lifecycle: construct, portal, update, destroy ---

/**
 * What every React-hosted view shares: its place among the live views, open
 * state, the paint diff and props, and tearing down. A kind of view says where
 * its node is, what its value is, and how to change or remove it.
 */
abstract class ReactEditView<TCurrent> implements Repaintable {
    private container: HTMLElement | null = null;
    private painted: Painted | null = null;
    protected destroyed = false;

    constructor(
        protected readonly view: EditorView,
        private readonly Component: EditComponent<TCurrent>,
        private readonly api: EditorControlApi,
        private readonly live: LiveViews,
        private readonly openEditors: OpenEditors,
    ) {}

    /** The node or mark type this view draws. */
    protected abstract get type(): string;
    /** Whether the selection is in the node, and whether it covers it whole. */
    protected abstract placement(): { focused: boolean; selected: boolean };
    /** The value handed to the component; a new identity means a repaint. */
    protected abstract value(): TCurrent;
    /** What goes in as `children`. */
    protected abstract children(): ReactNode;
    protected abstract store(value: Record<string, unknown>): void;
    protected abstract drop(): void;
    /** Called with each new paint, before React renders it. */
    protected painting(_next: Painted): void {}
    /** Where the editable content sits in the document, for views that have some. */
    protected contentRange(): { from: number; to: number } | null {
        return null;
    }

    private absorbQueued = false;

    /**
     * Whether a DOM change is not the engine's business: what React does to the
     * chrome (elements, attributes, the content moving into its hole), as
     * opposed to selection changes and typing inside the content.
     *
     * Text typed BESIDE the content (see `isTypedText`) is also ignored, but
     * the engine would lose it, so it is taken out of the chrome and inserted
     * into the document where it was meant to go, once the browser is done.
     */
    protected ignoresMutation(mutation: ViewMutationRecord, dom: HTMLElement, content: HTMLElement): boolean {
        if (mutation.type === 'selection' || content.contains(mutation.target)) {
            return false;
        }
        if (!this.absorbQueued && isTypedBesideContent(mutation, dom)) {
            this.absorbQueued = true;
            queueMicrotask(() => {
                this.absorbQueued = false;
                this.absorbTypedText(dom, content);
            });
        }
        return true;
    }

    private absorbTypedText(dom: HTMLElement, content: HTMLElement): void {
        const range = this.destroyed || this.view.isDestroyed ? null : this.contentRange();
        const { before, after } = takeTypedText(dom, content);
        if (range === null || before + after === '') {
            return;
        }
        // After the content first, so `range.from` still holds for the rest.
        const transaction = this.view.state.tr.insertText(after, range.to).insertText(before, range.from);
        const caret = after === '' ? range.from + before.length : range.to + before.length + after.length;
        transaction.setSelection(TextSelection.create(transaction.doc, caret));
        this.view.dispatch(transaction);
    }

    /**
     * Call last in the constructor, once the DOM is built: the component is
     * portalled into `container`.
     */
    protected start(container: HTMLElement): void {
        this.container = container;
        this.live.add(this);
        this.paint();
    }

    private readonly setOpen = (open: boolean): void => {
        if (open) {
            this.api.editors.open(this.type);
        } else {
            this.api.editors.close();
        }
    };

    // `setValue` and `remove` are stable so a repaint hands the component the same callbacks.
    private readonly setValue = (value: Record<string, unknown>): void => {
        if (!this.destroyed && !this.view.isDestroyed) {
            this.store(value);
        }
    };

    private readonly remove = (): void => {
        if (!this.destroyed && !this.view.isDestroyed) {
            this.drop();
        }
    };

    paint(): PaintResult {
        const { type } = this;
        if (this.destroyed || this.container === null) {
            return { type, focused: false };
        }
        const { focused, selected } = this.placement();
        const value = this.value();
        const next: Painted = { focused, selected, open: focused && this.openEditors.type === type, value };
        if (samePaint(this.painted, next)) {
            return { type, focused };
        }
        this.painted = next;
        this.painting(next);
        const { Component } = this;
        this.live.portals.set(
            this,
            createPortal(
                <Component
                    value={value}
                    isFocused={next.focused}
                    isSelected={next.selected}
                    isOpen={next.open}
                    setOpen={this.setOpen}
                    api={this.api}
                    setValue={this.setValue}
                    remove={this.remove}
                >
                    {this.children()}
                </Component>,
                this.container,
            ),
        );
        return { type, focused };
    }

    destroy(): void {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.live.remove(this);
        this.live.portals.delete(this);
    }
}

/** A view standing for a node — a block or an inline — rather than a mark's run. */
abstract class ReactNodeView<TCurrent> extends ReactEditView<TCurrent> implements NodeView {
    abstract dom: HTMLElement;

    constructor(
        protected node: PmNode,
        view: EditorView,
        private readonly getPos: () => number | undefined,
        Component: EditComponent<TCurrent>,
        api: EditorControlApi,
        live: LiveViews,
        openEditors: OpenEditors,
    ) {
        super(view, Component, api, live, openEditors);
    }

    protected get type(): string {
        return this.node.type.name;
    }

    /** Where the node is, while the view still stands for one. Not gated on `view.isDestroyed`, which is also true during the engine's first DOM build, when the position is already known. */
    protected pos(): number | undefined {
        return this.destroyed ? undefined : this.getPos();
    }

    /** A new node of the same type: take it, or say no and get a new view. */
    protected accepts(node: PmNode): boolean {
        return !this.destroyed && node.type === this.node.type;
    }

    update(node: PmNode): boolean {
        if (!this.accepts(node)) {
            return false;
        }
        this.node = node;
        this.paint();
        return true;
    }
}

// --- Block views ---

/** The tag and attributes of a block's outermost element, as `toHtml` (with alignment) says. */
const outerElement = (
    registry: PluginRegistry,
    definition: BlockDefinition,
    node: PmNode,
): { tag: string; attrs: Record<string, string> } => {
    const spec = blockHtml(registry, definition, node.attrs);
    return { tag: spec.tag, attrs: Object.fromEntries(attributeEntries(spec.attrs)) };
};

const classTokens = (value: string | undefined): string[] => (value ?? '').split(/\s+/).filter(Boolean);

/**
 * Hosts a block's `render.edit`. The outer element comes from the block's
 * `toHtml` (alignment applied); React draws what is inside, and the block's
 * content sits in the hole the component places via `{children}`.
 *
 * The engine also sets attributes on the outer element (selection class,
 * decorations), so the view tracks the ones it set and on update removes only
 * what the new `toHtml` no longer says.
 */
class ReactBlockView extends ReactNodeView<Record<string, unknown>> {
    dom: HTMLElement;
    contentDOM: HTMLElement | undefined;
    private readonly tag: string;
    private ownAttrs: Record<string, string> = {};

    constructor(
        node: PmNode,
        view: EditorView,
        getPos: () => number | undefined,
        private readonly registry: PluginRegistry,
        private readonly definition: BlockDefinition,
        Component: EditComponent,
        api: EditorControlApi,
        live: LiveViews,
        openEditors: OpenEditors,
    ) {
        super(node, view, getPos, Component, api, live, openEditors);
        const { tag, attrs } = outerElement(registry, definition, node);
        this.tag = tag;
        this.dom = document.createElement(tag);
        this.syncAttrs(attrs);

        const container = wrapper('span');
        this.dom.append(container);
        if (definition.content !== undefined) {
            // Inline content in a span, blocks in a div; neither adds a box.
            this.contentDOM = wrapper(definition.content === 'text' ? 'span' : 'div');
            this.dom.append(this.contentDOM);
        }
        this.start(container);
    }

    private syncAttrs(next: Record<string, string>): void {
        const previous = this.ownAttrs;
        for (const name of Object.keys(previous)) {
            if (name !== 'class' && !(name in next)) {
                this.dom.removeAttribute(name);
            }
        }
        const nextClasses = classTokens(next.class);
        this.dom.classList.remove(...classTokens(previous.class).filter((token) => !nextClasses.includes(token)));
        this.dom.classList.add(...nextClasses);
        for (const [name, value] of Object.entries(next)) {
            if (name !== 'class' && this.dom.getAttribute(name) !== value) {
                this.dom.setAttribute(name, value);
            }
        }
        this.ownAttrs = next;
    }

    protected placement(): { focused: boolean; selected: boolean } {
        // Unplaced while the engine is still building the view: paints unfocused, then again once the state moves.
        const pos = this.pos();
        if (pos === undefined) {
            return { focused: false, selected: false };
        }
        const end = pos + this.node.nodeSize;
        const { from, to, empty } = this.view.state.selection;
        return { focused: from >= pos && to <= end, selected: !empty && from <= pos && to >= end };
    }

    private cachedValue: { attrs: PmNode['attrs']; value: Record<string, unknown> } | null = null;

    /** Rebuilt only when `node.attrs` is replaced, so its identity tells a repaint whether it changed. */
    protected value(): Record<string, unknown> {
        if (this.cachedValue?.attrs !== this.node.attrs) {
            this.cachedValue = { attrs: this.node.attrs, value: blockValueOf(this.definition, this.node.attrs) };
        }
        return this.cachedValue.value;
    }

    protected children(): ReactNode {
        return this.contentDOM ? <ContentHole element={this.contentDOM} home={this.dom} /> : undefined;
    }

    protected store(value: Record<string, unknown>): void {
        const pos = this.pos();
        if (pos !== undefined) {
            this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, { ...this.node.attrs, ...value }));
        }
    }

    protected drop(): void {
        const pos = this.pos();
        if (pos !== undefined) {
            this.view.dispatch(this.view.state.tr.delete(pos, pos + this.node.nodeSize));
        }
    }

    update(node: PmNode): boolean {
        if (!this.accepts(node)) {
            return false;
        }
        const { tag, attrs } = outerElement(this.registry, this.definition, node);
        if (tag !== this.tag) {
            // A different element altogether: the engine builds a new view.
            return false;
        }
        this.node = node;
        this.syncAttrs(attrs);
        this.paint();
        return true;
    }

    protected contentRange(): { from: number; to: number } | null {
        const pos = this.pos();
        return pos === undefined || !this.node.isTextblock ? null : { from: pos + 1, to: pos + this.node.nodeSize - 1 };
    }

    ignoreMutation(mutation: ViewMutationRecord): boolean {
        return this.contentDOM ? this.ignoresMutation(mutation, this.dom, this.contentDOM) : true;
    }
}

// --- Inline views ---

/** Set on an inline node view inside a selected range; engine.scss paints the highlight. */
const IN_SELECTION_CLASS = 'rte-in-selection';

/** Class on an inline node view's element; engine.scss keeps host styles off it. */
const INLINE_VIEW_CLASS = 'rte-inline-view';

/** Hosts an inline element's `render.edit`. Events from inside it belong to it: an input there types into the input, not the document. */
class ReactInlineView extends ReactNodeView<Record<string, unknown> | null> {
    dom: HTMLElement;

    constructor(
        node: PmNode,
        view: EditorView,
        getPos: () => number | undefined,
        Component: EditComponent<Record<string, unknown> | null>,
        api: EditorControlApi,
        live: LiveViews,
        openEditors: OpenEditors,
    ) {
        super(node, view, getPos, Component, api, live, openEditors);
        this.dom = document.createElement('span');
        this.dom.className = INLINE_VIEW_CLASS;
        this.dom.contentEditable = 'false';
        this.start(this.dom);
    }

    protected placement(): { focused: boolean; selected: boolean } {
        const pos = this.pos();
        if (pos === undefined) {
            return { focused: false, selected: false };
        }
        const { selection } = this.view.state;
        const end = pos + this.node.nodeSize;
        const focused =
            selection instanceof NodeSelection ? selection.from === pos : selection.empty && selection.from === end;
        // Inside a selected range, e.g. a drag across the text around this node.
        const selected = !selection.empty && selection.from <= pos && selection.to >= end;
        return { focused, selected };
    }

    protected value(): Record<string, unknown> | null {
        return this.node.attrs[VALUE_ATTR] as Record<string, unknown> | null;
    }

    protected children(): ReactNode {
        return undefined;
    }

    protected painting(next: Painted): void {
        // Safari does not paint a selection inside a non-editable island; engine.scss does.
        this.dom.classList.toggle(IN_SELECTION_CLASS, next.selected);
    }

    protected store(value: Record<string, unknown>): void {
        const pos = this.pos();
        if (pos !== undefined) {
            this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, { [VALUE_ATTR]: value }));
        }
    }

    protected drop(): void {
        const pos = this.pos();
        if (pos === undefined) {
            return;
        }
        const transaction = this.view.state.tr.delete(pos, pos + this.node.nodeSize);
        transaction.setSelection(TextSelection.create(transaction.doc, pos));
        this.view.dispatch(transaction);
    }

    selectNode(): void {
        this.paint();
    }

    deselectNode(): void {
        this.paint();
    }

    stopEvent(event: Event): boolean {
        // Form controls own their events; a click on the finished node still reaches the editor.
        return event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button') !== null;
    }

    ignoreMutation(): boolean {
        return true;
    }
}

// --- Mark views ---

/**
 * Hosts a mark's `render.edit` around the marked text, which stays editable in
 * the hole the component places via `{children}`. The engine builds a new view
 * whenever the mark's value changes, so only focus and openness repaint it.
 */
class ReactMarkView extends ReactEditView<Record<string, unknown>> implements MarkView {
    dom: HTMLElement;
    contentDOM: HTMLElement;
    private readonly fixedValue: Record<string, unknown>;

    constructor(
        private readonly mark: PmMark,
        view: EditorView,
        Component: EditComponent,
        api: EditorControlApi,
        live: LiveViews,
        openEditors: OpenEditors,
    ) {
        super(view, Component, api, live, openEditors);
        this.fixedValue = markValueOf(mark);
        this.dom = document.createElement('span');
        const container = wrapper('span');
        this.contentDOM = wrapper('span');
        this.dom.append(container, this.contentDOM);
        this.start(container);
    }

    protected get type(): string {
        return this.mark.type.name;
    }

    /** Where this run of the mark sits in the document, read off its content. */
    private range(): { from: number; to: number } | null {
        if (this.destroyed || this.view.isDestroyed || !this.contentDOM.isConnected) {
            return null;
        }
        try {
            return {
                from: this.view.posAtDOM(this.contentDOM, 0),
                to: this.view.posAtDOM(this.contentDOM, this.contentDOM.childNodes.length),
            };
        } catch {
            return null;
        }
    }

    protected placement(): { focused: boolean; selected: boolean } {
        const range = this.range();
        if (range === null) {
            return { focused: false, selected: false };
        }
        const { from, to, empty } = this.view.state.selection;
        return {
            focused: from >= range.from && to <= range.to,
            selected: !empty && from <= range.from && to >= range.to,
        };
    }

    protected value(): Record<string, unknown> {
        return this.fixedValue;
    }

    protected children(): ReactNode {
        return <ContentHole element={this.contentDOM} home={this.dom} />;
    }

    protected store(value: Record<string, unknown>): void {
        const range = this.range();
        if (range !== null) {
            this.view.dispatch(
                this.view.state.tr
                    .removeMark(range.from, range.to, this.mark.type)
                    .addMark(range.from, range.to, this.mark.type.create({ [VALUE_ATTR]: value })),
            );
        }
    }

    protected drop(): void {
        const range = this.range();
        if (range !== null) {
            this.view.dispatch(this.view.state.tr.removeMark(range.from, range.to, this.mark.type));
        }
    }

    protected contentRange(): { from: number; to: number } | null {
        return this.range();
    }

    ignoreMutation(mutation: ViewMutationRecord): boolean {
        return this.ignoresMutation(mutation, this.dom, this.contentDOM);
    }
}

// --- Content hole: moving the engine content into the component ---

/**
 * Class on every element the views add around the content without meaning a
 * box: engine.scss resets it, so a host's element rules (`span { line-height:
 * 2 }`) cannot reach in, and keeps it out of layout.
 */
const WRAPPER_CLASS = 'rte-view-wrapper';

/** A wrapper element: no box of its own, and no host styles. */
const wrapper = (tag: 'span' | 'div'): HTMLElement => {
    const element = document.createElement(tag);
    element.className = WRAPPER_CLASS;
    element.style.display = 'contents';
    return element;
};

/** Moves the engine's content into `parent`, restoring the caret that the move would collapse. */
const moveContent = (content: HTMLElement, parent: HTMLElement): void => {
    if (content.parentNode === parent) {
        return;
    }
    // Only a focused editor holds the caret, and reading the selection forces a layout.
    if (!content.ownerDocument.activeElement?.contains(content)) {
        parent.append(content);
        return;
    }
    const selection = content.ownerDocument.getSelection();
    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection ?? {};
    const caretInside =
        anchorNode !== null &&
        anchorNode !== undefined &&
        focusNode !== null &&
        focusNode !== undefined &&
        content.contains(anchorNode) &&
        content.contains(focusNode);
    parent.append(content);
    if (selection && caretInside) {
        selection.setBaseAndExtent(anchorNode, anchorOffset ?? 0, focusNode, focusOffset ?? 0);
    }
};

/**
 * Where the component put `{children}`. The content moves in once, when the
 * hole mounts, and back to the view's element (`home`) if the component stops
 * rendering the hole, so the engine's content never leaves the page.
 */
const ContentHole = ({ element, home }: { element: HTMLElement; home: HTMLElement }): ReactNode => {
    const place = useCallback((node: HTMLSpanElement | null) => moveContent(element, node ?? home), [element, home]);
    return <span ref={place} className={WRAPPER_CLASS} style={{ display: 'contents' }} />;
};

// --- Text typed beside the content ---

/**
 * A text node the browser typed into the view's element outside the content
 * (Chrome puts a character typed at the end of a link AFTER the component's
 * `<a>`). Text inside a non-editable island is React's own, not typed.
 */
const isTypedText = (node: Node, dom: HTMLElement): node is Text => {
    if (node.nodeType !== Node.TEXT_NODE) {
        return false;
    }
    const island = node.parentElement?.closest('[contenteditable="false"]');
    return island === null || island === undefined || !dom.contains(island);
};

/** A DOM change outside the content that is typing rather than React drawing the chrome. */
const isTypedBesideContent = (mutation: ViewMutationRecord, dom: HTMLElement): boolean => {
    if (mutation.type === 'characterData') {
        return isTypedText(mutation.target, dom);
    }
    if (mutation.type === 'childList') {
        return [...mutation.addedNodes].some((node) => isTypedText(node, dom));
    }
    return false;
};

/** Takes the typed text outside `content` out of the DOM, split by whether it sat before or after it. */
const takeTypedText = (dom: HTMLElement, content: HTMLElement): { before: string; after: string } => {
    const found = { before: '', after: '' };
    const walker = dom.ownerDocument.createTreeWalker(dom, NodeFilter.SHOW_TEXT);
    const typed: Text[] = [];
    for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
        if (!content.contains(node) && isTypedText(node, dom)) {
            typed.push(node);
        }
    }
    for (const node of typed) {
        const isBefore = node.compareDocumentPosition(content) === Node.DOCUMENT_POSITION_FOLLOWING;
        found[isBefore ? 'before' : 'after'] += node.data;
        node.remove();
    }
    return found;
};
