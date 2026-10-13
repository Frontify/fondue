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
import { type ReactNode } from 'react';
import { flushSync } from 'react-dom';
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
import { htmlSpecToDom } from './htmlSpec';

/**
 * Hosts a plugin `editorComponent` as a ProseMirror NodeView. The outer element
 * comes from `toDom`; React draws the inner chrome. Editable children live in a
 * `contentDOM` hole that the plugin places via `{children}`.
 */

const ContentHole = ({ element }: { element: HTMLElement }): ReactNode => (
    <span
        ref={(node) => {
            if (node && element.parentNode !== node) {
                node.appendChild(element);
            }
        }}
        style={{ display: 'contents' }}
    />
);

const applyDomAttrs = (element: HTMLElement, attrs: Record<string, string> | undefined): void => {
    if (!attrs) {
        return;
    }
    for (const [name, value] of Object.entries(attrs)) {
        if (name === 'class') {
            element.className = value;
        } else {
            element.setAttribute(name, value);
        }
    }
};

class ReactBlockView implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | undefined;
    private readonly root: Root;
    private readonly view: EditorView;
    private readonly getPos: () => number | undefined;
    private readonly definition: BlockDefinition;
    private node: PmNode;

    constructor(node: PmNode, view: EditorView, getPos: () => number | undefined, definition: BlockDefinition) {
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.definition = definition;

        const spec = definition.toDom(definedAttrs(node.attrs));
        const output = htmlSpecToDom(spec);
        const tag = Array.isArray(output) ? String(output[0]) : spec.tag;
        this.dom = document.createElement(tag);
        applyDomAttrs(this.dom, spec.attrs);

        this.contentDOM = definition.children === undefined ? undefined : document.createElement('span');
        this.root = createRoot(this.dom);
        this.paint();
    }

    private rteNode(): RteBlockNode {
        return { type: this.node.type.name, ...definedAttrs(this.node.attrs) } as unknown as RteBlockNode;
    }

    private paint(): void {
        const Component = this.definition.editorComponent;
        if (!Component) {
            return;
        }
        // NodeView must expose contentDOM before ProseMirror inserts children.
        // eslint-disable-next-line @eslint-react/dom-no-flush-sync
        flushSync(() => {
            this.root.render(
                <Component
                    node={this.rteNode()}
                    updateAttributes={(attrs) => {
                        const pos = this.getPos();
                        if (pos === undefined) {
                            return;
                        }
                        this.view.dispatch(
                            this.view.state.tr.setNodeMarkup(pos, undefined, { ...this.node.attrs, ...attrs }),
                        );
                    }}
                >
                    {this.contentDOM ? <ContentHole element={this.contentDOM} /> : undefined}
                </Component>,
            );
        });
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) {
            return false;
        }
        this.node = node;
        applyDomAttrs(this.dom, this.definition.toDom(definedAttrs(node.attrs)).attrs);
        this.paint();
        return true;
    }

    destroy(): void {
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }

    ignoreMutation(mutation: { target: Node }): boolean {
        if (!this.contentDOM) {
            return true;
        }
        return !this.contentDOM.contains(mutation.target);
    }
}

/** Set on an inline node view inside a selected range; engine.scss paints the highlight. */
const IN_SELECTION_CLASS = 'rte-in-selection';

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

    private isFocused(): boolean {
        const pos = this.getPos();
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
    private isSelected(): boolean {
        const pos = this.getPos();
        const { selection } = this.view.state;
        return (
            pos !== undefined && !selection.empty && selection.from <= pos && selection.to >= pos + this.node.nodeSize
        );
    }

    paint(): { type: string; focused: boolean } {
        const { Component } = this;
        const value = this.node.attrs.value as Record<string, unknown> | null;
        const type = this.node.type.name;
        const focused = this.isFocused();
        const selected = this.isSelected();
        // Browsers disagree on painting a selection inside a non-editable island
        // (Safari does not), so the editor paints it — see engine.scss.
        this.dom.classList.toggle(IN_SELECTION_CLASS, selected);
        this.root.render(
            <Component
                value={value}
                isFocused={focused}
                isSelected={selected}
                isOpen={focused && this.openEditors.type === type}
                setOpen={(open) => (open ? this.getApi().editors.open(type) : this.getApi().editors.close())}
                api={this.getApi()}
                setValue={(next) => {
                    const pos = this.getPos();
                    if (pos !== undefined) {
                        this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, { value: next }));
                    }
                }}
                remove={() => {
                    const pos = this.getPos();
                    if (pos === undefined) {
                        return;
                    }
                    const transaction = this.view.state.tr.delete(pos, pos + this.node.nodeSize);
                    transaction.setSelection(TextSelection.create(transaction.doc, pos));
                    this.view.dispatch(transaction);
                }}
            />,
        );
        return { type, focused };
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) {
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
        this.live.delete(this);
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }
}

