/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DOMOutputSpec, type Mark as PmMark, type Node as PmNode } from 'prosemirror-model';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import {
    type EditorView,
    type MarkView,
    type MarkViewConstructor,
    type NodeView,
    type NodeViewConstructor,
    type ViewMutationRecord,
} from 'prosemirror-view';
import { type ReactNode, useCallback } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import {
    type BlockDefinition,
    type EditorControlApi,
    type InlineEditorProps,
    type MarkDefinition,
    type PluginRegistry,
    type RteBlockNode,
} from '#/core';

import { type OpenEditors } from './controlApi';
import { definedAttrs, markValueOf } from './documentConversion';

/**
 * The React-hosted views: the editing UI a plugin draws with an
 * `editorComponent`. Everything without one is drawn by the engine itself,
 * from `toDom` / `toHtml`, synchronously and without React.
 *
 * Every view here follows the same two rules.
 *
 * (1) The engine never waits on React. The editable content (`contentDOM`) is
 *     built up front, outside React, and is in the page the moment the view
 *     is — typing that creates a view goes on at once. React renders into a
 *     container of its own beside it, whenever React gets to it: no
 *     `flushSync`, which inside the engine's dispatch (itself often inside
 *     React work — a `setDoc` from an effect) is what React warns about and
 *     drops. Once the component has rendered, `ContentHole` moves the content
 *     to where the component placed `{children}`.
 * (2) A view's React root is unmounted after the engine is done with it, never
 *     during — the engine destroys views in the middle of its own update,
 *     which may be in the middle of React's.
 */

/** A container React may own whole: its first render clears it. */
const reactContainer = (): HTMLElement => {
    const container = document.createElement('span');
    container.style.display = 'contents';
    return container;
};

/**
 * Moves the engine's content into `parent`, keeping the caret. A selection
 * inside a node that is moved collapses onto the node's old parent, which
 * would put the caret somewhere the engine did not — so it is put back.
 */
const moveContent = (content: HTMLElement, parent: HTMLElement): void => {
    if (content.parentNode === parent) {
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
 * hole mounts — the ref is stable, so a re-render does not move it out and
 * back — and goes back to the view's element (`home`) if the component stops
 * rendering the hole, so the engine's content never leaves the page.
 */
const ContentHole = ({ element, home }: { element: HTMLElement; home: HTMLElement }): ReactNode => {
    const place = useCallback((node: HTMLSpanElement | null) => moveContent(element, node ?? home), [element, home]);
    return <span ref={place} style={{ display: 'contents' }} />;
};

/** See rule (2). Unmounting a root that is already gone is not an error worth surfacing. */
const unmountLater = (root: Root): void => {
    queueMicrotask(() => {
        try {
            root.unmount();
        } catch {
            // The page is being torn down around it.
        }
    });
};

/**
 * The outer element the engine's own `toDOM` draws for a node — the block's
 * `toDom` with what the schema adds to it (injected styles). The node view
 * takes its tag and attributes; the inner chrome is the component's.
 */
const outerElementOf = (node: PmNode): { tag: string; attrs: Record<string, string> } => {
    const output: DOMOutputSpec | undefined = node.type.spec.toDOM?.(node);
    if (!Array.isArray(output)) {
        return { tag: 'div', attrs: {} };
    }
    const [tag, second] = output as readonly unknown[];
    const attrs: Record<string, string> = {};
    if (second !== null && typeof second === 'object' && !Array.isArray(second) && !(second instanceof Node)) {
        for (const [name, value] of Object.entries(second as Record<string, unknown>)) {
            if (typeof value === 'string') {
                attrs[name] = value;
            }
        }
    }
    return { tag: String(tag), attrs };
};

const classTokens = (value: string | undefined): string[] => (value ?? '').split(/\s+/).filter(Boolean);

/**
 * Hosts a block's `editorComponent` as a NodeView. The outer element comes from
 * `toDom`; React draws the inner chrome, and the block's children sit in the
 * content hole the component places via `{children}`.
 *
 * The view keeps track of the attributes it set on the outer element itself,
 * because it is not the only one setting them: the engine puts its selection
 * class and decoration attributes there too. An update removes what the new
 * `toDom` no longer says and leaves the rest alone.
 */
class ReactBlockView implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | undefined;
    private readonly root: Root;
    private readonly tag: string;
    private node: PmNode;
    private ownAttrs: Record<string, string> = {};
    private destroyed = false;

    constructor(
        node: PmNode,
        private readonly view: EditorView,
        private readonly getPos: () => number | undefined,
        private readonly definition: BlockDefinition,
    ) {
        this.node = node;
        const { tag, attrs } = outerElementOf(node);
        this.tag = tag;
        this.dom = document.createElement(tag);
        this.syncAttrs(attrs);

        const container = reactContainer();
        this.dom.append(container);
        if (definition.children !== undefined) {
            // Inline content in a span, blocks in a div; neither adds a box.
            this.contentDOM = document.createElement(definition.children === 'text' ? 'span' : 'div');
            this.contentDOM.style.display = 'contents';
            this.dom.append(this.contentDOM);
        }
        this.root = createRoot(container);
        this.paint();
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

    private readonly updateAttributes = (attrs: Record<string, unknown>): void => {
        if (this.destroyed || this.view.isDestroyed) {
            return;
        }
        const pos = this.getPos();
        if (pos === undefined) {
            return;
        }
        this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, { ...this.node.attrs, ...attrs }));
    };

    private paint(): void {
        const Component = this.definition.editorComponent;
        if (!Component || this.destroyed) {
            return;
        }
        const node = { type: this.node.type.name, ...definedAttrs(this.node.attrs) } as unknown as RteBlockNode;
        this.root.render(
            <Component node={node} updateAttributes={this.updateAttributes}>
                {this.contentDOM ? <ContentHole element={this.contentDOM} home={this.dom} /> : undefined}
            </Component>,
        );
    }

    update(node: PmNode): boolean {
        if (this.destroyed || node.type !== this.node.type) {
            return false;
        }
        const { tag, attrs } = outerElementOf(node);
        if (tag !== this.tag) {
            // A different element altogether: the engine builds a new view.
            return false;
        }
        this.node = node;
        this.syncAttrs(attrs);
        this.paint();
        return true;
    }

    destroy(): void {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        unmountLater(this.root);
    }

    ignoreMutation(mutation: ViewMutationRecord): boolean {
        if (!this.contentDOM) {
            return true;
        }
        // Selection changes and typing inside the content are the engine's;
        // what React does to the chrome — and the content moving into its
        // hole — is not.
        if (mutation.type === 'selection') {
            return false;
        }
        return !this.contentDOM.contains(mutation.target);
    }
}

/** Set on an inline node view inside a selected range; engine.scss paints the highlight. */
const IN_SELECTION_CLASS = 'rte-in-selection';

/**
 * A view that follows the selection, so the editor offers it every state
 * change. Reports its type and focus, so the editor can tell when the node
 * whose editing UI is open has been left. It re-renders only when what it
 * hands its component has changed.
 */
export type Repaintable = { paint(): { type: string; focused: boolean } };

/** What a live view last handed its component; the callbacks are stable, so this is all that changes. */
type Painted = { focused: boolean; selected: boolean; open: boolean; value: unknown };

const samePaint = (a: Painted | null, b: Painted): boolean =>
    a !== null && a.focused === b.focused && a.selected === b.selected && a.open === b.open && a.value === b.value;

/**
 * Hosts an inline element's `editorComponent`: the editor renders it with
 * generic props and does nothing else. Inline elements without one are drawn
 * from `toHtml` and need no view. Events from
 * inside it belong to it — an input in there types into the input, not the
 * document.
 *
 * Known limitation: one React root per node, so the component does not see
 * the host app's context providers.
 */
export class ReactInlineView implements NodeView {
    dom: HTMLElement;
    private readonly root: Root;
    private node: PmNode;
    private painted: Painted | null = null;
    private destroyed = false;