/**
 * A view that redraws on every editor state change, because `isFocused` follows
 * the selection. Reports its type and focus, so the editor can tell when the
 * node whose editing UI is open has been left.
 */
export type Repaintable = { paint(): { type: string; focused: boolean } };

/**
 * Hosts a component-based mark: the editor renders `editorComponent` (or
 * `renderComponent`) around the marked text and does nothing else. The text
 * stays editable in a content hole the component places via `{children}`.
 *
 * Known limitation: one React root per mark view, like the inline view.
 */
export class ReactMarkView implements MarkView {
    dom: HTMLElement;
    contentDOM: HTMLElement;
    private readonly root: Root;

    constructor(
        private readonly mark: PmMark,
        private readonly view: EditorView,
        private readonly definition: MarkDefinition,
        private readonly getApi: () => EditorControlApi,
        private readonly live: Set<Repaintable>,
        private readonly openEditors: OpenEditors,
    ) {
        this.dom = document.createElement('span');
        // React gets a container of its own, and the text starts out right next
        // to it: React renders later than the engine needs the text in the
        // page (typing that creates a mark view goes on at once), and its first
        // render would clear the container it owns. `ContentHole` moves the
        // text into the component once it has rendered.
        const reactContainer = document.createElement('span');
        reactContainer.style.display = 'contents';
        this.contentDOM = document.createElement('span');
        this.contentDOM.style.display = 'contents';
        this.dom.append(reactContainer, this.contentDOM);
        this.root = createRoot(reactContainer);
        live.add(this);
        this.paint();
    }

    /** Where this run of the mark sits in the document, read off its content. */
    private range(): { from: number; to: number } | null {
        if (!this.contentDOM.isConnected) {
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

    paint(): { type: string; focused: boolean } {
        const value = markValueOf(this.mark);
        const children = <ContentHole element={this.contentDOM} />;
        const Component = this.definition.editorComponent;
        const type = this.mark.type.name;
        const focused = this.isFocused();
        this.root.render(
            Component ? (
                <Component
                    value={value}
                    isFocused={focused}
                    isOpen={focused && this.openEditors.type === type}
                    setOpen={(open) => (open ? this.getApi().editors.open(type) : this.getApi().editors.close())}
                    api={this.getApi()}
                    setValue={(next) => {
                        const range = this.range();
                        if (range === null) {
                            return;
                        }
                        this.view.dispatch(
                            this.view.state.tr
                                .removeMark(range.from, range.to, this.mark.type)
                                .addMark(range.from, range.to, this.mark.type.create({ value: next })),
                        );
                    }}
                    remove={() => {
                        const range = this.range();
                        if (range !== null) {
                            this.view.dispatch(this.view.state.tr.removeMark(range.from, range.to, this.mark.type));
                        }
                    }}
                >
                    {children}
                </Component>
            ) : (
                this.definition.renderComponent({ value, children })
            ),
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
        this.live.delete(this);
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }
}

/**
 * A mark without editing UI, drawn in the editor exactly as the readonly view
 * draws it: its `renderComponent`. It depends on nothing but the mark's value
 * and its text, and the engine builds a new view whenever the value changes —
 * so it renders once and stays out of the per-keystroke repaint.
 */
class RenderedMarkView implements MarkView {
    dom: HTMLElement;
    contentDOM: HTMLElement;
    private readonly root: Root;

    constructor(mark: PmMark, definition: MarkDefinition) {
        this.dom = document.createElement('span');
        // The text is in the page before React renders, as in ReactMarkView:
        // typing that creates this view goes on at once.
        const reactContainer = document.createElement('span');
        reactContainer.style.display = 'contents';
        this.contentDOM = document.createElement('span');
        this.contentDOM.style.display = 'contents';
        this.dom.append(reactContainer, this.contentDOM);
        this.root = createRoot(reactContainer);
        this.root.render(
            definition.renderComponent({
                value: markValueOf(mark),
                children: <ContentHole element={this.contentDOM} />,
            }),
        );
    }

    ignoreMutation(mutation: ViewMutationRecord): boolean {
        if (mutation.type === 'selection') {
            return false;
        }
        return !this.contentDOM.contains(mutation.target);
    }

    destroy(): void {
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }
}

/**
 * Every mark is drawn by its components, the same rule as the readonly view:
 * `editorComponent` when it has one, `renderComponent` otherwise. `toHtml` is
 * only what copying puts on the clipboard.
 */
export const createMarkViews = (
    registry: PluginRegistry,
    getApi: () => EditorControlApi,
    live: Set<Repaintable>,
    openEditors: OpenEditors,
): Record<string, MarkViewConstructor> => {
    const views: Record<string, MarkViewConstructor> = {};
    for (const [type, definition] of registry.marks) {
        views[type] = definition.editorComponent
            ? (mark, view) => new ReactMarkView(mark, view, definition, getApi, live, openEditors)
            : (mark) => new RenderedMarkView(mark, definition);
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