    constructor(
        node: PmNode,
        private readonly view: EditorView,
        private readonly getPos: () => number | undefined,
        private readonly Component: (props: InlineEditorProps<Record<string, unknown>>) => ReactNode,
        private readonly getApi: () => EditorControlApi,
        private readonly live: Set<Repaintable>,
        private readonly openEditors: OpenEditors,
    ) {
        this.node = node;
        this.dom = document.createElement('span');
        this.dom.contentEditable = 'false';
        this.root = createRoot(this.dom);
        live.add(this);
        this.paint();
    }

    /** Where the node is, while the view still stands for one. */
    private pos(): number | undefined {
        return this.destroyed || this.view.isDestroyed ? undefined : this.getPos();
    }

    private isFocused(pos: number | undefined): boolean {
        if (pos === undefined) {
            return false;
        }
        const { selection } = this.view.state;
        if (selection instanceof NodeSelection) {
            return selection.from === pos;
        }
        return selection.empty && selection.from === pos + this.node.nodeSize;
    }

    /** Inside a selected range — a drag across the text that this node sits in. */
    private isSelected(pos: number | undefined): boolean {
        const { selection } = this.view.state;
        return (
            pos !== undefined && !selection.empty && selection.from <= pos && selection.to >= pos + this.node.nodeSize
        );
    }

    private readonly setOpen = (open: boolean): void => {
        if (open) {
            this.getApi().editors.open(this.node.type.name);
        } else {
            this.getApi().editors.close();
        }
    };

    private readonly setValue = (next: Record<string, unknown>): void => {
        const pos = this.pos();
        if (pos !== undefined) {
            this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, { value: next }));
        }
    };

    private readonly remove = (): void => {
        const pos = this.pos();
        if (pos === undefined) {
            return;
        }
        const transaction = this.view.state.tr.delete(pos, pos + this.node.nodeSize);
        transaction.setSelection(TextSelection.create(transaction.doc, pos));
        this.view.dispatch(transaction);
    };

    paint(): { type: string; focused: boolean } {
        const type = this.node.type.name;
        if (this.destroyed) {
            return { type, focused: false };
        }
        const pos = this.pos();
        const focused = this.isFocused(pos);
        const next: Painted = {
            focused,
            selected: this.isSelected(pos),
            open: focused && this.openEditors.type === type,
            value: this.node.attrs.value,
        };
        if (samePaint(this.painted, next)) {
            return { type, focused };
        }
        this.painted = next;
        const { Component } = this;
        // Browsers disagree on painting a selection inside a non-editable island
        // (Safari does not), so the editor paints it — see engine.scss.
        this.dom.classList.toggle(IN_SELECTION_CLASS, next.selected);
        this.root.render(
            <Component
                value={next.value as Record<string, unknown> | null}
                isFocused={next.focused}
                isSelected={next.selected}
                isOpen={next.open}
                setOpen={this.setOpen}
                api={this.getApi()}
                setValue={this.setValue}
                remove={this.remove}
            />,
        );
        return { type, focused };
    }

    update(node: PmNode): boolean {
        if (this.destroyed || node.type !== this.node.type) {
            return false;
        }
        this.node = node;
        this.paint();
        return true;
    }

    selectNode(): void {
        this.paint();
    }

    deselectNode(): void {
        this.paint();
    }

    stopEvent(event: Event): boolean {
        // Form controls inside the component own their events; everything else
        // (a click on the finished node) still reaches the editor.
        return event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button') !== null;
    }

    ignoreMutation(): boolean {
        return true;
    }

    destroy(): void {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.live.delete(this);
        unmountLater(this.root);
    }
}

type MarkEditorComponent = NonNullable<MarkDefinition['editorComponent']>;

/**
 * Hosts a mark's `editorComponent` around the marked text. The text stays
 * editable in a content hole the component places via `{children}`.
 *
 * The engine builds a new view whenever the mark's value changes, so the
 * value is fixed for the view's lifetime; only focus and openness repaint it.
 *
 * Known limitation: one React root per mark view, like the inline view.
 */
export class ReactMarkView implements MarkView {
    dom: HTMLElement;
    contentDOM: HTMLElement;
    private readonly root: Root;
    private readonly value: Record<string, unknown>;
    private painted: Painted | null = null;
    private destroyed = false;

    constructor(
        private readonly mark: PmMark,
        private readonly view: EditorView,
        private readonly Component: MarkEditorComponent,
        private readonly getApi: () => EditorControlApi,
        private readonly live: Set<Repaintable>,
        private readonly openEditors: OpenEditors,
    ) {
        this.value = markValueOf(mark);
        this.dom = document.createElement('span');
        const container = reactContainer();
        this.contentDOM = document.createElement('span');
        this.contentDOM.style.display = 'contents';
        this.dom.append(container, this.contentDOM);
        this.root = createRoot(container);
        live.add(this);
        this.paint();
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

    private isFocused(): boolean {
        const range = this.range();
        const { from, to } = this.view.state.selection;
        return range !== null && from >= range.from && to <= range.to;
    }

    private readonly setOpen = (open: boolean): void => {
        if (open) {
            this.getApi().editors.open(this.mark.type.name);
        } else {
            this.getApi().editors.close();
        }
    };

    private readonly setValue = (next: Record<string, unknown>): void => {
        const range = this.range();
        if (range === null) {
            return;
        }
        this.view.dispatch(
            this.view.state.tr
                .removeMark(range.from, range.to, this.mark.type)
                .addMark(range.from, range.to, this.mark.type.create({ value: next })),
        );
    };

    private readonly remove = (): void => {
        const range = this.range();
        if (range !== null) {
            this.view.dispatch(this.view.state.tr.removeMark(range.from, range.to, this.mark.type));
        }
    };

    paint(): { type: string; focused: boolean } {
        const type = this.mark.type.name;
        if (this.destroyed) {
            return { type, focused: false };
        }
        const focused = this.isFocused();
        const next: Painted = {
            focused,
            selected: false,
            open: focused && this.openEditors.type === type,
            value: this.value,
        };
        if (samePaint(this.painted, next)) {
            return { type, focused };
        }
        this.painted = next;
        const { Component } = this;
        this.root.render(
            <Component
                value={this.value}
                isFocused={next.focused}
                isOpen={next.open}
                setOpen={this.setOpen}
                api={this.getApi()}
                setValue={this.setValue}
                remove={this.remove}
            >
                <ContentHole element={this.contentDOM} home={this.dom} />
            </Component>,
        );
        return { type, focused };
    }

    ignoreMutation(mutation: ViewMutationRecord): boolean {
        // Selection changes and typing inside the text are the engine's; what
        // React does to the chrome around it is not.
        if (mutation.type === 'selection') {
            return false;
        }
        return !this.contentDOM.contains(mutation.target);
    }

    destroy(): void {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.live.delete(this);
        unmountLater(this.root);
    }
}

/**
 * Only marks with editing UI get a view. Every other mark is drawn by the
 * engine from its `toHtml` — synchronously, with no React root per run of
 * text — which is the same element its `renderComponent` draws readonly.
 */
export const createMarkViews = (
    registry: PluginRegistry,
    getApi: () => EditorControlApi,
    live: Set<Repaintable>,
    openEditors: OpenEditors,
): Record<string, MarkViewConstructor> => {
    const views: Record<string, MarkViewConstructor> = {};
    for (const [type, { editorComponent }] of registry.marks) {
        if (editorComponent) {
            views[type] = (mark, view) => new ReactMarkView(mark, view, editorComponent, getApi, live, openEditors);
        }
    }
    return views;
};

export const createNodeViews = (
    registry: PluginRegistry,
    getApi: () => EditorControlApi,
    liveInlines: Set<Repaintable>,
    openEditors: OpenEditors,
): Record<string, NodeViewConstructor> => {
    const views: Record<string, NodeViewConstructor> = {};
    for (const [type, definition] of registry.blocks) {
        if (definition.editorComponent) {
            views[type] = (node, view, getPos) => new ReactBlockView(node, view, getPos, definition);
        }
    }
    for (const [type, { editorComponent }] of registry.inlines) {
        if (editorComponent) {
            views[type] = (node, view, getPos) =>
                new ReactInlineView(node, view, getPos, editorComponent, getApi, liveInlines, openEditors);
        }
    }
    return views;
};
